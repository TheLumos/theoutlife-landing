'use server'

import { revalidatePath } from 'next/cache'

export async function identifyUser(userId: string, attributes: any) {
  try {
    const response = await fetch('/api/customer-io', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, attributes }),
    })

    if (!response.ok) {
      throw new Error('Failed to identify user')
    }

    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error identifying user:', error)
    return { success: false, error: 'Failed to identify user. Please try again later.' }
  }
} 