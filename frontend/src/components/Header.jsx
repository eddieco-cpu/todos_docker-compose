import React, { useState } from "react";

export default function Header({ onAddTodo }) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    if (!notes.trim()) return alert("Notes is required");
    onAddTodo({ title, notes });
    setTitle("");
    setNotes("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-start items-end bg-slate-700 p-3 gap-3"
    >
      <div className=" flex flex-col w-[85%]">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className=" focus:outline-none p-1 px-2 border-[1px] text-slate-700 mb-3 focus:bg-slate-200"
        />
        <textarea
          placeholder="Notes"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className=" focus:outline-none p-1 px-2 border-[1px] text-slate-700 focus:bg-slate-200"
        />
      </div>
      <button
        type="submit"
        className=" border-[1px] p-1 px-2 rounded hover:bg-slate-800 active:bg-slate-600"
      >
        Add
      </button>
    </form>
  );
}
