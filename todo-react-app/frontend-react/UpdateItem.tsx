import { Link, useNavigate, useParams } from "react-router-dom";
import { useTodoListContext } from "./useTodoList";
import { useEffect, useState } from "react";

export default function UpdateItem() {
  const { id } = useParams();
  const { list, updateItem } = useTodoListContext();
  const todoitem = list.find((item) => item._id === id);
  const navigate = useNavigate();
  console.log("todoitem:", todoitem);
  const [formVals, setFormVals] = useState({
    title: "Title",
    due_date: "",
  });

  useEffect(() => {
    if (todoitem) {
      setFormVals({
        title: todoitem.title,
        due_date: todoitem.due_date
          ? new Date(todoitem.due_date).toISOString().split("T")[0]
          : "",
      });
    }
  }, [todoitem]);

  return (
    <div className="center-block">
      <h1>Edit todo</h1>
      <p>
        {todoitem ? todoitem.title + ":" : ""} {id}
      </p>
      <form>
        <label>Todo Title</label>
        <input
          type="text"
          value={formVals.title}
          onChange={(e) => setFormVals({ ...formVals, title: e.target.value })}
        />
        <label>Due Date</label>
        <input
          type="date"
          value={formVals.due_date}
          onChange={(e) =>
            setFormVals({ ...formVals, due_date: e.target.value })
          }
        />
        <button
          onClick={() => {
            if (!todoitem) {
              return;
            }
            updateItem(todoitem, {
              title: formVals.title,
              due_date: formVals.due_date
                ? new Date(formVals.due_date)
                : undefined,
            });
            navigate("/");
          }}
        >
          Submit
        </button>
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
