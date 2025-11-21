// Server-side Solana JSON-RPC proxy that forwards requests to the
// official mainnet RPC endpoint. This allows the client to call a local
// /api/solana-proxy route while the upstream remains
// https://api.mainnet-beta.solana.com (no API key required).

const MAINNET_RPC = 'https://api.mainnet-beta.solana.com'

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const res = await fetch(MAINNET_RPC, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
    })

    const text = await res.text()
    const contentType = res.headers.get('content-type') || 'application/json'
    return new Response(text, { status: res.status, headers: { 'content-type': contentType } })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'proxy_error', message: String(err) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}

export async function GET() {
  return new Response(JSON.stringify({ ok: true, upstream: MAINNET_RPC }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}
