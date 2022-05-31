import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./component/Movie";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  const getMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=acea91d2bff1c53e6604e4985b6989e2&page=" +
          pageCount
      );
      const items = await response.data.results;
      console.log(items);
      setMovies([...movies, ...items]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  useEffect(() => {
    setIsLoading(true);
    getMovies();
  }, [pageCount]);

  const handleLoadMore = () => {
    setPageCount(pageCount + 1);
    setIsLoading(true);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.header}>Movie List</Text>
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={movies}
          renderItem={({ item }) => (
            <Movie
              title={item.title}
              overview={item.overview}
              poster={item.poster_path}
              date={item.release_date}
            />
          )}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
      <StatusBar />
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
    paddingTop: 10,
    padding: 30,
    paddingBottom: 10,
    textAlign: "center",
  },
  loader: {
    marginTop: 10,
    alignItems: "center",
    marginBottom: 100,
  },
});
