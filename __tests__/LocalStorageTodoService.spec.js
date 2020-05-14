import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import LocalStorageTodoService from "todolist/LocalStorageTodoService";
import TodoList from "todolist/TodoList";

describe("localStorageTodoService", () => {
  const localStorage = {
    getItem: jest.fn(),
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
      (key) => key === "todos" && '[{"value":"my todo", "id":"id"},{"value":"second todo", "id":"id2"}]'
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
});
