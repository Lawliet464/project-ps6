// Interface définissant la configuration choisie avant la partie
export interface ConfigurationPartie {
    formatJeu: string;
    formatPartie: string;
    plateau: string;
    taillePolice: string;
    aideMemo: string;
    aideAssoc: string;
    tempsRetenue: string;
}

// Interface définissant les résultats obtenus par le patient
export interface ResultatPartie {
    tauxReussiteMemory: number; 
    duree: string;              
    indicesUtilises: number;
    erreurOrdre: number;        
    erreurIncoherence: number;  
}

// Interface principale qui regroupe le tout
export interface Partie {
    id: string;            
    date: string;           
    theme: string;             
    configuration: ConfigurationPartie;
    resultats: ResultatPartie;
}