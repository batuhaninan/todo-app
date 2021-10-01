import { useState, useContext } from "react";
import axios from "axios";
import { baseUrl } from "../index";

import TodoContext from "../TodoContext";

import { Button, ButtonGroup } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import EditTodoForm from "./EditTodoForm";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Todo = (props) => {
  const { todos, removeTodo, completeTodo } = useContext(TodoContext);

  const [username, setUsername] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(props.isFinished);

  const getUserByID = async (id) => {
    const res = await axios.get(`${baseUrl}/users/${id}`);
    if (res.status === 200) {
      setUsername(res.data.username);
    }
  };

  getUserByID(props.userId);

  const _deleteTodo = async () => {
    await axios.delete(`${baseUrl}/todos/${props.id}`);
    console.log(todos)
    removeTodo(props.id);
    console.log(todos)
  };

  const _editTodo = async () => {};

  const _completeTodo = async () => {
    const res = await axios.put(`${baseUrl}/todos/${props.id}`, { isFinished });

    if (res.status !== 200) {
      return;
    }

    completeTodo(props.id);
    setIsFinished(!isFinished);
  };

  return (
    <Paper elevation={18} zeroMinWidth>
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
          <Typography sx={{ textDecoration: isFinished ? "line-through" : "" }}>{props.text}</Typography>
        </Grid>
        <Grid item>
          <Checkbox
            checked={isFinished}
            onChange={_completeTodo}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Grid>
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
              <Button variant="contained" >
                <EditIcon onClick={() => setEditDialogOpen(!editDialogOpen)}/>
                <EditTodoForm open={editDialogOpen} setEditDialogOpen={setEditDialogOpen} {...props} />
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <ButtonGroup>
              <Button variant="contained" onClick={_deleteTodo}>
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
