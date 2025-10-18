"use client";

import { ModeToggle } from "@/components/Mode";
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
    const newTodo: Todo = {
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
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main className="flex flex-col items-center min-h-screen py-12 px-4 bg-background text-foreground transition-colors">
      <div className="flex items-center justify-between w-full max-w-md mb-6">
        <h1 className="text-2xl font-bold">My ToDo List</h1>
        <ModeToggle />
      </div>

      <div className="flex gap-2 w-full max-w-md mb-6">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <Button onClick={addTodo} variant="outline">
          Add
        </Button>
      </div>

      <ul className="w-full max-w-md space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border rounded-lg px-3 py-2 bg-card shadow-sm"
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              className={`cursor-pointer select-none ${todo.done ? "line-through text-muted-foreground" : ""
                }`}
            >
              {todo.text}
            </span>
            <Button
              onClick={() => deleteTodo(todo.id)}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </Button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="mt-8 text-muted-foreground text-sm">
          No tasks yet — add one above!
        </p>
      )}
    </main>
  );
}