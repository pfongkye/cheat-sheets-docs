import React from "react";
import Layout from "@theme/Layout";
import "./playground.css";

export default function CssPlayground() {
  return (
    <Layout title="CSS Playground">
      <header className="page-header">
        <h1 id="page-title" className="title">
          My title example
        </h1>
        <nav>
          <ul id="main-nav" className="nav">
            <li>
              <a href="../">Home</a>
            </li>
            <li>
              <a href="teas">Teas</a>
            </li>
            <li>
              <a href="beers">Beers</a>
            </li>
            <li>
              <a href="specials" className="featured">
                Specials
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </Layout>
  );
}
