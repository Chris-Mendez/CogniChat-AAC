import React from "react";
import { StyleSheet, View } from "react-native";

export const MainPageTabsRow = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    flexDirection: "row",
    backgroundColor: "#AF8EC9",
    paddingVertical: 5,
  },
});

export default MainPageTabsRow;
