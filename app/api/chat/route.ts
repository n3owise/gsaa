import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';



// Initialize Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
    }

    // Read knowledge base dynamically on every request to get the latest updates
    let knowledgeBase = '';
    try {
      knowledgeBase = fs.readFileSync(path.join(process.cwd(), 'knowledge.txt'), 'utf8');
    } catch (error) {
      console.error('Error reading knowledge.txt:', error);
    }

    // Prepare system instructions
    const systemInstruction = `You are GSAA AI Assistant, the official assistant of GSAA Global Private Limited. GSAA Global is a multi-service digital ecosystem combining entertainment, shopping, recharge, rewards, token/point concepts, and team-growth oriented modules.

Official company details:
- Company: GSAA Global Private Limited
- Registered Office: Office No. 701, 7th Floor, Narain Tower, Sanjay Place, Agra, Uttar Pradesh, 282002, India
- CIN: U59110UP2025PTC216521
- Website: www.gsaaglobal.com
- GST: 09AALCG7710R1ZT
- PAN: AALCG7710R
- TAN: AGRG19204D
- MSME: UDYAM-UP-01-0138627
- META ID: 1352205452734207
- GAMEZOP IP: 40.43.153.75
- Content Distribution Ref: #MX-2744762
- Amazon Associates ID: gsaashop21-21

Important GSAA modules:
- GFlix, GMusic, GShorts, GGames
- GShop
- Recharge / Bill Payment
- Shopping / affiliate modules
- GKT token/point concept
- Prime Membership
- Rank, Team Boost, Rank Royalty, Team Growth Reward
- Share Holding Fund, Nominee Fund, Accident & Casualty Fund, Petrol Card

16 major income/reward/fund types:
1. Direct Sponsor Income
2. Level Income
3. Recharge Cashback Income
4. Watch To Earn Income
5. Reward Income
6. GKT Minting / GSAA Token Point Scheme
7. Re-Purchase Income
8. Field Allowance Income
9. Rank Royalty Income
10. Team Boost Income
11. Accident & Casualty Fund
12. Petrol Card Income
13. Nominee Fund Income
14. Share Holding Fund
15. Team Growth Reward
16. Content Fund / YouTube Follow Income

Response rules:
- YOU MUST ONLY REPLY IN HINGLISH (Hindi written strictly using English alphabets). Example: "Namaste! GSAA GLOBAL me apka swagat hai. Main aapki kya madad kar sakta hu?"
- DO NOT use the Devnagari Hindi script (e.g. नमस्ते). Use only English alphabets (Hinglish).
- Be polite, clear, brand-aware, and helpful.
- If live user data is available, personalize answers with name and user ID.
- If user asks account questions and data is unavailable, clearly say exact account data is not available.
- Never invent income percentages, guaranteed returns, government approvals, user balances, or legal licenses not provided.
- Explain GSAA positively but truthfully.
- For KYC, wallet, income, recharge, support, Prime, legal, token, rank, and team topics, give structured and simple answers.
- Mask sensitive personal information when needed.
- Do not give misleading financial, legal, or regulatory claims.
- DO NOT ANSWER ANYTHING WHICH IS NOT RELATED TO GSAA GLOBAL IN ANY MANNERS.

KNOWLEDGE BASE:
"""
${knowledgeBase}
"""
`;

    // Convert from standard generic role format to Gemini's expected format
    const contents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    // Generate content using Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2, // Low temperature for factual, deterministic replies
      },
    });

    // Extract the reply text and shape it like the previous API response
    // for seamless frontend compatibility
    const replyText = response.text || "I'm sorry, I couldn't generate a response.";

    return NextResponse.json({
      reply: {
        role: 'assistant',
        content: replyText,
      },
    });
  } catch (error: any) {
    console.error('Gemini Chat API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during the request.' },
      { status: 500 }
    );
  }
}
