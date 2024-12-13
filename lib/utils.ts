import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const getDateFormat = (date : Date | string) : string => {
  if(typeof date === "string") {
    return date
    }
    const timestamp =  new Date(date).toLocaleString();
     return timestamp
   }
   