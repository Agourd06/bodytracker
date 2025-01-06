import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";


export default function about() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About</Text>
        <Link href={"/" as any} style={styles.button}>
          Go back to Home screen!
        </Link>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#25292e',
  },
  text : {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold"
  },
  button : {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  }
});

