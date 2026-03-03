import { useState } from "react";
import AddButton from "./AddButton";
import TodoList from "./TodoList";
import { TodoProvider } from "./useTodoList";
import AddItemPopup from "./addItemPopup";

export default function App() {
  const [addItemDisplayed, changeAddItemDisplayed] = useState(false);
  function toggleAddItemDisplayed() {
    changeAddItemDisplayed(!addItemDisplayed);
    console.log(addItemDisplayed);
  }
  let granted = true;
  Notification.requestPermission().then((result) => {
    if (result !== "denied") {
      granted = true;
    } else {
      granted = false;
    }
  });

  return (
    <>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Todo List
      </h1>
      {!granted && <h1>I'M MAD!!!</h1>}
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
