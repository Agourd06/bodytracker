import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { UserData } from "../../types/user";

interface ProfileFormProps {
  user: UserData;
  setUser: (user: UserData) => void;
}

export function ProfileForm({ user, setUser }: ProfileFormProps) {
  const fields = [
    'nom',
    'prenom',
    'age',
    'nationalite',
    'poids',
    'taille',
    'adresse'
  ];

  return (
    <>
      {fields.map((key) => (
        <View key={key} style={styles.inputContainer}>
          <Text style={styles.label}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={`Entrez votre ${key}`}
            placeholderTextColor="#666"
            keyboardType={["poids", "taille", "age"].includes(key) ? "numeric" : "default"}
            value={user[key as keyof typeof user]?.toString()}
            onChangeText={(text) => setUser({ ...user, [key]: text })}
          />
        </View>
      ))}

      {/* Sélecteur de sexe */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sexe</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              user.sexe === 'homme' && styles.genderButtonActive
            ]}
            onPress={() => setUser({ ...user, sexe: 'homme' })}
          >
            <Text style={[
              styles.genderButtonText,
              user.sexe === 'homme' && styles.genderButtonTextActive
            ]}>
              Homme
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              user.sexe === 'femme' && styles.genderButtonActive
            ]}
            onPress={() => setUser({ ...user, sexe: 'femme' })}
          >
            <Text style={[
              styles.genderButtonText,
              user.sexe === 'femme' && styles.genderButtonTextActive
            ]}>
              Femme
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Champs pour le calcul de graisse corporelle */}
      {/* <View style={styles.inputContainer}>
        <Text style={styles.label}>Tour de taille (cm)</Text>
        <TextInput
          style={styles.input}
          placeholder="Tour de taille"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={user.tourTaille}
          onChangeText={(text) => setUser({ ...user, tourTaille: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tour de cou (cm)</Text>
        <TextInput
          style={styles.input}
          placeholder="Tour de cou"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={user.tourCou}
          onChangeText={(text) => setUser({ ...user, tourCou: text })}
        />
      </View> */}
{/* 
      {user.sexe === 'femme' && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tour de hanche (cm)</Text>
          <TextInput
            style={styles.input}
            placeholder="Tour de hanche"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={user.tourHanche}
            onChangeText={(text) => setUser({ ...user, tourHanche: text })}
          />
        </View>
      )} */}
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#ffd33d",
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#393e46",
    padding: 15,
    borderRadius: 10,
    color: "#fff",
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    backgroundColor: "#393e46",
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: "#ffd33d",
  },
  genderButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  genderButtonTextActive: {
    color: "#25292e",
    fontWeight: "bold",
  },
});
