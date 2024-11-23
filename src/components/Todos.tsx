import { useState } from "react"
import { type TodoId, type ListOfTodos, type Todo as TodoType } from "../types"
import { Todo } from "./Todo"

interface Props {
    todos: ListOfTodos
    onRemoveTodo: ({ id }: TodoId) => void
    onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, "id" | "completed">) => void
    setTitle: (params: Omit<TodoType, 'completed'>) => void
}

export const Todos: React.FC<Props> = ({
    todos,
    onRemoveTodo,
    onToggleCompleteTodo: onToggleCompleteTodo,
    setTitle
}) => {

    const [isEditing, setIsEditing] = useState('')

    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <li
                    key={todo.id}
                    className={`
                    ${todo.completed ? 'completed' : ''}
                    ${isEditing === todo.id ? 'editing' : ''}
                  `}
                    onDoubleClick={() => { setIsEditing(todo.id) }}
                >
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        onRemoveTodo={onRemoveTodo}
                        onToggleCompleteTodo={onToggleCompleteTodo}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        setTitle={setTitle}
                    />
                </li>
            ))}
        </ul>
    )
}