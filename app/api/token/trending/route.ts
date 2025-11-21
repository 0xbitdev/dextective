import { NextResponse } from 'next/server'

// Proxy GET /api/token/trending -> {PUMP_API}/trending
export async function GET(request: Request) {
  try {
    const pumpApi = process.env.PUMP_API
    if (!pumpApi) {
      return new Response(JSON.stringify({ error: 'missing_env', message: 'PUMP_API not configured' }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      })
    }

    // Ensure we don't double the slash if PUMP_API ends with '/'
    const base = pumpApi.endsWith('/') ? pumpApi.slice(0, -1) : pumpApi
    const upstream = `${base}/trending`

    const res = await fetch(upstream, {
      method: 'GET',
      headers: { accept: 'application/json' },
    })

    const contentType = res.headers.get('content-type') || 'application/json'
    const text = await res.text()

    return new Response(text, { status: res.status, headers: { 'content-type': contentType } })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'proxy_error', message: String(err) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}

export async function POST() {
  return new Response(JSON.stringify({ error: 'method_not_allowed' }), { status: 405, headers: { 'content-type': 'application/json' } })
}
