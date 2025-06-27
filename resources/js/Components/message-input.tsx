import type React from "react";

import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Smile, Paperclip, Send, Mic } from "lucide-react";
import { useWhatsApp } from "@/Context/index";
import { useForm } from "@inertiajs/react";

export default function MessageInput() {
  const { selectedChat, isTyping } = useWhatsApp();
  const { data, post, reset, setData } = useForm({
    message: "",
    recepient_id: selectedChat?.id || "",
  });

  const { sendMessage, setTyping } = useWhatsApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (data.message.trim()) {
      sendMessage(data.message.trim());

      setTyping(false);
      post("/messages", {
        onSuccess() {
          reset();
        },
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData("message", e.target.value);
    setTyping(e.target.value.length > 0);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        sendMessage("", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-50 border-t border-gray-200 p-4">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="p-2">
          <Smile className="h-5 w-5 text-gray-600" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="p-2"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="h-5 w-5 text-gray-600" />
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        <div className="flex-1">
          <Input
            type="text"
            placeholder="Type a message"
            value={data.message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="border-none bg-white text-gray-700 rounded-full px-4 py-2 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {data.message.trim() ? (
          <Button
            onClick={handleSend}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2"
          >
            <Send className="h-5 w-5" />
          </Button>
        ) : (
          <Button variant="ghost" size="sm" className="p-2">
            <Mic className="h-5 w-5 text-gray-600" />
          </Button>
        )}
      </div>
    </div>
  );
}
