import React, { useState, useEffect, useRef } from "react"
import {
  Search, Copy, Check, ChevronRight, ChevronDown,
  Terminal, ArrowLeft, PhoneCall, Shield, X
} from "lucide-react"

type Route = string
type CodeTab = "cURL" | "Python" | "Node.js"
interface SamvayaDocsPortalProps { onBackToHome?: () => void }

function Badge({ children }: { children: React.ReactNode; color?: string }) {
  return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold border bg-[#1A1A20] text-[#8F8F9D] border-[#2E2E38]">{children}</span>
}

function Callout({ type = "info", title, children }: { type?: "info" | "warning" | "tip"; title: string; children: React.ReactNode }) {
  const border = { info: "border-l-[#6366F1]", warning: "border-l-amber-500", tip: "border-l-emerald-500" }[type]
  const ic = { info: "text-[#6366F1]", warning: "text-amber-400", tip: "text-emerald-400" }[type]
  return (
    <div className={`p-4 rounded-lg border border-[#22222A] border-l-4 bg-[#121216] ${border}`}>
      <div className={`text-xs font-semibold mb-1 ${ic}`}>{title}</div>
      <div className="text-xs text-[#8F8F9D] leading-relaxed">{children}</div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-semibold text-[#EDEDED] mt-8 mb-3 pb-2 border-b border-[#22222A]">{children}</h2>
}

function MetricRow({ metrics }: { metrics: { label: string; value: string; color?: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
      {metrics.map((m) => (
        <div key={m.label} className="p-3 rounded-lg bg-[#121216] border border-[#22222A] text-center">
          <div className="text-xl font-bold font-mono text-[#EDEDED]">{m.value}</div>
          <div className="text-[11px] text-[#8F8F9D] mt-1">{m.label}</div>
        </div>
      ))}
    </div>
  )
}

function CompTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[#22222A] bg-[#121216] my-4">
      <table className="w-full text-left text-xs font-mono">
        <thead className="bg-[#0A0A0C] border-b border-[#22222A] text-[#8F8F9D]">
          <tr>{headers.map(h => <th key={h} className="p-3 font-semibold">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-[#22222A] text-[#EDEDED]">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-[#1A1A20] transition-colors">
              {row.map((cell, j) => <td key={j} className={`p-3 ${j === 0 ? "font-semibold text-[#EDEDED]" : "text-[#8F8F9D]"}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CodeBlock({ tabs, snippets, blockKey, copiedSnippets, onCopy }: {
  tabs: CodeTab[]; snippets: Record<CodeTab, string>; blockKey: string
  copiedSnippets: Record<string, boolean>; onCopy: (text: string, key: string) => void
}) {
  const [activeTab, setActiveTab] = useState<CodeTab>(tabs[0])
  const copyKey = `${blockKey}-${activeTab}`
  return (
    <div className="rounded-lg bg-[#121216] border border-[#22222A] overflow-hidden font-mono text-xs my-4">
      <div className="flex items-center justify-between px-3 py-2 bg-[#0A0A0C] border-b border-[#22222A]">
        <div className="flex items-center gap-1">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-2.5 py-0.5 rounded text-[11px] transition-colors ${activeTab === tab ? "bg-[#22222A] text-white font-semibold" : "text-[#8F8F9D] hover:text-[#EDEDED]"}`}>{tab}</button>
          ))}
        </div>
        <button onClick={() => onCopy(snippets[activeTab], copyKey)} className="flex items-center gap-1 text-[#8F8F9D] hover:text-white transition-colors text-[11px]">
          {copiedSnippets[copyKey] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedSnippets[copyKey] ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto leading-relaxed text-[#EDEDED]">
        <pre className="whitespace-pre">{snippets[activeTab]}</pre>
      </div>
    </div>
  )
}

/* ── PAGES ── */

function PageWelcome({ nav, copiedSnippets, onCopy }: { nav:(r:Route)=>void; copiedSnippets:Record<string,boolean>; onCopy:(t:string,k:string)=>void }) {
  const pillars = [
    { title:"1. Sales Engine", desc:"Sub-60-second lead intercept via native Hinglish AI voice calls and simultaneous WhatsApp intro the moment an inquiry lands.", link:"/docs/sales/speed-to-lead", label:"Speed-to-Lead Docs →" },
    { title:"2. Follow-Up Engine", desc:"24/7 multi-channel engagement handling after-hours inquiries, objection handling, and fully automated calendar bookings.", link:"/docs/followup/persistence-loop", label:"Follow-Up Loop Docs →" },
    { title:"3. Retention Engine", desc:"Post-sale check-ins, NPS collection, sentiment-triggered escalation, and automated repurchase campaigns.", link:"/docs/retention/client-care", label:"Client Care Docs →" },
  ]
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono text-[#6366F1] uppercase tracking-wider">Getting Started</span>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED] mt-1 tracking-tight">Welcome to Samvaya Platform Documentation</h1>
        <p className="text-sm text-[#8F8F9D] mt-3 leading-relaxed">Samvaya is an autonomous AI sales execution SaaS platform engineered for sub-60-second speed-to-lead qualification, 24/7 follow-up persistence, and predictive client-care retention across omni-channel businesses.</p>
        <div className="flex flex-wrap gap-2 mt-3"><Badge>Voice Latency &lt; 120ms</Badge><Badge>Contact Rate +340%</Badge><Badge>Hinglish + 6 Indian Dialects</Badge></div>
      </div>
      <MetricRow metrics={[{label:"Avg Voice Response Latency",value:"<120ms"},{label:"Speed-to-Lead Contact Rate",value:"68%"},{label:"Lead Recovery on Dormant DB",value:"45%"}]} />
      <SectionTitle>Core Architecture Pillars</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pillars.map(p => (
          <div key={p.title} className="p-4 rounded-lg bg-[#121216] border border-[#22222A] flex flex-col gap-3">
            <div>
              <h3 className="text-sm font-semibold text-[#EDEDED]">{p.title}</h3>
              <p className="text-xs text-[#8F8F9D] mt-2 leading-relaxed">{p.desc}</p>
            </div>
            <button onClick={()=>nav(p.link)} className="text-xs font-medium text-[#8F8F9D] hover:text-[#EDEDED] hover:underline flex items-center gap-1 transition-colors">{p.label}</button>
          </div>
        ))}
      </div>
      <SectionTitle>Quick Guides</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {link:"/docs/getting-started/quickstart",tag:"< 3 MIN SETUP",title:"Developer Quickstart",desc:"Trigger your first autonomous qualification sequence. Bearer auth setup included."},
          {link:"/docs/dev/webhooks",tag:"JSON SCHEMAS",title:"Webhooks & Event Schemas",desc:"Full JSON schemas, event types, retry policies, and failure handling patterns."},
        ].map(c=>(
          <div key={c.link} onClick={()=>nav(c.link)} className="p-4 rounded-lg bg-[#121216] border border-[#22222A] hover:border-[#3A3A44] transition-colors cursor-pointer group">
            <div className="flex items-center justify-between mb-2"><span className="text-[11px] font-mono font-semibold text-[#8F8F9D]">{c.tag}</span><ChevronRight className="w-4 h-4 text-[#8F8F9D] group-hover:text-white transition-colors"/></div>
            <h3 className="text-sm font-medium text-[#EDEDED]">{c.title}</h3>
            <p className="text-xs text-[#8F8F9D] mt-1 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
      <SectionTitle>API Health Check</SectionTitle>
      <CodeBlock tabs={["cURL","Python","Node.js"]}
        snippets={{"cURL":`curl -X GET https://api.samvaya.in/v1/health \\\n  -H "Authorization: Bearer YOUR_SAMVAYA_API_KEY"\n\n# 200 OK\n# { "status": "operational", "latency_p99_ms": 118, "region": "asia-south1" }`,"Python":`import requests\nresp = requests.get(\n    "https://api.samvaya.in/v1/health",\n    headers={"Authorization": "Bearer YOUR_SAMVAYA_API_KEY"}\n)\nprint(resp.json())\n# {'status': 'operational', 'latency_p99_ms': 118}`,"Node.js":`const axios = require('axios');\nconst {data} = await axios.get('https://api.samvaya.in/v1/health',{\n  headers: {'Authorization':'Bearer YOUR_SAMVAYA_API_KEY'}\n});\nconsole.log(data); // { status: 'operational', latency_p99_ms: 118 }`}}
        blockKey="welcome-health" copiedSnippets={copiedSnippets} onCopy={onCopy}/>
    </div>
  )
}

function PageQuickstart({ copiedSnippets, onCopy }: { copiedSnippets:Record<string,boolean>; onCopy:(t:string,k:string)=>void }) {
  const steps = [
    { n:"1", title:"Set Up Authentication", desc:"All requests require a Bearer token in the Authorization header. Obtain your key from Settings → API Keys.",
      blockKey:"qs-auth", tabs:["cURL","Python","Node.js"] as CodeTab[], snippets:{"cURL":`export SAMVAYA_API_KEY="YOUR_SAMVAYA_API_KEY"\necho $SAMVAYA_API_KEY`,"Python":`import os\nos.environ["SAMVAYA_API_KEY"] = "YOUR_SAMVAYA_API_KEY"\napi_key = os.getenv("SAMVAYA_API_KEY")`,"Node.js":`// .env\nSAMVAYA_API_KEY=YOUR_SAMVAYA_API_KEY\n// usage:\nconst apiKey = process.env.SAMVAYA_API_KEY;`} as Record<CodeTab,string>},
    { n:"2", title:"Trigger Speed-to-Lead Sequence", desc:"POST your lead payload. Samvaya initiates the voice call within 450ms of receipt.",
      blockKey:"qs-trigger", tabs:["cURL","Python","Node.js"] as CodeTab[], snippets:{"cURL":`curl -X POST https://api.samvaya.in/v1/sales/trigger \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer YOUR_SAMVAYA_API_KEY" \\\n  -d '{\n    "agent_id": "YOUR_AGENT_ID",\n    "customer": {\n      "name": "Customer Name",\n      "phone": "+919876543210",\n      "channel": "web_form"\n    },\n    "workflow": {\n      "speed_to_lead_target": "<60s",\n      "primary_language": "hi-IN-Hinglish",\n      "auto_booking_enabled": true\n    }\n  }'`,"Python":`import requests, os\n\npayload = {\n    "agent_id": "YOUR_AGENT_ID",\n    "customer": {"name":"Customer Name","phone":"+919876543210","channel":"web_form"},\n    "workflow": {"speed_to_lead_target":"<60s","primary_language":"hi-IN-Hinglish","auto_booking_enabled":True}\n}\nresp = requests.post(\n    "https://api.samvaya.in/v1/sales/trigger",\n    json=payload,\n    headers={"Authorization":f"Bearer {os.getenv('SAMVAYA_API_KEY')}"}\n)\nprint(resp.json())`,"Node.js":`const {data} = await axios.post(\n  'https://api.samvaya.in/v1/sales/trigger',\n  {\n    agent_id:'YOUR_AGENT_ID',\n    customer:{name:'Customer Name',phone:'+919876543210',channel:'web_form'},\n    workflow:{speed_to_lead_target:'<60s',primary_language:'hi-IN-Hinglish',auto_booking_enabled:true}\n  },\n  {headers:{Authorization:\`Bearer \${process.env.SAMVAYA_API_KEY}\`}}\n);\nconsole.log(data);`} as Record<CodeTab,string>},
    { n:"3", title:"Handle the Response", desc:"Samvaya returns a synchronous confirmation payload within 450ms with call_id and transcript webhook URL.",
      blockKey:"qs-response", tabs:["cURL","Python","Node.js"] as CodeTab[], snippets:{"cURL":`# 200 OK\n{\n  "call_id": "call_8f93a1bc7e94",\n  "status": "initiated",\n  "dial_initiated_at_ms": 423,\n  "estimated_pickup_window_sec": 55,\n  "whatsapp_message_id": "wamid.abcXYZ123",\n  "transcript_webhook": "https://api.samvaya.in/v1/transcript/call_8f93a1bc7e94"\n}`,"Python":`# resp.json():\n{\n  "call_id": "call_8f93a1bc7e94",\n  "status": "initiated",\n  "dial_initiated_at_ms": 423,\n  "estimated_pickup_window_sec": 55,\n  "whatsapp_message_id": "wamid.abcXYZ123"\n}`,"Node.js":`// data:\n{\n  call_id: 'call_8f93a1bc7e94',\n  status: 'initiated',\n  dial_initiated_at_ms: 423,\n  estimated_pickup_window_sec: 55,\n  whatsapp_message_id: 'wamid.abcXYZ123'\n}`} as Record<CodeTab,string>},
  ]
  return (
    <div className="space-y-6">
      <div><span className="text-xs font-mono text-[#6366F1] uppercase tracking-wider">Getting Started</span>
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED] mt-1 tracking-tight">Developer Quickstart</h1>
      <p className="text-sm text-[#8F8F9D] mt-2 leading-relaxed">Initialize your environment and trigger an autonomous sales execution workflow in under 3 minutes.</p></div>
      {steps.map(s=>(
        <div key={s.n}>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-[#1A1A20] text-[#8F8F9D] font-mono text-xs flex items-center justify-center font-bold border border-[#2E2E38]">{s.n}</span>
            <h2 className="text-sm font-semibold text-[#EDEDED]">{s.title}</h2>
          </div>
          <p className="text-xs text-[#8F8F9D] leading-relaxed mb-2">{s.desc}</p>
          <CodeBlock tabs={s.tabs} snippets={s.snippets} blockKey={s.blockKey} copiedSnippets={copiedSnippets} onCopy={onCopy}/>
        </div>
      ))}
      <Callout type="info" title="Payload Processing Telemetry">Samvaya's orchestrator initiates the call and returns confirmation within <strong>450ms</strong>. The AI caller connects the customer within <strong>60 seconds</strong>.</Callout>
    </div>
  )
}

function PageArchitecture({ copiedSnippets, onCopy }: { copiedSnippets:Record<string,boolean>; onCopy:(t:string,k:string)=>void }) {
  return (
    <div className="space-y-6">
      <div><span className="text-xs font-mono text-[#6366F1] uppercase tracking-wider">Getting Started</span>
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED] mt-1 tracking-tight">Architecture & Core Pillars</h1>
      <p className="text-sm text-[#8F8F9D] mt-2 leading-relaxed">A technical breakdown of Samvaya's three-engine architecture and the infrastructure stack powering sub-120ms voice latency.</p></div>
      <MetricRow metrics={[{label:"Full-Duplex Voice RTT",value:"<120ms",color:"indigo"},{label:"Enterprise Concurrent Calls",value:"∞",color:"emerald"},{label:"Uptime SLA",value:"99.9%",color:"amber"}]}/>
      <SectionTitle>Execution Layer Breakdown</SectionTitle>
      <div className="space-y-2">
        {[
          {step:"01",name:"Ingestion Layer",desc:"Multi-source webhook ingestion (Meta, Google, Custom APIs). Deduplication + enrichment in <50ms via Redis-backed lead cache."},
          {step:"02",name:"Orchestration Engine",desc:"Stateful workflow engine determining execution path: voice call, WhatsApp, SMS, or multi-channel simultaneous dispatch."},
          {step:"03",name:"Voice Telephony Stack",desc:"Sub-120ms SIP bridge using BYOC or Samvaya-managed routes. Custom STT/TTS pipeline trained on 10M+ Indian language voice samples."},
          {step:"04",name:"Context Memory Store",desc:"Lead conversation history, BANT qualifications, and CRM field mapping stored in encrypted vector DB for personalized continuity."},
          {step:"05",name:"Post-Call Action Bus",desc:"Async event bus fires booking confirmations, CRM updates, Slack alerts, and follow-up scheduling within 800ms of call termination."},
        ].map(s=>(
          <div key={s.step} className="flex gap-4 p-4 rounded-lg bg-[#121216] border border-[#22222A]">
            <span className="text-xs font-mono text-[#6366F1] font-bold w-6 shrink-0 pt-0.5">{s.step}</span>
            <div><div className="text-sm font-semibold text-[#EDEDED]">{s.name}</div><div className="text-xs text-[#8F8F9D] mt-0.5 leading-relaxed">{s.desc}</div></div>
          </div>
        ))}
      </div>
      <SectionTitle>Infrastructure Stack</SectionTitle>
      <CompTable headers={["Layer","Technology","Purpose"]} rows={[
        ["Voice STT","Samvaya Acoustic Model v3","Custom Indian dialect speech-to-text"],
        ["Voice TTS","Neural Vocoder + Prosody Engine","Sub-120ms natural speech synthesis"],
        ["Telephony","SIP / WebRTC (BYOC or Managed)","Carrier-grade call routing"],
        ["Orchestration","Temporal Workflow Engine","Stateful, durable execution graphs"],
        ["Lead Store","Redis + Encrypted Vector DB","Sub-10ms lead context retrieval"],
        ["Event Bus","Apache Kafka (Multi-region)","Async post-call action dispatch"],
        ["CRM Sync","REST Webhooks + Native Connectors","HubSpot, Zoho, LeadSquared, Custom"],
      ]}/>
      <CodeBlock tabs={["cURL","Python","Node.js"]}
        snippets={{"cURL":`curl -X GET https://api.samvaya.in/v1/system/status \\\n  -H "Authorization: Bearer YOUR_SAMVAYA_API_KEY"\n\n# {\n#   "engines": {"sales":"operational","followup":"operational","retention":"operational"},\n#   "voice_latency_p99_ms": 117,\n#   "active_concurrent_calls": 142\n# }`,"Python":`resp = requests.get(\n    "https://api.samvaya.in/v1/system/status",\n    headers={"Authorization":f"Bearer {os.getenv('SAMVAYA_API_KEY')}"}\n)\nprint(resp.json()["voice_latency_p99_ms"])  # 117`,"Node.js":`const {data} = await axios.get(\n  'https://api.samvaya.in/v1/system/status',\n  {headers:{Authorization:\`Bearer \${process.env.SAMVAYA_API_KEY}\`}}\n);\nconsole.log(data.voice_latency_p99_ms); // 117`}}
        blockKey="arch-status" copiedSnippets={copiedSnippets} onCopy={onCopy}/>
    </div>
  )
}

function PageAuthentication({ copiedSnippets, onCopy }: { copiedSnippets:Record<string,boolean>; onCopy:(t:string,k:string)=>void }) {
  return (
    <div className="space-y-6">
      <div><span className="text-xs font-mono text-[#6366F1] uppercase tracking-wider">Getting Started</span>
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED] mt-1 tracking-tight">Authentication</h1>
      <p className="text-sm text-[#8F8F9D] mt-2 leading-relaxed">Samvaya uses Bearer token authentication for all API interactions. Tokens are scoped, rotatable, and audited per request.</p></div>
      <SectionTitle>Token Types</SectionTitle>
      <CompTable headers={["Token Type","Scope","Expiry","Usage"]} rows={[
        ["Live Key","Full API access","Never (manual revoke)","Production workloads"],
        ["Sandbox Key","Simulated calls only","30 days auto-expire","Development & testing"],
        ["Webhook Secret","Event signature verification","Configurable","Inbound webhook auth"],
      ]}/>
      <Callout type="warning" title="Security Best Practice">Never embed API keys in frontend code or public repositories. Use environment variables or a secrets manager like AWS Secrets Manager or HashiCorp Vault.</Callout>
      <SectionTitle>Token Generation & Rotation</SectionTitle>
      <CodeBlock tabs={["cURL","Python","Node.js"]}
        snippets={{"cURL":`# Generate a new API key\ncurl -X POST https://api.samvaya.in/v1/auth/keys \\\n  -H "Authorization: Bearer YOUR_SAMVAYA_API_KEY" \\\n  -d '{"name":"production-key-v2","scope":"full"}'\n\n# Rotate\ncurl -X POST https://api.samvaya.in/v1/auth/keys/rotate \\\n  -H "Authorization: Bearer YOUR_SAMVAYA_API_KEY" \\\n  -d '{"key_id":"key_abc123"}'`,"Python":`resp = requests.post(\n    "https://api.samvaya.in/v1/auth/keys",\n    json={"name":"production-key-v2","scope":"full"},\n    headers={"Authorization":f"Bearer {os.getenv('SAMVAYA_API_KEY')}"}\n)\nnew_key = resp.json()["api_key"]  # Store securely`,"Node.js":`const {data} = await axios.post(\n  'https://api.samvaya.in/v1/auth/keys',\n  {name:'production-key-v2',scope:'full'},\n  {headers:{Authorization:\`Bearer \${process.env.SAMVAYA_API_KEY}\`}}\n);\nconst newKey = data.api_key;`}}
        blockKey="auth-token" copiedSnippets={copiedSnippets} onCopy={onCopy}/>
    </div>
  )
}

function PageLimits() {
  return (
    <div className="space-y-6">
      <div><span className="text-xs font-mono text-[#6366F1] uppercase tracking-wider">Getting Started</span>
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED] mt-1 tracking-tight">Rates & System Limits</h1>
      <p className="text-sm text-[#8F8F9D] mt-2 leading-relaxed">Request thresholds, call concurrency caps, and channel limits for all tiers.</p></div>
      <SectionTitle>Account Concurrency Matrix</SectionTitle>
      <CompTable headers={["Account Tier","Max Concurrent Calls","API Request Limit","Webhook Queue Cap","SLA"]} rows={[
        ["Developer / Sandbox","5 channels","30 req / min","50 payloads / min","Best-effort"],
        ["Growth","50 channels","300 req / min","1,000 payloads / min","99.5% uptime"],
        ["Enterprise","Dedicated Pool","Custom Limits","Unlimited Priority Queue","99.9% SLA + Support"],
      ]}/>
      <SectionTitle>Rate Limit Error Handling</SectionTitle>
      <Callout type="warning" title="HTTP 429 – Rate Limit Exceeded">When limits are hit, Samvaya returns <code className="font-mono text-[11px] text-amber-400">HTTP 429</code> with a <code className="font-mono text-[11px] text-amber-400">Retry-After</code> header. Implement exponential backoff in your client.</Callout>
      <div className="rounded-lg bg-[#121216] border border-[#22222A] p-4 font-mono text-xs">
        <pre className="text-[#EDEDED] whitespace-pre leading-relaxed">{`HTTP/1.1 429 Too Many Requests\nRetry-After: 12\nX-RateLimit-Limit: 30\nX-RateLimit-Remaining: 0\n\n{\n  "error": "rate_limit_exceeded",\n  "retry_after_sec": 12,\n  "upgrade_url": "https://samvaya.in/pricing"\n}`}</pre>
      </div>
    </div>
  )
}

function PageSpeedToLead({ copiedSnippets, onCopy }: { copiedSnippets:Record<string,boolean>; onCopy:(t:string,k:string)=>void }) {
  return (
    <div className="space-y-6">
      <div><span className="text-xs font-mono text-[#6366F1] uppercase tracking-wider">Sales Engine</span>
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED] mt-1 tracking-tight">Sub-60s Speed-to-Lead Intercept Engine</h1>
      <div className="flex flex-wrap gap-2 mt-2"><Badge>Ingestion &lt; 450ms</Badge><Badge>Contact Rate +340%</Badge><Badge>Zero Human Latency</Badge></div>
      <p className="text-sm text-[#8F8F9D] mt-3 leading-relaxed">Guarantees that inbound form fills, ad leads, or website inquiries are called, qualified, and routed via autonomous AI voice agents within <strong className="text-[#EDEDED]">450 milliseconds</strong> of payload receipt — reaching the customer in under 60 seconds total.</p></div>
      <MetricRow metrics={[{label:"Payload-to-Dial Latency",value:"< 450ms",color:"indigo"},{label:"Customer Pickup Window",value:"< 60s",color:"emerald"},{label:"Contact Rate Uplift",value:"+340%",color:"amber"}]}/>
      <SectionTitle>How It Works</SectionTitle>
      <div className="space-y-2">
        {[
          {n:"1",title:"Webhook Ingestion",desc:"Inbound lead payloads from Meta Ads, Google Forms, Webflow, or custom APIs hit POST /v1/sales/trigger within milliseconds of form submission."},
          {n:"2",title:"Context Enrichment",desc:"Samvaya enriches lead history, calculates IST local time, checks regional dialect preferences (Hinglish, Tamil, Marathi), and selects the optimal carrier route."},
          {n:"3",title:"Sub-120ms Voice Initiation",desc:"The telephony orchestrator fires an outbound SIP call using BYOC or Samvaya's high-speed voice routes. Full-duplex audio established in <120ms RTT."},
          {n:"4",title:"Simultaneous WhatsApp Dispatch",desc:"A personalized WhatsApp intro card with the customer's name, business context, and media is dispatched while the SIP call is still dialing."},
        ].map(s=>(
          <div key={s.n} className="flex gap-4 p-4 rounded-lg bg-[#121216] border border-[#22222A]">
            <span className="w-6 h-6 shrink-0 rounded-full bg-[#1A1A20] text-[#8F8F9D] font-mono text-xs flex items-center justify-center font-bold border border-[#2E2E38]">{s.n}</span>
            <div><div className="text-sm font-semibold text-[#EDEDED]">{s.title}</div><div className="text-xs text-[#8F8F9D] mt-0.5 leading-relaxed">{s.desc}</div></div>
          </div>
        ))}
      </div>
      <SectionTitle>Competitive Differentiation</SectionTitle>
      <CompTable headers={["Feature","Traditional SDR","Generic AI Voice","Samvaya"]} rows={[
        ["Response Latency","2–24 Hours","3–8 Seconds","< 450ms / < 60s Call"],
        ["Voice RTT","N/A (Human)","800ms–1,200ms","< 120ms Full-Duplex"],
        ["Dialect Handling","English Only","Literal Translation","Native Code-Mixed Hinglish"],
        ["Omni-Channel","Manual CRM Logging","Voice Only","Voice + WhatsApp Real-Time"],
        ["After-Hours Leads","Lost / Next Day","Basic Voicemail","Instant 24/7 AI Qualification"],
      ]}/>
      <SectionTitle>API Endpoint</SectionTitle>
      <div className="flex items-center gap-2 text-xs font-mono mb-1">
        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">POST</span>
        <span className="text-[#EDEDED]">https://api.samvaya.in/v1/sales/trigger</span>
      </div>
      <CodeBlock tabs={["cURL","Python","Node.js"]}
        snippets={{"cURL":`curl -X POST https://api.samvaya.in/v1/sales/trigger \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer YOUR_SAMVAYA_API_KEY" \\\n  -d '{\n    "agent_id": "ag_speed_to_lead_v2",\n    "lead": {\n      "name": "Anish Sharma",\n      "phone": "+919876543210",\n      "source": "facebook_lead_ads",\n      "campaign_id": "q3_qcommerce_launch"\n    },\n    "channel_execution": {\n      "voice_call_enabled": true,\n      "whatsapp_followup_enabled": true,\n      "max_dial_duration_sec": 45\n    }\n  }'`,"Python":`payload = {\n    "agent_id": "ag_speed_to_lead_v2",\n    "lead": {\n        "name": "Anish Sharma",\n        "phone": "+919876543210",\n        "source": "facebook_lead_ads",\n        "campaign_id": "q3_qcommerce_launch"\n    },\n    "channel_execution": {"voice_call_enabled":True,"whatsapp_followup_enabled":True,"max_dial_duration_sec":45}\n}\nrequests.post(\n    "https://api.samvaya.in/v1/sales/trigger",\n    json=payload,\n    headers={"Authorization":f"Bearer {os.getenv('SAMVAYA_API_KEY')}"}\n)`,"Node.js":`const {data} = await axios.post(\n  'https://api.samvaya.in/v1/sales/trigger',\n  {\n    agent_id:'ag_speed_to_lead_v2',\n    lead:{name:'Anish Sharma',phone:'+919876543210',source:'facebook_lead_ads',campaign_id:'q3_qcommerce_launch'},\n    channel_execution:{voice_call_enabled:true,whatsapp_followup_enabled:true,max_dial_duration_sec:45}\n  },\n  {headers:{Authorization:\`Bearer \${process.env.SAMVAYA_API_KEY}\`}}\n);`}}
        blockKey="stl-trigger" copiedSnippets={copiedSnippets} onCopy={onCopy}/>
    </div>
  )
}

function PageVoiceQualification({ copiedSnippets, onCopy }: { copiedSnippets:Record<string,boolean>; onCopy:(t:string,k:string)=>void }) {
  return (
    <div className="space-y-6">
      <div><span className="text-xs font-mono text-[#6366F1] uppercase tracking-wider">Sales Engine</span>
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED] mt-1 tracking-tight">Hinglish & Dialect AI Voice Qualification</h1>
      <div className="flex flex-wrap gap-2 mt-2"><Badge>Multi-Lingual STT</Badge><Badge>94% Intent Accuracy</Badge><Badge>&lt; 120ms RTT</Badge></div>
      <p className="text-sm text-[#8F8F9D] mt-3 leading-relaxed">Custom-tuned for code-mixed Indian English, Hinglish, Hindi, Tamil, Telugu, and Kannada. Handles colloquial phrasing, background noise, dynamic interruptions, and tone variations without breakages.</p></div>
      <MetricRow metrics={[{label:"BANT Intent Accuracy",value:"94%",color:"emerald"},{label:"Dialects Supported",value:"7+",color:"indigo"},{label:"CRM Field Auto-Map Rate",value:"98.2%",color:"amber"}]}/>
      <SectionTitle>Technical Speech Pipeline</SectionTitle>
      <div className="space-y-2">
        {[
          {n:"1",title:"Acoustic Adaptation",desc:"Custom STT trained on 10M+ Indian voice samples. Filters vehicle noise, fan noise, and low-bitrate cell networks without word-error-rate degradation."},
          {n:"2",title:"Natural Interruption Handling",desc:"Active-listening pipeline allows customers to interrupt without cutting context. Semantic continuation resumes at the exact interruption point."},
          {n:"3",title:"Bilingual Context Switching",desc:'Detects mid-sentence language switches ("Haan, I want to check pricing for the yearly plan") and responds in the matching dialect automatically.'},
          {n:"4",title:"BANT Extraction & CRM Mapping",desc:"Extracts Budget, Authority, Need, and Timeline signals during the live call and auto-populates CRM fields in HubSpot, LeadSquared, or Zoho in real time."},
        ].map(s=>(
          <div key={s.n} className="flex gap-4 p-4 rounded-lg bg-[#121216] border border-[#22222A]">
            <span className="w-6 h-6 shrink-0 rounded-full bg-[#1A1A20] text-[#8F8F9D] font-mono text-xs flex items-center justify-center font-bold border border-[#2E2E38]">{s.n}</span>
            <div><div className="text-sm font-semibold text-[#EDEDED]">{s.title}</div><div className="text-xs text-[#8F8F9D] mt-0.5 leading-relaxed">{s.desc}</div></div>
          </div>
        ))}
      </div>
      <SectionTitle>Supported Languages & Dialects</SectionTitle>
      <CompTable headers={["Language","Code","Code-Mix Support","Accuracy"]} rows={[
        ["Hinglish","hi-IN-hinglish","English + Hindi mix","96.4%"],
        ["Hindi","hi-IN","Partial","97.1%"],
        ["Tamil","ta-IN","Tamil + English","94.8%"],
        ["Telugu","te-IN","Partial","93.9%"],
        ["Kannada","kn-IN","No","92.7%"],
        ["Marathi","mr-IN","Marathi + English","91.3%"],
        ["Indian English","en-IN","All dialects","98.6%"],
      ]}/>
      <CodeBlock tabs={["cURL","Python","Node.js"]}
        snippets={{"cURL":`curl -X POST https://api.samvaya.in/v1/agents/configure \\\n  -H "Authorization: Bearer YOUR_SAMVAYA_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "agent_id": "YOUR_AGENT_ID",\n    "voice_config": {\n      "primary_language": "hi-IN-hinglish",\n      "fallback_language": "en-IN",\n      "interruption_handling": "semantic_continue",\n      "noise_cancellation": true,\n      "bant_extraction": true\n    },\n    "crm_mapping": {\n      "provider": "hubspot",\n      "field_map": {"budget":"deal.amount","timeline":"contact.close_date"}\n    }\n  }'`,"Python":`config = {\n    "agent_id":"YOUR_AGENT_ID",\n    "voice_config":{"primary_language":"hi-IN-hinglish","fallback_language":"en-IN","interruption_handling":"semantic_continue","noise_cancellation":True,"bant_extraction":True},\n    "crm_mapping":{"provider":"hubspot","field_map":{"budget":"deal.amount","timeline":"contact.close_date"}}\n}\nrequests.post("https://api.samvaya.in/v1/agents/configure",json=config,\n    headers={"Authorization":f"Bearer {os.getenv('SAMVAYA_API_KEY')}"})`,"Node.js":`await axios.post(\n  'https://api.samvaya.in/v1/agents/configure',\n  {\n    agent_id:'YOUR_AGENT_ID',\n    voice_config:{primary_language:'hi-IN-hinglish',fallback_language:'en-IN',interruption_handling:'semantic_continue',bant_extraction:true}\n  },\n  {headers:{Authorization:\`Bearer \${process.env.SAMVAYA_API_KEY}\`}}\n);`}}
        blockKey="vq-config" copiedSnippets={copiedSnippets} onCopy={onCopy}/>
    </div>
  )
}

function PageOmniIntercept({ copiedSnippets, onCopy }: { copiedSnippets:Record<string,boolean>; onCopy:(t:string,k:string)=>void }) {
  return (
    <div className="space-y-6">
      <div><span className="text-xs font-mono text-[#6366F1] uppercase tracking-wider">Sales Engine</span>
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED] mt-1 tracking-tight">Omni-Channel Lead Intercept</h1>
      <div className="flex flex-wrap gap-2 mt-2"><Badge>Voice + WhatsApp</Badge><Badge>SMS + Email Fallback</Badge></div>
      <p className="text-sm text-[#8F8F9D] mt-3 leading-relaxed">A single inbound inquiry triggers coordinated, personalized outreach across voice, WhatsApp, SMS, and email — all dispatched simultaneously within seconds of lead receipt.</p></div>
      <SectionTitle>Execution Channel Priority</SectionTitle>
      <CompTable headers={["Priority","Channel","Trigger Window","Personalization"]} rows={[
        ["1st","Voice Call (SIP/PSTN)","0–60 seconds","Name, source, dialect"],
        ["2nd","WhatsApp Business Message","0–90 seconds (parallel)","Custom media card + CTA"],
        ["3rd","SMS Fallback","If no WhatsApp delivery","Short URL + name"],
        ["4th","Email (HTML Branded)","T+5 minutes","Proposal / brochure attachment"],
      ]}/>
      <Callout type="tip" title="Parallel Dispatch Architecture">Voice and WhatsApp are dispatched in parallel. If the call goes to voicemail, the WhatsApp message serves as an immediate text touchpoint with the same context.</Callout>
      <SectionTitle>Omni-Channel Trigger API</SectionTitle>
      <CodeBlock tabs={["cURL","Python","Node.js"]}
        snippets={{"cURL":`curl -X POST https://api.samvaya.in/v1/sales/omni-trigger \\\n  -H "Authorization: Bearer YOUR_SAMVAYA_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "agent_id": "YOUR_AGENT_ID",\n    "lead": {"name":"Priya Kapoor","phone":"+919876543210","email":"priya@example.com"},\n    "channels": {\n      "voice": {"enabled":true,"max_attempts":2},\n      "whatsapp": {"enabled":true,"template_id":"intro_card_v3"},\n      "sms": {"enabled":true,"fallback_only":true},\n      "email": {"enabled":true,"delay_minutes":5}\n    }\n  }'`,"Python":`payload = {\n    "agent_id":"YOUR_AGENT_ID",\n    "lead":{"name":"Priya Kapoor","phone":"+919876543210","email":"priya@example.com"},\n    "channels":{"voice":{"enabled":True,"max_attempts":2},"whatsapp":{"enabled":True,"template_id":"intro_card_v3"},"sms":{"enabled":True,"fallback_only":True},"email":{"enabled":True,"delay_minutes":5}}\n}\nrequests.post("https://api.samvaya.in/v1/sales/omni-trigger",json=payload,headers={"Authorization":f"Bearer {os.getenv('SAMVAYA_API_KEY')}"})`,"Node.js":`await axios.post(\n  'https://api.samvaya.in/v1/sales/omni-trigger',\n  {agent_id:'YOUR_AGENT_ID',lead:{name:'Priya Kapoor',phone:'+919876543210'},channels:{voice:{enabled:true,max_attempts:2},whatsapp:{enabled:true,template_id:'intro_card_v3'}}},\n  {headers:{Authorization:\`Bearer \${process.env.SAMVAYA_API_KEY}\`}}\n);`}}
        blockKey="omni-trigger" copiedSnippets={copiedSnippets} onCopy={onCopy}/>
    </div>
  )
}

function PagePersistenceLoop({ copiedSnippets, onCopy }: { copiedSnippets:Record<string,boolean>; onCopy:(t:string,k:string)=>void }) {
  return (
    <div className="space-y-6">
      <div><span className="text-xs font-mono text-[#6366F1] uppercase tracking-wider">Follow-Up Engine</span>
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED] mt-1 tracking-tight">24/7 Autonomous Persistence Loop</h1>
      <div className="flex flex-wrap gap-2 mt-2"><Badge>Multi-Touch Automation</Badge><Badge>70% Re-engagement Rate</Badge><Badge>DNC-Compliant</Badge></div>
      <p className="text-sm text-[#8F8F9D] mt-3 leading-relaxed">The Persistence Loop continuously tracks engagement across days and weeks, scheduling strategic multi-channel touchpoints based on user intent signals and behavioral triggers.</p></div>
      <MetricRow metrics={[{label:"Unreachable Lead Recovery",value:"45%",color:"emerald"},{label:"Avg Touches Before Conversion",value:"3.7",color:"indigo"},{label:"Regulatory Compliance Rate",value:"100%",color:"amber"}]}/>
      <SectionTitle>Strategic Cadence Engine</SectionTitle>
      <div className="space-y-2">
        {[
          {n:"T+0",label:"Day 0 · +5 min",desc:"Instant Hinglish voice call + WhatsApp intro card with personalized greeting and company context."},
          {n:"T+1",label:"Day 1 · 10:00 AM",desc:"Contextual WhatsApp message with video overview, PDF brochure, or product demonstration link."},
          {n:"T+3",label:"Day 3 · 4:00 PM",desc:'Soft check-in voice call: "Did you get a chance to review the proposal we sent?"'},
          {n:"T+7",label:"Day 7 · 11:00 AM",desc:"Incentive or limited-time discount offer trigger. If accepted, routes directly to booking flow."},
        ].map(s=>(
          <div key={s.n} className="flex gap-4 p-4 rounded-lg bg-[#121216] border border-[#22222A] items-start">
            <div className="shrink-0 w-14">
              <div className="text-xs font-mono font-bold text-[#6366F1]">{s.n}</div>
              <div className="text-[10px] text-[#8F8F9D] font-mono mt-0.5">{s.label}</div>
            </div>
            <div className="text-xs text-[#8F8F9D] leading-relaxed border-l border-[#22222A] pl-4">{s.desc}</div>
          </div>
        ))}
      </div>
      <Callout type="tip" title="Smart Time-Zone & Hour Guard">Automatically respects TRAI/DND regulatory calling windows, customer IST local time, and callback preferences. No calls before 9:00 AM or after 9:00 PM.</Callout>
      <SectionTitle>Enroll Lead in Persistence Loop</SectionTitle>
      <CodeBlock tabs={["cURL","Python","Node.js"]}
        snippets={{"cURL":`curl -X POST https://api.samvaya.in/v1/followup/enroll \\\n  -H "Authorization: Bearer YOUR_SAMVAYA_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "lead_id": "lead_8f93a1bc",\n    "cadence_template": "standard_7_day",\n    "personalization": {\n      "product_name": "Samvaya Growth Plan",\n      "discount_trigger_day": 7,\n      "discount_percent": 15\n    },\n    "compliance": {"respect_dnd":true,"calling_window":"09:00-21:00-IST"}\n  }'`,"Python":`payload={"lead_id":"lead_8f93a1bc","cadence_template":"standard_7_day","personalization":{"product_name":"Samvaya Growth Plan","discount_trigger_day":7,"discount_percent":15},"compliance":{"respect_dnd":True,"calling_window":"09:00-21:00-IST"}}\nrequests.post("https://api.samvaya.in/v1/followup/enroll",json=payload,headers={"Authorization":f"Bearer {os.getenv('SAMVAYA_API_KEY')}"})`,"Node.js":`await axios.post(\n  'https://api.samvaya.in/v1/followup/enroll',\n  {lead_id:'lead_8f93a1bc',cadence_template:'standard_7_day',personalization:{product_name:'Samvaya Growth Plan',discount_trigger_day:7,discount_percent:15},compliance:{respect_dnd:true,calling_window:'09:00-21:00-IST'}},\n  {headers:{Authorization:\`Bearer \${process.env.SAMVAYA_API_KEY}\`}}\n);`}}
        blockKey="pl-enroll" copiedSnippets={copiedSnippets} onCopy={onCopy}/>
    </div>
  )
}

