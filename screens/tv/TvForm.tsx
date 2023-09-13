import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";

const TvForm = (props: any) => {
  const [value, setValue] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.formLabel}>Add a new Tv Show</Text>
      <View>
        <TextInput
          placeholder="Title"
          defaultValue={props.title ? props.title : ""}
          style={styles.inputStyle}
        />
        <TextInput
          placeholder="Author"
          defaultValue={props.author ? props.author : ""}
          style={styles.inputStyle}
        />
        <TextInput
          placeholder="Start Date"
          defaultValue={props.start_date ? props.start_date : ""}
          style={styles.inputStyle}
        />
        <TextInput
          placeholder="Finish Date"
          defaultValue={props.finish_date ? props.finish_date : ""}
          style={styles.inputStyle}
        />
        <TextInput
          placeholder="Rating"
          defaultValue={props.rating ? props.rating : ""}
          style={styles.inputStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eff1f3",
    borderRadius: 20,
    padding: 20,
  },
  formLabel: {
    fontSize: 20,
    color: "#000",
  },
  inputStyle: {
    width: 300,
    height: 40,
    margin: 10,
  },
  formText: {
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 20,
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
});

export default TvForm;
