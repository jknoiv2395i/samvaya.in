/**
 * Utility functions for Google Analytics 4 (GA4) event and page view tracking
 */

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "set",
      targetIdOrAction: string | Date,
      params?: Record<string, unknown>
    ) => void
  }
}

export const GA_TRACKING_ID = "G-6VWW0RT14K"

/**
 * Track virtual page views (especially useful for hash navigation like #docs or home)
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: pageTitle || document.title,
      page_location: window.location.href,
    })
  }
}

/**
 * Track custom events (e.g. CTA clicks, cal.com conversions, video interactions)
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
  additionalParams?: Record<string, unknown>
) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      ...additionalParams,
    })
  }
}

/**
 * Specifically track conversion intent on Cal.com demo booking clicks
 */
export const trackCalBookingClick = (location: string) => {
  trackEvent("booking_cta_click", "conversion", location, undefined, {
    link_url: "https://cal.com/samvaya/samvaya?overlayCalendar=true",
    placement: location,
  })
}
