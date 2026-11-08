import mobileHero from "@/assets/lady-justice-mobile.webp";

const DESKTOP_HERO = "/assets/cyber-justice-hero.webp";

/** Lady Justice hero photo: a tall portrait crop on phones, the wide original on larger screens. */
export function HeroPicture({
  className,
  alt = "",
  priority = false,
}: {
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <picture>
      <source media="(max-width: 639px)" srcSet={mobileHero} />
      <img
        src={DESKTOP_HERO}
        alt={alt}
        className={className}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
