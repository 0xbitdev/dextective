"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { IconRocket, IconFlame } from "@tabler/icons-react"
import { AccessCodeDialog } from "@/components/access-code-dialog"

export default function PumpMetaPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [pumpSignals, setPumpSignals] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/pump/meta-current')
        if (!res.ok) throw new Error(`status ${res.status}`)
        const json = await res.json()
        const arr = json?.data ?? []
        if (mounted) setPumpSignals(arr)
      } catch (err: any) {
        console.error('Failed to fetch pump meta', err)
        if (mounted) setError(String(err))
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  const sidebarStyles = {
    "--sidebar-width": "calc(var(--spacing) * 72)",
    "--header-height": "calc(var(--spacing) * 12)",
  } as unknown as React.CSSProperties

  return (
    <SidebarProvider style={sidebarStyles}>
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
              <p className="text-muted-foreground">Track pump meta trending on pump.fun</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconRocket className="size-5" />
                  Live Pump Meta
                </CardTitle>
                <CardDescription>Real-time pump meta trending</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {loading ? (
                    <div className="text-sm text-muted-foreground">Loading pump signals…</div>
                  ) : error ? (
                    <div className="text-sm text-red-500">Failed to load pump signals</div>
                  ) : (
                    pumpSignals.map((signal: any, i: number) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-bold">
                            {String(signal.word || '').charAt(0) || 'P'}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{signal.word}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">{signal.word_with_strength}</div>

                            <div className="mt-2">
                              <a
                                href={`https://pump.fun/?q=${encodeURIComponent(signal.word)}&sort=market_cap`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Badge variant="secondary">View on pump.fun</Badge>
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="text-sm font-medium text-green-500">Score {signal.score}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
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