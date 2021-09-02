import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import CameraComponent from "./Components/Camera";
// import NativeCamera from "./Components/NativeCamera";
// import Tensorflow from "./Components/Tensorflow";
// import DrawRectangle from "./Components/DrawRectangle";
// import ViewFinderComponent from "./Components/ViewFinder";
import TensorflowFunctional from "./Components/TensorflowFunctional";

export default function App() {
  console.log("app reached");
  return <TensorflowFunctional />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
