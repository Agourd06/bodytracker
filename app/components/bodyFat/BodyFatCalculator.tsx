import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { UserData } from '../../types/user';

interface BodyFatCalculatorProps {
  user: UserData;
  setUser: (user: UserData) => void;
}

export function BodyFatCalculator({ user, setUser }: BodyFatCalculatorProps) {
  const calculateBodyFat = (): number | null => {
    const height = parseFloat(user.taille); 
    const waist = parseFloat(user.tourTaille); 
    const neck = parseFloat(user.tourCou); 
    if (!height || !waist || !neck) return null;

    try {
      if (user.sexe === 'homme') {
        // Formule pour les hommes
        const abdominalNeck = Math.max(waist - neck, 0); 
        const bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(abdominalNeck) + 0.15456 * Math.log10(height)) - 450;
        
        return bodyFat > 0 ? parseFloat(bodyFat.toFixed(1)) : null;
      } else {
        // Formule pour les femmes .
        const hip = parseFloat(user.tourHanche || '0');
        if (!hip) return null;

        const sumMeasures = Math.max(waist + hip - neck, 0); 
        const bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(sumMeasures) + 0.22100 * Math.log10(height)) - 450;
        
        return bodyFat > 0 ? parseFloat(bodyFat.toFixed(1)) : null;
      }
    } catch (error) {
      console.error('Erreur dans le calcul:', error);
      return null;
    }
  };

  const getBodyFatStatus = (bodyFat: number): { status: string; color: string } => {
    if (user.sexe === 'homme') {
      if (bodyFat < 6) return { status: "Essentiel", color: "#FFA500" };
      if (bodyFat < 14) return { status: "Athlète", color: "#4CAF50" };
      if (bodyFat < 18) return { status: "Fitness", color: "#4CAF50" };
      if (bodyFat < 25) return { status: "Normal", color: "#4CAF50" };
      return { status: "Surpoids", color: "#FF6B6B" };
    } else {
      if (bodyFat < 14) return { status: "Essentiel", color: "#FFA500" };
      if (bodyFat < 21) return { status: "Athlète", color: "#4CAF50" };
      if (bodyFat < 25) return { status: "Fitness", color: "#4CAF50" };
      if (bodyFat < 32) return { status: "Normal", color: "#4CAF50" };
      return { status: "Surpoids", color: "#FF6B6B" };
    }
  };

  const bodyFat = calculateBodyFat();
  const status = bodyFat ? getBodyFatStatus(bodyFat) : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calcul du pourcentage de graisse corporelle</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tour de taille (cm)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={user.tourTaille}
          onChangeText={(text) => setUser({ ...user, tourTaille: text })}
          placeholder="Tour de taille"
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tour de cou (cm)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={user.tourCou}
          onChangeText={(text) => setUser({ ...user, tourCou: text })}
          placeholder="Tour de cou"
          placeholderTextColor="#666"
        />
      </View>

      {user.sexe === 'femme' && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tour de hanche (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={user.tourHanche}
            onChangeText={(text) => setUser({ ...user, tourHanche: text })}
            placeholder="Tour de hanche"
            placeholderTextColor="#666"
          />
        </View>
      )}

      {bodyFat !== null && status && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Pourcentage de graisse corporelle :</Text>
          <Text style={styles.resultValue}>{bodyFat}%</Text>
          <Text style={[styles.statusText, { color: status.color }]}>
            {status.status}
          </Text>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Catégories ({user.sexe === 'homme' ? 'Hommes' : 'Femmes'}) :</Text>
        {user.sexe === 'homme' ? (
          <>
            <Text style={styles.infoText}>• Essentiel: {'<'}6%</Text>
            <Text style={styles.infoText}>• Athlète: 6-14%</Text>
            <Text style={styles.infoText}>• Fitness: 14-18%</Text>
            <Text style={styles.infoText}>• Normal: 18-25%</Text>
            <Text style={styles.infoText}>• Surpoids: {'>'}25%</Text>
          </>
        ) : (
          <>
            <Text style={styles.infoText}>• Essentiel: {'<'}14%</Text>
            <Text style={styles.infoText}>• Athlète: 14-21%</Text>
            <Text style={styles.infoText}>• Fitness: 21-25%</Text>
            <Text style={styles.infoText}>• Normal: 25-32%</Text>
            <Text style={styles.infoText}>• Surpoids: {'>'}32%</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#393e46',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
  title: {
    color: '#ffd33d',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2c3038',
    padding: 12,
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#2c3038',
    padding: 15,
    borderRadius: 8,
  },
  resultLabel: {
    color: '#ffd33d',
    fontSize: 16,
    marginBottom: 8,
  },
  resultValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '500',
  },
  infoContainer: {
    marginTop: 20,
    backgroundColor: '#2c3038',
    padding: 15,
    borderRadius: 8,
  },
  infoTitle: {
    color: '#ffd33d',
    fontSize: 16,
    marginBottom: 10,
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
}); 