export default function TodoList({ todos, updateTodoStatus, deleteTodo }) {
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
              {todo.status}
            </span>
          </div>
          <div className="todo-actions">
            <button className="icon-btn" onClick={() => updateTodoStatus(todo) }>
              <i className="fa-solid fa-rotate"></i>
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}