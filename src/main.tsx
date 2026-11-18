import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import App from "./App";
import "./App.css";

const rootElement: HTMLElement | null = document.getElementById("root");

if (!rootElement) {
    throw new Error("The app root element is missing.");
}

const root: Root = createRoot(rootElement);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
