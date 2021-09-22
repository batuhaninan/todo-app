import { useEffect, useContext } from "react";
import Todo from "./components/Todo";
import AddTodoForm from "./components/AddTodoForm";
import axios from "axios";
import { baseUrl } from "./index";
import TodoContext from "./TodoContext";
import ITodo from "./types/Todo";
import Grid from "@mui/material/Grid";

const App = () => {
  const todoContext = useContext(TodoContext);

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

    console.log(todoContext, data);
    return data;
  };

  useEffect(() => {
    let isMounted = true;
    getTodos().then((data) => {
      if (isMounted) {
        data.forEach((d: any) => {
          todoContext?.addTodo?.(d);
        });
      }
    });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const todosLoading = () => {
    return <p>Todos are loading ...</p>;
  };

  return (
    <div className="App">
      <TodoContext.Consumer>
        {(todosContext) => (
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
            marginBottom="30px"
          >
            {!todosContext?.todos && <Grid item>{todosLoading()}</Grid>}
            {todosContext?.todos?.map?.((todo: ITodo) => {
              return (
                <Grid item marginBottom="20px" key={todo.id}>
                  <Todo {...todo} />
                </Grid>
              );
            })}
            <Grid item>
              <AddTodoForm />
            </Grid>
          </Grid>
        )}
      </TodoContext.Consumer>
    </div>
  );
};

export default App;

/*
!todos && todosLoading()
          todos?.map((todo: any) => {
            return <Todo key={todo.id} {...todo} />;
          })
          <AddTodoForm />

*/
