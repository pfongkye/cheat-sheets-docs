import React from "react";
import Layout from "@theme/Layout";

export default function () {
  return (
    <Layout title="Playground">
      <header>
        <h1>Playground Examples</h1>
        <nav>
          <ul id="main-nav">
            <li>
              <a href="playground/css">CSS</a>
            </li>
            <li>
              <a href="playground/todolist">TodoList</a>
            </li>
          </ul>
        </nav>
      </header>
    </Layout>
  );
}
