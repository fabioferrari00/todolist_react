
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

  const updateTodoStatus = async (todo) => {
    const nextStatus =
      todo.status === 'todo'
        ? 'doing'
        : todo.status === 'doing'
          ? 'done'
          : 'todo';

    await axios.put(`http://localhost:3000/api/todos/${todo.id}`, {
      status: nextStatus,
    });

    fetchTodos();
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const openDeleteModal = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3000/api/todos/${id}`);
    fetchTodos();
  };

  const confirmDelete = async () => {
    if (!selectedTodo) return;

    await deleteTodo(selectedTodo.id);

    setShowModal(false);
    setSelectedTodo(null);
  };

  return (
    <div className='app-container'>
      <h1>ToDo List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        updateTodoStatus={updateTodoStatus}
        openDeleteModal={openDeleteModal}
      />
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Conferma eliminazione</h2>

            <p>
              Sei sicuro di voler definitivamente eliminare:
              <strong> {selectedTodo?.title}</strong>?
            </p>
            <strong>Dopo non potrai più risalire a questa precisa TASK</strong>

            <div className="modal-actions">
              <button className='icon-btn' onClick={() => setShowModal(false)}>
                Annulla
              </button>

              <button className="delete-btn" onClick={confirmDelete}>
                Elimina
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;