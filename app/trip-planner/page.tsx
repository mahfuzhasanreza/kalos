'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { LuArrowLeft, LuBot, LuSend, LuMic, LuMicOff, LuLoader, LuMapPin, LuCalendar, LuClock, LuSun, LuCloudRain, LuUmbrella, LuPlane, LuCar, LuFootprints } from 'react-icons/lu';
import { TiWeatherPartlySunny } from 'react-icons/ti';

type Message = {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  generatedUI?: React.ReactNode;
};

type TripSuggestion = {
  destination: string;
  duration: string;
  weather: string;
  activities: string[];
  bestTime: string;
  transportation: 'plane' | 'car' | 'walk';
  weatherIcon: React.ComponentType<{ className?: string }>;
};

type WeatherForecast = {
  day: string;
  date: string;
  temp: string;
  condition: string;
  icon: React.ComponentType<{ className?: string }>;
  precipitation: string;
};

const SUGGESTED_QUESTIONS = [
  "Plan a weekend trip for sunny weather",
  "Where can I go if it's raining?",
  "Best outdoor activities for today",
  "Indoor attractions near me",
  "Beach destinations this week",
  "Mountain hiking spots",
];

const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  type: 'assistant',
  content: "Hello! I'm your AI trip planning assistant. I can help you plan perfect trips based on weather conditions, suggest destinations, activities, and create detailed itineraries. What kind of adventure are you looking for?",
  timestamp: new Date(),
};

const generateTripCard = (trip: TripSuggestion) => (
  <div className="mt-3 rounded-3xl border border-[#e1e9fb] bg-gradient-to-br from-[#f8fafe] to-[#eff4ff] p-4 shadow-[0_12px_24px_rgba(40,76,134,0.08)]">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0b6ce3] shadow-[0_8px_16px_rgba(11,108,227,0.16)]">
          <trip.weatherIcon className="h-6 w-6" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#12203a]">{trip.destination}</h4>
          <p className="text-xs text-[#5a6b8a]">{trip.duration} • {trip.weather}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-[#7b87a2]">
        {trip.transportation === 'plane' && <LuPlane className="h-4 w-4" />}
        {trip.transportation === 'car' && <LuCar className="h-4 w-4" />}
        {trip.transportation === 'walk' && <LuFootprints className="h-4 w-4" />}
      </div>
    </div>
    <div className="mt-3 flex flex-wrap gap-1">
      {trip.activities.map((activity, index) => (
        <span key={index} className="rounded-full bg-[#dbeafe] px-2 py-1 text-xs text-[#1e40af]">
          {activity}
        </span>
      ))}
    </div>
    <p className="mt-2 text-xs text-[#6b7280]">Best time: {trip.bestTime}</p>
  </div>
);

