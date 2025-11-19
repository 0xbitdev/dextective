"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
  const [newTokensNotif, setNewTokensNotif] = useState(true)
  const [dexBoostNotif, setDexBoostNotif] = useState(true)
  const [trendingNotif, setTrendingNotif] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("dextective-settings")
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setNewTokensNotif(settings.newTokensNotif ?? true)
      setDexBoostNotif(settings.dexBoostNotif ?? true)
      setTrendingNotif(settings.trendingNotif ?? false)
    }
  }, [])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      newTokensNotif,
      dexBoostNotif,
      trendingNotif,
    }
    localStorage.setItem("dextective-settings", JSON.stringify(settings))
  }, [newTokensNotif, dexBoostNotif, trendingNotif])

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
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-muted-foreground">
                  Manage your notification preferences and app settings
                </p>
              </div>

              <div className="grid gap-4 @3xl:grid-cols-2">
                {/* Notification Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Control which notifications you receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="new-tokens">New Tokens Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when new tokens are launched
                        </p>
                      </div>
                      <Switch
                        id="new-tokens"
                        checked={newTokensNotif}
                        onCheckedChange={setNewTokensNotif}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dexboost">DexBoost Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when tokens receive boost signals
                        </p>
                      </div>
                      <Switch
                        id="dexboost"
                        checked={dexBoostNotif}
                        onCheckedChange={setDexBoostNotif}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="trending">Trending Token Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about trending tokens
                        </p>
                      </div>
                      <Switch
                        id="trending"
                        checked={trendingNotif}
                        onCheckedChange={setTrendingNotif}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Other Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Other Settings</CardTitle>
                    <CardDescription>
                      Additional preferences and configurations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Theme</Label>
                        <p className="text-sm text-muted-foreground">
                          Toggle dark/light mode (controlled by system)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-refresh</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically update token data
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Sound Effects</Label>
                        <p className="text-sm text-muted-foreground">
                          Play sounds for notifications
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Settings Info */}
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    Your settings are automatically saved and will persist across sessions. 
                    Changes take effect immediately.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
