import React, { useState } from "react";
import styled from "styled-components";
import Todo from "./Todo";

class TodoEntity {
  constructor(value) {
    this.value = value;
    this.isCompleted = false;
  }

  setCompleted() {
    this.isCompleted = true;
  }

  getIsCompleted() {
    return this.isCompleted;
  }
}

const StyledTodoList = styled.div`
  color: blue;
`;

function isItemActive(item) {
  return !item.getIsCompleted();
}

export default function TodoList() {
  const [value, setValue] = useState("");
  const [todoItems, setTodoItems] = useState([]);

  function handleAdd() {
    setTodoItems([...todoItems, new TodoEntity(value)]);
    setValue("");
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleComplete(item) {
    todoItems.find((i) => i.value === item.value).setCompleted(true);
    setTodoItems([...todoItems]);
  }

  return (
    <StyledTodoList>
      <h3>My Todo List</h3>
      <label>
        Todo: <input value={value} onChange={handleChange} />
      </label>
      <button onClick={handleAdd}>Add</button>
      <div>
        {todoItems.findIndex(isItemActive) !== -1 && <span>My active todos:</span>}
        <div>
          {todoItems.filter(isItemActive).map((item, i) => (
            <Todo key={`todo-${i}`} todo={item} onComplete={handleComplete} />
          ))}
        </div>
      </div>
    </StyledTodoList>
  );
}
