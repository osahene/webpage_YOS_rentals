// utils/validation.ts
import { z } from 'zod'

export const bookingSchema = z.object({
  pickup: z.string()
    .min(2, 'Pickup location is required')
    .max(100, 'Location too long')
    .regex(/^[a-zA-Z0-9\s,.-]+$/, 'Invalid characters in location'),
  
  dropoff: z.string()
    .min(2, 'Dropoff location is required')
    .max(100, 'Location too long')
    .regex(/^[a-zA-Z0-9\s,.-]+$/, 'Invalid characters in location'),
  
  startDate: z.string()
    .refine((date) => new Date(date) > new Date(), 'Start date must be in the future'),
  
  endDate: z.string()
    .refine((date) => {
      const start = new Date()
      const end = new Date(date)
      return end > start
    }, 'End date must be after start date'),
})

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long')
    .regex(/^[a-zA-Z\s-]+$/, 'Invalid characters in name'),
  
  email: z.string()
    .email('Invalid email address')
    .max(100, 'Email too long'),
  
  phone: z.string()
    .regex(/^[+\d\s()-]+$/, 'Invalid phone number format')
    .max(20, 'Phone number too long'),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message too long')
    .refine((msg) => {
      // Prevent XSS attempts
      const dangerousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /data:/i,
      ]
      return !dangerousPatterns.some(pattern => pattern.test(msg))
    }, 'Message contains unsafe content'),
})

// hooks/useSecureForm.ts
import { useState, useCallback } from 'react'
import * as Sentry from '@sentry/nextjs'

export function useSecureForm<T>(schema: z.ZodSchema<T>) {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = useCallback(async (data: unknown) => {
    try {
      const result = await schema.safeParseAsync(data)
      
      if (!result.success) {
        const errorMap: Record<string, string> = {}
        result.error.issues.forEach(issue => {
          const path = issue.path[0] as string
          errorMap[path] = issue.message
        })
        setErrors(errorMap as Partial<Record<keyof T, string>>)
        return { success: false, errors: errorMap }
      }
      
      setErrors({})
      return { success: true, data: result.data }
    } catch (error) {
      Sentry.captureException(error)
      return { success: false, errors: { _: 'Validation failed' } }
    }
  }, [schema])

  const sanitizeInput = useCallback((input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove HTML tags
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .trim()
  }, [])

  return { errors, isSubmitting, validate, sanitizeInput, setIsSubmitting }
}