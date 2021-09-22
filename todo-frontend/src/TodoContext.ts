import React from "react"
import ITodo from "./types/Todo"

type TodoContextProps = {
    todos: ITodo[],
    addTodo: Function,
    completeTodo: Function,
    removeTodo: Function
}

const TodoContext = React.createContext<TodoContextProps | null>(null)
export default TodoContext;