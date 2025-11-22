import React from "react";
import { homeStyle } from "@/styles/home";
import { ScrollView, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { DatePickerInput, registerTranslation, pt } from "react-native-paper-dates";
import TodoItem from "@/components/TodoItem";
import { Controller, useForm } from "react-hook-form";
import TextInputControlled from "@/components/TextInputControlled";

registerTranslation('pt', pt);

type inputs = {
  title: string;
  description: string;
  timeLimit: Date;
};

export default function Home({ timeLimit, title, description }: inputs) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title,
      description,
      timeLimit,
    },
  });

  const onSubmit = (data: inputs) => {
    console.log(data);
  };

  return (
    <View style={homeStyle.container}>
      <ScrollView>
        <Card style={homeStyle.cardRegisterNewActivity}>
          <Text style={homeStyle.title}>Registre uma nova atividade</Text>
          <Card.Content>
            <TextInputControlled
              control={control}
              label="Título"
              name="title"
            />
            <TextInputControlled
              control={control}
              label="Descrição"
              name="description"
            />

            <Controller
              name="timeLimit"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePickerInput
                  onBlur={onBlur}
                  animationType="fade"
                  presentationStyle="pageSheet"
                  style={homeStyle.textInputStyle}
                  label={"Prazo máximo"}
                  mode="outlined"
                  value={value}
                  locale="pt"
                  inputMode="start"
                  onChange={onChange}
                />
              )}
            />

            <Button
              style={homeStyle.buttonRegisterNewTodoItem}
              mode="contained"
              onPress={handleSubmit(onSubmit)}
            >
              Registrar atividade
            </Button>
          </Card.Content>
        </Card>

        <Card style={homeStyle.cardRecentsRegisters}>
          <Text style={homeStyle.title}>Ultimos registros</Text>
          <Card.Content>
            {/* Criar componente */}
            <TodoItem />
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}