function PageAutoBooking({ copiedSnippets, onCopy }: { copiedSnippets:Record<string,boolean>; onCopy:(t:string,k:string)=>void }) {
  return (
    <div className="space-y-6">
      <div><span className="text-xs font-mono text-[#6366F1] uppercase tracking-wider">Follow-Up Engine</span>
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED] mt-1 tracking-tight">WhatsApp Sync & Calendar Auto-Booking</h1>
      <div className="flex flex-wrap gap-2 mt-2"><Badge>Google & Outlook Calendar API</Badge><Badge>WhatsApp Meta Business API</Badge></div>
      <p className="text-sm text-[#8F8F9D] mt-3 leading-relaxed">Convert verbal interest into booked slots instantly. When an AI agent secures commitment on a phone call, it negotiates times, queries calendar APIs, and sends .ics invites and WhatsApp confirmations — all within the live conversation.</p></div>
      <SectionTitle>Booking Execution Sequence</SectionTitle>
      <div className="space-y-2">
        {[
          {n:"1",desc:"Real-time calendar availability query via Google Calendar / Microsoft Outlook APIs during the live call (<200ms query RTT)."},
          {n:"2",desc:"Agent verbally offers two optimal time slots based on the customer's stated preferred day and time window."},
          {n:"3",desc:"Issues Google Meet / Zoom link, .ics invite, and an interactive WhatsApp button card with Confirm and Reschedule options."},
          {n:"4",desc:"Fires a post-booking webhook to your CRM updating deal stage, meeting URL, and attendee confirmation status within 800ms."},
        ].map(s=>(
          <div key={s.n} className="flex gap-4 p-4 rounded-lg bg-[#121216] border border-[#22222A]">
            <span className="w-6 h-6 shrink-0 rounded-full bg-[#1A1A20] text-[#8F8F9D] font-mono text-xs flex items-center justify-center font-bold border border-[#2E2E38]">{s.n}</span>
            <p className="text-xs text-[#8F8F9D] leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
      <SectionTitle>Calendar Sync API</SectionTitle>
      <div className="flex items-center gap-2 text-xs font-mono mb-2">
        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">POST</span>
        <span className="text-[#EDEDED]">https://api.samvaya.in/v1/booking/calendar-sync</span>
      </div>
      <CodeBlock tabs={["cURL","Python","Node.js"]}
        snippets={{"cURL":`curl -X POST https://api.samvaya.in/v1/booking/calendar-sync \\\n  -H "Authorization: Bearer YOUR_SAMVAYA_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "call_id": "call_8f93a1bc",\n    "calendar_provider": "google_workspace",\n    "host_email": "sales_exec@company.com",\n    "attendee_phone": "+919876543210",\n    "slot_selected": "2026-10-05T14:30:00+05:30",\n    "meeting_type": "google_meet",\n    "send_whatsapp_reminder": true,\n    "reminder_hours_before": 2\n  }'`,"Python":`payload={"call_id":"call_8f93a1bc","calendar_provider":"google_workspace","host_email":"sales_exec@company.com","attendee_phone":"+919876543210","slot_selected":"2026-10-05T14:30:00+05:30","meeting_type":"google_meet","send_whatsapp_reminder":True,"reminder_hours_before":2}\nresp=requests.post("https://api.samvaya.in/v1/booking/calendar-sync",json=payload,headers={"Authorization":f"Bearer {os.getenv('SAMVAYA_API_KEY')}"})\nprint(resp.json()["booking_id"])  # bk_1a2b3c4d`,"Node.js":`const {data}=await axios.post(\n  'https://api.samvaya.in/v1/booking/calendar-sync',\n  {call_id:'call_8f93a1bc',calendar_provider:'google_workspace',host_email:'sales_exec@company.com',attendee_phone:'+919876543210',slot_selected:'2026-10-05T14:30:00+05:30',meeting_type:'google_meet',send_whatsapp_reminder:true},\n  {headers:{Authorization:\`Bearer \${process.env.SAMVAYA_API_KEY}\`}}\n);\nconsole.log(data.booking_id); // bk_1a2b3c4d`}}
        blockKey="cal-sync" copiedSnippets={copiedSnippets} onCopy={onCopy}/>
    </div>
  )
}

function PageRecovery({ copiedSnippets, onCopy }: { copiedSnippets:Record<string,boolean>; onCopy:(t:string,k:string)=>void }) {
  return (
    <div className="space-y-6">
      <div><span className="text-xs font-mono text-[#6366F1] uppercase tracking-wider">Follow-Up Engine</span>
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED] mt-1 tracking-tight">Stale Lead Recovery Engine</h1>
      <div className="flex flex-wrap gap-2 mt-2"><Badge>Lapsed Customer Recovery</Badge><Badge>Live Warm Transfer</Badge><Badge>1/10th Telemarketing Cost</Badge></div>
      <p className="text-sm text-[#8F8F9D] mt-3 leading-relaxed">Re-activate dormant CRM databases and lost opportunities. The Recovery Engine runs targeted micro-campaigns to re-qualify old leads and identify buy-ready prospects without additional headcount.</p></div>
      <MetricRow metrics={[{label:"Dormant Lead Reactivation",value:"45%",color:"emerald"},{label:"Cost vs. Telemarketing",value:"1/10th",color:"indigo"},{label:"Warm Transfer Accuracy",value:"92%",color:"amber"}]}/>
      <Callout type="tip" title="Instant Escalation on Buying Intent">When a dormant lead shows buying intent during a recovery call, Samvaya warm-transfers the live call to an available human sales agent within 3 seconds.</Callout>
      <SectionTitle>Recovery Campaign API</SectionTitle>
      <CodeBlock tabs={["cURL","Python","Node.js"]}
        snippets={{"cURL":`curl -X POST https://api.samvaya.in/v1/recovery/launch \\\n  -H "Authorization: Bearer YOUR_SAMVAYA_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "campaign_name": "Q4 Dormant Win-back",\n    "lead_segment": {"last_contact_before_days":90,"crm_tag":"lost_or_stale"},\n    "recovery_script": "gentle_reconnect_v2",\n    "warm_transfer_on_intent": true,\n    "transfer_to": "+919000000001"\n  }'`,"Python":`payload={"campaign_name":"Q4 Dormant Win-back","lead_segment":{"last_contact_before_days":90,"crm_tag":"lost_or_stale"},"recovery_script":"gentle_reconnect_v2","warm_transfer_on_intent":True,"transfer_to":"+919000000001"}\nrequests.post("https://api.samvaya.in/v1/recovery/launch",json=payload,headers={"Authorization":f"Bearer {os.getenv('SAMVAYA_API_KEY')}"})`,"Node.js":`await axios.post(\n  'https://api.samvaya.in/v1/recovery/launch',\n  {campaign_name:'Q4 Dormant Win-back',lead_segment:{last_contact_before_days:90,crm_tag:'lost_or_stale'},recovery_script:'gentle_reconnect_v2',warm_transfer_on_intent:true,transfer_to:'+919000000001'},\n  {headers:{Authorization:\`Bearer \${process.env.SAMVAYA_API_KEY}\`}}\n);`}}
        blockKey="recovery-launch" copiedSnippets={copiedSnippets} onCopy={onCopy}/>
    </div>
  )
}

function PageClientCare({ copiedSnippets, onCopy }: { copiedSnippets:Record<string,boolean>; onCopy:(t:string,k:string)=>void }) {
  return (
    <div className="space-y-6">
      <div><span className="text-xs font-mono text-[#6366F1] uppercase tracking-wider">Retention Engine</span>
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED] mt-1 tracking-tight">Predictive Client-Care & NPS Engine</h1>
      <div className="flex flex-wrap gap-2 mt-2"><Badge>Churn Prevention AI</Badge><Badge>Sentiment Scoring</Badge><Badge>Auto-Escalation</Badge></div>
      <p className="text-sm text-[#8F8F9D] mt-3 leading-relaxed">Proactive post-sale check-ins, onboarding guidance, and CSAT/NPS collection via AI voice. Detect churn risks before they happen by evaluating voice sentiment, usage metrics, and conversation tone.</p></div>
      <SectionTitle>Churn Detection Signals</SectionTitle>
      <CompTable headers={["Signal","Method","Threshold","Action"]} rows={[
        ["Negative Voice Sentiment","Acoustic tone analysis","Score < 0.35","Escalate to Account Manager"],
        ["Low NPS Score","Post-call WhatsApp survey","Score < 6","Schedule human follow-up"],
        ["Missed Renewal Intent","Call transcript NLP","No affirmative keyword","Trigger discount offer"],
        ["Usage Drop","CRM / product usage webhook","> 30% week-over-week","Send re-onboarding sequence"],
      ]}/>
      <Callout type="warning" title="Escalation Webhook Required">Configure a Slack or email escalation webhook endpoint to receive real-time alerts when churn risk is detected. Without this, negative-sentiment calls will be logged but not acted upon.</Callout>
      <CodeBlock tabs={["cURL","Python","Node.js"]}
        snippets={{"cURL":`curl -X POST https://api.samvaya.in/v1/retention/checkin \\\n  -H "Authorization: Bearer YOUR_SAMVAYA_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "customer_id": "cust_98xyz",\n    "checkin_type": "nps_30_day",\n    "escalation_webhook": "https://hooks.slack.com/services/YOUR/SLACK/HOOK",\n    "voice_sentiment_threshold": 0.35\n  }'`,"Python":`payload={"customer_id":"cust_98xyz","checkin_type":"nps_30_day","escalation_webhook":"https://hooks.slack.com/services/YOUR/SLACK/HOOK","voice_sentiment_threshold":0.35}\nrequests.post("https://api.samvaya.in/v1/retention/checkin",json=payload,headers={"Authorization":f"Bearer {os.getenv('SAMVAYA_API_KEY')}"})`,"Node.js":`await axios.post(\n  'https://api.samvaya.in/v1/retention/checkin',\n  {customer_id:'cust_98xyz',checkin_type:'nps_30_day',escalation_webhook:'https://hooks.slack.com/services/YOUR/SLACK/HOOK',voice_sentiment_threshold:0.35},\n  {headers:{Authorization:\`Bearer \${process.env.SAMVAYA_API_KEY}\`}}\n);`}}
        blockKey="cc-checkin" copiedSnippets={copiedSnippets} onCopy={onCopy}/>
    </div>
  )
}

