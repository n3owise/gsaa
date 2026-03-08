import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // 1. Verify API Key (Inside handler for Vercel connection stability)
    const apiKey = process.env.GEMINI_API_KEY || '';

    // Masked log for Vercel debugging
    console.log('API Key present:', !!apiKey, apiKey ? `(ends with ...${apiKey.slice(-4)})` : '(empty)');

    if (!apiKey) {
      console.error('ERROR: GEMINI_API_KEY is missing from environment variables.');
      return NextResponse.json(
        { error: 'CONFIG_ERROR', message: 'GEMINI_API_KEY is not set in Vercel. Please add it to your project settings.' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // 2. Simple ping test for debugging Vercel connection
    const { messages, ping } = await req.json();
    if (ping) return NextResponse.json({ status: 'ok', message: 'Chat API is alive' });

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
    }

    // Read knowledge base dynamically
    let knowledgeBase = '';
    try {
      // Using public folder and process.cwd() for Vercel NFT compatibility
      const knowledgePath = path.resolve(process.cwd(), 'public', 'knowledge.txt');
      if (fs.existsSync(knowledgePath)) {
        knowledgeBase = fs.readFileSync(knowledgePath, 'utf8');
      } else {
        console.warn('Warning: knowledge.txt not found at', knowledgePath);
      }
    } catch (error) {
      console.error('Error reading knowledge.txt:', error);
    }

    // Prepare system instructions (GSAA Assistant Persona)
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
- DO NOT ANSWER ANYTHING WHICH IS NOT RELATED TO GSAA GLOBAL. If the user asks anything apart from GSAA Global, you must strictly only response with: "Mai ye jaankari apko nahi de sakta, aap mujhse gsaa global ke baare me kuch bhi puch sakte hai"

KNOWLEDGE BASE:
"""
${knowledgeBase}
"""
`;

    // Initialize the model with system instruction
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      systemInstruction: systemInstruction
    });

    // Convert history for Gemini
    // standard generic format: [{ role: 'user'|'assistant', content: '...' }]
    // Gemini format: [{ role: 'user'|'model', parts: [{ text: '...' }] }]
    let history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    // CRITICAL: Gemini requires the first message in history to be from 'user'.
    // If our first message is from the 'assistant' (greeting), we skip it for the history.
    if (history.length > 0 && history[0].role === 'model') {
      history = history.slice(1);
    }

    const latestMessage = messages[messages.length - 1].content;

    // Start chat session
    const chat = model.startChat({
      history: history,
      generationConfig: {
        temperature: 0.2,
      }
    });

    const result = await chat.sendMessage(latestMessage);
    const response = await result.response;
    const replyText = response.text();

    return NextResponse.json({
      reply: {
        role: 'assistant',
        content: replyText,
      },
    });
  } catch (error: any) {
    console.error('Gemini Chat API Error:', error);

    // Ensure we ALWAYS return JSON so the frontend doesn't show "Non-JSON" error
    const detailedError = {
      error: 'SERVER_ERROR',
      message: error.message || 'An unexpected error occurred.',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    };

    // Check for quota error
    if (detailedError.message.includes('429') || detailedError.message.includes('quota') || detailedError.message.includes('RESOURCE_EXHAUSTED')) {
      return NextResponse.json(
        { error: 'QUOTA_EXCEEDED', message: 'Aapki free limit khatam ho gayi hai. Kripya thodi der baad try karein.' },
        { status: 429 }
      );
    }

    return NextResponse.json(detailedError, { status: 500 });
  }
}
