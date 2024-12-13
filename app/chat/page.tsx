"use client";
import { ChatArea } from "@/components/chat/ChatArea";
import { ContactDetails } from "@/components/chat/ContactDetails";
import { ContactList } from "@/components/chat/ContactList";
import { useChat } from "@/hooks/useChat";

export default function ChatPage() {
  const {
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
  } = useChat();
    return (
      <div className="flex h-screen overflow-y-hidden">
        <ContactList
          contacts={contacts}
          searchResults={searchResults}
          isSearching={isSearching}
          selectedContact={selectedContact}
          unreadCounts={unreadCounts}
          onSearch={handleSearch}
          onSelectSearchResult={selectSearchResult}
          onSelectContact={handleSelectedContact}
          onLogout={logoutHandler}
        />
        <ChatArea
          selectedContact={selectedContact}
          messages={messages}
          newMessage={newMessage}
          user={user}
          contactDetails={contactDetails}
          onSendMessage={sendMessage}
          onMessageChange={(e) => setNewMessage(e.target.value)}
          onToggleDetails={() => setContactDetails((prev) => !prev)}
        />
        {selectedContact && contactDetails && (
          <ContactDetails
            contact={selectedContact}
            onClose={() => setContactDetails(false)}
          />
        )}
      </div>
    );
  }