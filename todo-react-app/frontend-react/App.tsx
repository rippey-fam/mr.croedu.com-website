import { useState } from "react";
import AddButton from "./AddButton";
import TodoList from "./TodoList";
import { TodoProvider } from "./useTodoList";
import AddItemPopup from "./AddItemPopup";

export default function App() {
  const [addItemDisplayed, changeAddItemDisplayed] = useState(false);
  function toggleAddItemDisplayed() {
    changeAddItemDisplayed(!addItemDisplayed);
    console.log(addItemDisplayed);
  }
  console.log("building");
  // const itemName = prompt("New Item Name:");
  // if (itemName) {
  //   addItem({
  //     id: (list.at(-1)?.id ?? 0) - 1,
  //     title: itemName,
  //     complete: false,
  //   });
  // }
  return (
    <>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Todo List
      </h1>
      <TodoProvider>
        <TodoList />
        <AddButton callback={toggleAddItemDisplayed} />
        {addItemDisplayed && (
          <AddItemPopup toggleVisibility={toggleAddItemDisplayed} />
        )}
      </TodoProvider>
    </>
  );
}
