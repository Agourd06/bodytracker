import * as ImageManipulator from 'expo-image-manipulator';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Slider from '@react-native-community/slider';

interface PhotoFiltersProps {
  imageUri: string;
  onFilterApplied: (newUri: string) => void;
}

export function PhotoFilters({ imageUri, onFilterApplied }: PhotoFiltersProps) {
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);

  const applyFilters = async () => {
    try {
      const actions: ImageManipulator.Action[] = [];
      
      if (brightness !== 0) {
        actions.push({ brightness: brightness });
      }
      
      if (contrast !== 0) {
        actions.push({ contrast: 1 + contrast });
      }

      const result = await ImageManipulator.manipulateAsync(
        imageUri,
        actions,
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      onFilterApplied(result.uri);
    } catch (error) {
      console.error("Erreur lors de l'application des filtres:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtres</Text>
      
      <View style={styles.filterControl}>
        <Text style={styles.label}>Luminosité</Text>
        <Slider
          style={styles.slider}
          minimumValue={-1}
          maximumValue={1}
          value={brightness}
          onValueChange={setBrightness}
          minimumTrackTintColor="#ffd33d"
          maximumTrackTintColor="#393e46"
        />
      </View>

      <View style={styles.filterControl}>
        <Text style={styles.label}>Contraste</Text>
        <Slider
          style={styles.slider}
          minimumValue={-1}
          maximumValue={1}
          value={contrast}
          onValueChange={setContrast}
          minimumTrackTintColor="#ffd33d"
          maximumTrackTintColor="#393e46"
        />
      </View>

      <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
        <Text style={styles.applyButtonText}>Appliquer les filtres</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#25292e',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterControl: {
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  applyButton: {
    backgroundColor: '#ffd33d',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#25292e',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 