import { useState } from "react"
import { Todos } from "./components/Todos"

const mockTodos = [
  { id: "1", title: 'Todo 1', completed: false },
  { id: "2", title: 'Todo 2', completed: true },
  { id: "3", title: 'Todo 3', completed: false }
]
function App(): JSX.Element {
  const [todos, setTodos] = useState(mockTodos)
  return (
    <Todos todos={todos} />
  )
}

export default App
