import { useState, useContext } from "react";
import { baseUrl } from "../index";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import TodoContext from "../TodoContext";
import styles from "./Todo.module.css";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const AddTodoForm = () => {
  const todoContext = useContext(TodoContext);

  const [postForm, setPostForm] = useState({
    text: "",
    userId: "",
    title: "add-todo",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;

    setPostForm({
      ...postForm,
      [e.target.name]: value,
    });
  };

  const submitForm = async () => {
    if (postForm.text === "" && postForm.userId === "") {
      return;
    }
    const res = await axios.post(`${baseUrl}/todos`, postForm);
    if (res.status === 400) {
      return;
    }

    todoContext?.addTodo?.(res.data);
    setPostForm({
      text: "",
      userId: "",
      title: "add-todo",
    });
  };

  return (
    <Paper elevation={18} sx={{ width: "300px" }}>
      <Grid
        container
        spacing={2}
        marginTop="100px"
        paddingBottom="50px"
        marginLeft="20px"
        direction="column"
      >
        <Grid item>
          <TextField
            id="filled-basic"
            label="Text:"
            name="text"
            value={postForm.text}
            onChange={handleChange}
            variant="filled"
          />
        </Grid>

        <Grid item>
          <TextField
            id="filled-basic"
            label="User ID:"
            name="userId"
            value={postForm.userId}
            onChange={handleChange}
            variant="filled"
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" onClick={submitForm}>
            Add TODO
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddTodoForm;
