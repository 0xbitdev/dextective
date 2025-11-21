import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const base = process.env.PUMP_API
  if (!base) {
    return NextResponse.json({ status: "500", message: 'PUMP_API not configured', data: [] }, { status: 500 })
  }

  const url = `${base.replace(/\/+$/, '')}/market-activity/${encodeURIComponent(id)}`
  try {
    const res = await fetch(url)
    const data = await res.json()

    const payload = data?.data ?? data
    let dataArray: any[] = []
    if (Array.isArray(payload)) dataArray = payload
    else if (payload == null) dataArray = []
    else dataArray = [payload]

    const ok = res.ok
    const out = {
      status: ok ? "200" : String(res.status),
      message: ok ? 'success' : (data?.message ?? 'error'),
      data: dataArray,
    }

    return NextResponse.json(out, { status: res.ok ? 200 : res.status })
  } catch (err) {
    return NextResponse.json({ status: "502", message: 'Failed to fetch pump api', data: [], details: String(err) }, { status: 502 })
  }
}
