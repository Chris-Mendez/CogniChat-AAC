import { View, StyleSheet } from "react-native";

const Seperator: React.FC = () => {
  return <View style={style.container} />;
};

const style = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Seperator;
