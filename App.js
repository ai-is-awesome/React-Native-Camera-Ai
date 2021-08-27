import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CameraComponent from "./Components/Camera";
import Tensorflow from "./Components/Tensorflow";

export default function App() {
  return <Tensorflow />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
