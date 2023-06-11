import { View, Text, StyleSheet, FlatList } from "react-native";
import * as React from "react";
import data from "./books.json";
import FilteringForm from "./Form";

export default function Books() {
  const renderItem = ({ item }: any) => {
    return (
      <View style={{ ...styles.container, backgroundColor: item.color }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.item}>{item.author}</Text>
        <Text style={styles.item}>{item.reader}</Text>
        <Text style={styles.item}>{item.rating}</Text>
        <Text style={styles.item}>
          {item.start} - {item.finish}
        </Text>
      </View>
    );
  };

  const rows = data.map((obj, index) => {
    let color = "";
    switch (obj.reader) {
      case "Hannah":
        color = "lightred";
        break;
      case "William":
        color = "orange";
        break;
      case "Mame":
        color = "#6fbd62";
        break;
      case "Max":
        color = "#1ca2e9";
        break;
      default:
        break;
    }
    return { ...obj, id: index + 1, color: color };
  });

  return (
    <View style={styles.container}>
      <FilteringForm />
      <FlatList
        data={rows}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
      />
    </View>
  );
}

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
