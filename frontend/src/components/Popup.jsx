import React, { useState } from "react";
import axios from "axios";

export default function Popup({ setShowPopup, selectedTodo }) {
  //
  const [todo, setTodo] = useState(selectedTodo ? { ...selectedTodo } : {});

  const updateTodo = async () => {
    if (todo.title === "") return alert("Title is required");
    if (todo.notes === "") return alert("Notes is required");

    try {
      await axios.put(`http://localhost:3030/api/todos/${todo.id}`, todo);
      alert("Todo updated successfully");
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Error updating todo, please try again later");
    }
    setShowPopup(false);
  };

  return (
    <div
      className=" fixed left-0 top-0 w-[100vw] h-[100vh] bg-[rgba(255,255,255,0.25)]"
      onClick={() => setShowPopup(false)}
    >
      <button className=" absolute top-[1.8vh] right-[1.8vh] w-[3vh] h-[3vh] rounded-full flex justify-center items-center hover:bg-slate-700 active:bg-slate-500 text-white text-[1.8vh]">
        ✕
      </button>
      <section
        className=" absolute m-auto w-[87vw] h-[87vh] top-0 left-0 right-0 bottom-0 bg-slate-800 rounded-lg border-[3px] border-slate-600 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" text-white  text-[1.9vh] p-3 px-4 border-b-[3px] border-slate-600">
          <h2 className="pb-3">Title</h2>
          <input
            type="text"
            placeholder="Title"
            className="w-full focus:outline-none p-1 px-2 border-[1px] text-slate-700 mb-3 focus:bg-slate-200 bg-slate-300 rounded border-2 border-white"
            value={todo?.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </div>
        <div className=" text-white text-[1.9vh] p-3 px-4">
          <h2 className="pb-3">Content</h2>
          <textarea
            rows={10}
            placeholder="Notes"
            className="w-full focus:outline-none p-1 px-2 border-[1px] text-slate-700 mb-3 focus:bg-slate-200 bg-slate-300 rounded border-2 border-white"
            value={todo?.notes}
            onChange={(e) => setTodo({ ...todo, notes: e.target.value })}
          />
        </div>
        <div className=" text-white  text-[1.9vh] p-3 px-4 border-t-[3px] border-slate-600">
          <h2 className="pb-3">Is it Done</h2>
          <div className="flex flex-col justify-start items-start gap-y-5 py-1">
            <p className=" flex-grow pl-10 ">
              <label htmlFor="isDone">
                <input
                  type="radio"
                  id="isDone"
                  name="isDone"
                  checked={todo?.isDone}
                  onChange={() => setTodo({ ...todo, isDone: true })}
                  className=" ring-2 checked:ring-green-400  ring-offset-2 ring-offset-slate-800 ring-offset-opacity-50 ring-opacity-100 ring-offset-[2px] mr-2"
                />{" "}
                it is Complete
              </label>
            </p>
            <p className=" flex-grow  pl-10">
              <label htmlFor="notDone">
                <input
                  type="radio"
                  id="notDone"
                  name="isDone"
                  checked={!todo?.isDone}
                  onChange={() => setTodo({ ...todo, isDone: false })}
                  className=" ring-2 checked:ring-red-400  ring-offset-2 ring-offset-slate-800 ring-offset-opacity-50 ring-opacity-100 ring-offset-[2px] mr-2"
                />{" "}
                it is not Done
              </label>
            </p>
          </div>
        </div>
        <div>
          <button
            className="block mx-auto my-2 w-[90%] min-h-[10%] py-1 bg-slate-700 text-white text-[1.9vh] rounded hover:bg-slate-600 active:bg-slate-500"
            onClick={updateTodo}
          >
            Save
          </button>
          <button
            className="block mx-auto w-[90%] min-h-[10%] py-1 bg-slate-700 text-white text-[1.9vh] rounded hover:bg-slate-600 active:bg-slate-500"
            onClick={() => setShowPopup(false)}
          >
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
}
