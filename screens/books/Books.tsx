import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import booksService from "../../services/books.service";
import FilteringForm from "../FilterForm";
import { formatDate, getFormattedDate } from "../../util/date";

const Books = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const result = await booksService.getAllBooks("");
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchBooks();
  }, []);

  const filterBooks = async (filterText: string) => {
    try {
      const result = await booksService.getAllBooks(filterText);
      setData(result);
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
          {formatDate(item.start_date)} - {formatDate(item.finish_date)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FilteringForm onFilter={filterBooks} />
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

export default Books;
