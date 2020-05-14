import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import LocalStorageTodoService from "todolist/LocalStorageTodoService";
import TodoList from "todolist/TodoList";

describe("localStorageTodoService", () => {
  const localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };

  const service = new LocalStorageTodoService(localStorage);

  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return empty array if no todo", () => {
    const actual = service.getTodos();
    expect(localStorage.getItem).toHaveBeenNthCalledWith(1, "todos");
    expect(actual).toEqual([]);
  });

  it("should return an array of todos", () => {
    localStorage.getItem.mockImplementationOnce(
      getMockTodos.bind(null, '[{"value":"my todo", "id":"id"},{"value":"second todo", "id":"id2", "isDone":true}]')
    );
    const actual = service.getTodos();
    expect(actual).toEqual([
      { value: "my todo", id: "id" },
      { value: "second todo", id: "id2", isDone: true },
    ]);
  });

  it("should load data in TodoList", () => {
    localStorage.getItem.mockReturnValueOnce('[{"value":"my todo", "id":"id"}]');
    render(<TodoList todoService={service} />);

    expect(screen.getByText("my todo")).toBeInTheDocument();
  });

  it("should not save undefined todo", () => {
    service.save();
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it("should not save todo if no value", () => {
    service.save({ id: "id" });
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it("should not save todo if no id", () => {
    service.save({ value: "my todo" });
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it("should save a todo to empty localstorage item", () => {
    service.save({ value: "my todo", id: "id", isDone: false });
    expect(localStorage.setItem).toHaveBeenNthCalledWith(1, "todos", '[{"value":"my todo","id":"id","isDone":false}]');
  });

  it("should save todo to existing localstorage item", () => {
    localStorage.getItem.mockImplementationOnce(getMockTodos.bind(null, '[{"value":"my todo", "id":"id"}]'));
    service.save({ value: "my new todo", id: "id1" });

    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenNthCalledWith(
      1,
      "todos",
      '[{"value":"my todo","id":"id"},{"value":"my new todo","id":"id1"}]'
    );
  });

  it("should overwrite todo to existing localstorage item", () => {
    localStorage.getItem.mockImplementationOnce(getMockTodos.bind(null, '[{"value":"my todo", "id":"id"}]'));
    service.save({ value: "my new todo", id: "id" });

    expect(localStorage.setItem).toHaveBeenNthCalledWith(1, "todos", '[{"value":"my new todo","id":"id"}]');
  });

  it("should save todo on add", () => {
    render(<TodoList todoService={service} />);
    const input = screen.getByLabelText("Todo:");
    fireEvent.change(input, { target: { value: "my todo" } });
    fireEvent.click(screen.getByText("Add"));
    expect(localStorage.setItem).toHaveBeenNthCalledWith(1, "todos", expect.stringContaining('"value":"my todo"'));
  });
});
function getMockTodos(todos, key) {
  return key === "todos" && todos;
}
