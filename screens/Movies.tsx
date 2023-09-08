import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import moviesService from "../services/movies.service";
import FilteringForm from "./Form";

const Movies = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const result = await moviesService.getAllMovies("");
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchMovies();
  }, []);

  const filterMovies = async (filterText: string) => {
    try {
      const result = await moviesService.getAllMovies(filterText);
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={{ ...styles.container, backgroundColor: item.viewer.color }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.item}>{item.viewer.username}</Text>
        <Text style={styles.item}>{item.rating}</Text>
        <Text style={styles.item}>{item.watch_date}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FilteringForm onFilter={filterMovies} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: "#fff",
    display: "flex",
    flex: 1,
    margin: 5,
    padding: 10,
  },
  item: {
    width: "100%",
    color: "#fff",
  },
  title: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Movies;
