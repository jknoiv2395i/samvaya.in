import sys
sys.stdout.reconfigure(encoding='utf-8')
import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Replace :root block
old_root = re.search(r':root\s*\{[^}]+\}', css).group(0)

new_root = """:root {
  /* ==========================================================================
     SAMVAYA PRODUCT DESIGN SYSTEM TOKENS (FETCHED FROM SAMVAYA.IN)
     ========================================================================== */
  --bg-dark: #0A0A0C;
  --bg-surface: #121216;
  --bg-card: #121216;
  --bg-card-hover: #1A1A20;
  --bg-elevated: #1A1A20;
  --bg-subtle: #22222A;
  
  --border-subtle: #22222A;
  --border-hover: #3A3A44;
  --border-active: #6366F1;
  
  /* Primary Brand Theme: Samvaya Electric Indigo */
  --primary-accent: #6366F1;
  --primary-accent-hover: #818CF8;
  --primary-accent-glow: rgba(99, 102, 241, 0.35);
  --primary-accent-soft: rgba(99, 102, 241, 0.12);
  --primary-accent-deep: #4F46E5;
  
  /* Backward-compatible alias for existing templates */
  --primary-lime: #6366F1;
  --primary-lime-hover: #818CF8;
  --primary-lime-glow: rgba(99, 102, 241, 0.35);
  --primary-lime-soft: rgba(99, 102, 241, 0.12);
  
  /* Live Turn-Taking / Operational Status: Samvaya Emerald Green */
  --accent-emerald: #16A34A;
  --accent-emerald-soft: rgba(22, 163, 74, 0.12);
  
  --text-main: #EDEDED;
  --text-muted: #8F8F9D;
  --text-dim: #71717A;
  
  --font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-brand: 'Jersey 25', sans-serif;
  --font-editorial: 'Figtree', 'Playfair Display', serif;
  --font-mono: 'Inter', monospace;
  
  --transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}"""

css = css.replace(old_root, new_root)

# 2. Update body ambient glow
css = re.sub(
    r'body::before\s*\{[^}]+\}',
    """body::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1100px;
  height: 620px;
  background: radial-gradient(ellipse at top, rgba(99, 102, 241, 0.16) 0%, rgba(10, 10, 12, 0) 70%);
  pointer-events: none;
  z-index: 0;
}""",
    css
)

# 3. Update buttons definition
old_btn_block = re.search(r'/\* Buttons \*/\s*\.btn\s*\{[^}]+\}\s*\.btn-lime-sm\s*\{[^}]+\}\s*\.btn-lime-sm:hover\s*\{[^}]+\}\s*\.btn-lime-lg\s*\{[^}]+\}\s*\.btn-lime-lg:hover\s*\{[^}]+\}', css)
if old_btn_block:
    new_btn_block = """/* Buttons - Samvaya Pill Texture & Electric Indigo */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 9999px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;
  font-family: 'Inter', var(--font-family);
  transition: var(--transition);
  user-select: none;
}

.btn-lime-sm,
.btn-samvaya-sm {
  background-image: url('samvaya_btn-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: var(--bg-card);
  color: #ffffff;
  padding: 10px 24px;
  font-size: 13.5px;
  font-weight: 500;
  letter-spacing: -0.01em;
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.btn-lime-sm:hover,
.btn-samvaya-sm:hover {
  border-color: rgba(99, 102, 241, 0.6);
  transform: translateY(-1.5px);
  box-shadow: 0 0 25px rgba(99, 102, 241, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.25);
  opacity: 0.96;
}

.btn-lime-lg,
.btn-samvaya-lg {
  background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%);
  color: #ffffff;
  padding: 17px 38px;
  font-size: 16px;
  letter-spacing: -0.01em;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.25);
  position: relative;
  overflow: hidden;
}

.btn-lime-lg::before,
.btn-samvaya-lg::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
  transition: left 0.6s ease;
}

.btn-lime-lg:hover::before,
.btn-samvaya-lg:hover::before {
  left: 100%;
}

.btn-lime-lg:hover,
.btn-samvaya-lg:hover {
  background: linear-gradient(135deg, #818CF8 0%, #6366F1 100%);
  transform: translateY(-2px);
  box-shadow: 0 12px 38px rgba(99, 102, 241, 0.65);
}"""
    css = css.replace(old_btn_block.group(0), new_btn_block)
    print("Replaced button block successfully")

# 4. Update headline textured highlight
old_highlight = re.search(r'\.hero-title\s*\.highlight-lime\s*\{[^}]+\}', css)
if old_highlight:
    new_highlight = """.hero-title .highlight-lime {
  background-image: url('samvaya_text-texture.jpg');
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  font-weight: 800;
}"""
    css = css.replace(old_highlight.group(0), new_highlight)
    print("Replaced headline highlight successfully")

