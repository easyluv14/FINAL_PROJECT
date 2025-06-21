// components/ChatBox.js
import { useState, useEffect, useRef } from "react";
import { MessageSquare, X } from "lucide-react";

export default function ChatBox({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hello! How may I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(1);
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    if (step === 1) {
      setStep(2);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "🤖 Please hold on for a few minutes..." },
        ]);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "👨‍💼 Our customer representative will be with you shortly.",
            },
          ]);
        }, 2000);
      }, 3000);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <>
      {/* Transparent blocker to prevent interactions outside */}
      <div className="fixed inset-0 z-40 pointer-events-auto" />

      {/* Chat Box: anchored to bottom-right of viewport */}
      <div className="fixed bottom-5 right-5 z-50 w-80 md:w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} />
            <span className="font-semibold">Customer Support</span>
          </div>
          <button onClick={onClose} className="hover:text-red-200">
            <X size={18} />
          </button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 text-sm bg-gray-50 custom-scroll">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-xl ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center border-t border-gray-200 px-3 py-2 gap-2 bg-white rounded-b-2xl">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
