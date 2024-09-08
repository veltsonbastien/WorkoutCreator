import OpenAI from "openai";
import { SYSTEM_PROMPT } from "./constants";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export const getResponse = async (
  prompt: string,
  assistingPayloads: any,
): Promise<string | null> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: assistingPayloads.toString(),
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (e) {
    console.log("Error generating response");
    return `Error generating response: ${e}`;
  }
};
