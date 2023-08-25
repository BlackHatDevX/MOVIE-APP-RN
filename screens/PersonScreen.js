import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PersonScreen() {
  return (
    <SafeAreaView>
      <View className="mt-4 ml-4 w-full">
        <Text className="font-black">PersonScreen</Text>
      </View>
    </SafeAreaView>
  );
}
