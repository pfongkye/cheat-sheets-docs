import * as React from "react";
import { render, screen } from "@testing-library/react";
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
      getMockTodos.bind(null, '[{"value":"my todo", "id":"id"},{"value":"second todo", "id":"id2"}]')
    );
    const actual = service.getTodos();
    expect(actual).toEqual([
      { value: "my todo", id: "id" },
      { value: "second todo", id: "id2" },
    ]);
  });

  it("should load data in TodoList", () => {
    localStorage.getItem.mockReturnValueOnce('[{"value":"my todo", "id":"id"}]');
    render(<TodoList todoService={service} />);

    expect(screen.getByText("my todo")).toBeInTheDocument();
  });

  it("should not save undefined todo", () => {
    service.saveTodo();
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it("should not save todo if no value", () => {
    service.saveTodo({ id: "id" });
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it("should not save todo if no id", () => {
    service.saveTodo({ value: "my todo" });
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it("should save a todo to empty localstorage item", () => {
    service.saveTodo({ value: "my todo", id: "id" });
    expect(localStorage.setItem).toHaveBeenNthCalledWith(1, "todos", '[{"value":"my todo","id":"id"}]');
  });

  it("should save todo to existing localstorage item", () => {
    localStorage.getItem.mockImplementationOnce(getMockTodos.bind(null, '[{"value":"my todo", "id":"id"}]'));
    service.saveTodo({ value: "my new todo", id: "id1" });

    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenNthCalledWith(
      1,
      "todos",
      '[{"value":"my todo","id":"id"},{"value":"my new todo","id":"id1"}]'
    );
  });

  it("should overwrite todo to existing localstorage item", () => {
    localStorage.getItem.mockImplementationOnce(getMockTodos.bind(null, '[{"value":"my todo", "id":"id"}]'));
    service.saveTodo({ value: "my new todo", id: "id" });

    expect(localStorage.setItem).toHaveBeenNthCalledWith(1, "todos", '[{"value":"my new todo","id":"id"}]');
  });
});
function getMockTodos(todos, key) {
  return key === "todos" && todos;
}
