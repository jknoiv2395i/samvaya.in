import React from "react"
import { Phone, Plus, Sparkles, ArrowUp } from "lucide-react"

export const PromptCard: React.FC = () => {
  const promptText = "follow up on overdue payments"

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 md:mt-12 px-4">
      {/* Outer Glassmorphic Bezel Frame */}
      <div className="relative p-2.5 sm:p-3.5 rounded-[2.25rem] bg-white/50 backdrop-blur-md border border-white/80 shadow-[0_25px_60px_-15px_rgba(30,58,35,0.18)] transition-all">
        {/* Inner Card */}
        <div className="bg-white rounded-[1.65rem] border border-neutral-100 shadow-xs p-6 sm:p-7 min-h-[220px] sm:min-h-[240px] flex flex-col justify-between relative">
          {/* Top Prompt Section */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-neutral-800 shrink-0">
              <Phone className="w-4 h-4 text-neutral-700 stroke-[2.2]" />
            </div>
            <div className="text-neutral-800 text-sm sm:text-base font-normal leading-relaxed">
              <span>Create a voice agent to call and </span>
              <span className="text-[#3b82f6] font-medium hover:underline cursor-pointer transition-colors">
                {promptText}
              </span>
            </div>
          </div>

          {/* Bottom Action Controls */}
          <div className="flex items-center justify-between pt-6 mt-auto">
            {/* Left Buttons: Plus and Upgrade */}
            <div className="flex items-center gap-2.5">
              {/* Plus Button */}
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-neutral-200/90 hover:bg-neutral-300 text-neutral-700 flex items-center justify-center transition-colors shadow-xs active:scale-95 cursor-pointer"
                title="Add attachment or action"
                aria-label="Add action"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Upgrade Button */}
              <button
                type="button"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#44a7f7] to-[#2563eb] text-white text-xs font-semibold shadow-xs hover:opacity-95 transition-opacity active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Upgrade</span>
              </button>
            </div>

            {/* Right Action: Up Arrow Button */}
            <div>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-[#d8b4fe]/60 hover:bg-[#c084fc]/70 text-[#7e22ce] flex items-center justify-center transition-colors shadow-xs active:scale-95 cursor-pointer"
                title="Submit prompt"
                aria-label="Submit prompt"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

