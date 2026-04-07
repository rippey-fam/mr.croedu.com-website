import { useState } from "react";
import AddButton from "./AddButton";
import AddItemPopup from "./AddItemPopup";
import TodoList from "./TodoList";
import TodoHeader from "./TodoHeader";
import { Link } from "react-router-dom";

export default function App() {
  const [addItemDisplayed, changeAddItemDisplayed] = useState(false);
  function toggleAddItemDisplayed() {
    changeAddItemDisplayed(!addItemDisplayed);
    console.log(addItemDisplayed);
  }

  return (
    <>
      <h1> This is the update page </h1>
      <Link
        to="/"
        style={{
          display: "block",
          marginTop: "1em",
          textAlign: "center",
          color: "white",
        }}
      >
        Go back to home{" "}
        <i className="fa-solid fa-arrow-up-right-from-square"></i>
      </Link>
    </>
  );
}
