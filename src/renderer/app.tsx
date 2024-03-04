import * as React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<h2 className="text-3xl font-bold underline">Hello from React!</h2>);
