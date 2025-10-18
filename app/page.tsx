"use client";

import { ModeToggle } from "@/components/Mode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useState } from "react";
import { X } from "lucide-react";

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

      <div className="w-full max-w-md space-y-3">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            className="p-1"
          >
            <CardContent className="flex items-center justify-between p-1">
              <span
                onClick={() => toggleTodo(todo.id)}
                className="text-lg ml-2"
              >
                {todo.text}
              </span>
              <Button
                onClick={() => deleteTodo(todo.id)}
                variant="ghost"
                size="icon-lg"
                className="text-red-500 hover:text-red-700 h-8 w-8"
              >
                <X strokeWidth={4} />
              </Button>
            </CardContent>
          </Card>
        ))}

        {todos.length === 0 && (
          <p className="mt-8 text-center text-muted-foreground text-sm">
            No tasks yet — add one above!
          </p>
        )}
      </div>
    </main>
  );
}