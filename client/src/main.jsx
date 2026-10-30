import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";

import store from "./redux/Store.js";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <MantineProvider defaultColorScheme="light">
                    <App />
                </MantineProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);