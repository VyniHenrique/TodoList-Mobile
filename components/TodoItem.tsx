import { API_URl_DELETE } from "@/routes/routes";
import { todoItemStyle } from "@/styles/todoItem";
import { View } from "react-native";
import {
  Button,
  Card,
  Text,
} from "react-native-paper";

type todoItemProps = {
  id: string;
  title: string;
  description: string;
  timeLimit: Date;
  onDeleteSuccess: () => void;
  showModal: () => void;
};

export default function TodoItem({
  title,
  description,
  timeLimit,
  id,
  onDeleteSuccess,
  showModal
}: todoItemProps) {


  const handleDeleteTask = async (id: string) => {
    try {
      const response = await fetch(API_URl_DELETE(id), {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Item deletado");
        onDeleteSuccess();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card style={todoItemStyle.card}>

      <Text style={todoItemStyle.title}>{title}</Text>

      <Text style={todoItemStyle.description}>{description}</Text>

      <Text style={todoItemStyle.timeLimit}>
        Prazo: {timeLimit.toLocaleDateString("pt-BR")}
      </Text>

      <View style={todoItemStyle.groupButtonView}>
        <Button
          onPress={showModal}
          style={todoItemStyle.buttonUpdate}
          mode="contained"
        >
          Editar
        </Button>
        <Button
          onPress={() => {
            handleDeleteTask(id);
          }}
          style={todoItemStyle.buttonDelete}
          mode="contained"
        >
          Deletar
        </Button>
      </View>
    </Card>
  );
}
