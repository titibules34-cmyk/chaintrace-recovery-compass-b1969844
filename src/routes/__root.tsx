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
    <aside className="fixed bottom-2 left-2 z-[60] flex w-auto max-w-[46vw] flex-col items-start gap-1 sm:bottom-4 sm:left-4 sm:max-w-none sm:w-[min(21rem,calc(100vw-2rem))] sm:gap-3">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="floating-client-review-panel"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex max-w-full items-center gap-1 rounded-full border border-blue-200/20 bg-slate-950/90 px-2.5 py-2 text-[0.62rem] font-bold text-blue-50 shadow-xl shadow-black/30 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-accent sm:gap-2 sm:bg-white/[.075] sm:px-4 sm:py-3 sm:text-xs"
      >
        <span className="text-accent" aria-hidden="true">★★★★★</span>
        <span className="sm:hidden">Reviews</span><span className="hidden sm:inline">Client reviews</span>
        <span className="text-accent" aria-hidden="true">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <section
          id="floating-client-review-panel"
          aria-live="polite"
          className="mb-1 max-h-[34dvh] w-[min(19rem,calc(100vw-1rem))] overflow-y-auto rounded-2xl border border-blue-200/20 bg-slate-950/90 p-3 text-blue-50 shadow-2xl shadow-black/40 backdrop-blur-xl sm:mb-0 sm:w-full sm:max-h-none sm:bg-white/[.075] sm:p-5"
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
type CJLead = { service:string; issue:string; platform:string; amount:string; timeframe:string; evidence:string; name:string; email:string; phone:string; summary:string };
const emptyCJLead: CJLead = { service:"", issue:"", platform:"", amount:"", timeframe:"", evidence:"", name:"", email:"", phone:"", summary:"" };

