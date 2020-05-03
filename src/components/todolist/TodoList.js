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
`;

const initialState = [];
function reducer(state, action) {
  switch (action[0]) {
    case "ADD_TODO":
      return [action[1], ...state];
    case "COMPLETE_TODO":
      return [...state.filter((i) => i.Id !== action[1])];
    default:
      return state;
  }
}
export default function TodoList() {
  const [value, setValue] = useState("");
  const [todoItems, dispatch] = useReducer(reducer, initialState);

  function handleAdd() {
    dispatch(["ADD_TODO", new TodoEntity(value)]);
    setValue("");
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleComplete(item) {
    dispatch(["COMPLETE_TODO", item.Id]);
  }

  return (
    <StyledTodoList>
      <h3>My Todo List</h3>
      <label>
        Todo: <input value={value} onChange={handleChange} />
      </label>
      <button onClick={handleAdd}>Add</button>
      <div>
        {todoItems.length > 0 && <span>My active todos:</span>}
        <div>
          {todoItems.map((item, i) => (
            <Todo key={`todo-${i}`} todo={item} onComplete={handleComplete} />
          ))}
        </div>
      </div>
    </StyledTodoList>
  );
}
