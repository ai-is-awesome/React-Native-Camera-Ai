import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import CameraComponent from "./Components/Camera";
// import NativeCamera from "./Components/NativeCamera";
// import Tensorflow from "./Components/Tensorflow";
// import DrawRectangle from "./Components/DrawRectangle";
// import ViewFinderComponent from "./Components/ViewFinder";
import TensorFlowFunctional from "./Components/TensorflowFunctional";

export default function App() {
  return <TensorFlowFunctional />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
