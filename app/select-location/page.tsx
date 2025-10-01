'use client';

import dynamic from 'next/dynamic';
import { type ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import type { LocationMapProps } from "../components/location-map";
import { IoArrowBack } from "react-icons/io5";
import { LuCalendarDays, LuClock3, LuLocateFixed, LuLoader, LuCloudSun, LuCloudLightning, LuCloudRain, LuCloud } from "react-icons/lu";
import { ArrowRightIcon } from "../components/icons";
import type { IconType } from "react-icons";

const LocationMap = dynamic<LocationMapProps>(
  () => import("../components/location-map").then((mod) => mod.LocationMap),
  {
    ssr: false,
    loading: () => <div className="h-[320px] w-full animate-pulse rounded-b-[36px] bg-[#dfe5ef]" />,
  }
);

const DEFAULT_LOCATION: [number, number] = [33.697643, -117.946579];

type HourlyForecast = {
  id: string;
  time: string;
  temp: string;
  summary: string;
  icon: IconType;
};

type ForecastItem = {
  id: string;
  title: string;
  temp: string;
  summary: string;
  icon: IconType;
  hourly: HourlyForecast[];
};

const FORECAST_ITEMS: ForecastItem[] = [
  {
    id: 'today',
    title: 'Today',
    temp: '27°',
    summary: 'Partly Cloudy',
    icon: LuCloudSun,
    hourly: [
      { id: 'today-13', time: '13:00', temp: '27°', summary: 'Partly Cloudy', icon: LuCloudSun },
      { id: 'today-14', time: '14:00', temp: '27°', summary: 'Partly Cloudy', icon: LuCloudSun },
      { id: 'today-15', time: '15:00', temp: '26°', summary: 'Light Rain', icon: LuCloudRain },
      { id: 'today-16', time: '16:00', temp: '26°', summary: 'Partly Cloudy', icon: LuCloudSun },
      { id: 'today-17', time: '17:00', temp: '25°', summary: 'Thunderstorm', icon: LuCloudLightning },
    ],
  },
  {
    id: 'tomorrow',
    title: 'Tomorrow',
    temp: '22°',
    summary: 'Thunderstorm',
    icon: LuCloudLightning,
    hourly: [
      { id: 'tomorrow-13', time: '13:00', temp: '22°', summary: 'Cloudy', icon: LuCloud },
      { id: 'tomorrow-14', time: '14:00', temp: '22°', summary: 'Thunderstorm', icon: LuCloudLightning },
      { id: 'tomorrow-15', time: '15:00', temp: '21°', summary: 'Thunderstorm', icon: LuCloudLightning },
      { id: 'tomorrow-16', time: '16:00', temp: '21°', summary: 'Rain', icon: LuCloudRain },
      { id: 'tomorrow-17', time: '17:00', temp: '20°', summary: 'Rain', icon: LuCloudRain },
    ],
  },
  {
    id: 'thursday',
    title: 'Thursday',
    temp: '17°',
    summary: 'Rain',
    icon: LuCloudRain,
    hourly: [
      { id: 'thursday-13', time: '13:00', temp: '17°', summary: 'Rain', icon: LuCloudRain },
      { id: 'thursday-14', time: '14:00', temp: '17°', summary: 'Rain', icon: LuCloudRain },
      { id: 'thursday-15', time: '15:00', temp: '16°', summary: 'Heavy Rain', icon: LuCloudRain },
      { id: 'thursday-16', time: '16:00', temp: '16°', summary: 'Cloudy', icon: LuCloud },
      { id: 'thursday-17', time: '17:00', temp: '15°', summary: 'Cloudy', icon: LuCloud },
    ],
  },
  {
    id: 'friday',
    title: 'Friday',
    temp: '25°',
    summary: 'Partly Cloudy',
    icon: LuCloud,
    hourly: [
      { id: 'friday-13', time: '13:00', temp: '25°', summary: 'Partly Cloudy', icon: LuCloud },
      { id: 'friday-14', time: '14:00', temp: '25°', summary: 'Partly Cloudy', icon: LuCloud },
      { id: 'friday-15', time: '15:00', temp: '24°', summary: 'Partly Cloudy', icon: LuCloud },
      { id: 'friday-16', time: '16:00', temp: '24°', summary: 'Partly Cloudy', icon: LuCloud },
      { id: 'friday-17', time: '17:00', temp: '23°', summary: 'Cloudy', icon: LuCloud },
    ],
  },
];

export default function SelectLocationPage() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState(() => {
    const today = new Date();
    return today.toTimeString().slice(0, 5);
  });
  const [position, setPosition] = useState<[number, number]>(DEFAULT_LOCATION);
  const [isLocating, setIsLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'plan' | 'overview' | 'hourly'>('plan');
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);

  const formattedCoordinates = useMemo(
    () => `${position[0].toFixed(5)}, ${position[1].toFixed(5)}`,
    [position]
  );

  const formattedDate = useMemo(() => {
    if (!selectedDate) return 'Select a date';
    const parsed = new Date(selectedDate);
    if (Number.isNaN(parsed.getTime())) return selectedDate;
    return parsed.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, [selectedDate]);

  const formattedTime = useMemo(() => {
    if (!selectedTime) return 'Select a time';
    const [hours, minutes] = selectedTime.split(':');
    if (hours === undefined || minutes === undefined) return selectedTime;
    const reference = new Date();
    reference.setHours(Number(hours), Number(minutes), 0, 0);
    return reference.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  }, [selectedTime]);

  const selectedDay = useMemo(() => {
    if (!selectedDayId) return null;
    return FORECAST_ITEMS.find((item) => item.id === selectedDayId) ?? null;
  }, [selectedDayId]);
  const SelectedDayIcon = selectedDay?.icon;

  const snapPoints = useMemo(() => [0.25, 0.65, 1], []);

  const handleLocationChange = useCallback((coords: [number, number]) => {
    setPosition(coords);
  }, []);

  const handleLocate = useCallback(() => {
    setGeoError(null);

    if (!('geolocation' in navigator)) {
      setGeoError('Geolocation is not supported on this device.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition([coords.latitude, coords.longitude]);
        setIsLocating(false);
      },
      (error) => {
        setGeoError(error.message || 'Unable to fetch your location.');
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000 * 60,
        timeout: 1000 * 20,
      }
    );
  }, []);

  const handleDateChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  }, []);

  const handleTimeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  }, []);

  const handlePredictWeather = useCallback(() => {
    setSelectedDayId(FORECAST_ITEMS[0]?.id ?? null);
    setViewMode('overview');
  }, []);

  const handleEditSchedule = useCallback(() => {
    setViewMode('plan');
  }, []);

  const handleSelectDay = useCallback((dayId: string) => {
    setSelectedDayId(dayId);
    setViewMode('hourly');
  }, []);

  const handleBackToOverview = useCallback(() => {
    setViewMode('overview');
  }, []);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#eef3fb] text-[#0b0b0b]">
      <div className="absolute inset-0">
        <LocationMap
          center={position}
          marker={position}
          onLocationChange={handleLocationChange}
          className="h-full w-full"
          scrollWheelZoom
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/30" aria-hidden="true" />

      <button
        type="button"
        aria-label="Go back"
        className="absolute left-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#1b1b1b] shadow-lg backdrop-blur transition hover:bg-white"
      >
        <IoArrowBack className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={handleLocate}
        disabled={isLocating}
        aria-label="Use current location"
        className="absolute bottom-36 right-4 z-[80] flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0b5ed7] shadow-xl transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLocating ? <LuLoader className="h-6 w-6 animate-spin" /> : <LuLocateFixed className="h-6 w-6" />}
      </button>

      <Sheet
        isOpen
        onClose={() => {}}
        detent="content"
        snapPoints={snapPoints}
        initialSnap={1}
        avoidKeyboard
        disableDismiss
      >
        <Sheet.Container className="!rounded-t-[40px] !bg-white !shadow-[0_-20px_60px_rgba(24,54,94,0.18)]">
          <Sheet.Header>
            <div className="flex justify-center py-3">
              <div className="h-1.5 w-12 rounded-full bg-[#cfd6e5]" />
            </div>
          </Sheet.Header>
          <Sheet.Content className="px-6 pb-12 pt-3">
            {viewMode === 'plan' ? (
              <div className="space-y-6">
                <header className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h1 className="text-xl font-semibold text-[#10131b]">Plan your forecast</h1>
                    <span className="rounded-full bg-[#eff3ff] px-3 py-1 text-xs font-semibold tracking-wide text-[#0b5ed7]">
                      Date &amp; time ready
                    </span>
                  </div>
                  <div className="rounded-2xl border border-[#e4e8ef] bg-gradient-to-r from-[#f9fbff] to-[#eef3ff] px-5 py-4 shadow-[0_18px_40px_rgba(15,40,94,0.08)]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8992a0]">Your Location</p>
                    <p className="mt-1 text-sm font-semibold text-[#0f172a]">{formattedCoordinates}</p>
                    <p className="text-xs text-[#7d879b]">Tap on the map or drag the pin to fine-tune this position.</p>
                  </div>
                </header>

                <section className="space-y-3">
                  <button
                    type="button"
                    onClick={handleLocate}
                    disabled={isLocating}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#0b5ed7] py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(11,126,243,0.28)] transition hover:bg-[#0a4fae] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLocating ? <LuLoader className="h-4 w-4 animate-spin" /> : <LuLocateFixed className="h-4 w-4" />}
                    {isLocating ? 'Locating you…' : 'Use Current Location'}
                  </button>
                  {geoError && <p className="text-center text-xs font-medium text-[#d14343]">{geoError}</p>}
                </section>

                <section className="space-y-4">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8992a0]">Forecast schedule</h2>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <label className="flex flex-col rounded-3xl border border-[#e5eaf4] bg-white/90 px-5 py-4 shadow-[0_12px_28px_rgba(15,40,94,0.08)] backdrop-blur">
                      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7b8498]">
                        <LuCalendarDays className="h-4 w-4 text-[#0b5ed7]" /> Date
                      </span>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="mt-3 w-full rounded-2xl border border-transparent bg-[#f5f7ff] px-4 py-3 text-sm font-semibold text-[#0f172a] shadow-inner focus:border-[#0b5ed7] focus:outline-none focus:ring-2 focus:ring-[#0b5ed7]/40"
                      />
                    </label>
                    <label className="flex flex-col rounded-3xl border border-[#e5eaf4] bg-white/90 px-5 py-4 shadow-[0_12px_28px_rgba(15,40,94,0.08)] backdrop-blur">
                      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7b8498]">
                        <LuClock3 className="h-4 w-4 text-[#0b5ed7]" /> Time
                      </span>
                      <input
                        type="time"
                        value={selectedTime}
                        onChange={handleTimeChange}
                        className="mt-3 w-full rounded-2xl border border-transparent bg-[#f5f7ff] px-4 py-3 text-sm font-semibold text-[#0f172a] shadow-inner focus:border-[#0b5ed7] focus:outline-none focus:ring-2 focus:ring-[#0b5ed7]/40"
                      />
                    </label>
                  </div>
                </section>

                <section className="rounded-3xl border border-dashed border-[#dbe3f3] bg-[#f8faff] px-5 py-4 text-sm text-[#5f6c85]">
                  <p>
                    Forecasting for <span className="font-semibold text-[#0b5ed7]">{formattedDate}</span> at{' '}
                    <span className="font-semibold text-[#0b5ed7]">{formattedTime}</span>.
                  </p>
                </section>

                <div className="flex flex-col gap-4">
                  <button
                    type="button"
                    onClick={handlePredictWeather}
                    className="rounded-[18px] bg-[#0b7ef3] py-4 text-base font-semibold text-white shadow-[0_18px_36px_rgba(11,126,243,0.35)] transition hover:bg-[#096bce]"
                  >
                    Predict Weather
                  </button>
                  <p className="text-center text-xs text-[#9aa3b5]">
                    We’ll prepare your forecast using the selected schedule and coordinates above.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {viewMode === 'overview' ? (
                  <>
                    <header className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7b8498]">4-day outlook</p>
                        <h1 className="mt-1 text-xl font-semibold text-[#10131b]">Forecast ready</h1>
                        <p className="text-xs text-[#6f7a96]">
                          Based on {formattedDate} at {formattedTime}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleEditSchedule}
                        className="rounded-full border border-[#d1d9ea] px-4 py-2 text-xs font-semibold text-[#0b5ed7] shadow-sm transition hover:bg-[#eff4ff]"
                      >
                        Adjust schedule
                      </button>
                    </header>

                    <div className="space-y-2 rounded-3xl bg-[#dff0ff] px-4 py-5 shadow-[0_20px_40px_rgba(11,94,215,0.12)]">
                      {FORECAST_ITEMS.map(({ id, title, temp, summary, icon: Icon }, index) => (
                        <div key={id}>
                          <button
                            type="button"
                            onClick={() => handleSelectDay(id)}
                            className="flex w-full items-center gap-4 rounded-2xl px-2 py-3 text-left transition hover:bg-white/70"
                          >
                            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0b5ed7] shadow-[0_8px_20px_rgba(11,94,215,0.18)]">
                              <Icon className="h-6 w-6" />
                            </span>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-[#0f172a]">{title}</p>
                              <p className="text-xs text-[#556079]">{temp} | {summary}</p>
                            </div>
                            <ArrowRightIcon className="h-5 w-5 text-[#1f2a44]" />
                          </button>
                          {index < FORECAST_ITEMS.length - 1 && <div className="mx-2 border-b border-white/60" />}
                        </div>
                      ))}
                    </div>

                    <div className="rounded-3xl border border-[#dbe3f3] bg-white/70 px-5 py-4 text-xs text-[#5f6c85] shadow-[0_16px_30px_rgba(15,40,94,0.08)]">
                      <p>
                        Tip: swipe up for more details or tap a day to view hourly breakdowns.
                      </p>
                    </div>
                  </>
                ) : selectedDay ? (
                  <>
                    <header className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0b5ed7] shadow-[0_10px_24px_rgba(11,94,215,0.2)]">
                          {SelectedDayIcon ? <SelectedDayIcon className="h-6 w-6" /> : null}
                        </span>
                        <div>
                          <h1 className="text-xl font-semibold text-[#10131b]">{selectedDay.title}</h1>
                          <p className="text-sm text-[#445068]">{selectedDay.temp} | {selectedDay.summary}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleBackToOverview}
                          className="rounded-full border border-[#d1d9ea] px-4 py-2 text-xs font-semibold text-[#0b5ed7] shadow-sm transition hover:bg-[#eff4ff]"
                        >
                          Back to days
                        </button>
                        <button
                          type="button"
                          onClick={handleEditSchedule}
                          className="rounded-full border border-[#d1d9ea] px-4 py-2 text-xs font-semibold text-[#0b5ed7] shadow-sm transition hover:bg-[#eff4ff]"
                        >
                          Adjust schedule
                        </button>
                      </div>
                    </header>

                    <div className="space-y-4 rounded-3xl bg-[#dff0ff] px-4 py-5 shadow-[0_20px_40px_rgba(11,94,215,0.12)]">
                      {selectedDay.hourly.map(({ id, time, temp, summary, icon: Icon }) => (
                        <div key={id} className="flex items-center gap-4">
                          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0b5ed7] shadow-[0_8px_18px_rgba(11,94,215,0.18)]">
                            <Icon className="h-6 w-6" />
                          </span>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#0f172a]">{temp} | {summary}</p>
                          </div>
                          <span className="flex items-center gap-2 text-xs font-semibold text-[#1f2a44]">
                            <LuClock3 className="h-4 w-4" />
                            {time}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-3xl border border-[#dbe3f3] bg-white/70 px-5 py-4 text-xs text-[#5f6c85] shadow-[0_16px_30px_rgba(15,40,94,0.08)]">
                      <p>
                        You’re viewing an hourly snapshot. Swipe to compare days or adjust the schedule anytime.
                      </p>
                    </div>
                  </>
                ) : null}
              </div>
            )}
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </div>
  );
}
