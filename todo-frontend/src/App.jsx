import { useState, useEffect, useContext } from "react";
import Todo from "./components/Todo";
import AddTodoForm from "./components/AddTodoForm";
import axios from "axios";
import { baseUrl } from "./index";
import TodoContext from "./TodoContext";
import Grid from "@mui/material/Grid";
import Alert from '@mui/material/Alert';
import Navbar from "./components/Navbar";

const App = () => {

  const [mounted, setMounted] = useState(false)


  const { todos, addTodo } = useContext(TodoContext);

  const successAlert = (text) => {
    return <Alert severity="success">text</Alert>
  }

  const errorAlert = (text) => {
    return <Alert severity="error">text</Alert>
  }

  const getTodos = async () => {
    const res = await axios.get(`${baseUrl}/todos`);

    if (res.status !== 200) {
      console.error(res)
      return;
    }

    const data = await res.data;
    /*data.forEach(async (d) => {
      d.user = await getUserByID(d.userId);
    });*/

    return data;
  };

  const fillTodos = async () => {
    console.log("filling todos")
    getTodos().then((data) => {
      data.forEach((d) => {
        if (!todos.includes(d)) {
          addTodo(d);
        }
      });
    });
  };

  if (!mounted) {
    fillTodos()
  }

  useEffect(() =>{
    setMounted(true)
  },[todos])

  const todosLoading = () => {
    return <p>Todos are loading ...</p>;
  };

  return (
    <div className="App">
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        justifyContent="center"
        marginBottom="30px"
      >
        <Grid item>
          <Navbar />
        </Grid>

        <Grid item>
          <AddTodoForm />
        </Grid>
        {!todos && <Grid item>{todosLoading()}</Grid>}
        {todos.map((todo) => (
            <Grid item marginTop="30px" key={todo.id}>
              <Todo {...todo} />
            </Grid>
          )
        )}
      </Grid>
    </div>
  );
};

export default App;

/*
return (
    <TodoContext.Consumer>
      {todoContext => 
        <div className="App">
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
            marginBottom="30px"
          >
    
            <Grid item>
              <AddTodoForm />
            </Grid>
            {JSON.stringify(todoContext)}
            {!todoContext.todos && <Grid item>{todosLoading()}</Grid>}
            {todoContext.todos.map((todo) => (
                <Grid item marginBottom="20px" marginTop="50px" key={todo.id}>
                  <Todo {...todo} />
                </Grid>
              )
            )}
          </Grid>
        </div>
      }
    
    </TodoContext.Consumer>
  );
};
*/
