import React from "react";
import ReactDOM from "react-dom";
import { TodoApp } from "./TodoApp";

const app = document.createElement("div");
ReactDOM.render(<TodoApp />, app);
document.body.appendChild(app);
