import React, { useState } from "react";
import styled from "styled-components";

const StyledTodoList = styled.div`
  color: blue;
`;

export default function TodoList() {
  const [todoValue, setTodoValue] = useState("");
  const [todoItems, setTodoItems] = useState([]);

  function handleAdd() {
    setTodoItems([...todoItems, todoValue]);
    setTodoValue("");
  }

  function handleChange(e) {
    setTodoValue(e.target.value);
  }

  return (
    <StyledTodoList>
      My Todo List
      <label>
        Add Todo: <input value={todoValue} onChange={handleChange} />
      </label>
      <button onClick={handleAdd}>Add</button>
      <div>
        {todoItems.map((item, i) => (
          <span key={`todo-${i}`}>{item}</span>
        ))}
      </div>
    </StyledTodoList>
  );
}
