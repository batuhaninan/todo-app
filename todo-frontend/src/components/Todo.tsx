import { useState, useContext } from "react";
import axios from "axios";
import ITodo from "../types/Todo";
import { baseUrl } from "../index";

import styles from "./Todo.module.css";
import TodoContext from "../TodoContext";

import { Button, ButtonGroup } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Todo = (props: ITodo) => {
  const todoContext = useContext(TodoContext);

  const [username, setUsername] = useState("");
  const [isFinished, setIsFinished] = useState(props.isFinished);

  const getUserByID = async (id: Number) => {
    const res = await axios.get(`${baseUrl}/users/${id}`);
    if (res.status === 200) {
      setUsername(res.data.username);
    }
  };

  getUserByID(props.userId);

  const deleteTodo = async () => {
    await axios.delete(`${baseUrl}/todos/${props.id}`);
    todoContext?.removeTodo?.(props.id);
  };

  const editTodo = async () => {};

  const completeTodo = async () => {
    const res = await axios.put(`${baseUrl}/todos/${props.id}`, { isFinished });
    console.log(res);
    if (res.status === 200) {
      return;
    }

    todoContext?.completeTodo?.(props.id);
    setIsFinished(!isFinished);
  };

  return (
    <Paper elevation={18} sx={{ width: "250px" }}>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        paddingTop="20px"
        marginLeft="10px"
      >
        <Grid item>
          <Typography>{`@${username}` || "Anonymous"}</Typography>
        </Grid>
        <Grid item>
          <Typography>{props.text}</Typography>
        </Grid>
        <Grid item>
          <Checkbox
            checked={isFinished}
            onChange={completeTodo}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Grid>
        {JSON.stringify(props)}
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          paddingRight="20px"
          paddingBottom="10px"
          sx={{ gap: "10px" }}
        >
          <Grid item>
            <ButtonGroup>
              <Button variant="contained" onClick={editTodo}>
                <EditIcon />
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <ButtonGroup>
              <Button variant="contained" onClick={deleteTodo}>
                <DeleteIcon />
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Todo;
/*
<div className={styles.todo}>
      <p onClick={completeTodo}>
      </p>

      <div className={styles.todoButtons}>
        

        
      </div>
    </div>

*/
