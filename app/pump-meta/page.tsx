"use client"

import { useState } from "react"
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { IconRocket, IconFlame, IconTrendingUp, IconStar } from "@tabler/icons-react"
import { AccessCodeDialog } from "@/components/access-code-dialog"

export default function PumpMetaPage() {
  const [dialogOpen, setDialogOpen] = useState(false)

  const pumpSignals = [
    { token: "PEPE 2.0", signal: "Strong", volume: "+245%", price: "+89%", time: "5m ago", tier: "premium" },
    { token: "DOGE KILLER", signal: "Medium", volume: "+156%", price: "+45%", time: "12m ago", tier: "standard" },
    { token: "SHIB X", signal: "Weak", volume: "+78%", price: "+23%", time: "18m ago", tier: "standard" },
  ]

  const categories = [
    { name: "AI Tokens", change: "+156%", volume: "12.5M", count: 23 },
    { name: "Meme Coins", change: "+89%", volume: "45.2M", count: 142 },
    { name: "Gaming", change: "+67%", volume: "8.9M", count: 34 },
    { name: "DeFi", change: "+45%", volume: "23.1M", count: 67 },
  ]

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
                <IconFlame className="size-6" />
                <h1 className="text-2xl font-bold">Pump Meta</h1>
              </div>
              <p className="text-muted-foreground">Track pump signals and trending token categories</p>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IconRocket className="size-4" />
                    Active Pumps
                  </div>
                  <div className="mt-2 text-2xl font-bold">142</div>
                  <div className="text-xs text-green-500">+23% from yesterday</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IconTrendingUp className="size-4" />
                    Total Volume
                  </div>
                  <div className="mt-2 text-2xl font-bold">$89.7M</div>
                  <div className="text-xs text-green-500">+156% from yesterday</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IconFlame className="size-4" />
                    Hot Category
                  </div>
                  <div className="mt-2 text-2xl font-bold">AI</div>
                  <div className="text-xs text-green-500">+156% volume</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IconStar className="size-4" />
                    Success Rate
                  </div>
                  <div className="mt-2 text-2xl font-bold">67%</div>
                  <div className="text-xs text-muted-foreground">Last 24 hours</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconRocket className="size-5" />
                  Live Pump Signals
                </CardTitle>
                <CardDescription>Real-time pump detection based on volume and price action</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pumpSignals.map((signal, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-bold">
                          {signal.token[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{signal.token}</span>
                            {signal.tier === "premium" && (
                              <Badge variant="default" className="h-5 text-xs">Premium</Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">{signal.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-500">Price {signal.price}</div>
                          <div className="text-xs text-muted-foreground">Vol {signal.volume}</div>
                        </div>
                        <Badge 
                          variant={signal.signal === "Strong" ? "default" : "outline"}
                          className={signal.signal === "Strong" ? "bg-green-500" : ""}
                        >
                          {signal.signal}
                        </Badge>
                        <Button size="sm" onClick={() => setDialogOpen(true)}>Trade</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trending Categories</CardTitle>
                <CardDescription>Most active token categories in the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {categories.map((cat, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <div className="font-medium">{cat.name}</div>
                        <div className="text-sm text-muted-foreground">{cat.count} tokens</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-500">{cat.change}</div>
                        <div className="text-xs text-muted-foreground">${cat.volume}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
      <AccessCodeDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        featureName="Pump Meta Trading" 
      />
    </SidebarProvider>
  )
}
