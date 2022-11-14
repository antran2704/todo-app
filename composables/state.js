import axios from "axios";

const useTodoList = () => {
  return useState("todoList", () => [])
};

const useOverlay = () => {
  return useState("overlay", () => false)
}

const useLoading = () => {
  return useState("loading", () => false);
};

const useNameTodo = () => {
  return useState("name", () => "");
};

const useSelect = () => {
  return useState("select", () => "");
};

const useDate = () => {
  return useState("date", () => "");
};

export {
  useTodoList,
  useNameTodo,
  useSelect,
  useDate,
  useLoading,
  useOverlay,
};
