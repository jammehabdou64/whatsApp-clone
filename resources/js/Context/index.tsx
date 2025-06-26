"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export interface Message {
  id: string;
  text?: string;
  image?: string;
  timestamp: Date;
  isSent: boolean;
  isRead: boolean;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isOnline: boolean;
  lastSeen?: Date;
  messages: Message[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  phone: string;
}

export interface AvailableUser {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: Date;
}

// Add this to the WhatsAppContextType interface
interface WhatsAppContextType {
  user: User | null;
  chats: Chat[];
  selectedChat: Chat | null;
  isLoggedIn: boolean;
  isTyping: boolean;
  theme: "light" | "dark";
  availableUsers: AvailableUser[];
  login: (user: User) => void;
  logout: () => void;
  selectChat: (chat: Chat) => void;
  sendMessage: (text: string, image?: string) => void;
  setTyping: (typing: boolean) => void;
  toggleTheme: () => void;
  startChatWithUser: (user: AvailableUser) => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(
  undefined,
);

// Mock data
const mockUser: User = {
  id: "1",
  name: "John Doe",
  avatar: "/placeholder.svg?height=40&width=40",
  phone: "+1 234 567 8900",
};

const mockChats: Chat[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey! How are you doing?",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    unreadCount: 2,
    isOnline: true,
    messages: [
      {
        id: "1",
        text: "Hi there!",
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        isSent: false,
        isRead: true,
      },
      {
        id: "2",
        text: "Hello! How are you?",
        timestamp: new Date(Date.now() - 55 * 60 * 60 * 1000),
        isSent: true,
        isRead: true,
      },
      {
        id: "3",
        text: "I'm doing great, thanks for asking!",
        timestamp: new Date(Date.now() - 50 * 60 * 60 * 1000),
        isSent: false,
        isRead: true,
      },
      {
        id: "4",
        image: "/placeholder.svg?height=200&width=300",
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
        isSent: false,
        isRead: true,
      },
      {
        id: "5",
        text: "Hey! How are you doing?",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        isSent: false,
        isRead: false,
      },
    ],
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "See you tomorrow!",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 0,
    isOnline: false,
    lastSeen: new Date(Date.now() - 30 * 60 * 1000),
    messages: [
      {
        id: "1",
        text: "Are we still meeting tomorrow?",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        isSent: true,
        isRead: true,
      },
      {
        id: "2",
        text: "Yes, absolutely! See you at 3 PM.",
        timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
        isSent: false,
        isRead: true,
      },
      {
        id: "3",
        text: "See you tomorrow!",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isSent: false,
        isRead: true,
      },
    ],
  },
  {
    id: "3",
    name: "Family Group",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Mom: Don't forget dinner tonight",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    unreadCount: 5,
    isOnline: false,
    messages: [
      {
        id: "1",
        text: "Good morning everyone!",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        isSent: true,
        isRead: true,
      },
      {
        id: "2",
        text: "Morning! How's everyone doing?",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        isSent: false,
        isRead: true,
      },
      {
        id: "3",
        text: "Don't forget dinner tonight",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        isSent: false,
        isRead: false,
      },
    ],
  },
  {
    id: "4",
    name: "Sarah Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for your help!",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    unreadCount: 0,
    isOnline: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
    messages: [
      {
        id: "1",
        text: "Could you help me with the project?",
        timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000),
        isSent: false,
        isRead: true,
      },
      {
        id: "2",
        text: "Of course! What do you need help with?",
        timestamp: new Date(Date.now() - 24.5 * 60 * 60 * 1000),
        isSent: true,
        isRead: true,
      },
      {
        id: "3",
        text: "Thanks for your help!",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        isSent: false,
        isRead: true,
      },
    ],
  },
];

// Add mock available users data after mockChats
const mockAvailableUsers: AvailableUser[] = [
  {
    id: "5",
    name: "Emma Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
  },
  {
    id: "6",
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
    lastSeen: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: "7",
    name: "Sofia Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
  },
  {
    id: "8",
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "9",
    name: "Lisa Anderson",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
  },
  {
    id: "10",
    name: "James Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
    lastSeen: new Date(Date.now() - 30 * 60 * 1000),
  },
];

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  // Add availableUsers state in the provider
  const [availableUsers] = useState<AvailableUser[]>(mockAvailableUsers);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const login = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setSelectedChat(null);
  };

  const selectChat = (chat: Chat) => {
    setSelectedChat(chat);
    // Mark messages as read
    setChats((prevChats) =>
      prevChats.map((c) =>
        c.id === chat.id
          ? {
              ...c,
              unreadCount: 0,
              messages: c.messages.map((m) => ({ ...m, isRead: true })),
            }
          : c,
      ),
    );
  };

  const sendMessage = (text: string, image?: string) => {
    if (!selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      image,
      timestamp: new Date(),
      isSent: true,
      isRead: false,
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: text || "Image",
              timestamp: new Date(),
            }
          : chat,
      ),
    );

    setSelectedChat((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, newMessage],
            lastMessage: text || "Image",
            timestamp: new Date(),
          }
        : null,
    );
  };

  const setTyping = (typing: boolean) => {
    setIsTyping(typing);
  };

  // Add the startChatWithUser function
  const startChatWithUser = (selectedUser: AvailableUser) => {
    // Check if chat already exists
    const existingChat = chats.find((chat) => chat.name === selectedUser.name);

    if (existingChat) {
      selectChat(existingChat);
    } else {
      // Create new chat
      const newChat: Chat = {
        id: selectedUser.id,
        name: selectedUser.name,
        avatar: selectedUser.avatar,
        lastMessage: "Start a conversation...",
        timestamp: new Date(),
        unreadCount: 0,
        isOnline: selectedUser.isOnline,
        lastSeen: selectedUser.lastSeen,
        messages: [],
      };

      setChats((prevChats) => [newChat, ...prevChats]);
      setSelectedChat(newChat);
    }
  };

  // Update the context provider value to include the new properties
  return (
    <WhatsAppContext.Provider
      value={{
        user,
        chats,
        selectedChat,
        isLoggedIn,
        isTyping,
        theme,
        availableUsers,
        login,
        logout,
        selectChat,
        sendMessage,
        setTyping,
        toggleTheme,
        startChatWithUser,
      }}
    >
      <div className={theme}>{children}</div>
    </WhatsAppContext.Provider>
  );
}

export function useWhatsApp() {
  const context = useContext(WhatsAppContext);
  if (context === undefined) {
    throw new Error("useWhatsApp must be used within a WhatsAppProvider");
  }
  return context;
}
