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

const initialState = { todos: [] };
function reducer(state, action) {
  switch (action[0]) {
    case "ADD_TODO":
      return { todos: [action[1], ...state.todos] };
    case "COMPLETE_TODO":
      return { todos: [...state.todos.filter((i) => i.Id !== action[1])] };
    default:
      return state;
  }
}
export default function TodoList() {
  const [value, setValue] = useState("");
  const [todoList, dispatch] = useReducer(reducer, initialState);

  function handleAdd() {
    dispatch(["ADD_TODO", new TodoEntity(value)]);
    setValue("");
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleKeyUp(e) {
    if (e.key === "Enter") {
      dispatch(["ADD_TODO", new TodoEntity(e.target.value)]);
      setValue("");
    }
  }

  function handleComplete(item) {
    dispatch(["COMPLETE_TODO", item.Id]);
  }

  return (
    <StyledTodoList>
      <h3>My Todo List</h3>
      <label>
        Todo: <input value={value} onChange={handleChange} onKeyUp={handleKeyUp} />
      </label>
      <button onClick={handleAdd}>Add</button>
      <div>
        {todoList.todos.length > 0 && <span>My active todos:</span>}
        <div>
          {todoList.todos.map((item) => (
            <Todo key={`todo-${item.Id}`} todo={item} onComplete={handleComplete} />
          ))}
        </div>
      </div>
    </StyledTodoList>
  );
}