const generateWeatherForecast = (forecasts: WeatherForecast[]) => (
  <div className="mt-3 space-y-3">
    <h4 className="text-sm font-semibold text-[#12203a]">📅 7-Day Weather Outlook</h4>
    <div className="grid grid-cols-2 gap-2">
      {forecasts.map((forecast, index) => (
        <div key={index} className="rounded-2xl bg-white border border-[#e1e9fb] p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#12203a]">{forecast.day}</p>
              <p className="text-xs text-[#6b7280]">{forecast.date}</p>
            </div>
            <forecast.icon className="h-5 w-5 text-[#0b6ce3]" />
          </div>
          <div className="mt-2">
            <p className="text-sm font-semibold text-[#12203a]">{forecast.temp}</p>
            <p className="text-xs text-[#6b7280]">{forecast.condition}</p>
            <p className="text-xs text-[#3b82f6]">{forecast.precipitation}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const generateItinerary = (destination: string, days: number) => (
  <div className="mt-3 rounded-3xl border border-[#e1e9fb] bg-white p-4 shadow-[0_12px_24px_rgba(40,76,134,0.08)]">
    <h4 className="text-sm font-semibold text-[#12203a] mb-3">🗓️ {days}-Day Itinerary for {destination}</h4>
    {Array.from({ length: days }, (_, i) => i + 1).map((day) => (
      <div key={day} className="mb-4 last:mb-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0b6ce3] text-white text-xs font-semibold">
            {day}
          </div>
          <h5 className="text-sm font-semibold text-[#12203a]">Day {day}</h5>
        </div>
        <div className="ml-8 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <LuClock className="h-3 w-3 text-[#6b7280]" />
            <span className="text-[#6b7280]">09:00</span>
            <span className="text-[#12203a]">Morning activity based on weather</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <LuClock className="h-3 w-3 text-[#6b7280]" />
            <span className="text-[#6b7280]">14:00</span>
            <span className="text-[#12203a]">Afternoon exploration</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <LuClock className="h-3 w-3 text-[#6b7280]" />
            <span className="text-[#6b7280]">19:00</span>
            <span className="text-[#12203a]">Evening dining & relaxation</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default function TripPlannerAssistantPage() {
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

    // Simulate AI response with generative UI
    setTimeout(() => {
      const aiResponse = generateTripResponse(content);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const generateTripResponse = (question: string): Message => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('weekend') && lowerQuestion.includes('sunny')) {
      const trips: TripSuggestion[] = [
        {
          destination: 'Coastal Beach Resort',
          duration: '2 days',
          weather: 'Sunny 26°C',
          activities: ['Beach', 'Swimming', 'Surfing', 'Sunset viewing'],
          bestTime: 'Morning to evening',
          transportation: 'car',
          weatherIcon: LuSun,
        },
        {
          destination: 'Mountain Hiking Trail',
          duration: '2 days',
          weather: 'Clear 22°C',
          activities: ['Hiking', 'Photography', 'Camping', 'Stargazing'],
          bestTime: 'Early morning start',
          transportation: 'car',
          weatherIcon: LuSun,
        },
      ];

      return {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Perfect! Here are some fantastic weekend destinations for sunny weather. These spots will give you the best outdoor experience with great weather conditions:",
        timestamp: new Date(),
        generatedUI: (
          <div>
            {trips.map((trip, index) => (
              <div key={index}>
                {generateTripCard(trip)}
              </div>
            ))}
          </div>
        ),
      };
    }

    if (lowerQuestion.includes('rain') || lowerQuestion.includes('raining')) {
      const indoorTrips: TripSuggestion[] = [
        {
          destination: 'Museum District',
          duration: 'Half day',
          weather: 'Rainy 18°C',
          activities: ['Museums', 'Art galleries', 'Indoor cafes', 'Shopping'],
          bestTime: 'Any time',
          transportation: 'car',
          weatherIcon: LuCloudRain,
        },
        {
          destination: 'Shopping & Entertainment Complex',
          duration: 'Full day',
          weather: 'Rainy 18°C',
          activities: ['Shopping', 'Cinema', 'Indoor dining', 'Gaming'],
          bestTime: 'Afternoon to evening',
          transportation: 'car',
          weatherIcon: LuCloudRain,
        },
      ];

      return {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "No worries about the rain! Here are some excellent indoor destinations and covered activities that will keep you dry and entertained:",
        timestamp: new Date(),
        generatedUI: (
          <div>
            {indoorTrips.map((trip, index) => (
              <div key={index}>
                {generateTripCard(trip)}
              </div>
            ))}
          </div>
        ),
      };
    }

    if (lowerQuestion.includes('outdoor activities') || lowerQuestion.includes('activities for today')) {
      const forecasts: WeatherForecast[] = [
        { day: 'Today', date: 'Oct 3', temp: '19°C', condition: 'Partly Cloudy', icon: TiWeatherPartlySunny, precipitation: '10% chance' },
        { day: 'Tomorrow', date: 'Oct 4', temp: '22°C', condition: 'Sunny', icon: LuSun, precipitation: '0% chance' },
        { day: 'Sat', date: 'Oct 5', temp: '18°C', condition: 'Light Rain', icon: LuCloudRain, precipitation: '60% chance' },
        { day: 'Sun', date: 'Oct 6', temp: '21°C', condition: 'Partly Cloudy', icon: TiWeatherPartlySunny, precipitation: '20% chance' },
      ];

      return {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Based on today's partly cloudy weather at 19°C, here are perfect outdoor activities and the upcoming weather forecast to help you plan ahead:",
        timestamp: new Date(),
        generatedUI: (
          <div>
            <div className="mt-3 rounded-3xl border border-[#e1e9fb] bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] p-4">
              <h4 className="text-sm font-semibold text-[#12203a] mb-2">🌤️ Perfect for Today (19°C, Partly Cloudy)</h4>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#dcfce7] px-2 py-1 text-xs text-[#166534]">Park walks</span>
                <span className="rounded-full bg-[#dcfce7] px-2 py-1 text-xs text-[#166534]">Outdoor photography</span>
                <span className="rounded-full bg-[#dcfce7] px-2 py-1 text-xs text-[#166534]">Cycling</span>
                <span className="rounded-full bg-[#dcfce7] px-2 py-1 text-xs text-[#166534]">Picnic</span>
              </div>
            </div>
            {generateWeatherForecast(forecasts)}
          </div>
        ),
      };
    }

    if (lowerQuestion.includes('beach') || lowerQuestion.includes('beach destinations')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Here's a detailed 3-day beach vacation plan with activities scheduled around the best weather windows:",
        timestamp: new Date(),
        generatedUI: generateItinerary('Coastal Paradise Beach', 3),
      };
    }

    if (lowerQuestion.includes('mountain') || lowerQuestion.includes('hiking')) {
      const mountainTrips: TripSuggestion[] = [
        {
          destination: 'Sunrise Peak Trail',
          duration: '1 day',
          weather: 'Clear 15°C',
          activities: ['Hiking', 'Photography', 'Bird watching', 'Nature trails'],
          bestTime: '6:00 AM start',
          transportation: 'car',
          weatherIcon: LuSun,
        },
      ];

      return {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Great choice for mountain adventures! Here's a perfect hiking destination with optimal weather conditions:",
        timestamp: new Date(),
        generatedUI: (
          <div>
            {mountainTrips.map((trip, index) => (
              <div key={index}>
                {generateTripCard(trip)}
              </div>
            ))}
            {generateItinerary('Mountain Adventure', 2)}
          </div>
        ),
      };
    }

    return {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: "I'd love to help you plan the perfect trip! I can suggest destinations based on weather, create detailed itineraries, and recommend activities. What type of experience are you looking for?",
      timestamp: new Date(),
      generatedUI: (
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-[#fef3c7] p-3 text-center">
            <LuSun className="mx-auto h-6 w-6 text-[#d97706]" />
            <p className="mt-1 text-xs font-semibold text-[#92400e]">Sunny Day Trips</p>
          </div>
          <div className="rounded-2xl bg-[#dbeafe] p-3 text-center">
            <LuCloudRain className="mx-auto h-6 w-6 text-[#2563eb]" />
            <p className="mt-1 text-xs font-semibold text-[#1e40af]">Rainy Day Ideas</p>
          </div>
          <div className="rounded-2xl bg-[#dcfce7] p-3 text-center">
            <LuMapPin className="mx-auto h-6 w-6 text-[#16a34a]" />
            <p className="mt-1 text-xs font-semibold text-[#166534]">Local Adventures</p>
          </div>
          <div className="rounded-2xl bg-[#fce7f3] p-3 text-center">
            <LuCalendar className="mx-auto h-6 w-6 text-[#be185d]" />
            <p className="mt-1 text-xs font-semibold text-[#9d174d]">Weekend Getaways</p>
          </div>
        </div>
      ),
    };
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const toggleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
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
            href="/"
            aria-label="Go back to home"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f6ff] text-[#0b6ce3] transition hover:bg-[#e7f0ff]"
          >
            <LuArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0b7ef3] to-[#38bdf8] text-white">
              <LuMapPin className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[#12203a]">Trip Planner AI</h1>
              <p className="text-xs text-[#5a6b8a]">Weather-smart travel planning</p>
            </div>
          </div>
        </div>
        
        {/* Current Weather Info */}
        <div className="border-t border-[#e1e9fb] bg-[#f8fafe] px-5 py-3">
          <div className="flex items-center gap-2 text-[#0b6ce3]">
            <TiWeatherPartlySunny className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              Current Conditions
            </span>
          </div>
          <div className="mt-1 text-xs text-[#5a6b8a]">
            19°C Partly Cloudy • Perfect for outdoor activities
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
                    : 'bg-white border border-[#e1e9fb] text-[#12203a] shadow-[0_8px_20px_rgba(40,76,134,0.08)]'
                }`}
              >
                {message.type === 'assistant' && (
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#0b7ef3] to-[#38bdf8] text-white">
                      <LuMapPin className="h-3 w-3" />
                    </div>
                    <span className="text-xs font-semibold text-[#7b87a2]">Trip Planner AI</span>
                  </div>
                )}
                <div className="text-sm leading-relaxed">{message.content}</div>
                {message.generatedUI && (
                  <div className="mt-2">
                    {message.generatedUI}
                  </div>
                )}
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
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#0b7ef3] to-[#38bdf8] text-white">
                    <LuMapPin className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-semibold text-[#7b87a2]">Trip Planner AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <LuLoader className="h-4 w-4 animate-spin text-[#0b7ef3]" />
                  <span className="text-sm text-[#7b87a2]">Creating your perfect trip plan...</span>
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
            Popular trip ideas
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
                placeholder="Ask about destinations, weather, activities, or itineraries..."
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
            🌤️ Plans are optimized based on real-time weather conditions
          </p>
        </div>
      </div>
    </div>
  );
}