function FloatingCJBot() {
  const [isOpen,setIsOpen]=useState(false);
  const [draft,setDraft]=useState("");
  const [stage,setStage]=useState("welcome");
  const [messages,setMessages]=useState<CJMessage[]>([{from:"bot",text:"Welcome to Cyber Justice. I'm CJ Bot, your website assistant. I can explain our services, outline how an enquiry is reviewed, and help you prepare a confidential consultation request. What would you like help with?"}]);
  const [choices,setChoices]=useState(["Cryptocurrency scam","Investment fraud","Wallet or account theft","Lost access to digital assets","Transaction tracing","Speak to the recovery team"]);
  const [lead,setLead]=useState<CJLead>(emptyCJLead);
  const [mailReady,setMailReady]=useState(false);
  const addVisitor=(text:string)=>setMessages(current=>[...current,{from:"visitor",text}]);
  const addBot=(text:string)=>setMessages(current=>[...current,{from:"bot",text}]);

  const beginContact=()=>{
    setStage("lead-form"); setChoices([]);
    addBot("That covers the initial questions. Please complete the short form below and our team will get back to you. All consultations are confidential.");
  };

  const handleChoice=(choice:string)=>{
    addVisitor(choice); setMailReady(false);
    if(stage==="welcome"){
      if(choice==="Speak to the recovery team"){
        setStage("contact-topic"); addBot("Of course. Which Cyber Justice service is your enquiry about?");
        setChoices(["Asset tracing & investigations","Cryptocurrency tracing","Cyber intelligence","Cyber investigation team","General enquiry"]);
      } else if(choice==="How the process works"){
        setStage("process"); addBot("The website describes four steps: Scope — clarify what happened and what a review can establish; Review — check your records and relevant public data; Document — organise findings into a referenced timeline; Next Steps — explain what the evidence supports and who may be able to help. What would you like to explore?");
        setChoices(["What information should I prepare?","I have a crypto tracing enquiry","I have another investigation enquiry","Contact the team"]);
      } else {
        setLead(current=>({...current,service:choice})); setStage("issue");
        const intro=choice==="Cryptocurrency scam"
          ?"I'm sorry you're dealing with this. Was the scam related to an investment opportunity, romance or social contact, a fake exchange, or something else?"
          :choice==="Investment fraud"
          ?"I can help gather the basics about the investment concern. Was it an online trading platform, a broker or adviser, a guaranteed-return offer, or another type of investment?"
          :choice==="Wallet or account theft"
          ?"Let's establish what happened. Was a wallet drained, an exchange account accessed without permission, or were your login details compromised?"
          :choice==="Lost access to digital assets"
          ?"I can help identify the type of access issue. Have you lost access to a wallet, exchange account, or another digital-asset service?"
          :"Transaction tracing can help organise publicly available transaction information. Do you have a transaction ID (TXID) or public wallet address available?";
        addBot(intro);
        setChoices(choice==="Cryptocurrency scam"
          ?["Fake investment or trading platform","Romance or social-media scam","Fake exchange or support impersonation","Other cryptocurrency scam"]
          :choice==="Investment fraud"
          ?["Online trading platform","Broker or adviser","Guaranteed-return investment","Other investment concern"]
          :choice==="Wallet or account theft"
          ?["Wallet drained or unauthorised transfer","Exchange account accessed","Login or email compromised","Not sure"]
          :choice==="Lost access to digital assets"
          ?["Lost wallet access","Lost exchange account access","Lost recovery phrase or backup","Not sure"]
          :["I have a transaction ID (TXID)","I have a public wallet address","I have both","I don't have these details"]);
      }
    } else if(stage==="process"){
      if(choice==="What information should I prepare?"){
        addBot("Useful initial records can include dates, amounts, platform or exchange names, public wallet addresses, transaction IDs (TXIDs), screenshots and any reports already made. Never share passwords, private keys, seed phrases, one-time codes or full identity documents in this chat.");
        setChoices(["Contact the team","I have a crypto tracing enquiry","I have another investigation enquiry"]);
      } else if(choice==="I have a crypto tracing enquiry"){
        setLead(current=>({...current,service:"Cryptocurrency tracing"})); setStage("issue"); addBot("What best describes the cryptocurrency matter?");
        setChoices(["Crypto scam or suspected fraud","Funds transferred to another wallet","Investment or online platform concern","Something else"]);
      } else {
        setStage("contact-topic"); addBot("Which service is most relevant to your enquiry?");
        setChoices(["Asset tracing & investigations","Cryptocurrency tracing","Cyber intelligence","Cyber investigation team","General enquiry"]);
      }
    } else if(stage==="contact-topic"){
      setLead(current=>({...current,service:choice})); setStage("lead-form"); setChoices([]);
      addBot("Thank you. Please complete the short form below and our team will get back to you. All consultations are confidential.");
    } else if(stage==="issue"){
      setLead(current=>({...current,issue:choice})); setStage("platform");
      addBot("Which platform, exchange, wallet or organisation is involved? You can type “not sure”. Please share only its name, never login details.");
      setChoices(["Not sure","Prefer to explain in my message"]);
    } else if(stage==="platform"){
      setLead(current=>({...current,platform:choice})); setStage("amount");
      addBot("Do you have an approximate value involved? A broad range is fine, and you can choose not to say.");
      setChoices(["Under £1,000","£1,000–£10,000","£10,000–£50,000","Over £50,000","Prefer not to say"]);
    } else if(stage==="amount"){
      setLead(current=>({...current,amount:choice})); setStage("timeframe");
      addBot("When did this happen?");
      setChoices(["Within the last week","Within the last month","1–6 months ago","More than 6 months ago","Not sure"]);
    } else if(stage==="timeframe"){
      setLead(current=>({...current,timeframe:choice})); setStage("evidence");
      addBot("Do you have supporting records such as transaction IDs, public wallet addresses, screenshots, emails or a report reference?");
      setChoices(["Yes, I have some records","No, not yet","I'm not sure what I need"]);
    } else if(stage==="evidence"){
      setLead(current=>({...current,evidence:choice})); beginContact();
    }
  };

  const sendMessage=()=>{
    const value=draft.trim(); if(!value)return;
    addVisitor(value); setDraft(""); setMailReady(false);
    if(stage==="summary-first"){
      setLead(current=>({...current,summary:value})); setStage("name"); addBot("Thank you. What is your full name so the team can follow up?");
    } else if(stage==="name"){
      setLead(current=>({...current,name:value})); setStage("email"); addBot("Thanks. What email address should the team use to reply?");
    } else if(stage==="email"){
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){addBot("That doesn't look like a complete email address. Please check it and enter it again.");return;}
      setLead(current=>({...current,email:value})); setStage("phone"); addBot("What phone number can the team use if a call is more convenient? Type “skip” if you prefer email only.");
    } else if(stage==="phone"){
      setLead(current=>({...current,phone:value.toLowerCase()==="skip"?"":value})); setStage("summary");
      addBot("Finally, please add a short summary of what happened and what help you are looking for. Do not include passwords, private keys, recovery phrases or one-time codes.");
    } else if(stage==="summary"){
      setLead(current=>({...current,summary:value})); setStage("complete"); setChoices([]);
      addBot("Thank you. Your enquiry details are ready. Select the button below to open an email addressed to Cyber Justice with the information you provided. This chat does not submit or store your details on its own.");
      setMailReady(true);
    } else {
      addBot("Thanks for explaining. I can provide general website information, but I can't verify transactions, access case files or determine whether assets can be recovered in this chat. Would you like to make an enquiry with the team?");
      setStage("contact-topic"); setChoices(["Asset tracing & investigations","Cryptocurrency tracing","Cyber intelligence","Cyber investigation team","General enquiry"]);
    }
  };

  const mailBody=[
    "Cyber Justice website enquiry","",
    "Service: "+(lead.service||"General enquiry"),
    "Situation: "+(lead.issue||"Not specified"),
    "Platform / organisation: "+(lead.platform||"Not specified"),
    "Approximate value: "+(lead.amount||"Not specified"),
    "Timeframe: "+(lead.timeframe||"Not specified"),
    "Supporting records: "+(lead.evidence||"Not specified"),"",
    "Name: "+lead.name,"Email: "+lead.email,"Phone: "+(lead.phone||"Not provided"),"",
    "Enquiry summary:",lead.summary,"","Sent via the CJ Bot website assistant."
  ].join("\n");
  const mailHref="mailto:info@cyberjustice.uk?subject="+encodeURIComponent("Website enquiry — Cyber Justice")+"&body="+encodeURIComponent(mailBody);
  const resetChat=()=>{
    setStage("welcome");setLead(emptyCJLead);setMailReady(false);setDraft("");
    setMessages([{from:"bot",text:"Welcome back. I'm CJ Bot, your website assistant. What would you like help with?"}]);
    setChoices(["Cryptocurrency scam","Investment fraud","Wallet or account theft","Lost access to digital assets","Transaction tracing","Speak to the recovery team"]);
  };

  return (
    <aside className="fixed bottom-2 right-2 z-[70] flex flex-col items-end gap-1 sm:bottom-4 sm:right-4 sm:gap-3">
      {isOpen&&(
        <section aria-label="CJ Bot chat" className="mb-1 flex h-[min(44rem,calc(100dvh-4.5rem))] w-[calc(100vw-1rem)] max-w-[28rem] flex-col overflow-hidden rounded-2xl border border-blue-200/70 bg-white text-slate-900 shadow-[0_24px_80px_-20px_rgba(2,20,55,.65)] sm:mb-0 sm:h-[min(44rem,calc(100dvh-6.5rem))] sm:w-[min(28rem,calc(100vw-2rem))] sm:rounded-[1.65rem]">
          <header className="relative flex shrink-0 items-center gap-2.5 overflow-hidden bg-gradient-to-r from-[#0754B8] via-[#0875D1] to-[#0754B8] px-3.5 py-3 text-white sm:gap-3 sm:px-5 sm:py-4">
            <div className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full border border-white/10"/>
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/15 text-2xl shadow-inner" aria-hidden="true">⚖️</div>
            <div className="relative min-w-0 flex-1"><p className="text-base font-extrabold leading-tight tracking-tight">CJ Bot</p><p className="mt-1 flex items-center gap-1.5 text-xs text-blue-100"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.8)]"/> Cyber Justice · Website assistant</p></div>
            <button type="button" onClick={()=>setIsOpen(false)} aria-label="Close CJ Bot" className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-2xl transition hover:bg-white/25">×</button>
          </header>
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain bg-[radial-gradient(ellipse_at_top,_#eff6ff_0%,_#f8fbff_48%,_#f1f5f9_100%)] px-3 py-3 sm:space-y-4 sm:px-4 sm:py-5">
            <div className="mb-1 flex items-center gap-2 px-1"><span className="h-px flex-1 bg-blue-200/70"/><span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-blue-400">Your enquiry starts here</span><span className="h-px flex-1 bg-blue-200/70"/></div>
            {messages.map((message,index)=>(
              <div key={index} className={message.from==="visitor"?"flex justify-end":"flex items-start gap-2"}>
                {message.from==="bot"&&<span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-gradient-to-br from-blue-600 to-blue-800 text-sm text-white shadow-sm" aria-hidden="true">⚖</span>}
                <div className={message.from==="visitor"?"max-w-[86%] rounded-2xl rounded-br-md bg-gradient-to-br from-blue-600 to-blue-700 px-4 py-3 text-sm leading-relaxed text-white shadow-md shadow-blue-900/10":"max-w-[89%] rounded-2xl rounded-tl-md border border-blue-100 bg-white/90 px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-sm"}>{message.text}</div>
              </div>
            ))}
            {choices.length>0&&<div className="ml-0 space-y-2 sm:ml-10">{choices.map(choice=><button key={choice} type="button" onClick={()=>handleChoice(choice)} className="group w-full rounded-xl border border-blue-200/90 bg-white px-3.5 py-3 text-left text-[0.84rem] font-semibold leading-snug text-blue-700 shadow-[0_2px_8px_rgba(15,70,130,.04)] transition hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"><span className="flex items-center justify-between gap-2"><span>{choice}</span><span className="text-blue-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600" aria-hidden="true">›</span></span></button>)}</div>}
            {stage==="lead-form"&&<form onSubmit={event=>{event.preventDefault();setStage("complete");setMailReady(true);addBot("Thank you. Your enquiry is ready. Select “Send message” below to open your email app with the details filled in. Please review and send it to complete your request.");}} className="ml-0 space-y-2.5 rounded-2xl border border-blue-100 bg-white/95 p-3 shadow-sm sm:ml-10 sm:space-y-3 sm:p-4">
              <p className="text-sm leading-relaxed text-slate-700">📩 Great! Please fill out the form below and our team will get back to you within 24 hours. All consultations are confidential.</p>
              <input required value={lead.name} onChange={event=>setLead(current=>({...current,name:event.target.value}))} placeholder="Your name" aria-label="Your name" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"/>
              <input required type="email" value={lead.email} onChange={event=>setLead(current=>({...current,email:event.target.value}))} placeholder="Email address" aria-label="Email address" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"/>
              <input type="tel" value={lead.phone} onChange={event=>setLead(current=>({...current,phone:event.target.value}))} placeholder="Phone number (optional)" aria-label="Phone number (optional)" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"/>
              <textarea required rows={4} value={lead.summary} onChange={event=>setLead(current=>({...current,summary:event.target.value}))} placeholder="Brief description of your case..." aria-label="Brief description of your case" className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm leading-relaxed text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"/>
              <p className="text-[0.68rem] leading-relaxed text-slate-500">Enquiry topic: <span className="font-semibold text-blue-700">{lead.service}</span>. Please do not include passwords, private keys, recovery phrases or one-time codes.</p>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-900/15 transition hover:from-blue-700 hover:to-blue-800">➤ Send Message</button>
            </form>}
            {mailReady&&<div className="ml-0 rounded-xl border border-emerald-200 bg-emerald-50 p-3 sm:ml-10"><p className="text-xs leading-relaxed text-emerald-900">Your email app will open with the enquiry details filled in. Please review and send it to complete your request.</p><a href={mailHref} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800">Open enquiry email <span aria-hidden="true">↗</span></a></div>}
          </div>
          {stage!=="lead-form"&&stage!=="complete"&&<form onSubmit={event=>{event.preventDefault();sendMessage();}} className="shrink-0 border-t border-blue-100 bg-white/95 p-3">
            <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-slate-50 p-1.5 pl-4 transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
              <input value={draft} onChange={event=>setDraft(event.target.value)} placeholder={stage==="name"?"Enter your full name...":stage==="email"?"Enter your email address...":stage==="phone"?"Phone number or type skip...":stage==="summary"?"Write a short case summary...":"Type your message..."} aria-label="Type your message to CJ Bot" className="min-w-0 flex-1 bg-transparent py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"/>
              <button type="submit" aria-label="Send message" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-lg font-bold text-white shadow-md shadow-blue-900/20 transition hover:scale-105 hover:from-blue-700 hover:to-blue-800">➤</button>
            </div>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-[0.66rem] leading-relaxed text-slate-500"><span aria-hidden="true">🔒</span> Never share passwords, private keys, recovery phrases or one-time codes.</p>
          </form>}
          <div className="flex shrink-0 items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2"><span className="text-[0.65rem] text-slate-500">Need a fresh start?</span><button type="button" onClick={resetChat} className="text-xs font-semibold text-blue-700 hover:underline">Restart chat</button></div>
        </section>
      )}
      <button type="button" aria-expanded={isOpen} onClick={()=>setIsOpen(open=>!open)} className="group flex items-center gap-1.5 rounded-full border border-blue-300/40 bg-gradient-to-r from-blue-700 to-blue-600 px-2.5 py-2 text-[0.65rem] font-bold text-white shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-blue-950/30 focus:outline-none focus:ring-2 focus:ring-blue-300 sm:gap-2.5 sm:px-5 sm:py-3.5 sm:text-sm">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-base" aria-hidden="true">⚖️</span><span className="sm:hidden">{isOpen?"Close":"CJ Bot"}</span><span className="hidden sm:inline">{isOpen?"Close CJ Bot":"Chat with CJ Bot"}</span>{!isOpen&&<span className="ml-0.5 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.8)]"/>}
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
