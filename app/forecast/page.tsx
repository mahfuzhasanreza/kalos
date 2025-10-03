'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import type { IconType } from 'react-icons';
import type { LocationMapProps } from '../components/location-map';
import {
  LuArrowLeft,
  LuCloud,
  LuCloudLightning,
  LuCloudRain,
  LuCloudSun,
  LuLocateFixed,
  LuSun,
  LuWind,
} from 'react-icons/lu';
import { HiOutlineBellAlert } from 'react-icons/hi2';

const LocationMap = dynamic<LocationMapProps>(
  () => import('../components/location-map').then((mod) => mod.LocationMap),
  {
    ssr: false,
    loading: () => <div className="h-full w-full animate-pulse bg-sky-200" />,
  }
);

type ForecastTimeline = {
  time: string;
  temperature: string;
  condition: string;
  icon: IconType;
};

type ForecastDay = {
  id: string;
  dayNumber: number;
  weekDay: string;
  dateLabel: string;
  coordinates: [number, number];
  summary: string;
  location: string;
  window: string;
  high: string;
  low: string;
  precipitation: string;
  humidity: string;
  wind: string;
  uv: string;
  tip: string;
  timeline: ForecastTimeline[];
};
const FORECAST_DAYS: ForecastDay[] = [
  {
    id: 'day-1',
    dayNumber: 1,
    weekDay: 'Tue',
    dateLabel: 'April 4, 2025',
    coordinates: [-36.84846, 174.76333],
    summary: 'Sun-drenched afternoon with a coastal breeze hugging the canopy line.',
    location: 'North Ridge Fields',
    window: '4:00 PM – 6:00 PM',
    high: '27°',
    low: '18°',
    precipitation: '12%',
    humidity: '62%',
    wind: '14 km/h NE',
    uv: '7 (High)',
    tip: 'Irrigate after 4 PM to avoid evaporation spikes and lock in overnight moisture.',
    timeline: [
      { time: '09:00', temperature: '21°', condition: 'Bright', icon: LuSun },
      { time: '12:00', temperature: '24°', condition: 'Mostly sunny', icon: LuCloudSun },
      { time: '15:00', temperature: '27°', condition: 'Breezy', icon: LuSun },
      { time: '18:00', temperature: '23°', condition: 'Golden hour', icon: LuCloudSun },
    ],
  },
  {
    id: 'day-2',
    dayNumber: 2,
    weekDay: 'Wed',
    dateLabel: 'April 5, 2025',
    coordinates: [-36.8503, 174.7807],
    summary: 'Shallow showers roll in by late afternoon with gentle marine winds.',
    location: 'Harbor Edge Terraces',
    window: '5:30 PM – 7:30 PM',
    high: '24°',
    low: '17°',
    precipitation: '38%',
    humidity: '74%',
    wind: '18 km/h NW',
    uv: '5 (Moderate)',
    tip: 'Cover young seedlings—rainfall ramps up after sunset and lingers overnight.',
    timeline: [
      { time: '09:00', temperature: '20°', condition: 'Cloud breaks', icon: LuCloudSun },
      { time: '12:00', temperature: '22°', condition: 'Humid', icon: LuCloud },
      { time: '15:00', temperature: '24°', condition: 'Light showers', icon: LuCloudRain },
      { time: '18:00', temperature: '21°', condition: 'Steady rain', icon: LuCloudRain },
    ],
  },
  {
    id: 'day-3',
    dayNumber: 3,
    weekDay: 'Thu',
    dateLabel: 'April 6, 2025',
    coordinates: [-36.845, 174.7446],
    summary: 'Cloud blanket keeps temperatures gentle while soil humidity stabilises.',
    location: 'Western Canopy Plains',
    window: '1:30 PM – 3:30 PM',
    high: '22°',
    low: '16°',
    precipitation: '18%',
    humidity: '68%',
    wind: '11 km/h W',
    uv: '4 (Moderate)',
    tip: 'Perfect window for maintenance—winds stay soft and predictable all day.',
    timeline: [
      { time: '09:00', temperature: '19°', condition: 'Overcast', icon: LuCloud },
      { time: '12:00', temperature: '21°', condition: 'Filtered light', icon: LuCloudSun },
      { time: '15:00', temperature: '22°', condition: 'Mild', icon: LuCloudSun },
      { time: '18:00', temperature: '20°', condition: 'Calm', icon: LuCloud },
    ],
  },
  {
    id: 'day-4',
    dayNumber: 4,
    weekDay: 'Fri',
    dateLabel: 'April 7, 2025',
    coordinates: [-36.8612, 174.7511],
    summary: 'Thunderstorm corridor expected after dusk—prep wind barriers early.',
    location: 'Southern Hydro Belt',
    window: '6:30 PM – 9:00 PM',
    high: '25°',
    low: '18°',
    precipitation: '55%',
    humidity: '78%',
    wind: '22 km/h N',
    uv: '6 (High)',
    tip: 'Secure equipment before 7 PM—gusts may spike during the first storm cell.',
    timeline: [
      { time: '09:00', temperature: '21°', condition: 'Sticky', icon: LuCloud },
      { time: '12:00', temperature: '24°', condition: 'Humid', icon: LuCloudSun },
      { time: '15:00', temperature: '25°', condition: 'Building clouds', icon: LuCloud },
      { time: '20:00', temperature: '22°', condition: 'Lightning risk', icon: LuCloudLightning },
    ],
  },
  {
    id: 'day-5',
    dayNumber: 5,
    weekDay: 'Sat',
    dateLabel: 'April 8, 2025',
    coordinates: [-36.8327, 174.7469],
    summary: 'Cooler marine layer with light spray near dawn—foliar feed ready.',
    location: 'Harbour Mist Orchards',
    window: '5:00 AM – 7:00 AM',
    high: '20°',
    low: '15°',
    precipitation: '30%',
    humidity: '70%',
    wind: '17 km/h SW',
    uv: '4 (Moderate)',
    tip: 'Foliar feeds shine under cloud cover—schedule before the marine layer lifts.',
    timeline: [
      { time: '06:00', temperature: '16°', condition: 'Mist', icon: LuCloud },
      { time: '10:00', temperature: '18°', condition: 'Soft light', icon: LuCloudSun },
      { time: '14:00', temperature: '20°', condition: 'Mild breeze', icon: LuWind },
      { time: '18:00', temperature: '18°', condition: 'Marine haze', icon: LuCloud },
    ],
  },
  {
    id: 'day-6',
    dayNumber: 6,
    weekDay: 'Sun',
    dateLabel: 'April 9, 2025',
    coordinates: [-36.8208, 174.775],
    summary: 'High-pressure ridge returns crystal skies—UV spikes midday.',
    location: 'Eastbank Radiance Farm',
    window: '11:00 AM – 1:00 PM',
    high: '26°',
    low: '17°',
    precipitation: '10%',
    humidity: '58%',
    wind: '12 km/h SE',
    uv: '8 (Very High)',
    tip: 'Deploy shade cloth on sensitive crops before noon to curb heat stress.',
    timeline: [
      { time: '09:00', temperature: '21°', condition: 'Crystal blue', icon: LuSun },
      { time: '12:00', temperature: '25°', condition: 'Radiant', icon: LuSun },
      { time: '15:00', temperature: '26°', condition: 'Dry heat', icon: LuSun },
      { time: '18:00', temperature: '23°', condition: 'Warm dusk', icon: LuSun },
    ],
  },
  {
    id: 'day-7',
    dayNumber: 7,
    weekDay: 'Mon',
    dateLabel: 'April 10, 2025',
    coordinates: [-36.8384, 174.7321],
    summary: 'Gentle cooling with pockets of drizzle overnight—plan early passes.',
    location: 'Western Drift Paddocks',
    window: '7:00 AM – 10:00 AM',
    high: '22°',
    low: '16°',
    precipitation: '28%',
    humidity: '72%',
    wind: '15 km/h W',
    uv: '5 (Moderate)',
    tip: 'Schedule nutrient delivery in the morning window before moisture rises again.',
    timeline: [
      { time: '09:00', temperature: '18°', condition: 'Calm', icon: LuCloud },
      { time: '12:00', temperature: '20°', condition: 'Diffuse light', icon: LuCloudSun },
      { time: '15:00', temperature: '22°', condition: 'Mild breeze', icon: LuWind },
      { time: '21:00', temperature: '19°', condition: 'Drizzle', icon: LuCloudRain },
    ],
  },
];

