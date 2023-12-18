import { useEffect, useState, RefObject } from "react"
import Header from "./Header"
import Input from "./Input"
import List from "./List"
import './App.css'

export type TTodoRestItem = { 
  id: number, 
  text: string, 
  category: string;
  ref: RefObject<HTMLLIElement> 
}

export const categories: string[] = ['Trabalho', 'Estudo', 'Lazer', 'Casa', 'Outros']

export default function App() {
  const [todolist, setTodolist] = useState<TTodoRestItem[]>(
    JSON.parse(localStorage.getItem('todolist') ?? '[]')
  )

  const [selectedCategory, setSelectedCategory] = useState("Todos");

  useEffect(() => {
    fetch("http://localhost:3000/item")
      .then(response => response.json())
      .then(data => setTodolist(data))
  }, [])

  return <>
    <Header />
    <div className="filter">
    <span className="filter-span">Filtre suas tarefas</span>
    <select className="filter-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="Todos">Todos</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
    </select>
    </div>
    <Input setTodolist={setTodolist} todolist={todolist} />
    <List setTodolist={setTodolist} todolist={todolist} selectedCategory={selectedCategory} />
  </>
}

