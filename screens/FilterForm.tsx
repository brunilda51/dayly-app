import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import usersServices from "../services/users.service";
import { Button } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons/";
import { Dropdown } from "react-native-element-dropdown";

export default function FilteringForm({ onFilter }: any) {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<any>([]);

  const handleFilter = () => {
    // Perform filtering logic based on filterText and filterOption
    // Pass the filtered results to the parent component using the onFilter prop
    onFilter(value);
  };
  useEffect(() => {
    async function fetchUsers() {
      try {
        const result = await usersServices.getAllUsers();
        let users = [{ label: "All", value: "" }];
        result.map((a: any) => {
          users.push({ label: a.username, value: a.username });
        });
        setItems(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchUsers();
  }, []);
  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={items}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: any) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <FontAwesome5
            color={isFocus ? "lightblue" : "black"}
            style={styles.icon}
            name="user-graduate"
            size={20}
          />
        )}
      />
      <Button
        title="Filter"
        onPress={handleFilter}
        style={{ backgroundColor: "#00a6a6" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  input: {
    width: "100%",
    zIndex: 2,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
  },
});
