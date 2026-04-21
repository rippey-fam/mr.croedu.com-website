import PlusSVG from "./PlusSVG";
import { PropsWithoutRef } from "react";

export default function AddButton(
  props: PropsWithoutRef<{ callback: () => void }>,
) {
  const callback = props.callback;
  return (
    <button
      className="add-todo-button"
      onClick={() => {
        callback();
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px",
          height: "3rem",
        }}
      >
        <PlusSVG />
        <span>Add Item</span>
      </div>
    </button>
  );
}
