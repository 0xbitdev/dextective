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
              {/* Chart - 2/3 width */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>24-Hour Price Chart</CardTitle>
                  <CardDescription>Candlestick chart with OHLC data</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {mintAddress ? (
                    <div className="relative h-[500px] w-full">
                      <iframe
                        src={`https://www.dexscreener.com/solana/${encodeURIComponent(mintAddress)}?embed=true`}
                        title="DEXscreener chart"
                        className="absolute inset-0 w-full h-full border-0 rounded"
                        onLoad={() => setIframeLoaded(true)}
                      />
                    </div>
                  ) : (
                    <div className="h-[200px] flex items-center justify-center text-sm text-muted-foreground">
                      No chart available
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Details Card - 1/3 width */}
              <Card className="md:col-span-1">
                <Tabs defaultValue="details" className="h-full w-full">
                  <CardHeader className="pb-2">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="details" className="text-sm font-medium">Details</TabsTrigger>
                      <TabsTrigger value="security" className="text-sm font-medium">Security</TabsTrigger>
                    </TabsList>
                  </CardHeader>

                  <TabsContent value="details" className="mt-0">
                    <CardContent className="space-y-4 pt-2">
                      {/* Contract Address Section */}
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold">Contract Address</h3>
                        <div className="flex items-start gap-2 rounded-lg border bg-muted/50 p-2">
                          <p className="flex-1 break-all font-mono text-[10px] leading-relaxed">
                            {contractAddress}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-6 shrink-0"
                            onClick={handleCopyCA}
                          >
                            {copiedCA ? (
                              <IconCheck className="size-3 text-green-600" />
                            ) : (
                              <IconCopy className="size-3" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      {/* Price Section */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold">Price</h3>
                        <div className="space-y-2">
                          <div>
                            <p className="text-[10px] text-muted-foreground">PRICE USD</p>
                            <div className="flex items-baseline gap-2">
                              <p className="text-lg font-bold">$0.00012</p>
                              <Badge variant="outline" className="border-green-600/20 bg-green-600/10 text-[10px] text-green-600">
                                +45.2%
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground">PRICE SOL</p>
                            <div className="flex items-baseline gap-2">
                              <p className="text-sm font-bold">0.00092 SOL</p>
                              <Badge variant="outline" className="border-green-600/20 bg-green-600/10 text-[10px] text-green-600">
                                +42.8%
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Market Data Section */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold">Market Data</h3>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Liquidity</span>
                            <span className="font-semibold">$850K</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Market Cap</span>
                            <span className="font-semibold">$12.5M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">FDV</span>
                            <span className="font-semibold">$15.8M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Holders</span>
                            <span className="font-semibold">2,847</span>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Volume Section */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold">Volume</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="rounded-lg border bg-muted/50 p-2">
                            <p className="text-[10px] text-muted-foreground">5M</p>
                            <p className="text-sm font-semibold">$45K</p>
                          </div>
                          <div className="rounded-lg border bg-muted/50 p-2">
                            <p className="text-[10px] text-muted-foreground">1H</p>
                            <p className="text-sm font-semibold">$520K</p>
                          </div>
                          <div className="rounded-lg border bg-muted/50 p-2">
                            <p className="text-[10px] text-muted-foreground">6H</p>
                            <p className="text-sm font-semibold">$1.8M</p>
                          </div>
                          <div className="rounded-lg border bg-muted/50 p-2">
                            <p className="text-[10px] text-muted-foreground">24H</p>
                            <p className="text-sm font-semibold">$2.4M</p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Transactions Section */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold">Transactions</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="rounded-lg border bg-muted/50 p-2">
                            <p className="text-[10px] text-muted-foreground">5M</p>
                            <div className="flex gap-1.5 text-xs font-medium">
                              <span className="text-green-600">42</span>
                              <span className="text-red-600">18</span>
                            </div>
                          </div>
                          <div className="rounded-lg border bg-muted/50 p-2">
                            <p className="text-[10px] text-muted-foreground">1H</p>
                            <div className="flex gap-1.5 text-xs font-medium">
                              <span className="text-green-600">284</span>
                              <span className="text-red-600">156</span>
                            </div>
                          </div>
                          <div className="rounded-lg border bg-muted/50 p-2">
                            <p className="text-[10px] text-muted-foreground">6H</p>
                            <div className="flex gap-1.5 text-xs font-medium">
                              <span className="text-green-600">1,245</span>
                              <span className="text-red-600">892</span>
                            </div>
                          </div>
                          <div className="rounded-lg border bg-muted/50 p-2">
                            <p className="text-[10px] text-muted-foreground">24H</p>
                            <div className="flex gap-1.5 text-xs font-medium">
                              <span className="text-green-600">3,847</span>
                              <span className="text-red-600">2,156</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </TabsContent>

                  <TabsContent value="security" className="mt-0">
                    <CardContent className="space-y-4 pt-2">
                      {/* Overall Security Score */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold">Security Score</h3>
                          <Badge className="bg-green-600 text-white">Safe</Badge>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border bg-green-600/5 p-3">
                          <IconShieldCheck className="size-8 text-green-600" />
                          <div className="flex-1">
                            <p className="text-2xl font-bold text-green-600">85/100</p>
                            <p className="text-xs text-muted-foreground">Good security rating</p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Contract Security */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold">Contract Security</h3>
                        <div className="space-y-2">
                          {/* Mint Authority */}
                          <div className="flex items-center justify-between rounded-lg border p-2">
                            <div className="flex items-center gap-2">
                              <IconLock className="size-4 text-green-600" />
                              <span className="text-xs">Mint Authority</span>
                            </div>
                            <Badge variant="outline" className="border-green-600/20 bg-green-600/10 text-green-600">
                              Revoked
                            </Badge>
                          </div>

                          {/* Freeze Authority */}
                          <div className="flex items-center justify-between rounded-lg border p-2">
                            <div className="flex items-center gap-2">
                              <IconLock className="size-4 text-green-600" />
                              <span className="text-xs">Freeze Authority</span>
                            </div>
                            <Badge variant="outline" className="border-green-600/20 bg-green-600/10 text-green-600">
                              Revoked
                            </Badge>
                          </div>

                          {/* LP Burned */}
                          <div className="flex items-center justify-between rounded-lg border p-2">
                            <div className="flex items-center gap-2">
                              <IconShieldCheck className="size-4 text-green-600" />
                              <span className="text-xs">LP Tokens</span>
                            </div>
                            <Badge variant="outline" className="border-green-600/20 bg-green-600/10 text-green-600">
                              100% Burned
                            </Badge>
                          </div>

                          {/* Owner Renounced */}
                          <div className="flex items-center justify-between rounded-lg border p-2">
                            <div className="flex items-center gap-2">
                              <IconShieldCheck className="size-4 text-green-600" />
                              <span className="text-xs">Ownership</span>
                            </div>
                            <Badge variant="outline" className="border-green-600/20 bg-green-600/10 text-green-600">
                              Renounced
                            </Badge>
                          </div>

                          {/* Top 10 Holders */}
                          <div className="flex items-center justify-between rounded-lg border p-2">
                            <div className="flex items-center gap-2">
                              <IconShieldCheck className="size-4 text-yellow-600" />
                              <span className="text-xs">Top 10 Holders</span>
                            </div>
                            <Badge variant="outline" className="border-yellow-600/20 bg-yellow-600/10 text-yellow-600">
                              28.5%
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Audit Information */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold">Audit Information</h3>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Contract Verified</span>
                            <span className="font-semibold text-green-600">Yes</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Honeypot Test</span>
                            <span className="font-semibold text-green-600">Passed</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Trading Enabled</span>
                            <span className="font-semibold text-green-600">Yes</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Max TX Amount</span>
                            <span className="font-semibold">No Limit</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Max Wallet</span>
                            <span className="font-semibold">No Limit</span>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Risk Warnings */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold">Risk Analysis</h3>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 rounded-lg border border-yellow-600/20 bg-yellow-600/5 p-2">
                            <IconShieldX className="size-4 shrink-0 text-yellow-600" />
                            <div>
                              <p className="text-xs font-medium">Moderate Risk</p>
                              <p className="text-[10px] text-muted-foreground">Top holders control significant percentage</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 rounded-lg border border-green-600/20 bg-green-600/5 p-2">
                            <IconShieldCheck className="size-4 shrink-0 text-green-600" />
                            <div>
                              <p className="text-xs font-medium">Low Risk</p>
                              <p className="text-[10px] text-muted-foreground">All critical authorities revoked</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Contract Details */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold">Contract Details</h3>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Created</span>
                            <span className="font-semibold">15 days ago</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Creator</span>
                            <span className="font-mono font-semibold">8pLq...3wMs</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Token Standard</span>
                            <span className="font-semibold">SPL Token</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Decimals</span>
                            <span className="font-semibold">9</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Supply</span>
                            <span className="font-semibold">1,000,000,000</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
