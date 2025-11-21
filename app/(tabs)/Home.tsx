import React, { useState } from "react";
import { homeStyle } from "@/styles/home";
import { ScrollView, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import TodoItem from "@/components/TodoItem";

type inputs = {
  timeLimit: Date;
};
export default function Home({ timeLimit }: inputs) {
  const [inputDate, setInputDate] = useState<Date | undefined>(timeLimit);

  return (
    <View style={homeStyle.container}>
      <ScrollView>
        <Card style={homeStyle.cardRegisterNewActivity}>
          <Text style={homeStyle.title}>Registre uma nova atividade</Text>
          <Card.Content>
            <TextInput
              activeOutlineColor="#0070f8"
              style={homeStyle.textInputStyle}
              mode="outlined"
              label={"Titulo"}
            />
            <TextInput
              activeOutlineColor="#0070f8"
              style={homeStyle.textInputStyle}
              mode="outlined"
              label={"Descrição"}
            />

            <DatePickerInput
			animationType="fade"
			presentationStyle="pageSheet"
              style={homeStyle.textInputStyle}
              label={"Prazo máximo"}
              mode="outlined"
              value={inputDate}
              locale="pt"
              inputMode="start"
              onChange={(d) => setInputDate(d)}
            />

            <Button
              style={homeStyle.buttonRegisterNewTodoItem}
              mode="contained"
            >
              Registrar atividade
            </Button>
          </Card.Content>
        </Card>

        <Card style={homeStyle.cardRecentsRegisters}>
          <Text style={homeStyle.title}>Ultimos registros</Text>
          <Card.Content>
			{/* Criar componente */}
            <TodoItem/>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}
