import DashboardLayout from "../features/dashboard/components/DashboardLayout";
import EditProfilePage from "../features/dashboard/components/setting/EditProfilePage";
import GeneralPage from "../features/dashboard/components/setting/GeneralPage";
import IntegrationsPage from "../features/dashboard/components/setting/IntegrationsPage";
import Notifications from "../features/dashboard/components/setting/Notifications";
import Security from "../features/dashboard/components/setting/Security";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import MessageDetail from "../features/dashboard/pages/MessageDetailPage";
import MessageGroupDetialPage from "../features/dashboard/pages/MessageGroupDetialPage";
import MessageGroupPage from "../features/dashboard/pages/MessageGroupPage";
import SettingPage from "../features/dashboard/pages/SettingPage";

const dashboardRoutes = [
  {
    path: "/messages",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
        children: [
          {
            path: ":userId",
            element: <MessageDetail />,
          },
        ],
      },
      {
        path: "messages-group",
        element: <MessageGroupPage />,
        children: [
          {
            path: ":groupId",
            element: <MessageGroupDetialPage />,
          },
        ],
      },
      {
        path: "settings",
        element: <SettingPage />,
        children: [
          { index: true, element: <GeneralPage /> },
          {
            path: "edit-profile",
            element: <EditProfilePage />,
          },
          {
            path: "security",
            element: <Security />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
          {
            path: "integrations",
            element: <IntegrationsPage />,
          },
        ],
      },
    ],
  },
];

export default dashboardRoutes;
