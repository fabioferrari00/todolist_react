
import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editTitle, setEditTitle] = useState('');


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

    try {
      await axios.patch(
        `http://localhost:3000/api/todos/${todo.id}`,
        {
          status: nextStatus,
        }
      );

      fetchTodos();
    } catch (error) {
      console.error('STATUS UPDATE ERROR:', error);
    }
  };


  const openDeleteModal = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setEditTitle(todo.title);
    setShowEditModal(true);
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

  const saveEditTodo = async () => {
    if (!editingTodo || !editTitle.trim()) return;

    await axios.put(
      `http://localhost:3000/api/todos/${editingTodo.id}`,
      {
        title: editTitle,
        status: editingTodo.status,
      }
    );

    setShowEditModal(false);
    setEditingTodo(null);
    setEditTitle('');
    fetchTodos();
  };

  return (
    <div className='app-container'>
      <h1>ToDo List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        updateTodoStatus={updateTodoStatus}
        openDeleteModal={openDeleteModal}
        openEditModal={openEditModal}
      />
      {/*CONFIRM DELETE MODAL*/}
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

      {/*EDIT MODAL*/}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Modifica task</h2>

            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Nuovo titolo"
            />

            <div className="modal-actions">
              <button className='icon-btn' onClick={() => setShowEditModal(false)}>
                Annulla
              </button>

              <button className="save-btn" onClick={saveEditTodo}>
                Salva
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;