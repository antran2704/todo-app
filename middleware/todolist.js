import axios from "axios";
import { useLoading, useTodoList, useStorage } from "~/composables/state";

export default defineNuxtPlugin(async () => {
  const loading = useLoading();
  const todoList = useTodoList();
  const config = useRuntimeConfig();
  const token = useStorage();

  try {
    loading.value = true;
    if (!token.value && process.client) {
      window.location.pathname = "/login";
      return;
    }
    const result = await axios.get(`${config.public.url}/todolist`);
    todoList.value = result.data;
    loading.value = false;
  } catch (error) {
    console.log(error, "false in get data todolist");
  }
});
