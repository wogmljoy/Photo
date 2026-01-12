
import { StylePreset } from './types';

export const SYSTEM_PROMPT = `You are a professional portrait photographer and photo editor specializing in high-end corporate headshots. 
Your task is to transform a personal, casual photo into a professional studio-quality headshot suitable for a resume or LinkedIn profile.

Instructions:
1. Maintain the person's identity and facial features accurately.
2. Change the attire to professional business wear (as specified by the user's selected style).
3. Set the background to a clean, professional studio backdrop (light grey, white, or subtle blue gradient).
4. Apply professional studio lighting (soft shadows, clear focus).
5. Improve the person's grooming (tidy hair, clean look) while keeping it natural.
6. The output must be a single, high-resolution image part.

Current Style Request: `;

export const STYLE_DETAILS: Record<StylePreset, string> = {
  [StylePreset.FORMAL_SUIT]: "Dark professional blazer, white shirt, and tie (if male) or blouse (if female). Formal and authoritative.",
  [StylePreset.BUSINESS_CASUAL]: "Clean button-down shirt or smart sweater. Modern and approachable.",
  [StylePreset.CREATIVE_PROFESSIONAL]: "Smart jacket with a stylish shirt. Artistic yet professional.",
  [StylePreset.PASSPORT_STYLE]: "Very clean white background, standard attire, neutral expression, perfectly centered."
};
