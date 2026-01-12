
export interface PhotoState {
  original: string | null;
  transformed: string | null;
  isLoading: boolean;
  error: string | null;
}

export enum StylePreset {
  FORMAL_SUIT = 'Formal Suit (Dark)',
  BUSINESS_CASUAL = 'Business Casual',
  CREATIVE_PROFESSIONAL = 'Creative Professional',
  PASSPORT_STYLE = 'Standard ID Style'
}

export interface TransformationConfig {
  style: StylePreset;
  background: string;
}
