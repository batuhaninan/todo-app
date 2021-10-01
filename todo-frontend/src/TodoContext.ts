import React from "react"
import ITodo from "./types/Todo"

export interface TodoContextProps {
    todos: ITodo[],
    addTodo: Function,
    completeTodo: Function,
    removeTodo: Function
}

const TodoContext = React.createContext([])
export default TodoContext;