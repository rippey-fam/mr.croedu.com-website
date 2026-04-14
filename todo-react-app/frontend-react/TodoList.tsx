import { useTodoListContext } from "./useTodoList";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function TodoList() {
  const { list, updateItem } = useTodoListContext();
  const navigate = useNavigate();
  let lastChecked = false;
  return (
    <ul>
      {list
        .sort((a, b) => (a.index > b.index ? -1 : 1))
        .sort((a, b) => (a.complete && b.complete ? 0 : a.complete ? 1 : -1))
        .map((item, key) => {
          let addHR = false;
          if (lastChecked !== item.complete) {
            lastChecked = item.complete;
            if (key !== 0) {
              addHR = true;
            }
          }
          return (
            <li key={key} className="todo-item">
              {addHR && <hr />}
              <label
                style={{
                  userSelect: "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={item.complete}
                  onChange={(ev) => {
                    updateItem(item, { complete: ev.target.checked });
                  }}
                />{" "}
                {item.complete ? <s>{item.title}</s> : item.title}{" "}
                <span
                  style={{
                    color: "gray",
                    fontSize: "0.8em",
                  }}
                >
                  {item.created_at ? format(item.created_at, "MM/dd/yyyy") : ""}
                </span>
              </label>

              <i
                className="fa-solid fa-pen-to-square"
                onClick={(ev) => {
                  navigate(`/update/${item._id}`);
                }}
              ></i>
              {/* <i className="fa-regular fa-trash-can"></i> */}
            </li>
          );
        })}
    </ul>
  );
}
