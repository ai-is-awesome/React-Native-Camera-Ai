import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { loadGraphModel } from "@tensorflow/tfjs-converter";

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

    // try {
    //   const model = await loadGraphModel("../bin/model.json");
    //   console.log("model: ", model);
    //   this.setState({ model: model });
    // } catch (e) {
    //   console.log("error: ", e);
    // }
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
