import { useState } from "react"
import { Todos } from "./components/Todos"
import { FilterValue, TodoTitle, type TodoId, type Todo as TodoType } from "./types"
import { TODO_FILTERS } from "./consts"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"

const mockTodos = [
  { id: "1", title: 'Todo 1', completed: false },
  { id: "2", title: 'Todo 2', completed: true },
  { id: "3", title: 'Todo 3', completed: false }
]
function App(): JSX.Element {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: TodoId) => {
    const newTodos = todos.filter(todo => todo.id != id)
    setTodos(newTodos)
  }

  const handleCompleted = ({ id, completed }: Pick<TodoType, "id" | "completed">) => {
    const newTodos = todos.map(todo => {
      if (todo.id == id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }


  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected == TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected == TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }


  return (
    <div className="todoapp">
      <Header
        onAddTodo={handleAddTodo}
      ></Header>
      <Todos
        onRemoveTodo={handleRemove}
        onToggleCompleteTodo={handleCompleted}
        todos={filteredTodos}
      />
      <Footer
        filterSelected={filterSelected}
        activeCount={activeCount}
        completedCount={completedCount}
        handleFilterChange={handleFilterChange}
        onClearCompleted={handleRemoveAllCompleted}
      />
    </div>
  )
}

export default App
