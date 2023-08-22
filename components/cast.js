import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";

export default function Cast({ cast }) {
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity key={index} className="mr-4 items-center">
                <Text className="text-white text-xs mt-1">John Wick</Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
