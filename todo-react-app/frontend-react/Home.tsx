import { useState } from "react";
import AddButton from "./AddButton";
import AddItemPopup from "./AddItemPopup";
import TodoList from "./TodoList";
import TodoHeader from "./TodoHeader";

export default function App() {
  const [addItemDisplayed, changeAddItemDisplayed] = useState(false);
  function toggleAddItemDisplayed() {
    changeAddItemDisplayed(!addItemDisplayed);
    console.log(addItemDisplayed);
  }

  return (
    <>
      <TodoHeader />

      <TodoList />
      <AddButton callback={toggleAddItemDisplayed} />
      {addItemDisplayed && (
        <AddItemPopup toggleVisibility={toggleAddItemDisplayed} />
      )}
    </>
  );
}
