"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, MoreVertical, MessageSquare, LogOut } from "lucide-react";
import { useWhatsApp } from "@/Context/index";
import ChatList from "./chat-list";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserSelectionModal from "./user-selection-modal";

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout, theme, toggleTheme } = useWhatsApp();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  return (
    <div
      className={`w-full md:w-80 border-r flex flex-col
         bg-white border-gray-200"
`}
    >
      {/* Header */}
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar || "/users/default.png"}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="hidden sm:block">
              <h3 className="font-medium text-gray-900">{user?.name}</h3>
            </div>
          </div>
          {/* <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2">
              <MessageSquare className="h-5 w-5 text-gray-600" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <MoreVertical className="h-5 w-5 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div> */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={() => setIsUserModalOpen(true)}
            >
              <MessageSquare className={`h-5 w-5  text-gray-600`} />
            </Button>
            {/* <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <Sun
                  className={`h-5 w-5 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                />
              ) : (
                <Moon
                  className={`h-5 w-5 ${theme === "light" ? "text-gray-300" : "text-gray-600"}`}
                />
              )}
            </Button> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <MoreVertical className={`h-5 w-5 text-gray-600`} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-none focus:bg-white"
          />
        </div>
      </div>

      {/* Chat List */}
      <ChatList searchQuery={searchQuery} />
      <UserSelectionModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
      />
    </div>
  );
}
