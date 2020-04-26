import React from "react";
import { render, fireEvent } from "@testing-library/react";
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
});

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
