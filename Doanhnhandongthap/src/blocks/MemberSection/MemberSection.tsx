import { getBackgroundStyle, type SectionBackground } from "../shared/background";

export type MemberStat = {
  number: string;
  label: string;
};

export type MemberSectionProps = {
  title: string;
  imageUrl: string;
  imageAlt: string;
  contentTitle: string;
  paragraphs: string[];
  benefitsTitle: string;
  benefits: string[];
  stats: MemberStat[];
  background: SectionBackground;
};

export default function MemberSection({
  title,
  imageUrl,
  imageAlt,
  contentTitle,
  paragraphs,
  benefitsTitle,
  benefits,
  stats,
  background,
}: MemberSectionProps) {
  return (
    <section className="max-w-[1100px] mx-auto px-5 py-[60px]" style={getBackgroundStyle(background)}>
      <div className="mb-[50px] text-center">
        <h1 className="mb-2.5 text-[30px] md:text-[38px] font-bold text-[#0F5B94]">{title}</h1>
        <div className="mx-auto h-1 w-[90px] rounded-[30px] bg-[#F7931E]" />
      </div>

      <div className="grid grid-cols-1 items-center gap-[50px] md:grid-cols-2">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full rounded-2xl object-cover shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
        />

        <div>
          <h2 className="mb-5 text-[28px] font-bold text-[#0F5B94]">{contentTitle}</h2>

          {paragraphs.map((p, i) => (
            <p key={i} className="mb-[18px] text-[#555]">
              {p}
            </p>
          ))}

          <div className="mt-[25px] rounded-[14px] bg-[#F7F9FC] p-6">
            <h3 className="mb-[18px] font-bold text-[#0F5B94]">{benefitsTitle}</h3>
            <ul>
              {benefits.map((benefit, i) => (
                <li
                  key={i}
                  className={`py-2.5 ${i < benefits.length - 1 ? "border-b border-[#eee]" : ""}`}
                >
                  <span className="mr-2.5 font-bold text-[#F7931E]">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-[60px] grid grid-cols-1 gap-5 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-[14px] bg-white p-7 text-center shadow-[0_5px_20px_rgba(0,0,0,0.08)]">
            <h3 className="mb-2 text-[34px] font-bold text-[#0F5B94]">{stat.number}</h3>
            <span className="text-[#666]">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
