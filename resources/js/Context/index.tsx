// "use client";

// import { createContext, useContext, useState, type ReactNode } from "react";

export interface Message {
  message_body: string;
  message_read: string;
  message_type: string;
  lastMessage?: string;
  message_media_url: string;
  message_created_at: string;
  message_is_sent?: any;
}

// export interface Chat {
//   id: string;
//   name: string;
//   avatar: string;
//   slug: string;
//   last_seen: Date | any;
//   status: string;
//   message_body: string;
//   message_read: string;
//   message_type: string;
//   lastMessage?: string;
//   message_media_url: string;
//   message_created_at: string;
//   timestamp?: any;
//   unreadCount?: number | string;
// }

// export interface User {
//   id: string;
//   name: string;
//   avatar: string;
//   phone: string;
//   slug?: string;
// }

// export interface AvailableUser {
//   id: string;
//   name: string;
//   avatar: string;
//   slug?: string;
//   isOnline: boolean;
//   last_seen?: Date;
//   status?: any;
// }

// // Add this to the WhatsAppContextType interface
// interface WhatsAppContextType {
//   user: User | null;
//   chats: Chat[];
//   selectedChat: Chat | null;
//   isTyping: boolean;
//   theme: "light" | "dark";
//   availableUsers: AvailableUser[];
//   setUserData: (user: User) => void;
//   logout: () => void;
//   selectChat: (chat: Chat) => void;
//   sendMessage: (text: string, image?: string) => void;
//   setTyping: (typing: boolean) => void;
//   toggleTheme: () => void;
//   startChatWithUser: (user: AvailableUser) => void;
//   setAllChats: (chats: Chat[]) => void;
//   setAvailableUsers: (users: AvailableUser[]) => void;
// }

// const WhatsAppContext = createContext<WhatsAppContextType | undefined>(
//   undefined,
// );

// // Mock data
// const mockUser: User = {
//   id: "1",
//   name: "John Doe",
//   avatar: "/users/default.png?height=40&width=40",
//   phone: "+1 234 567 8900",
// };

// const mockChats: Chat[] = [];

// // Add mock available users data after mockChats
// const mockAvailableUsers: AvailableUser[] = [];
// // [
// //   {
// //     id: "5",
// //     name: "Emma Thompson",
// //     avatar: "/users/default.png?height=40&width=40",
// //     isOnline: true,
// //   },
// //   {
// //     id: "6",
// //     name: "Michael Chen",
// //     avatar: "/users/default.png?height=40&width=40",
// //     isOnline: false,
// //     lastSeen: new Date(Date.now() - 15 * 60 * 1000),
// //   },
// //   {
// //     id: "7",
// //     name: "Sofia Rodriguez",
// //     avatar: "/users/default.png?height=40&width=40",
// //     isOnline: true,
// //   },
// //   {
// //     id: "8",
// //     name: "David Kim",
// //     avatar: "/users/default.png?height=40&width=40",
// //     isOnline: false,
// //     lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
// //   },
// //   {
// //     id: "9",
// //     name: "Lisa Anderson",
// //     avatar: "/users/default.png?height=40&width=40",
// //     isOnline: true,
// //   },
// //   {
// //     id: "10",
// //     name: "James Wilson",
// //     avatar: "/users/default.png?height=40&width=40",
// //     isOnline: false,
// //     lastSeen: new Date(Date.now() - 30 * 60 * 1000),
// //   },
// // ];

// export function WhatsAppProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [chats, setChats] = useState<Chat[]>(mockChats);
//   const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
//   const [isTyping, setIsTyping] = useState(false);
//   const [theme, setTheme] = useState<"light" | "dark">("light");
//   // Add availableUsers state in the provider
//   const [availableUsers, setAvailableUser] =
//     useState<AvailableUser[]>(mockAvailableUsers);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   const setUserData = (userData: User) => {
//     setUser(userData);
//   };

//   const logout = () => {
//     setUser(null);
//     setSelectedChat(null);
//   };

//   const setAvailableUsers = (users: AvailableUser[]) => {
//     setAvailableUser(users);
//   };

//   const selectChat = (chat: Chat) => {
//     setSelectedChat(chat);
//     // Mark messages as read
//     setChats((prevChats) =>
//       prevChats.map((c) =>
//         c.id === chat.id
//           ? {
//               ...c,
//               unreadCount: 0,
//               messages: (c.message_read = "1"),
//             }
//           : c,
//       ),
//     );
//   };

//   const sendMessage = (text: string, image?: string) => {
//     if (!selectedChat) return;

//     const newMessage: Message = {
//       id: Date.now().toString(),
//       text,
//       image,
//       timestamp: new Date(),
//       isSent: true,
//       isRead: false,
//     };

//     setChats((prevChats) =>
//       prevChats.map((chat) =>
//         chat.id === selectedChat.id
//           ? {
//               ...chat,
//               ...newMessage,
//             }
//           : chat,
//       ),
//     );

//     setSelectedChat((prev) =>
//       prev
//         ? {
//             ...prev,
//             ...newMessage,
//           }
//         : null,
//     );
//   };

//   const setTyping = (typing: boolean) => {
//     setIsTyping(typing);
//   };

