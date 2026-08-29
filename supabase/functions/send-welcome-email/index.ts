import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || ""

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not configured in Supabase secrets.")
      return new Response(
        JSON.stringify({ message: "Welcome email skipped (no API key set)" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 24px 0; color: #111827; }
          .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden; }
          .header { padding: 32px 32px 16px; text-align: left; }
          .logo { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: #111827; }
          .hero-title { font-size: 26px; font-weight: 800; line-height: 1.25; color: #111827; margin: 20px 0 12px; }
          .content { padding: 0 32px 32px; font-size: 15px; line-height: 1.6; color: #4b5563; }
          .badge-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0; }
          .badge-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 8px; }
          .badge-val { font-size: 14px; color: #0f172a; margin: 4px 0; }
          .badge-highlight { color: #059669; font-weight: 600; }
          .cta-btn { display: inline-block; background: #0f172a; color: #ffffff !important; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 9999px; text-decoration: none; margin-top: 12px; }
          .footer { border-top: 1px solid #f3f4f6; padding: 24px 32px; font-size: 13px; color: #9ca3af; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🪷 samvaya</div>
            <h1 class="hero-title">You're in. Welcome to the future of AI voice agents.</h1>
          </div>
          <div class="content">
            <p>Hi,</p>
            <p>Thank you for verifying your early access spot with <strong>Samvaya</strong>. You're now on our priority list to deploy sub-second AI voice reps that qualify leads, answer inbound calls, and book meetings 24/7.</p>
            
            <div class="badge-card">
              <div class="badge-label">YOUR REGISTERED DETAILS</div>
              <div class="badge-val"><strong>Email:</strong> ${email}</div>
              <div class="badge-val"><strong>Status:</strong> <span class="badge-highlight">Early Access Priority Spot</span></div>
            </div>

            <a href="https://samvaya.in" class="cta-btn">Explore Platform →</a>
            
            <p style="margin-top: 28px; font-size: 14px; color: #6b7280;">We roll out early batches weekly. Watch this inbox for your personal onboarding link and API keys.</p>
          </div>
          <div class="footer">
            &copy; 2026 Samvaya AI, Inc. &bull; samvaya.in
          </div>
        </div>
      </body>
    </html>
    `

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Samvaya <onboarding@resend.dev>", // Or your custom verified domain (e.g. welcome@samvaya.in)
        to: [email],
        subject: "You're on the list! Welcome to Samvaya Early Access",
        html: emailHtml,
      }),
    })

    const data = await res.json()
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
