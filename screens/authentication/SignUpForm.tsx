import { Controller, useForm } from "react-hook-form";
import { toggleTheme } from "../../redux/themeSlice";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../ui/FormInput";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/themeSlice";
import Button from "../ui/Button";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  full_name: z.string().min(3, "Full name must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const SignUpForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      repeat: "",
    },
    resolver: zodResolver(formSchema),
  });

  const theme = useSelector(selectTheme);

  const onSubmit = (data: any) => {
    Alert.alert("Successful", JSON.stringify(data));
  };
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      paddingTop: 70,
      height: "100%",
      width: "100%",
      backgroundColor: theme.colors.timberwolf,
    },
    header: {
      textAlign: "center",
      color: theme.colors.brunswick,
      fontWeight: "bold",
      fontSize: theme.typography.headers.h1.fontSize,
      padding: 10,
    },
  });

  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={styles.header}>SIGN UP</Text>
      <FormInput control={control} name={"email"} placeholder="email" />

      <FormInput
        control={control}
        name={"password"}
        placeholder="password"
        secureTextEntry
      />
      <FormInput
        control={control}
        name={"repeat"}
        placeholder="repeat password"
      />
      <Button onPress={handleSubmit(onSubmit)}>REGISTER</Button>
    </SafeAreaView>
  );
};

export default SignUpForm;
