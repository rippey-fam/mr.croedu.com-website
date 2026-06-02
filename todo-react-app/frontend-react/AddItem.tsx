import { Link, useNavigate, useParams } from "react-router-dom";
import { useTodoListContext } from "./useTodoList";
import { useEffect, useState } from "react";

export default function AddItem() {
  /*
    () =>
    addItem(
      {
        title: `New Todo #${list.length}`,
        complete: false,
        index: list.length ?? 0,
      },
      list[0]?.todo_list,
    )
*/
  const { list, addItem } = useTodoListContext();
  const navigate = useNavigate();
  const [formVals, setFormVals] = useState({
    title: "",
    due_date: "",
  });

  return (
    <div className="center-block">
      <h1>New Todo</h1>
      <form>
        <label>Todo Title</label>
        <input
          type="text"
          value={formVals.title}
          onChange={(e) => setFormVals({ ...formVals, title: e.target.value })}
          placeholder="Name"
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
            addItem(
              {
                title: formVals.title,
                complete: false,
                index: list.length ?? 0,
              },
              list[0]?.todo_list,
            );
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
