import { Button } from "./ui/button";
import { Search, MoreVertical, Phone, Video } from "lucide-react";
import { useWhatsApp } from "@/Context/index";
import { formatDistanceToNow } from "date-fns";

export default function ChatHeader() {
  const { selectedChat } = useWhatsApp();

  if (!selectedChat) return null;

  const getStatusText = () => {
    if (selectedChat.isOnline) {
      return "online";
    } else if (selectedChat.lastSeen) {
      return `last seen ${formatDistanceToNow(selectedChat.lastSeen, { addSuffix: true })}`;
    }
    return "offline";
  };

  return (
    <div className="bg-gray-50 border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={selectedChat.avatar || "/users/default.png"}
              alt={selectedChat.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {selectedChat.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div>
            <h2 className="font-medium text-gray-900">{selectedChat.name}</h2>
            <p className="text-sm text-gray-600">{getStatusText()}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="p-2">
            <Video className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <Phone className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <Search className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </div>
  );
}
