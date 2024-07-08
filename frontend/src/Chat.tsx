// // Chat.tsx
// import React, { useState } from "react";
// import axios from "axios";

// const Chat: React.FC = () => {
//   const [messages, setMessages] = useState<{ text: string; user: boolean }[]>(
//     []
//   );
//   const [input, setInput] = useState<string>("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (input.trim() === "") return;

//     const newMessage = { text: input, user: true };
//     setMessages([...messages, newMessage]);
//     setInput("");

//     try {
//       const response = await axios.post("/query", { message: input });
//       const botMessage = { text: response.data.response, user: false };
//       setMessages([...messages, newMessage, botMessage]);
//     } catch (error) {
//       console.error("Error communicating with Dialogflow:", error);
//       const errorMessage = {
//         text: "Sorry, something went wrong. Please try again later.",
//         user: false,
//       };
//       setMessages([...messages, newMessage, errorMessage]);
//     }
//   };

//   return (
//     <div>
//       <div className="chat-window">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={msg.user ? "user-message" : "bot-message"}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chat;

// Chat.tsx
import React, { useState } from "react";
import axios from "axios";
import "./chat.css"; // Import the CSS file for styles

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; user: boolean }[]>(
    []
  );
  const [input, setInput] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessage = { text: input, user: true };
    setMessages([...messages, newMessage]);
    setInput("");

    try {
      const response = await axios.post("/query", { query: input });
      console.log(response);
      const botMessage = { text: response.data.fulfillmentText, user: false };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error communicating with Dialogflow:", error);
      const errorMessage = {
        text: "Sorry, something went wrong. Please try again later.",
        user: false,
      };
      setMessages((prevMessages) => [
        ...prevMessages,
        newMessage,
        errorMessage,
      ]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.user ? "user-message" : "bot-message"}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button type="submit" className="chat-submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
