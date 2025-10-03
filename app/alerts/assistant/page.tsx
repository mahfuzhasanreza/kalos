'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { LuArrowLeft, LuBot, LuSend, LuMic, LuMicOff, LuLoader, LuShieldAlert, LuTriangleAlert } from 'react-icons/lu';
import { HiOutlineBellAlert } from 'react-icons/hi2';

type Message = {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  alertLevel?: 'info' | 'warning' | 'danger';
};

const SUGGESTED_QUESTIONS = [
  "What precautions should I take for heavy rain?",
  "How serious is Danger Signal 9?",
  "What should I do during flooding?",
  "Is it safe to travel today?",
  "How to prepare for storm conditions?",
  "What emergency supplies do I need?",
];

const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  type: 'assistant',
  content: "Hello! I'm your emergency alert assistant. I can help you understand current weather warnings, provide safety recommendations, and guide you through emergency preparedness. What would you like to know about the current alerts?",
  timestamp: new Date(),
};

const CURRENT_ALERTS = [
  {
    title: 'Chances of heavy rain at 17:35',
    description: 'Take your umbrella with you. It may also cause flood and drain blockage. The water level may rise up to 10mm.',
    level: 'warning' as const,
  },
  {
    title: 'Danger Signal - 9',
    description: 'Stay away from sea areas\nTry to stay at home\nDo not use watercraft to move',
    level: 'danger' as const,
  },
];

