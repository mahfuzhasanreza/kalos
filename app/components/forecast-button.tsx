import Link from "next/link";
import { ArrowRightIcon } from "./icons";

type ForecastButtonProps = {
  label: string;
  onClick?: () => void;
  href?: string;
};

const baseClassName =
  "flex items-center justify-between rounded-full bg-white px-6 py-4 text-base font-semibold text-[#151515] shadow-[0_12px_26px_rgba(15,84,166,0.12)] transition-transform hover:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b6ce3]";

export const ForecastButton = ({ label, onClick, href }: ForecastButtonProps) => {
  const content = (
    <>
      <span>{label}</span>
      <ArrowRightIcon className="h-5 w-5" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClassName} aria-label={label}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClassName}>
      {content}
    </button>
  );
};
