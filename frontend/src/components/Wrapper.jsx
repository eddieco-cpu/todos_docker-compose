import React, { useState, useEffect } from "react";

import Header from "./Header";
import TodoList from "./TodoList";
import Popup from "./Popup";

import axios from "axios";

export default function Wrapper() {
  //
  const [todos, setTodos] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  //
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3030/api/todos");
      const data = response.data;
      const todos = data.datas;

      console.log(data);
      setTodos(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  //
  useEffect(() => {
    fetchTodos();
  }, [showPopup]);

  //
  const addTodo = async (todo) => {
    //
    console.log("todo", todo);

    if (todo.title === "") return alert("Title is required");
    if (todo.notes === "") return alert("Notes is required");

    try {
      const { data } = await axios.post("http://localhost:3030/api/todos", {
        ...todo,
        isDone: false,
      });
      setTodos([...todos, data.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodo = async (todo) => {
    const oldTodoIsDoneStatus = todos.find(
      (item) => item.id === todo.id
    ).isDone;
    const msg = oldTodoIsDoneStatus
      ? "is this todo not complete ?"
      : "is this todo complete OK ?";
    const confrim = window.confirm(msg);
    if (!confrim) return;

    try {
      const { data } = await axios.put(
        `http://localhost:3030/api/todos/${todo.id}`,
        {
          ...todo,
          isDone: !oldTodoIsDoneStatus,
        }
      );
      const newTodos = todos.map((item) =>
        item.id === todo.id ? data.data : item
      );
      setTodos(newTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:3030/api/todos/${id}`);
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className=" w-[95%] min-h-[calc(100vh-16px)] max-w-[1200px] m-auto my-2 bg-slate-800 p-3">
      <Header onAddTodo={addTodo} />
      <TodoList
        todos={todos}
        onToggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        setShowPopup={setShowPopup}
        setSelectedTodo={setSelectedTodo}
      />
      {showPopup && (
        <Popup setShowPopup={setShowPopup} selectedTodo={selectedTodo} />
      )}
    </div>
  );
}
