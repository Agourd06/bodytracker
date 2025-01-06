import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export function ProfileHeader() {
  return (
    <View style={styles.header}>
      <Ionicons name="person-circle" size={80} color="#ffd33d" />
      <Text style={styles.title}>Profil Utilisateur</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#393e46",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffd33d",
    marginTop: 10,
  },
});
