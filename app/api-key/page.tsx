"use client"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  IconKey, 
  IconCopy, 
  IconTrash, 
  IconPlus, 
  IconShieldCheck, 
  IconEye, 
  IconEyeOff,
  IconAlertCircle,
  IconWallet
} from '@tabler/icons-react'
import { toast } from 'sonner'

export default function APIKeyPage() {
  const { connected } = useWallet()
  
  const [apiKeys, setApiKeys] = useState<any[]>([])

  const [showKey, setShowKey] = useState<Record<string, boolean>>({})
  const [newKeyName, setNewKeyName] = useState("")
  const [showNewKeyForm, setShowNewKeyForm] = useState(false)
  
  const [showDevCodeDialog, setShowDevCodeDialog] = useState(false)
  const [devCode, setDevCode] = useState("")

  const toggleKeyVisibility = (id: string) => {
    setShowKey(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key)
    toast.success("API key copied to clipboard!", {
      description: "You can now use this key in your application",
    })
  }

  const deleteKey = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      setApiKeys(prev => prev.filter(k => k.id !== id))
      toast.success("API key deleted", {
        description: `"${name}" has been permanently deleted`,
      })
    }
  }

  const handleCreateNewKey = () => {
    if (!connected) {
      toast.error("Wallet not connected", {
        description: "Please connect your wallet first to create API keys",
      })
      return
    }
    
    setShowDevCodeDialog(true)
  }

  const verifyDevCodeAndCreateKey = () => {
    if (devCode.length !== 7 || !/^\d{7}$/.test(devCode)) {
      toast.error("Invalid code", {
        description: "Please enter a valid 7-digit dev waitlist code",
      })
      return
    }

    // Simulate verification (in real app, this would call an API)
    if (!newKeyName.trim()) {
      toast.error("Please enter a name for your API key")
      return
    }

    const newKey = {
      id: String(apiKeys.length + 1),
      name: newKeyName,
      key: `dxt_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: "Never",
      tier: "Free",
      requests: "0",
    }

    setApiKeys(prev => [...prev, newKey])
    setNewKeyName("")
    setShowNewKeyForm(false)
    setShowDevCodeDialog(false)
    setDevCode("")
    
    toast.success("API key created!", {
      description: "Your new API key is ready to use",
    })
  }

  const maskKey = (key: string, show: boolean) => {
    if (show) return key
    const prefix = key.substring(0, 12)
    const suffix = key.substring(key.length - 4)
    return `${prefix}${"•".repeat(20)}${suffix}`
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
          <div className="@container/main flex flex-1 flex-col gap-6 p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <IconKey className="size-8 text-primary" />
                <h1 className="text-3xl font-bold">API Keys</h1>
              </div>
              <p className="text-muted-foreground">
                Manage your API keys to access DexTective API
              </p>
            </div>

            {/* Usage Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Requests</CardDescription>
                  <CardTitle className="text-3xl">0</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Active Keys</CardDescription>
                  <CardTitle className="text-3xl">{apiKeys.length}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Current Tier</CardDescription>
                  <CardTitle className="text-2xl">Free</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Rate Limit</CardDescription>
                  <CardTitle className="text-2xl">100/min</CardTitle>
                </CardHeader>
              </Card>
            </div>

            {!connected && (
              <Card className="border-orange-500/50 bg-orange-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                    <IconWallet className="size-5" />
                    Wallet Connection Required
                  </CardTitle>
                  <CardDescription>
                    Please connect your wallet to create and manage API keys
                  </CardDescription>
                </CardHeader>
              </Card>
            )}

            {/* Create New Key Card */}
            {showNewKeyForm ? (
              <Card>
                <CardHeader>
                  <CardTitle>Create New API Key</CardTitle>
                  <CardDescription>Generate a new API key for your application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="keyName">Key Name</Label>
                    <Input
                      id="keyName"
                      placeholder="e.g., Production, Development, Mobile App"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                    />
                  </div>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <div className="flex items-start gap-2">
                      <IconAlertCircle className="size-5 text-orange-500 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">Important Notes:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Store your API key securely</li>
                          <li>• Never share your API key publicly</li>
                          <li>• New keys start with Free tier (100 req/min)</li>
                          <li>• You can upgrade to Pro tier in settings</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button onClick={handleCreateNewKey}>
                    <IconPlus className="size-4 mr-2" />
                    Create API Key
                  </Button>
                  <Button variant="outline" onClick={() => setShowNewKeyForm(false)}>
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Your API Keys</CardTitle>
                  <CardDescription>Manage your API keys and monitor usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setShowNewKeyForm(true)}>
                    <IconPlus className="size-4 mr-2" />
                    Create New API Key
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* API Keys Table */}
            <Card>
              <CardHeader>
                <CardTitle>Active API Keys</CardTitle>
                <CardDescription>View and manage your existing API keys</CardDescription>
              </CardHeader>
              <CardContent>
                {apiKeys.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <IconKey className="size-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No API Keys Yet</h3>
                    <p className="text-sm text-muted-foreground mb-4 max-w-md">
                      Create your first API key to start accessing DexTective API endpoints
                    </p>
                    <Button onClick={() => setShowNewKeyForm(true)}>
                      <IconPlus className="size-4 mr-2" />
                      Create Your First API Key
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>API Key</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Requests</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Last Used</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apiKeys.map((apiKey) => (
                        <TableRow key={apiKey.id}>
                          <TableCell className="font-medium">{apiKey.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                                {maskKey(apiKey.key, showKey[apiKey.id])}
                              </code>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={apiKey.tier === "Pro" ? "default" : "secondary"}>
                              {apiKey.tier}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{apiKey.requests}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{apiKey.created}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{apiKey.lastUsed}</TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleKeyVisibility(apiKey.id)}
                              >
                                {showKey[apiKey.id] ? (
                                  <IconEyeOff className="size-4" />
                                ) : (
                                  <IconEye className="size-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(apiKey.key)}
                              >
                                <IconCopy className="size-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteKey(apiKey.id, apiKey.name)}
                              >
                                <IconTrash className="size-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Security Best Practices */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconShieldCheck className="size-5" />
                  Security Best Practices
                </CardTitle>
                <CardDescription>Keep your API keys secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Do's:</h3>
                  <ul className="text-sm space-y-2 text-muted-foreground ml-4">
                    <li>✓ Store API keys in environment variables</li>
                    <li>✓ Use different keys for development and production</li>
                    <li>✓ Rotate your API keys regularly</li>
                    <li>✓ Monitor your API usage for suspicious activity</li>
                    <li>✓ Delete unused or compromised keys immediately</li>
                  </ul>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Don'ts:</h3>
                  <ul className="text-sm space-y-2 text-muted-foreground ml-4">
                    <li>✗ Never commit API keys to version control</li>
                    <li>✗ Don't share keys in public forums or chat</li>
                    <li>✗ Avoid using keys in client-side code</li>
                    <li>✗ Don't use production keys for testing</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Upgrade Section */}
            <Card>
              <CardHeader>
                <CardTitle>Upgrade Your Plan</CardTitle>
                <CardDescription>Get more requests and access to premium features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-semibold">Free</h3>
                      <p className="text-2xl font-bold">$0<span className="text-sm text-muted-foreground">/mo</span></p>
                    </div>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>• 100 requests/minute</li>
                      <li>• 10,000 requests/day</li>
                      <li>• Basic endpoints</li>
                      <li>• Community support</li>
                    </ul>
                    <Button variant="outline" className="w-full" disabled>Current Plan</Button>
                  </div>
                  <div className="border-2 border-primary rounded-lg p-4 space-y-3 relative">
                    <Badge className="absolute -top-2 left-4">Popular</Badge>
                    <div className="space-y-1">
                      <h3 className="font-semibold">Pro</h3>
                      <p className="text-2xl font-bold">$49<span className="text-sm text-muted-foreground">/mo</span></p>
                    </div>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>• 500 requests/minute</li>
                      <li>• 100,000 requests/day</li>
                      <li>• All endpoints</li>
                      <li>• WebSocket access</li>
                      <li>• Priority support</li>
                    </ul>
                    <Button className="w-full">Upgrade to Pro</Button>
                  </div>
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-semibold">Enterprise</h3>
                      <p className="text-2xl font-bold">Custom</p>
                    </div>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>• Unlimited requests</li>
                      <li>• Dedicated infrastructure</li>
                      <li>• Custom integrations</li>
                      <li>• 24/7 support</li>
                      <li>• SLA guarantee</li>
                    </ul>
                    <Button variant="outline" className="w-full">Contact Sales</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>

      <Dialog open={showDevCodeDialog} onOpenChange={setShowDevCodeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Dev Waitlist Access</DialogTitle>
            <DialogDescription>
              Enter your 7-digit dev waitlist code to create API keys
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="devCode">Waitlist Code</Label>
              <Input
                id="devCode"
                placeholder="Enter 7-digit code"
                maxLength={7}
                value={devCode}
                onChange={(e) => setDevCode(e.target.value.replace(/\D/g, ''))}
                className="text-center text-2xl font-mono tracking-widest"
              />
              <p className="text-xs text-muted-foreground">
                Don't have a code? Join our waitlist at dextective.io
              </p>
            </div>
          </div>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => {
                setShowDevCodeDialog(false)
                setDevCode("")
              }}
            >
              Cancel
            </Button>
            <Button onClick={verifyDevCodeAndCreateKey}>
              Verify & Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
