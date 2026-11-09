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
          <div className="mt-4 flex justify-end border-t border-blue-100/15 pt-3">
            <div className="flex items-center gap-2">
              <button type="button" onClick={showPrevious} aria-label="Previous client review" className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-200/20 bg-white/[.06] text-lg text-cyan-200 transition hover:border-cyan-300/50">‹</button>
              <button type="button" onClick={showNext} aria-label="Next client review" className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-lg text-accent transition hover:border-accent">›</button>
            </div>
          </div>
        </section>
      )}
    </aside>
  );
}


type CJMessage = { from: "bot" | "visitor"; text: string };

function FloatingCJBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<CJMessage[]>([
    { from: "bot", text: "Hello! I'm CJ Bot, the Cyber Justice Recovery assistant. I can help you understand common crypto-scam situations and the information you may want to gather. What would you like help with?" },
  ]);
  const [choices, setChoices] = useState([
    "I lost crypto to a scam",
    "Tell me about CJR services",
    "Where are you located?",
  ]);

  const addVisitorMessage = (text: string) =>
    setMessages((current) => [...current, { from: "visitor", text }]);
  const addBotMessage = (text: string) =>
    setMessages((current) => [...current, { from: "bot", text }]);

  const handleChoice = (choice: string) => {
    addVisitorMessage(choice);
    if (choice === "I lost crypto to a scam") {
      addBotMessage("I'm sorry this happened. Let's narrow down what happened. Which type of situation best describes it?");
      setChoices([
        "Fake crypto exchange / rug pull",
        "Romance / pig butchering scam",
        "Fake investment platform",
        "NFT / wallet hack",
        "Phishing or impersonation",
        "Something else",
      ]);
    } else if (choice === "Tell me about CJR services") {
      addBotMessage("Cyber Justice Recovery provides information and assistance for people affected by suspected digital-asset scams. Support may include understanding transaction records, organising evidence and discussing possible next steps. No recovery outcome can be guaranteed.");
      setChoices(["I lost crypto to a scam", "What information should I prepare?", "Speak to the team"]);
    } else if (choice === "Where are you located?") {
      addBotMessage("For the team's current location and contact details, please use the Contact page on this website. I don't want to guess or give you an unverified address.");
      setChoices(["I lost crypto to a scam", "Tell me about CJR services", "Speak to the team"]);
    } else if (choice === "Speak to the team") {
      addBotMessage("For direct assistance, please use the website's Contact page. Avoid posting private account details here.");
      setChoices(["What information should I prepare?", "I lost crypto to a scam"]);
    } else if (choice === "What information should I prepare?") {
      addBotMessage("You can safely gather the approximate date, the amount and currency, the platform or wallet involved, public wallet addresses, transaction IDs (TXIDs), and screenshots of relevant messages. Never share passwords, one-time codes, private keys or your recovery phrase.");
      setChoices(["Speak to the team", "I lost crypto to a scam"]);
    } else {
      addBotMessage("Thanks for explaining. Keep any transaction IDs, public wallet addresses and relevant messages. Do not send passwords, private keys, recovery phrases or one-time codes. For a review of your specific situation, please contact the team through the website.");
      setChoices(["What information should I prepare?", "Speak to the team", "I lost crypto to a scam"]);
    }
  };

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    addVisitorMessage(text);
    setDraft("");
    addBotMessage("Thank you for sharing that. I can provide general guidance, but I can't verify transactions or assess recovery prospects from a chat message. Please keep your transaction records and contact the team through the website. Never share passwords, private keys, recovery phrases or one-time codes.");
    setChoices(["What information should I prepare?", "Speak to the team", "I lost crypto to a scam"]);
  };

  return (
    <aside className="fixed bottom-4 right-4 z-[70] flex flex-col items-end gap-3">
      {isOpen && (
        <section
          aria-label="CJ Bot chat"
          className="flex h-[min(42rem,calc(100dvh-7rem))] w-[min(27rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.7rem] border border-blue-200/70 bg-white text-slate-900 shadow-2xl shadow-slate-950/30"
        >
          <header className="flex shrink-0 items-center gap-3 bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-4 text-white">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-xl" aria-hidden="true">⚖️</div>
            <div className="min-w-0 flex-1">
              <p className="font-bold leading-tight">CJ Bot</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-blue-100">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Cyber Justice Recovery · Always available
              </p>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close CJ Bot" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-2xl transition hover:bg-white/25">×</button>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-blue-50 to-slate-50 px-4 py-5">
            {messages.map((message, index) => (
              <div key={index} className={message.from === "visitor" ? "flex justify-end" : "flex items-start gap-2"}>
                {message.from === "bot" && (
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm text-white" aria-hidden="true">⚖</span>
                )}
                <div className={message.from === "visitor"
                  ? "max-w-[84%] rounded-2xl rounded-br-md bg-blue-600 px-4 py-3 text-sm leading-relaxed text-white shadow-sm"
                  : "max-w-[88%] rounded-2xl rounded-tl-md border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-relaxed text-slate-700"}>
                  {message.text}
                </div>
              </div>
            ))}
            {choices.length > 0 && (
              <div className="ml-10 space-y-2">
                {choices.map((choice) => (
                  <button key={choice} type="button" onClick={() => handleChoice(choice)} className="w-full rounded-xl border border-blue-200 bg-white px-3.5 py-3 text-left text-sm font-semibold text-blue-700 shadow-sm transition hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    {choice}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={(event) => { event.preventDefault(); sendMessage(); }} className="shrink-0 border-t border-blue-100 bg-white p-3">
            <div className="flex items-center gap-2">
              <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Type your message..." aria-label="Type your message to CJ Bot" className="min-w-0 flex-1 rounded-full border border-blue-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              <button type="submit" aria-label="Send message" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white transition hover:bg-blue-700">➤</button>
            </div>
            <p className="mt-2 text-center text-[0.68rem] leading-relaxed text-slate-500">🔒 Never share passwords, private keys or recovery phrases.</p>
          </form>
        </section>
      )}
      <button type="button" aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)} className="flex items-center gap-2 rounded-full border border-blue-300/40 bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
        <span className="text-lg" aria-hidden="true">⚖️</span>
        <span>{isOpen ? "Close CJ Bot" : "Chat with CJ Bot"}</span>
      </button>
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
      <FloatingCJBot />
    </QueryClientProvider>
  );
}
