export default function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span
            onClick={() => toggleTodo(todo.id, todo.completed)}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer'
            }}
          >
            {todo.title}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>X</button>
        </li>
      ))}
    </ul>
  );
}