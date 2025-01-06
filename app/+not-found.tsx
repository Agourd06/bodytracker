import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: "Oop Not found" }} />
      <View style={styles.container}>
        <Text style={styles.text}>404</Text>
        <Link href={'/' as any} style={styles.button}>
          Go Back To Home Page
        </Link> 
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
   container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text : {
    color : "#fff",
    fontSize : 60, 
    fontWeight : "bold"
  }
});
