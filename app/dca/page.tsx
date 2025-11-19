"use client"

import { useState } from "react"
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { IconClock, IconCalendar, IconChartLine, IconTrash, IconEdit, IconPlayerPlay, IconPlayerPause } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { AccessCodeDialog } from "@/components/access-code-dialog"

export default function DCAPage() {
  const [dialogOpen, setDialogOpen] = useState(false)

  const dcaStrategies: any[] = []

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
                <IconChartLine className="size-6" />
                <h1 className="text-2xl font-bold">DCA (Dollar-Cost Averaging)</h1>
              </div>
              <p className="text-muted-foreground">Automate regular purchases to build your position over time</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Create New DCA Strategy</CardTitle>
                <CardDescription>Set up automated recurring purchases with advanced settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="token" className="text-xs">Token Pair</Label>
                    <Select defaultValue="sol">
                      <SelectTrigger id="token" className="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sol">SOL/USDC</SelectItem>
                        <SelectItem value="btc">BTC/USDC</SelectItem>
                        <SelectItem value="eth">ETH/USDC</SelectItem>
                        <SelectItem value="bonk">BONK/USDC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-xs">Amount per Buy (USDC)</Label>
                    <Input id="amount" type="number" placeholder="10" className="h-8 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency" className="text-xs">Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="frequency" className="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">Every Hour</SelectItem>
                        <SelectItem value="6h">Every 6 Hours</SelectItem>
                        <SelectItem value="12h">Every 12 Hours</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="total-budget" className="text-xs">Total Budget (USDC)</Label>
                    <Input id="total-budget" type="number" placeholder="300" className="h-8 text-sm" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="slippage-dca" className="text-xs">Slippage (%)</Label>
                    <Input id="slippage-dca" type="number" placeholder="1" className="h-8 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price-limit" className="text-xs">Max Price Limit ($)</Label>
                    <Input id="price-limit" type="number" placeholder="Optional" className="h-8 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="start-date" className="text-xs">Start Date</Label>
                    <Input id="start-date" type="date" className="h-8 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date" className="text-xs">End Date</Label>
                    <Input id="end-date" type="date" className="h-8 text-sm" />
                  </div>
                </div>
                <Button className="w-full" onClick={() => setDialogOpen(true)}>Create DCA Strategy</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active DCA Strategies</CardTitle>
                <CardDescription>Your automated purchase schedules with performance tracking</CardDescription>
              </CardHeader>
              <CardContent>
                {dcaStrategies.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <IconChartLine className="size-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Active DCA Strategies</h3>
                    <p className="text-sm text-muted-foreground mb-4">Create your first DCA strategy to start building positions</p>
                    <Button onClick={() => setDialogOpen(true)}>Create DCA Strategy</Button>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[120px]">Token Pair</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Frequency</TableHead>
                          <TableHead>Budget</TableHead>
                          <TableHead>Spent</TableHead>
                          <TableHead>Avg Price</TableHead>
                          <TableHead>Current</TableHead>
                          <TableHead>PnL</TableHead>
                          <TableHead>Next Buy</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dcaStrategies.map((strategy) => (
                          <TableRow key={strategy.id}>
                            <TableCell className="font-medium">{strategy.token}</TableCell>
                            <TableCell className="font-mono text-xs">{strategy.amount}</TableCell>
                            <TableCell className="text-xs">{strategy.frequency}</TableCell>
                            <TableCell className="font-mono text-xs">{strategy.totalBudget}</TableCell>
                            <TableCell className="font-mono text-xs">{strategy.spent}</TableCell>
                            <TableCell className="font-mono text-xs">{strategy.avgPrice}</TableCell>
                            <TableCell className="font-mono text-xs">{strategy.currentPrice}</TableCell>
                            <TableCell>
                              <span className={strategy.pnl.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                                {strategy.pnl}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <IconClock className="size-3" />
                                {strategy.nextBuy}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={strategy.status === "active" ? "default" : "secondary"}>
                                {strategy.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setDialogOpen(true)}>
                                  {strategy.status === "active" ? <IconPlayerPause className="size-3.5" /> : <IconPlayerPlay className="size-3.5" />}
                                </Button>
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
        featureName="DCA Strategy" 
      />
    </SidebarProvider>
  )
}
