import {ElemTheme} from "../models/theme.model"

/**
 * Interface représentant un élément (image + texte)
 * utilisé dans le jeu d'association.
 */
export interface ElemAssoc {
  elemTheme: ElemTheme;
  surbrillance?: boolean;
}

export interface Cellule {
  value: ElemAssoc | null;
  state: 'correcte' | 'incorrecte-ordre' | 'incorrecte-theme' | '';
  highlight?: boolean;
  themeIdAttendu: string;
}