//   // Add the startChatWithUser function
//   const startChatWithUser = (selectedUser: AvailableUser) => {
//     // Check if chat already exists
//     const existingChat = chats.find((chat) => chat.name === selectedUser.name);

//     if (existingChat) {
//       selectChat(existingChat);
//     } else {
//       // Create new chat
//       const newChat: Chat = {
//         id: selectedUser.id,
//         name: selectedUser.name,
//         avatar: selectedUser.avatar,
//         slug: selectedUser.slug || "",
//         message_body: "",
//         message_read: "0",
//         message_type: "text",
//         message_media_url: "",
//         message_created_at: new Date().toISOString(),
//         lastMessage: "Start a conversation...",
//         timestamp: new Date(),
//         unreadCount: 0,
//         status: selectedUser.status || "",
//         last_seen: selectedUser.last_seen,
//       };

//       setChats((prevChats) => [newChat, ...prevChats]);
//       setSelectedChat(newChat);
//     }
//   };

//   const setAllChats = (newChats: Chat[]) => {
//     setChats(newChats);
//   };

//   // Update the context provider value to include the new properties
//   return (
//     <WhatsAppContext.Provider
//       value={{
//         user,
//         chats,
//         selectedChat,
//         isTyping,
//         theme,
//         availableUsers,
//         setUserData,
//         logout,
//         selectChat,
//         sendMessage,
//         setTyping,
//         toggleTheme,
//         startChatWithUser,
//         setAllChats,
//         setAvailableUsers,
//       }}
//     >
//       <div className={theme}>{children}</div>
//     </WhatsAppContext.Provider>
//   );
// }

// export function useWhatsApp() {
//   const context = useContext(WhatsAppContext);
//   if (context === undefined) {
//     throw new Error("useWhatsApp must be used within a WhatsAppProvider");
//   }
//   return context;
// }

import { createContext, useContext, useState, type ReactNode } from "react";

// Interfaces
export interface Message {
  message_body: string;
  message_read: string;
  message_type: string;
  lastMessage?: string;
  message_media_url: string;
  message_created_at: string;
  message_is_sent?: any;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string | null;
  slug: string;
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
  last_seen?: Date;
  status?: string;
}

// Context Type
interface WhatsAppContextType {
  user: User | null;
  chats: Chat[];
  selectedChat: Chat | null;
  isTyping: boolean;
  theme: "light" | "dark";
  availableUsers: AvailableUser[];
  setUserData: (user: User) => void;
  logout: () => void;
  selectChat: (chat: Chat) => void;
  sendMessage: (text: string, image?: string) => void;
  setTyping: (typing: boolean) => void;
  toggleTheme: () => void;
  startChatWithUser: (user: AvailableUser) => void;
  setAllChats: (chats: Chat[]) => void;
  setAvailableUsers: (users: AvailableUser[]) => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(
  undefined,
);

// Optional mock data
const mockUser: User = {
  id: "1",
  name: "John Doe",
  avatar: "/users/default.png?height=40&width=40",
  phone: "+1 234 567 8900",
};

const mockChats: Chat[] = [];
const mockAvailableUsers: AvailableUser[] = [];

// Provider Component
export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
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
    setSelectedChat(null);
  };

  const setAvailableUsers = (users: AvailableUser[]) => {
    _setAvailableUsers(users);
  };

  const selectChat = (chat: Chat) => {
    const updatedChat: Chat = {
      ...chat,
      message_read: "1",
      unreadCount: 0,
    };

    setChats((prevChats) =>
      prevChats.map((c) => (c.id === chat.id ? updatedChat : c)),
    );

    setSelectedChat(updatedChat);
  };

  const sendMessage = (text: string, image?: string) => {
    if (!selectedChat) return;

    const now = new Date();
    const updatedChat: Chat = {
      ...selectedChat,
      message_body: text || "",
      message_media_url: image || "",
      message_type: image ? "image" : "text",
      message_read: "0",
      message_created_at: now.toISOString(),
      timestamp: now,
      lastMessage: text || "Image",
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === selectedChat.id ? updatedChat : chat,
      ),
    );

    setSelectedChat(updatedChat);
  };

  const setTyping = (typing: boolean) => {
    setIsTyping(typing);
  };

  const startChatWithUser = (user: AvailableUser) => {
    const existingChat = chats.find((chat) => chat.id === user.id);

    if (existingChat) {
      selectChat(existingChat);
    } else {
      const newChat: Chat = {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        slug: user.slug || "",
        status: user.status || "offline",
        last_seen: user.last_seen || new Date(),
        message_body: "",
        message_read: "0",
        message_type: "text",
        message_media_url: "",
        message_created_at: new Date().toISOString(),
        unreadCount: 0,
        lastMessage: "Start a conversation...",
        timestamp: new Date(),
      };

      setChats((prevChats) => [newChat, ...prevChats]);
      setSelectedChat(newChat);
    }
  };

  const setAllChats = (newChats: Chat[]) => {
    setChats(newChats);
  };

  return (
    <WhatsAppContext.Provider
      value={{
        user,
        chats,
        selectedChat,
        isTyping,
        theme,
        availableUsers,
        setUserData,
        logout,
        selectChat,
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
