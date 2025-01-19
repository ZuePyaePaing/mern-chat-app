import { useState } from "react";
import MessageDetail from "./MessageDetailPage";
import MessageUserList from "./MessageListPage";

const DashboardPage = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  return (
    <section className="flex flex-1 flex-col overflow-hidden">
      <div className="flex h-screen bg-gray-900 text-gray-100">
        <div className="w-full sm:w-1/3 lg:w-1/4 border-r border-gray-700">
          <MessageUserList
            onSelectUser={setSelectedUserId}
            selectedUserId={selectedUserId}
          />
        </div>
        <div className="hidden sm:block sm:w-2/3 lg:w-3/4">
          <MessageDetail selectedUserId={selectedUserId} />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
