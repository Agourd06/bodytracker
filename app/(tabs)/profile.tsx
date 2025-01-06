import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IMCDisplay } from "../components/profile/IMCDisplay";
import { ProfileForm } from "../components/profile/ProfileForm";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { IMCEntry, UserData } from "../types/user";

export default function ProfileScreen() {
  const [user, setUser] = useState<UserData>({
    nom: "",
    prenom: "",
    age: "",
    nationalite: "",
    poids: "",
    taille: "",
    adresse: "",
    sexe: "homme",
    tourTaille: "",
    tourCou: "",
    tourHanche: "",
    imcHistory: [],
  });
  
  const [imc, setIMC] = useState<number | null>(null);
  const [imcHistory, setImcHistory] = useState<IMCEntry[]>([]);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    calculateIMC();
  }, [user.poids, user.taille]);

  const loadUserData = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("userProfile");
      const savedHistory = await AsyncStorage.getItem("imcHistory");
      
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      if (savedHistory) {
        setImcHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Échec du chargement des données", error);
    }
  };

  const calculateIMC = () => {
    const poids = parseFloat(user.poids);
    const taille = parseFloat(user.taille) / 100;
    if (!isNaN(poids) && !isNaN(taille) && taille > 0) {
      const calculatedIMC = parseFloat((poids / (taille * taille)).toFixed(2));
      setIMC(calculatedIMC);
    }
  };

  const saveUserData = async () => {
    if (imc !== null) {
      const newEntry = {
        value: imc,
        date: new Date().toLocaleDateString(),
      };

      const updatedHistory = [...imcHistory, newEntry];

      try {
        await AsyncStorage.setItem("userProfile", JSON.stringify(user));
        await AsyncStorage.setItem("imcHistory", JSON.stringify(updatedHistory));
        setImcHistory(updatedHistory);
        alert("Profil enregistré avec succès !");
      } catch (error) {
        console.error("Échec de la sauvegarde", error);
        alert("Erreur lors de la sauvegarde");
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader />
      <View style={styles.formContainer}>
        <ProfileForm user={user} setUser={setUser} />
        {imc !== null && <IMCDisplay imc={imc} />}
        
        {imcHistory.length > 0 && (
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>Dernier IMC enregistré</Text>
            <View style={styles.historyItem}>
              <Text style={styles.historyValue}>
                IMC: {imcHistory[imcHistory.length - 1].value}
              </Text>
              <Text style={styles.historyDate}>
                {imcHistory[imcHistory.length - 1].date}
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={saveUserData}>
          <Text style={styles.saveButtonText}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  formContainer: {
    padding: 20,
  },
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
    marginBottom: 10,
  },
  imcValue: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  historyContainer: {
    backgroundColor: "#393e46",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  historyTitle: {
    color: "#ffd33d",
    fontSize: 16,
    marginBottom: 10,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyValue: {
    color: "#fff",
    fontSize: 18,
  },
  historyDate: {
    color: "#888",
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: "#ffd33d",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#25292e",
    fontSize: 18,
    fontWeight: "bold",
  },
});

