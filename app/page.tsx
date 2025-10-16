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
    <main></main>
  )
}