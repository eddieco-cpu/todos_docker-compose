import React from "react";
import TodoItem from "./TodoItem";

function TodoList({
  todos,
  onToggleTodo,
  setShowPopup,
  deleteTodo,
  setSelectedTodo,
}) {
  return (
    <ul className="border-[1px] border-slate-600 mt-3 p-3 pb-0">
      {todos?.length &&
        todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            onToggle={() => onToggleTodo(todo)}
            setShowPopup={setShowPopup}
            setSelectedTodo={setSelectedTodo}
          />
        ))}
    </ul>
  );
}

export default TodoList;
