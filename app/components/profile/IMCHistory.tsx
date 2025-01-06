import { StyleSheet, Text, View } from "react-native";
import { IMCEntry } from "../../types/user";

interface IMCHistoryProps {
  history: IMCEntry[];
}

export function IMCHistory({ history }: IMCHistoryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique des IMC</Text>
      {history.slice().reverse().map((entry, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.value}>IMC: {entry.value}</Text>
          <Text style={styles.date}>{entry.date}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#393e46",
    borderRadius: 10,
  },
  title: {
    color: "#ffd33d",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#4a4f57",
  },
  value: {
    color: "#fff",
    fontSize: 16,
  },
  date: {
    color: "#888",
    fontSize: 14,
  },
});
