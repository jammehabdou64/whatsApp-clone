"use client";

import { useEffect, useRef } from "react";
import { useWhatsApp } from "@/Context/index";
import MessageBubble from "./message-bubble";

export default function MessageArea() {
  const { selectedChat, isTyping } = useWhatsApp();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  if (!selectedChat) return null;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#e5ddd5] bg-opacity-50">
      {
        // selectedChat.map((message) => (
        <MessageBubble key={selectedChat.id} message={selectedChat} />
        // ))
      }

      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-white rounded-lg p-3 shadow-sm max-w-xs">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
