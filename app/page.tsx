"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim) return;
    const newTodo: Todo ={
      id: Date.now(),
      text: input,
      done: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? {...todo, done: !todo.done} : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  
  return (
    <main>
      <div className="flex">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Things to do"
        />
        <Button
          onClick={addTodo}
        >
          Add
        </Button>
      </div>
      <ul className="w-72">
        {todos.map((todo) => (
          <li
            key={todo.id}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              className={`cursor-pointer ${
                todo.done ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.text}
            </span>
            <Button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </Button>
          </li>
        ))}
      </ul>
    </main>
  );
}