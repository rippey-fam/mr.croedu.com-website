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
            position: "absolute",
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
        <label>
          Item Name:
          <br /> <br />
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
        <br />
        <AddButton
          callback={() => {
            if (itemName) {
              addItem({
                id: (list.at(-1)?.id ?? 0) - 1,
                title: itemName,
                complete: false,
              });
              toggleVisibility();
            }
          }}
        />
      </div>
    </div>
  );
}
