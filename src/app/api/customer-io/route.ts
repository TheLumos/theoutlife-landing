import { NextResponse } from 'next/server'

// Add this line to specify Edge Runtime
export const runtime = 'edge'

export async function POST(request: Request) {
  const CUSTOMER_IO_API_BASE_URL = 'https://track.customer.io/api/v1'
  const SITE_ID = process.env.NEXT_PUBLIC_CUSTOMER_IO_SITE_ID
  const API_KEY = process.env.NEXT_PUBLIC_CUSTOMER_IO_API_KEY
  
  if (!SITE_ID || !API_KEY) {
    return NextResponse.json(
      { error: 'Missing Customer.io credentials' }, 
      { status: 500 },
    )
  }

  try {
    const data = await request.json()
    const { userId, attributes } = data
    
    const response = await fetch(`${CUSTOMER_IO_API_BASE_URL}/customers/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${SITE_ID}:${API_KEY}`)}`,
      },
      body: JSON.stringify(attributes),
    })

    if (!response.ok) {
      throw new Error(`Customer.io API error: ${response.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' }, 
      { status: 500 },
    )
  }
} 