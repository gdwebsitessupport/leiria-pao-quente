type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
};

export function SectionTitle({
  eyebrow,
  title,
  text,
  align = "left",
}: SectionTitleProps) {
  return (
    <div
      className={`mx-auto max-w-3xl ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-terracotta">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif text-4xl font-bold leading-[0.96] text-ink text-balance md:text-6xl">
        {title}
      </h2>
      {text ? (
        <p className="mt-5 text-base leading-8 text-stone md:text-lg">{text}</p>
      ) : null}
    </div>
  );
}
