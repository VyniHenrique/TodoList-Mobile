import React, { useEffect, useState } from "react";
import { homeStyle } from "@/styles/home";
import { FlatList, ScrollView, View, Modal } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import {
  DatePickerInput,
  registerTranslation,
  pt,
} from "react-native-paper-dates";
import TodoItem from "@/components/TodoItem";
import { Controller, useForm } from "react-hook-form";
import TextInputControlled from "@/components/TextInputControlled";
import {
  API_URl_FIND_ALL_TODO_ITEM,
  API_URl_POST,
  API_URl_UPDATE,
} from "@/routes/routes";

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
  const [idToUpdate, setIdToUpdate] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const handleOpenModal = (task: TaskResponse) => {
    setIdToUpdate(task.id);
    reset({
      title: task.title,
      description: task.description,
      timeLimit: new Date(task.timeLimit),
    });

    setVisible(true);
  };
  const hideModal = () => {
    
    setVisible(false);
    setIdToUpdate(null);
    reset({ title: "", description: "", timeLimit: new Date() });
  };

  useEffect(() => {
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
  };

  const handleUpdate = async (id: string, data: inputs) => {
    try {
      const response = await fetch(API_URl_UPDATE(id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao atualizar item.");
      } else {
        await handleGetAllTasks();
        reset();
        console.log("passou aqui");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateSubmit = (data: inputs) => {
    if(idToUpdate){
      handleUpdate(idToUpdate, data);
      hideModal();
    }
  };

  return (
    <View style={homeStyle.container}>
      <Modal
        animationType="fade"
        transparent={true}
        onDismiss={hideModal}
        visible={visible}
        onRequestClose={hideModal}
      >
        <View style={homeStyle.modalOverlay}>
          <View style={homeStyle.modalContent}>
            <Text style={{ textAlign: "center" }} variant="titleLarge">
              Atualize a tarefa
            </Text>
            <TextInputControlled
              style={homeStyle.textInputControledTitle}
              control={control}
              label="Título"
              name="title"
            />
            <TextInputControlled
              style={homeStyle.textInputControledDescription}
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
                  style={homeStyle.textInputDatePickerModal}
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
              onPress={handleSubmit(onUpdateSubmit)}
            >
              Atualizar
            </Button>
          </View>
        </View>
      </Modal>
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
              renderItem={({ item }) => (
                <TodoItem
                  showModal={() => handleOpenModal(item)}
                  onDeleteSuccess={handleGetAllTasks}
                  id={item.id}
                  description={item.description}
                  timeLimit={new Date(item.timeLimit)}
                  title={item.title}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}
