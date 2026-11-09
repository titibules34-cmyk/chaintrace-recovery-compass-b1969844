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
    { from: "bot", text: "Welcome to Cyber Justice Recovery. I'm CJ Bot, your virtual guide. I can help you understand common digital-asset scams, organise useful information and find the right next step. How can I help today?" },
  ]);
  const [choices, setChoices] = useState([
    "💰 I lost crypto to a scam",
    "🔎 I need help tracing a transaction",
    "🔒 My funds or account are frozen",
    "📋 I want to check an existing case",
    "🛡️ Tell me about CJR services",
    "📍 Where are you located?",
    "👤 Speak to the recovery team",
  ]);

  const addVisitorMessage = (text: string) =>
    setMessages((current) => [...current, { from: "visitor", text }]);
  const addBotMessage = (text: string) =>
    setMessages((current) => [...current, { from: "bot", text }]);

  const handleChoice = (choice: string) => {
    addVisitorMessage(choice);
    if (choice.includes("lost crypto")) {
      addBotMessage("I'm sorry this happened. You're in the right place to learn about possible next steps. What type of situation best describes it?");
      setChoices([
        "🪙 Fake crypto exchange / rug pull",
        "💔 Romance / pig-butchering scam",
        "📈 Fake investment platform",
        "🎭 NFT / wallet hack",
        "🎣 Phishing or impersonation",
        "❔ Something else",
      ]);
    } else if (choice.includes("Fake crypto") || choice.includes("Romance") || choice.includes("Fake investment") || choice.includes("NFT") || choice.includes("Phishing") || choice.includes("Something else")) {
      addBotMessage("Thank you for explaining. If it is safe to do so, preserve the messages, website details, payment records and any transaction IDs. A transaction ID and public wallet address can help someone review the on-chain activity. I can't confirm whether funds can be recovered or guarantee an outcome through this chat.");
      setChoices(["🧾 What information should I prepare?", "🔎 I need help tracing a transaction", "👤 Speak to the recovery team"]);
    } else if (choice.includes("tracing a transaction")) {
      addBotMessage("Transaction tracing starts with reliable records. You may want to gather the transaction ID (TXID), public sending and receiving wallet addresses, blockchain network, approximate date and amount. A public transaction ID is different from a private key. Never share your seed phrase or wallet password.");
      setChoices(["🧾 What information should I prepare?", "💰 I lost crypto to a scam", "👤 Speak to the recovery team"]);
    } else if (choice.includes("funds or account are frozen")) {
      addBotMessage("That sounds stressful. Keep any messages from the platform, the date the restriction began and any relevant account or transaction references. Be cautious of anyone demanding an extra payment or promising guaranteed release of funds. For help with your specific circumstances, contact the team through the website.");
      setChoices(["🧾 What information should I prepare?", "🛡️ Tell me about CJR services", "👤 Speak to the recovery team"]);
    } else if (choice.includes("existing case")) {
      addBotMessage("For privacy, CJ Bot can't access case files or verify your case status. Please use the contact details on this website and include your existing case reference. Don't post identity documents or sensitive account details in this chat.");
      setChoices(["📍 Where are you located?", "👤 Speak to the recovery team"]);
    } else if (choice.includes("CJR services")) {
      addBotMessage("Cyber Justice Recovery offers information and assistance for people affected by suspected digital-asset scams. Depending on the circumstances, this may include helping you understand transaction records, organise supporting evidence and consider possible next steps. Every case is different; no recovery outcome or timeframe can be guaranteed.");
      setChoices(["💰 I lost crypto to a scam", "🔎 I need help tracing a transaction", "🧾 What information should I prepare?"]);
    } else if (choice.includes("located")) {
      addBotMessage("For the team's current office location and contact information, please visit the Contact page on this website. I don't want to guess or provide an unverified address.");
      setChoices(["🛡️ Tell me about CJR services", "👤 Speak to the recovery team"]);
    } else if (choice.includes("information should I prepare")) {
      addBotMessage("Useful records may include: the approximate date and amount, currency, platform or wallet name, public wallet addresses, transaction IDs (TXIDs), screenshots of messages and any report reference. Please redact personal information where possible. Never share passwords, one-time codes, private keys or your recovery phrase.");
      setChoices(["🔎 I need help tracing a transaction", "💰 I lost crypto to a scam", "👤 Speak to the recovery team"]);
    } else {
      addBotMessage("For direct assistance with your situation, please use the Contact page on this website. If you already have a case reference, include it there. Please don't send passwords, private keys, recovery phrases or one-time codes.");
      setChoices(["🧾 What information should I prepare?", "💰 I lost crypto to a scam"]);
    }
  };

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    addVisitorMessage(text);
    setDraft("");
    addBotMessage("Thank you for sharing that. I can offer general information, but I can't verify transactions, access case files or assess recovery prospects from this chat. Keep relevant records and contact the team through the website for a case-specific review. Never share passwords, one-time codes, private keys or recovery phrases.");
    setChoices(["🧾 What information should I prepare?", "🔎 I need help tracing a transaction", "👤 Speak to the recovery team"]);
  };

  return (
    <aside className="fixed bottom-4 right-4 z-[70] flex flex-col items-end gap-3">
      {isOpen && (
        <section
          aria-label="CJ Bot chat"
          className="flex h-[min(44rem,calc(100dvh-6.5rem))] w-[min(28rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.65rem] border border-blue-200/70 bg-white text-slate-900 shadow-[0_24px_80px_-20px_rgba(2,20,55,.65)]"
        >
          <header className="relative flex shrink-0 items-center gap-3 overflow-hidden bg-gradient-to-r from-[#0754B8] via-[#0875D1] to-[#0754B8] px-5 py-4 text-white">
            <div className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full border border-white/10" />
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/15 text-2xl shadow-inner" aria-hidden="true">⚖️</div>
            <div className="relative min-w-0 flex-1">
              <p className="text-base font-extrabold leading-tight tracking-tight">CJ Bot</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-blue-100">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.8)]" /> Cyber Justice Recovery · Virtual assistant
              </p>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close CJ Bot" className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-2xl transition hover:bg-white/25">×</button>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_#eff6ff_0%,_#f8fbff_48%,_#f1f5f9_100%)] px-4 py-5">
            <div className="mb-1 flex items-center gap-2 px-1">
              <span className="h-px flex-1 bg-blue-200/70" />
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-blue-400">Your recovery support starts here</span>
              <span className="h-px flex-1 bg-blue-200/70" />
            </div>
            {messages.map((message, index) => (
              <div key={index} className={message.from === "visitor" ? "flex justify-end" : "flex items-start gap-2"}>
                {message.from === "bot" && (
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-gradient-to-br from-blue-600 to-blue-800 text-sm text-white shadow-sm" aria-hidden="true">⚖</span>
                )}
                <div className={message.from === "visitor"
                  ? "max-w-[86%] rounded-2xl rounded-br-md bg-gradient-to-br from-blue-600 to-blue-700 px-4 py-3 text-sm leading-relaxed text-white shadow-md shadow-blue-900/10"
                  : "max-w-[89%] rounded-2xl rounded-tl-md border border-blue-100 bg-white/90 px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-sm"}>
                  {message.text}
                </div>
              </div>
            ))}
            {choices.length > 0 && (
              <div className="ml-10 space-y-2">
                {choices.map((choice) => (
                  <button key={choice} type="button" onClick={() => handleChoice(choice)} className="group w-full rounded-xl border border-blue-200/90 bg-white px-3.5 py-3 text-left text-[0.84rem] font-semibold leading-snug text-blue-700 shadow-[0_2px_8px_rgba(15,70,130,.04)] transition hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <span className="flex items-center justify-between gap-2">
                      <span>{choice}</span>
                      <span className="text-blue-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600" aria-hidden="true">›</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={(event) => { event.preventDefault(); sendMessage(); }} className="shrink-0 border-t border-blue-100 bg-white/95 p-3">
            <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-slate-50 p-1.5 pl-4 transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
              <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Type your message..." aria-label="Type your message to CJ Bot" className="min-w-0 flex-1 bg-transparent py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400" />
              <button type="submit" aria-label="Send message" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-lg font-bold text-white shadow-md shadow-blue-900/20 transition hover:scale-105 hover:from-blue-700 hover:to-blue-800">➤</button>
            </div>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-[0.66rem] leading-relaxed text-slate-500"><span aria-hidden="true">🔒</span> Never share passwords, private keys or recovery phrases.</p>
          </form>
        </section>
      )}
      <button type="button" aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)} className="group flex items-center gap-2.5 rounded-full border border-blue-300/40 bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-950/30 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-blue-950/30 focus:outline-none focus:ring-2 focus:ring-blue-300">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-base" aria-hidden="true">⚖️</span>
        <span>{isOpen ? "Close CJ Bot" : "Chat with CJ Bot"}</span>
        {!isOpen && <span className="ml-0.5 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.8)]" />}
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
