import {useEffect, useRef, useState} from "react";
import {Bot, MessageSquareText, SendHorizonal, Sparkles, X} from "lucide-react";

type ChatMessage = {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: string;
};

const suggestions = [
  "How does the inspection workflow work?",
  "What does OCR extract from labels?",
  "How are calibration and measurements verified?",
  "Where can I review evidence and audit trails?"
];

function formatTime() {
  return new Date().toLocaleTimeString([], {hour: "numeric", minute: "2-digit"});
}

function buildBotReply(input: string): string {
  const text = input.toLowerCase();

  if (/[a-z]/.test(text) === false) {
    return "I can help you with the inspection workflow, OCR, calibration, rule outcomes, evidence dossiers, and review queue actions.";
  }

  if (text.includes("inspection") || text.includes("workflow")) {
    return "This portal follows a simple flow: capture evidence, run OCR and visual analysis, validate calibration and measurements, then route conflicts or gaps to the appropriate officer for review.";
  }

  if (text.includes("ocr")) {
    return "OCR extracts product details such as MRP, net quantity, packer information, and other visible label text so officers can compare the observed label against declared data and rules.";
  }

  if (text.includes("calibration") || text.includes("measurement")) {
    return "Calibration-aware measurements rely on a reference object, measured pixels, and scale math so each computed dimension can be validated before a rule outcome is finalized.";
  }

  if (text.includes("rule") || text.includes("review")) {
    return "Deterministic rules evaluate evidence and produce PASS, FAIL, or MANUAL REVIEW states. If confidence is low or evidence is incomplete, the case can be sent into the review queue for human decision-making.";
  }

  if (text.includes("evidence") || text.includes("audit") || text.includes("dossier")) {
    return "The evidence dossier keeps images, OCR fields, calibration metadata, measurements, rule results, conflicts, and audit events together in one traceable record for accountability.";
  }

  if (text.includes("login") || text.includes("access")) {
    return "For the demo, use the role-based authentication flow on the login page. The app is designed to show different inspection views depending on the selected officer role.";
  }

  if (text.includes("hello") || text.includes("hi") || text.includes("help")) {
    return "Hello! I can help with the inspection workflow, OCR, calibration, evidence dossiers, reports, and review queue handling inside this website.";
  }

  return "I can help with inspections, OCR, calibration, rule outcomes, review queues, reports, and evidence dossiers. Try asking about a specific part of the workflow.";
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-message",
      role: "bot",
      text: "Hello! I’m NIRIKSHAK Assistant. Ask me about inspections, OCR, measurements, calibration, or evidence review.",
      timestamp: formatTime()
    }
  ]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  function sendMessage(text: string) {
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
      timestamp: formatTime()
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `bot-${Date.now()}`,
          role: "bot",
          text: buildBotReply(trimmed),
          timestamp: formatTime()
        }
      ]);
    }, 300);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-[#1B365D] px-4 py-3 text-sm font-bold text-white shadow-xl transition hover:bg-[#142a49]"
          aria-label="Open chatbot"
        >
          <Bot size={18} />
          Chatbot
        </button>
      )}

      {isOpen && (
        <div className="w-[min(24rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-[#1B365D] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <MessageSquareText size={17} />
              </div>
              <div>
                <p className="text-sm font-bold">NIRIKSHAK Assistant</p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-200">AI helper</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-slate-200 transition hover:bg-white/10 hover:text-white"
              aria-label="Close chatbot"
            >
              <X size={17} />
            </button>
          </div>

          <div className="border-b border-slate-200 bg-slate-50 px-3 py-3">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1B365D]">
              <Sparkles size={14} className="text-[#ff9933]" />
              Quick help
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => sendMessage(suggestion)}
                  className="rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-700 transition hover:border-[#1B365D] hover:text-[#1B365D]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div ref={containerRef} className="max-h-72 space-y-3 overflow-y-auto bg-white px-3 py-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                    message.role === "user"
                      ? "bg-[#1B365D] text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  <p>{message.text}</p>
                  <p
                    className={`mt-1 text-[10px] ${
                      message.role === "user" ? "text-slate-200" : "text-slate-400"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-2 border-t border-slate-200 bg-slate-50 p-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question..."
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#1B365D] focus:ring-2 focus:ring-[#1B365D]/10"
            />
            <button
              type="submit"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B365D] text-white transition hover:bg-[#142a49]"
              aria-label="Send message"
            >
              <SendHorizonal size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
