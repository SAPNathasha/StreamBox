import React, { useEffect } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/moviesSlice";
import MovieCard from "../components/MovieCard";
import { RootState } from "../store";

type Movie = {
  id: number;
  title: string;
  image?: string;
  overview?: string;
};

export default function HomeScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const movies = useSelector((s: RootState) => s.movies.list);
  const status = useSelector((s: RootState) => s.movies.status);

  useEffect(() => {
    dispatch<any>(fetchMovies("comedy"));
  }, [dispatch]);

  if (status === "loading") {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <View style={{ flex: 1, padding: 8 }}>
      <FlatList
        data={movies}
        keyExtractor={(item: Movie) => item.id?.toString() ?? item.title}
        renderItem={({ item }: { item: Movie }) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate("Details", { movie: item })}
          />
        )}
      />
    </View>
  );
}
