import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./helpers/routes.js";

import { RouterProvider } from "react-router/dom";

const domNode: HTMLElement = document.getElementById("root")!;

const root = createRoot(domNode);

root.render(<RouterProvider router={router} />);
