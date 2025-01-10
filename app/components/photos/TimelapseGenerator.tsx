import { Video, ResizeMode } from 'expo-av';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PhotoEntry } from '../../types/photos';

interface TimelapseGeneratorProps {
  photos: PhotoEntry[];
  onClose: () => void;
}

export function TimelapseGenerator({ photos, onClose }: TimelapseGeneratorProps) {
  const [processing, setProcessing] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);

  // Note: La génération de timelapse nécessite un traitement côté serveur
  // ou l'utilisation d'une bibliothèque native via un module natif personnalisé
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Générer un Timelapse</Text>
      
      {videoUri && (
        <Video
          source={{ uri: videoUri }}
          style={styles.video}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
        />
      )}

      <TouchableOpacity 
        style={styles.button}
        onPress={onClose}
      >
        <Text style={styles.buttonText}>Fermer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: 300,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#393e46',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffd33d',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 