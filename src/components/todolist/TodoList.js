import React, { useState, useReducer } from "react";
import styled from "styled-components";
import Todo from "./Todo";

class TodoEntity {
  constructor(value) {
    this.value = value;
    this.Id = Date.now();
  }
}

const StyledTodoList = styled.div`
  color: blue;
  height: 25vh;
`;

const initialState = { todos: [], currentValue: "" };
function reducer(state, action) {
  switch (action[0]) {
    case "CHANGE_TODO_VALUE":
      return { ...state, currentValue: action[1] };
    case "ADD_TODO":
      return { ...state, todos: [action[1], ...state.todos] };
    case "COMPLETE_TODO":
      return { ...state, todos: [...state.todos.filter((i) => i.Id !== action[1])] };
    default:
      return state;
  }
}
export default function TodoList() {
  const [{ currentValue, todos }, dispatch] = useReducer(reducer, initialState);

  function addTodo() {
    if (currentValue) {
      dispatch(["ADD_TODO", new TodoEntity(currentValue)]);
      dispatch(["CHANGE_TODO_VALUE", ""]);
    }
  }

  function handleChange(e) {
    dispatch(["CHANGE_TODO_VALUE", e.target.value]);
  }

  function handleKeyUp(e) {
    e.key === "Enter" && addTodo();
  }

  function handleComplete(item) {
    dispatch(["COMPLETE_TODO", item.Id]);
  }

  return (
    <StyledTodoList>
      <h3>My Todo List</h3>
      <label>
        Todo: <input value={currentValue} onChange={handleChange} onKeyUp={handleKeyUp} />
      </label>
      <button onClick={addTodo}>Add</button>
      <div>
        {todos.length > 0 && <span>My active todos:</span>}
        <div>
          {todos.map((item) => (
            <Todo key={`todo-${item.Id}`} todo={item} onComplete={handleComplete} />
          ))}
        </div>
      </div>
    </StyledTodoList>
  );
}
