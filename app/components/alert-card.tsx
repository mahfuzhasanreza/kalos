type AlertCardProps = {
  title: string;
  description: string;
};

export const AlertCard = ({ title, description }: AlertCardProps) => (
  <article className="rounded-[32px] bg-[#ff1a1b] px-6 py-6 text-white shadow-[0_18px_34px_rgba(224,22,32,0.35)]">
    <p className="text-lg font-semibold">{title}</p>
    <p className="mt-3 text-sm leading-relaxed text-[#ffe5e5]">{description}</p>
  </article>
);
