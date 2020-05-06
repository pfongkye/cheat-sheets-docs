import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TodoList from "todolist/TodoList";
import TestRenderer from "react-test-renderer";

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

  it("should complete second todo", async () => {
    const firstTodo = "first todo",
      secondTodo = "second todo";

    const { getByText, getByLabelText, queryByText } = render(<TodoList />);

    const todoInput = getAddTodoInput(getByLabelText);

    addTodo(todoInput, firstTodo, getByText);
    addTodo(todoInput, secondTodo, getByText);

    completeTodo(getByLabelText, secondTodo);

    await waitFor(() => {
      expect(queryByText(secondTodo)).not.toBeInTheDocument();
      const firstTodoElement = screen.getByLabelText(firstTodo);
      expect(firstTodoElement).not.toBeChecked();
      expect(firstTodoElement).toBeInTheDocument();
    });
  });

  it("should complete both todos independently even if they have same value", async () => {
    const duplicatedTodo = "duplicated todo";

    const { getByText, getByLabelText, queryByText, getAllByLabelText } = render(<TodoList />);

    const todoInput = getAddTodoInput(getByLabelText);

    addTodo(todoInput, duplicatedTodo, getByText);
    addTodo(todoInput, duplicatedTodo, getByText);

    //since two todos of same value, we need to get all the todos...
    fireEvent.click(getAllByLabelText(duplicatedTodo)[0]);
    //and we need to query DOM again since the latter changed
    completeTodo(getByLabelText, duplicatedTodo);

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

function completeTodo(getByLabelText, todo) {
  fireEvent.click(getByLabelText(todo));
}

function getAddTodoInput(getByLabelText) {
  return getByLabelText("Todo:");
}

function expectAddTodo(input, value, getByText) {
  addTodo(input, value, getByText);
  return expect(getByText(value));
}

function addTodo(input, value, getByText) {
  fireEvent.change(input, { target: { value } });
  fireEvent.click(getByText("Add"));
}
