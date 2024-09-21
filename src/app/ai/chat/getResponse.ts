import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { SYSTEM_PROMPT } from "./constants";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

//this is the idea around tiers / payment, free users will get weaker (and aided) prompting
const ACTIVE_USER = true;
const OPEN_AI_MODEL = ACTIVE_USER ? "gpt-4o" : "gpt-4o-mini";

const buildUserMessages = (prompt: string) => {
  const promptArray = prompt.split(".");

  // Object to store the latest values of parameters
  const parameters: { [key: string]: any } = {};

  const messages = promptArray
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    .reduce(
      (acc, prompt) => {
        let handled = false;

        const patterns = [
          {
            key: "exerciseAmount",
            regex: /(?:i (?:want|only want|need))\s+(\d+)\s+exercises/i,
            format: (value: string) => `${value} exercises`,
          },
          {
            key: "muscleGroup",
            regex:
              /(back and bicep|chest and tricep|legs|shoulders|full body)/i,
            format: (value: string) => value,
          },
          {
            key: "equipment",
            regex: /(?:i (?:have|don't have|only have))\s+(.*)/i,
            format: (value: string) => `Equipment: ${value}`,
          },
          {
            key: "duration",
            regex: /(?:workout\s+)?(\d+)\s+(minutes|hours)/i,
            format: (value: string, unit?: string) =>
              `Duration: ${value} ${unit}`,
          },
        ];

        for (const pattern of patterns) {
          const match = prompt.match(pattern.regex);
          if (match) {
            // Handle multiple capture groups if needed
            const value = match[1];
            const unit = match[2] || null;

            // Update parameter with the latest value
            parameters[pattern.key] = unit
              ? pattern.format(value, unit)
              : pattern.format(value);

            handled = true;
            break;
          }
        }

        if (!handled) {
          // If the prompt doesn't match any pattern, keep it as is
          acc.push({
            role: "user",
            content: prompt,
          });
        }

        return acc;
      },
      [] as { role: string; content: string }[],
    );

  //console.log("messages: ", messages);

  const mainMessages: { role: string; content: string }[] = [];
  // Append the latest parameters to the messages
  Object.values(parameters).forEach((content) => {
    mainMessages.push({
      role: "user",
      content,
    });
  });

  return mainMessages.concat(messages);
};

export const getResponse = async (
  prompt: string,
  assistingPayloads: any,
): Promise<string | null> => {
  const userMessages = buildUserMessages(prompt);
  const openAIMessages = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
    {
      role: "user",
      content: userMessages[0].content,
    },
    {
      role: "assistant",
      content: assistingPayloads.toString(),
    },
    {
      role: "user",
      content:
        "Please prioritize the following updates and adjust previous information accordingly. In the case of contradicting requests, prioritize the latest ones and strictly adhere to any numbers.",
    },
    ...userMessages.slice(1),
  ] as ChatCompletionMessageParam[];

  //console.log("open ai messages: ", openAIMessages);

  try {
    const response = await openai.chat.completions.create({
      model: OPEN_AI_MODEL,
      messages: openAIMessages,
    });

    return response.choices[0].message.content;
  } catch (e) {
    console.log("Error generating response");
    return `Error generating response: ${e}`;
  }
};
