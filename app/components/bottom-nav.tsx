import Link from "next/link";
import type { ComponentType, MouseEventHandler } from "react";

export type BottomNavItem = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  active?: boolean;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

type BottomNavProps = {
  items: BottomNavItem[];
  className?: string;
};

export const BottomNav = ({ items, className }: BottomNavProps) => {
  const navClassName = [
    "mt-auto mt-8 w-full rounded-[36px] bg-white px-6 py-4 shadow-[0_18px_38px_rgba(15,84,166,0.18)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={navClassName}>
      <ul className="flex items-center justify-between">
        {items.map(({ label, icon: Icon, active, href, onClick }) => (
          <li key={label}>
            {href ? (
              <Link
                href={href}
                aria-label={label}
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                  active ? "bg-[#0b6ce3] text-white" : "text-[#1f1f1f]"
                }`}
              >
                <Icon className="h-7 w-7" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={onClick}
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                  active ? "bg-[#0b6ce3] text-white" : "text-[#1f1f1f]"
                }`}
                aria-label={label}
              >
                <Icon className="h-7 w-7" />
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
