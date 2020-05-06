import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TodoList from "todolist/TodoList";
import TestRenderer from "react-test-renderer";

describe("TodoList", () => {
  it("should display TodoList", () => {
    render(<TodoList />);

    expect(screen.getByText("My Todo List")).toBeInTheDocument();
  });

  it("should add a todo item and clear input value", () => {
    render(<TodoList />);
    const input = getAddTodoInput();

    expectAddTodo(input, "My first todo").toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("should add two todo items", () => {
    render(<TodoList />);
    const input = getAddTodoInput();

    expectAddTodo(input, "My first todo").toBeInTheDocument();
    expectAddTodo(input, "My second todo").toBeInTheDocument();
  });

  it("should not show active todos when no todo", () => {
    render(<TodoList />);

    expect(screen.queryByText("My active todos:")).not.toBeInTheDocument();
  });

  it("should show active todos when todo is added", () => {
    render(<TodoList />);

    const input = getAddTodoInput();

    addTodo(input, "My first todo");
    expect(screen.getByText("My active todos:")).toBeInTheDocument();
  });

  it("should complete one todo", async () => {
    const todo = "my todo";

    render(<TodoList />);

    const todoInput = getAddTodoInput();

    addTodo(todoInput, todo);

    completeTodo(todo);

    await waitFor(() => {
      expect(screen.queryByText("My active todos:")).not.toBeInTheDocument();
    });
  });

  it.each([
    ["first todo", "second todo"],
    ["second todo", "first todo"],
  ])("should complete %s", async (toCompleteTodo, remainingTodo) => {
    const firstTodo = "first todo",
      secondTodo = "second todo";

    render(<TodoList />);

    const todoInput = getAddTodoInput();

    addTodo(todoInput, firstTodo);
    addTodo(todoInput, secondTodo);

    completeTodo(toCompleteTodo);

    await waitFor(() => {
      expect(screen.queryByText(toCompleteTodo)).not.toBeInTheDocument();
      const todoElt = screen.getByLabelText(remainingTodo);
      expect(todoElt).toBeInTheDocument();
      expect(todoElt).not.toBeChecked();
    });
  });

  it("should complete both todos independently even if they have same value", async () => {
    const duplicatedTodo = "duplicated todo";

    const { getByText, queryByText, getAllByLabelText } = render(<TodoList />);

    const todoInput = getAddTodoInput();

    addTodo(todoInput, duplicatedTodo, getByText);
    addTodo(todoInput, duplicatedTodo, getByText);

    //since two todos of same value, we need to get all the todos...
    fireEvent.click(getAllByLabelText(duplicatedTodo)[0]);
    //and we need to query DOM again since the latter changed
    completeTodo(duplicatedTodo);

    await waitFor(() => {
      expect(queryByText(duplicatedTodo)).not.toBeInTheDocument();
    });
  });

  it("should match snapshot", () => {
    expect.assertions(1);

    const container = TestRenderer.create(<TodoList />);

    expect(container.toJSON()).toMatchSnapshot();
  });
});

function completeTodo(todo) {
  fireEvent.click(screen.getByLabelText(todo));
}

function getAddTodoInput() {
  return screen.getByLabelText("Todo:");
}

function expectAddTodo(input, value) {
  addTodo(input, value);
  return expect(screen.getByText(value));
}

function addTodo(input, value) {
  fireEvent.change(input, { target: { value } });
  fireEvent.click(screen.getByText("Add"));
}
