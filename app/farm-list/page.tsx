'use client';

import Link from 'next/link';
import { BottomNav, type BottomNavItem } from '../components/bottom-nav';
import { FarmCard } from '../components/farm-card';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { LuArrowLeft, LuPlus, LuTreePalm } from 'react-icons/lu';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import { IoSettingsOutline } from 'react-icons/io5';

const FARMS = ['Farm 1', 'Farm 2', 'Farm 3', 'Farm 4'];

const navItems: BottomNavItem[] = [
  { label: 'Weather', icon: TiWeatherPartlySunny, href: '/' },
  { label: 'Climate', icon: LuTreePalm, active: true, href: '/farm-list' },
  { label: 'Alerts', icon: HiOutlineBellAlert, href: '/alerts' },
  { label: 'Settings', icon: IoSettingsOutline },
];

export default function FarmListPage() {
  return (
    <div className="min-h-[100dvh] bg-[#cbe7ff] text-[#050505]">
      <div className="mx-auto flex min-h-screen w-full max-w-[360px] flex-col px-5 py-8">
  <header className="sticky top-6 z-30 flex items-center gap-3 bg-[#cbe7ff] pb-4">
          <Link
            href="/"
            aria-label="Go back"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1d2b4a] shadow-[0_8px_20px_rgba(52,101,177,0.25)] transition hover:translate-x-[-1px]"
          >
            <LuArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold text-[#16223b]">Farm List</h1>
        </header>

        <main className="mt-6 flex flex-1 flex-col gap-5 pb-24">
          <section className="space-y-4">
            {FARMS.map((farm) => (
              <FarmCard key={farm} title={farm} href={`/farm-list/${encodeURIComponent(farm)}`} />
            ))}
          </section>

          <Link
            href="/farm-list/add"
            className="flex items-center justify-center gap-3 rounded-3xl border border-dashed border-[#9ab8e6] bg-white px-4 py-4 text-sm font-semibold text-[#0b6ce3] shadow-[0_12px_28px_rgba(11,108,227,0.14)] transition hover:bg-[#f3f7ff]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e4f0ff] text-[#0b6ce3]">
              <LuPlus className="h-5 w-5" />
            </span>
            Add More
          </Link>
        </main>

        <BottomNav items={navItems} className="sticky bottom-4 z-20" />
      </div>
    </div>
  );
}
