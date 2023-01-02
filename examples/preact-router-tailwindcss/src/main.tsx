import { render } from "preact";

import { Router } from "wouter-preact";

import "./index.css";

import RootRoutes from "./Routes";

render(
  <Router>
    <RootRoutes />
  </Router>,
  document.getElementById("app") as HTMLElement
);
