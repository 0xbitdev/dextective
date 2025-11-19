"use client"

import { useState } from "react"
import { IconBell, IconPlus, IconTrash } from "@tabler/icons-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const mockAlerts = [
  { id: 1, token: "PEPEAI", condition: "Price above", value: "$0.00015", status: "active" },
  { id: 2, token: "SHMOON", condition: "Volume above", value: "$2M", status: "active" },
  { id: 3, token: "RDOG", condition: "Price below", value: "$0.00100", status: "triggered" },
  { id: 4, token: "SAFE", condition: "Market Cap above", value: "$30M", status: "active" },
]

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts)
  const [open, setOpen] = useState(false)

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
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold">Alerts</h1>
                  <p className="text-muted-foreground">
                    Manage your price and volume alerts
                  </p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <IconPlus className="size-4" />
                      Create Alert
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Alert</DialogTitle>
                      <DialogDescription>
                        Set up a new price or volume alert for any token
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="token">Token Symbol</Label>
                        <Input id="token" placeholder="e.g., PEPEAI" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="condition">Condition</Label>
                        <Select>
                          <SelectTrigger id="condition">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="price-above">Price above</SelectItem>
                            <SelectItem value="price-below">Price below</SelectItem>
                            <SelectItem value="volume-above">Volume above</SelectItem>
                            <SelectItem value="marketcap-above">Market Cap above</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="value">Value</Label>
                        <Input id="value" placeholder="e.g., $0.00015" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setOpen(false)}>Create Alert</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Active Alerts */}
              <div className="grid gap-4 @md:grid-cols-2 @3xl:grid-cols-3">
                {alerts.map((alert) => (
                  <Card key={alert.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <IconBell className="size-5 text-primary" />
                          <CardTitle>{alert.token}</CardTitle>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => setAlerts(alerts.filter(a => a.id !== alert.id))}
                        >
                          <IconTrash className="size-4" />
                        </Button>
                      </div>
                      <CardDescription>{alert.condition}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold">{alert.value}</p>
                        </div>
                        <Badge
                          variant={alert.status === "active" ? "default" : "secondary"}
                        >
                          {alert.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {alerts.length === 0 && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <IconBell className="size-12 text-muted-foreground" />
                    <p className="mt-4 text-lg font-medium">No alerts yet</p>
                    <p className="text-sm text-muted-foreground">
                      Create your first alert to get notified
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
