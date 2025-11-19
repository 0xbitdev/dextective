"use client"

import { useState } from "react"
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

const mockTrendingTokens = [
  { id: "1", name: "Bitcoin", symbol: "BTC", price: "$45,234.00", change: "+5.2%", volume: "$28.5B", marketCap: "$890B", chain: "Bitcoin", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png", contractAddress: "abc...xyz" },
  { id: "2", name: "Ethereum", symbol: "ETH", price: "$3,234.00", change: "+3.8%", volume: "$15.2B", marketCap: "$390B", chain: "Ethereum", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png", contractAddress: "def...uvw" },
  { id: "3", name: "Solana", symbol: "SOL", price: "$132.00", change: "+12.5%", volume: "$4.8B", marketCap: "$58B", chain: "Solana", logo: "https://cryptologos.cc/logos/solana-sol-logo.png", contractAddress: "ghi...rst" },
  { id: "4", name: "Cardano", symbol: "ADA", price: "$0.52", change: "+7.3%", volume: "$1.2B", marketCap: "$18B", chain: "Cardano", logo: "https://cryptologos.cc/logos/cardano-ada-logo.png", contractAddress: "jkl...pqr" },
  { id: "5", name: "Polygon", symbol: "MATIC", price: "$0.88", change: "+4.1%", volume: "$890M", marketCap: "$8.2B", chain: "Polygon", logo: "https://cryptologos.cc/logos/polygon-matic-logo.png", contractAddress: "mno...opq" },
  { id: "6", name: "Avalanche", symbol: "AVAX", price: "$38.20", change: "+6.9%", volume: "$1.5B", marketCap: "$14B", chain: "Avalanche", logo: "https://cryptologos.cc/logos/avalanche-avax-logo.png", contractAddress: "pqr...lmn" },
  { id: "7", name: "Chainlink", symbol: "LINK", price: "$15.40", change: "+8.2%", volume: "$1.1B", marketCap: "$8.8B", chain: "Ethereum", logo: "https://cryptologos.cc/logos/chainlink-link-logo.png", contractAddress: "stu...ijk" },
  { id: "8", name: "Uniswap", symbol: "UNI", price: "$6.80", change: "+3.5%", volume: "$650M", marketCap: "$5.2B", chain: "Ethereum", logo: "https://cryptologos.cc/logos/uniswap-uni-logo.png", contractAddress: "vwx...ghi" },
]

export default function WatchlistPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const filteredTokens = mockTrendingTokens.filter(token =>
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
                      <TableHead>24h Change</TableHead>
                      <TableHead>24h Volume</TableHead>
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
                        <TableCell className="text-lg font-bold">
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
                        <TableCell className="text-lg font-bold">
                          {token.volume}
                        </TableCell>
                        <TableCell className="text-lg font-bold">
                          {token.marketCap}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{token.chain}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              asChild
                            >
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                <IconWorld className="size-4" />
                              </a>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              asChild
                            >
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                <IconBrandX className="size-4" />
                              </a>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              asChild
                            >
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                <IconBrandTelegram className="size-4" />
                              </a>
                            </Button>
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
                  Showing {filteredTokens.length} of {mockTrendingTokens.length} tokens
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
