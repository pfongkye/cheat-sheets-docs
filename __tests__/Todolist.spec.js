import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import TodoList from "playground/todolist/TodoList";
describe("TodoList", () => {
  it("should display TodoList", () => {
    const { getByText } = render(<TodoList />);

    expect(getByText("My Todo List")).toBeInTheDocument();
  });

  it("should add a todo item and clear input value", () => {
    const { getByText, getByLabelText } = render(<TodoList />);
    const input = getAddTodoInput(getByLabelText);

    expectAddTodo(input, "My first todo", getByText).toBeInTheDocument();
    expect(input.value).toEqual("");
  });

  it("should add two todo items", () => {
    const { getByText, getByLabelText } = render(<TodoList />);
    const input = getAddTodoInput(getByLabelText);

    expectAddTodo(input, "My first todo", getByText).toBeInTheDocument();
    expectAddTodo(input, "My second todo", getByText).toBeInTheDocument();
  });

  it("should not show active todos when no todo", () => {
    const { queryByText } = render(<TodoList />);

    expect(queryByText("My active todos:")).not.toBeInTheDocument();
  });

  it("should show active todos when todo is added", () => {
    const { getByText, getByLabelText } = render(<TodoList />);

    const input = getAddTodoInput(getByLabelText);

    addTodo(input, "My first todo", getByText);
    expect(getByText("My active todos:")).toBeInTheDocument();
  });

  it("should complete one todo", async () => {
    const todo = "my todo";
    const { getByText, getByLabelText, queryByText } = render(<TodoList />);

    const todoInput = getAddTodoInput(getByLabelText);

    addTodo(todoInput, todo, getByText);

    completeTodo(getByLabelText, todo);

    await waitFor(() => {
      expect(queryByText("My active todos:")).not.toBeInTheDocument();
    });
  });

  it("should complete second todo and leave first one active", async () => {
    const firstTodo = "first todo",
      secondTodo = "second todo";

    const { getByText, getByLabelText, queryByText } = render(<TodoList />);

    const todoInput = getAddTodoInput(getByLabelText);

    addTodo(todoInput, firstTodo, getByText);
    addTodo(todoInput, secondTodo, getByText);

    completeTodo(getByLabelText, secondTodo);

    await waitFor(() => {
      expect(queryByText(secondTodo)).not.toBeInTheDocument();
      expect(getByText(firstTodo)).toBeInTheDocument();
    });
  });

  it("should complete both todos independently even if they have same value", async () => {
    const duplicatedTodo = "duplicated todo";

    const { getByText, getByLabelText, queryByText, getAllByLabelText } = render(<TodoList />);

    const todoInput = getAddTodoInput(getByLabelText);

    addTodo(todoInput, duplicatedTodo, getByText);
    addTodo(todoInput, duplicatedTodo, getByText);

    //since two todos of same value, we need to get all the todos...
    const todos = getAllByLabelText(duplicatedTodo, { selector: "input" });
    fireEvent.click(todos[0]);

    //afterwards we need to query again and not use the previous todos since DOM changed.
    completeTodo(getByLabelText, duplicatedTodo);

    await waitFor(() => {
      expect(queryByText(duplicatedTodo)).not.toBeInTheDocument();
    });
  });
});

function completeTodo(getByLabelText, todo) {
  fireEvent.click(getByLabelText(todo, { selector: "input" }));
}

function getAddTodoInput(getByLabelText) {
  return getByLabelText("Todo:", { selector: "input" });
}

function expectAddTodo(input, value, getByText) {
  addTodo(input, value, getByText);
  return expect(getByText(value));
}

function addTodo(input, value, getByText) {
  fireEvent.change(input, { target: { value } });
  fireEvent.click(getByText("Add"));
}
