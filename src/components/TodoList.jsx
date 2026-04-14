export default function TodoList({ todos, updateTodoStatus, openDeleteModal }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className="todo-item">
          <div className="todo-content">
            <span
              className="todo-title"
            >
              {todo.title}
            </span>
            <span className={`todo-status status-${todo.status}`}>
              {todo.status === 'todo' ? "TO DO" : todo.status}
            </span>
          </div>
          <div className="todo-actions">
            <button className="edit-btn" onClick={() => updateTodoStatus(todo)}>
              <i class="fa-solid fa-pen"></i>
            </button>

            <button className="icon-btn" onClick={() => updateTodoStatus(todo)}>
              <i className="fa-solid fa-rotate"></i>
            </button>

            <button
              className="delete-btn"
              onClick={() => openDeleteModal(todo)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}