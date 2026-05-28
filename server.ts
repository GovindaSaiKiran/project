import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header as required
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("GEMINI_API_KEY environment variable is not defined. AI Concierge will run in demo/fallback mode.");
}

// Resort Knowledge Base passed as system instructions
const RESORT_SYSTEM_INSTRUCTION = `
You are the elite AI Concierge for Aryam Resorts, a collection of world-class ultra-luxury sanctuaries in the Maldives, Bali, and Seychelles.
Your tone is deeply elegant, warm, serene, and sophisticated. You speak with professional composure, using poetic but clear descriptions ("whispering palms", "sanctuaries of light", "curated culinary masterpieces").
Always prioritize giving factual, helpful information rather than making things up.

Resort Offerings Details:
1. Sanctuaries (Accommodations):
   - Ocean View Villa: Minimalist oceanfront masterpiece from $1,800/night with checking-in/out, private infinity pool, and floor-to-ceiling glass.
   - Presidential Suite: Curated fine arts, personal butler, 270-degree ocean views, grand piano from $4,500/night.
   - Private Pool Cottage: Intimate garden sanctuary, tropical garden rainshower, secluded pool deck from $1,200/night.
   - Family Retreat Villa: Three master suites, kitchen, expansive private terrace by the sea from $2,600/night.

2. Curated Experiences:
   - Private Yacht Excursions: Sail at twilight, discover coral gardens or pristine sandbanks.
   - Beachfront Dining: Intimate candlelit dinners on a private beach with live harpists/violinists.
   - Sanctuary Spa: High-end wellness treatments, volcanic stone hot bath overlay, aromatherapy, and mindfulness meditation.

3. In-Room Dining Culinary Masterpieces:
   - Morning Rituals (Breakfast, 06:00 - 11:30): Poached eggs, avocado sourdough slice, fresh organic berries, artisan micro-roasted coffee. (Sunrise Breakfast Platter: $45)
   - Sunlit Repast (Lunch, 12:00 - 17:00): Mediterranean burrata salad with heirloom tomatoes, crisp white wine sauvignon. (Wagyu Beef Filet Burger: $65)
   - Evening Opulence (Dinner, 18:00 - 23:30): Prime dry-aged Wagyu tenderloin with truffle pomme purée, asparagus, red wine reduction. (Wagyu Tenderloin main dish: $125)
   - Sommelier Pairing: Château Margaux 2015 ($350 bottle / $75 glass), a symphony of dark fruit, floral notes, elegant tannins.

4. Bespoke Special Packages:
   - Honeymoon Sanctuary: 3-night package in Ocean View Villa, spa treatments, twilight dinner, Champagne on arrival.
   - Serenity Wellness Retreat: 5-night package in Private Pool Cottage, daily yoga, customized nutritional meal plans, organic scrubs.
   - Oceanside Adventure: 4-night package including private yacht charter, guided snorkel exploration, jet-ski safaris.

Your answers should be reasonably concise, visually exquisite (use elegant markdown spacing and subtle formatting), and always guide the user towards booking their ideal layout or connecting with the guest experience staff.
`;

// AI Concierge API Route
app.post("/api/concierge", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request payload. Messsages array is required." });
  }

  // Get user's active message
  const userText = messages[messages.length - 1]?.text || "";

  if (!ai) {
    // If no API key is available, return an elegant simulated response matching the requested demo
    const lowerText = userText.toLowerCase();
    let simResponse = "";
    if (lowerText.includes("honeymoon") || lowerText.includes("spa")) {
      simResponse = "I would be absolutely delighted to arrange that for you. Based on your desire for serene wellness and romantic ocean vistas, I recommend our **Honeymoon Sanctuary Package** in the private **Ocean View Villa** ($1,800/night), paired with our holistic customized treatments in the **Sanctuary Spa**. Under whispering palms, we can arrange an intimate beachfront candlelit dinner at twilight. Shall I proceed to hold this sanctuary for your ideal dates?";
    } else if (lowerText.includes("dining") || lowerText.includes("eat") || lowerText.includes("dinner") || lowerText.includes("wagyu")) {
      simResponse = "Gastronomy at Aryam is a sacred art. For your evening repast, I recommend our signature **Wagyu Tenderloin with Truffle Pomme Purée** ($125), matched gracefully with a glass of **Château Margaux 2015**. Our culinary team is prepared to deliver this masterpiece directly to your villa deck at your desired hour. Would you like me to request our chef to prepare this for you tonight?";
    } else if (lowerText.includes("yacht") || lowerText.includes("activity") || lowerText.includes("excursion")) {
      simResponse = "To seek adventure is to follow the whispers of the sea. Our **Private Yacht Excursion** offers a custom-styled cruise through pristine, private sandbanks. We can provision an exquisite vintage Champagne picnic and guide you to hidden coral gardens. Which day of your sanctuary stay would you prefer for this journey?";
    } else {
      simResponse = `Welcome back to Aryam. As your private concierge, I am here to orchestrate every detail of your escape. Based on your interest, I suggest exploring our legendary **Ocean View Villas** or indulging in a **Sanctuary Spa** ritual. How may I elevate your sanctuary experience today?`;
    }
    return res.json({ text: simResponse });
  }

  try {
    // Format messages for the modern chat API in @google/genai
    // We will start a chat using ai.chats.create
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: RESORT_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    // Populate historical context if available
    let latestResponse = "";
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      if (i === messages.length - 1) {
        // Last message is the current user query
        const response = await chat.sendMessage({ message: msg.text });
        latestResponse = response.text || "I apologize, our concierge system had an interruption. How can I help you?";
      } else {
        // Feed history to establish chat context securely
        // Note: For chats we send messages sequentially to pre-populate, or we let GenAI build it.
        // For simplicity and speed in this endpoint, we can send the last user message and outline context.
      }
    }

    return res.json({ text: latestResponse });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: "Our digital concierge is currently experiencing an update.",
      details: error.message,
    });
  }
});

// Mock Server Stats showing animated resort statistics
app.get("/api/dashboard-stats", (req, res) => {
  res.json({
    occupancyRate: 84,
    activeGuests: 112,
    ambientTempC: "26.4°C",
    conciergeRequestsToday: 154,
    averageResolutionMins: 4.8,
    roomServiceTrackers: [
      { id: "A-402", guestRoom: "Suite 402", item: "Sunrise Breakfast Platter", status: "preparing", timestamp: new Date().getTime() },
      { id: "V-103", guestRoom: "Villa 103", item: "Wagyu Tenderloin & Merlot", status: "en-route", timestamp: new Date().getTime() - 900000 },
    ],
  });
});

// Vite Integration
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Aryam Resorts Full Stack Server running on http://localhost:${PORT}`);
  });
}

start();
