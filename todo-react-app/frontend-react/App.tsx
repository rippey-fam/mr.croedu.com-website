import { useState } from "react";
import AddButton from "./AddButton";
import AddItemPopup from "./AddItemPopup";
import TodoList from "./TodoList";
import { TodoProvider } from "./useTodoList";
import TodoHeader from "./TodoHeader";

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
      <TodoProvider>
        <TodoHeader />

        <TodoList />
        <AddButton callback={toggleAddItemDisplayed} />
        {addItemDisplayed && (
          <AddItemPopup toggleVisibility={toggleAddItemDisplayed} />
        )}
      </TodoProvider>
    </>
  );
}
