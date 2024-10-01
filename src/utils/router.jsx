import { createBrowserRouter } from "react-router-dom";
import { Categories, Home, Products } from "../pages/index.js";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/products",
    element: <Products />,
  },
]);
