import { createContext, useContext, useState, type ReactNode } from "react";
import axios from "axios";
// Interfaces
export interface Message {
  id: string;
  sender_id: string | number;
  recepient_id: string | number;
  chat_id: string | number;
  body: string;
  type: string;
  media_url: string;
  read: string;
  created_at: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string | null;
  slug?: string;
  last_seen: Date | string;
  status: string;
  message_body: string;
  message_read: string;
  message_type: string;
  message_media_url: string;
  message_created_at: string;
  unreadCount?: number | string;
  message_is_sent?: any;
  lastMessage?: string;
  timestamp?: Date;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  slug?: string;
}

export interface AvailableUser {
  id: string;
  name: string;
  avatar: string;
  slug?: string;
  isOnline: boolean;
  last_seen: Date | string;
  status: string;
}

// Context Type
interface WhatsAppContextType {
  user: User | null;
  chats: Chat[];
  selectedChat: Message[] | null;
  isTyping: boolean;
  theme: "light" | "dark";
  availableUsers: AvailableUser[];
  selectChat: Chat | null;
  setUserData: (user: User) => void;
  logout: () => void;
  setSelectChat: (chat: Chat) => void;
  sendMessage: (
    recepient_id: string,
    sender_id: string,
    text: string,
    image?: string,
  ) => void;
  setTyping: (typing: boolean) => void;
  toggleTheme: () => void;
  startChatWithUser: (user: AvailableUser) => void;
  setAllChats: (chats: Chat[]) => void;
  setAvailableUsers: (users: AvailableUser[]) => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(
  undefined,
);

const mockChats: Chat[] = [];
const mockAvailableUsers: AvailableUser[] = [];

// Provider Component
export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [selectedChat, setSelectedChat] = useState<Message[]>([]);
  const [selectChat, _setSelectChat] = useState<Chat | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [availableUsers, _setAvailableUsers] =
    useState<AvailableUser[]>(mockAvailableUsers);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setUserData = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setSelectedChat([]);
  };

  const setAvailableUsers = (users: AvailableUser[]) => {
    _setAvailableUsers(users);
  };

  const setSelectChat = async (chat: Chat) => {
    const updatedChat: Chat = {
      ...chat,
      message_read: "1",
      unreadCount: 0,
    };

    _setSelectChat(chat);

    setChats((prevChats) =>
      prevChats.map((c) => (c.id === chat.id ? updatedChat : c)),
    );

    try {
      const { data } = await axios.get(`/api/messages/${chat.id}`);
      if (data?.success) {
        setSelectedChat(data?.message);
      }
    } catch (error: any) {
      console.log({ error: error?.response });
    }

    // return [];
    // setSelectedChat(updatedChat);
  };

  const sendMessage = (
    recepient_id: string,
    sender_id: string,
    text: string,
    image?: string,
  ) => {
    if (!selectedChat) return;

    const now = new Date();
    const newMessage: Message = {
      body: text || "",
      media_url: image || "",
      type: image ? "image" : "text",
      read: "0",
      created_at: now.toISOString(),
      recepient_id,
      sender_id,
      id: `${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      chat_id: "1",
    };
    setSelectedChat((prev) => [...prev, newMessage]);
  };

  const setTyping = (typing: boolean) => {
    setIsTyping(typing);
  };

  const startChatWithUser = (user: AvailableUser) => {
    setSelectChat({
      id: user.id,
      name: user.name,
      avatar: user?.avatar,
      slug: user.slug,
      last_seen: user?.last_seen,
      status: user.status,
      message_body: "",
      message_read: "",
      message_type: "",
      message_media_url: "",
      message_created_at: "",
      unreadCount: 0,
      message_is_sent: "",
      lastMessage: "",
      timestamp: new Date(),
    });
  };

  const setAllChats = (newChats: Chat[]) => {
    setChats(newChats);
  };

  return (
    <WhatsAppContext.Provider
      value={{
        selectChat,
        user,
        chats,
        selectedChat,
        isTyping,
        theme,
        availableUsers,
        setUserData,
        logout,
        setSelectChat,
        sendMessage,
        setTyping,
        toggleTheme,
        startChatWithUser,
        setAllChats,
        setAvailableUsers,
      }}
    >
      <div className={theme}>{children}</div>
    </WhatsAppContext.Provider>
  );
}

// Custom hook
export function useWhatsApp() {
  const context = useContext(WhatsAppContext);
  if (!context) {
    throw new Error("useWhatsApp must be used within a WhatsAppProvider");
  }
  return context;
}
