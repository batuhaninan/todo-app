import { addTodo, completeTodo, removeTodo } from "./TodoService";

export default function useTodos([todos, setTodos]) {
  return {
    todos,
    addTodo: todo => setTodos(addTodo(todos, todo)),
    completeTodo: todo => setTodos(completeTodo(todos, todo)),
    removeTodo: todo => setTodos(removeTodo(todos, todo))
  };
}