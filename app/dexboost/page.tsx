"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/navigation'
import { IconBrandTelegram, IconWorld, IconBrandX, IconRocket, IconX, IconCopy } from "@tabler/icons-react"
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useWallet } from '@solana/wallet-adapter-react'

const initialBoostedTokens = [
  { id: "1", name: "Pepe AI", symbol: "PEPEAI", chain: "Solana", price: "$0.00012", change: "+45.2%", marketCap: "$12.5M", boosts: 12, boostTime: "5m ago", logo: "https://cryptologos.cc/logos/pepe-pepe-logo.png", contractAddress: "abc...xyz" },
  { id: "2", name: "Shiba Inu", symbol: "SHIB", chain: "Ethereum", price: "$0.00089", change: "+32.8%", marketCap: "$8.9M", boosts: 8, boostTime: "12m ago", logo: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png", contractAddress: "def...uvw" },
  { id: "3", name: "Dogecoin", symbol: "DOGE", chain: "Dogecoin", price: "$0.00156", change: "-12.3%", marketCap: "$18.2M", boosts: 15, boostTime: "18m ago", logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.png", contractAddress: "ghi...rst" },
  { id: "4", name: "SafeMoon", symbol: "SAFEMOON", chain: "BSC", price: "$0.00234", change: "+67.5%", marketCap: "$28.4M", boosts: 6, boostTime: "25m ago", logo: "https://cryptologos.cc/logos/safemoon-safemoon-logo.png", contractAddress: "jkl...pqr" },
  { id: "5", name: "Floki Inu", symbol: "FLOKI", chain: "Ethereum", price: "$0.00045", change: "+23.1%", marketCap: "$6.8M", boosts: 10, boostTime: "32m ago", logo: "https://cryptologos.cc/logos/floki-inu-floki-logo.png", contractAddress: "mno...opq" },
  { id: "6", name: "Baby Doge", symbol: "BABYDOGE", chain: "BSC", price: "$0.00178", change: "+89.4%", marketCap: "$22.1M", boosts: 18, boostTime: "38m ago", logo: "https://cryptologos.cc/logos/baby-doge-coin-babydoge-logo.png", contractAddress: "pqr...lmn" },
  { id: "7", name: "Akita Inu", symbol: "AKITA", chain: "Ethereum", price: "$0.00092", change: "-8.7%", marketCap: "$11.3M", boosts: 7, boostTime: "45m ago", logo: "https://cryptologos.cc/logos/akita-inu-akita-logo.png", contractAddress: "stu...ijk" },
  { id: "8", name: "Kishu Inu", symbol: "KISHU", chain: "Ethereum", price: "$0.00067", change: "+34.9%", marketCap: "$9.2M", boosts: 11, boostTime: "52m ago", logo: "https://cryptologos.cc/logos/kishu-inu-kishu-logo.png", contractAddress: "vwx...ghi" },
]

export default function DexBoostPage() {
  const { publicKey } = useWallet()
  const [searchQuery, setSearchQuery] = useState("")
  const [tokens, setTokens] = useState(initialBoostedTokens)
  const router = useRouter()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/notification-dexboost-nPStRQVlknoWjTTp97hOgZ9fQWGKfo.mp3')
    audioRef.current.volume = 0.5
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const newBoostToken = {
        id: `boost-${Date.now()}`,
        name: "New Boost Token",
        symbol: "NBT",
        chain: "Solana",
        price: `$0.000${Math.floor(Math.random() * 90) + 10}`,
        change: `+${Math.floor(Math.random() * 50) + 20}.${Math.floor(Math.random() * 9)}%`,
        marketCap: `$${Math.floor(Math.random() * 20) + 5}.${Math.floor(Math.random() * 9)}M`,
        boosts: Math.floor(Math.random() * 15) + 5,
        boostTime: "Just now",
        logo: "https://cryptologos.cc/logos/pepe-pepe-logo.png",
        contractAddress: `${Math.random().toString(36).substring(2, 5)}...${Math.random().toString(36).substring(2, 5)}`,
        isNew: true
      }

      setTokens(prev => [newBoostToken, ...prev])
      
      if (publicKey && audioRef.current) {
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
                  src={newBoostToken.logo || "/placeholder.svg"}
                  alt={newBoostToken.name}
                  className="size-10 rounded-full border"
                />
                <div className="flex-1">
                  <div className="font-semibold">{newBoostToken.name}</div>
                  <div className="text-muted-foreground text-sm">
                    {newBoostToken.symbol} • {newBoostToken.chain}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="text-muted-foreground">Price</div>
                  <div className="font-semibold">{newBoostToken.price}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Boosts</div>
                  <div className="flex items-center gap-1 font-semibold text-primary">
                    <IconRocket className="size-4" />
                    {newBoostToken.boosts}x
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Market Cap</div>
                  <div className="font-semibold">{newBoostToken.marketCap}</div>
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
            t.id === newBoostToken.id ? { ...t, isNew: false } : t
          )
        )
      }, 3000)
    }, 6000) // Reduced interval from 12000ms to 6000ms (6 seconds) for faster notifications

    return () => clearInterval(interval)
  }, [publicKey])

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
                <h1 className="text-2xl font-bold">DexBoost</h1>
                <p className="text-muted-foreground">
                  Tokens that received boost signals from DexScreener
                </p>
              </div>

              <Input
                placeholder="Search boosted tokens by name or symbol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />

              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Token Information</TableHead>
                      <TableHead>Chain</TableHead>
                      <TableHead>CA</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>24h Change</TableHead>
                      <TableHead>Market Cap</TableHead>
                      <TableHead>Boosts</TableHead>
                      <TableHead>Boost Time</TableHead>
                      <TableHead className="text-right">Social Media</TableHead>
                      <TableHead className="text-right">Buy</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTokens.map((token) => (
                      <TableRow 
                        key={token.id} 
                        className={`cursor-pointer hover:bg-muted/50 ${
                          token.isNew
                            ? "animate-fade-in-down bg-primary/10"
                            : ""
                        }`}
                        onClick={() => router.push(`/tokens/${token.id}`)}
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
                              <div className="text-sm text-muted-foreground">{token.symbol}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{token.chain}</Badge>
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
                        <TableCell className="font-semibold">
                          {token.price}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              token.change.startsWith("+")
                                ? "border-green-600/20 bg-green-600/10 text-green-600 dark:text-green-400"
                                : "border-red-600/20 bg-red-600/10 text-red-600 dark:text-red-400"
                            }
                          >
                            {token.change}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {token.marketCap}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-primary">
                            <IconRocket className="size-4" />
                            <span className="font-semibold">{token.boosts}x</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {token.boostTime}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="size-8" asChild>
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                <IconWorld className="size-4" />
                              </a>
                            </Button>
                            <Button variant="ghost" size="icon" className="size-8" asChild>
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                <IconBrandX className="size-4" />
                              </a>
                            </Button>
                            <Button variant="ghost" size="icon" className="size-8" asChild>
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                <IconBrandTelegram className="size-4" />
                              </a>
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
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

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredTokens.length} tokens
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
