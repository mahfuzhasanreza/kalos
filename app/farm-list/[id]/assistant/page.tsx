'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { LuArrowLeft, LuBot, LuSend, LuMic, LuMicOff, LuLoader } from 'react-icons/lu';
import { TiWeatherPartlySunny } from 'react-icons/ti';

type Message = {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const SUGGESTED_QUESTIONS = [
  "What's the best time to water my crops today?",
  "How is my soil moisture trending?",
  "Should I be concerned about upcoming weather?",
  "What fertilizer recommendations do you have?",
  "How can I improve my crop yield?",
  "Is there pest risk in my area?",
];

const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  type: 'assistant',
  content: "Hello! I'm your AI farm assistant. I can help you with crop management, weather insights, irrigation planning, and more. What would you like to know about your farm?",
  timestamp: new Date(),
};

export default function FarmAssistantPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const farmName = decodeURIComponent(params.id ?? 'Farm');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(content),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('water') || lowerQuestion.includes('irrigation')) {
      return "Based on your current soil moisture at 42% and upcoming weather conditions, I recommend watering your crops in the early morning (6-8 AM) or evening (6-8 PM). The optimal irrigation window is showing for the next 6 hours. This will help maintain proper moisture levels while minimizing water loss through evaporation.";
    }
    
    if (lowerQuestion.includes('soil moisture') || lowerQuestion.includes('trending')) {
      return "Your soil moisture is currently at 42%, which is 3% below your target level. Over the past week, I've noticed a gradual decline. I recommend increasing irrigation frequency slightly and consider applying mulch to help retain moisture. The NDVI reading of 0.72 shows healthy plant growth despite the moisture deficit.";
    }
    
    if (lowerQuestion.includes('weather') || lowerQuestion.includes('forecast')) {
      return "The weather forecast shows stable conditions with temperatures around 26°C and humidity at 68%. No significant precipitation expected in the next 48 hours, so you'll need to maintain your irrigation schedule. The conditions are favorable for most farming activities.";
    }
    
    if (lowerQuestion.includes('fertilizer') || lowerQuestion.includes('nutrients')) {
      return "Based on your NDVI reading of 0.72 and current growth stage, your crops are showing healthy development. I recommend a balanced NPK fertilizer application in the next 2-3 days. Consider soil testing to determine specific nutrient needs. The recent +0.05 NDVI increase indicates good nutrient uptake.";
    }
    
    if (lowerQuestion.includes('yield') || lowerQuestion.includes('productivity')) {
      return "To improve yield, focus on: 1) Optimizing irrigation timing (current soil moisture needs attention), 2) Maintaining the positive NDVI trend, 3) Regular monitoring of temperature stress (current 26°C is good), and 4) Consider precision agriculture techniques for your 1.6 ha area.";
    }
    
    if (lowerQuestion.includes('pest') || lowerQuestion.includes('disease')) {
      return "Current weather conditions (68% humidity, 26°C) create moderate pest risk. Monitor for common issues like aphids and leaf miners. The stable humidity for 4 hours reduces fungal disease risk. I recommend weekly scouting and maintaining good air circulation in your crops.";
    }
    
    return "Thank you for your question! I'm analyzing your farm data including temperature (26°C), soil moisture (42%), humidity (68%), and NDVI (0.72) to provide the best recommendations. Could you be more specific about what aspect of farm management you'd like help with?";
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const toggleVoiceInput = () => {
    if (!isListening) {
      // Start voice recognition (placeholder - would need Web Speech API implementation)
      setIsListening(true);
      // Simulate voice input
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    } else {
      setIsListening(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-[#f8fafe] text-[#0a0a0a]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#e1e9fb] bg-white/95 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-5 py-4">
          <Link
            href={`/farm-list/${params.id}`}
            aria-label="Go back to farm details"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f6ff] text-[#0b6ce3] transition hover:bg-[#e7f0ff]"
          >
            <LuArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0b7ef3] to-[#38bdf8] text-white">
              <LuBot className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[#12203a]">AI Assistant</h1>
              <p className="text-xs text-[#5a6b8a]">{farmName} • Smart farming guidance</p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="mx-auto max-w-2xl space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-3xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-[#0b7ef3] text-white'
                    : 'bg-white border border-[#e1e9fb] text-[#12203a] shadow-[0_8px_20px_rgba(40,76,134,0.08)]'
                }`}
              >
                {message.type === 'assistant' && (
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#0b7ef3] to-[#38bdf8] text-white">
                      <LuBot className="h-3 w-3" />
                    </div>
                    <span className="text-xs font-semibold text-[#7b87a2]">AI Assistant</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`mt-2 text-xs ${message.type === 'user' ? 'text-blue-100' : 'text-[#7b87a2]'}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-3xl border border-[#e1e9fb] bg-white px-4 py-3 shadow-[0_8px_20px_rgba(40,76,134,0.08)]">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#0b7ef3] to-[#38bdf8] text-white">
                    <LuBot className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-semibold text-[#7b87a2]">AI Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <LuLoader className="h-4 w-4 animate-spin text-[#0b7ef3]" />
                  <span className="text-sm text-[#7b87a2]">Analyzing your farm data...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="border-t border-[#e1e9fb] bg-white px-5 py-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7b87a2]">
            Suggested questions
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="rounded-full border border-[#e1e9fb] bg-[#f8fafe] px-3 py-2 text-xs text-[#4a5d82] transition hover:bg-[#eff4ff] hover:border-[#d1ddf3]"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-[#e1e9fb] bg-white p-5">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-end gap-3">
            <div className="flex-1 rounded-3xl border border-[#e1e9fb] bg-[#f8fafe] px-4 py-3">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                placeholder="Ask about your farm, crops, weather, or irrigation..."
                className="w-full bg-transparent text-sm text-[#12203a] placeholder-[#7b87a2] outline-none"
                disabled={isLoading}
              />
            </div>
            
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                isListening
                  ? 'bg-[#dc2626] text-white'
                  : 'bg-[#f1f6ff] text-[#0b6ce3] hover:bg-[#e7f0ff]'
              }`}
              disabled={isLoading}
            >
              {isListening ? <LuMicOff className="h-5 w-5" /> : <LuMic className="h-5 w-5" />}
            </button>
            
            <button
              type="button"
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim() || isLoading}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0b7ef3] text-white transition hover:bg-[#096bce] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LuSend className="h-5 w-5" />
            </button>
          </div>
          
          <p className="mt-2 text-center text-xs text-[#7b87a2]">
            AI responses are based on your current farm data and weather conditions
          </p>
        </div>
      </div>
    </div>
  );
}