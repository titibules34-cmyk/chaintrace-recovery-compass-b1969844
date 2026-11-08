import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/** Site-wide scroll reveal: animates direct children of every <section> (and grid items) into view. */
export function useScrollReveal() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" },
    );

    const tag = () => {
      const els = document.querySelectorAll<HTMLElement>(
        "main section > *, main section .grid > *, section > div > *, section .grid > *",
      );
      els.forEach((el) => {
        if (el.dataset["reveal"]) return;
        el.dataset["reveal"] = "1";
        const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
        const idx = Math.min(siblings.indexOf(el), 6);
        el.style.setProperty("--reveal-delay", `${idx * 140}ms`);
        el.classList.add("reveal");
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.75 && r.bottom > 0) {
          requestAnimationFrame(() => el.classList.add("is-revealed"));
        } else {
          io.observe(el);
        }
      });
    };

    tag();
    const mo = new MutationObserver(tag);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, [path]);
}
