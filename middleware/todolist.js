import axios from "axios";
import { useLoading, useTodoList } from "~/composables/state";

export default defineNuxtPlugin(async () => {
  const loading = useLoading();
  const todoList = useTodoList();
  try {
    loading.value = true;
    setTimeout(async () => {
      const result = await axios.get("http://localhost:3001/todolist");
      todoList.value = result.data;
      loading.value = false;
    }, 1400);
  } catch (error) {
    console.log(error, "false in get data todolist");
  }
});
