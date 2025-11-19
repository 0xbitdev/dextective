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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { Separator } from '@/components/ui/separator'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

// Mock candlestick data for 24 hours
const chartData = [
  { time: "00:00", open: 0.00012, high: 0.00015, low: 0.00011, close: 0.00014, volume: 2500 },
  { time: "04:00", open: 0.00014, high: 0.00016, low: 0.00013, close: 0.00015, volume: 3200 },
  { time: "08:00", open: 0.00015, high: 0.00018, low: 0.00014, close: 0.00017, volume: 4100 },
  { time: "12:00", open: 0.00017, high: 0.00019, low: 0.00015, close: 0.00018, volume: 5000 },
  { time: "16:00", open: 0.00018, high: 0.00021, low: 0.00017, close: 0.00020, volume: 4800 },
  { time: "20:00", open: 0.00020, high: 0.00022, low: 0.00019, close: 0.00021, volume: 3900 },
  { time: "24:00", open: 0.00021, high: 0.00023, low: 0.00020, close: 0.00022, volume: 4200 },
]

const chartConfig = {
  volume: {
    label: "Volume",
    color: "hsl(var(--primary))",
  },
}

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
  const contractAddress = "8p6ToBB8WEShfTkqeiTh9DXMaochXyToJqZojpf1VTep"

  const handleCopyCA = () => {
    navigator.clipboard.writeText(contractAddress)
    setCopiedCA(true)
    toast.success("Contract address copied!")
    setTimeout(() => setCopiedCA(false), 2000)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newTx = generateNewTransaction()
      setTransactions(prev => {
        const updated = [newTx, ...prev.slice(0, 9)].map((tx, idx) => ({
          ...tx,
          isNew: idx === 0 ? true : false
        }))
        return updated
      })
      
      toast.success(
        `New ${newTx.type} transaction: ${newTx.sol} SOL`,
        {
          description: `${newTx.tokens} PEPEAI at ${newTx.price}`,
          duration: 3000,
        }
      )

      // Remove isNew flag after animation
      setTimeout(() => {
        setTransactions(prev => prev.map(tx => ({ ...tx, isNew: false })))
      }, 1000)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

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
                <img
                  src="/pepe-ai-token.jpg"
                  alt="Token"
                  className="size-16 rounded-full"
                />
                <div>
                  <h1 className="text-2xl font-bold">Pepe AI</h1>
                  <p className="text-muted-foreground">PEPEAI</p>
                  <Badge variant="secondary" className="mt-1">Solana</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <IconWorld className="size-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <IconBrandX className="size-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <IconBrandTelegram className="size-4" />
                </Button>
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
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[500px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis tickFormatter={(value) => `$${value.toFixed(5)}`} />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={(value, name) => (
                                <div className="flex flex-col gap-1">
                                  <span className="text-xs text-muted-foreground">{name}</span>
                                  <span className="font-mono font-semibold">
                                    ${Number(value).toFixed(5)}
                                  </span>
                                </div>
                              )}
                            />
                          }
                        />
                        <Bar dataKey="volume" fill="var(--color-volume)" radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 p-1">
                    <TabsTrigger value="details" className="text-sm font-medium">Details</TabsTrigger>
                    <TabsTrigger value="security" className="text-sm font-medium">Security</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details">
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

                  <TabsContent value="security">
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

            {/* Tabs Section */}
            <Tabs defaultValue="transactions" className="w-full">
              <TabsList>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="holders">Top Holders</TabsTrigger>
                <TabsTrigger value="traders">Top Traders</TabsTrigger>
                <TabsTrigger value="kols">KOLs</TabsTrigger>
              </TabsList>

              <TabsContent value="transactions" className="mt-4">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Transaction Hash</TableHead>
                        <TableHead>Wallet</TableHead>
                        <TableHead>Amount (SOL)</TableHead>
                        <TableHead>Tokens</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((tx) => (
                        <TableRow 
                          key={tx.id}
                          className={tx.isNew ? 'animate-fade-in-down' : ''}
                        >
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                tx.type === "BUY"
                                  ? "border-green-600/20 bg-green-600/10 text-green-600"
                                  : "border-red-600/20 bg-red-600/10 text-red-600"
                              }
                            >
                              {tx.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{tx.hash}</TableCell>
                          <TableCell className="font-mono text-sm">{tx.wallet}</TableCell>
                          <TableCell className="font-semibold">{tx.sol} SOL</TableCell>
                          <TableCell>{tx.tokens} PEPEAI</TableCell>
                          <TableCell className="font-semibold">{tx.price}</TableCell>
                          <TableCell className="text-muted-foreground">{tx.time}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>

              <TabsContent value="holders" className="mt-4">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { rank: 1, address: "7nVbR...4kLp", balance: "125.5M", percentage: "12.5%" },
                        { rank: 2, address: "3sWpT...2jNm", balance: "98.2M", percentage: "9.8%" },
                        { rank: 3, address: "9kTmP...8jLw", balance: "76.8M", percentage: "7.7%" },
                        { rank: 4, address: "2xVnT...5mKp", balance: "54.3M", percentage: "5.4%" },
                        { rank: 5, address: "8pLqR...3wMs", balance: "42.1M", percentage: "4.2%" },
                      ].map((holder) => (
                        <TableRow key={holder.rank}>
                          <TableCell>
                            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                              #{holder.rank}
                            </div>
                          </TableCell>
                          <TableCell className="font-mono">{holder.address}</TableCell>
                          <TableCell className="font-semibold">{holder.balance}</TableCell>
                          <TableCell className="text-lg font-bold">{holder.percentage}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>

              <TabsContent value="traders" className="mt-4">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Total Profit</TableHead>
                        <TableHead>ROI</TableHead>
                        <TableHead>Total Trades</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { rank: 1, address: "7nVbR...4kLp", profit: "$45,230", roi: "342%", trades: 28 },
                        { rank: 2, address: "3sWpT...2jNm", profit: "$38,150", roi: "298%", trades: 45 },
                        { rank: 3, address: "9kTmP...8jLw", profit: "$29,840", roi: "245%", trades: 32 },
                        { rank: 4, address: "2xVnT...5mKp", profit: "$22,560", roi: "189%", trades: 54 },
                        { rank: 5, address: "8pLqR...3wMs", profit: "$18,920", roi: "156%", trades: 38 },
                      ].map((trader) => (
                        <TableRow key={trader.rank}>
                          <TableCell>
                            <div className="flex size-8 items-center justify-center rounded-full bg-green-600/10 font-semibold text-green-600">
                              #{trader.rank}
                            </div>
                          </TableCell>
                          <TableCell className="font-mono">{trader.address}</TableCell>
                          <TableCell className="font-semibold text-green-600">{trader.profit}</TableCell>
                          <TableCell className="text-lg font-bold">{trader.roi}</TableCell>
                          <TableCell className="font-semibold">{trader.trades}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>

              <TabsContent value="kols" className="mt-4">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>KOL</TableHead>
                        <TableHead>Followers</TableHead>
                        <TableHead>Mentions</TableHead>
                        <TableHead>Sentiment</TableHead>
                        <TableHead>Last Mention</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { name: "CryptoKing", username: "@cryptoking", followers: "250K", mentions: 12, sentiment: "Very Bullish", time: "2h ago" },
                        { name: "MoonBoy", username: "@moonboy", followers: "180K", mentions: 8, sentiment: "Bullish", time: "5h ago" },
                        { name: "TokenGuru", username: "@tokenguru", followers: "320K", mentions: 15, sentiment: "Very Bullish", time: "1h ago" },
                        { name: "DeFiWhale", username: "@defiwhale", followers: "420K", mentions: 6, sentiment: "Neutral", time: "8h ago" },
                        { name: "AltcoinDaily", username: "@altcoindaily", followers: "550K", mentions: 10, sentiment: "Bullish", time: "3h ago" },
                      ].map((kol, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={`/.jpg?key=zzp2l&height=32&width=32&query=${kol.name}`}
                                alt={kol.name}
                                className="size-8 rounded-full"
                              />
                              <div>
                                <div className="font-medium">{kol.name}</div>
                                <div className="text-sm text-muted-foreground">{kol.username}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">{kol.followers}</TableCell>
                          <TableCell className="font-semibold">{kol.mentions}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                kol.sentiment === "Very Bullish"
                                  ? "border-green-600/20 bg-green-600/10 text-green-600"
                                  : kol.sentiment === "Bullish"
                                  ? "border-blue-600/20 bg-blue-600/10 text-blue-600"
                                  : "border-yellow-600/20 bg-yellow-600/10 text-yellow-600"
                              }
                            >
                              {kol.sentiment}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{kol.time}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
