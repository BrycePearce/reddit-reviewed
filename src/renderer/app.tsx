import { createRoot } from "react-dom/client";
import Root from "./Root";

const container = document.getElementById("app");
if (!container) throw new Error("No root element found");
const root = createRoot(container);
root.render(<Root />);
