import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const body = req.body as { text: string };
    const newTodo = new Todo(Math.random().toString(), body.text);
    TODOS.push(newTodo);

    res.status(201).json({ msg: "Created the Todo", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.status(200).json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const todoiD = req.params.id;
    const body = req.body as { text: string };
    const updatedText = body.text;

    const todoIndex = TODOS.findIndex((todo) => todo.id === todoiD);

    if (todoIndex < 0) {
        throw new Error("Could not Find Todo");
    }

    const updatedTodo = new Todo(todoiD, updatedText);

    TODOS[todoIndex] = updatedTodo;

    res.status(200).json({ msg: "Updated", updatedTodo: updatedTodo });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const todoiD = req.params.id;
    const body = req.body as { text: string };
    const updatedText = body.text;

    const todoIndex = TODOS.findIndex((todo) => todo.id === todoiD);

    if (todoIndex < 0) {
        throw new Error("Could not Find Todo");
    }

    TODOS.splice(todoIndex, 1);

    res.status(200).json({ msg: "Deleted" });
};
