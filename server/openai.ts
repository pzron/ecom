import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ProductContext {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description?: string;
  rating: number;
  inStock: boolean;
}

const SYSTEM_PROMPT = `You are Nex AI, the intelligent shopping assistant for NexCommerce - a premium e-commerce platform. Your role is to:

1. Help customers find products by understanding their needs
2. Provide detailed product information, comparisons, and recommendations
3. Assist with order tracking, returns, and customer support queries
4. Suggest deals, combos, and personalized recommendations
5. Answer questions about shipping, payment methods, and policies

Guidelines:
- Be friendly, helpful, and conversational
- Give specific product recommendations when possible
- Always mention prices in ৳ (Bangladeshi Taka)
- Highlight discounts and deals when relevant
- Keep responses concise but informative
- If you don't know something specific, offer to help find out

Available product categories: Electronics, Fashion, Beauty & Health, Home & Living, Sports & Outdoors, Gaming, Tea & Coffee, Consumer Items, Salon & Parlour

Payment methods available: Card, Mobile Banking (bKash, Nagad, Rocket), Crypto, Cash on Delivery`;

export async function generateChatResponse(
  messages: ChatMessage[],
  products?: ProductContext[]
): Promise<string> {
  try {
    let systemMessage = SYSTEM_PROMPT;
    
    if (products && products.length > 0) {
      systemMessage += `\n\nCurrent product context (use these for specific recommendations):\n${JSON.stringify(products.slice(0, 10), null, 2)}`;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        { role: "system", content: systemMessage },
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ],
      max_completion_tokens: 500,
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    if (error.status === 401) {
      return "I'm having trouble connecting to my AI brain. Please check if the OpenAI API key is configured correctly.";
    }
    return "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.";
  }
}

export async function searchProductsWithAI(
  query: string,
  products: ProductContext[]
): Promise<{ answer: string; recommendedIds: string[] }> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `You are a product search assistant. Given a user query and available products, return a JSON response with:
1. "answer": A helpful response about the products found
2. "recommendedIds": Array of product IDs that best match the query (max 5)

Products available: ${JSON.stringify(products.map(p => ({ id: p.id, name: p.name, category: p.category, price: p.price })), null, 2)}`
        },
        { role: "user", content: query }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 500,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      answer: result.answer || "Here are some products you might like.",
      recommendedIds: result.recommendedIds || []
    };
  } catch (error) {
    console.error("AI Search Error:", error);
    return {
      answer: "I found some products that might interest you.",
      recommendedIds: products.slice(0, 5).map(p => p.id)
    };
  }
}

export { openai };
