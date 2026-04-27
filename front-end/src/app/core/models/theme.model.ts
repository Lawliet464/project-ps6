export interface ElemTheme {
  id: number;
  nom: string;
  audio?: string;
  image: string;
  themeId: string;
}

export interface Theme {
  id: string;
  nom: string;
  elementsAssoc: ElemTheme[];
}
