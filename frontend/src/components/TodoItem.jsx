import React from "react";

function TodoItem({
  todo,
  onToggle,
  setShowPopup,
  deleteTodo,
  setSelectedTodo,
}) {
  const setPopup = () => {
    setSelectedTodo(todo);
    setShowPopup(true);
  };

  return (
    <li
      className={
        (todo.isDone ? " text-slate-500" : "") +
        " bg-slate-700 p-3 mb-3 text-left"
      }
    >
      <div className=" flex justify-between items-center pb-2">
        {todo.isDone ? (
          <p
            className=" border-[1px] rounded-[50px] p-1 px-2 text-xs text-green-400 border-green-400 cursor-pointer hover:bg-slate-800 active:bg-slate-600"
            onClick={onToggle}
          >
            已完成
          </p>
        ) : (
          <p
            className=" border-[1px] rounded-[50px] p-1 px-2 text-xs text-red-400 border-red-400 cursor-pointer hover:bg-slate-800 active:bg-slate-600"
            onClick={onToggle}
          >
            未完成
          </p>
        )}
        <div className=" flex justify-end items-center gap-2">
          <button
            className=" border-[1px] w-6 h-6 rounded-full flex justify-center items-center hover:bg-slate-800 active:bg-slate-600 text-white"
            onClick={setPopup}
          >
            ✎
          </button>
          <button
            className=" border-[1px] w-6 h-6 rounded-full flex justify-center items-center hover:bg-slate-800 active:bg-slate-600 text-white"
            onClick={() => deleteTodo(todo.id)}
          >
            ✖
          </button>
        </div>
      </div>

      <h2 className=" pb-2 border-b-[1px]">{todo.title}</h2>
      <p className="py-3">{todo.notes}</p>
    </li>
  );
}

export default TodoItem;
