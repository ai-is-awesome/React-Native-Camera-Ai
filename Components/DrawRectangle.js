import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

const Rectangle = () => {
  return (
    <SafeAreaView style={styles.rectangle}>
      <View style={styles.rectangleDraw}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rectangle: { flex: 1 },
  rectangleDraw: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 4,
    borderColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginRight: 30,
    marginLeft: 30,
    marginTop: 40,
    marginBottom: 40,
  },
  container: {
    flex: 1,
    // width: "200px",
    // height: "200px",
    backgroundColor: "transparent",
  },
});

export default Rectangle;
