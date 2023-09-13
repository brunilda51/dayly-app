import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

import moviesService from "../../services/movies.service";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { getFormattedDate } from "../../util/date";

import { GlobalStyles } from "../styles";

const MovieForm = ({ defaultValues, toggleModal }: any) => {
  const userId = useSelector((state: any) => state.user.id);
  const [inputs, setInputs] = useState({
    title: {
      value: defaultValues ? defaultValues.title : "",
      isValid: true,
    },
    rating: {
      value: defaultValues ? defaultValues.rating : "",
      isValid: true,
    },
    watch_date: {
      value: defaultValues ? getFormattedDate(defaultValues.start_date) : "",
      isValid: true,
    },
  });

  const submitMovieForm = (form: any) => {
    form.reader = userId;
    moviesService.addMovie(form);
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
    const movieData: any = {
      title: inputs.title.value,
      rating: inputs.rating.value,
      start_date: inputs.watch_date.value,
    };

    const watchDateIsValid =
      new Date(movieData.watch_date).toString() !== "Invalid Date";
    const titleIsValid = movieData.title?.length > 0;
    const ratingIsValid = movieData.rating?.length > 0;

    if (!titleIsValid || !ratingIsValid || !watchDateIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          title: { value: curInputs.title.value, isValid: titleIsValid },
          watch_date: {
            value: curInputs.watch_date.value,
            isValid: watchDateIsValid,
          },
          rating: {
            value: curInputs.rating.value,
            isValid: ratingIsValid,
          },
        };
      });
      return;
    }

    submitMovieForm(movieData);
  };

  const formIsInvalid =
    !inputs.title.isValid ||
    !inputs.rating.isValid ||
    !inputs.watch_date.isValid;

  return (
    <ScrollView style={styles.form}>
      <Text style={styles.title}>Your New Movie</Text>
      <Input
        label="Title"
        invalid={!inputs.title.isValid}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "title"),
          value: inputs.title.value,
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
          label="Watch Date"
          invalid={!inputs.watch_date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "start_date"),
            value: inputs.watch_date.value,
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

export default MovieForm;

const styles = StyleSheet.create({
  form: {
    display: "flex",
    backgroundColor: "#fff",
    alignContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary100,
    textAlign: "center",
    marginVertical: 20,
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
