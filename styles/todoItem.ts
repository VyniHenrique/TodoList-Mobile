import { StyleSheet } from "react-native"

export const todoItemStyle = StyleSheet.create({

	card: {
		marginVertical: 10,
		backgroundColor: "#d4e2f7ff",
		marginHorizontal: 5
	},

	title: {
		marginTop: 15,
		marginBottom: 10,
		textAlign: "center"
	},

	description: {
		marginBottom: 20,
		marginStart: 15,
		marginEnd: 15
	},

	timeLimit: {
		marginBottom: 20,
		marginStart: 15
	},

	groupButtonView: {
		flexDirection: "row",
		justifyContent: "center",
		marginVertical: 15
	},

	buttonUpdate: {
		backgroundColor: "#cab70eff",
		marginRight: 10
	},

	buttonDelete: {
		backgroundColor: "#a50d0dff"
	}
})