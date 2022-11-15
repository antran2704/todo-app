import axios from "axios";
import { useLoading, useTodoList } from "~/composables/state";

export default defineNuxtPlugin(async () => {
  const loading = useLoading();
  const todoList = useTodoList();
  const config = useRuntimeConfig();

  try {
    loading.value = true;
    setTimeout(async () => {
      const result = await axios.get(`${config.public.url}/todolist`);
      todoList.value = result.data;
      loading.value = false;
    }, 800);
  } catch (error) {
    console.log(error, "false in get data todolist");
  }
});
