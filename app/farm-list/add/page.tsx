'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { BottomNav, type BottomNavItem } from '../../components/bottom-nav';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { LuArrowLeft, LuCheck, LuLoader, LuLocateFixed, LuPlus, LuTrash2, LuTreePalm, LuUndo2 } from 'react-icons/lu';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import { IoSettingsOutline } from 'react-icons/io5';

const RegionSelectionMap = dynamic(
  () => import('../../components/region-selection-map').then((mod) => mod.RegionSelectionMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[320px] w-full items-center justify-center rounded-[32px] bg-[#e0ebff] text-[#4a5d82]">
        Loading map…
      </div>
    ),
  }
);

type LatLngTuple = [number, number];

const DEFAULT_CENTER: LatLngTuple = [33.697643, -117.946579];

const navItems: BottomNavItem[] = [
  { label: 'Weather', icon: TiWeatherPartlySunny, href: '/' },
  { label: 'Climate', icon: LuTreePalm, active: true, href: '/farm-list' },
  { label: 'Alerts', icon: HiOutlineBellAlert, href: '/alerts' },
  { label: 'Settings', icon: IoSettingsOutline },
];

const EARTH_RADIUS = 6_371_000; // meters
const toRadians = (value: number) => (value * Math.PI) / 180;

const computeAreaSqMeters = (points: LatLngTuple[]) => {
  if (points.length < 3) return 0;
  const meanLatRad = toRadians(points.reduce((sum, [lat]) => sum + lat, 0) / points.length);

  const cartesian = points.map(([lat, lng]) => {
    const phi = toRadians(lat);
    const lambda = toRadians(lng);
    return {
      x: EARTH_RADIUS * lambda * Math.cos(meanLatRad),
      y: EARTH_RADIUS * phi,
    };
  });

  let sum = 0;
  for (let i = 0; i < cartesian.length; i += 1) {
    const current = cartesian[i];
    const next = cartesian[(i + 1) % cartesian.length];
    sum += current.x * next.y - next.x * current.y;
  }

  return Math.abs(sum) / 2;
};

