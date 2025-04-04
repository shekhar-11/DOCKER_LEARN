import React, { useState, useRef, useEffect } from 'react';
import main from '../utility/gemini';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    // Simulate API call delay (replace with actual API call)
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: main(input),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsProcessing(false);
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header*/}
      <div className="bg-white shadow-sm py-4 px-6 border-b">
        <h1 className="text-xl font-semibold text-gray-800">Chat Bot</h1>
      </div>
       
      {/* Chat container */}
      <div className="flex-1 flex justify-center items-stretch bg-black">
        <div className="w-11/12 max-w-4xl bg-gray-800  p-4 rounded-lg shadow-lg h-full flex flex-col">
          <div className="overflow-y-auto flex-1 space-y-2" style={{ maxHeight: 'calc(100% - 80px)', overflowY: 'hidden' }}>
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <p className="text-lg mb-2">Start a conversation</p>
                  <p className="text-sm">Type a message below to begin chatting</p>
                </div>
              </div>
            ) : (
              messages.map(message => (
                <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-md px-4 py-3 rounded-lg inline-block break-words ${
                    message.sender === 'user' 
                      ? 'bg-green-600 text-white rounded-br-none ml-2' 
                      : 'bg-gray-700  text-white rounded-bl-none shadow mr-2'
                  }`}
                >
                  <p className="break-words">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
              
              ))
            )}
            
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-lg rounded-bl-none shadow">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="bg-white border-t rounded-xl p-4">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className=" flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mx-2"
              />
              <button
                type="submit"
                disabled={isProcessing || !input.trim()}
                className={`rounded-full p-2 ${
                  isProcessing || !input.trim() 
                    ? 'bg-gray-300 text-gray-500' 
                    : 'bg-green-600 text-white hover:bg-blue-600'
                } transition-colors`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
