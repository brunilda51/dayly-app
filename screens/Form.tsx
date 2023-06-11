import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function FilteringForm({ onFilter }: any) {
  const [filterText, setFilterText] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "William", value: "apple" },
    { label: "Hannah", value: "banana" },
  ]);

  const handleFilter = () => {
    // Perform filtering logic based on filterText and filterOption
    // Pass the filtered results to the parent component using the onFilter prop
    onFilter(filterText, filterOption);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter filter text"
        value={filterText}
        onChangeText={setFilterText}
      />
      <DropDownPicker
        style={styles.input}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <Button title="Filter" onPress={handleFilter} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  input: {
    width: "100%",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
  },
});
