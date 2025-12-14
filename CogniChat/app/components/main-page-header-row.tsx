import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

export const MainPageHeaderRow = () => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.homeButton}
        onPress={() => router.navigate("../menu")}
      >
        <Ionicons name="home" size={40} color="black" />
      </Pressable>
      <Pressable
        style={styles.settingsButton}
        onPress={() => router.navigate("./components/settings-page")}
      >
        <Ionicons name="cog" size={40} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  homeButton: {
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
  },
  settingsButton: {
    padding: 10,
    backgroundColor: "white",
    justifyContent: "center",
  },
});

export default MainPageHeaderRow;
