import { StyleSheet } from "react-native"

export const homeStyle = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 35,
		backgroundColor: "#abb8c2d5"
	},

	scrollViewContainer: {
		paddingBottom: 50
	},

	cardRegisterNewActivity: {
		marginTop: 20,
		marginHorizontal: 10,
		paddingVertical: 20,
		justifyContent: "flex-start"
	},

	title: {
		fontSize: 20,
		textAlign: "center"
	},

	textInputStyle: {
		marginVertical: 10
	},

	buttonRegisterNewTodoItem: {
		marginVertical: 30,
		marginHorizontal: 50,
		backgroundColor: "#015180ff"
	},

	cardRecentsRegisters: {
		marginTop: 40,
		paddingVertical: 30
	}
})