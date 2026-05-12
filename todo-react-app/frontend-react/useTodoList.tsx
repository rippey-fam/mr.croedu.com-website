import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

const ctx = createContext<TodoState | null>(null);

export function TodoProvider({ children }: PropsWithChildren) {
  const state = useTodoList();
  return <ctx.Provider value={state}>{children}</ctx.Provider>;
}

export function useTodoListContext() {
  const state = useContext(ctx);
  if (!state)
    throw new Error("useTodoListContext must be used within a TodoProvider");
  return state;
}
let startState: TodoItem[] = [];
function useAsync(callback: () => Promise<any>) {
  const [state, setState] = useState<{
    state: string;
    data: any | null;
    error: unknown;
  }>({
    state: "loading",
    data: null,
    error: null,
  });
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  useEffect(() => {
    let unmounted = false;
    async function run() {
      try {
        await delay(1);
        if (unmounted) return;
        const data = await callback();
        if (unmounted) return;
        setState({
          state: "ready",
          data,
          error: null,
        });
      } catch (error) {
        if (unmounted) return;
        setState({
          state: "error",
          data: null,
          error,
        });
      }
    }
    run();

    return () => {
      unmounted = true;
    };
  }, []);

  return state;
}
function useTodoList() {
  const [list, setList] = useState<Array<TodoItem>>(() => startState);
  const fetchedTodos = useAsync(async () => {
    const response = await fetch("/todo/api/todos");
    const data = response.json();
    return data;
  });
  useEffect(() => {
    if (fetchedTodos.state === "ready") {
      setList(fetchedTodos.data);
    }
  }, [fetchedTodos]);
  function updateItem(item: TodoItem, newVals: Partial<TodoItem>) {
    const previousList = list;

    setList(
      list.map((old) => {
        if (old.index !== item.index) {
          return old;
        }
        const newItem = { ...old, ...newVals };
        return newItem;
      }),
    );

    console.log("making fetch");
    fetch("/todo/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todoItem: item,
        updatedFields: newVals,
        startTime: Date.now(),
      }),
    }).then((response) => {
      console.log("response:", response);
      if (!response.ok) {
        console.error("Failed to update item", response);
        setList(previousList);
      } else {
        console.log("Item updated successfully");
      }
    });
  }
  function addItem(
    item: Omit<Omit<TodoItem, "_id">, "todo_list">,
    todo_list: TodoList,
  ) {
    const previousList = list;
    const newItem = {
      ...item,
      _id: "temp-id",
      todo_list,
    };
    setList([...list, newItem]);
    /*{
        title: { type: String, required: true, maxLength: 100 },
        complete: { type: Boolean, required: true },
        index: { type: Number, required: true },
        due_date: { type: Date },
        created_at: { type: Date, default: Date.now },
        todo_list: { type: Schema.Types.ObjectId, ref: "TodoList", required: true },
    }*/
    console.log("making fetch");
    fetch("/todo/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todoItem: newItem,
        startTime: Date.now(),
      }),
    }).then(async (response) => {
      console.log("response:", response);
      if (!response.ok) {
        console.error("Failed to add item", response);
        setList(previousList);
      } else {
        const data = await response.json();
        const addedItem = data.item;
        setList([...list.slice(0, list.length - 2), addedItem]);
        console.log("Item added successfully");
      }
    });
  }
  return { list, updateItem, addItem };
}
type TodoList = {
  _id: string;
  title: string;
};

export type TodoItem = {
  title: string;
  complete: boolean;
  index: number;
  due_date?: Date;
  created_at?: Date;
  todo_list: TodoList;
  _id: string;
};
export type TodoState = ReturnType<typeof useTodoList>;
