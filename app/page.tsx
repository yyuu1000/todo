"use client";

import { ModeToggle } from "@/components/Mode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      try {
        setTodos(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to  parse todo:" + e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.replace(/\s/g, "") === "") return;
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

  const startEditing = (id: number, currentText: string) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const saveEdit = (id: number) => {
    if (editText.replace(/\s/g, "") === "") return;
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: editText.trim() } : todo
      )
    );
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <main className="flex flex-col items-center min-h-screen py-12 px-4 bg-background text-foreground transition-colors">
      <div className="flex items-center justify-between w-full max-w-md mb-6">
        <h1 className="text-2xl font-bold">ToDo List</h1>
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
            <CardContent className="flex items-center justify-between p-2 max-h-[48px]">
              {editingId === todo.id ? (
                <div className="flex w-full items-center gap-2">
                  <Input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit(todo.id);
                      if (e.key === "Escape") cancelEdit();
                    }}
                    className="text-sm"
                    autoFocus
                  />
                  <Button
                    size="sm"
                    onClick={() => saveEdit(todo.id)}
                    className="h-8 px-3"
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={cancelEdit}
                    className="h-8 px-3"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <>
                  <span
                    onClick={() => toggleTodo(todo.id)}
                    className="ml-2"
                  >
                    {todo.text}
                  </span>
                  <div>
                    <Button
                      onClick={() => startEditing(todo.id, todo.text)}
                      variant="ghost"
                      size="icon-lg"
                      className="h-8 w-8"
                    >
                      <Pencil />
                    </Button>
                    <Button
                      onClick={() => deleteTodo(todo.id)}
                      variant="ghost"
                      size="icon-lg"
                      className="text-red-500 hover:text-red-700 h-8 w-8"
                    >
                      <X strokeWidth={4} />
                    </Button>
                  </div>
                </>
              )}
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