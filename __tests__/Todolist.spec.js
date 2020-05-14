import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TodoList from "todolist/TodoList";

describe("TodoList", () => {
  const todoService = { save: jest.fn(), getTodos: jest.fn() };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should display TodoList", () => {
    render(<TodoList />);

    expect(screen.getByText("My Todo List")).toBeInTheDocument();
  });

  it("should add a todo item and clear input value", () => {
    render(<TodoList />);

    expectAddTodo("My first todo").toBeInTheDocument();
    expect(getAddTodoInput()).toHaveValue("");
  });

  it("should add two todo items", () => {
    render(<TodoList />);

    expectAddTodo("My first todo").toBeInTheDocument();
    expectAddTodo("My second todo").toBeInTheDocument();
  });

  it("should not show active todos when no todo", () => {
    render(<TodoList />);

    expect(screen.queryByText("My active todos:")).not.toBeInTheDocument();
  });

  it("should show active todos when todo is added", () => {
    render(<TodoList />);

    addTodo("My first todo");
    expect(screen.getByText("My active todos:")).toBeInTheDocument();
  });

  it("should complete one todo", async () => {
    const todo = "my todo";

    render(<TodoList />);

    addTodo(todo);

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

    addTodo(firstTodo);
    addTodo(secondTodo);

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

    const { queryByText, getAllByLabelText } = render(<TodoList />);

    addTodo(duplicatedTodo);
    addTodo(duplicatedTodo);

    //since two todos of same value, we need to get all the todos...
    fireEvent.click(getAllByLabelText(duplicatedTodo)[0]);
    //and we need to query DOM again since the latter changed
    completeTodo(duplicatedTodo);

    await waitFor(() => {
      expect(queryByText(duplicatedTodo)).not.toBeInTheDocument();
    });
  });

  it("should not add todo if empty on [ENTER]", async () => {
    expect.assertions(1);

    render(<TodoList />);
    const input = screen.getByLabelText("Todo:");
    fireEvent.keyUp(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(screen.queryByLabelText("")).not.toBeInTheDocument();
    });
  });

  it("should add todo on [ENTER]", async () => {
    expect.assertions(2);

    render(<TodoList />);

    const input = screen.getByLabelText("Todo:");
    fireEvent.input(input, { target: { value: "my todo" } });
    fireEvent.keyUp(input, { key: "Enter", code: "Enter" });
    await waitFor(() => {
      expect(screen.getByText("my todo")).toBeInTheDocument();
    });
    expect(input).toHaveValue("");
  });

  it("should load initial data", () => {
    todoService.getTodos.mockReturnValueOnce([{ value: "my initial todo", id: "id" }]);
    render(<TodoList todoService={todoService} />);

    expect(todoService.getTodos).toHaveBeenCalledTimes(1);
    expect(screen.getByText("my initial todo")).toBeInTheDocument();
  });

  it("should show completed todo when loading todos", () => {
    todoService.getTodos.mockReturnValueOnce([{ value: "my completed todo", id: "id", isDone: true }]);
    render(<TodoList todoService={todoService} />);

    expect(todoService.getTodos).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("my completed todo")).not.toBeInTheDocument();
    expect(screen.queryByText("My active todos:")).not.toBeInTheDocument();
  });

  it("should save todo on add", () => {
    todoService.getTodos.mockReturnValueOnce([]);
    render(<TodoList todoService={todoService} />);

    expect(todoService.getTodos).toHaveBeenCalledTimes(1);
    addTodo("my saved todo");

    expect(todoService.save).toHaveBeenNthCalledWith(1, expect.objectContaining({ value: "my saved todo" }));
  });
});

function completeTodo(todo) {
  fireEvent.click(screen.getByLabelText(todo));
}

function getAddTodoInput() {
  return screen.getByLabelText("Todo:");
}

function expectAddTodo(value) {
  addTodo(value);
  return expect(screen.getByText(value));
}

function addTodo(value) {
  fireEvent.change(getAddTodoInput(), { target: { value } });
  fireEvent.click(screen.getByText("Add"));
}
