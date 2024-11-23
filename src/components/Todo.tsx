import { useEffect, useRef, useState } from 'react'
import { type TodoId, type Todo as TodoType } from '../types'

interface Props extends TodoType {
    onRemoveTodo: (id: TodoId) => void
    onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, "id" | "completed">) => void
    isEditing: string
    setTitle: (params: { id: string, title: string }) => void
    setIsEditing: (completed: string) => void
}

export const Todo: React.FC<Props> = ({
    id,
    title,
    completed,
    onRemoveTodo,
    onToggleCompleteTodo: onCompletedTodo,
    isEditing,
    setTitle,
    setIsEditing
}) => {

    const [editedTitle, setEditedTitle] = useState(title)
    const inputEditTitle = useRef<HTMLInputElement>(null)

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            setEditedTitle(editedTitle.trim())

            if (editedTitle !== title) {
                setTitle({ id, title: editedTitle })
            }

            if (editedTitle === '') onRemoveTodo({ id })

            setIsEditing('')
        }

        if (event.key === 'Escape') {
            setEditedTitle(title)
            setIsEditing('')
        }
    }

    useEffect(() => {
        inputEditTitle.current?.focus()
    }, [isEditing])

    const handleOnBlur: React.FocusEventHandler<HTMLInputElement> = () => {
        setEditedTitle(editedTitle.trim())

        if (editedTitle !== title) {
            setTitle({ id, title: editedTitle })
        }

        if (editedTitle === '') onRemoveTodo({ id })
        setIsEditing('')
    }

    return (
        <>
            <div className="view">
                <input
                    className="toggle"
                    checked={completed}
                    type="checkbox"
                    onChange={(event) => {
                        onCompletedTodo({ id, completed: event.target.checked })
                    }}
                />
                <label>{title}</label>
                <button
                    className="destroy"
                    onClick={() => {
                        onRemoveTodo({ id })
                    }}
                />
            </div>
            <input
                className="edit"
                value={editedTitle}
                onChange={(event) => { setEditedTitle(event.target.value) }}
                onKeyDown={handleKeyDown}
                ref={inputEditTitle}
                onBlur={handleOnBlur}
            />
        </>
    )
}