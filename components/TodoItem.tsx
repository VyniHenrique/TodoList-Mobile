import { todoItemStyle } from "@/styles/todoItem";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

type todoItemProps = {
	id: string,
	title: string,
	description: string,
	timeLimit: string
};

export default function TodoItem({title, description, timeLimit, id}: todoItemProps) {
  return (
    <Card style={todoItemStyle.card}>
      <Text style={todoItemStyle.title}>{title}</Text>

      <Text style={todoItemStyle.description}>{description}</Text>

      <Text style={todoItemStyle.timeLimit}>{timeLimit}</Text>

      <View style={todoItemStyle.groupButtonView}>
        <Button style={todoItemStyle.buttonUpdate} mode="contained" >Atualizar</Button>
        <Button style={todoItemStyle.buttonDelete} mode="contained">Deletar</Button>
      </View>
    </Card>
  );
}
