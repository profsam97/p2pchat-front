import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Contact, User } from '@/lib/types/chat';
import { getDateFormat } from "@/lib/utils";

interface SearchResultsProps {
  results: User[];
  onSelect: (user: User) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelect }) => {
  if (results.length === 0) {
    return <div className="p-4 text-center text-gray-500">No users found</div>;
  }

  return (
    <>
      {results.map((user) => (
        <div
          key={user.id}
          className="p-4 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(user)}
        >
          <div className="flex items-center space-x-3">
            <Avatar>
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {user.name[0].toUpperCase() + user.name[1].toUpperCase()}
              </div>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.mobile}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

interface ContactItemsProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  unreadCounts: Record<string, number>;
  onSelectContact: (contact: Contact) => void;
}

export const ContactItems: React.FC<ContactItemsProps> = ({
  contacts,
  selectedContact,
  unreadCounts,
  onSelectContact,
}) => {
  return (
    <>
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className={`p-4 hover:bg-gray-100 cursor-pointer ${
            selectedContact?.id === contact.id ? "bg-gray-100" : ""
          }`}
          onClick={() => onSelectContact(contact)}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar>
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  {contact.name[0].toUpperCase() + contact.name[1].toUpperCase()}
                </div>
              </Avatar>
              {contact.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{contact.name}</h3>
                <div>
                  {contact.timestamp && (
                    <span className="text-xs text-gray-500">
                      {getDateFormat(contact.timestamp)}
                    </span>
                  )}
                  {unreadCounts[contact.id] > 0 && (
                    <span className="absolute top-10 right-10 bg-[#3758F9] p-1 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {unreadCounts[contact.id] || ''}
                    </span>
                  )}
                </div>
              </div>
              {contact.lastMessage && (
                <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};