import Link from "next/link";
import type { ComponentType, MouseEventHandler } from "react";
import { ArrowRightIcon } from "./icons";
import { LuMapPin } from "react-icons/lu";

export type FarmCardProps = {
  title: string;
  description?: string;
  icon?: ComponentType<{ className?: string }>;
  actionIcon?: ComponentType<{ className?: string }>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
  className?: string;
};

export const FarmCard = ({
  title,
  description = "Tap to view details",
  icon: Icon = LuMapPin,
  actionIcon: ActionIcon = ArrowRightIcon,
  onClick,
  href,
  className,
}: FarmCardProps) => {
  const cardClassName = [
    "flex w-full items-center gap-4 rounded-3xl bg-white px-4 py-4 shadow-[0_16px_32px_rgba(15,84,166,0.16)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#0b6ce3] shadow-[0_12px_24px_rgba(11,108,227,0.18)]">
        <Icon className="h-6 w-6" />
      </span>
      <div className="flex flex-1 flex-col items-start">
        <span className="text-base font-semibold text-[#12203a]">{title}</span>
        <span className="text-xs text-[#5d6a82]">{description}</span>
      </div>
      <ActionIcon className="h-5 w-5 text-[#142540]" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cardClassName} aria-label={title}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cardClassName} aria-label={title}>
      {content}
    </button>
  );
};
