import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LandingPage from "./komponen/LandingPage";
import Home from "./komponen/Home"
const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Home />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