function PageRepurchase({ copiedSnippets, onCopy }: { copiedSnippets:Record<string,boolean>; onCopy:(t:string,k:string)=>void }) {
  return (
    <div className="space-y-6">
      <div><span className="text-xs font-mono text-[#6366F1] uppercase tracking-wider">Retention Engine</span>
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED] mt-1 tracking-tight">Repeat Orders & Subscription Renewals</h1>
      <div className="flex flex-wrap gap-2 mt-2"><Badge>Revenue Expansion</Badge><Badge>Automated Renewals</Badge><Badge>WhatsApp Payment Link</Badge></div>
      <p className="text-sm text-[#8F8F9D] mt-3 leading-relaxed">Automate repeat orders, subscription renewals, and replenishment reminders for e-commerce, D2C, and SaaS products. Trigger intelligent outbound calls timed precisely to each customer's consumption cycle.</p></div>
      <SectionTitle>Predictive Replenishment Flow</SectionTitle>
      <div className="space-y-2">
        {[
          {n:"1",desc:"Predictive engine calculates average consumption cycle (e.g., 30-day supply for D2C) based on historical order data."},
          {n:"2",desc:"Automated outbound call triggers on Day 25, reminding the customer their supply is running low and confirming the next order."},
          {n:"3",desc:"Customer confirms verbally or via a WhatsApp payment link / Razorpay link embedded in the conversation flow."},
          {n:"4",desc:"Order confirmation, delivery ETA, and receipt are sent via WhatsApp within 60 seconds of verbal confirmation."},
        ].map(s=>(
          <div key={s.n} className="flex gap-4 p-4 rounded-lg bg-[#121216] border border-[#22222A]">
            <span className="w-6 h-6 shrink-0 rounded-full bg-[#1A1A20] text-[#8F8F9D] font-mono text-xs flex items-center justify-center font-bold border border-[#2E2E38]">{s.n}</span>
            <p className="text-xs text-[#8F8F9D] leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
      <CodeBlock tabs={["cURL","Python","Node.js"]}
        snippets={{"cURL":`curl -X POST https://api.samvaya.in/v1/retention/repurchase \\\n  -H "Authorization: Bearer YOUR_SAMVAYA_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "customer_id": "cust_12abc",\n    "product_sku": "SKU_PROTEIN_1KG",\n    "consumption_cycle_days": 30,\n    "trigger_on_day": 25,\n    "payment_link_provider": "razorpay",\n    "send_whatsapp_confirmation": true\n  }'`,"Python":`payload={"customer_id":"cust_12abc","product_sku":"SKU_PROTEIN_1KG","consumption_cycle_days":30,"trigger_on_day":25,"payment_link_provider":"razorpay","send_whatsapp_confirmation":True}\nrequests.post("https://api.samvaya.in/v1/retention/repurchase",json=payload,headers={"Authorization":f"Bearer {os.getenv('SAMVAYA_API_KEY')}"})`,"Node.js":`await axios.post(\n  'https://api.samvaya.in/v1/retention/repurchase',\n  {customer_id:'cust_12abc',product_sku:'SKU_PROTEIN_1KG',consumption_cycle_days:30,trigger_on_day:25,payment_link_provider:'razorpay',send_whatsapp_confirmation:true},\n  {headers:{Authorization:\`Bearer \${process.env.SAMVAYA_API_KEY}\`}}\n);`}}
        blockKey="repurchase-trigger" copiedSnippets={copiedSnippets} onCopy={onCopy}/>
    </div>
  )
}

function PageWebhooks({ copiedSnippets, onCopy }: { copiedSnippets:Record<string,boolean>; onCopy:(t:string,k:string)=>void }) {
  return (
    <div className="space-y-6">
      <div><span className="text-xs font-mono text-[#6366F1] uppercase tracking-wider">Developer Tools</span>
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED] mt-1 tracking-tight">Webhooks & Real-Time Events</h1>
      <div className="flex flex-wrap gap-2 mt-2"><Badge>HMAC-SHA256 Signed</Badge><Badge>Exponential Backoff Retry</Badge></div>
      <p className="text-sm text-[#8F8F9D] mt-3 leading-relaxed">Samvaya fires real-time event webhooks to your endpoint for every meaningful state change in a lead's lifecycle. All payloads are HMAC-SHA256 signed for security verification.</p></div>
      <SectionTitle>Event Types</SectionTitle>
      <CompTable headers={["Event","Trigger","Key Payload Fields"]} rows={[
        ["call.initiated","Agent dials the lead","call_id, agent_id, phone, timestamp"],
        ["call.connected","Lead picks up","call_id, pickup_latency_ms"],
        ["call.completed","Call ends normally","call_id, duration_sec, outcome, bant_scores"],
        ["call.voicemail","No answer / voicemail","call_id, retry_scheduled_at"],
        ["booking.confirmed","Meeting booked on calendar","booking_id, slot, calendar_link"],
        ["followup.enrolled","Lead added to cadence","lead_id, cadence_template, next_touch_at"],
        ["sentiment.alert","Negative churn signal detected","customer_id, sentiment_score, escalation_fired"],
      ]}/>
      <SectionTitle>Signature Verification</SectionTitle>
      <CodeBlock tabs={["cURL","Python","Node.js"]}
        snippets={{"cURL":`# Headers on every webhook:\n# X-Samvaya-Signature: sha256=HMAC_HEX_DIGEST\n# X-Samvaya-Timestamp: 1727888412\n# X-Samvaya-Event: call.completed\n\n# Signed string: "timestamp.raw_body"\n# Verify: sha256(secret, signed_string) == X-Samvaya-Signature`,"Python":`import hmac, hashlib\n\ndef verify_webhook(payload_body:bytes, timestamp:str, signature:str, secret:str) -> bool:\n    signed_content = f"{timestamp}.".encode() + payload_body\n    expected = hmac.new(secret.encode(), signed_content, hashlib.sha256).hexdigest()\n    return hmac.compare_digest(f"sha256={expected}", signature)`,"Node.js":`const crypto = require('crypto');\n\nfunction verifyWebhook(rawBody, timestamp, signature, secret) {\n  const signedContent = \`\${timestamp}.\${rawBody}\`;\n  const expected = 'sha256=' + crypto.createHmac('sha256', secret).update(signedContent).digest('hex');\n  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));\n}`}}
        blockKey="wh-verify" copiedSnippets={copiedSnippets} onCopy={onCopy}/>
    </div>
  )
}

function PageBYOC({ copiedSnippets, onCopy }: { copiedSnippets:Record<string,boolean>; onCopy:(t:string,k:string)=>void }) {
  return (
    <div className="space-y-6">
      <div><span className="text-xs font-mono text-[#6366F1] uppercase tracking-wider">Developer Tools</span>
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED] mt-1 tracking-tight">BYOC Telephony Setup</h1>
      <div className="flex flex-wrap gap-2 mt-2"><Badge>SIP Trunk Integration</Badge><Badge>Twilio / Exotel / Plivo</Badge><Badge>DID Pool Management</Badge></div>
      <p className="text-sm text-[#8F8F9D] mt-3 leading-relaxed">Bring Your Own Carrier (BYOC) connects Samvaya's AI voice engine to your existing SIP trunks or telephony provider, reducing per-minute call costs and maintaining your DID number pool.</p></div>
      <SectionTitle>Supported Carriers</SectionTitle>
      <CompTable headers={["Provider","Protocol","Auth Method","Setup Time"]} rows={[
        ["Twilio","SIP / REST","Account SID + Auth Token","~15 minutes"],
        ["Exotel","SIP","API Key + SID","~20 minutes"],
        ["Plivo","SIP / REST","Auth ID + Auth Token","~15 minutes"],
        ["Custom SIP Trunk","SIP","Credentials + FQDN","~30 minutes"],
        ["Airtel IQ","REST","API Key","~30 minutes"],
      ]}/>
      <SectionTitle>BYOC Registration API</SectionTitle>
      <CodeBlock tabs={["cURL","Python","Node.js"]}
        snippets={{"cURL":`curl -X POST https://api.samvaya.in/v1/byoc/register \\\n  -H "Authorization: Bearer YOUR_SAMVAYA_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "provider": "twilio",\n    "credentials": {"account_sid":"YOUR_TWILIO_SID","auth_token":"YOUR_TWILIO_TOKEN"},\n    "did_pool": ["+918000000001","+918000000002"],\n    "region": "asia-south1",\n    "fallback_to_samvaya": true\n  }'`,"Python":`payload={"provider":"twilio","credentials":{"account_sid":"YOUR_TWILIO_SID","auth_token":"YOUR_TWILIO_TOKEN"},"did_pool":["+918000000001","+918000000002"],"region":"asia-south1","fallback_to_samvaya":True}\nrequests.post("https://api.samvaya.in/v1/byoc/register",json=payload,headers={"Authorization":f"Bearer {os.getenv('SAMVAYA_API_KEY')}"})`,"Node.js":`await axios.post(\n  'https://api.samvaya.in/v1/byoc/register',\n  {provider:'twilio',credentials:{account_sid:'YOUR_TWILIO_SID',auth_token:'YOUR_TWILIO_TOKEN'},did_pool:['+918000000001','+918000000002'],region:'asia-south1',fallback_to_samvaya:true},\n  {headers:{Authorization:\`Bearer \${process.env.SAMVAYA_API_KEY}\`}}\n);`}}
        blockKey="byoc-register" copiedSnippets={copiedSnippets} onCopy={onCopy}/>
    </div>
  )
}

