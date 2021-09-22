import axios from "axios";
import ITodo from "./types/Todo";
const baseUrl = "http://localhost:8080/api";

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

  const data: [ITodo] = await res.data;

  data.forEach(async (d: any) => {
    d.user = await getUserByID(d.userId);
  });

  return data;
};

export { getUserByID, getTodos };
