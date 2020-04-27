import React from "react";
import styled from "styled-components";

const StyledTodo = styled.div`
  color: green;
`;

export default function ({ todo, onComplete }) {
  return (
    <StyledTodo>
      <label>
        <input type="checkbox" onClick={() => onComplete(todo)} />
        {todo && todo.value}
      </label>
    </StyledTodo>
  );
}
