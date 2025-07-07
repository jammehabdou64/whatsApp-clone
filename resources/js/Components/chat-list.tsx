"use client";

import { useWhatsApp } from "@/Context/index";

interface ChatListProps {
  searchQuery: string;
}

export default function ChatList({ searchQuery }: ChatListProps) {
  const { chats, selectedChat, selectChat } = useWhatsApp();

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat?.message_body?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {filteredChats.map((chat, index) => (
        <div
          key={index}
          onClick={() => selectChat(chat)}
          className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
            selectedChat?.id === chat.id ? "bg-gray-100" : ""
          }`}
        >
          <div className="relative">
            <img
              src={chat.avatar || "/users/default.png"}
              alt={chat.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {chat.status && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>

          <div className="ml-3 flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900 truncate">
                {chat.name}
              </h3>
              <span className="text-xs text-gray-500 ml-2">
                {
                  // formatTime(chat.timestamp)
                  chat.message_created_at
                }
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-sm text-gray-600 truncate">
                {chat.message_body}
              </p>
              {chat.message_read && (
                <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 ml-2 min-w-[20px] text-center">
                  {chat.unreadCount || 1}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
