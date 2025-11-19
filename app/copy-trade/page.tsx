"use client"

import { useState } from "react"
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IconCopy, IconTrendingUp, IconUsers, IconSettings, IconTrash, IconEdit } from "@tabler/icons-react"
import { AccessCodeDialog } from "@/components/access-code-dialog"

export default function CopyTradePage() {
  const [dialogOpen, setDialogOpen] = useState(false)

  const topTraders = [
    { 
      name: "CryptoWhale", 
      address: "7xK...9pL", 
      winRate: "89%", 
      profit: "+234.5 SOL", 
      avgHoldTime: "4.2h",
      totalTrades: 1247,
      followers: 1234,
      strategy: "Momentum"
    },
    { 
      name: "TokenSniper", 
      address: "4mH...2qR", 
      winRate: "76%", 
      profit: "+189.2 SOL", 
      avgHoldTime: "1.8h",
      totalTrades: 892,
      followers: 892,
      strategy: "Scalping"
    },
    { 
      name: "DeFiMaster", 
      address: "9tN...5wX", 
      winRate: "82%", 
      profit: "+156.8 SOL", 
      avgHoldTime: "12.5h",
      totalTrades: 456,
      followers: 756,
      strategy: "Swing"
    },
    { 
      name: "PumpHunter", 
      address: "3rY...8bK", 
      winRate: "71%", 
      profit: "+142.3 SOL", 
      avgHoldTime: "2.1h",
      totalTrades: 1523,
      followers: 623,
      strategy: "Breakout"
    },
  ]

  const myCopyStrategies: any[] = []

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
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <IconCopy className="size-6" />
                <h1 className="text-2xl font-bold">Copy Trade</h1>
              </div>
              <p className="text-muted-foreground">Follow and automatically copy trades from successful traders</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconSettings className="size-5" />
                  Copy Settings
                </CardTitle>
                <CardDescription>Configure how you want to copy trades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="wallet" className="text-xs">Trader Wallet</Label>
                    <Input id="wallet" placeholder="Enter address..." className="h-8 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="copy-amount" className="text-xs">Copy Amount (SOL)</Label>
                    <Input id="copy-amount" type="number" placeholder="0.5" className="h-8 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-trade" className="text-xs">Max Per Trade (SOL)</Label>
                    <Input id="max-trade" type="number" placeholder="2" className="h-8 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stop-loss" className="text-xs">Stop Loss (%)</Label>
                    <Input id="stop-loss" type="number" placeholder="30" className="h-8 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="take-profit" className="text-xs">Take Profit (%)</Label>
                    <Input id="take-profit" type="number" placeholder="100" className="h-8 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-liq" className="text-xs">Min Liquidity (SOL)</Label>
                    <Input id="min-liq" type="number" placeholder="5" className="h-8 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slippage" className="text-xs">Slippage (%)</Label>
                    <Input id="slippage" type="number" placeholder="10" className="h-8 text-sm" />
                  </div>
                  <div className="flex items-end">
                    <Button size="sm" className="w-full h-8" onClick={() => setDialogOpen(true)}>Add Trader</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconTrendingUp className="size-5" />
                  Top Performing Traders
                </CardTitle>
                <CardDescription>Most profitable traders with detailed stats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Trader</TableHead>
                        <TableHead>Win Rate</TableHead>
                        <TableHead>Total Profit</TableHead>
                        <TableHead>Avg Hold</TableHead>
                        <TableHead>Total Trades</TableHead>
                        <TableHead>Strategy</TableHead>
                        <TableHead>Followers</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topTraders.map((trader, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="size-8">
                                <AvatarImage src={`/.jpg?height=32&width=32&query=${trader.name}`} />
                                <AvatarFallback className="text-xs">{trader.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm">{trader.name}</div>
                                <div className="text-xs text-muted-foreground font-mono">{trader.address}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                              {trader.winRate}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium text-green-500">{trader.profit}</TableCell>
                          <TableCell className="font-mono text-xs">{trader.avgHoldTime}</TableCell>
                          <TableCell className="font-mono text-xs">{trader.totalTrades}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{trader.strategy}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm">
                              <IconUsers className="size-3.5" />
                              {trader.followers}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" onClick={() => setDialogOpen(true)}>Follow</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Copy Strategies</CardTitle>
                <CardDescription>Traders you are currently copying with performance</CardDescription>
              </CardHeader>
              <CardContent>
                {myCopyStrategies.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <IconCopy className="size-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Active Copy Strategies</h3>
                    <p className="text-sm text-muted-foreground mb-4">Start copying successful traders to automate your trading</p>
                    <Button onClick={() => setDialogOpen(true)}>Follow a Trader</Button>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[180px]">Trader</TableHead>
                          <TableHead>Copy Amount</TableHead>
                          <TableHead>Max/Trade</TableHead>
                          <TableHead>Stop Loss</TableHead>
                          <TableHead>Take Profit</TableHead>
                          <TableHead>Min Liq</TableHead>
                          <TableHead>PnL</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {myCopyStrategies.map((strategy, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              <div>
                                <div className="font-medium text-sm">{strategy.trader}</div>
                                <div className="text-xs text-muted-foreground font-mono">{strategy.address}</div>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-xs">{strategy.copyAmount}</TableCell>
                            <TableCell className="font-mono text-xs">{strategy.maxPerTrade}</TableCell>
                            <TableCell className="font-mono text-xs">{strategy.stopLoss}</TableCell>
                            <TableCell className="font-mono text-xs">{strategy.takeProfit}</TableCell>
                            <TableCell className="font-mono text-xs">{strategy.minLiquidity}</TableCell>
                            <TableCell className="font-medium text-green-500">{strategy.pnl}</TableCell>
                            <TableCell>
                              <Badge variant="default">{strategy.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setDialogOpen(true)}>
                                  <IconEdit className="size-3.5" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setDialogOpen(true)}>
                                  <IconTrash className="size-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
      <AccessCodeDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        featureName="Copy Trade" 
      />
    </SidebarProvider>
  )
}
