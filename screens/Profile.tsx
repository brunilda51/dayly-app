import { View, Text, StyleSheet, FlatList } from "react-native";
import { Header as HeaderRNE, HeaderProps, Icon } from "@rneui/themed";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import usersService from "../services/users.service";
import ModalComponent from "./Modal";
import BookForm from "./books/BookForm";
import MovieForm from "./movies/MovieForm";
import TvForm from "./tv/TvForm";
const Profile = () => {
  const [user, setUser] = useState<any>({});
  const userId = useSelector((state: any) => state.user.id);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const result = await usersService.getUser(userId);
        setUser(result[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchUserProfile();
  }, []);
  return (
    <SafeAreaProvider>
      <HeaderRNE
        backgroundColor="#00a6a6"
        style={styles.headerContainer}
        centerComponent={{
          style: styles.heading,
          text: `Hello ${user.username}`,
        }}
      />
      <View style={styles.main}>
        <ModalComponent element={<BookForm />} text={"Add Book"} />
        <ModalComponent element={<MovieForm />} text={"Add Movie"} />
        <ModalComponent element={<TvForm />} text={"Add Tv Show"} />
      </View>
    </SafeAreaProvider>
  );
};
export default Profile;

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00a6a6",
    marginBottom: 20,
    width: "100%",
  },
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  heading: {
    color: "white",
    fontSize: 22,
    alignContent: "center",
    alignSelf: "center",
    fontWeight: "bold",
  },
  subheaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
