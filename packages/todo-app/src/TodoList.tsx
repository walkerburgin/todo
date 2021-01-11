import React, { useState, useCallback } from "react";
import { TodoItem } from "todo-components";

import "./TodoList.scss";

export interface ITodo {
    /** Unique identifier for this todo list item. */
    id: string;

    /** Description of the todo item shown to the user. */
    description: string;

    /** Has this item been completed? */
    completed: boolean;
}

export const TodoList: React.FC<{}> = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);

    const onDeleteTodoItem = useCallback(
        (id: string) => {
            setTodos((todoState) => {
                return todoState.filter((todo) => todo.id !== id);
            });
        },
        [setTodos]
    );

    const onToggleComplete = (id: string, completed: boolean) => {
        setTodos((todoState) => {
            return todoState.map((todo) => {
                return todo.id === id
                    ? {
                          ...todo,
                          completed,
                      }
                    : todo;
            });
        });
    };

    const onAddTodoItem = (description: string) => {
        setTodos((todoState) => {
            return [
                ...todoState,
                {
                    id: `${Date.now()}`,
                    description: description.trim(),
                    completed: false,
                },
            ];
        });
    };

    const incomplete = todos.filter((todo) => !todo.completed);
    const footer = (
        <div className="footer">
            <div className="items-left">
                {incomplete.length} {incomplete.length === 1 ? "item" : "items"}{" "}
                left
            </div>
        </div>
    );

    return (
        <div className="todo-list">
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                onKeyPress={(evt) => {
                    if (evt.key !== "Enter") {
                        return;
                    }
                    const target = evt.target as HTMLInputElement;
                    const description = target.value;
                    target.value = "";
                    onAddTodoItem(description);
                }}
                autoFocus={true}
            />
            <div className="todos">
                {todos.map(({ id, description, completed }) => (
                    <TodoItem
                        key={id}
                        id={id}
                        description={description}
                        completed={completed}
                        onDelete={onDeleteTodoItem}
                        onToggleComplete={onToggleComplete}
                    />
                ))}
            </div>
            {todos.length > 0 ? footer : null}
        </div>
    );
};
