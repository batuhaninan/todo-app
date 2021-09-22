import { useState } from "react";

import { ITodo } from "../types/Todo";
import axios from "axios";

import { baseUrl } from "../index";

const Todo = (props: ITodo) => {
  const [username, setUsername] = useState("");

  const getUserByID = async (id: Number) => {
    const res = await axios.get(`${baseUrl}/users/${id}`);
    if (res.status === 200) {
      setUsername(res.data.username);
    }
  };

  getUserByID(props.userId);

  return (
    <div className="todo">
      <p>{props.text}</p>
      <p>{username || "Anonymous"}</p>
      <p>{props.isFinished ? "Finished" : "Not Finished"}</p>
    </div>
  );
};

export default Todo;
