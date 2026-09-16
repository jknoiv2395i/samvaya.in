import React, { useState } from "react"
import { 
  Search, 
  Copy, 
  Check, 
  ChevronRight, 
  Radio, 
  PhoneCall, 
  MessageSquare, 
  Terminal,
  Activity,
  ArrowLeft
} from "lucide-react"

interface DocsLayoutProps {
  onBackToHome?: () => void
}

export const DocsLayout: React.FC<DocsLayoutProps> = ({ onBackToHome }) => {
  const [activeCategory, setActiveCategory] = useState("quickstart")
  const [copied, setCopied] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-[#e4e4e7] font-['Inter'] antialiased flex flex-col selection:bg-amber-500/20 selection:text-amber-300">
      
      {/* Top Global Navigation Bar */}
      <header className="sticky top-0 z-40 w-full h-14 bg-[#0d0d0e]/95 backdrop-blur-md border-b border-[#27272a] px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Brand & Return */}
        <div className="flex items-center gap-4">
          {onBackToHome && (
            <button
              type="button"
              onClick={onBackToHome}
              className="flex items-center gap-1.5 text-xs text-[#a1a1aa] hover:text-white transition-colors cursor-pointer py-1 px-2 rounded-md hover:bg-[#18181b]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}

          <div className="flex items-center gap-2.5 select-none">
            <span className="font-['Jersey_25'] text-2xl tracking-tight text-white">samvaya</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#27272a] text-[#a1a1aa] uppercase tracking-wider">
              DOCS
            </span>
          </div>
        </div>

        {/* Center: Search pill */}
        <div className="hidden md:flex items-center w-full max-w-sm mx-4">
          <div className="w-full relative flex items-center">
            <Search className="w-4 h-4 text-[#71717a] absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation..."
              className="w-full h-8 pl-9 pr-12 text-xs bg-[#18181b] border border-[#27272a] rounded-lg text-white placeholder-[#71717a] focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 transition-all"
            />
            <span className="absolute right-2 text-[10px] font-mono text-[#71717a] bg-[#27272a] px-1.5 py-0.5 rounded border border-[#3f3f46]/40">
              Ctrl K
            </span>
          </div>
        </div>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://samvaya.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-xs text-[#a1a1aa] hover:text-white transition-colors"
          >
            <span>API Status</span>
            <Activity className="w-3 h-3 text-emerald-500" />
          </a>
          <a
            href="mailto:contact@samvaya.in"
            className="text-xs text-[#a1a1aa] hover:text-white transition-colors hidden sm:block"
          >
            Support
          </a>
          <button
            type="button"
            className="h-8 px-3.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold text-xs transition-all shadow-sm cursor-pointer"
          >
            Dashboard
          </button>
        </div>
      </header>

      {/* Main 3-Column Layout Container */}
      <div className="flex-1 w-full max-w-7xl mx-auto flex">
        
        {/* ========================================================================= */}
        {/* Column 1: Left Navigation Rail (Sticky) */}
        {/* ========================================================================= */}
        <aside className="w-64 shrink-0 hidden lg:block border-r border-[#27272a] p-4 py-6 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto space-y-6 select-none">
          
          {/* Section: Category Rails */}
          <div className="space-y-1">
            <div className="text-[11px] font-semibold tracking-wider text-[#71717a] uppercase px-3 mb-2">
              Architecture
            </div>
            
            <button
              type="button"
              onClick={() => setActiveCategory("quickstart")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeCategory === "quickstart" 
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold" 
                  : "text-[#a1a1aa] hover:text-white hover:bg-[#18181b]"
              }`}
            >
              <Terminal className="w-4 h-4 text-amber-500" />
              <span>Quick Start</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory("sip-trunking")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeCategory === "sip-trunking" 
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold" 
                  : "text-[#a1a1aa] hover:text-white hover:bg-[#18181b]"
              }`}
            >
              <Radio className="w-4 h-4 text-[#71717a]" />
              <span>SIP Trunking</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory("voice-engine")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeCategory === "voice-engine" 
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold" 
                  : "text-[#a1a1aa] hover:text-white hover:bg-[#18181b]"
              }`}
            >
              <PhoneCall className="w-4 h-4 text-[#71717a]" />
              <span>Voice &amp; Telephony</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory("whatsapp")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeCategory === "whatsapp" 
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold" 
                  : "text-[#a1a1aa] hover:text-white hover:bg-[#18181b]"
              }`}
            >
              <MessageSquare className="w-4 h-4 text-[#71717a]" />
              <span>WhatsApp Cloud API</span>
            </button>
          </div>

          {/* Sub Navigation Items */}
          <div className="pt-4 border-t border-[#27272a]/60 space-y-1">
            <div className="text-[11px] font-semibold tracking-wider text-[#71717a] uppercase px-3 mb-2">
              Voice Agent API
            </div>

            <div className="space-y-0.5 pl-1">
              <a href="#introduction" className="flex items-center justify-between px-3 py-1.5 rounded-md text-xs text-[#a1a1aa] hover:text-white hover:bg-[#18181b] transition-colors">
                <span>Introduction</span>
              </a>
              <a href="#prerequisites" className="flex items-center justify-between px-3 py-1.5 rounded-md text-xs text-[#a1a1aa] hover:text-white hover:bg-[#18181b] transition-colors">
                <span>Prerequisites</span>
              </a>
              <a href="#quick-guide" className="flex items-center justify-between px-3 py-1.5 rounded-md text-xs text-amber-400 font-medium bg-amber-500/10 transition-colors">
                <span>Quick Start Guide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
              <a href="#channel-management" className="flex items-center justify-between px-3 py-1.5 rounded-md text-xs text-[#71717a] hover:text-white transition-colors">
                <span>Channel Management</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </a>
              <a href="#messaging-routes" className="flex items-center justify-between px-3 py-1.5 rounded-md text-xs text-[#71717a] hover:text-white transition-colors">
                <span>Messaging &amp; Calls</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </a>
              <a href="#webhooks" className="flex items-center justify-between px-3 py-1.5 rounded-md text-xs text-[#71717a] hover:text-white transition-colors">
                <span>Webhooks &amp; Events</span>
              </a>
            </div>
          </div>

        </aside>

        {/* ========================================================================= */}
        {/* Column 2: Center Content Reader */}
        {/* ========================================================================= */}
        <main className="flex-1 min-w-0 p-6 sm:p-10 md:p-12 overflow-y-auto space-y-10">
          
          {/* Breadcrumb Tag */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-amber-500 font-medium">Getting Started</span>
            <span className="text-[#52525b]">/</span>
            <span className="text-[#a1a1aa]">Voice Agent Setup</span>
          </div>

          {/* Title & Copy Page Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#27272a]">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                Quick Start Guide
              </h1>
              <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed max-w-2xl">
                Get up and running with Samvaya Voice &amp; WhatsApp Agents in under 5 minutes — connect your primary telephony trunk and start handling inbound calls.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 rounded-md text-xs font-medium bg-[#18181b] hover:bg-[#27272a] text-[#d4d4d8] border border-[#27272a] transition-all cursor-pointer shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy page"}</span>
            </button>
          </div>

          {/* Time to Complete & Summary */}
          <section id="time-to-complete" className="space-y-3">
            <h3 className="text-base font-semibold text-white">Time to Complete</h3>
            <p className="text-sm text-[#a1a1aa]">
              <strong className="text-white font-medium">5 minutes</strong> if you have your business phone or SIP trunk credentials ready.
            </p>
          </section>

          {/* What You'll Learn */}
          <section id="what-youll-learn" className="space-y-3">
            <h3 className="text-base font-semibold text-white">What You&apos;ll Learn</h3>
            <ul className="space-y-2 text-sm text-[#a1a1aa]">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                <span>How to connect a SIP trunk or BYON (Bring Your Own Number) channel.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                <span>How to test sub-second voice synthesis and conversational latency.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                <span>How to dispatch automated follow-up WhatsApp confirmation templates via Webhooks.</span>
              </li>
            </ul>
          </section>

          {/* Step 1: Connect Channel */}
          <section id="connect-channel" className="space-y-4 pt-4 border-t border-[#27272a]/70">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xs font-bold">
                1
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Connect Your Channel</h2>
            </div>
            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              First, bind your telephony provider to the Samvaya Voice orchestrator. You can use standard SIP credentials, Twilio, or native BYON SIP trunking.
            </p>

            {/* Code Block Example */}
            <div className="rounded-xl border border-[#27272a] bg-[#121214] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#27272a] bg-[#18181b] text-xs text-[#71717a]">
                <span className="font-mono">curl -X POST /v1/channels/connect</span>
                <span className="text-[11px] font-mono text-[#a1a1aa]">bash</span>
              </div>
              <pre className="p-4 text-xs font-mono text-[#d4d4d8] overflow-x-auto leading-relaxed">
{`curl https://api.samvaya.in/v1/voice/inbound \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "phone_number": "+919876543210",
    "voice_model": "samvaya-natural-v2",
    "latency_target_ms": 120,
    "knowledge_base_id": "kb_enterprise_01"
  }'`}
              </pre>
            </div>
          </section>

          {/* Step 2: Send First Message */}
          <section id="send-first-message" className="space-y-4 pt-4 border-t border-[#27272a]/70">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xs font-bold">
                2
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Configure Conversational Webhooks</h2>
            </div>
            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              Receive live transcription streams, qualified lead payloads, and booking status updates straight to your CRM or custom API endpoint.
            </p>
          </section>

        </main>

        {/* ========================================================================= */}
        {/* Column 3: Right "On this page" Table of Contents (Sticky) */}
        {/* ========================================================================= */}
        <aside className="w-56 shrink-0 hidden xl:block p-6 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto space-y-4 select-none">
          <div className="text-xs font-semibold text-white tracking-wide uppercase">
            On this page
          </div>

          <nav className="space-y-2.5 text-xs text-[#a1a1aa]">
            <a 
              href="#time-to-complete" 
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3f3f46]" />
              <span>Time to Complete</span>
            </a>

            <a 
              href="#what-youll-learn" 
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3f3f46]" />
              <span>What You&apos;ll Learn</span>
            </a>

            <a 
              href="#connect-channel" 
              className="flex items-center gap-2 text-amber-400 font-medium transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Step 1: Connect Channel</span>
            </a>

            <div className="pl-3.5 space-y-1.5 border-l border-[#27272a]">
              <a href="#connect-channel" className="block text-[11px] text-[#71717a] hover:text-white transition-colors">
                1. Navigate to Channels
              </a>
              <a href="#connect-channel" className="block text-[11px] text-[#71717a] hover:text-white transition-colors">
                2. Enter Credentials
              </a>
              <a href="#connect-channel" className="block text-[11px] text-[#71717a] hover:text-white transition-colors">
                3. Verify Phone Number
              </a>
            </div>

            <a 
              href="#send-first-message" 
              className="flex items-center gap-2 hover:text-white transition-colors pt-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3f3f46]" />
              <span>Step 2: Webhook Events</span>
            </a>
          </nav>
        </aside>

      </div>
    </div>
  )
}
