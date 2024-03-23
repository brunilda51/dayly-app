import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import booksService from "../../services/books.service";
import FilteringForm from "../FilterForm";
import { Icon } from "@rneui/themed";
import { useSelector } from "react-redux";
import ModalComponent from "../Modal";
import BookForm from "./BookForm";
import DeleteConfirmation from "../DeleteConfirmation";

const Books = () => {
  const userId = useSelector((state: any) => state.user.id);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<any>(0);
  async function fetchBooks() {
    try {
      const result = await booksService.getAllBooks("", page);
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const loadMoreData = () => {
    let newPage = page + 1;
    setPage(newPage);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filterBooks = async (filterText: string) => {
    try {
      const result = await booksService.getAllBooks(filterText, page);
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteBook = async (bookId: string) => {
    try {
      const result = await booksService.deleteBook(bookId);
      await fetchBooks();
    } catch (error) {
      console.error("Error fetching data:", error);
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
        {item.reader._id === userId ? (
          <View style={styles.buttons}>
            <ModalComponent
              element={<BookForm defaultValues={item} refresh={fetchBooks} />}
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
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FilteringForm onFilter={filterBooks} />
      <FlatList
        data={data}
        initialNumToRender={7}
        renderItem={renderItem}
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
