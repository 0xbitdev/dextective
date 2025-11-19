"use client"

import { useState } from "react"
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IconFileText, IconDownload, IconCalendar, IconChartBar } from "@tabler/icons-react"
import { AccessCodeDialog } from "@/components/access-code-dialog"

export default function ReportsPage() {
  const [dialogOpen, setDialogOpen] = useState(false)

  const reports = [
    { name: "Weekly Trading Summary", date: "Jan 15, 2024", type: "Weekly", status: "Ready" },
    { name: "Monthly Performance Report", date: "Jan 1, 2024", type: "Monthly", status: "Ready" },
    { name: "Portfolio Analysis", date: "Dec 28, 2023", type: "Custom", status: "Ready" },
    { name: "Tax Report 2023", date: "Dec 31, 2023", type: "Annual", status: "Ready" },
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
                <IconFileText className="size-6" />
                <h1 className="text-2xl font-bold">Reports</h1>
              </div>
              <p className="text-muted-foreground">Generate and download detailed trading reports</p>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IconChartBar className="size-4" />
                    Total Trades
                  </div>
                  <div className="mt-2 text-2xl font-bold">1,247</div>
                  <div className="text-xs text-muted-foreground">Last 30 days</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IconChartBar className="size-4" />
                    Win Rate
                  </div>
                  <div className="mt-2 text-2xl font-bold text-green-500">67.8%</div>
                  <div className="text-xs text-muted-foreground">Last 30 days</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IconChartBar className="size-4" />
                    Total P&L
                  </div>
                  <div className="mt-2 text-2xl font-bold text-green-500">+89.5 SOL</div>
                  <div className="text-xs text-muted-foreground">Last 30 days</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IconChartBar className="size-4" />
                    Best Day
                  </div>
                  <div className="mt-2 text-2xl font-bold text-green-500">+12.3 SOL</div>
                  <div className="text-xs text-muted-foreground">Jan 12, 2024</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Generate New Report</CardTitle>
                <CardDescription>Create a custom trading report</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Report Type</label>
                      <Select defaultValue="weekly">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Format</label>
                      <Select defaultValue="pdf">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full" onClick={() => setDialogOpen(true)}>
                        <IconDownload className="mr-2 size-4" />
                        Generate Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Your previously generated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reports.map((report, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                          <IconFileText className="size-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <IconCalendar className="size-3" />
                            {report.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{report.type}</Badge>
                        <Badge variant="default">{report.status}</Badge>
                        <Button size="sm" variant="outline" onClick={() => setDialogOpen(true)}>
                          <IconDownload className="mr-1 size-3" />
                          Download
                        </Button>
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
        featureName="Reports" 
      />
    </SidebarProvider>
  )
}
