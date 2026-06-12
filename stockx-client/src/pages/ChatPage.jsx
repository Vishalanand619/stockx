import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import API from "../services/api";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I am the StockX AI Assistant. How can I help you with your investments today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const commonQuestions = [
    "What is a good beginner stock?",
    "Explain P/E ratio.",
    "How does the stock market work?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      
      const { data } = await API.post("/chat/ask", {
        message: userMessage,
        history
      });

      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([...newMessages, { role: "assistant", content: "Sorry, I am having trouble connecting to the server. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (question) => {
    setInput(question);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />

        <div className="flex-1 p-6 flex flex-col h-full overflow-hidden">
          
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.8)]"></span>
                StockX AI Assistant
              </h1>
              <p className="text-gray-400 text-sm mt-1">Ask questions about the stock market, investing, and more.</p>
            </div>
          </div>


          <div className="flex-1 bg-gray-950 border border-gray-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl relative">
            
            
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 scrollbar-thin scrollbar-thumb-gray-800">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[75%] rounded-2xl p-4 text-[16px] leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-green-600 to-emerald-700 text-white self-end rounded-br-sm"
                      : "bg-gray-900 border border-gray-800 text-gray-200 self-start rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="bg-gray-900 border border-gray-800 text-gray-200 self-start rounded-2xl rounded-bl-sm p-5 max-w-[75%] flex items-center gap-2 shadow-sm">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce"></span>
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>


            {messages.length === 1 && (
              <div className="px-6 pb-4 bg-transparent flex flex-wrap gap-3 absolute bottom-20 left-0 w-full justify-center">
                {commonQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuestionClick(q)}
                    className="text-sm bg-gray-900/90 backdrop-blur-md hover:bg-gray-800 text-green-400 border border-green-500/30 hover:border-green-400/60 rounded-full px-5 py-2.5 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}


            <div className="p-5 bg-gray-950 border-t border-gray-800">
              <form onSubmit={handleSend} className="flex gap-3 max-w-4xl mx-auto">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 bg-gray-900 text-gray-200 placeholder-gray-500 border border-gray-800 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-green-500/50 focus:border-green-500 transition-all text-[15px]"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:hover:bg-green-600 text-white px-6 rounded-xl transition-all flex items-center justify-center shadow-[0_0_20px_rgba(22,163,74,0.3)] active:scale-95"
                >
                  <FiSend size={22} className="mr-2" />
                  <span className="font-semibold">Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
