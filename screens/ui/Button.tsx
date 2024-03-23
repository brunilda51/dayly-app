import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/themeSlice";

function Button({ children, onPress, mode, style }: any) {
  const theme = useSelector(selectTheme);

  const styles = StyleSheet.create({
    button: {
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: theme.colors.hunter,
      marginTop: 20,
    },
    flat: {
      backgroundColor: "transparent",
    },
    buttonText: {
      color: "white",
      textAlign: "center",
    },
    flatText: {
      color: "black",
    },
    pressed: {
      opacity: 0.75,
      color: "white !important",
      backgroundColor: theme.colors.fern,
      borderRadius: 8,
    },
  });
  return (
    <View style={style}>
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <View
            style={[
              styles.button,
              style,
              mode === "flat" && styles.flat,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                mode === "flat" && {
                  color: pressed ? "white" : theme.colors.fern,
                },
              ]}
            >
              {children}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

export default Button;
