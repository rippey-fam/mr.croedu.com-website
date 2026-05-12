import { useState } from "react";
import AddButton from "./AddButton";
import AddItemPopup from "./AddItemPopup";
import TodoList from "./TodoList";
import TodoHeader from "./TodoHeader";
import { useTodoListContext } from "./useTodoList";

export default function App() {
  const [addItemDisplayed, changeAddItemDisplayed] = useState(false);
  const { list, addItem } = useTodoListContext();
  function toggleAddItemDisplayed() {
    changeAddItemDisplayed(!addItemDisplayed);
    console.log(addItemDisplayed);
  }

  return (
    <div className="center-block">
      <TodoHeader />

      <TodoList />
      <AddButton
        callback={() =>
          addItem(
            {
              title: `New Todo #${list.length}`,
              complete: false,
              index: list.length ? list[0].index + 1 : 1,
            },
            list[0]?.todo_list,
          )
        }
      />
      {addItemDisplayed && (
        <AddItemPopup toggleVisibility={toggleAddItemDisplayed} />
      )}
    </div>
  );
}
