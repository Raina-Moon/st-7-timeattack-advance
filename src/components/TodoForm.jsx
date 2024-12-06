import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { todoApi } from "../api/todos";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const { addTodo, isLoading } = useMutation();

  // const queryClient = useQueryClient();
  // // TODO: 선택: useMutation을 useTodoMutation 커스텀훅으로 정리해 보세요.
  // const addMutation = useMutation({
  //   mutationFn: (newTodo) => todoApi.post("/todos", newTodo),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["todos"]);
  //   },
  // });

  // const handleAddTodo = async (e) => {
  //   e.preventDefault();
  //   setTitle("");
  //   setContents("");
  //   addMutation.mutate({
  //     id: Date.now().toString(),
  //     title,
  //     contents,
  //     isCompleted: false,
  //     liked: false,
  //     createdAt: Date.now(),
  //   });
  // };

  const handleAddTodo = async (e) => {
    e.preventDefault();

    const newTodo = {
      id: Date.now().toString(),
      title,
      contents,
      isCompleted: false,
      liked: false,
      createdAt: Date.now(),
    };

    addTodo(newTodo);
    setTitle("");
    setContents("");
  };
  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="title">제목:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="contents">내용:</label>
      <input
        id="contents"
        name="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        required
      />
      <button type="submit">{isLoading ? "로딩 중..." : "추가하기"}</button>
    </form>
  );
}
