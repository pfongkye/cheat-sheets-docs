import React, { useState } from "react";
import styled from "styled-components";

const StyledTodoList = styled.div`
  color: blue;
`;

const Todo = styled.div`
  color: green;
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
        Todo: <input value={todoValue} onChange={handleChange} />
      </label>
      <button onClick={handleAdd}>Add</button>
      <div>
        {todoItems.length > 0 && <span>My active todos:</span>}
        <div>
          {todoItems.map((item, i) => (
            <Todo key={`todo-${i}`}>{item}</Todo>
          ))}
        </div>
      </div>
    </StyledTodoList>
  );
}
