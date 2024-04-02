import { useForm } from "react-hook-form";
import { Alert, SafeAreaView, StyleSheet, Text } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import FormInput from "../ui/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../redux/themeSlice";
import Button from "../ui/Button";
import { usePostAuthLoginMutation } from "../../redux/authApi";
import { setToken } from "../../redux/authSlice";

const formSchema = object({
  email: string().email("Please enter a valid email"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

const SignInForm = () => {
  const theme = useSelector(selectTheme);
  const [postAuthLogin] = usePostAuthLoginMutation();

  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (form: any) => {
    try {
      const data: any = await postAuthLogin({
        body: form,
      }).unwrap();
      dispatch(setToken(data.result.token));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
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
      <Text style={styles.header}>SIGN IN</Text>
      <FormInput control={control} name={"email"} placeholder="email" />
      <FormInput
        control={control}
        name={"password"}
        placeholder="password"
        secureTextEntry
      />
      <Button onPress={handleSubmit(onSubmit)}>LOG IN</Button>
    </SafeAreaView>
  );
};

export default SignInForm;
