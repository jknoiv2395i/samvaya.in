import sys
sys.stdout.reconfigure(encoding='utf-8')
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Head: theme-color, favicon, Google Fonts, and Cal.com brandColor
html = html.replace(
    '<meta name="theme-color" content="#a2de00" />',
    '<meta name="theme-color" content="#0A0A0C" />\n  <link rel="icon" type="image/svg+xml" href="samvaya_favicon.svg" />'
)

# Update Fonts link
old_fonts = re.search(r'<link href="https://fonts\.googleapis\.com/css2\?family=Plus\+Jakarta\+Sans[^"]*" rel="stylesheet">', html)
if old_fonts:
    new_fonts = '<link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&family=Inter:wght@300;400;500;600;700&family=Jersey+25&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">'
    html = html.replace(old_fonts.group(0), new_fonts)
    print("Replaced Google fonts link")

# Update Cal.com theme color in head
html = html.replace(
    'Cal("ui", {"theme":"dark","styles":{"branding":{"brandColor":"#a2de00"}}});',
    'Cal("ui", {"theme":"dark","styles":{"branding":{"brandColor":"#6366F1"}}});'
)

# 2. Update Header Brand Logo
old_header_logo = re.search(r'<a href="https://samvaya\.in" class="brand-logo"[^>]*>.*?</a>', html, re.DOTALL)
if old_header_logo:
    new_header_logo = """<a href="https://samvaya.in" class="brand-logo" title="Samvaya AI Voice Agents">
        <div class="brand-mark-wrap">
          <img src="samvaya_favicon.svg" alt="Samvaya Mark" class="samvaya-brand-mark" />
        </div>
        <span class="brand-name-jersey">samvaya</span>
        <span class="brand-badge-pill">VOICE AI</span>
      </a>"""
    html = html.replace(old_header_logo.group(0), new_header_logo)
    print("Replaced header brand logo")

# 3. Update Hero headline with golden brand birds
old_hero_title = re.search(r'<h1 class="hero-title">.*?</h1>', html, re.DOTALL)
if old_hero_title:
    new_hero_title = """<div class="hero-title-wrap">
          <img src="samvaya_bird-left.png" alt="Samvaya Emblem" class="hero-bird bird-left" />
          <h1 class="hero-title">
            How To Contact 10,000+ Inbound Leads In Under <span class="highlight-lime">120ms</span> & Double Booked Sales Calls Without An Army Of SDRs
          </h1>
          <img src="samvaya_bird-right.png" alt="Samvaya Emblem" class="hero-bird bird-right" />
        </div>"""
    html = html.replace(old_hero_title.group(0), new_hero_title)
    print("Wrapped hero title with golden brand birds")

# 4. Add BYOC Telephony provider strip right below the hero trust bar
old_trust_bar = re.search(r'<div class="hero-trust-bar">.*?</div>\s*</div>', html, re.DOTALL)
if old_trust_bar and 'providers-bar' not in html:
    providers_strip = """
        <!-- Native BYOC Telephony Bar (from samvaya.in) -->
        <div class="providers-bar">
          <span class="providers-label">Native BYOC Telephony:</span>
          <img src="samvaya_providers-logos.png" alt="Supported Providers: Vobiz, Twilio, Pulse, InTalk, Exotel, Smartflo" class="providers-logos-img" />
        </div>"""
    html = html.replace(old_trust_bar.group(0), old_trust_bar.group(0) + providers_strip)
    print("Inserted BYOC Telephony providers bar")

# 5. Update footer brand
old_footer = re.search(r'<footer class="funnel-footer">.*?</footer>', html, re.DOTALL)
if old_footer:
    new_footer = """<footer class="funnel-footer">
    <div class="container text-center">
      <div class="footer-brand-wrap">
        <img src="samvaya_favicon.svg" alt="Samvaya Mark" class="footer-brand-icon" />
        <span class="brand-name-jersey">samvaya</span>
      </div>
      <p class="footer-copy">© 2026 Samvaya AI (samvaya.in). India's #1 Voice AI For B2B Sales & Inbound Dialing. Sub-120ms Latency with Native Exotel & Twilio BYOC. All Rights Reserved.</p>
    </div>
  </footer>"""
    html = html.replace(old_footer.group(0), new_footer)
    print("Updated footer brand")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Successfully updated index.html! New length: {len(html)}")

