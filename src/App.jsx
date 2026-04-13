
import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:3000/api/todos');
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (title) => {
    await axios.post('http://localhost:3000/api/todos', { title });
    fetchTodos();
  };

  const toggleTodo = async (id, completed) => {
    await axios.put(`http://localhost:3000/api/todos/${id}`, {
      completed: !completed,
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3000/api/todos/${id}`);
    fetchTodos();
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;