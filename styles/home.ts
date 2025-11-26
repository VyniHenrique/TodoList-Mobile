import { StyleSheet } from "react-native";

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    backgroundColor: "#abb8c2d5",
  },

  scrollViewContainer: {
    paddingBottom: 50,
  },

  cardRegisterNewActivity: {
    marginTop: 20,
    marginHorizontal: 10,
    paddingVertical: 20,
    justifyContent: "flex-start",
  },

  title: {
    fontSize: 20,
    textAlign: "center",
  },

  textInputStyle: {
    marginVertical: 10,
  },

  buttonRegisterNewTodoItem: {
    marginVertical: 30,
    marginHorizontal: 50,
    backgroundColor: "#015180ff",
  },

  cardRecentsRegisters: {
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 10,
    paddingVertical: 15,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    width: "85%",
    height: 350,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
    textInputControledTitle: {
    marginBottom: 0
  },

  textInputControledDescription: {
    marginBottom: 50
  },

  textInputDatePickerModal: {
    marginBottom: 25
  }
});
