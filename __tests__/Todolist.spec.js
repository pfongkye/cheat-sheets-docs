import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import TodoList from "playground/todolist/TodoList";
describe("TodoList", () => {
  it("should display TodoList", () => {
    const { getByText } = render(<TodoList />);

    expect(getByText("My Todo List")).toBeInTheDocument();
  });
});
