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

import React, { useEffect } from "react";
import { Text, View, Button } from "react-native";
// import Camera from "./Camera";

export default class Tensorflow extends React.Component {
  constructor(props) {
    console.log("hello from here");
    super(props);
    this.state = {
      isTfReady: false,
      model: null,
      error: null,
    };
  }

  async componentDidMount() {
    await tf.ready();
    this.setState({ isTfReady: true });
    console.log("ready");
    this.loadModel();
  }

  async loadModel() {
    console.log("loading model");
    const modelJson = require("../bin/model.json");
    const modelWeights = require("../bin/group1-shard1of1.bin");
    try {
      const model = await tf.loadGraphModel(
        bundleResourceIO(modelJson, modelWeights)
      );

      this.setState({ model: model });
      console.log("Model : is set", typeof model);
    } catch (e) {
      this.setState({ error: "Unable to load model" });
    }
  }

  async getPrediction(tensor) {
    tensor4D = tf.expandDims(tensor);

    const prediction = await this.state.model.executeAsync(tensor4D);
    const scores = prediction[2].arraySync();
    console.log("probability: ", scores[0]);
    console.log("prediction", prediction);

    return prediction;
  }

  async handleCameraStream(imageAsTensors) {
    const loop = async () => {
      const nextImageTensor = await imageAsTensors.next().value;
      this.getPrediction();
    };
  }

  render() {
    return (
      <>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {this.state.isTfReady && <Text>Tensorflow loaded!</Text>}
          {this.state.model && <Text>Model loaded successfully!</Text>}
          {this.state.error && <Text>Error : {this.state.error}</Text>}
          <Button title="Open Camera" />
        </View>
      </>
    );
  }
}
