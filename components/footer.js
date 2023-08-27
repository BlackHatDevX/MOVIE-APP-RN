import { View, Text, Linking } from "react-native";
import React from "react";
import { theme } from "../theme";

export default function Footer() {
  return (
    <View>
      <Text
        className="text-center"
        style={{ color: "blue" }}
        onPress={() => Linking.openURL("http://telegram.dog/about_jashgro")}
      >
        <Text
          className="text-center font-light pb-2"
          style={{ color: theme.text }}
        >
          🔗 Developed by Jash Gro
        </Text>
      </Text>
    </View>
  );
}