# 5. Global rgba replacement: rgba(162, 222, 0, -> rgba(99, 102, 241,
css = re.sub(r'rgba\(\s*162\s*,\s*222\s*,\s*0\s*,', 'rgba(99, 102, 241,', css)

# 6. Specific gradients
css = css.replace(
    'linear-gradient(90deg, #0b1509 0%, #111d0d 50%, #0b1509 100%)',
    'linear-gradient(90deg, #0A0A0C 0%, #121216 50%, #0A0A0C 100%)'
)
css = css.replace(
    'linear-gradient(180deg, #18230b 0%, #111a07 100%)',
    'linear-gradient(180deg, #1A1A20 0%, #121216 100%)'
)
css = css.replace(
    'linear-gradient(90deg, #74a200 0%, var(--primary-lime) 100%)',
    'linear-gradient(90deg, #4F46E5 0%, #6366F1 100%)'
)

# 7. Old dark backgrounds to Samvaya palette
replacements = [
    ('#07090e', '#0A0A0C'),
    ('#0e1118', '#121216'),
    ('#131722', '#121216'),
    ('#1b2130', '#1A1A20'),
    ('#111520', '#121216'),
    ('#141a27', '#1A1A20'),
    ('#090c12', '#0A0A0C'),
    ('#090b0e', '#0A0A0C'),
    ('#10141e', '#121216'),
    ('#161b29', '#1A1A20'),
    ('#1a2030', '#1A1A20'),
    ('#222a3a', '#22222A'),
    ('#0c0a0a', '#0A0A0C'),
]
for old, new in replacements:
    css = css.replace(old, new)

# 8. Add brand logo, header floating pill, golden birds, and nature CTA rules if not present
extra_styles = """
/* ==========================================================================
   AUTHENTIC SAMVAYA.IN BRAND EXTENSIONS & ASSETS
   ========================================================================== */

/* Brand Logo (Jersey 25 & Glowing Faceted Bolt) */
.brand-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
}

.brand-mark-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.samvaya-brand-mark {
  width: 30px;
  height: 30px;
  object-fit: contain;
  filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.45));
  transition: transform 0.25s ease;
}

.brand-logo:hover .samvaya-brand-mark {
  transform: scale(1.1) rotate(4deg);
}

.brand-name-jersey {
  font-family: var(--font-brand);
  font-size: 32px;
  line-height: 1;
  letter-spacing: -1px;
  color: var(--text-main);
  text-transform: lowercase;
}

.brand-badge-pill {
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--primary-accent);
  background: var(--primary-accent-soft);
  border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 3px 8px;
  border-radius: 9999px;
  margin-left: 2px;
}

/* Floating Pill Navbar from samvaya.in */
.funnel-header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  padding: 12px 16px;
  pointer-events: none;
}

.header-inner {
  max-width: 1060px;
  margin: 0 auto;
  background: rgba(18, 18, 22, 0.82);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 9999px;
  padding: 8px 16px 8px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 24px -2px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  pointer-events: auto;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 22px;
}

.header-nav a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 13.5px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: color 0.2s ease;
}

.header-nav a:hover {
  color: var(--text-main);
}

/* Golden Brand Birds flanking Hero Headline */
.hero-title-wrap {
  position: relative;
  display: inline-block;
  max-width: 100%;
}

.hero-bird {
  position: absolute;
  width: 90px;
  height: auto;
  pointer-events: none;
  user-select: none;
  z-index: 2;
  filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.5));
  animation: birdFloat 5s ease-in-out infinite alternate;
}

.bird-left {
  top: -24px;
  left: -76px;
}

.bird-right {
  top: -24px;
  right: -76px;
  animation-delay: 2.5s;
}

@keyframes birdFloat {
  0% { transform: translateY(0px) rotate(0deg); }
  100% { transform: translateY(-8px) rotate(2deg); }
}

@media (max-width: 1040px) {
  .hero-bird {
    display: none;
  }
}

/* BYOC Telephony Providers Banner */
.providers-bar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 14px;
  margin-bottom: 22px;
  padding: 8px 20px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 9999px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.providers-label {
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  white-space: nowrap;
}

.providers-logos-img {
  height: 20px;
  width: auto;
  object-fit: contain;
  filter: brightness(1.1) contrast(1.05);
}

@media (max-width: 640px) {
  .providers-bar {
    flex-direction: column;
    gap: 8px;
    border-radius: 16px;
    padding: 12px 16px;
  }
}

/* Atmospheric Nature CTA Section (samvaya_cta-nature-bg.png) */
.cta-booking-section {
  position: relative;
  background-image: url('samvaya_cta-nature-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
  padding: 100px 0;
  overflow: hidden;
}

.cta-booking-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(10, 10, 12, 0.82) 0%, rgba(10, 10, 12, 0.95) 100%);
  pointer-events: none;
  z-index: 0;
}
"""

css += "\n" + extra_styles

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print(f"Successfully updated style.css! Total characters: {len(css)}")
