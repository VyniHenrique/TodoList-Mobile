import React from "react";
import { homeStyle } from "@/styles/home";
import { FlatList, ScrollView, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import {
  DatePickerInput,
  registerTranslation,
  pt,
} from "react-native-paper-dates";
import TodoItem from "@/components/TodoItem";
import { Controller, useForm } from "react-hook-form";
import TextInputControlled from "@/components/TextInputControlled";
import { API_URl_POST } from "@/routes/routes";

registerTranslation("pt", pt);

type inputs = {
  title: string;
  description: string;
  timeLimit: Date;
};

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    description: 'Descricao 1',
    timeLimit: "2020-11-10"
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    description: 'Descricao 2',
    timeLimit: "2020-11-10"
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    description: 'Descricao 3',
    timeLimit: "2020-11-10"
  },
];

export default function Home({ timeLimit, title, description }: inputs) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title,
      description,
      timeLimit,
    },
  });

  const onSubmit = async (data: inputs) => {
    try {
      const response = await fetch(API_URl_POST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao cadastrar item.");
      } else {
        console.log("passou")
      }
    } catch (error) {
      console.log(error);
    }
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
            <FlatList 
              scrollEnabled={false}
              data={DATA}
              renderItem={ ({item}) => <TodoItem id={item.id} description={item.description} timeLimit={item.timeLimit} title={item.title}/>}
              keyExtractor={item => item.id}
            
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}
