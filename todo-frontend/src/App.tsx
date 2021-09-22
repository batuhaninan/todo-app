import { useState, useEffect } from "react";

import Todo from "./components/Todo";
import axios from "axios";

import { ITodo } from "./types/Todo";
import { baseUrl } from "./index";

const App = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const getUserByID = async (id: Number) => {
    const res = await axios.get(`${baseUrl}/users/${id}`);

    if (res.status === 200) {
      return res.data.username;
    }

    return "";
  };

  const getTodos = async () => {
    const res = await axios.get(`${baseUrl}/todos`);

    if (res.status !== 200) {
      return;
    }

    const data = await res.data;

    data.forEach(async (d: any) => {
      d.user = await getUserByID(d.userId);
    });

    setTodos(data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const todosLoading = () => {
    return <p>Todos are loading ...</p>;
  };

  return (
    <div className="App">
      {!todos && todosLoading()}
      {todos.map((todo) => {
        return <Todo key={todo.id} {...todo} />;
      })}
    </div>
  );
};

export default App;
