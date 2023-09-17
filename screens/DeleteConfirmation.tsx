import { View, Text, StyleSheet, FlatList } from "react-native";
import Button from "./ui/Button";

const DeleteConfirmation = ({ toggleModal, itemId, deleteItem }: any) => {
  const deleteFlow = () => {
    deleteItem(itemId);
    toggleModal();
  };
  return (
    <View style={styles.view}>
      <Text>Are you sure you want to delete this?</Text>
      <View style={styles.centeredContent}>
        <Button style={styles.button} mode="flat" onPress={toggleModal}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={deleteFlow}>
          Yes
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 20,
  },
  centeredContent: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 5,
  },
});

export default DeleteConfirmation;
