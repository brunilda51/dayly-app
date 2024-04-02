import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import {
  useGetAllBooksQuery,
  useDeleteBookMutation,
  useGetFilteredBooksQuery,
} from "../../redux/booksApi";
import FilteringForm from "../FilterForm";
import { Icon } from "@rneui/themed";
import ModalComponent from "../Modal";
import BookForm from "./BookForm";
import DeleteConfirmation from "../DeleteConfirmation";

const Books = () => {
  // Fetch books data from the API

  const [page, setPage] = useState(1);
  const { data, isFetching, refetch }: any = useGetFilteredBooksQuery({
    page: page,
  });

  const loadMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    refetch();
  }, [page]);

  const deleteBookMutation = useDeleteBookMutation();

  const deleteBook = async (bookId: string) => {
    try {
      // await deleteBookMutation.mutateAsync({ id: bookId });
      await refetch();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={{ ...styles.container, backgroundColor: item.reader.color }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.item}>{item.author}</Text>
        <Text style={styles.item}>{item.reader.username}</Text>
        <Text style={styles.item}>{item.rating}</Text>
        <Text style={styles.item}>
          {item.start_date} - {item.finish_date}
        </Text>
        <View style={styles.buttons}>
          <ModalComponent
            element={<BookForm defaultValues={item} refresh={refetch} />}
            color={"white"}
            text={
              <Icon
                name="edit"
                color={item.reader.color}
                style={styles.button}
              />
            }
          />

          <ModalComponent
            element={
              <DeleteConfirmation itemId={item._id} deleteItem={deleteBook} />
            }
            color={"white"}
            text={
              <Icon
                name="delete"
                color={item.reader.color}
                style={styles.button}
              />
            }
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FilteringForm onFilter={(filterText: string) => setPage(0)} />
      <FlatList
        data={data?.books}
        renderItem={renderItem}
        onEndReachedThreshold={0.2}
        onEndReached={loadMoreData}
        keyExtractor={(item: any, index) => item._id.toString()}
        numColumns={1}
        refreshing={isFetching}
        onRefresh={refetch}
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

export default Books;
