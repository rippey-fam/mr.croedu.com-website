import { useState } from "react";
import AddButton from "./AddButton";
import AddItemPopup from "./AddItemPopup";
import TodoList from "./TodoList";
import TodoHeader from "./TodoHeader";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [addItemDisplayed, changeAddItemDisplayed] = useState(false);
  function toggleAddItemDisplayed() {
    changeAddItemDisplayed(!addItemDisplayed);
    console.log(addItemDisplayed);
  }

  const navigate = useNavigate();
  return (
    <div className="center-block">
      <TodoHeader />

      <TodoList />
      <AddButton callback={() => navigate("/add/todo/")} />
    </div>
  );
}
