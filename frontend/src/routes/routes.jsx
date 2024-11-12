import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import authRoutes from "./auth.routes";
import dashboardRoutes from "./dashboard.routes";

const router = createBrowserRouter([
  { path: "/", errorElement: <PageNotFound />, element: <p>hello</p> },
  ...authRoutes,
  ...dashboardRoutes,
]);

export default router;
