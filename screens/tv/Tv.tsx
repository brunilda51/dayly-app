import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import tvShowsService from "../../services/tv.service";
import FilteringForm from "../FilterForm";
import DeleteConfirmation from "../DeleteConfirmation";
import ModalComponent from "../Modal";
import TvForm from "./TvForm";

const TvShows = () => {
  const userId = useSelector((state: any) => state.user.id);
  const [data, setData] = useState<any[]>([]);
  async function fetchTvShows() {
    try {
      const result = await tvShowsService.getAllTvShows("");
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
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
  const deleteTv = async (tvId: string) => {
    try {
      await tvShowsService.deleteTv(tvId);
      await fetchTvShows();
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
        {item.viewer._id === userId ? (
          <View style={styles.buttons}>
            <ModalComponent
              element={<TvForm defaultValues={item} refresh={fetchTvShows} />}
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
                <DeleteConfirmation itemId={item._id} deleteItem={deleteTv} />
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
    borderRadius: 20,
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

export default TvShows;
