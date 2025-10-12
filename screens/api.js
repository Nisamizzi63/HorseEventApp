import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: "DIN_API_KEY_HER", // 🔑 brug .env i stedet for hardcode
});

export async function askChatbot(question) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Fejl i API-kald:", error);
    return "Der opstod en fejl 😢";
  }
}