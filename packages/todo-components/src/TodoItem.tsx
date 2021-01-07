import React from "react";
import classNames from "classnames";

import "./TodoItem.css";

export const TodoItem: React.FC<{
    id: string;
    className?: string;
    description: string;
    completed: boolean;
    onToggleComplete: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
}> = ({
    id,
    className,
    description,
    completed,
    onToggleComplete,
    onDelete,
}) => {
    return (
        <div className={classNames("todo-item", className, { completed })}>
            <input
                className="toggle"
                type="checkbox"
                checked={completed}
                onChange={() => onToggleComplete(id, !completed)}
            />
            <label className="description">{description}</label>
            <button className="destroy" onClick={() => onDelete(id)} />
        </div>
    );
};
