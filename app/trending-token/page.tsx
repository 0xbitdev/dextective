"use client"

import React, { useState } from "react"
import { useRouter } from 'next/navigation'
import { IconBrandTelegram, IconWorld, IconBrandX, IconCopy } from "@tabler/icons-react"
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { toast } from 'react-toastify'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type TrendingToken = {
  id: string
  name: string
  symbol: string
  contractAddress: string
  logo: string
  price: string
  marketCap: string
  website?: string
  twitter?: string
  telegram?: string
  chain: string
}

const POLL_INTERVAL = 5000

export default function WatchlistPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [tokens, setTokens] = useState<TrendingToken[]>([])
  const router = useRouter()

  const truncateAddress = (addr?: string) => {
    if (!addr) return ''
    if (addr.length <= 10) return addr
    return `${addr.slice(0,4)}.....${addr.slice(-5)}`
  }

  const formatShortNumber = (value?: number | string, opts?: { currency?: boolean }) => {
    if (value === undefined || value === null || value === '') return '—'
    const num = typeof value === 'number' ? value : Number(String(value).replace(/[^0-9.-]+/g, ''))
    if (!isFinite(num)) return '—'
    const abs = Math.abs(num)
    let formatted = ''
    if (abs >= 1_000_000_000) {
      formatted = `${(num / 1_000_000_000).toFixed(2).replace(/\.00$/, '')}B`
    } else if (abs >= 1_000_000) {
      formatted = `${(num / 1_000_000).toFixed(2).replace(/\.00$/, '')}M`
    } else if (abs >= 1_000) {
      formatted = `${(num / 1_000).toFixed(2).replace(/\.00$/, '')}K`
    } else {
      formatted = `${num.toFixed(2).replace(/\.00$/, '')}`
    }
    return opts?.currency ? `$${formatted}` : formatted
  }

  const formatAge = (ts?: number) => {
    if (!ts) return '—'
    const diff = Date.now() - ts
    const sec = Math.floor(diff / 1000)
    if (sec < 60) return `${sec}s ago`
    const min = Math.floor(sec / 60)
    if (min < 60) return `${min}m ago`
    const hr = Math.floor(min / 60)
    if (hr < 24) return `${hr}h ago`
    const day = Math.floor(hr / 24)
    return `${day}d ago`
  }

  const computePriceFromReserves = (virtualSol?: number | string, virtualToken?: number | string) => {
    const vs = Number(virtualSol ?? 0)
    const vt = Number(virtualToken ?? 0)
    if (!isFinite(vs) || !isFinite(vt) || vt === 0) return null
    const p = vs / vt
    if (Math.abs(p) < 0.0001) return `${p.toExponential(3)} SOL`
    if (Math.abs(p) < 1) return `${p.toFixed(6)} SOL`
    return `${formatShortNumber(p)} SOL`
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

  const mapItem = (item: any): TrendingToken => {
    const c = item?.coin ?? item ?? {}
    const market = typeof c.market_cap === 'number' ? c.market_cap : Number(c.market_cap || 0)
    const usd = typeof c.usd_market_cap === 'number' ? c.usd_market_cap : Number(c.usd_market_cap || 0)
    const priceFromRes = computePriceFromReserves(c.virtual_sol_reserves, c.virtual_token_reserves)
    const price = priceFromRes ?? (isFinite(usd) ? formatShortNumber(usd, { currency: true }) : '—')
    const marketCap = isFinite(market) ? formatShortNumber(market, { currency: true }) : '—'
    return {
      id: c.mint,
      name: c.name || 'Unknown',
      symbol: c.symbol || '—',
      contractAddress: c.mint,
      logo: c.image_uri || '/placeholder.svg',
      price,
      marketCap,
      website: normalizeSocialUrl(c.website || c.site_url || c.website_url, 'website'),
      twitter: normalizeSocialUrl(c.twitter || c.twitter_handle, 'twitter'),
      telegram: normalizeSocialUrl(c.telegram || c.telegram_handle, 'telegram'),
      chain: 'Solana',
    }
  }

  const fetchTrending = async () => {
    try {
      const res = await fetch('/api/token/trending')
      if (!res.ok) return
      const json = await res.json()
      const arr = Array.isArray(json?.data) ? json.data : []
      const mapped = arr.map(mapItem)
      setTokens(mapped)
    } catch (err) {
      console.warn('Failed to fetch trending:', err)
    }
  }

  React.useEffect(() => {
    fetchTrending()
    const iv = setInterval(fetchTrending, POLL_INTERVAL)
    return () => clearInterval(iv)
  }, [])

  const filteredTokens = tokens.filter(token =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Trending Tokens</h1>
                <p className="text-muted-foreground">
                  Most active cryptocurrency tokens in the last 24 hours
                </p>
              </div>

              {/* Search Bar */}
              <Input
                placeholder="Search trending tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />

              {/* Trending Tokens Table */}
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Token Name</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>CA</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Market Cap</TableHead>
                      <TableHead>Chain</TableHead>
                      <TableHead className="text-right">Social Media</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTokens.map((token) => (
                      <TableRow 
                        key={token.id} 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => router.push(`/tokens/${token.id}`)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={token.logo || "/placeholder.svg"}
                              alt={token.name}
                              className="size-8 rounded-full"
                            />
                            <div className="font-medium">{token.name}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-muted-foreground">
                          {token.symbol}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <span
                              className="font-mono text-xs text-muted-foreground cursor-pointer"
                              title={token.contractAddress ? "Click to copy address" : ""}
                              role="button"
                              aria-label={token.contractAddress ? `Copy contract address ${token.contractAddress}` : undefined}
                              onClick={(e) => {
                                e.stopPropagation()
                                if (token.contractAddress) {
                                  navigator.clipboard.writeText(token.contractAddress)
                                  toast.success("Contract address copied!")
                                }
                              }}
                            >
                              {truncateAddress(token.contractAddress)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-6"
                              onClick={() => {
                                navigator.clipboard.writeText(token.contractAddress)
                                toast.success("Contract address copied!")
                              }}
                            >
                              <IconCopy className="size-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-bold">
                          {token.price}
                        </TableCell>
                        
                        <TableCell className="text-xs font-bold">
                          {token.marketCap}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{token.chain}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                            {/** Website button: disabled when no URL */}
                            {token.website ? (
                              <Button variant="ghost" size="icon" className="size-8" asChild>
                                <a href={token.website} target="_blank" rel="noopener noreferrer">
                                  <IconWorld className="size-4" />
                                </a>
                              </Button>
                            ) : (
                              <Button variant="ghost" size="icon" className="size-8" disabled aria-hidden>
                                <IconWorld className="size-4" />
                              </Button>
                            )}

                            {/** Twitter / X button: disabled when no URL */}
                            {token.twitter ? (
                              <Button variant="ghost" size="icon" className="size-8" asChild>
                                <a href={token.twitter} target="_blank" rel="noopener noreferrer">
                                  <IconBrandX className="size-4" />
                                </a>
                              </Button>
                            ) : (
                              <Button variant="ghost" size="icon" className="size-8" disabled aria-hidden>
                                <IconBrandX className="size-4" />
                              </Button>
                            )}

                            {/** Telegram button: disabled when no URL */}
                            {token.telegram ? (
                              <Button variant="ghost" size="icon" className="size-8" asChild>
                                <a href={token.telegram} target="_blank" rel="noopener noreferrer">
                                  <IconBrandTelegram className="size-4" />
                                </a>
                              </Button>
                            ) : (
                              <Button variant="ghost" size="icon" className="size-8" disabled aria-hidden>
                                <IconBrandTelegram className="size-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredTokens.length} of {tokens.length} tokens
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
