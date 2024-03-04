import * as React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("app");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container);
root.render(<h2>Hello from React!</h2>);
