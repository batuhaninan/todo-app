import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import useTodos from "./TodoHooks";
import TodoContext from "./TodoContext";

export const baseUrl = process.env.CLIENT_API_BASE_URL || "http://localhost:8080/api";

const Index = () => {

  const todoContext = useTodos(useState(useContext(TodoContext)))

  return (
      <BrowserRouter>
        <TodoContext.Provider value={todoContext}>
          <App />
        </TodoContext.Provider>
      </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);