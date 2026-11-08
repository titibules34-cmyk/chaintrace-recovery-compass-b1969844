import logo from "@/assets/cyber-justice-logo.png.asset.json";

/** Shield-and-scales mark shown beside the "CYBER JUSTICE" name in every header. */
export function BrandLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return <img src={logo.url} alt="" aria-hidden="true" width={256} height={293} className={`shrink-0 ${className}`} />;
}
