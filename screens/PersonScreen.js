import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "../theme";
import { Shadow } from "react-native-shadow-2";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/moviedb";

var { width, height } = Dimensions.get("window");

export default function PersonScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);
  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) setPerson(data);
    setLoading(false);
  };
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    if (data && data.cast) setPersonMovies(data.cast);
  };
  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      // contentContainerStyle={{ padding: 20 }}
    >
      {/* back button   */}
      <SafeAreaView className="z-20 w-full flex-row justify-between items-center px-4 mt-3">
        <TouchableOpacity
          style={styles.background}
          className="rounded-xl p-1"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
          <HeartIcon size="35" color={isFavorite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details  */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View className="flex-row justify-center mb-10">
            <Shadow
              distance={40}
              startColor={"#333333"}
              endColor={"#171717"}
              offset={[0, 5]}
              style={{ borderRadius: 180 }}
            >
              <View className="rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2">
                <Image
                  // source={require("../assets/images/castImage2.png")}
                  source={{
                    uri: image342(person.profile_path) || fallbackPersonImage,
                  }}
                  style={{ height: height * 0.43, width: width * 0.74 }}
                ></Image>
              </View>
            </Shadow>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {person?.name}
            </Text>
            <Text className="text-base text-neutral-500 text-center">
              {person.place_of_birth}
            </Text>
            <View className="mx-3 p-4 mt-6 flex-row justify-between item-center bg-neutral-700 rounded-full">
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Gender</Text>
                <Text className="text-neutral-300 text-sm">
                  {person.gender == 1 ? "Female" : "Male"}
                </Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Birthday</Text>
                <Text className="text-neutral-300 text-sm">
                  {person.birthday}
                </Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Known for</Text>
                <Text className="text-neutral-300 text-sm">
                  {person.known_for_department}
                </Text>
              </View>
              <View className="-400 px-2 items-center">
                <Text className="text-white font-semibold">Popularity</Text>
                <Text className="text-neutral-300 text-sm">
                  {person.popularity.toFixed(2)} %
                </Text>
              </View>
            </View>
            <View className="my-6 mx-4 space-y-2">
              <Text className="text-white text-lg">Biography</Text>
              <Text className="text-neutral-500 tracking-wide">
                {person.biography || "N/A"}
              </Text>
            </View>
            {/* movies of this person  */}
            <MovieList
              data={personMovies}
              title="Movies"
              hideSeeAll={true}
            ></MovieList>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
