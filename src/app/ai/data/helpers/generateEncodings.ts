import { pipeline } from "@xenova/transformers";

const EMBEDDING_MODEL_ID = `Xenova/all-MiniLM-L6-v2`;

export const generateEncodings = async (
  descriptions: string[],
): Promise<number[][] | undefined> => {
  console.log("Generating encodings...");
  try {
    const encoder = await pipeline("feature-extraction", EMBEDDING_MODEL_ID);

    const data = await encoder(descriptions, {
      pooling: "mean",
      normalize: true,
    });

    console.log("Finished generating encodings!");
    return data.tolist();
  } catch (e) {
    console.error("Error generating encodings: ", e);
    return undefined;
  }
};
