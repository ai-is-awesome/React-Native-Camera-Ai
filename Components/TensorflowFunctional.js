import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
// import { loadGraphModel } from "@tensorflow/tfjs-converter";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";

import {
  fetch,
  decodeJpeg,
  bundleResourceIO,
} from "@tensorflow/tfjs-react-native";

import { Text, View, Button } from "react-native";

export default TensorflowFunctional = () => {
  const [isTfReady, setIsTfReady] = useState(false);
  const [model, setModel] = useState(null);
  const textureDims = { width: 1600, height: 1200 };

  //   const  TensorCamera

  const loadModel = () => {
    console.log("loading model");
    const modelJson = require("../bin/model.json");
    const modelWeights = require("../bin/group1-shard1of1.bin");
    try {
      const model = await tf.loadGraphModel(
        bundleResourceIO(modelJson, modelWeights)
      );

      setModel(model);
      console.log("Model : is set", typeof model);
    } catch (e) {
      this.setState({ error: "Unable to load model" });
    }
  };
  const getPrediction = async (tensor) => {
    tensor4D = tf.expandDims(tensor);
    const prediction = await model.executeAsync(tensor4D);
    const scores = prediction[2].arraySync();
    console.log("probability: ", scores[0]);
    console.log("prediction", prediction);
    return prediction;
  };

  const handleCameraStream = (imageAsTensors) => {
    const loop = async () => {
      const nextImageTensor = await imageAsTensors.next().value;
      await getPrediction(nextImageTensor);
    };
    loop();
  };

  const renderCameraView = () => {
    return (
      <View style={styles.cameraView}>
        <TensorCamera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          zoom={0}
          cameraTextureHeight={textureDims.height}
          cameraTextureWidth={textureDims.width}
          resizeHeight={tensorDims.height}
          resizeWidth={tensorDims.width}
          resizeDepth={3}
          onReady={(imageAsTensors) => handleCameraStream(imageAsTensors)}
          autorender={true}
        />
      </View>
    );
  };

  useEffect(() => {
    loadModel();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>HEllo world</Text>
    </View>
  );
};
