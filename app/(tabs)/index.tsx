import {  StyleSheet, Text, View } from "react-native";
import { Image } from 'expo-image';
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";

const placeHolderImage = require('@/assets/images/1917.png')


export default function Home() {
  return (
    <View
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={placeHolderImage}/>
      </View>
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" theme={"primary"} />
        <Button label="Use this photo" />
      </View>    
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#25292e',  },
   

   imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
