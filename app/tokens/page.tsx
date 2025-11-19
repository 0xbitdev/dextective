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
  price: string
  change24h: number
  volume: string
  liquidity: string
  marketCap: string
  age: string
  website: string
  twitter: string
  telegram: string
  contractAddress: string
  isNew?: boolean
}

const generateMockTokens = (launchpad: string, count: number = 15): Token[] => {
  const tokens = []
  for (let i = 0; i < count; i++) {
    const randomCA = `${Math.random().toString(36).substring(2, 5)}...${Math.random().toString(36).substring(2, 5)}`
    tokens.push({
      id: `${launchpad}-${i}`,
      name: `Token ${i + 1}`,
      symbol: `TKN${i + 1}`,
      logo: `/placeholder.svg?height=32&width=32&query=crypto-token-${i}`,
      launchpad,
      price: `$${(Math.random() * 10).toFixed(6)}`,
      change24h: (Math.random() * 200 - 100),
      volume: `$${(Math.random() * 1000000).toFixed(0)}`,
      liquidity: `$${(Math.random() * 500000).toFixed(0)}`,
      marketCap: `$${(Math.random() * 5000000).toFixed(0)}`,
      age: `${Math.floor(Math.random() * 60)}m ago`,
      website: "https://example.com",
      twitter: "https://twitter.com/example",
      telegram: "https://t.me/example",
      contractAddress: randomCA,
    })
  }
  return tokens
}

const launchpads = [
  "All",
  "Solana",
  "Pumpfun",
  "Meteora",
  "Bags",
  "Jup",
  "Raydium",
  "Bonk",
  "Heaven",
  "Orca",
  "Believe",
  "Monit",
  "Boop",
]

export default function TokensPage() {
  const { publicKey } = useWallet()
  const router = useRouter()
  const [selectedLaunchpad, setSelectedLaunchpad] = React.useState("All")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [tokens, setTokens] = React.useState<Token[]>(() =>
    launchpads.slice(1).flatMap((lp) => generateMockTokens(lp, 5))
  )
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)

  React.useEffect(() => {
    audioRef.current = new Audio('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/notification-dexboost-nPStRQVlknoWjTTp97hOgZ9fQWGKfo.mp3')
    audioRef.current.volume = 0.5
  }, [])

  React.useEffect(() => {
    const interval = setInterval(() => {
      const randomLaunchpad =
        launchpads[Math.floor(Math.random() * (launchpads.length - 1)) + 1]
      const newToken: Token = {
        id: `new-${Date.now()}`,
        name: `New Token ${Math.floor(Math.random() * 1000)}`,
        symbol: `NEW${Math.floor(Math.random() * 1000)}`,
        logo: `/placeholder.svg?height=32&width=32&query=new-token`,
        launchpad: randomLaunchpad,
        price: `$${(Math.random() * 10).toFixed(6)}`,
        change24h: Math.random() * 200 - 100,
        volume: `$${(Math.random() * 1000000).toFixed(0)}`,
        liquidity: `$${(Math.random() * 500000).toFixed(0)}`,
        marketCap: `$${(Math.random() * 5000000).toFixed(0)}`,
        age: "Just now",
        website: "https://example.com",
        twitter: "https://twitter.com/example",
        telegram: "https://t.me/example",
        contractAddress: `${Math.random().toString(36).substring(2, 5)}...${Math.random().toString(36).substring(2, 5)}`,
        isNew: true,
      }

      setTokens((prev) => [newToken, ...prev])

      if (notificationsEnabled && publicKey && audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.log("[v0] Audio playback failed:", error)
        })
        
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
                <img
                  src={newToken.logo || "/placeholder.svg"}
                  alt={newToken.name}
                  className="size-10 rounded-full border"
                />
                <div className="flex-1">
                  <div className="font-semibold">{newToken.name}</div>
                  <div className="text-muted-foreground text-sm">
                    {newToken.symbol} • {newToken.launchpad}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="text-muted-foreground">Price</div>
                  <div className="font-semibold">{newToken.price}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Liquidity</div>
                  <div className="font-semibold">{newToken.liquidity}</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 gap-1.5" variant="outline">
                  <img src="/trojanbot.png" alt="Trojan" className="size-4" />
                  Trojan
                </Button>
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

      setTimeout(() => {
        setTokens((prev) =>
          prev.map((t) =>
            t.id === newToken.id ? { ...t, isNew: false } : t
          )
        )
      }, 3000)
    }, 5000) // Reduced interval from 10000ms to 5000ms (5 seconds) for faster notifications

    return () => clearInterval(interval)
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
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">24h Change</TableHead>
                      <TableHead className="text-right">Volume</TableHead>
                      <TableHead className="text-right">Liquidity</TableHead>
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
                            <span className="font-mono text-xs text-muted-foreground">
                              {token.contractAddress}
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
                          {token.price}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="outline"
                            className={
                              token.change24h >= 0
                                ? "border-green-500/50 text-green-600 dark:text-green-400"
                                : "border-red-500/50 text-red-600 dark:text-red-400"
                            }
                          >
                            {token.change24h >= 0 ? "+" : ""}
                            {token.change24h.toFixed(2)}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {token.volume}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {token.liquidity}
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
                            <Button variant="ghost" size="icon" className="size-8" asChild>
                              <a href={token.website} target="_blank" rel="noopener noreferrer">
                                <IconGlobe className="size-4" />
                              </a>
                            </Button>
                            <Button variant="ghost" size="icon" className="size-8" asChild>
                              <a href={token.twitter} target="_blank" rel="noopener noreferrer">
                                <IconBrandX className="size-4" />
                              </a>
                            </Button>
                            <Button variant="ghost" size="icon" className="size-8" asChild>
                              <a href={token.telegram} target="_blank" rel="noopener noreferrer">
                                <IconBrandTelegram className="size-4" />
                              </a>
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className="flex items-center justify-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button variant="ghost" size="sm" className="flex h-auto flex-col gap-0.5 px-2 py-1" asChild>
                              <a href="#" target="_blank" rel="noopener noreferrer">
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
