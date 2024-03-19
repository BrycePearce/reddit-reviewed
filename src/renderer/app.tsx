import { createRoot } from "react-dom/client";

import { AuthProvider } from "./context/AuthContext";
import Root from "./Root";

const container = document.getElementById("app");
if (!container) throw new Error("No root element found");
const root = createRoot(container);

root.render(
  <AuthProvider>
    <Root />
  </AuthProvider>
);
