import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShieldCheck, FileText, Lock } from "lucide-react"

export type LegalDocType = "privacy" | "terms" | "security" | null

interface LegalModalProps {
  docType: LegalDocType
  onClose: () => void
}

export const LegalModal: React.FC<LegalModalProps> = ({ docType, onClose }) => {
  return (
    <AnimatePresence>
      {Boolean(docType) && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 overflow-y-auto pointer-events-auto">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose} 
            aria-hidden="true"
          />
          {/* Modal Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ 
              type: "spring", 
              damping: 28, 
              stiffness: 350,
              mass: 0.75 
            }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden z-10 flex flex-col max-h-[85vh] my-auto"
          >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50/80 sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            {docType === "privacy" && <ShieldCheck className="w-5 h-5 text-blue-600" />}
            {docType === "terms" && <FileText className="w-5 h-5 text-neutral-700" />}
            {docType === "security" && <Lock className="w-5 h-5 text-emerald-600" />}
            <h3 className="font-['Inter'] font-semibold text-lg text-neutral-900 capitalize">
              {docType === "privacy" && "Privacy Policy"}
              {docType === "terms" && "Terms of Service"}
              {docType === "security" && "Security & Compliance"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-200/70 hover:bg-neutral-300/80 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto font-['Inter'] text-sm leading-relaxed text-neutral-700 space-y-6">
          {docType === "privacy" && (
            <>
              <div>
                <p className="text-xs text-neutral-500 mb-2">Last Updated: September 2026</p>
                <p>
                  At <strong>Samvaya AI</strong> (&quot;Samvaya&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), accessible via <strong>samvaya.in</strong>, 
                  we are deeply committed to safeguarding user data, communications privacy, and voice identity. This Privacy Policy details how 
                  we collect, process, and protect your information across our website and AI Voice Agent infrastructure.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-900 text-base mb-2">1. Information We Collect</h4>
                <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                  <li><strong>Account &amp; Waitlist Info:</strong> Work email address, verified phone number, company name, and vertical.</li>
                  <li><strong>Voice Interaction Data:</strong> Call audio streams, transcriptions, and conversational metadata processed strictly on behalf of the customer business.</li>
                  <li><strong>Technical Telemetry:</strong> IP address, device telemetry, browser type, and latency metrics to maintain sub-second response times.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-900 text-base mb-2">2. How We Use Information</h4>
                <p className="text-neutral-600">
                  We use collected information to provide automated inbound/outbound voice qualification, appointment bookings, platform security, 
                  fraud prevention, and priority waitlist rollout communications. <strong>We do NOT sell personal data or voice recordings to third parties.</strong>
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-900 text-base mb-2">3. Data Retention &amp; Security</h4>
                <p className="text-neutral-600">
                  All conversational transcripts and credentials are encrypted at rest using AES-256 and in transit via TLS 1.3. 
                  Customers maintain ownership of their knowledge bases and conversation records, and may request full data deletion at any time.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-900 text-base mb-2">4. Contact &amp; Grievance Officer</h4>
                <p className="text-neutral-600">
                  For privacy queries, data access, or removal requests, please reach our team directly at:
                  <br />
                  <a href="mailto:ramyabrato@samvaya.in" className="text-blue-600 underline font-medium">ramyabrato@samvaya.in</a> or{" "}
                  <a href="mailto:rohit@samvaya.in" className="text-blue-600 underline font-medium">rohit@samvaya.in</a>.
                </p>
              </div>
            </>
          )}

          {docType === "terms" && (
            <>
              <div>
                <p className="text-xs text-neutral-500 mb-2">Last Updated: September 2026</p>
                <p>
                  These Terms of Service (&quot;Terms&quot;) govern access to and usage of the <strong>samvaya.in</strong> website, early access programs, 
                  and AI voice agent platform operated by Samvaya AI.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-900 text-base mb-2">1. Eligibility &amp; Platform Access</h4>
                <p className="text-neutral-600">
                  By joining the waitlist or using our services, you represent that you have the authority to bind your organization to these terms. 
                  Samvaya grants you a revocable, non-exclusive license to test and deploy voice agents within agreed usage bounds.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-900 text-base mb-2">2. Acceptable Use Policy</h4>
                <p className="text-neutral-600">
                  Users agree NOT to use Samvaya AI voice capabilities for:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-neutral-600 mt-1">
                  <li>Unlawful robocalls, unsolicited spam, or telemarketing in violation of local telecom regulations (e.g. TRAI/FCC).</li>
                  <li>Impersonation, deceptive identity spoofing, or fraudulent schemes.</li>
                  <li>Harassment, illegal surveillance, or unauthorized automated emergency calling.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-900 text-base mb-2">3. Service Availability &amp; SLAs</h4>
                <p className="text-neutral-600">
                  While we strive for 99.9% uptime and sub-second voice latency, early access beta features may undergo continuous updates, 
                  maintenance, and capacity calibration.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-900 text-base mb-2">4. Governing Law &amp; Inquiries</h4>
                <p className="text-neutral-600">
                  For legal inquiries or commercial terms:{" "}
                  <a href="mailto:rohit@samvaya.in" className="text-blue-600 underline font-medium">rohit@samvaya.in</a>.
                </p>
              </div>
            </>
          )}

          {docType === "security" && (
            <>
              <div>
                <p className="text-xs text-neutral-500 mb-2">Security Architecture Overview</p>
                <p>
                  Samvaya AI runs enterprise-grade security protocols designed to prevent unauthorized access, mitigate spoofing, and protect enterprise call data.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-900 text-base mb-2">1. Encryption Standards</h4>
                <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                  <li><strong>In-Transit:</strong> TLS 1.3 / SRTP encryption for all WebRTC and SIP voice streaming connections.</li>
                  <li><strong>At-Rest:</strong> AES-256 database encryption with isolated tenant namespaces.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-900 text-base mb-2">2. Telecom &amp; Regulatory Compliance</h4>
                <p className="text-neutral-600">
                  Our telecommunication integrations follow strict anti-spoofing standards, caller consent management, 
                  and automated Do-Not-Call (DNC) list filtering.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-900 text-base mb-2">3. Responsible Disclosure</h4>
                <p className="text-neutral-600">
                  If you discover a security vulnerability, please report it immediately to{" "}
                  <a href="mailto:ramyabrato@samvaya.in" className="text-blue-600 underline font-medium">ramyabrato@samvaya.in</a>. We respond within 24 hours.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
  )
}
