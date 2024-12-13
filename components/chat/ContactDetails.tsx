import { Contact } from "@/lib/types/chat";

interface ContactDetailsProps {
    contact: Contact;
    onClose: () => void;
  }
  
  export const ContactDetails: React.FC<ContactDetailsProps> = ({ contact, onClose }) => {
    return (
      <div className="relative bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-72" style={{minWidth: '20%'}}>
        <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600">
          <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
            <path d="m9.33325 9.33334 13.33335 13.33336m-13.33335 0 13.33335-13.33336" 
                  stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          </svg>
        </button>
        <div className="relative">
          <div className="w-[135px] h-[135px] rounded-full text-5xl bg-blue-500 flex items-center justify-center text-white">
            {contact.name[0].toUpperCase() + contact.name[1].toUpperCase()}
          </div>
        </div>
        <div className="mt-3 text-center">
          <p className="text-gray-700 font-medium">{contact.name}</p>
          <p className="text-gray-700 font-medium">{contact.mobile}</p>
          <p className="text-gray-500 text-sm">{contact.email}</p>
        </div>
      </div>
    );
  };