import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
// import { loadGraphModel } from "@tensorflow/tfjs-converter";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import Constants from "expo-constants";

import {
  fetch,
  decodeJpeg,
  bundleResourceIO,
} from "@tensorflow/tfjs-react-native";

import { Text, View, Button, StyleSheet } from "react-native";

const TensorflowFunctional = () => {
  const [isTfReady, setIsTfReady] = useState(false);
  const [model, setModel] = useState(null);
  const textureDims = { width: 1600, height: 1200 };
  const tensorDims = { width: 152, height: 200 };
  let requestAnimationFrameId = 0;
  const TensorCamera = cameraWithTensors(Camera);

  //   const  TensorCamera

  const loadModel = async () => {
    await tf.ready();
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
      // this.setState({ error: "Unable to load model" });
    }
  };
  const getPrediction = async (tensor) => {
    console.log("prediction reached");
    tensor4D = tf.expandDims(tensor);
    const prediction = await model.executeAsync(tensor4D);
    const scores = prediction[2].arraySync();
    console.log("probability: ", scores[0]);
    // console.log("prediction", prediction);
    return prediction;
  };

  const handleCameraStream = (imageAsTensors) => {
    console.log("hello");
    const loop = async () => {
      const nextImageTensor = await imageAsTensors.next().value;
      await getPrediction(nextImageTensor);
      requestAnimationFrameId = requestAnimationFrame(loop);
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
          cameraTerrxtureHeight={textureDims.height}
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
  return <View>{model !== null && renderCameraView()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#E8E8E8",
  },
  header: {
    backgroundColor: "#41005d",
  },
  title: {
    margin: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
  },
  body: {
    padding: 5,
    paddingTop: 25,
  },
  cameraView: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    width: "100%",
    height: "100%",
    paddingTop: 10,
  },
  camera: {
    width: 700 / 2,
    height: 800 / 2,
    zIndex: 1,
    borderWidth: 0,
    borderRadius: 0,
  },
  translationView: {
    marginTop: 30,
    padding: 20,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    height: 500,
  },
  translationTextField: {
    fontSize: 60,
  },
  wordTextField: {
    textAlign: "right",
    fontSize: 20,
    marginBottom: 50,
  },
  legendTextField: {
    fontStyle: "italic",
    color: "#888888",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "purple",
    borderStyle: "solid",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#ffffff",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 3,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#cccccc",
  },
});

export default TensorflowFunctional;
