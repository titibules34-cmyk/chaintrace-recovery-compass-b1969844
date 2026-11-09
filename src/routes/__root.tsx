import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { useScrollReveal } from "../hooks/use-scroll-reveal";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&family=Plus+Jakarta+Sans:wght@400;600;800&display=swap" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}


const clientReviews = [
  { name: "Petra Ritthaler", text: "Fast and secure service! I contacted the team and received a quick response. They traced my lost funds and helped me get them back. I honestly never thought I would see my money again. A special thank you to agent Joseph for all his help!" },
  { name: "Emily", text: "Joseph Murrow was very helpful and friendly from the start. He took the time to understand my claim and clearly explained how the whole process works. My case handler has already been in touch, and I’m really happy with the attention to detail, clear instructions and support I’ve received so far. Thank you, Joseph!" },
  { name: "Ray Bonehill", text: "I’m extremely grateful for the help and support I received. The team kept me informed throughout the process, explained everything clearly and helped me understand what to expect. I’m very pleased with the service and the attention they gave to my case." },
  { name: "Paul Carson", text: "Peter Williams was friendly, professional and very helpful throughout the process. He kept me updated, answered my questions and made sure I understood every step. I’m delighted that my funds were successfully recovered. I really appreciate all the support!" },
  { name: "Anne Holmes", text: "Joseph Murrow was excellent from the beginning. He listened carefully, explained the process and made sure I knew what to expect. The team stayed in contact throughout, and I’m delighted with the successful recovery of my funds. Thank you for making a difficult experience easier!" },
  { name: "Anonymous", text: "The communication has been clear and the team have been very helpful. I received a response quickly and was given straightforward instructions about the next steps. It makes a big difference to feel listened to and supported." },
  { name: "Maggie", text: "Peter Williams was very reassuring and professional throughout my experience. He explained everything clearly, answered my questions and made sure I felt supported. I’m very happy with the service and grateful for the team’s patience and care." },
  { name: "Jack", text: "I had a very positive experience with the team. They were professional, understanding and took the time to explain everything without making things complicated. I’m pleased with the support I received and would like to thank everyone involved." },
  { name: "Walter", text: "Peter Williams and the team were reassuring and professional throughout my experience. Communication was clear, and I always knew what was happening. I’m very happy to say that my recovery was successful. Thank you for the patience, care and support!" },
];

function FloatingClientReviews() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % clientReviews.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [isOpen]);

  const review = clientReviews[activeReview];
  const showPrevious = () =>
    setActiveReview((current) => (current - 1 + clientReviews.length) % clientReviews.length);
  const showNext = () =>
    setActiveReview((current) => (current + 1) % clientReviews.length);

  return (
    <aside className="fixed bottom-4 left-4 z-[60] flex w-[min(21rem,calc(100vw-2rem))] flex-col items-start gap-3">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="floating-client-review-panel"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex items-center gap-2 rounded-full border border-blue-200/20 bg-white/[.075] px-4 py-3 text-xs font-bold text-blue-50 shadow-2xl shadow-black/30 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-accent"
      >
        <span className="text-accent" aria-hidden="true">★★★★★</span>
        <span>Client reviews</span>
        <span className="text-accent" aria-hidden="true">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <section
          id="floating-client-review-panel"
          aria-live="polite"
          className="w-full overflow-hidden rounded-2xl border border-blue-200/20 bg-white/[.075] p-5 text-blue-50 shadow-2xl shadow-black/40 backdrop-blur-xl"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-bold text-white">{review.name}</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">Client review</p>
            </div>
            <span className="shrink-0 text-sm tracking-[0.12em] text-accent" aria-label="Five out of five stars">★★★★★</span>
          </div>
          <p key={activeReview} className="client-in min-h-32 text-sm leading-relaxed text-blue-50/90">“{review.text}”</p>
          <div className="mt-4 flex items-center justify-between border-t border-blue-100/15 pt-3">
            <span className="text-xs text-muted-foreground">{activeReview + 1} of {clientReviews.length}</span>
            <div className="flex items-center gap-2">
              <button type="button" onClick={showPrevious} aria-label="Previous client review" className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-200/20 bg-white/[.06] text-lg text-cyan-200 transition hover:border-cyan-300/50">‹</button>
              <button type="button" onClick={showNext} aria-label="Next client review" className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-lg text-accent transition hover:border-accent">›</button>
            </div>
          </div>
          <div className="mt-3 flex gap-1.5">
            {clientReviews.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActiveReview(index)}
                aria-label={`Show review ${index + 1}`}
                aria-current={index === activeReview ? "true" : undefined}
                className={`h-1 flex-1 rounded-full transition-colors ${index === activeReview ? "bg-accent" : "bg-muted"}`}
              />
            ))}
          </div>
        </section>
      )}
    </aside>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useScrollReveal();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <FloatingClientReviews />
    </QueryClientProvider>
  );
}