export default function AlertAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      const aiResponse = generateAlertResponse(content);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAlertResponse = (question: string): Message => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('heavy rain') || lowerQuestion.includes('rain') || lowerQuestion.includes('precaution')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "For the heavy rain alert at 17:35, here are the key precautions:\n\n🌧️ **Immediate Actions:**\n• Carry an umbrella or waterproof clothing\n• Avoid low-lying areas prone to flooding\n• Check drainage systems around your property\n\n⚠️ **Flood Prevention:**\n• Clear gutters and drains of debris\n• Move vehicles to higher ground if possible\n• Keep sandbags ready if you're in a flood-prone area\n\n📱 Stay updated with weather alerts and avoid unnecessary travel during peak rainfall.",
        timestamp: new Date(),
        alertLevel: 'warning',
      };
    }
    
    if (lowerQuestion.includes('danger signal') || lowerQuestion.includes('signal 9') || lowerQuestion.includes('serious')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Danger Signal 9 is a **SEVERE EMERGENCY** warning! This is one of the highest alert levels.\n\n🚨 **Critical Actions Required:**\n• **DO NOT** go near sea areas or beaches\n• **STAY INDOORS** - avoid all unnecessary travel\n• **NO WATERCRAFT** - boats, ships, or water vehicles are prohibited\n\n⚡ **Additional Precautions:**\n• Secure all outdoor items that could become projectiles\n• Stock up on emergency supplies (water, food, flashlights)\n• Charge all electronic devices\n• Stay tuned to official emergency broadcasts\n\nThis level indicates life-threatening conditions. Take this warning very seriously!",
        timestamp: new Date(),
        alertLevel: 'danger',
      };
    }
    
    if (lowerQuestion.includes('flood') || lowerQuestion.includes('flooding')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "During flooding conditions, follow these safety protocols:\n\n🚫 **Never Do:**\n• Walk or drive through flood water\n• Touch electrical equipment if you're wet\n• Ignore evacuation orders\n\n✅ **Safety Actions:**\n• Move to higher ground immediately\n• Turn off electricity at main switches if safe to do so\n• Avoid storm drains and sewers\n• Keep emergency kit ready (food, water, medications)\n\n📞 **Emergency Contacts:**\n• Keep emergency numbers accessible\n• Monitor local emergency services updates\n• Have a family communication plan ready",
        timestamp: new Date(),
        alertLevel: 'warning',
      };
    }
    
    if (lowerQuestion.includes('travel') || lowerQuestion.includes('safe')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Given the current Danger Signal 9 and heavy rain warnings:\n\n🚫 **Travel Status: NOT RECOMMENDED**\n\n🚗 **If you must travel:**\n• Avoid coastal routes completely\n• Check road conditions before leaving\n• Keep emergency supplies in your vehicle\n• Share your route with someone\n• Turn back if conditions worsen\n\n🏠 **Best Advice:** Stay home and wait for conditions to improve. Your safety is more important than any appointment or commitment.\n\n📱 Monitor official traffic and weather updates continuously.",
        timestamp: new Date(),
        alertLevel: 'danger',
      };
    }
    
    if (lowerQuestion.includes('storm') || lowerQuestion.includes('prepare')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Storm preparation checklist:\n\n🎒 **Emergency Kit:**\n• 3-day supply of water (1 gallon per person per day)\n• Non-perishable food for 3 days\n• Battery-powered or hand crank radio\n• Flashlight and extra batteries\n• First aid kit and medications\n\n🏠 **Home Preparation:**\n• Secure outdoor furniture and decorations\n• Trim tree branches near your home\n• Check and clear gutters\n• Know your evacuation route\n\n📋 **Important Documents:**\n• Keep copies of ID, insurance papers in waterproof container\n• Take photos of property for insurance purposes",
        timestamp: new Date(),
        alertLevel: 'info',
      };
    }
    
    if (lowerQuestion.includes('emergency supplies') || lowerQuestion.includes('supplies')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Essential emergency supplies for current alerts:\n\n💧 **Water & Food:**\n• 1 gallon water per person per day (3-day minimum)\n• Canned foods, energy bars, dried fruits\n• Can opener, plastic utensils\n\n🔦 **Power & Communication:**\n• Flashlights and lanterns\n• Extra batteries\n• Portable phone chargers/power banks\n• Battery or solar-powered radio\n\n🏥 **Safety & Health:**\n• First aid kit\n• Prescription medications\n• Hand sanitizer, masks\n• Whistle for signaling help\n• Local maps (non-electronic)\n\n💰 **Cash** - ATMs may not work during outages",
        timestamp: new Date(),
        alertLevel: 'info',
      };
    }
    
    return {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: "I'm here to help with emergency alerts and safety guidance. Currently monitoring:\n\n⚠️ Heavy rain warning at 17:35\n🚨 Danger Signal 9 (SEVERE)\n\nI can provide specific guidance on:\n• Safety precautions for current alerts\n• Emergency preparedness\n• Evacuation procedures\n• Travel safety\n• Storm preparation\n\nWhat specific aspect would you like help with?",
      timestamp: new Date(),
      alertLevel: 'info',
    };
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const toggleVoiceInput = () => {
    if (!isListening) {
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

  const getAlertStyles = (level?: string) => {
    switch (level) {
      case 'danger':
        return 'border-l-4 border-l-[#dc2626] bg-red-50';
      case 'warning':
        return 'border-l-4 border-l-[#f59e0b] bg-yellow-50';
      case 'info':
        return 'border-l-4 border-l-[#0b7ef3] bg-blue-50';
      default:
        return '';
    }
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-[#f8fafe] text-[#0a0a0a]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#e1e9fb] bg-white/95 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-5 py-4">
          <Link
            href="/alerts"
            aria-label="Go back to alerts"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f6ff] text-[#0b6ce3] transition hover:bg-[#e7f0ff]"
          >
            <LuArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#f59e0b] to-[#dc2626] text-white">
              <LuShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[#12203a]">Alert Assistant</h1>
              <p className="text-xs text-[#5a6b8a]">Emergency guidance & safety support</p>
            </div>
          </div>
        </div>
        
        {/* Current Alerts Summary */}
        <div className="border-t border-[#e1e9fb] bg-[#fef2f2] px-5 py-3">
          <div className="flex items-center gap-2 text-[#dc2626]">
            <LuTriangleAlert className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              {CURRENT_ALERTS.length} Active Alert{CURRENT_ALERTS.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="mt-1 text-xs text-[#7f1d1d]">
            Danger Signal 9 • Heavy Rain Warning
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
                className={`max-w-[85%] rounded-3xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-[#0b7ef3] text-white'
                    : `bg-white border border-[#e1e9fb] text-[#12203a] shadow-[0_8px_20px_rgba(40,76,134,0.08)] ${getAlertStyles(message.alertLevel)}`
                }`}
              >
                {message.type === 'assistant' && (
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#f59e0b] to-[#dc2626] text-white">
                      <LuShieldAlert className="h-3 w-3" />
                    </div>
                    <span className="text-xs font-semibold text-[#7b87a2]">Alert Assistant</span>
                  </div>
                )}
                <div className="text-sm leading-relaxed whitespace-pre-line">{message.content}</div>
                <p className={`mt-2 text-xs ${message.type === 'user' ? 'text-blue-100' : 'text-[#7b87a2]'}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-3xl border border-[#e1e9fb] bg-white px-4 py-3 shadow-[0_8px_20px_rgba(40,76,134,0.08)]">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#f59e0b] to-[#dc2626] text-white">
                    <LuShieldAlert className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-semibold text-[#7b87a2]">Alert Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <LuLoader className="h-4 w-4 animate-spin text-[#f59e0b]" />
                  <span className="text-sm text-[#7b87a2]">Analyzing emergency conditions...</span>
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
            Emergency assistance topics
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
                placeholder="Ask about emergency procedures, safety tips, or current alerts..."
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
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f59e0b] text-white transition hover:bg-[#d97706] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LuSend className="h-5 w-5" />
            </button>
          </div>
          
          <p className="mt-2 text-center text-xs text-[#7b87a2]">
            🚨 For immediate emergencies, call your local emergency services
          </p>
        </div>
      </div>
    </div>
  );
}