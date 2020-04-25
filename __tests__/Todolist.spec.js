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
});

function getAddTodoInput(getByLabelText) {
  return getByLabelText("Add Todo:", { selector: "input" });
}

function expectAddTodo(input, value, getByText) {
  fireEvent.change(input, { target: { value } });
  fireEvent.click(getByText("Add"));
  return expect(getByText(value));
}
