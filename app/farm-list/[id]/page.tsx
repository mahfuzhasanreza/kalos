'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo } from 'react';
import { BottomNav, type BottomNavItem } from '../../components/bottom-nav';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { LuArrowLeft, LuBot, LuCloudDrizzle, LuDroplets, LuLeaf, LuThermometerSun, LuTreePalm } from 'react-icons/lu';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import { IoSettingsOutline } from 'react-icons/io5';

const RegionSelectionMap = dynamic(
  () => import('../../components/region-selection-map').then((mod) => mod.RegionSelectionMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[220px] w-full items-center justify-center rounded-[28px] bg-[#e5efff] text-[#5a6b92]">
        Loading map…
      </div>
    ),
  }
);

type LatLngTuple = [number, number];

type FarmMetric = {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<{ className?: string }>;
};

const mockVertices: LatLngTuple[] = [
  [33.6982, -117.9472],
  [33.6974, -117.9458],
  [33.6961, -117.9462],
  [33.6967, -117.9475],
];

const metrics: FarmMetric[] = [
  {
    label: 'Temperature',
    value: '26° C',
    change: '+1.2° vs yesterday',
    trend: 'up',
    icon: LuThermometerSun,
  },
  {
    label: 'Soil Moisture',
    value: '42%',
    change: '-3% vs target',
    trend: 'down',
    icon: LuDroplets,
  },
  {
    label: 'Humidity',
    value: '68%',
    change: 'Stable for 4 hrs',
    trend: 'stable',
    icon: LuCloudDrizzle,
  },
  {
    label: 'NDVI',
    value: '0.72',
    change: '+0.05 last week',
    trend: 'up',
    icon: LuLeaf,
  },
];

const navItems: BottomNavItem[] = [
  { label: 'Weather', icon: TiWeatherPartlySunny, href: '/' },
  { label: 'Climate', icon: LuTreePalm, active: true, href: '/farm-list' },
  { label: 'Alerts', icon: HiOutlineBellAlert, href: '/alerts' },
  { label: 'Settings', icon: IoSettingsOutline },
];

const getTrendColor = (trend: FarmMetric['trend']) => {
  switch (trend) {
    case 'up':
      return 'text-[#16a34a]';
    case 'down':
      return 'text-[#dc2626]';
    default:
      return 'text-[#4b5563]';
  }
};

export default function FarmDetailsPage({ params }: { params: { id: string } }) {
  const farmName = useMemo(() => decodeURIComponent(params.id ?? 'Farm'), [params.id]);

  const metricCards = metrics.map(({ label, value, change, trend, icon: Icon }) => (
    <div
      key={label}
      className="flex flex-1 min-w-[140px] flex-col gap-3 rounded-3xl border border-[#e1e9fb] bg-white px-4 py-4 shadow-[0_16px_36px_rgba(40,76,134,0.12)]"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eff4ff] text-[#0b6ce3] shadow-[0_10px_22px_rgba(11,94,215,0.16)]">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7b87a2]">{label}</p>
        <p className="mt-1 text-lg font-semibold text-[#12203a]">{value}</p>
        <p className={`text-xs font-semibold ${getTrendColor(trend)}`}>{change}</p>
      </div>
    </div>
  ));

  return (
    <div className="min-h-[100dvh] bg-[#cbe7ff] text-[#050505]">
      <div className="mx-auto flex min-h-screen w-full max-w-[360px] flex-col px-5 py-8">
        <header className="sticky top-6 z-30 flex items-center gap-3 bg-[#cbe7ff] pb-4">
          <Link
            href="/farm-list"
            aria-label="Go back"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1d2b4a] shadow-[0_8px_20px_rgba(52,101,177,0.25)] transition hover:translate-x-[-1px]"
          >
            <LuArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-[#16223b]">{farmName}</h1>
            <p className="text-xs text-[#4a5d82]">Real-time insights & satellite-assisted metrics</p>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-6 pb-28">
          <section className="space-y-4">
            <div className="rounded-[32px] bg-white/90 p-5 shadow-[0_24px_48px_rgba(40,76,134,0.16)] backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7b85a0]">Boundary Overview</p>
                  <h2 className="mt-1 text-base font-semibold text-[#12203a]">Polygon region</h2>
                </div>
                <span className="rounded-full bg-[#eff3ff] px-3 py-1 text-xs font-semibold text-[#0b6ce3]">Area 1.6 ha</span>
              </div>

              <div className="mt-4 overflow-hidden rounded-[28px]">
                <RegionSelectionMap
                  center={mockVertices[0]}
                  vertices={mockVertices}
                  disabled
                  onAddPoint={undefined}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {metricCards}
            </div>
          </section>

          <section className="space-y-4 rounded-[32px] border border-[#dbe4f7] bg-white/90 p-5 shadow-[0_20px_42px_rgba(40,76,134,0.12)]">
            <header className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7b85a0]">Forecast snapshot</p>
                <h2 className="text-base font-semibold text-[#12203a]">Next 6 hours</h2>
              </div>
              <span className="rounded-full bg-[#effaf5] px-3 py-1 text-xs font-semibold text-[#16a34a]">Optimal irrigation window</span>
            </header>

            <ul className="grid grid-cols-2 gap-3 text-xs">
              {[1, 2, 3, 4].map((slot) => (
                <li
                  key={slot}
                  className="flex flex-col gap-2 rounded-3xl bg-[#f3f7ff] px-4 py-3 text-[#526080] shadow-inner"
                >
                  <p className="text-xs font-semibold text-[#12203a]">{12 + slot}:00</p>
                  <p>Temp 24° C</p>
                  <p>Humidity 65%</p>
                  <p>Soil moisture 43%</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[32px] border border-[#dbe4f7] bg-gradient-to-br from-[#0b7ef3] to-[#38bdf8] p-5 text-white shadow-[0_20px_42px_rgba(11,126,243,0.25)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                  <LuBot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold">AI Farm Assistant</h3>
                  <p className="text-xs text-blue-100">Get smart recommendations for your farm</p>
                </div>
              </div>
              <Link
                href={`/farm-list/${params.id}/assistant`}
                className="rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/30"
              >
                Chat now
              </Link>
            </div>
            <p className="mt-3 text-sm text-blue-50">
              Ask about irrigation timing, crop health, weather impacts, and get personalized farming advice based on your real-time data.
            </p>
          </section>
        </main>

        <Link
          href={`/farm-list/${params.id}/assistant`}
          aria-label="Open AI assistant"
          className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#0b7ef3] to-[#38bdf8] text-white shadow-[0_18px_36px_rgba(11,126,243,0.35)] transition hover:scale-[1.05]"
        >
          <LuBot className="h-6 w-6" />
        </Link>

        <BottomNav items={navItems} className="sticky bottom-4 z-40" />
      </div>
    </div>
  );
}
