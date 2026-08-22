import React, { useState, useRef, useEffect } from "react"
import { Mail, X, CheckCircle2, Loader2, KeyRound } from "lucide-react"
import { supabase, isSupabaseConfigured } from "../lib/supabase"

interface EarlyAccessModalProps {
  isOpen: boolean
  onClose: () => void
}

type Step = "email" | "otp" | "done"

export const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("")
  const [step, setStep] = useState<Step>("email")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [resendTimer, setResendTimer] = useState(30)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([])

  // Resend countdown timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>
    if (step === "otp" && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [step, resendTimer])

  if (!isOpen) return null

  const sendEmailOtp = async () => {
    if (!email) return
    setLoading(true)
    setErrorMessage("")

    if (!isSupabaseConfigured || !supabase) {
      setErrorMessage("Supabase is not configured yet. Please check your .env file.")
      setLoading(false)
      return
    }

    try {
      const cleanEmail = email.trim().toLowerCase()

      // 1. Check if email is already registered and verified on the waitlist
      try {
        const { data: existingLead } = await supabase
          .from("waitlist")
          .select("email")
          .eq("email", cleanEmail)
          .maybeSingle()

        if (existingLead) {
          setErrorMessage("This email is already registered and verified for early access!")
          setLoading(false)
          return
        }
      } catch {
        // Continue if table query fails or table does not exist yet
      }

      // 2. Send real 6-digit OTP code to the user's email via Supabase Auth
      const { error } = await supabase.auth.signInWithOtp({
        email: cleanEmail,
        options: {
          shouldCreateUser: true,
        },
      })

      if (error) {
        setErrorMessage(error.message || "Failed to send verification code. Please check your email.")
      } else {
        setStep("otp")
        setOtp(["", "", "", "", "", ""])
        setResendTimer(30)
        setTimeout(() => otpInputsRef.current[0]?.focus(), 150)
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred."
      setErrorMessage(message)
    } finally {
      setLoading(false)
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendEmailOtp()
  }

  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return

    const newOtp = [...otp]
    newOtp[index] = val.slice(-1)
    setOtp(newOtp)
    setErrorMessage("")

    if (val && index < 5) {
      otpInputsRef.current[index + 1]?.focus()
    }

    const completeCode = newOtp.join("")
    if (completeCode.length === 6) {
      verifyOtpCode(completeCode)
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (pasted) {
      const newOtp = ["", "", "", "", "", ""]
      for (let i = 0; i < pasted.length; i++) {
        newOtp[i] = pasted[i]
      }
      setOtp(newOtp)
      if (pasted.length === 6) {
        verifyOtpCode(pasted)
      } else {
        otpInputsRef.current[pasted.length]?.focus()
      }
    }
  }

  const verifyOtpCode = async (token: string) => {
    if (!token || token.length !== 6) return
    setLoading(true)
    setErrorMessage("")

    if (!isSupabaseConfigured || !supabase) {
      setErrorMessage("Supabase is not configured.")
      setLoading(false)
      return
    }

    try {
      const cleanEmail = email.trim().toLowerCase()
      const cleanToken = token.trim()

      // Try email OTP verification first
      let res = await supabase.auth.verifyOtp({
        email: cleanEmail,
        token: cleanToken,
        type: "email",
      })

      // If email type fails, try signup type (used when user is created via email confirmation)
      if (res.error) {
        const signupRes = await supabase.auth.verifyOtp({
          email: cleanEmail,
          token: cleanToken,
          type: "signup",
        })
        if (!signupRes.error) {
          res = signupRes
        }
      }

      // If still fails, try magiclink type
      if (res.error) {
        const magicRes = await supabase.auth.verifyOtp({
          email: cleanEmail,
          token: cleanToken,
          type: "magiclink",
        })
        if (!magicRes.error) {
          res = magicRes
        }
      }

      if (res.error) {
        setErrorMessage(res.error.message || "Invalid or expired verification code. Please check your latest email or request a new code.")
        setLoading(false)
        return
      }

      // Save verified user record to waitlist table
      try {
        await supabase.from("waitlist").upsert({
          email: cleanEmail,
          user_id: res.data?.user?.id || null,
          verified_at: new Date().toISOString(),
        })
      } catch {
        // Table insert non-blocking
      }

      setStep("done")
      setTimeout(() => {
        handleClose()
      }, 2600)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Verification failed."
      setErrorMessage(message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    verifyOtpCode(otp.join(""))
  }

  const handleClose = () => {
    setEmail("")
    setStep("email")
    setOtp(["", "", "", "", "", ""])
    setErrorMessage("")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-[760px] md:max-w-[820px] min-h-[380px] sm:min-h-[440px] bg-white rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-white/60 z-10 animate-in zoom-in-95 duration-200 grid grid-cols-1 sm:grid-cols-12">
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-neutral-100/80 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Cloud Section with "JOIN US" */}
        <div 
          style={{
            backgroundImage: "url('/modal-clouds-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="sm:col-span-5 min-h-[200px] sm:min-h-[420px] flex items-center justify-center relative p-6 select-none"
        >
          <div className="relative flex flex-col items-center justify-center text-center">
            <h2 className="font-['Jersey_25'] font-normal text-6xl sm:text-7xl lg:text-8xl leading-[0.85] text-neutral-900 tracking-wider">
              <span className="block">JOIN</span>
              <span className="block">US</span>
            </h2>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="sm:col-span-7 p-6 sm:p-10 md:p-12 min-h-[300px] sm:min-h-[420px] flex flex-col items-center justify-center text-center bg-white relative">
          {/* Logo Lotus */}
          <div className="mb-4 sm:mb-6">
            <img
              src="/modal-logo.png"
              alt="Samvaya Logo"
              className="w-28 sm:w-32 md:w-36 h-auto mx-auto object-contain drop-shadow-2xs"
            />
          </div>

          {/* Step 1: Email Input */}
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="w-full flex flex-col items-center gap-3.5 max-w-[420px] mx-auto animate-in fade-in duration-200">
              {/* Email Input Field */}
              <div className="w-full h-[52px] sm:h-[56px] flex items-center gap-3 px-5 py-3 rounded-full border border-neutral-300/80 bg-neutral-50/50 focus-within:border-neutral-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-neutral-200 transition-all shadow-2xs">
                <Mail className="w-5 h-5 text-neutral-400 shrink-0" />
                <input
                  id="early-access-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@example.com"
                  required
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  list="common-email-providers"
                  className="w-full bg-transparent font-['Inter'] text-sm sm:text-base text-neutral-800 placeholder-neutral-400 outline-none"
                />
                <datalist id="common-email-providers">
                  {email && !email.includes("@") && (
                    <>
                      <option value={`${email}@gmail.com`} />
                      <option value={`${email}@yahoo.com`} />
                      <option value={`${email}@outlook.com`} />
                      <option value={`${email}@icloud.com`} />
                      <option value={`${email}@hotmail.com`} />
                    </>
                  )}
                </datalist>
              </div>

              {/* Quick autofill domain chips */}
              {email && !email.includes("@") && (
                <div className="flex flex-wrap items-center justify-center gap-1.5 animate-in fade-in duration-150">
                  {["@gmail.com", "@outlook.com", "@yahoo.com", "@icloud.com"].map((domain) => (
                    <button
                      key={domain}
                      type="button"
                      onClick={() => setEmail(`${email}${domain}`)}
                      className="px-2.5 py-1 text-xs font-['Inter'] font-medium bg-neutral-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 text-neutral-600 rounded-full border border-neutral-200 transition-all cursor-pointer select-none"
                    >
                      {domain}
                    </button>
                  ))}
                </div>
              )}

              {errorMessage && (
                <p className="font-['Inter'] text-xs text-red-500 font-medium">
                  {errorMessage}
                </p>
              )}

              {/* Get Early Access CTA Button */}
              <button
                type="submit"
                disabled={loading}
                style={{ backgroundImage: "url('/btn-bg.png')" }}
                className="w-full sm:w-auto min-w-[173px] h-[52px] bg-cover bg-center bg-no-repeat text-white font-['Inter'] font-[300] text-[16.9px] leading-[28px] tracking-[0px] px-7 py-2 rounded-full shadow-xs hover:opacity-90 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap flex items-center justify-center mt-1 disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : "Get Early Access"}
              </button>
            </form>
          )}

          {/* Step 2: Real Email OTP Verification */}
          {step === "otp" && (
            <form onSubmit={handleVerifySubmit} className="w-full flex flex-col items-center gap-4 max-w-[420px] mx-auto animate-in fade-in duration-200">
              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 text-blue-700 bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full text-xs font-['Inter'] mb-2">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Verification code sent to your inbox</span>
                </div>
                <p className="font-['Inter'] text-xs sm:text-sm text-neutral-600">
                  Enter the 6-digit code sent to <strong className="text-neutral-900 font-medium">{email}</strong>
                </p>
              </div>

              {/* 6 Digit OTP Inputs */}
              <div className="flex items-center justify-center gap-2 sm:gap-2.5 my-1">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpInputsRef.current[idx] = el
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    onPaste={handleOtpPaste}
                    className="w-10 h-12 sm:w-11 sm:h-13 text-center font-['Inter'] font-semibold text-lg sm:text-xl rounded-xl border border-neutral-300 bg-neutral-50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-2xs"
                  />
                ))}
              </div>

              {errorMessage && (
                <p className="font-['Inter'] text-xs text-red-500 font-medium -mt-2">
                  {errorMessage}
                </p>
              )}

              {/* Verify Button */}
              <button
                type="submit"
                disabled={loading}
                style={{ backgroundImage: "url('/btn-bg.png')" }}
                className="w-full sm:w-auto min-w-[173px] h-[52px] bg-cover bg-center bg-no-repeat text-white font-['Inter'] font-[300] text-[16.9px] leading-[28px] tracking-[0px] px-7 py-2 rounded-full shadow-xs hover:opacity-90 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap flex items-center justify-center disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : "Verify & Join"}
              </button>

              {/* Resend OTP Link */}
              <div className="text-center">
                {resendTimer > 0 ? (
                  <span className="font-['Inter'] text-xs text-neutral-400">
                    Resend code in {resendTimer}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={sendEmailOtp}
                    className="font-['Inter'] text-xs text-neutral-600 hover:text-neutral-900 underline font-medium cursor-pointer"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Step 3: Success Screen */}
          {step === "done" && (
            <div className="flex flex-col items-center justify-center py-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-['Inter'] font-semibold text-neutral-900 text-xl">Verified & On The List!</h3>
              <p className="font-['Inter'] text-sm text-neutral-500 mt-1 max-w-[280px]">
                Your email <strong className="text-neutral-800 font-medium">{email}</strong> has been verified. We&apos;ll be in touch soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
