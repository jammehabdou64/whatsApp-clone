"use client";

import { useWhatsApp } from "@/Context/index";
import ChatHeader from "./chat-header";
import MessageArea from "./message-area";
import MessageInput from "./message-input";
import { MessageCircle } from "lucide-react";

export default function ChatWindow() {
  const { selectedChat } = useWhatsApp();

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
            <MessageCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-xl font-medium text-gray-800 mb-2">
            WhatsApp Web
          </h2>
          <p className="text-gray-600 max-w-md">
            Send and receive messages without keeping your phone online. Use
            WhatsApp on up to 4 linked devices and 1 phone at the same time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <ChatHeader />
      <MessageArea />
      <MessageInput />
    </div>
  );
}
