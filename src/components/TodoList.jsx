import { Link, useNavigate } from "react-router-dom";

export default function TodoList({ todos }) {
  const navigate = useNavigate();
  return (
    <ul style={{ listStyle: "none", width: 250 }}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{todo.title}</h3>
          <Link to={`/detail/${todo.id}`}>
            내용보기
          </Link>
        </li>
      ))}
    </ul>
  );
}
