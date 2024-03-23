import React from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/themeSlice";

const FormInput = ({ control, name, ...otherProps }: any) => {
  const theme = useSelector(selectTheme);
  const styles = StyleSheet.create({
    input: {
      padding: 10,
      margin: 10,
      textAlign: "center",
      borderWidth: 1,
      borderColor: theme.colors.brunswick,
      borderRadius: 5,
      backgroundColor: "white",
      width: 300,
      fontSize: theme.typography.headers.h5.fontSize,
    },
    error: {
      color: "#B70000",
      fontSize: theme.typography.headers.h6.fontSize,
    },
  });
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            value={value}
            style={styles.input}
            onChangeText={onChange}
            onBlur={onBlur}
            {...otherProps}
          />
          {error && <Text style={styles.error}>{error.message}</Text>}
        </>
      )}
    />
  );
};
export default FormInput;
