import { render } from "preact";

import "@unocss/reset/tailwind.css";
import "uno.css";
import "./index.css";

import App from "./App";

render(<App />, document.getElementById("app") as HTMLElement);