function PageSupport() {
  return (
    <div className="space-y-6">
      <div><span className="text-xs font-mono text-[#6366F1] uppercase tracking-wider">Developer Tools</span>
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED] mt-1 tracking-tight">Developer Support & Enterprise Engineering</h1>
      <p className="text-sm text-[#8F8F9D] mt-2 leading-relaxed">Contact the core engineering team for architecture reviews, custom deployment help, or enterprise inquiries.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-lg bg-[#121216] border border-[#22222A] flex flex-col gap-3">
          <div><div className="w-7 h-7 rounded bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center text-[#818CF8] mb-3"><Terminal className="w-4 h-4"/></div>
          <h2 className="text-sm font-semibold text-[#EDEDED]">Engineering & API Integration</h2>
          <a href="mailto:rohit@samvaya.in" className="text-xs font-mono text-[#818CF8] hover:underline mt-1 inline-block font-semibold">rohit@samvaya.in</a></div>
          <div className="text-xs text-[#8F8F9D] leading-relaxed"><strong className="text-[#EDEDED]">Scope includes:</strong>
          <ul className="mt-1.5 space-y-1 list-disc pl-4">
            <li>Webhook debugging & payload validation</li>
            <li>Custom Hinglish voice model fine-tuning</li>
            <li>Sub-120ms latency optimization</li>
            <li>BYOC SIP trunk integration & DID management</li>
            <li>CRM field mapping & connector setup</li>
          </ul></div>
        </div>
        <div className="p-5 rounded-lg bg-[#121216] border border-[#22222A] flex flex-col gap-3">
          <div><div className="w-7 h-7 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3"><Shield className="w-4 h-4"/></div>
          <h2 className="text-sm font-semibold text-[#EDEDED]">Enterprise & Architecture</h2>
          <a href="mailto:ramyabrato@samvaya.in" className="text-xs font-mono text-emerald-400 hover:underline mt-1 inline-block font-semibold">ramyabrato@samvaya.in</a></div>
          <p className="text-xs font-mono text-[#8F8F9D]">Vivekananda Road, Silchar, Assam 788007</p>
          <div className="text-xs text-[#8F8F9D] leading-relaxed"><strong className="text-[#EDEDED]">Scope includes:</strong>
          <ul className="mt-1.5 space-y-1 list-disc pl-4">
            <li>On-premise & VPC deployment architecture</li>
            <li>Dedicated GPU inference cluster setup</li>
            <li>Custom 99.9%+ SLA guarantees</li>
            <li>Data residency & compliance (DPDP / GDPR)</li>
            <li>Multi-region failover configuration</li>
          </ul></div>
        </div>
      </div>
      <Callout type="tip" title="Book a Live Architecture Review">For complex deployments, book a 30-minute technical call at{" "}
        <a href="https://cal.com/samvaya/samvaya" target="_blank" rel="noopener noreferrer" className="text-[#818CF8] hover:underline font-mono">cal.com/samvaya/samvaya</a>
        {" "}— same-day slots available for enterprise evaluations.</Callout>
    </div>
  )
}

