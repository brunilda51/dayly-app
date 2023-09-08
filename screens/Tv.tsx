import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import tvShowsService from "../services/tv.service";
import FilteringForm from "./Form";

const TvShows = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTvShows() {
      try {
        const result = await tvShowsService.getAllTvShows("");
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchTvShows();
  }, []);

  const filterTvShows = async (filterText: string) => {
    try {
      const result = await tvShowsService.getAllTvShows(filterText);
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
        <Text style={styles.item}>
          {item.start_date} - {item.finish_date}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FilteringForm onFilter={filterTvShows} />
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

export default TvShows;
