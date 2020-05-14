import React from "react";
import Layout from "@theme/Layout";
import TodoList from "../../../components/todolist/TodoList";
import LocalStorageTodoService from "../../../components/todolist/LocalStorageTodoService";

export default function () {
  return (
    <Layout title="TodoList">
      <TodoList todoService={new LocalStorageTodoService(localStorage)} />
    </Layout>
  );
}
