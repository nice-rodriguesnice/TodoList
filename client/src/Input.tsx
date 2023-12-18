import { KeyboardEvent, useRef, useState } from "react"
import { TTodoRestItem, categories } from "./App"

type TProps = {
  todolist: TTodoRestItem[],
  setTodolist: (todolist: TTodoRestItem[]) => void
}

export default function (props: TProps) {
  const { todolist, setTodolist } = props

  const [category, setCategory] = useState<string>(categories[0])

  const ref = useRef<HTMLLIElement>(null)
  const onKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const value = event.currentTarget.value
      event.currentTarget.value = ''

      const newTodolist = [{ id: -1, text: value, category, ref }, ...todolist]
      setTodolist(newTodolist)

      const request = await fetch("http://localhost:3000/item", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo: value, category})
      })
      const response = await request.json()

      if (ref.current) {
        ref.current.dataset.id = response.lastID
        ref.current.className = 'synced'
      }

    }
  }

  return <>
    <div className="container-action">
    <select className="select-action" value={category} onChange={(e) => setCategory(e.target.value)}>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
    <input className="input-action" type="text" placeholder="Adicione uma tarefa" onKeyDown={onKeyDown} />
    </div>
  </>
}
