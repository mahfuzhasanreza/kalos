import { AlertCard } from "./components/alert-card";
import { AssistantCard } from "./components/assistant-card";
import { BottomNav, type BottomNavItem } from "./components/bottom-nav";
import { ForecastButton } from "./components/forecast-button";
import { WeatherCard } from "./components/weather-card";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { LuTreePalm } from "react-icons/lu";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";

const navItems: BottomNavItem[] = [
  { label: "Weather", icon: TiWeatherPartlySunny, active: true, href: "/" },
  { label: "Climate", icon: LuTreePalm, href: "/farm-list" },
  { label: "Alerts", icon: HiOutlineBellAlert, href: "/alerts" },
  { label: "Settings", icon: IoSettingsOutline },
];

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-[#cbe7ff] text-[#050505]">
      <div className="mx-auto flex min-h-screen w-full max-w-[360px] flex-col px-5 py-8">
  <main className="flex flex-1 flex-col gap-6 pb-24">
          <WeatherCard temperature="19°" unit="Celsius" condition="Partly Cloudy" />

          <ForecastButton label="7 Days Forecast" href="/forecast" />

          <section className="space-y-5">
            <AlertCard
              title="Chances of heavy rain at 17:35"
              description="Take your umbrella with you. It may also cause flood and drain blockage. The water level may rise up to 10mm."
            />

            <AssistantCard title="Ask our AI Assistant to plan your trips" />
          </section>
        </main>

        <BottomNav items={navItems} className="sticky bottom-4 z-20" />
      </div>
    </div>
  );
}
