import { render } from "preact";

import "virtual:windi.css";
import "./index.css";

import App from "./App";

render(<App />, document.getElementById("app") as HTMLElement);
