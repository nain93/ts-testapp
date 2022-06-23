import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const handleTf = async () => {
      await tf.ready()

      const model = await mobilenet.load();
      console.log(model, 'model');
      // Get a reference to the bundled asset and convert it to a tensor
      const image = require('./assets/model/catsmall.png');
      const imageAssetPath = Image.resolveAssetSource(image);
      const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
      const imageData = await response.arrayBuffer();

      const imageTensor = decodeJpeg(imageData);

      const prediction = await model.classify(imageTensor);
      console.log(prediction, 'prediction');
      setIsLoading(true)
    }
    handleTf()
  }, [])

  return (
    <View style={styles.container}>
      <Text>isLoading</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
