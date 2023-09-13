import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import booksService from "../../services/books.service";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { getFormattedDate } from "../../util/date";
import { useSelector } from "react-redux";

const BookForm = ({ defaultValues, toggleModal }: any) => {
  const userId = useSelector((state: any) => state.user.id);
  const [inputs, setInputs] = useState({
    title: {
      value: defaultValues ? defaultValues.title : "",
      isValid: true,
    },
    author: {
      value: defaultValues ? defaultValues.author : "",
      isValid: true,
    },
    rating: {
      value: defaultValues ? defaultValues.rating : "",
      isValid: true,
    },
    start_date: {
      value: defaultValues ? getFormattedDate(defaultValues.start_date) : "",
      isValid: true,
    },
    finish_date: {
      value: defaultValues ? getFormattedDate(defaultValues.finish_date) : "",
      isValid: true,
    },
  });

  const submitBookForm = (form: any) => {
    form.reader = userId;
    booksService.addBook(form);
    toggleModal();
  };
  const inputChangedHandler = (inputIdentifier: any, enteredValue: any) => {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const bookData: any = {
      title: inputs.title.value,
      author: inputs.author.value,
      rating: inputs.rating.value,
      start_date: inputs.start_date.value,
      finish_date: inputs.finish_date.value,
    };

    const startDateIsValid =
      new Date(bookData.start_date).toString() !== "Invalid Date";
    const finishDateIsValid =
      new Date(bookData.finish_date).toString() !== "Invalid Date";
    const titleIsValid = bookData.title?.length > 0;
    const authorIsValid = bookData.author?.length > 0;
    const ratingIsValid = bookData.rating?.length > 0;

    if (
      !titleIsValid ||
      !authorIsValid ||
      !ratingIsValid ||
      !startDateIsValid ||
      !finishDateIsValid
    ) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          title: { value: curInputs.title.value, isValid: titleIsValid },
          start_date: {
            value: curInputs.start_date.value,
            isValid: startDateIsValid,
          },
          finish_date: {
            value: curInputs.finish_date.value,
            isValid: finishDateIsValid,
          },
          author: {
            value: curInputs.author.value,
            isValid: authorIsValid,
          },
          rating: {
            value: curInputs.rating.value,
            isValid: ratingIsValid,
          },
        };
      });
      return;
    }

    submitBookForm(bookData);
  };

  const formIsInvalid =
    !inputs.title.isValid ||
    !inputs.author.isValid ||
    !inputs.rating.isValid ||
    !inputs.start_date.isValid ||
    !inputs.finish_date.isValid;

  return (
    <ScrollView style={styles.form}>
      <Text style={styles.title}>Your New Book</Text>
      <Input
        label="Title"
        invalid={!inputs.title.isValid}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "title"),
          value: inputs.title.value,
        }}
      />
      <Input
        label="Author"
        invalid={!inputs.author.isValid}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "author"),
          value: inputs.author.value,
        }}
      />
      <Input
        label="Rating"
        invalid={!inputs.rating.isValid}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "rating"),
          value: inputs.rating.value,
        }}
      />
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Start Date"
          invalid={!inputs.start_date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "start_date"),
            value: inputs.start_date.value,
          }}
        />
      </View>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Finish Date"
          invalid={!inputs.finish_date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "finish_date"),
            value: inputs.finish_date.value,
          }}
        />
      </View>
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={toggleModal}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {"Submit"}
        </Button>
      </View>
    </ScrollView>
  );
};

export default BookForm;

const styles = StyleSheet.create({
  form: {
    display: "flex",
    backgroundColor: "#fff",
    alignContent: "center",
    paddingHorizontal: 50,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 5,
  },
});