export default function AddFarmPage() {
  const [farmName, setFarmName] = useState('');
  const [center, setCenter] = useState<LatLngTuple>(DEFAULT_CENTER);
  const [currentLocation, setCurrentLocation] = useState<LatLngTuple | null>(null);
  const [vertices, setVertices] = useState<LatLngTuple[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const canComplete = vertices.length >= 3;
  const areaSqMeters = useMemo(() => (isComplete ? computeAreaSqMeters(vertices) : 0), [isComplete, vertices]);
  const areaDisplay = useMemo(() => {
    if (areaSqMeters === 0) return '—';
    if (areaSqMeters >= 1000000) {
      return `${(areaSqMeters / 1_000_000).toFixed(2)} km²`;
    }
    return `${areaSqMeters.toFixed(0)} m²`;
  }, [areaSqMeters]);

  const handleAddPoint = useCallback(
    (point: LatLngTuple) => {
      setVertices((prev) => [...prev, point]);
      setSaved(false);
    },
    []
  );

  const handleLocate = useCallback(() => {
    setGeoError(null);

    if (!('geolocation' in navigator)) {
      setGeoError('Geolocation is not supported on this device.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const nextLocation: LatLngTuple = [coords.latitude, coords.longitude];
        setCenter(nextLocation);
        setCurrentLocation(nextLocation);
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

  const handleUndo = useCallback(() => {
    setVertices((prev) => {
      if (prev.length === 0) return prev;
      const next = prev.slice(0, -1);
      return next;
    });
    setIsComplete(false);
    setSaved(false);
  }, []);

  const handleClear = useCallback(() => {
    setVertices([]);
    setIsComplete(false);
    setSaved(false);
  }, []);

  const handleComplete = useCallback(() => {
    if (!canComplete) return;
    setIsComplete(true);
  }, [canComplete]);

  const handleSave = useCallback(() => {
    if (!isComplete || !farmName.trim()) return;
    setSaved(true);
  }, [farmName, isComplete]);

  const footerMessage = saved
    ? 'Farm region saved locally. You can sync with the dashboard later.'
    : 'Complete the polygon and provide a name to save your farm region.';

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
            <h1 className="text-lg font-semibold text-[#16223b]">Add Farm</h1>
            <p className="text-xs text-[#4a5d82]">Tap the map to outline your farm boundary.</p>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-6 pb-24">
          <section className="space-y-4">
            <div className="rounded-[32px] bg-white/80 p-5 shadow-[0_18px_44px_rgba(48,86,153,0.18)] backdrop-blur">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7b85a0]">Farm name</span>
                <input
                  type="text"
                  value={farmName}
                  onChange={(event) => setFarmName(event.target.value)}
                  placeholder="E.g. Riverside Orchard"
                  className="rounded-2xl border border-transparent bg-[#eff4ff] px-4 py-3 text-sm font-semibold text-[#12203a] shadow-inner focus:border-[#0b5ed7] focus:outline-none focus:ring-2 focus:ring-[#0b5ed7]/40"
                />
              </label>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-[#4c5c78]">
                <div className="rounded-2xl border border-[#d4e0f7] bg-[#f2f6ff] px-4 py-3">
                  <p className="font-semibold text-[#0b5ed7]">Vertices</p>
                  <p>{vertices.length}</p>
                </div>
                <div className="rounded-2xl border border-[#d4e0f7] bg-[#f2f6ff] px-4 py-3">
                  <p className="font-semibold text-[#0b5ed7]">Area</p>
                  <p>{areaDisplay}</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <RegionSelectionMap
                center={center}
                vertices={vertices}
                onAddPoint={isComplete ? undefined : handleAddPoint}
                disabled={isComplete}
                currentLocation={currentLocation}
              />

              <button
                type="button"
                onClick={handleLocate}
                disabled={isLocating}
                className="absolute bottom-4 right-4 z-[1000] flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0b5ed7] shadow-[0_14px_28px_rgba(11,94,215,0.18)] transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-70"
                aria-label="Use current location"
              >
                {isLocating ? <LuLoader className="h-5 w-5 animate-spin" /> : <LuLocateFixed className="h-5 w-5" />}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 rounded-3xl bg-white/95 px-4 py-4 text-xs text-[#516082] shadow-[0_14px_38px_rgba(40,76,134,0.16)]">
              <span className="flex items-center gap-2 font-semibold text-[#0b5ed7]">
                <LuPlus className="h-4 w-4" />
                Tap map to add points
              </span>
              <span className="flex items-center gap-2">
                <LuLocateFixed className="h-4 w-4" /> Center on your location
              </span>
              <span className="flex items-center gap-2">
                <LuUndo2 className="h-4 w-4" /> Undo last point
              </span>
              <span className="flex items-center gap-2">
                <LuTrash2 className="h-4 w-4" /> Clear selection
              </span>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleUndo}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#c8d7f2] bg-white px-4 py-3 text-xs font-semibold text-[#0b5ed7] shadow-[0_10px_24px_rgba(11,94,215,0.12)] transition hover:bg-[#f3f6ff]"
                disabled={vertices.length === 0}
              >
                <LuUndo2 className="h-4 w-4" />
                Undo
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#f2c7d0] bg-white px-4 py-3 text-xs font-semibold text-[#d14343] shadow-[0_10px_24px_rgba(209,67,67,0.12)] transition hover:bg-[#fff1f1]"
                disabled={vertices.length === 0}
              >
                <LuTrash2 className="h-4 w-4" />
                Clear
              </button>
            </div>

            <button
              type="button"
              onClick={handleComplete}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0b7ef3] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(11,126,243,0.3)] transition hover:bg-[#096bce] disabled:opacity-50"
              disabled={!canComplete || isComplete}
            >
              <LuCheck className="h-5 w-5" />
              {isComplete ? 'Selection locked' : 'Complete selection'}
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#10b981] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(16,185,129,0.3)] transition hover:bg-[#0e9d6c] disabled:opacity-50"
              disabled={!isComplete || !farmName.trim()}
            >
              Save farm
            </button>
          </section>

          <section className="space-y-2 rounded-3xl border border-[#d0dcf3] bg-white/90 px-5 py-4 text-xs text-[#526080] shadow-[0_16px_32px_rgba(49,85,150,0.12)]">
            <p className="font-semibold text-[#0b5ed7]">Coordinates</p>
            {vertices.length === 0 ? (
              <p>No points selected yet.</p>
            ) : (
              <ul className="space-y-1">
                {vertices.map(([lat, lng], index) => (
                  <li key={`${lat}-${lng}-${index}`} className="flex justify-between gap-3">
                    <span className="font-semibold text-[#0f1f3d]">Point {index + 1}</span>
                    <span>{lat.toFixed(5)}, {lng.toFixed(5)}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <p className="rounded-3xl bg-white/80 px-5 py-4 text-center text-xs text-[#5c6b86] shadow-[0_12px_28px_rgba(49,85,150,0.12)]">
            {footerMessage}
          </p>

          {geoError && (
            <p className="rounded-3xl border border-[#f2c7d0] bg-[#fff1f1] px-5 py-3 text-center text-xs font-semibold text-[#d14343]">
              {geoError}
            </p>
          )}
        </main>

        <BottomNav items={navItems} className="sticky bottom-4 z-20" />
      </div>
    </div>
  );
}
