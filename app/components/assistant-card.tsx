import { ArrowRightIcon, ChipIcon } from "./icons";

type AssistantCardProps = {
  title: string;
};

export const AssistantCard = ({ title }: AssistantCardProps) => (
  <article className="flex items-center justify-between rounded-[32px] bg-white px-6 py-6 text-[#0f0f0f] shadow-[0_16px_30px_rgba(15,84,166,0.12)]">
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9f3ff] text-[#0b6ce3]">
        <ChipIcon className="h-7 w-7" />
      </div>
      <p className="max-w-[172px] text-base font-semibold leading-snug">{title}</p>
    </div>
    <ArrowRightIcon className="h-5 w-5" />
  </article>
);
