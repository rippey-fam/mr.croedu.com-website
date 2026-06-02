import { useState } from "react";
import { TodoProvider } from "./useTodoList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import UpdateItem from "./UpdateItem";
import AddItem from "./AddItem";

export default function App() {
  const [addItemDisplayed, changeAddItemDisplayed] = useState(false);

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
          <Route path="/add/todo/" element={<AddItem />} />
        </Routes>
      </TodoProvider>
    </BrowserRouter>
  );
}
