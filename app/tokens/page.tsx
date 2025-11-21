"use client"

import * as React from "react"
import Link from "next/link"
import { IconBrandTelegram, IconBrandX, IconGlobe, IconX, IconCopy } from "@tabler/icons-react"
import { toast } from "sonner"
import { useWallet } from '@solana/wallet-adapter-react'
import { useRouter } from 'next/navigation'

import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Token = {
  id: string
  name: string
  symbol: string
  logo: string
  launchpad: string
  change24h: number
  marketCap: string
  age: string
  website: string
  twitter: string
  telegram: string
  contractAddress: string
  isNew?: boolean
}
// live data will be used; no local mock generator

const launchpads = [
  "All", 
  "Pumpfun" 
]

export default function TokensPage() {
  const { publicKey } = useWallet()
  const router = useRouter()
  const [selectedLaunchpad, setSelectedLaunchpad] = React.useState("All")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [tokens, setTokens] = React.useState<Token[]>([])
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const topIdRef = React.useRef<string | null>(null)
  const truncateAddress = (addr?: string) => {
    if (!addr) return ''
    if (addr.length <= 10) return addr
    return `${addr.slice(0, 4)}.....${addr.slice(-5)}`
  }

  const normalizeSocialUrl = (value?: string, type?: 'twitter' | 'telegram' | 'website') => {
    if (!value) return ''
    const v = value.trim()
    // If already a full URL, return as-is (ensure protocol)
    if (/^https?:\/\//i.test(v)) return v

    if (type === 'twitter') {
      // handle: @user or user or twitter.com/user
      const handle = v.replace(/^@/, '')
      if (handle.includes('twitter.com')) return `https://${handle.replace(/^https?:\/\//, '')}`
      return `https://twitter.com/${handle}`
    }

    if (type === 'telegram') {
      // handle: @user or user or t.me/user
      const handle = v.replace(/^@/, '')
      if (handle.includes('t.me') || handle.includes('telegram')) return `https://${handle.replace(/^https?:\/\//, '')}`
      return `https://t.me/${handle}`
    }

    // fallback: website
    // if value looks like domain, prefix https://
    if (/^[a-z0-9.-]+\./i.test(v)) return `https://${v}`
    return v
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

  const computePriceFromReserves = (virtualSol?: number | string, virtualToken?: number | string) => {
    const vs = Number(virtualSol ?? 0)
    const vt = Number(virtualToken ?? 0)
    if (!isFinite(vs) || !isFinite(vt) || vt === 0) return null
    const p = vs / vt
    // format: if very small, show 6 decimals, else up to 4 or short format
    if (Math.abs(p) < 0.0001) return `${p.toExponential(3)}`
    if (Math.abs(p) < 1) return `${p.toFixed(6).replace(/\.0+$/, '')}`
    return `${formatShortNumber(p)}`
  }

  const computeLiquidityFromReserves = (realSol?: number | string) => {
    const rs = Number(realSol ?? 0)
    if (!isFinite(rs)) return null
    // divide by 1e9 as requested
    const liq = rs / 1e9
    return `${formatShortNumber(liq)}`
  }

  React.useEffect(() => {
    audioRef.current = new Audio('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/notification-dexboost-nPStRQVlknoWjTTp97hOgZ9fQWGKfo.mp3')
    audioRef.current.volume = 0.5
  }, [])

  // Poll /api/token/new-token every second and update tokens with live data
  React.useEffect(() => {
    let mounted = true

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

    const mapItem = (item: any): Token => {
      // Support both shapes: { coin: { ... } } and { mint: ..., name: ... }
      const c = item?.coin ?? item ?? {}
      const usd = typeof c.usd_market_cap === 'number' ? c.usd_market_cap : Number(c.usd_market_cap || 0)
      const market = typeof c.market_cap === 'number' ? c.market_cap : Number(c.market_cap || 0)
      return {
        id: c.mint,
        name: c.name || 'Unknown',
        symbol: c.symbol || '—',
        logo: c.image_uri || '/placeholder.svg',
        launchpad: 'pump',
        change24h: isFinite(market) ? market : 0,
        marketCap: isFinite(market) ? formatShortNumber(market, { currency: true }) : '—',
        age: formatAge(c.created_timestamp),
        website: c.website || '',
        twitter: c.twitter || '',
        telegram: c.telegram || '',
        contractAddress: c.mint,
        isNew: true,
      }
    }

    const fetchAndUpdate = async () => {
      try {
        const res = await fetch('/api/token/new-token')
        if (!res.ok) return
        const json = await res.json()
        const arr = Array.isArray(json?.data) ? json.data : []
        if (arr.length === 0) return

        const mapped: Token[] = arr.map(mapItem)

        // Notify if top changed
        const top = mapped[0]
        if (top && top.id && top.id !== topIdRef.current) {
          topIdRef.current = top.id

          if (notificationsEnabled && publicKey && audioRef.current) {
            audioRef.current.play().catch((e) => console.log('[v0] Audio playback failed:', e))
          }

          // close existing toasts first so they don't stack, then show new toast
          try {
            toast.dismiss()
          } catch (e) {
            // ignore
          }

          // show toast similar to previous behavior
          toast.custom(
            (t) => (
              <div className="bg-background border-border font-sans relative flex w-[350px] flex-col gap-3 rounded-lg border p-4 shadow-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 size-6"
                  onClick={() => toast.dismiss(t)}
                >
                  <IconX className="size-4" />
                </Button>

                <div className="flex items-start gap-3">
                  <img src={top.logo || '/placeholder.svg'} alt={top.name} className="size-10 rounded-full border" />
                  <div className="flex-1">
                    <div className="font-semibold">{top.name}</div>
                    <div className="text-muted-foreground text-sm">{top.symbol} • {top.launchpad}</div>
                    <div
                      className="text-muted-foreground text-xs cursor-pointer"
                      title={top.contractAddress}
                      onClick={(e) => {
                        e.stopPropagation()
                        try {
                          navigator.clipboard.writeText(top.contractAddress || '')
                          toast.success('Contract address copied!')
                        } catch (err) {
                          console.warn('clipboard write failed', err)
                        }
                      }}
                    >
                      {truncateAddress(top.contractAddress)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="text-muted-foreground">Market Cap</div>
                    <div className="font-semibold">{top.marketCap}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Age</div>
                    <div className="font-semibold">{top.age}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {
                    (() => {
                      const trojanUrl = `https://t.me/solana_trojanbot?start=r-duskkzz-${encodeURIComponent(String(top.contractAddress || top.id || ''))}`
                      return (
                        <Button size="sm" className="flex-1 gap-1.5" variant="outline" asChild>
                          <a href={trojanUrl} target="_blank" rel="noopener noreferrer">
                            <img src="/trojanbot.png" alt="Trojan" className="size-4" />
                            Trojan
                          </a>
                        </Button>
                      )
                    })()
                  }
                  <Button size="sm" className="flex-1 gap-1.5" variant="outline">
                    <img src="/axiombot.png" alt="Axiom" className="size-4" />
                    Axiom
                  </Button>
                  <Button size="sm" className="flex-1 gap-1.5" variant="outline">
                    <img src="/mastrobot.png" alt="Maestro" className="size-4" />
                    Maestro
                  </Button>
                </div>
              </div>
            ),
            { duration: 5000 }
          )
        }

        if (!mounted) return

        setTokens(mapped)

        // clear isNew flag after 3s for top item
        if (top?.id) {
          const id = top.id
          setTimeout(() => {
            setTokens((prev) => prev.map((t) => (t.id === id ? { ...t, isNew: false } : t)))
          }, 3000)
        }
      } catch (err) {
        console.warn('[v0] Failed to fetch new-token:', err)
      }
    }

    // initial fetch then poll every 1 second
    fetchAndUpdate()
    const iv = setInterval(fetchAndUpdate, 1000)
    return () => {
      mounted = false
      clearInterval(iv)
    }
  }, [notificationsEnabled, publicKey])

  React.useEffect(() => {
    const settings = localStorage.getItem("notification-settings")
    if (settings) {
      const parsed = JSON.parse(settings)
      setNotificationsEnabled(parsed.newTokens ?? true)
    }
  }, [])

  const filteredTokens = React.useMemo(() => {
    return tokens.filter((token) => {
      const matchesLaunchpad =
        selectedLaunchpad === "All" || token.launchpad === selectedLaunchpad
      const matchesSearch =
        searchQuery === "" ||
        token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesLaunchpad && matchesSearch
    })
  }, [tokens, selectedLaunchpad, searchQuery])

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
        <div className="flex min-h-screen w-full flex-col">
          <main className="@container/main flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">New Tokens</h1>
            </div>

            <div className="flex flex-col gap-4">
              <Tabs value={selectedLaunchpad} onValueChange={setSelectedLaunchpad}>
                <TabsList className="w-full justify-start overflow-x-auto">
                  {launchpads.map((lp) => (
                    <TabsTrigger key={lp} value={lp}>
                      {lp}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <div>
                <Label htmlFor="search" className="sr-only">
                  Search tokens
                </Label>
                <Input
                  id="search"
                  placeholder="Search tokens by name or symbol..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
              </div>

              <div className="overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader className="bg-muted">
                    <TableRow>
                      <TableHead>Token Name</TableHead>
                      <TableHead>Launchpad</TableHead>
                      <TableHead>CA</TableHead> 
                      <TableHead className="text-right">Market Cap</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead className="text-center">Social Media</TableHead>
                      <TableHead className="text-center">Buy</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTokens.map((token) => (
                      <TableRow
                        key={token.id}
                        onClick={() => router.push(`/tokens/${token.id}`)}
                        className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                          token.isNew
                            ? "animate-fade-in-down bg-primary/10"
                            : ""
                        }`}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={token.logo || "/placeholder.svg"}
                              alt={token.name}
                              className="size-8 rounded-full"
                            />
                            <div>
                              <div className="font-medium">{token.name}</div>
                              <div className="text-muted-foreground text-sm">
                                {token.symbol}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{token.launchpad}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <span
                                className="font-mono text-xs text-muted-foreground cursor-pointer"
                                title={token.contractAddress}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  try {
                                    navigator.clipboard.writeText(token.contractAddress || '')
                                    toast.success('Contract address copied!')
                                  } catch (err) {
                                    console.warn('clipboard write failed', err)
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
                        <TableCell className="text-right font-mono">
                          {token.marketCap}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{token.age}</Badge>
                        </TableCell>
                        <TableCell>
                          <div
                            className="flex items-center justify-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {(() => {
                              const websiteUrl = normalizeSocialUrl(token.website, 'website')
                              const twitterUrl = normalizeSocialUrl(token.twitter, 'twitter')
                              const telegramUrl = normalizeSocialUrl(token.telegram, 'telegram')
                              return (
                                <>
                                  {websiteUrl ? (
                                    <Button variant="ghost" size="icon" className="size-8" asChild>
                                      <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                                        <IconGlobe className="size-4" />
                                      </a>
                                    </Button>
                                  ) : (
                                    <Button variant="ghost" size="icon" className="size-8" disabled>
                                      <IconGlobe className="size-4" />
                                    </Button>
                                  )}

                                  {twitterUrl ? (
                                    <Button variant="ghost" size="icon" className="size-8" asChild>
                                      <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                                        <IconBrandX className="size-4" />
                                      </a>
                                    </Button>
                                  ) : (
                                    <Button variant="ghost" size="icon" className="size-8" disabled>
                                      <IconBrandX className="size-4" />
                                    </Button>
                                  )}

                                  {telegramUrl ? (
                                    <Button variant="ghost" size="icon" className="size-8" asChild>
                                      <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
                                        <IconBrandTelegram className="size-4" />
                                      </a>
                                    </Button>
                                  ) : (
                                    <Button variant="ghost" size="icon" className="size-8" disabled>
                                      <IconBrandTelegram className="size-4" />
                                    </Button>
                                  )}
                                </>
                              )
                            })()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className="flex items-center justify-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button variant="ghost" size="sm" className="flex h-auto flex-col gap-0.5 px-2 py-1" asChild>
                              <a href={`https://t.me/solana_trojanbot?start=r-duskkzz-${encodeURIComponent(String(token.contractAddress || token.id || ''))}`} target="_blank" rel="noopener noreferrer">
                                <img src="/trojanbot.png" alt="Trojan Bot" className="size-5" />
                                <span className="text-[10px] font-medium">TRJ</span>
                              </a>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex h-auto flex-col gap-0.5 px-2 py-1" asChild>
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                <img src="/axiombot.png" alt="Axiom Bot" className="size-5" />
                                <span className="text-[10px] font-medium">AXI</span>
                              </a>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex h-auto flex-col gap-0.5 px-2 py-1" asChild>
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                <img src="/mastrobot.png" alt="Maestro Bot" className="size-5" />
                                <span className="text-[10px] font-medium">MAE</span>
                              </a>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
