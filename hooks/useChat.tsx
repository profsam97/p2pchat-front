import { baseUrl } from "@/base/baseUrl";
import { useAuthStore } from "@/lib/store/auth";
import { useSocketStore } from "@/lib/store/socket";
import { Contact, Message, User } from "@/lib/types/chat";
import axios from "axios";  
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useChat = () => {

    const [contacts, setContacts] = useState<Contact[]>([]);
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [contactDetails, setContactDetails] = useState<boolean>(false);
    const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
    const user = useAuthStore((state) => state.user);
    const socket = useSocketStore((state) => state.socket);
    const logout = useAuthStore((state) => state.logout);
    const disconnect = useSocketStore((state) => state.disconnect);
    const router = useRouter();
      useEffect(() => {
        if (!user) {
          router.push('/auth/signup');
          return;
        }
        // Load contacts from backend
        loadContacts();
    
        // Setup socket listeners
        if (socket) {
          socket.on('new-message', handleNewMessage);
          socket.on('user-status-change', handleUserStatusChange);
          socket.on('offline-messages', handleOfflineMessages);
          
          // Authenticate socket connection
        }
        return () => {
          if (socket) {
            socket.off('new-message');
            socket.off('user-status-change');
            socket.off('offline-messages');
          }
        };
      }, [user, socket]);
      useEffect(() => {
        if (socket) {
          socket.on('new-message', (message: Message) => {
            handleNewMessage(message);
            
            // Update unread count if message is from someone other than selected contact
            if (message.senderId !== selectedContact?.id) {
              setUnreadCounts(prev => ({
                ...prev,
                [message.senderId]: (prev[message.senderId] || 0) + 1
              }));
            }
          });
      
          socket.on('messages-marked-read', (contactId: string) => {
            setUnreadCounts(prev => ({
              ...prev,
              [contactId]: 0
            }));
          });
      
          return () => {
            socket.off('new-message');
            socket.off('messages-marked-read');
          };
        }
      }, [socket, selectedContact]);
  const loadContacts = async () => {
    //fetching all the contacts for the loggedin user
    try {
      const response = await axios.get(`${baseUrl}api/contacts/fetch`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      setContacts(response.data);
    } catch (error) {
      console.error('Failed to load contacts:', error);
    }
  };
  const handleNewMessage = async (message: Message) => {
    setMessages(prev => [...prev, message]);
    updateContactLastMessage(message);
    await new Promise((resolve) => setTimeout(resolve, 100))
    await loadContacts()
  };
  const handleUserStatusChange = ({ userId, isOnline }: { userId: string, isOnline: boolean }) => {
    setContacts(prev => prev.map(contact => 
      contact.id === userId ? { ...contact, isOnline } : contact
    ));
  };
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setIsSearching(!!search);
    if (!search) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(`${baseUrl}api/users/search?query=${search}`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };
  const selectSearchResult = async (selectedUser: User) => {
    const newContact: Contact = {
      id: selectedUser.id,
      email: selectedUser.email,
      isOnline: selectedUser.isOnline,
      mobile: selectedUser.mobile,
      name: selectedUser.name
    };
    setIsSearching(false);
    handleSelectedContact(newContact)
    // Add to contacts if not already present
    if (!contacts.find(c => c.id === selectedUser.id)) {
      setContacts(prev => [...prev, newContact]);
      // Save contact to backend
      try {
        await axios.post(`${baseUrl}api/contacts/add`, 
          { contactId: selectedUser.id },
          { headers: { Authorization: `Bearer ${user?.token}` } }
        );
      } catch (error) {
        console.error('Failed to save contact:', error);
      }
    }
  };
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact || !socket) return;
    const messageData = {
      recipientId: selectedContact.id,
      content: newMessage
    };
    // Emit the message via socket
    socket.emit('direct-message', messageData);
    await new Promise((resolve) => setTimeout(resolve, 100))
    await loadContacts()
    setNewMessage("");
  };
  const handleOfflineMessages = (messages: Message[]) => {
    // Process offline messages
    messages.forEach(handleNewMessage);
  };
  const updateContactLastMessage = (message: Message) => {
    setContacts(prev => prev.map(contact => {
      if (contact.id === message.senderId || contact.id === message.recipientId) {
        return {
          ...contact,
          lastMessage: message.content,
          timestamp: new Date(message.createdAt).toLocaleTimeString() 
        };
      }
      return contact;
    }));
  };
  useEffect(() => {
    // fetching offline message for the current contact
    const fetchMessages = async () => {
      if (selectedContact && user) {
        try {
          const response = await axios.get(`${baseUrl}api/messages/${selectedContact.id}`, {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          setMessages(response.data);
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
      }
    };
    fetchMessages();
  }, [selectedContact, user]);
  useEffect(() => {
    //here we fetch unread messages 
    const fetchUnreadCounts = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/messages`, {
          headers: { Authorization: `Bearer ${user?.token}` }
        });
        console.log(response.data)
        setUnreadCounts(response.data);
      } catch (error) {
        console.error('Failed to fetch unread counts:', error);
      }
    };
    if (user) {
      fetchUnreadCounts();
    }
  }, [user, socket]);
  const handleSelectedContact = (contact : Contact) => {
    setSelectedContact(contact)
    setContactDetails(false)
    if (socket) {
      socket.emit('mark-messages-read', contact.id);
    }
    setUnreadCounts(prev => ({
      ...prev,
      [contact.id]: 0
    }));
  }
    // our zudstand store 
      // the logout handler 
      const logoutHandler = () => {
          logout()
          disconnect()
          router.push('/')
      }   

      return {
        contacts,
    searchResults,
    messages,
    selectedContact,
    newMessage,
    isSearching,
    contactDetails,
    unreadCounts,
    user,
    handleSearch,
    selectSearchResult,
    handleSelectedContact,
    sendMessage,
    setNewMessage,
    setContactDetails,
    logoutHandler
      }

}