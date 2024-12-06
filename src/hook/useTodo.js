import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "../api/todos";

export function useTodoMutation() {
  const queryClient = useQueryClient();
  // TODO: 선택: useMutation을 useTodoMutation 커스텀훅으로 정리해 보세요.
  const addMutation = useMutation({
    mutationFn: (newTodo) => todoApi.post("/todos", newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
  return {
    addTodo : addMutation.mutate,
    isLoading: addMutation.isLoading,
    error: addMutation.error,
  };
}
