import React, { useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import MovieCard from "../components/MovieCard";
import { fetchMovies } from "../store/moviesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

type Movie = {
  id: number;
  title: string;
  image?: string;
  overview?: string;
};

export default function HomeScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((s) => s.movies.list);
  const status = useAppSelector((s) => s.movies.status);

  useEffect(() => {
    dispatch(fetchMovies("comedy"));
  }, [dispatch]);

  if (status === "loading") {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <View style={{ flex: 1, padding: 8 }}>
      <FlatList
        data={movies}
        keyExtractor={(item: Movie) =>
          item.id?.toString() ?? item.title
        }
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
