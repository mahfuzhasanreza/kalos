# 🌤️ NASA Space App - Frontend

A modern weather forecasting and agricultural management application built with Next.js, featuring AI-powered assistants and real-time weather data integration.

## 🚀 Features

### Core Weather Features
- **📍 Location-Based Forecasting** - Interactive map for location selection
- **🌦️ 7-Day Weather Outlook** - Detailed hourly and daily forecasts  
- **⚠️ Emergency Alerts** - Real-time weather warnings and safety notifications
- **🌡️ Real-Time Conditions** - Current temperature, humidity, and atmospheric data

### AI-Powered Assistants
- **🤖 Trip Planner AI** - Weather-smart travel recommendations with generative UI
- **🚨 Alert Assistant** - Emergency guidance and safety protocols
- **🚜 Farm Assistant** - Agricultural insights and crop management advice

### Agricultural Management
- **🌱 Farm Dashboard** - Multi-farm monitoring and management
- **📊 Satellite Metrics** - NDVI, soil moisture, and crop health data
- **💧 Irrigation Planning** - Smart watering recommendations
- **📈 Performance Analytics** - Yield optimization and trend analysis

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Maps:** Leaflet with React-Leaflet
- **UI Components:** Custom components with React Modal Sheet
- **Icons:** Lucide React & React Icons
- **State Management:** React Hooks (useState, useCallback, useMemo)

## 📁 Project Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── alerts/                   # Weather alerts & emergency info
│   │   ├── assistant/           # AI alert guidance system
│   │   └── page.tsx
│   ├── farm-list/               # Agricultural management
│   │   ├── [id]/               # Dynamic farm details
│   │   │   ├── assistant/      # AI farm advisor
│   │   │   └── page.tsx
│   │   ├── add/                # Add new farm
│   │   └── page.tsx
│   ├── forecast/               # Weather forecast views
│   ├── select-location/        # Interactive location picker
│   ├── trip-planner/           # AI trip planning assistant
│   ├── components/             # Reusable UI components
│   │   ├── alert-card.tsx
│   │   ├── assistant-card.tsx
│   │   ├── bottom-nav.tsx
│   │   ├── farm-card.tsx
│   │   ├── forecast-button.tsx
│   │   ├── location-map.tsx
│   │   ├── region-selection-map.tsx
│   │   └── weather-card.tsx
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── public/                     # Static assets
│   └── images/
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS config
├── tsconfig.json              # TypeScript config
└── package.json               # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mahfuzhasanreza/kalos-client.git
   cd kalos-client/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📱 Application Pages

### 🏠 Home Dashboard
- Current weather conditions (19°C Partly Cloudy)
- Quick forecast access
- Emergency alerts summary
- AI assistant integration

### 🗺️ Location Selection (`/select-location`)
- Interactive map with location picker
- Real-time geolocation support
- Weather prediction for selected coordinates
- 4-day forecast overview with hourly breakdowns

### ⚠️ Alerts Center (`/alerts`)
- Emergency weather warnings
- Government danger signals
- Safety recommendations
- AI emergency assistant access

### 🚜 Farm Management (`/farm-list`)
- Multi-farm dashboard
- Real-time agricultural metrics
- Satellite-based crop monitoring
- Individual farm detailed views

### 🤖 AI Assistants

#### Trip Planner (`/trip-planner`)
- Weather-based destination suggestions
- Generative UI for trip recommendations
- Interactive itinerary creation
- Activity suggestions based on conditions

#### Alert Assistant (`/alerts/assistant`)
- Emergency response guidance
- Safety protocol recommendations
- Real-time alert analysis
- Step-by-step safety procedures

#### Farm Assistant (`/farm-list/[id]/assistant`)
- Crop management advice
- Irrigation optimization
- Yield improvement suggestions
- Pest and disease prevention

## 🎨 UI/UX Features

### Design System
- **Color Palette:** Blue-based theme with weather-appropriate accents
- **Typography:** Clean, modern font hierarchy
- **Icons:** Consistent icon system using Lucide React
- **Animations:** Smooth transitions and hover effects

### Responsive Design
- Mobile-first approach
- Optimized for 360px mobile viewport
- Touch-friendly interface elements
- Adaptive layouts for different screen sizes

### Interactive Elements
- **Bottom Navigation** - Persistent navigation across pages
- **Modal Sheets** - Smooth slide-up panels for detailed views
- **Dynamic Maps** - Interactive location selection and region mapping
- **AI Chat Interface** - Real-time conversation with assistants

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
# Add your environment variables here
NEXT_PUBLIC_MAP_API_KEY=your_map_api_key
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
```

### Tailwind Configuration
Custom configuration in `tailwind.config.ts` includes:
- Custom color palette
- Extended spacing utilities
- Custom shadow definitions
- Animation utilities

## 📦 Key Dependencies

```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.3.0",
  "leaflet": "^1.9.0",
  "react-leaflet": "^4.2.0",
  "react-modal-sheet": "^2.0.0",
  "react-icons": "^4.11.0",
  "lucide-react": "^0.290.0"
}
```

## 🚀 Build & Deployment

### Development
```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Production Build
```bash
npm run build
npm run start
```

## 🌟 Key Features Breakdown

### Weather Integration
- **Real-time Data** - Current conditions and forecasts
- **Location Intelligence** - GPS and manual location selection  
- **Multi-day Forecasting** - 7-day outlook with hourly details
- **Emergency Alerts** - Government warnings and safety alerts

### AI Assistants
- **Contextual Responses** - Weather and location-aware recommendations
- **Generative UI** - Dynamic component generation based on queries
- **Voice Input Support** - Hands-free interaction capabilities
- **Smart Suggestions** - Contextual quick-start options

### Agricultural Features
- **Satellite Integration** - NDVI and crop health monitoring
- **Multi-farm Management** - Dashboard for multiple agricultural sites
- **Irrigation Optimization** - Smart watering recommendations
- **Performance Analytics** - Yield tracking and improvement suggestions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the NASA Space Apps Challenge 2025.

## 🔗 Related

- **Backend Repository:** [NASA Space App Backend](https://github.com/mahfuzhasanreza/kalos-server)
- **NASA Space Apps Challenge:** [Official Website](https://www.spaceappschallenge.org/)

---

Built with ❤️ for NASA Space Apps Challenge 2025 🚀
