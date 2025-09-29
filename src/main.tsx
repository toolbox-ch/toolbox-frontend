import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

if (import.meta.env.PROD) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
