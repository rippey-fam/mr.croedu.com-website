import { useTodoListContext } from "./useTodoList";

export default function TodoHeader() {
  const { list, updateItem } = useTodoListContext();
  return (
    <h1
      style={{
        textAlign: "center",
      }}
    >
      Todo List: {list[0]?.todo_list.title ?? "Loading..."}
    </h1>
  );
}
