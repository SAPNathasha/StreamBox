import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";
import { RootState } from "../store";

export default function MovieCard({ movie, onPress }: any) {
  const dispatch = useDispatch();
  const favs = useSelector((s: RootState) => s.favourites.items);
  const isFav = favs.some((f: any) => f.id === movie.id);

  const toggleFav = () => {
    if (isFav) dispatch(removeFavourite(movie));
    else dispatch(addFavourite(movie));
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {movie.posterUrl ? (
        <Image source={{ uri: movie.posterUrl }} style={styles.image} />
      ) : null}
      <View style={{ flex: 1, paddingLeft: 8 }}>
        <Text style={styles.title}>{movie.title || movie.name}</Text>
        <Text numberOfLines={2}>{movie.description ?? movie.plot ?? movie.overview ?? ""}</Text>
      </View>
      <TouchableOpacity onPress={toggleFav} style={{ padding:8 }}>
        <Feather name={isFav ? "star" : "star"} size={20} color={isFav ? "gold" : "gray"}/>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection:'row', padding:8, marginBottom:8, borderRadius:8, backgroundColor:'#fff', alignItems:'center', elevation:1 },
  image: { width:60, height:90, borderRadius:4 },
  title: { fontWeight:'bold' }
});
