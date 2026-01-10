// hooks/usePerformance.ts
'use client'

import { useEffect, useCallback } from 'react'

export function usePerformance() {
  const reportWebVitals = useCallback((metric: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(metric)
    }
    
    // Send to your analytics
    const body = JSON.stringify(metric)
    const url = '/api/web-vitals'
    
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body)
    } else {
      fetch(url, { body, method: 'POST', keepalive: true })
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Monitor long tasks
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('Long task detected:', entry)
          }
        }
      })
      observer.observe({ entryTypes: ['longtask'] })

      // Monitor layout shifts
      const layoutShiftObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as LayoutShift).hadRecentInput && (entry as LayoutShift).value > 0.1) {
            console.warn('Layout shift detected:', entry)
          }
        }
      })
      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] })

      return () => {
        observer.disconnect()
        layoutShiftObserver.disconnect()
      }
    }
  }, [])
}