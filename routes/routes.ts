export const API_URl_POST = `http:${process.env.EXPO_PUBLIC_IP_LOCAL}:8080/todoItem`;

export const API_URl_FIND_ALL_TODO_ITEM = `http:${process.env.EXPO_PUBLIC_IP_LOCAL}:8080/todoItem/todoItemList`;

export const API_URl_UPDATE = (id: string) => `http:${process.env.EXPO_PUBLIC_IP_LOCAL}:8080/todoItem/${id}`;

export const API_URl_DELETE = (id: string) => `http:${process.env.EXPO_PUBLIC_IP_LOCAL}:8080/todoItem/${id}`;