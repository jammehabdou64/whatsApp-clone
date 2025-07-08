import { Check, CheckCheck } from "lucide-react";
import { usePage } from "@inertiajs/react";
import { Message } from "@/Context/index";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const { auth } = usePage().props as any;
  console.log({ message });
  return (
    <div
      className={`flex ${message.sender_id == auth?.id ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
          message.sender_id == auth?.id
            ? "bg-green-500 text-white"
            : "bg-white text-gray-800"
        }`}
      >
        {message.media_url && (
          <div className="mb-2">
            <img
              src={message.media_url || "/users/default.png"}
              alt="Shared image"
              className="rounded-lg max-w-full h-auto"
            />
          </div>
        )}

        {message.body && <p className="text-sm">{message.body}</p>}

        <div
          className={`flex items-center justify-end mt-1 space-x-1 ${
            message.sender_id == auth?.id ? "text-green-100" : "text-gray-500"
          }`}
        >
          <span className="text-xs">
            {
              // formatTime(new Date(message.created_at))
              message.created_at
            }
          </span>
          {message.sender_id == auth?.id && (
            <div className="flex">
              {message.read ? (
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
