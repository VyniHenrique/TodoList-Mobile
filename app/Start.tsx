import { router } from "expo-router";
import { startStyle } from "../styles/start";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export default function Start() {
  const navigate = () => {
    router.navigate("/Home");
  }
  return (
    <View style={startStyle.container}>
      <View style={startStyle.titleContainer}>
        <Text style={startStyle.titleContent}>
          Bem vindo ao app de gerenciamento de tarefas
        </Text>
      </View>
      <View style={startStyle.bodyContainer}>
        <Button onPress={navigate} mode="elevated">
          Entrar
        </Button>
      </View>
    </View>
  );
}
