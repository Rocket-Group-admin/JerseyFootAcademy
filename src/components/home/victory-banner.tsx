import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Trophy } from "lucide-react";

const FEATURED_SLUG = "spain-exclusive-2026";
const REPEAT = 6;

/** Scrolling ticker celebrating Spain's World Cup win, linking to the launch offer. */
export async function VictoryBanner() {
  const t = await getTranslations("home");

  const segment = (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: REPEAT }).map((_, i) => (
        <span key={i} className="mx-6 inline-flex items-center gap-2 whitespace-nowrap">
          <Trophy size={16} className="text-gold" aria-hidden />
          {t("victoryBannerText")}
        </span>
      ))}
    </div>
  );

  return (
    <Link
      href={`/product/${FEATURED_SLUG}`}
      aria-label={t("victoryBannerText")}
      className="group block overflow-hidden bg-gradient-to-r from-red via-navy to-red py-2.5 text-sm font-extrabold uppercase tracking-wide text-white"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {segment}
        {segment}
      </div>
    </Link>
  );
}
