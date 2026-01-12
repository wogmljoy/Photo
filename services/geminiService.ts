
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT, STYLE_DETAILS } from "../constants";
import { StylePreset } from "../types";

export const transformPhoto = async (
  base64Image: string,
  style: StylePreset,
  apiKey: string = process.env.API_KEY || ''
): Promise<string> => {
  if (!apiKey) throw new Error("API Key is missing.");

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-2.5-flash-image";

  const styleDetail = STYLE_DETAILS[style];
  const fullPrompt = `${SYSTEM_PROMPT}${styleDetail}`;

  // Extract mime type and data from base64 string
  const mimeType = base64Image.match(/data:([^;]+);/)?.[1] || 'image/png';
  const data = base64Image.split(',')[1];

  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          {
            inlineData: {
              data,
              mimeType,
            },
          },
          {
            text: fullPrompt,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image was returned from the AI.");
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (error.message?.includes("Requested entity was not found")) {
      throw new Error("API_KEY_EXPIRED");
    }
    throw error;
  }
};
