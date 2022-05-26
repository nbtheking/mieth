import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./component/Movie";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=acea91d2bff1c53e6604e4985b6989e2&page=1"
      );
      const data = await response.data.results;
      console.log(data);
      setMovies(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.header}>Movie List</Text>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          movies.map((movie) => (
            <View style={styles.container} key={movie.id}>
              <Movie
                title={movie.title}
                overview={movie.overview}
                poster={movie.poster_path}
                date={movie.release_date}
              />
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#E6E1E1",
    margin: 10,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 15,
    padding: 30,
    paddingBottom: 5,
    textAlign: "center",
  },
});
