import React from 'react';
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Contact, User } from '@/lib/types/chat';
import { ContactItems, SearchResults } from './ContactListComponents';

interface ContactListProps {
  contacts: Contact[];
  searchResults: User[];
  isSearching: boolean;
  selectedContact: Contact | null;
  unreadCounts: Record<string, number>;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectSearchResult: (user: User) => void;
  onSelectContact: (contact: Contact) => void;
  onLogout: () => void;
}

export const ContactList: React.FC<ContactListProps> = ({
  contacts,
  searchResults,
  isSearching,
  selectedContact,
  unreadCounts,
  onSearch,
  onSelectSearchResult,
  onSelectContact,
  onLogout
}) => {
  return (
    <div className="w-80 border-r bg-white">
      <div className="p-1 border-b main">
        <div className="flex space-between space-x-1">
          <img src="/assets/img/chatLogo.png" width={135} height={41} alt="Chat Logo" />
          <button className="bg-black text-white px-2 py-1 mr-5 rounded-xl mt-4 h-10" onClick={onLogout}>
            logout
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input onChange={onSearch} placeholder="Search users" className="pl-10" />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-5rem)]">
        {isSearching ? (
          <SearchResults results={searchResults} onSelect={onSelectSearchResult} />
        ) : (
          <ContactItems
            contacts={contacts}
            selectedContact={selectedContact}
            unreadCounts={unreadCounts}
            onSelectContact={onSelectContact}
          />
        )}
      </ScrollArea>
    </div>
  );
};