/* ── NAV & TOC DATA ── */
const NAV = [
  { key:"getting-started", label:"1. Getting Started", items:[
    {title:"Welcome",route:"/docs/getting-started/welcome"},
    {title:"Quickstart Guide",route:"/docs/getting-started/quickstart"},
    {title:"Architecture & Core Pillars",route:"/docs/getting-started/architecture"},
    {title:"Authentication",route:"/docs/getting-started/authentication"},
    {title:"Rates & System Limits",route:"/docs/getting-started/limits"},
  ]},
  { key:"sales", label:"2. Sales Engine", items:[
    {title:"Sub-60s Speed-to-Lead",route:"/docs/sales/speed-to-lead"},
    {title:"Hinglish AI Voice Qualification",route:"/docs/sales/voice-qualification"},
    {title:"Omni-Channel Lead Intercept",route:"/docs/sales/omni-intercept"},
  ]},
  { key:"followup", label:"3. Follow-Up Engine", items:[
    {title:"24/7 Autonomous Follow-up",route:"/docs/followup/persistence-loop"},
    {title:"WhatsApp & Auto-Booking",route:"/docs/followup/auto-booking"},
    {title:"Re-engagement & Recovery",route:"/docs/followup/recovery"},
  ]},
  { key:"retention", label:"4. Retention Engine", items:[
    {title:"Predictive Client-Care Logic",route:"/docs/retention/client-care"},
    {title:"Repeat Orders & Renewals",route:"/docs/retention/repurchase-engine"},
  ]},
  { key:"dev", label:"5. Developer Tools", items:[
    {title:"Webhooks & Events",route:"/docs/dev/webhooks"},
    {title:"BYOC Telephony Setup",route:"/docs/dev/byoc"},
    {title:"Talk to Us & Support",route:"/docs/dev/support"},
  ]},
]

