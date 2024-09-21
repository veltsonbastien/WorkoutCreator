import { NextRequest, NextResponse } from "next/server";
import { getResponse, searchTable, generateEncodings } from "@/app/ai";

export const POST = async (req: NextRequest) => {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({
      status: 400,
      message: "Please include a prompt.",
    });
  }

  try {
    console.log("Encoding prompt...");
    const encodedPrompt = await generateEncodings([prompt]);
    //console.log("Prompt encoded: ", encodedPrompt);

    if (!encodedPrompt) {
      return NextResponse.json({
        status: 500,
        message: "Unable to generate encodings for prompt, please double check",
      });
    }

    console.log("Getting assisting payloads...");
    const assistingPayloads = await searchTable(encodedPrompt[0], 10); //10 is arbitrarily picked by me for no reason at all
    console.log("Got assisting payloads!");

    console.log("Getting response from OpenAI...");
    const response = await getResponse(prompt, assistingPayloads);

    if (!response) {
      return NextResponse.json({
        status: 500,
        message: "Unable to get a chat response from OpenAI, please try again.",
      });
    }

    console.log(`Successfully got chat response from OpenAI:`);
    //console.log(response);

    return NextResponse.json({
      status: 200,
      message: response,
    });
  } catch (e) {
    console.error("Error generating response: ", e);
    return NextResponse.json({
      status: 500,
      message: `Error generating response ${e}`,
    });
  }
};
