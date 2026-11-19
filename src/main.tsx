import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import App from "./App";
import "./styles/global.scss";
import "./styles/actions.scss";
import "./styles/contentSections.scss";

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
