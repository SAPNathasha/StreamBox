import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

export default function DetailsScreen({ route }: any) {
  const { movie } = route.params;
  return (
    <ScrollView style={{ flex:1, padding:12 }}>
      {movie.posterUrl && <Image source={{ uri: movie.posterUrl }} style={{ width:'100%', height:300, borderRadius:8 }} />}
      <Text style={{ fontSize:22, fontWeight:'bold', marginTop:8 }}>{movie.title ?? movie.name}</Text>
      <Text style={{ marginTop:8 }}>{movie.description ?? movie.plot ?? movie.overview}</Text>
    </ScrollView>
  );
}
