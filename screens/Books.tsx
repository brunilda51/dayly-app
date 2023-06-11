import { View, Text, StyleSheet, FlatList } from "react-native";
import * as React from "react";
import data from "./books.json";

export default function Books() {
  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.author}</Text>
        <Text>{item.reader}</Text>
        <Text>{item.rating}</Text>
        <Text>
          {item.start} - {item.finish}
        </Text>
      </View>
    );
  };

  const rows = data.map((obj, index) => ({ ...obj, id: index + 1 }));

  return (
    <View style={styles.container}>
      <FlatList
        data={rows}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    color: "#000",
  },
  item: {
    width: "100%",
    margin: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
    padding: 10,
  },
  title: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
});
