import { Link, useParams } from "react-router-dom";
import { useTodoListContext } from "./useTodoList";

export default function UpdateItem() {
  const { id } = useParams();
  const { list, updateItem } = useTodoListContext();
  const todoitem = list.find((item) => item._id === id);
  return (
    <div className="center-block">
      <h1> Edit todo</h1>
      <p>{id}</p>
      <form>
        <label>Todo Title</label>
        <input type="text" value={todoitem?.title} />
        <label>Due Date</label>
        <input type="date"></input>
        <br />
      </form>
      <Link
        to="/"
        style={{
          marginTop: "1em",
          textAlign: "center",
          color: "white",
        }}
      >
        Go back to home{" "}
        <i className="fa-solid fa-arrow-up-right-from-square"></i>
      </Link>
    </div>
  );
}
