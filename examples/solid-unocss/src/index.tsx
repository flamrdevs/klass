/* @refresh reload */
import { render } from "solid-js/web";

import "@unocss/reset/tailwind.css";
import "uno.css";
import "./index.css";

import App from "./App";

render(() => <App />, document.getElementById("root") as HTMLElement);
