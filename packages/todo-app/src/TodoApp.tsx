import React from "react";
import { TodoList } from "./TodoList";

import "./TodoApp.scss";

export const TodoApp: React.FC<{}> = () => {
    return (
        <div className="todo-app">
            <h1 className="header">todo</h1>
            <TodoList />
        </div>
    );
};
