import { useState } from "react";
import { TodoProvider } from "./useTodoList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import UpdateItem from "./UpdateItem";

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
    <BrowserRouter basename="/todo">
      <TodoProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/update/:id" element={<UpdateItem />} />
        </Routes>
      </TodoProvider>
    </BrowserRouter>
  );
}
