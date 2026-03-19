import { PropsWithoutRef, useState } from "react";
import AddButton from "./AddButton";
import { useTodoListContext } from "./useTodoList";

export default function AddItemPopup(
  props: PropsWithoutRef<{ toggleVisibility: () => void }>,
) {
  const toggleVisibility = props.toggleVisibility;
  const { list, updateItem, addItem } = useTodoListContext();
  const [itemName, setItemName] = useState("");
  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
        backgroundColor: "#0000009a",
      }}
    >
      <div className="popup">
        <div
          style={{
            position: "fixed",
            top: "0px",
            right: "0px",
            padding: "0.5em",
            cursor: "pointer",
          }}
          onClick={() => {
            toggleVisibility();
          }}
        >
          Close
        </div>
        <h2>Add New Item</h2>
        <hr />
        <br />
        <label
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "10px",
            // center everything vertically
            alignItems: "center",
          }}
        >
          Item Name:
          <input
            type="text"
            value={itemName}
            placeholder="Item name"
            onChange={(e) => {
              setItemName(e.target.value);
            }}
          />
        </label>
        <br />
        <AddButton
          callback={() => {
            if (itemName) {
              addItem({
                index: (list.at(-1)?.index ?? 1) - 1,
                title: itemName,
                complete: false,
                todo_list: { title: list[0].todo_list.title },
              });
              toggleVisibility();
            }
          }}
        />
      </div>
    </div>
  );
}
