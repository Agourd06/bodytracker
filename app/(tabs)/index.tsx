import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BodyTracker</Text>
        <Text style={styles.subtitle}>Suivez votre progression physique</Text>
      </View>

      <View style={styles.featuresContainer}>
        <Link href="/profile" asChild>
          <TouchableOpacity style={styles.featureButton}>
            <Ionicons name="person-outline" size={24} color="#ffd33d" />
            <Text style={styles.featureTitle}>Profil</Text>
            <Text style={styles.featureDescription}>
              Gérez vos informations personnelles et suivez votre IMC
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/body-metrics" asChild>
          <TouchableOpacity style={styles.featureButton}>
            <Ionicons name="body-outline" size={24} color="#ffd33d" />
            <Text style={styles.featureTitle}>Mesures corporelles</Text>
            <Text style={styles.featureDescription}>
              Calculez votre pourcentage de graisse corporelle
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/photos" asChild>
          <TouchableOpacity style={styles.featureButton}>
            <Ionicons name="camera-outline" size={24} color="#ffd33d" />
            <Text style={styles.featureTitle}>Photos</Text>
            <Text style={styles.featureDescription}>
              Capturez et suivez votre progression visuelle
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/history" asChild>
          <TouchableOpacity style={styles.featureButton}>
            <Ionicons name="stats-chart-outline" size={24} color="#ffd33d" />
            <Text style={styles.featureTitle}>Historique</Text>
            <Text style={styles.featureDescription}>
              Consultez l'évolution de vos mesures
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Commencez par compléter votre profil pour accéder à toutes les fonctionnalités
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginVertical: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffd33d",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  featuresContainer: {
    flex: 1,
    gap: 15,
  },
  featureButton: {
    backgroundColor: "#393e46",
    padding: 20,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  featureDescription: {
    fontSize: 14,
    color: "#888",
  },
  footer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#2c3038",
    borderRadius: 10,
  },
  footerText: {
    color: "#ffd33d",
    textAlign: "center",
    fontSize: 14,
  },
});
