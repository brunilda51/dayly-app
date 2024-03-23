import { View, Text, StyleSheet, FlatList } from "react-native";
import { memo, useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import DeleteConfirmation from "../DeleteConfirmation";
import ModalComponent from "../Modal";
import FilteringForm from "../FilterForm";
import moviesService from "../../services/movies.service";
import MovieForm from "./MovieForm";

const Movies = () => {
  const userId = useSelector((state: any) => state.user.id);
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState<any>(0);
  async function fetchMovies() {
    try {
      const result = await moviesService.getAllMovies(page, filter);
      setData(data.concat(result));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  const loadMoreData = () => {
    let newPage = page + 1;
    setPage(newPage);
    fetchMovies();
  };

  const filterMovies = async (filterText: string) => {
    try {
      setFilter(filterText);
      const result = await moviesService.getAllMovies(page, filter);
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const deleteMovie = async (movieId: string) => {
    try {
      await moviesService.deleteMovie(movieId);
      await fetchMovies();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const ListItem = memo(({ item }: any) => {
    return (
      <View style={{ ...styles.container, backgroundColor: item.viewer.color }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.item}>{item.viewer.username}</Text>
        <Text style={styles.item}>{item.rating}</Text>
        <Text style={styles.item}>{item.watch_date}</Text>
        {item.viewer._id === userId ? (
          <View style={styles.buttons}>
            <ModalComponent
              element={<MovieForm defaultValues={item} refresh={fetchMovies} />}
              color={"white"}
              text={
                <Icon
                  name="edit"
                  color={item.viewer.color}
                  style={styles.button}
                />
              }
            />

            <ModalComponent
              element={
                <DeleteConfirmation
                  itemId={item._id}
                  deleteItem={deleteMovie}
                />
              }
              color={"white"}
              text={
                <Icon
                  name="delete"
                  color={item.viewer.color}
                  style={styles.button}
                />
              }
            />
          </View>
        ) : null}
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <FilteringForm onFilter={filterMovies} />
      <FlatList
        data={data}
        renderItem={({ item }) => <ListItem item={item} />}
        initialNumToRender={7}
        onEndReachedThreshold={0.2}
        onEndReached={loadMoreData}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    elevation: 2,
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  button: {
    minWidth: 50,
  },
});

export default Movies;
