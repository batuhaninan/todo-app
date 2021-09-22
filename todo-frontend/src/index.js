import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import useTodos from "./TodoHooks";
import TodoContext from "./TodoContext";

export const baseUrl = process.env.CLIENT_API_BASE_URL || "http://localhost:8080/api";

const Index = () => {
  const sampleTodo = useState([{
    id: 1,
    text: "",
    isFinished: false,
    user: "",
    createdAt: "",
    updatedAt: "",
    userId: 1,
}]) 

  const todos = useTodos(useState([]))

  return (
    <React.StrictMode>
      <BrowserRouter>
        <TodoContext.Provider value={todos}>
          <App />
        </TodoContext.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);