const TOC: Record<string, string[]> = {
  "/docs/getting-started/welcome":["Overview","Core Pillars","Quick Guides","Health Check"],
  "/docs/getting-started/quickstart":["Authentication","Trigger Sequence","Handle Response"],
  "/docs/getting-started/architecture":["System Overview","Execution Layers","Infrastructure Stack"],
  "/docs/getting-started/authentication":["Token Types","Token Generation"],
  "/docs/getting-started/limits":["Concurrency Matrix","Rate Limit Errors"],
  "/docs/sales/speed-to-lead":["Overview","How It Works","Benchmarks","Comparison","API"],
  "/docs/sales/voice-qualification":["Overview","Speech Pipeline","Dialects","API Config"],
  "/docs/sales/omni-intercept":["Channel Priority","Parallel Dispatch","API"],
  "/docs/followup/persistence-loop":["Overview","Cadence Engine","Compliance","Enroll API"],
  "/docs/followup/auto-booking":["Booking Flow","Calendar API","Code Example"],
  "/docs/followup/recovery":["Overview","Benchmarks","Recovery API"],
  "/docs/retention/client-care":["Churn Signals","Escalation","Check-In API"],
  "/docs/retention/repurchase-engine":["Replenishment Flow","API"],
  "/docs/dev/webhooks":["Event Types","Signature Verification"],
  "/docs/dev/byoc":["Supported Carriers","BYOC Registration"],
  "/docs/dev/support":["Engineering Support","Enterprise Inquiries"],
}

