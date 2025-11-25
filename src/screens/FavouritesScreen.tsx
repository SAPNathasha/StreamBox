import React from "react";
import { View, FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MovieCard from "../components/MovieCard";

type Movie = {
  id: number;
  title: string;
  poster_path?: string;
  vote_average?: number;
  release_date?: string;
};

export default function FavouritesScreen({ navigation }: any) {
  const favs = useSelector((state: RootState) => state.favourites.items as Movie[]);

  if (!favs.length)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>No favourites yet</Text>
      </View>
    );

  return (
    <FlatList<Movie>
      data={favs}
      keyExtractor={(item: Movie) => item.id.toString()}
      renderItem={({ item }: { item: Movie }) => (
        <MovieCard
          movie={item}
          onPress={() => navigation.navigate("Details", { movie: item })}
        />
      )}
    />
  );
}
