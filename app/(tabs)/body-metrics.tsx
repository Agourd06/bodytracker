import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { BodyFatCalculator } from "../components/bodyFat/BodyFatCalculator";
import { BodyFatEntry, UserData } from "../types/user";

export default function BodyMetricsScreen() {
  const [user, setUser] = useState<UserData | null>(null);
  const [bodyFatHistory, setBodyFatHistory] = useState<BodyFatEntry[]>([]);
  const [refreshing, setRefresh] = useState(false);

  const onRefresh = async () => {
    setRefresh(true);
    await loadData();
    setRefresh(false);
  };

  const loadData = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("userProfile");
      const savedHistory = await AsyncStorage.getItem("bodyFatHistory");

      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
      if (savedHistory) {
        setBodyFatHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.content}>
        {user && (
          <BodyFatCalculator 
            user={user} 
            setUser={setUser}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  content: {
    padding: 20,
  },
});
