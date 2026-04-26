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
  type: "texte+image" | "texte+image+audio"
  elementsAssoc: ElemTheme[];
}
