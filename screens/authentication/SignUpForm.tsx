import { useForm } from "react-hook-form";
import { Alert, SafeAreaView, StyleSheet, Text } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import FormInput from "../ui/FormInput";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/themeSlice";
import Button from "../ui/Button";

const formSchema = object({
  email: string().email("Please enter a valid email"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

const SignUpForm = () => {
  const theme = useSelector(selectTheme);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      repeat: "",
    },
    resolver: zodResolver(formSchema),
  });

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
        name={"passwordConfirm"}
        placeholder="repeat password"
        secureTextEntry
      />
      <Button onPress={handleSubmit(onSubmit)}>REGISTER</Button>
    </SafeAreaView>
  );
};

export default SignUpForm;
