import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { todoApi } from "../api/todos";

export default function TodoList() {
  const navigate = useNavigate();
  // TODO: 선택: useQuery 를 useTodosQuery 커스텀훅으로 정리해 보세요.
  const {
    data: todos,
    error,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await todoApi.get("/todos");
      return response.data;
    },
  });

  // TODO: 필수: 아래 handleLike 로 구현되어 있는 부분을 useMutation 으로 리팩터링 해보세요. 모든 기능은 동일하게 동작해야 합니다.
  // TODO: 선택: useMutation 으로 리팩터링 후, useTodoMutation 커스텀훅으로 정리해 보세요.

  // const handleLike = async (id, currentLiked) => {
  //   const previousTodos = [...todos];
  //   try {
  //     queryClient.setQueryData(["todos"], (prev) =>
  //       prev.map((todo) =>
  //         todo.id === id ? { ...todo, liked: !todo.liked } : todo,
  //       ),
  //     );
  //     await todoApi.patch(`/todos/${id}`, {
  //       liked: !currentLiked,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     queryClient.setQueryData(["todos"], previousTodos);
  //   } finally {
  //     refetch();
  //   }
  // };

  // if (isPending) {
  //   return <div style={{ fontSize: 36 }}>로딩중...</div>;
  // }

  // if (error) {
  //   console.error(error);
  //   return (
  //     <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>
  //   );
  // }
  // const queryClient = useQueryClient();
  const handleLike = useMutation(
    async ({ id, currentLiked }) => {
      const LikedTodo = { like: !currentLiked };
      await todoApi.patch(`/todos/${id}`, LikedTodo);
    },
    // {
    //   onSuccess: () => {
    //     queryClient.invalidateQueries(["todos"]);
    //   },
    // }
  );

  if (isPending) return <div style={{ fontSize: 36 }}>로딩중...</div>;
  if (error)
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>
    );

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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => navigate(`/detail/${todo.id}`)}>
              내용보기
            </button>
            {todo.liked ? (
              <FaHeart
                onClick={() => handleLike.mutate(todo.id, todo.liked)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <FaRegHeart
                onClick={() => handleLike.mutate(todo.id, todo.liked)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
