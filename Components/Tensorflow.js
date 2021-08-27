import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import {
  fetch,
  decodeJpeg,
  bundleResourceIO,
} from "@tensorflow/tfjs-react-native";

import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Camera from "./Camera";
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
    const modelJson = require("../bin/model.json");
    const modelWeights = require("../bin/group1-shardof5.bin");
    // const modelWeights = require("../bin");
    const model = await tf
      .loadGraphModel(bundleResourceIO(modelJson, modelWeights))
      .catch((e) => {
        this.setState({ error: "Unable to load model" });
        console.log("error : ", e);
      });
    this.setState({ model: model });
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
        </View>
      </>
    );
  }
}