export default function ForecastPage() {
  const [selectedDayId, setSelectedDayId] = useState<string>(FORECAST_DAYS[0].id);
  const [mapPosition, setMapPosition] = useState<[number, number]>(FORECAST_DAYS[0].coordinates);

  const selectedDay = useMemo(
    () => FORECAST_DAYS.find((day) => day.id === selectedDayId) ?? FORECAST_DAYS[0],
    [selectedDayId]
  );

  const formattedCoordinates = useMemo(
    () => `${mapPosition[0].toFixed(4)}°, ${mapPosition[1].toFixed(4)}°`,
    [mapPosition]
  );

  const dayHighlights = useMemo(
    () => [
      { label: 'Window', value: selectedDay.window },
      { label: 'Rain', value: selectedDay.precipitation },
      { label: 'Wind', value: selectedDay.wind },
    ],
    [selectedDay]
  );

  const temperatureRange = useMemo(
    () => [
      { label: 'High', value: selectedDay.high },
      { label: 'Low', value: selectedDay.low },
    ],
    [selectedDay]
  );

  const handleSelectDay = useCallback(
    (dayId: string) => {
      const matchingDay = FORECAST_DAYS.find((day) => day.id === dayId);
      if (!matchingDay) return;
      setSelectedDayId(dayId);
      setMapPosition(matchingDay.coordinates);
    },
    [setMapPosition, setSelectedDayId]
  );

  const handleLocationChange = useCallback(
    (coords: [number, number]) => {
      setMapPosition(coords);
    },
    [setMapPosition]
  );

  const handleSnapToDay = useCallback(() => {
    setMapPosition(selectedDay.coordinates);
  }, [selectedDay]);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-sky-100 text-slate-900">
      <div className="absolute inset-0">
        <LocationMap
          center={mapPosition}
          marker={mapPosition}
          onLocationChange={handleLocationChange}
          className="h-full w-full"
          zoom={13}
          scrollWheelZoom
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-white/65 to-white/85"
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="pointer-events-auto mx-auto w-full max-w-[420px] px-5 pt-8">
          <header className="flex items-center justify-between rounded-[28px] bg-white/90 px-4 py-4 shadow-[0_16px_40px_rgba(14,122,254,0.18)] backdrop-blur">
            <Link
              href="/"
              aria-label="Back to dashboard"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sky-600 shadow-[0_14px_30px_rgba(14,122,254,0.18)] transition hover:bg-sky-50"
            >
              <LuArrowLeft className="h-5 w-5" />
            </Link>

            <div className="flex flex-col items-center text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-600">Field itinerary</p>
              <h1 className="mt-1 text-lg font-semibold text-slate-900">Auckland Corridors</h1>
              <p className="text-[10px] text-slate-600">
                {selectedDay.weekDay}, {selectedDay.dateLabel}
              </p>
            </div>

            <button
              type="button"
              aria-label="View alerts"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-orange-500 shadow-[0_14px_30px_rgba(255,133,61,0.18)] transition hover:bg-orange-50"
            >
              <HiOutlineBellAlert className="h-5 w-5" />
            </button>
          </header>

          <div className="mt-6">
            <div className="flex gap-2 overflow-x-auto rounded-full bg-white/90 p-2 shadow-[0_16px_36px_rgba(14,122,254,0.18)] backdrop-blur">
              {FORECAST_DAYS.map((day) => {
                const isSelected = day.id === selectedDay.id;
                return (
                  <button
                    key={day.id}
                    type="button"
                    onClick={() => handleSelectDay(day.id)}
                    className={`flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-full border text-center transition ${
                      isSelected
                        ? 'border-sky-500 bg-sky-600 text-white shadow-[0_16px_32px_rgba(14,122,254,0.35)]'
                        : 'border-sky-200 bg-white text-slate-700 hover:bg-sky-50'
                    }`}
                  >
                    <span className="text-lg font-semibold leading-none">{day.dayNumber}</span>
                    <span
                      className={`text-[9px] uppercase tracking-[0.28em] ${
                        isSelected ? 'text-white/80' : 'text-slate-500'
                      }`}
                    >
                      Day
                    </span>
                    <span
                      className={`text-[9px] font-medium ${
                        isSelected ? 'text-white/80' : 'text-slate-500'
                      }`}
                    >
                      {day.weekDay}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1" />
      </div>

      <div className="pointer-events-auto absolute left-6 top-[220px] z-20 flex flex-col gap-3">
        <span className="inline-flex rounded-full bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-600 shadow">
          {selectedDay.location}
        </span>
        <div className="rounded-3xl bg-white/90 px-4 py-2 text-[11px] text-slate-600 shadow backdrop-blur">
          <p className="text-xs font-semibold text-slate-700">{selectedDay.weekDay}</p>
          <p className="text-[11px] text-slate-500">{selectedDay.dateLabel}</p>
        </div>
      </div>

      <div className="pointer-events-auto absolute right-6 top-[220px] z-20 flex flex-col items-end gap-3">
        <div className="rounded-3xl bg-white px-4 py-2 text-[11px] text-slate-600 shadow">
          Active pin • {formattedCoordinates}
        </div>
        <button
          type="button"
          onClick={handleSnapToDay}
          className="flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-[11px] font-semibold text-sky-700 transition hover:bg-sky-200"
        >
          <LuLocateFixed className="h-4 w-4" /> Snap to day
        </button>
        <button
          type="button"
          onClick={handleSnapToDay}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sky-600 shadow-[0_12px_24px_rgba(14,122,254,0.2)] transition hover:bg-sky-50"
          aria-label="Recenter map"
        >
          <LuLocateFixed className="h-6 w-6" />
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-10 z-20">
        <div className="pointer-events-auto mx-auto w-full max-w-[420px] px-5">
          <div className="rounded-[36px] bg-white/90 px-6 py-6 shadow-[0_28px_60px_rgba(14,122,254,0.2)] backdrop-blur">
            <header className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-600">Summary</p>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">{selectedDay.summary}</h2>
              </div>
              <span className="rounded-full bg-sky-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
                Day {selectedDay.dayNumber}
              </span>
            </header>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
              {dayHighlights.map(({ label, value }) => (
                <div key={label} className="rounded-3xl bg-sky-50 px-3 py-3 text-slate-800">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {temperatureRange.map(({ label, value }) => (
                <div key={label} className="rounded-3xl bg-white px-4 py-3 text-center text-slate-700 shadow-[0_12px_24px_rgba(14,122,254,0.16)]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">{label}</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
