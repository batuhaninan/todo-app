export function addTodo(todos, todo) {
  todos.push(todo);
  return todos
}
  
export function completeTodo(todos, todoId) {
  todos.forEach((t) => {
    if (t.id === todoId) {
      t.isFinished = !t.isFinished
    }
  })
  return todos;
}

export function removeTodo(todos, todoId) {
  return todos.filter(t => t.id !== todoId);
}


  