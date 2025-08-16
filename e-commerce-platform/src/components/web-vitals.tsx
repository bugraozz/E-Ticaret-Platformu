'use client'

import { useReportWebVitals } from 'next/web-vitals'

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vitals:', metric)
    }

    // In production, you would send this to your analytics service
    // Example: analytics.track('Web Vital', {
    //   name: metric.name,
    //   value: metric.value,
    //   id: metric.id,
    // })
    
    // For now, we'll just log it
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      })
    }
  })

  return null
}
