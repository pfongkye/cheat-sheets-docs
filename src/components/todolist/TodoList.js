import React, { useReducer, useEffect } from "react";
import styled from "styled-components";
import Todo from "./Todo";

export class TodoEntity {
  constructor(value) {
    this.value = value;
    this.id = Date.now();
  }
}

const StyledTodoList = styled.div`
  color: blue;
  min-height: 25vh;
`;

const initialState = { todos: [], currentValue: "" };

const CHANGE_TODO_VALUE = "CHANGE_TODO_VALUE",
  ADD_TODOS = "ADD_TODOS",
  COMPLETE_TODO = "COMPLETE_TODO";

function reducer(state, action) {
  switch (action[0]) {
    case CHANGE_TODO_VALUE:
      return { ...state, currentValue: action[1] };
    case ADD_TODOS:
      return { ...state, todos: [...state.todos, ...action[1]] };
    case COMPLETE_TODO:
      return { ...state, todos: [...state.todos.filter((i) => i.id !== action[1])] };
    default:
      return state;
  }
}
export default function TodoList({ todoService }) {
  const [{ currentValue, todos }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (todoService) {
      todoService.getTodos().then((res) => dispatch([ADD_TODOS, res]));
    }
  }, []);

  function addTodo() {
    if (currentValue) {
      dispatch([ADD_TODOS, [new TodoEntity(currentValue)]]);
      dispatch([CHANGE_TODO_VALUE, ""]);
    }
  }

  function handleChange(e) {
    dispatch([CHANGE_TODO_VALUE, e.target.value]);
  }

  function handleKeyUp(e) {
    e.key === "Enter" && addTodo();
  }

  function handleComplete(item) {
    dispatch([COMPLETE_TODO, item.id]);
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
            <Todo key={`todo-${item.id}`} todo={item} onComplete={handleComplete} />
          ))}
        </div>
      </div>
    </StyledTodoList>
  );
}
