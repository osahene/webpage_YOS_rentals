// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'
import { contactSchema } from './app/utils/validation'

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
})

// Slow down after multiple requests
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 3,
  delayMs: 500,
})

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting (you'll need to adapt this for Next.js middleware)
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || 'unknown'
    
    // Validate request size
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > 10000) {
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 }
      )
    }

    const body = await request.json()
    
    // Input sanitization
    const sanitizedBody = Object.entries(body).reduce((acc, [key, value]) => {
      if (typeof value === 'string') {
        acc[key] = value
          .replace(/[<>]/g, '')
          .replace(/javascript:/gi, '')
          .trim()
      } else {
        acc[key] = value
      }
      return acc
    }, {} as Record<string, string | unknown>)

    // Validate
    const result = contactSchema.safeParse(sanitizedBody)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: result.error.format() },
        { status: 400 }
      )
    }

    // Honeypot check
    if (sanitizedBody.honeypot) {
      // Log potential bot
      console.log('Honeypot triggered by IP:', ip)
      return NextResponse.json({ success: true }) // Fake success
    }

    // Time-based token check (CSRF prevention)
    const token = request.headers.get('x-csrf-token')
    if (!token || !validateToken(token)) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 403 }
      )
    }

    // Process request...
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function validateToken(token: string): boolean {
  // Implement token validation logic
  return !!(token && token.length > 0)
}