"use client"

import { IconBrandTelegram, IconWorld, IconBrandX, IconCopy, IconCheck, IconShieldCheck, IconShieldX, IconLock, IconLockOpen } from "@tabler/icons-react"
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
// Chart components removed — using DEXscreener iframe instead
import { Separator } from '@/components/ui/separator'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

// Chart data removed — DEXscreener iframe is used instead

const generateNewTransaction = () => {
  const types = ["BUY", "SELL"]
  const type = types[Math.floor(Math.random() * types.length)]
  const sol = (Math.random() * 10 + 0.5).toFixed(1)
  const tokens = (parseFloat(sol) * 2380).toFixed(0)
  const price = `$0.000${(Math.random() * 100 + 10).toFixed(0)}`
  
  return {
    id: Date.now(),
    type,
    hash: `${Math.random().toString(36).substring(2, 6).toUpperCase()}...${Math.random().toString(36).substring(2, 6)}`,
    wallet: `${Math.random().toString(36).substring(2, 6).toUpperCase()}...${Math.random().toString(36).substring(2, 6)}`,
    sol,
    tokens: tokens.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    price,
    time: "Just now",
    isNew: true
  }
}

export default function TokenDetailPage() {
  const [transactions, setTransactions] = useState([
    { id: 1, type: "BUY", hash: "5xKpT...3mNq", wallet: "7nVbR...4kLp", sol: "2.5", tokens: "5,952", price: "$0.000092", time: "2 mins ago", isNew: false },
    { id: 2, type: "SELL", hash: "8tWnQ...7jMp", wallet: "3sWpT...2jNm", sol: "1.8", tokens: "4,285", price: "$0.000089", time: "5 mins ago", isNew: false },
    { id: 3, type: "BUY", hash: "2nLpK...9qRt", wallet: "9kTmP...8jLw", sol: "5.2", tokens: "12,450", price: "$0.000095", time: "8 mins ago", isNew: false },
    { id: 4, type: "BUY", hash: "4pQrM...1wNs", wallet: "2xVnT...5mKp", sol: "3.8", tokens: "9,120", price: "$0.000091", time: "12 mins ago", isNew: false },
  ])

  const [copiedCA, setCopiedCA] = useState(false)
  const params = useParams() as { id?: string }
  const contractAddress = params.id ?? ''
  const mintAddress = params.id ?? ''

  const [meta, setMeta] = useState<any>(null)
  const [loadingMeta, setLoadingMeta] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [marketActivity, setMarketActivity] = useState<any>(null)
  const [loadingMarketActivity, setLoadingMarketActivity] = useState(false)

  const activityFor = (period: '5m' | '1h' | '6h' | '24h') => {
    // Pump market-activity returns data[0] with keys '5m','1h','6h','24h'
    if (!marketActivity) return null
    return marketActivity[period] ?? null
  }

  const formatPercent = (v?: number | null) => {
    if (v == null || Number.isNaN(v)) return '—'
    const sign = v > 0 ? '+' : ''
    return `${sign}${Number(v).toFixed(2)}%`
  }

  const normalizeSocialUrl = (value?: string, type?: 'twitter' | 'telegram' | 'website') => {
    if (!value) return ''
    const v = value.trim()
    if (/^https?:\/\//i.test(v)) return v
    if (type === 'twitter') {
      const handle = v.replace(/^@/, '')
      if (handle.includes('twitter.com')) return `https://${handle.replace(/^https?:\/\//, '')}`
      return `https://twitter.com/${handle}`
    }
    if (type === 'telegram') {
      const handle = v.replace(/^@/, '')
      if (handle.includes('t.me') || handle.includes('telegram')) return `https://${handle.replace(/^https?:\/\//, '')}`
      return `https://t.me/${handle}`
    }
    if (/^[a-z0-9.-]+\./i.test(v)) return `https://${v}`
    return v
  }

  const formatCurrency = (v?: number | null) => {
    if (v == null || Number.isNaN(v)) return '—'
    const abs = Math.abs(v)
    const opts: Intl.NumberFormatOptions = abs >= 1000 ? { notation: 'compact', maximumFractionDigits: 0 } : { maximumFractionDigits: 6 }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', ...opts }).format(v)
  }

  const formatCompact = (v?: number | null) => {
    if (v == null || Number.isNaN(v)) return '—'
    return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2 }).format(v)
  }

  const formatSol = (lamports?: number | null) => {
    if (lamports == null || Number.isNaN(lamports)) return '—'
    const sol = lamports / 1e9
    return `${sol.toLocaleString('en-US', { maximumFractionDigits: 3 })} SOL`
  }

  useEffect(() => {
    if (!mintAddress) return
    let mounted = true
    ;(async () => {
      setLoadingMeta(true)
      try {
        const res = await fetch(`/api/pump/coins-metadata/${mintAddress}`)
        if (!res.ok) throw new Error(`status ${res.status}`)
        const json = await res.json()
        // normalize: server returns { status, message, data: [ ... ] }
        const dataArray = json?.data ?? (Array.isArray(json) ? json : undefined)
        const first = Array.isArray(dataArray) ? dataArray[0] : (dataArray ?? json)
        if (mounted) setMeta(first)
      } catch (err) {
        console.warn('Failed to load metadata', err)
        if (mounted) setMeta(null)
      } finally {
        if (mounted) setLoadingMeta(false)
      }
    })()
    return () => { mounted = false }
  }, [mintAddress])

  // Fetch market-activity using pump_swap_pool from meta
  useEffect(() => {
    if (!meta?.pump_swap_pool) return
    let mounted = true
    ;(async () => {
      setLoadingMarketActivity(true)
      try {
        const res = await fetch(`/api/pump/market-activity/${encodeURIComponent(meta.pump_swap_pool)}`)
        if (!res.ok) throw new Error(`status ${res.status}`)
        const json = await res.json()
        const dataArray = json?.data ?? (Array.isArray(json) ? json : undefined)
        const first = Array.isArray(dataArray) ? dataArray[0] : (dataArray ?? json)
        if (mounted) setMarketActivity(first)
      } catch (err) {
        console.warn('Failed to load market activity', err)
        if (mounted) setMarketActivity(null)
      } finally {
        if (mounted) setLoadingMarketActivity(false)
      }
    })()
    return () => { mounted = false }
  }, [meta?.pump_swap_pool])

  const handleCopyCA = () => {
    navigator.clipboard.writeText(contractAddress)
    setCopiedCA(true)
    toast.success("Contract address copied!")
    setTimeout(() => setCopiedCA(false), 2000)
  }

   

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex items-center gap-4">
                {/** use metadata when available */}
                {loadingMeta ? (
                  <>
                    <div className="size-16 rounded-full bg-muted/30 animate-pulse" />
                    <div>
                      <div className="h-6 w-40 bg-muted/30 rounded animate-pulse" />
                      <div className="mt-1 h-4 w-20 bg-muted/30 rounded animate-pulse" />
                    </div>
                  </>
                ) : (
                  (() => {
                    const c = meta?.data ?? meta ?? {}
                    const img = c?.image_uri || '/pepe-ai-token.jpg'
                    const name = c?.name || 'Token'
                    const symbol = c?.symbol || '—'
                    const chain = c?.chain || 'Solana'
                    const website = normalizeSocialUrl(c?.website || c?.site_url || c?.website_url, 'website')
                    const twitter = normalizeSocialUrl(c?.twitter || c?.twitter_handle, 'twitter')
                    const telegram = normalizeSocialUrl(c?.telegram || c?.telegram_handle, 'telegram')

                    return (
                      <>
                        <img src={img} alt={name} className="size-16 rounded-full" />
                        <div>
                          <h1 className="text-2xl font-bold">{name}</h1>
                          <p className="text-muted-foreground">{symbol}</p>
                          <Badge variant="secondary" className="mt-1">{chain}</Badge>
                        </div>

                        <div className="flex gap-2 ml-4">
                          {website ? (
                            <Button variant="outline" size="icon" asChild>
                              <a href={website} target="_blank" rel="noopener noreferrer">
                                <IconWorld className="size-4" />
                              </a>
                            </Button>
                          ) : (
                            <Button variant="outline" size="icon" disabled aria-hidden>
                              <IconWorld className="size-4" />
                            </Button>
                          )}

                          {twitter ? (
                            <Button variant="outline" size="icon" asChild>
                              <a href={twitter} target="_blank" rel="noopener noreferrer">
                                <IconBrandX className="size-4" />
                              </a>
                            </Button>
                          ) : (
                            <Button variant="outline" size="icon" disabled aria-hidden>
                              <IconBrandX className="size-4" />
                            </Button>
                          )}

                          {telegram ? (
                            <Button variant="outline" size="icon" asChild>
                              <a href={telegram} target="_blank" rel="noopener noreferrer">
                                <IconBrandTelegram className="size-4" />
                              </a>
                            </Button>
                          ) : (
                            <Button variant="outline" size="icon" disabled aria-hidden>
                              <IconBrandTelegram className="size-4" />
                            </Button>
                          )}
                        </div>
                      </>
                    )
                  })()
                )}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-4 md:grid-cols-3">
              {/* Full-width DEXscreener embed */}
              <div className="col-span-3 md:col-span-3">
                {/* DEXscreener embed (uses `mintAddress` from route `id`) */}
                {mintAddress ? (
                  <div className="relative" style={{ height: 'calc(100vh - var(--header-height))' }}>
                    {!iframeLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-muted/60 z-10">
                        <div className="h-8 w-8 rounded-full border-4 border-primary animate-spin" />
                      </div>
                    )}
                    <iframe
                      src={`https://dexscreener.com/solana/${mintAddress}?embed=1&info=0&theme=dark`}
                      title="Dexscreener Embed"
                      onLoad={() => setIframeLoaded(true)}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0, display: 'block' }}
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      allowFullScreen
                    />
                    {/* Visual overlay to hide DEXscreener footer/branding area */}
                    <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-12 bg-[#050508] z-20" />
                  </div>
                ) : (
                  <div className="rounded-lg border bg-muted/50 p-6 text-center text-sm text-muted-foreground">
                    No mint address provided in the URL.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
