'use client';

import Link from 'next/link';
import { BottomNav, type BottomNavItem } from '../components/bottom-nav';
import { ArrowRightIcon } from '../components/icons';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import { IoSettingsOutline } from 'react-icons/io5';
import {
  LuArrowLeft,
  LuBot,
  LuOctagonAlert,
  LuShieldAlert,
  LuTreePalm,
  LuWaves,
  LuSettings2,
} from 'react-icons/lu';

const navItems: BottomNavItem[] = [
  { label: 'Weather', icon: TiWeatherPartlySunny, href: '/' },
  { label: 'Climate', icon: LuTreePalm, href: '/farm-list' },
  { label: 'Alerts', icon: HiOutlineBellAlert, active: true, href: '/alerts' },
  { label: 'Settings', icon: IoSettingsOutline },
];

const alerts = [
  {
    id: 'ai-weather',
    title: 'Chances of heavy rain at 17:35',
    description:
      'Take your umbrella with you. It may also cause flood and drain blockage. The water level may rise up to 10mm.',
    source: 'AI',
    sourceIcon: LuSettings2,
  },
  {
    id: 'govt-signal',
    title: 'Danger Signal - 9',
    description: 'Stay away from sea areas\nTry to stay at home\nDo not use watercraft to move',
    source: 'Govt.',
    sourceIcon: LuWaves,
  },
];

export default function AlertsPage() {
  return (
    <div className="min-h-[100dvh] bg-[#cbe7ff] text-[#050505]">
      <div className="mx-auto flex min-h-screen w-full max-w-[360px] flex-col px-5 py-8">
        <header className="sticky top-6 z-30 flex items-center gap-3 bg-[#cbe7ff] pb-4">
          <Link
            href="/"
            aria-label="Back to dashboard"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1d2b4a] shadow-[0_8px_20px_rgba(52,101,177,0.25)] transition hover:translate-x-[-1px]"
          >
            <LuArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7b87a2]">Alerts</p>
            <h1 className="text-lg font-semibold text-[#16223b]">Caution Center</h1>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-6 pb-28">
          <section className="rounded-[32px] bg-white/90 px-6 py-6 shadow-[0_20px_46px_rgba(40,76,134,0.16)] backdrop-blur">
            <div className="flex items-center gap-3 text-[#f97316]">
              <LuOctagonAlert className="h-6 w-6" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">Caution Alert</span>
            </div>

            <div className="mt-5 space-y-6 text-sm">
              {alerts.map(({ id, title, description, source, sourceIcon: SourceIcon }) => (
                <article key={id} className="rounded-3xl bg-[#f3f7ff] px-5 py-5">
                  <h2 className="text-base font-semibold text-[#121f3a]">{title}</h2>
                  <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-[#4c5a76]">{description}</p>

                  <footer className="mt-4 flex items-center justify-between text-xs font-semibold text-[#17335d]">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-[#0b5ed7] transition hover:gap-2"
                    >
                      See precautions
                      <ArrowRightIcon className="h-4 w-4" />
                    </button>
                    <span className="flex items-center gap-1 text-[#5c6b86]">
                      Source - {source}
                      <SourceIcon className="h-4 w-4" />
                    </span>
                  </footer>
                </article>
              ))}
            </div>
          </section>
        </main>

        <button
          type="button"
          aria-label="Ask AI about alerts"
          className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#0b7ef3] to-[#38bdf8] text-white shadow-[0_18px_36px_rgba(11,126,243,0.35)] transition hover:scale-[1.05]"
        >
          <LuBot className="h-6 w-6" />
        </button>

        <BottomNav items={navItems} className="sticky bottom-4 z-40" />
      </div>
    </div>
  );
}
