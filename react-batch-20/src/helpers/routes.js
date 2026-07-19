import { createBrowserRouter } from "react-router";
import App from '../App.jsx'
import Create from "../Create.jsx"
import Edit from "../Edit.jsx"
import Page404 from '../Page404.jsx'

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        Component: App
      },
      {
        path: "create",
        Component: Create
      },
      {
        path: "edit",
        Component: Edit
      },
    ]
  },
  {
    path: "*",
    Component: Page404
  }
]);