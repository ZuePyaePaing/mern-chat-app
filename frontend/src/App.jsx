import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import PageNotFound from "./pages/PageNotFound";
import Dashobard from "./pages/Dashobard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <PageNotFound />,
    children: [{ index: true, element: <Dashobard /> }],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
