import Sidebar from "./sidebar";
import ChatWindow from "./chat-window";

const Layout = () => {
  return (
    <div className="flex h-screen py-5 bg-gray-100">
      <div className="flex w-full max-w-7xl mx-auto bg-white shadow-lg">
        <Sidebar />
        <ChatWindow />
      </div>
    </div>
  );
};

export default Layout;