/* ── MAIN EXPORT ── */
export const SamvayaDocsPortal: React.FC<SamvayaDocsPortalProps> = ({ onBackToHome }) => {
  const [activeRoute, setActiveRoute] = useState<Route>("/docs/getting-started/welcome")
  const [expanded, setExpanded] = useState<Record<string,boolean>>({
    "getting-started":true,"sales":true,"followup":true,"retention":true,"dev":true
  })
  const [copiedSnippets, setCopiedSnippets] = useState<Record<string,boolean>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [simOpen, setSimOpen] = useState(false)
  const [simStep, setSimStep] = useState<"idle"|"connecting"|"active">("idle")
  const searchRef = useRef<HTMLInputElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)

  const copy = (text:string, key:string) => {
    navigator.clipboard.writeText(text)
    setCopiedSnippets(p=>({...p,[key]:true}))
    setTimeout(()=>setCopiedSnippets(p=>({...p,[key]:false})),2000)
  }

  const nav = (route:Route) => {
    setActiveRoute(route)
    mainRef.current?.scrollTo({top:0,behavior:"smooth"})
  }

  useEffect(()=>{
    const h = (e:KeyboardEvent)=>{
      if(e.key==="/"&&!["INPUT","TEXTAREA"].includes((e.target as HTMLElement)?.tagName)){
        e.preventDefault(); setSearchOpen(true); setTimeout(()=>searchRef.current?.focus(),50)
      }
      if(e.key==="Escape") setSearchOpen(false)
    }
    window.addEventListener("keydown",h)
    return ()=>window.removeEventListener("keydown",h)
  },[])

  const beginCall = () => {
    setSimOpen(true); setSimStep("connecting")
    setTimeout(()=>setSimStep("active"),2200)
  }

  const renderPage = () => {
    const p={copiedSnippets,onCopy:copy}
    switch(activeRoute){
      case "/docs/getting-started/welcome": return <PageWelcome nav={nav} {...p}/>
      case "/docs/getting-started/quickstart": return <PageQuickstart {...p}/>
      case "/docs/getting-started/architecture": return <PageArchitecture {...p}/>
      case "/docs/getting-started/authentication": return <PageAuthentication {...p}/>
      case "/docs/getting-started/limits": return <PageLimits/>
      case "/docs/sales/speed-to-lead": return <PageSpeedToLead {...p}/>
      case "/docs/sales/voice-qualification": return <PageVoiceQualification {...p}/>
      case "/docs/sales/omni-intercept": return <PageOmniIntercept {...p}/>
      case "/docs/followup/persistence-loop": return <PagePersistenceLoop {...p}/>
      case "/docs/followup/auto-booking": return <PageAutoBooking {...p}/>
      case "/docs/followup/recovery": return <PageRecovery {...p}/>
      case "/docs/retention/client-care": return <PageClientCare {...p}/>
      case "/docs/retention/repurchase-engine": return <PageRepurchase {...p}/>
      case "/docs/dev/webhooks": return <PageWebhooks {...p}/>
      case "/docs/dev/byoc": return <PageBYOC {...p}/>
      case "/docs/dev/support": return <PageSupport/>
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#EDEDED] antialiased flex flex-col" style={{fontFamily:"Inter,system-ui,sans-serif"}}>

      {/* Search Overlay */}
      {searchOpen&&(
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-[12vh]" onClick={()=>setSearchOpen(false)}>
          <div className="w-full max-w-xl mx-4 bg-[#121216] border border-[#22222A] rounded-xl shadow-2xl overflow-hidden" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#22222A]">
              <Search className="w-4 h-4 text-[#8F8F9D] shrink-0"/>
              <input ref={searchRef} type="text" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search documentation..." className="flex-1 bg-transparent text-sm text-[#EDEDED] placeholder-[#8F8F9D] outline-none" style={{fontFamily:"monospace"}}/>
              <button onClick={()=>setSearchOpen(false)} className="text-[#8F8F9D] hover:text-white"><X className="w-4 h-4"/></button>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {NAV.flatMap(g=>g.items).filter(i=>!searchQuery||i.title.toLowerCase().includes(searchQuery.toLowerCase())).map(item=>(
                <button key={item.route} onClick={()=>{nav(item.route);setSearchOpen(false);setSearchQuery("");}}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-xs text-[#8F8F9D] hover:text-[#EDEDED] hover:bg-[#1A1A20] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-[#6366F1] shrink-0"/>{item.title}
                  <span className="ml-auto text-[10px] text-[#8F8F9D]/40 hidden sm:block" style={{fontFamily:"monospace"}}>{item.route}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOP NAV */}
      <header className="sticky top-0 z-50 w-full h-14 bg-[#0A0A0C]/95 backdrop-blur-md border-b border-[#22222A] px-4 lg:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 shrink-0">
          {onBackToHome&&(
            <button type="button" onClick={onBackToHome} className="flex items-center gap-1.5 text-xs text-[#8F8F9D] hover:text-[#EDEDED] transition-colors cursor-pointer py-1 px-2.5 rounded border border-[#22222A] bg-[#121216] hover:bg-[#1A1A20]">
              <ArrowLeft className="w-3.5 h-3.5"/><span className="hidden sm:inline">Back</span>
            </button>
          )}
          <div className="flex items-center gap-2 select-none">
            <span className="font-bold text-lg tracking-tight text-[#EDEDED]">samvaya</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#121216] text-[#8F8F9D] border border-[#22222A] uppercase tracking-wider font-semibold hidden sm:inline" style={{fontFamily:"monospace"}}>DOCS v2.4</span>
          </div>
        </div>
        <button onClick={()=>{setSearchOpen(true);setTimeout(()=>searchRef.current?.focus(),50)}}
          className="hidden md:flex items-center gap-2 flex-1 max-w-sm px-3 h-8 bg-[#121216] border border-[#22222A] rounded-md text-xs text-[#8F8F9D] hover:border-[#6366F1]/40 transition-colors" style={{fontFamily:"monospace"}}>
          <Search className="w-3.5 h-3.5 shrink-0"/>
          <span className="flex-1 text-left">Search documentation...</span>
          <span className="px-1.5 py-0.5 rounded bg-[#0A0A0C] border border-[#22222A] text-[10px] shrink-0">/</span>
        </button>
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#8F8F9D]" style={{fontFamily:"monospace"}}>
            <span className="w-2 h-2 rounded-full bg-emerald-500" style={{animation:"pulse 2s infinite"}}/><span>Operational</span>
          </div>
          <div className="h-4 w-px bg-[#22222A] hidden sm:block"/>
          <button type="button" onClick={beginCall} className="h-8 px-3 rounded-md bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer">
            <PhoneCall className="w-3.5 h-3.5"/><span>Begin Call</span>
          </button>
        </div>
      </header>

      {/* 3-COLUMN */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto flex overflow-hidden">

        {/* LEFT SIDEBAR */}
        <aside className="w-[260px] shrink-0 hidden lg:block border-r border-[#22222A] bg-[#0A0A0C] p-3 py-6 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto space-y-4 select-none" style={{WebkitOverflowScrolling:"touch",overscrollBehavior:"contain"}}>
          {NAV.map(group=>(
            <div key={group.key} className="space-y-0.5">
              <button onClick={()=>setExpanded(p=>({...p,[group.key]:!p[group.key]}))}
                className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-semibold tracking-wider text-[#8F8F9D] uppercase hover:text-[#EDEDED] transition-colors">
                <span>{group.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded[group.key]?"":"-rotate-90"}`}/>
              </button>
              {expanded[group.key]&&(
                <div className="space-y-0.5 pl-1 pt-0.5">
                  {group.items.map(item=>(
                    <button key={item.route} onClick={()=>nav(item.route)}
                      className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors cursor-pointer ${activeRoute===item.route?"bg-[#121216] text-[#EDEDED] font-medium border-l-2 border-[#6366F1] pl-2":"text-[#8F8F9D] hover:text-[#EDEDED] hover:bg-[#121216]/60"}`}>{item.title}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>

        {/* CENTER */}
        <main ref={mainRef} className="flex-1 min-w-0 px-6 sm:px-10 py-8 overflow-y-auto max-h-[calc(100vh-3.5rem)]" style={{WebkitOverflowScrolling:"touch",overscrollBehavior:"contain"}}>
          <div style={{maxWidth:"840px"}}>
            {renderPage()}
            {/* Prev / Next */}
            <div className="flex items-center justify-between mt-12 pt-6 border-t border-[#22222A] text-xs">
              {(()=>{
                const all=NAV.flatMap(g=>g.items)
                const idx=all.findIndex(i=>i.route===activeRoute)
                const prev=all[idx-1]; const next=all[idx+1]
                return (<>
                  {prev?(<button onClick={()=>nav(prev.route)} className="flex items-center gap-1.5 text-[#8F8F9D] hover:text-[#EDEDED] transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5"/>
                    <div className="text-left"><div className="text-[10px] text-[#8F8F9D]/50 uppercase tracking-wide">Previous</div><div>{prev.title}</div></div>
                  </button>):<div/>}
                  {next?(<button onClick={()=>nav(next.route)} className="flex items-center gap-1.5 text-[#8F8F9D] hover:text-[#EDEDED] transition-colors ml-auto">
                    <div className="text-right"><div className="text-[10px] text-[#8F8F9D]/50 uppercase tracking-wide">Next</div><div>{next.title}</div></div>
                    <ChevronRight className="w-3.5 h-3.5"/>
                  </button>):null}
                </>)
              })()}
            </div>
          </div>
        </main>

        {/* RIGHT TOC */}
        <aside className="w-52 shrink-0 hidden xl:block border-l border-[#22222A] bg-[#0A0A0C] p-4 py-6 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto" style={{WebkitOverflowScrolling:"touch",overscrollBehavior:"contain"}}>
          <div className="space-y-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8F8F9D]" style={{fontFamily:"monospace"}}>On This Page</span>
            <ul className="space-y-1.5">
              {(TOC[activeRoute]??[]).map(h=>(
                <li key={h}><span className="block text-[11px] text-[#8F8F9D] hover:text-[#EDEDED] transition-colors cursor-default">{h}</span></li>
              ))}
            </ul>
            <div className="pt-4 border-t border-[#22222A]">
              <a href="mailto:rohit@samvaya.in" className="text-[11px] text-[#6366F1] hover:underline block" style={{fontFamily:"monospace"}}>Get Support →</a>
            </div>
          </div>
        </aside>
      </div>

      {/* CALL SIMULATOR */}
      {simOpen&&(
        <div className="fixed bottom-6 right-6 z-50 w-80 rounded-xl bg-[#121216] border border-[#22222A] p-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#22222A] pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"/>
              <span className="text-xs font-semibold text-[#EDEDED]" style={{fontFamily:"monospace"}}>Samvaya Voice Demo</span>
            </div>
            <button onClick={()=>{setSimOpen(false);setSimStep("idle")}} className="text-[#8F8F9D] hover:text-white"><X className="w-4 h-4"/></button>
          </div>
          {simStep==="connecting"&&(
            <div className="py-6 text-center space-y-2">
              <PhoneCall className="w-6 h-6 text-[#6366F1] mx-auto"/>
              <p className="text-xs text-[#EDEDED]" style={{fontFamily:"monospace"}}>Establishing SIP channel... (~120ms)</p>
              <p className="text-[11px] text-[#8F8F9D]" style={{fontFamily:"monospace"}}>Selecting Hinglish agent v2.4...</p>
            </div>
          )}
          {simStep==="active"&&(
            <div className="space-y-3">
              <div className="p-3 rounded bg-[#0A0A0C] border border-[#22222A] text-[11px] text-emerald-400 leading-relaxed" style={{fontFamily:"monospace"}}>
                "Namaste! Main Samvaya ka AI Voice Agent bol raha hoon. Aapka inquiry receive hua — kya aap abhi baat karna chahenge pricing aur features ke baare mein?"
              </div>
              <div className="text-[10px] text-[#8F8F9D] flex items-center gap-1" style={{fontFamily:"monospace"}}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"/>
                Connected · Latency: 118ms · Hinglish Agent Active
              </div>
              <button onClick={()=>{setSimOpen(false);setSimStep("idle")}} className="w-full py-2 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold hover:bg-red-500/30 transition-colors cursor-pointer">
                End Simulation
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
