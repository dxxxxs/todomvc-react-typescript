import { useState } from "react"
import { Todos } from "./components/Todos"
import { type TodoId } from "./types"

const mockTodos = [
  { id: "1", title: 'Todo 1', completed: false },
  { id: "2", title: 'Todo 2', completed: true },
  { id: "3", title: 'Todo 3', completed: false }
]
function App(): JSX.Element {
  const [todos, setTodos] = useState(mockTodos)

  const handleRemove = ({ id }: TodoId) => {
    const newTodos = todos.filter(todo => todo.id != id)
    setTodos(newTodos)
  }

  const handleCompleted = ({ id }: TodoId) => {
    const todo = todos.find(todo => todo.id == id)
    if (todo) {
      todo.completed = !todo.completed
      setTodos([...todos])
    }
  }

  return (
    <div className="todoapp">
      <Todos
        onRemoveTodo={handleRemove}
        onCompletedTodo={handleCompleted}
        todos={todos}
      />
    </div>
  )
}

export default App
