# Realtime Chat Application

This is a realtime chat application built with Next.js, TypeScript, and Tailwind CSS. It features user authentication and a chat interface powered by websockets.


## Features

* User authentication (signup/login/logout)
* User can search for others by name, email or mobile number
* User can directly message on another. 
* Realtime chat using websockets
* Modern UI built with Tailwind CSS

## Technologies Used

* Next.js
* TypeScript
* Tailwind CSS
* Websockets (using `socket.io` library)
* Zustand (for state management)

## Project Structure

The project is structured as follows:

* `app/`: Contains the Next.js application logic, including pages, components, and API routes.
* `components/`: Reusable UI components.
* `hooks/`: Custom React hooks.
* `lib/`: Utility functions and state management logic.
* `public/`: Static assets such as images.
* `types/`: TypeScript type definitions.

## Getting Started

1. Clone the repository: `git clone https://github.com/profsam97/p2pchat-front.git`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Make sure the development server for the backend app is running as well. 
This will start the development server on `http://localhost:3000`.

## Authentication

The application uses a simple authentication system. Users can sign up with their name, email, mobile number and password, and then log in to access the chat.

once the user logs out. they cant access the chat interface again unless they login back.
## Chat

The chat interface uses websockets for realtime communication. Users can send and receive messages instantly. the user can also directly message anyone by their mobile number or email


