/* @refresh reload */
import { render } from "solid-js/web";

import "virtual:windi.css";
import "./index.css";

import App from "./App";

render(() => <App />, document.getElementById("root") as HTMLElement);
