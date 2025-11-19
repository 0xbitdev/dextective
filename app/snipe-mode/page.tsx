"use client"

import { useState } from "react"
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { IconRocket, IconSettings, IconBolt, IconTrash, IconEdit, IconPlayerPlay, IconPlayerPause, IconDroplet, IconTransfer } from "@tabler/icons-react"
import { AccessCodeDialog } from "@/components/access-code-dialog"

export default function SnipeModePage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedMode, setSelectedMode] = useState("launch")

  const snipeStrategies: any[] = []

  const handleAction = () => {
    setDialogOpen(true)
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
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <IconRocket className="size-6" />
                <h1 className="text-2xl font-bold">Snipe Mode</h1>
              </div>
              <p className="text-muted-foreground">Automatically buy new token launches with custom strategies</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Snipe Mode Type</CardTitle>
                <CardDescription>Choose which type of token events to snipe</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedMode} onValueChange={setSelectedMode} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="launch">Token Launch</TabsTrigger>
                    <TabsTrigger value="liquidity">Liquidity Detection</TabsTrigger>
                    <TabsTrigger value="migration">Migration Events</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="launch" className="space-y-4 pt-4">
                    <p className="text-sm text-muted-foreground">Snipe tokens immediately when they are first created and launched</p>
                  </TabsContent>
                  
                  <TabsContent value="liquidity" className="space-y-4 pt-4">
                    <p className="text-sm text-muted-foreground">Monitor and snipe when liquidity is added to existing tokens</p>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="min-liq-add" className="text-xs">Min Liquidity Added (SOL)</Label>
                        <Input id="min-liq-add" type="number" placeholder="5" className="h-8 text-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="liq-increase" className="text-xs">Min % Increase</Label>
                        <Input id="liq-increase" type="number" placeholder="50" className="h-8 text-sm" />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="migration" className="space-y-4 pt-4">
                    <p className="text-sm text-muted-foreground">Detect and snipe token migrations between pools or platforms</p>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="raydium-orca" className="text-xs">Raydium → Orca</Label>
                        <Switch id="raydium-orca" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="pump-raydium" className="text-xs">Pump.fun → Raydium</Label>
                        <Switch id="pump-raydium" defaultChecked />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <IconSettings className="size-4" />
                    Basic Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="strategy-name" className="text-xs">Strategy Name</Label>
                    <Input id="strategy-name" placeholder="My Strategy" className="h-8 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="buy-amount" className="text-xs">Buy Amount (SOL)</Label>
                    <Input id="buy-amount" type="number" placeholder="0.1" step="0.01" className="h-8 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="slippage" className="text-xs">Slippage (%)</Label>
                    <Input id="slippage" type="number" placeholder="10" className="h-8 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="priority-fee" className="text-xs">Priority Fee (SOL)</Label>
                    <Input id="priority-fee" type="number" placeholder="0.001" step="0.0001" className="h-8 text-sm" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <IconBolt className="size-4" />
                    Safety Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="min-liquidity" className="text-xs">Min Liquidity (SOL)</Label>
                    <Input id="min-liquidity" type="number" placeholder="5" className="h-8 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="max-buy-tax" className="text-xs">Max Buy Tax (%)</Label>
                    <Input id="max-buy-tax" type="number" placeholder="10" className="h-8 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="max-sell-tax" className="text-xs">Max Sell Tax (%)</Label>
                    <Input id="max-sell-tax" type="number" placeholder="10" className="h-8 text-sm" />
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <Label htmlFor="anti-rug" className="text-xs">Anti-Rug Check</Label>
                    <Switch id="anti-rug" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Advanced Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="auto-sell" className="text-xs">Auto-Sell Target</Label>
                    <Select defaultValue="2x">
                      <SelectTrigger id="auto-sell" className="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1.5x">1.5x</SelectItem>
                        <SelectItem value="2x">2x</SelectItem>
                        <SelectItem value="3x">3x</SelectItem>
                        <SelectItem value="5x">5x</SelectItem>
                        <SelectItem value="10x">10x</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="stop-loss" className="text-xs">Stop Loss (%)</Label>
                    <Input id="stop-loss" type="number" placeholder="50" className="h-8 text-sm" />
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <Label htmlFor="check-honeypot" className="text-xs">Honeypot Check</Label>
                    <Switch id="check-honeypot" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="check-mint" className="text-xs">Check Mint</Label>
                    <Switch id="check-mint" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">Reset</Button>
              <Button size="sm" onClick={handleAction}>Create Strategy</Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Active Snipe Strategies</CardTitle>
                <CardDescription>Manage your automated sniping strategies</CardDescription>
              </CardHeader>
              <CardContent>
                {snipeStrategies.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <IconRocket className="size-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Active Strategies</h3>
                    <p className="text-sm text-muted-foreground mb-4">Create your first snipe strategy to get started</p>
                    <Button onClick={handleAction}>Create Strategy</Button>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[180px]">Strategy Name</TableHead>
                          <TableHead>Buy Amount</TableHead>
                          <TableHead>Slippage</TableHead>
                          <TableHead>Priority Fee</TableHead>
                          <TableHead>Min Liq</TableHead>
                          <TableHead>Buy Tax</TableHead>
                          <TableHead>Sell Tax</TableHead>
                          <TableHead>Anti-Rug</TableHead>
                          <TableHead>Auto-Sell</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {snipeStrategies.map((strategy) => (
                          <TableRow key={strategy.id}>
                            <TableCell className="font-medium">{strategy.name}</TableCell>
                            <TableCell className="font-mono text-xs">{strategy.buyAmount}</TableCell>
                            <TableCell className="font-mono text-xs">{strategy.slippage}</TableCell>
                            <TableCell className="font-mono text-xs">{strategy.priorityFee}</TableCell>
                            <TableCell className="font-mono text-xs">{strategy.minLiquidity}</TableCell>
                            <TableCell className="font-mono text-xs">{strategy.maxBuyTax}</TableCell>
                            <TableCell className="font-mono text-xs">{strategy.maxSellTax}</TableCell>
                            <TableCell>
                              {strategy.antiRug ? (
                                <Badge variant="outline" className="bg-green-500/10 text-green-500">Yes</Badge>
                              ) : (
                                <Badge variant="outline" className="bg-red-500/10 text-red-500">No</Badge>
                              )}
                            </TableCell>
                            <TableCell className="font-mono text-xs">{strategy.autosell}</TableCell>
                            <TableCell>
                              <Badge variant={strategy.status === "active" ? "default" : "secondary"}>
                                {strategy.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={handleAction}>
                                  {strategy.status === "active" ? <IconPlayerPause className="size-3.5" /> : <IconPlayerPlay className="size-3.5" />}
                                </Button>
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={handleAction}>
                                  <IconEdit className="size-3.5" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={handleAction}>
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
        featureName="Snipe Mode" 
      />
    </SidebarProvider>
  )
}
