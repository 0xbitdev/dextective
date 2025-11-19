"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/navigation'
import { IconBrandTelegram, IconWorld, IconBrandX, IconDiamond, IconX, IconCopy } from "@tabler/icons-react"
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { toast } from 'sonner'
import { useWallet } from '@solana/wallet-adapter-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

const initialPaidTokens = [
  { id: "1", name: "Premium Token", symbol: "PREM", chain: "Solana", price: "$0.00234", change: "+125.3%", marketCap: "$45.2M", tier: "Diamond", paidTime: "2m ago", logo: "https://cryptologos.cc/logos/solana-sol-logo.png", contractAddress: "abc...xyz" },
  { id: "2", name: "Elite Coin", symbol: "ELITE", chain: "Ethereum", price: "$0.00567", change: "+89.7%", marketCap: "$32.8M", tier: "Gold", paidTime: "8m ago", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png", contractAddress: "def...uvw" },
  { id: "3", name: "VIP Token", symbol: "VIP", chain: "BSC", price: "$0.00189", change: "+67.2%", marketCap: "$28.1M", tier: "Platinum", paidTime: "15m ago", logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png", contractAddress: "ghi...rst" },
  { id: "4", name: "Pro Coin", symbol: "PRO", chain: "Polygon", price: "$0.00345", change: "+54.9%", marketCap: "$19.5M", tier: "Silver", paidTime: "22m ago", logo: "https://cryptologos.cc/logos/polygon-matic-logo.png", contractAddress: "jkl...pqr" },
  { id: "5", name: "Featured Token", symbol: "FEAT", chain: "Solana", price: "$0.00123", change: "+142.6%", marketCap: "$51.3M", tier: "Diamond", paidTime: "28m ago", logo: "https://cryptologos.cc/logos/solana-sol-logo.png", contractAddress: "mno...opq" },
]

export default function DexPaidPage() {
  const { publicKey } = useWallet()
  const [searchQuery, setSearchQuery] = useState("")
  const [tokens, setTokens] = useState(initialPaidTokens)
  const router = useRouter()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/notification-dexboost-nPStRQVlknoWjTTp97hOgZ9fQWGKfo.mp3')
    audioRef.current.volume = 0.5
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const tiers = ["Diamond", "Platinum", "Gold", "Silver"]
      const chains = ["Solana", "Ethereum", "BSC", "Polygon"]
      
      const newPaidToken = {
        id: `paid-${Date.now()}`,
        name: "New Premium Token",
        symbol: "NPT",
        chain: chains[Math.floor(Math.random() * chains.length)],
        price: `$0.000${Math.floor(Math.random() * 90) + 10}`,
        change: `+${Math.floor(Math.random() * 100) + 50}.${Math.floor(Math.random() * 9)}%`,
        marketCap: `$${Math.floor(Math.random() * 40) + 10}.${Math.floor(Math.random() * 9)}M`,
        tier: tiers[Math.floor(Math.random() * tiers.length)],
        paidTime: "Just now",
        logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
        contractAddress: `${Math.random().toString(36).substring(2, 5)}...${Math.random().toString(36).substring(2, 5)}`,
        isNew: true
      }

      setTokens(prev => [newPaidToken, ...prev])
      
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
                  src={newPaidToken.logo || "/placeholder.svg"}
                  alt={newPaidToken.name}
                  className="size-10 rounded-full border"
                />
                <div className="flex-1">
                  <div className="font-semibold">{newPaidToken.name}</div>
                  <div className="text-muted-foreground text-sm">
                    {newPaidToken.symbol} • {newPaidToken.chain}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="text-muted-foreground">Price</div>
                  <div className="font-semibold">{newPaidToken.price}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Tier</div>
                  <div className="flex items-center gap-1 font-semibold text-primary">
                    <IconDiamond className="size-4" />
                    {newPaidToken.tier}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Market Cap</div>
                  <div className="font-semibold">{newPaidToken.marketCap}</div>
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
            t.id === newPaidToken.id ? { ...t, isNew: false } : t
          )
        )
      }, 3000)
    }, 7000) // Changed from 15000 to 7000 (7 seconds)

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
                <h1 className="text-2xl font-bold">DexPaid</h1>
                <p className="text-muted-foreground">
                  Premium featured tokens with paid promotion slots
                </p>
              </div>

              <Input
                placeholder="Search premium tokens by name or symbol..."
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
                      <TableHead>Tier</TableHead>
                      <TableHead>Paid Time</TableHead>
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
                            className="border-green-600/20 bg-green-600/10 text-green-600 dark:text-green-400"
                          >
                            {token.change}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {token.marketCap}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-primary">
                            <IconDiamond className="size-4" />
                            <span className="font-semibold">{token.tier}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {token.paidTime}
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
