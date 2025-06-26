"use client";

import { useState } from "react";
import { X, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useWhatsApp, type AvailableUser } from "@/Context/index";
import { formatDistanceToNow } from "date-fns";

interface UserSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserSelectionModal({
  isOpen,
  onClose,
}: UserSelectionModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { availableUsers, startChatWithUser } = useWhatsApp();

  const filteredUsers = availableUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleUserSelect = (user: AvailableUser) => {
    startChatWithUser(user);
    onClose();
    setSearchQuery(""); // Reset search when closing
  };

  const getStatusText = (user: AvailableUser) => {
    if (user.isOnline) {
      return "online";
    } else if (user.lastSeen) {
      return `last seen ${formatDistanceToNow(user.lastSeen, { addSuffix: true })}`;
    }
    return "offline";
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-inherit opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={
            "w-full max-w-md rounded-lg shadow-2xl transform transition-all duration-300 scale-100 bg-white"
          }
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between p-4 border-b border-gray-200
            `}
          >
            <h2 className={`text-lg font-semibold text-gray-900`}>
              Start New Chat
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
              <X className={`h-5 w-5  text-gray-600`} />
            </Button>
          </div>

          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400
                `}
              />
              <Input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 
                    bg-gray-50 border-gray-200
                `}
              />
            </div>
          </div>

          {/* User List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <div
                  key={index}
                  onClick={() => handleUserSelect(user)}
                  className={`flex items-center p-4 cursor-pointer transition-colors border-b last:border-b-0 
                hover:bg-gray-50 border-gray-100
                  `}
                >
                  <div className="relative">
                    <img
                      src={user.avatar || "/users/default.png"}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {user.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div className="ml-3 flex-1">
                    <h3 className={`font-medium text-gray-900`}>{user.name}</h3>
                    <p className={`text-sm text-gray-600`}>
                      {getStatusText(user)}
                    </p>
                  </div>

                  <div className={`text-xs text-gray-500`}>
                    <User className="h-4 w-4" />
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <User className={`h-12 w-12 mx-auto mb-3 text-gray-400`} />
                <p className={`text-sm text-gray-500`}>
                  No users found matching "{searchQuery}"
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className={`p-4 border-t border-gray-200`}>
            <p className={`text-xs text-center text-gray-500`}>
              Click on a user to start chatting
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
