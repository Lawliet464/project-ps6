/**
 * Interface représentant un élément (image + texte) 
 * utilisé dans le jeu d'association.
 */
export interface ElemAssoc {
  id: number | null; 
  label: string;     
  image: string; 
  ordreCible: number; 
  surbrillance?: boolean;   
  themeId?: string;  }

export interface ZoneAssoc {
  id: number;
  expectedItemId: number; 
  label?: string;
  themeId: string;
}

export interface Cellule {
  value: ElemAssoc | null;
  state: 'correcte' | 'incorrecte-ordre' | 'incorrecte-theme' | '';
  highlight?: boolean;
}