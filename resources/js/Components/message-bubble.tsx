"use client";

import { Check, CheckCheck } from "lucide-react";
import type { Message } from "@/Context/index";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div
      className={`flex ${message.message_is_sent ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
          message.message_is_sent
            ? "bg-green-500 text-white"
            : "bg-white text-gray-800"
        }`}
      >
        {message.message_media_url && (
          <div className="mb-2">
            <img
              src={message.message_media_url || "/users/default.png"}
              alt="Shared image"
              className="rounded-lg max-w-full h-auto"
            />
          </div>
        )}

        {message.message_body && (
          <p className="text-sm">{message.message_body}</p>
        )}

        <div
          className={`flex items-center justify-end mt-1 space-x-1 ${
            message.message_is_sent ? "text-green-100" : "text-gray-500"
          }`}
        >
          <span className="text-xs">
            {
              //formatTime(
              message.message_created_at
              // )
            }
          </span>
          {message.message_is_sent && (
            <div className="flex">
              {message.message_read ? (
                <CheckCheck className="h-3 w-3" />
              ) : (
                <Check className="h-3 w-3" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
