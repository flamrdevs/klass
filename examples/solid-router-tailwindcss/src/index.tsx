/* @refresh reload */
import { render } from "solid-js/web";

import { Router } from "@solidjs/router";

import "./index.css";

import RootRoutes from "./Routes";

render(
  () => (
    <Router>
      <RootRoutes />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
