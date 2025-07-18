import Sidebar from "./sidebar";
import ChatWindow from "./chat-window";
import { usePage } from "@inertiajs/react";
import { useWhatsApp } from "@/Context";
import { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io();

const Layout = () => {
  const { auth, chats, availableUsers } = usePage().props as any;
  const { setAllChats, setAvailableUsers, setUserData } = useWhatsApp();

  useEffect(() => {
    setUserData(auth);
    setAvailableUsers(availableUsers);
    setAllChats(chats);

    socket.emit("message", { welcome: "Welcome" });
  }, []);
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
