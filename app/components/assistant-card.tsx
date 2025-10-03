import Link from "next/link";
import { ArrowRightIcon, ChipIcon } from "./icons";

type AssistantCardProps = {
  title: string;
  href?: string;
};

export const AssistantCard = ({ title, href = "/trip-planner" }: AssistantCardProps) => (
  <Link href={href}>
    <article className="flex items-center justify-between rounded-[32px] bg-white px-6 py-6 text-[#0f0f0f] shadow-[0_16px_30px_rgba(15,84,166,0.12)] transition hover:shadow-[0_20px_40px_rgba(15,84,166,0.16)] hover:scale-[1.02]">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9f3ff] text-[#0b6ce3]">
          <ChipIcon className="h-7 w-7" />
        </div>
        <p className="max-w-[172px] text-base font-semibold leading-snug">{title}</p>
      </div>
      <ArrowRightIcon className="h-5 w-5" />
    </article>
  </Link>
);
