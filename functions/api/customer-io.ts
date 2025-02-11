import { EventContext } from '@cloudflare/workers-types';

interface Env {
  NEXT_PUBLIC_CUSTOMER_IO_SITE_ID: string;
  NEXT_PUBLIC_CUSTOMER_IO_API_KEY: string;
}

interface CustomerIORequest {
  userId: string;
  attributes: Record<string, any>;
}

export const onRequest = async (
  context: EventContext<Env, any, any>
) => {
  const { request, env } = context;
  
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  // Only allow POST
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const CUSTOMER_IO_API_BASE_URL = 'https://track.customer.io/api/v1';

  if (!env.NEXT_PUBLIC_CUSTOMER_IO_SITE_ID || !env.NEXT_PUBLIC_CUSTOMER_IO_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'Missing Customer.io credentials' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const data = await request.json() as CustomerIORequest;
    
    // Validate required fields
    if (!data.userId || !data.attributes) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { userId, attributes } = data;

    const response = await fetch(`${CUSTOMER_IO_API_BASE_URL}/customers/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${env.NEXT_PUBLIC_CUSTOMER_IO_SITE_ID}:${env.NEXT_PUBLIC_CUSTOMER_IO_API_KEY}`)}`,
      },
      body: JSON.stringify(attributes),
    });

    if (!response.ok) {
      throw new Error(`Customer.io API error: ${response.status}`);
    }

    return new Response(
      JSON.stringify({ success: true }), 
      { 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }), 
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}; 