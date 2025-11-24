import React, { useEffect, useState } from "react";
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
import { API_URl_FIND_ALL_TODO_ITEM, API_URl_POST } from "@/routes/routes";

registerTranslation("pt", pt);

type inputs = {
  title: string;
  description: string;
  timeLimit: Date;
};

interface TaskResponse {
  id: string;
  title: string;
  description: string;
  timeLimit: string;
}


export default function Home({ timeLimit, title, description }: inputs) {

  useEffect( () => {
    handleGetAllTasks();
  }, []);

  const [tasks, setTasks] = useState<TaskResponse[]>([]);

  const { control, handleSubmit, reset } = useForm({
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

        await handleGetAllTasks();
        reset();
        console.log("passou");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };



  const handleGetAllTasks = async () => {
    try {
      const response = await fetch(API_URl_FIND_ALL_TODO_ITEM);
      const data = await response.json();
      setTasks(data);
      console.log("passou");
    } catch (error) {
      console.error(error);
    }
  }



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
              data={tasks}
              renderItem={ ({item}) => <TodoItem onDeleteSuccess={handleGetAllTasks} id={item.id} description={item.description} timeLimit={new Date(item.timeLimit)} title={item.title}/>}
              keyExtractor={item => item.id}
            
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}
