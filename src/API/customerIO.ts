'use client'

import axios from 'axios'

const CUSTOMER_IO_API_BASE_URL = 'https://track.customer.io/api/v1'
const SITE_ID = process.env.NEXT_PUBLIC_CUSTOMER_IO_SITE_ID
const API_KEY = process.env.NEXT_PUBLIC_CUSTOMER_IO_API_KEY

if (!SITE_ID || !API_KEY) {
  throw new Error('Missing Customer.io credentials. Please check NEXT_PUBLIC_CUSTOMER_IO_SITE_ID and NEXT_PUBLIC_CUSTOMER_IO_API_KEY environment variables.')
}

// Create base64 encoded credentials for Basic auth
const basicAuth = Buffer.from(`${SITE_ID}:${API_KEY}`).toString('base64')

export const customerIoClient = axios.create({
  baseURL: CUSTOMER_IO_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${basicAuth}`,
  },
})

export const identifyCioUser = async (userId: string, attributes: any) => {
  try {
    const response = await fetch('/api/customer-io', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, attributes }),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('User identified:', data)
    return data
  } catch (error) {
    console.error('Error identifying user:', error)
    throw error
  }
}

export const trackCioEvent = async (userId: string, eventName: string, eventData: any) => {
  try {
    const response = await customerIoClient.post(`/customers/${userId}/events`, {
      name: eventName,
      data: eventData,
    })
    console.log('Event tracked:', response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error tracking event:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      })
    } else {
      console.error('Error tracking event:', error)
    }
    throw error
  }
}

export const deleteCioUser = async (userId: string) => {
  try {
    const response = await customerIoClient.delete(`/customers/${userId}`)
    console.log('User deleted:', response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error deleting user:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      })
    } else {
      console.error('Error deleting user:', error)
    }
    throw error
  }
}
