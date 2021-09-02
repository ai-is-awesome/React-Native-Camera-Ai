import React from "react";
import ViewFinder from "react-native-view-finder";
import { SafeAreaView, View, view } from "react-native";

export default ViewFinderComponent = ({ color }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ViewFinder color={color} />
    </SafeAreaView>
  );
};
