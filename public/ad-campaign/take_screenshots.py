import sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

errors = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    # 1. Desktop Test (1440 x 900)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.on("console", lambda msg: print(f"Browser console [{msg.type}]: {msg.text}") if msg.type in ['error'] else None)
    page.on("pageerror", lambda err: errors.append(str(err)))
    
    print("Navigating to desktop http://127.0.0.1:8080/ ...")
    page.goto("http://127.0.0.1:8080/", wait_until="networkidle")
    page.wait_for_timeout(4000)
    
    # Full page screenshot
    page.screenshot(path="preview_desktop_full.png", full_page=True)
    print("Saved preview_desktop_full.png")
    
    # Hero
    page.locator("#hero").screenshot(path="preview_hero.png")
    print("Saved preview_hero.png")
    
    # Social proof wall
    page.locator("#proof").screenshot(path="preview_proof.png")
    print("Saved preview_proof.png")

    # Training modules
    page.locator("#modules").screenshot(path="preview_modules.png")
    print("Saved preview_modules.png")
    
    # Booking
    page.locator("#booking").screenshot(path="preview_booking.png")
    print("Saved preview_booking.png")

    # FAQ
    page.locator("#faq").screenshot(path="preview_faq.png")
    print("Saved preview_faq.png")
    
    # 2. Mobile Test (375 x 812) matching user mobile screenshot
    mobile_page = browser.new_page(viewport={"width": 375, "height": 812}, is_mobile=True)
    mobile_page.goto("http://127.0.0.1:8080/", wait_until="networkidle")
    mobile_page.screenshot(path="preview_mobile_full.png", full_page=True)
    print("Saved preview_mobile_full.png")
    
    browser.close()

if errors:
    print("Page errors detected:", errors)
else:
    print("Render completed without unhandled errors!")
