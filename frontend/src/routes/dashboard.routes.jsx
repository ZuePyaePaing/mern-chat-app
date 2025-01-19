import DashboardLayout from "../features/dashboard/components/DashboardLayout";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import MessageGroupPage from "../features/dashboard/pages/MessageGroupPage";
import SettingPage from "../features/dashboard/pages/SettingPage";

const dashboardRoutes = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "messages", element: <DashboardPage /> },
      {
        path: "messages/:userId", // Dynamic route for user details
        element: <DashboardPage />,
      },
      ,
      {
        path: "messages-group",
        element: <MessageGroupPage />,
      },
      {
        path: "messages-group/:groupId",
        element: <MessageGroupPage />,
      },
      { path: "settings", element: <SettingPage /> },
    ],
  },
];

export default dashboardRoutes;
