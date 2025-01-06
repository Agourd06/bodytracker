import { StyleSheet, Text, View } from "react-native";

interface IMCDisplayProps {
  imc: number | null;
}

const getIMCStatus = (imc: number): { status: string; color: string } => {
  if (imc < 18.5) return { 
    status: "Insuffisance pondérale (maigreur)", 
    color: "#FFA500" 
  };
  if (imc < 25) return { 
    status: "Corpulence normale", 
    color: "#4CAF50" 
  };
  if (imc < 30) return { 
    status: "Surpoids", 
    color: "#FFA500" 
  };
  if (imc < 35) return { 
    status: "Obésité modérée", 
    color: "#FF6B6B" 
  };
  if (imc < 40) return { 
    status: "Obésité sévère", 
    color: "#FF4444" 
  };
  return { 
    status: "Obésité morbide", 
    color: "#FF0000" 
  };
};

const getIMCRecommendation = (imc: number, taille: number): string => {
  const poidsIdealMin = (18.5 * (taille * taille)).toFixed(1);
  const poidsIdealMax = (25 * (taille * taille)).toFixed(1);
  
  return `Poids idéal pour votre taille: entre ${poidsIdealMin}kg et ${poidsIdealMax}kg`;
};

export function IMCDisplay({ imc }: IMCDisplayProps) {
  if (imc === null) return null;

  const { status, color } = getIMCStatus(imc);

  return (
    <View style={styles.imcContainer}>
      <Text style={styles.imcLabel}>IMC Actuel</Text>
      <Text style={styles.imcValue}>{imc}</Text>
      <Text style={[styles.imcStatus, { color }]}>{status}</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          L'IMC idéal se situe entre 18.5 et 25
        </Text>
        <Text style={styles.interpretationText}>
          Interprétation :
        </Text>
        <Text style={styles.bulletPoint}>• Moins de 18.5 : Insuffisance pondérale</Text>
        <Text style={styles.bulletPoint}>• 18.5 à 25 : Corpulence normale</Text>
        <Text style={styles.bulletPoint}>• 25 à 30 : Surpoids</Text>
        <Text style={styles.bulletPoint}>• 30 à 35 : Obésité modérée</Text>
        <Text style={styles.bulletPoint}>• 35 à 40 : Obésité sévère</Text>
        <Text style={styles.bulletPoint}>• Plus de 40 : Obésité morbide</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imcContainer: {
    backgroundColor: "#393e46",
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: "center",
  },
  imcLabel: {
    color: "#ffd33d",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  imcValue: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
  },
  imcStatus: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 15,
  },
  infoContainer: {
    backgroundColor: "#2c3038",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    marginTop: 10,
  },
  infoText: {
    color: "#ffd33d",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  interpretationText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bulletPoint: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
}); 