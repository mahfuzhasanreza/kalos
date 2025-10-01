import { CloudSunIcon } from "./icons";

type WeatherCardProps = {
  temperature: string;
  unit: string;
  condition: string;
};

export const WeatherCard = ({ temperature, unit, condition }: WeatherCardProps) => (
  <section className="flex items-center gap-5 rounded-[32px] bg-white/60 px-6 py-6 shadow-[0_16px_32px_rgba(15,84,166,0.12)] backdrop-blur">
    <CloudSunIcon className="h-16 w-16" />
    <span className="h-16 w-px bg-[#050505]/30" aria-hidden="true"></span>
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-3">
        <span className="text-5xl font-bold leading-none">{temperature}</span>
        <span className="text-2xl font-semibold leading-none">{unit}</span>
      </div>
      <p className="text-lg font-medium text-[#1a1a1a]">{condition}</p>
    </div>
  </section>
);
