export interface UserData {
  nom: string;
  prenom: string;
  age: string;
  nationalite: string;
  poids: string;
  taille: string;
  adresse: string;
  sexe: 'homme' | 'femme';
  // Mesures pour le calcul de graisse corporelle
  tourTaille: string;
  tourCou: string;
  tourHanche: string; // uniquement pour les femmes
  imcHistory: IMCEntry[];
}

export interface IMCEntry {
  value: number;
  date: string;
}

export interface BodyFatEntry {
  value: number;
  date: string;
  mesures: {
    taille: string;
    poids: string;
    tourTaille: string;
    tourCou: string;
    tourHanche?: string;
  };
} 