import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Movie = ({ title, overview, poster, date }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.overview}>{overview}</Text>
      <Image
        source={{ uri: "https://image.tmdb.org/t/p/w500/" + poster }}
        alt={title}
        style={{ height: 200, width: "100%", resizeMode: "cover" }}
      />
      <Text style={styles.date}> Release Date:{date}</Text>
    </View>
  );
};

export default Movie;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "white",
  },
  overview: {
    padding: 5,
    backgroundColor: "white",
    textAlign: "justify",
  },
  date: {
    padding: 5,
    fontStyle: "italic",
    backgroundColor: "white",
  },
});
