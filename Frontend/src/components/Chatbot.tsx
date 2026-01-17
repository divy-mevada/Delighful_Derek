import React, { useState } from 'react';
import { Send } from 'lucide-react';
import type { ChatMessage } from '../types';
import { KPICard } from './KPICard';

interface ChatbotProps {
  onMessageSend?: (message: string) => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ onMessageSend }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I can help you analyze what-if scenarios for Ahmedabad. Try asking: "What if we reduce traffic by 20%?"',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    const botResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: 'Based on your scenario, here are the projected impacts:',
      timestamp: new Date(),
      visualData: {
        aqi: 140,
        traffic: 58,
        healthcare: 78,
        schools: 91,
        urbanDevelopment: 72
      }
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInput('');
    onMessageSend?.(input);
  };

  return (
    <div className="card h-96 flex flex-col">
      <h3 className="text-lg font-semibold mb-4">What-If Analysis</h3>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-3 py-2 rounded-lg ${message.type === 'user'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-800'
              }`}>
              {message.content}
              {message.visualData && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="text-xs">
                    <div>AQI: {message.visualData.aqi}</div>
                    <div>Traffic: {message.visualData.traffic}%</div>
                  </div>
                  <div className="text-xs">
                    <div>Healthcare: {message.visualData.healthcare}%</div>
                    <div>Schools: {message.visualData.schools}%</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a what-if question..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          onClick={handleSend}
          className="btn-primary flex items-center"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};