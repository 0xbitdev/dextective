"use client"

import { useState } from "react"
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { IconBook, IconCode, IconRocket, IconShieldCheck, IconCopy, IconExternalLink } from '@tabler/icons-react'

export default function DocumentationPage() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedEndpoint(id)
    setTimeout(() => setCopiedEndpoint(null), 2000)
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
                <IconBook className="size-8 text-primary" />
                <h1 className="text-3xl font-bold">API Documentation</h1>
              </div>
              <p className="text-muted-foreground">
                Complete guide to integrate DexTective API into your applications
              </p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">Version 2.0</Badge>
                <Badge variant="secondary">REST API</Badge>
                <Badge variant="secondary">WebSocket</Badge>
              </div>
            </div>

            {/* Quick Start Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconRocket className="size-5" />
                  Quick Start
                </CardTitle>
                <CardDescription>Get started with DexTective API in minutes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">1. Get Your API Key</h3>
                  <p className="text-sm text-muted-foreground">
                    Navigate to the <a href="/api-key" className="text-primary underline">API Key</a> page to generate your unique API key.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">2. Base URL</h3>
                  <div className="flex items-center gap-2 bg-muted p-3 rounded-md font-mono text-sm">
                    <code>https://api.dextective.io/v2</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto"
                      onClick={() => copyToClipboard("https://api.dextective.io/v2", "base-url")}
                    >
                      {copiedEndpoint === "base-url" ? <IconShieldCheck className="size-4 text-green-500" /> : <IconCopy className="size-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">3. Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Include your API key in the request header:
                  </p>
                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-sm">Authorization: Bearer YOUR_API_KEY</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Endpoints */}
            <Tabs defaultValue="tokens" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="tokens">Tokens</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="boost">Boost</TabsTrigger>
                <TabsTrigger value="wallet">Wallet</TabsTrigger>
                <TabsTrigger value="websocket">WebSocket</TabsTrigger>
              </TabsList>

              {/* Tokens Tab */}
              <TabsContent value="tokens" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Token Endpoints</CardTitle>
                    <CardDescription>Access new token launches and token data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Get New Tokens */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge>GET</Badge>
                        <code className="text-sm">/tokens/new</code>
                      </div>
                      <p className="text-sm text-muted-foreground">Retrieve newly launched tokens</p>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Query Parameters:</h4>
                        <div className="bg-muted p-3 rounded-md space-y-1 text-sm font-mono">
                          <div>?launchpad=<span className="text-muted-foreground">all|raydium|pumpfun|moonshot</span></div>
                          <div>&limit=<span className="text-muted-foreground">50</span></div>
                          <div>&offset=<span className="text-muted-foreground">0</span></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Example Response:</h4>
                        <div className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">
                          <pre>{`{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Pepe AI",
      "symbol": "PEPEAI",
      "ca": "abc123...xyz789",
      "chain": "Solana",
      "price": "0.00045",
      "marketCap": "450K",
      "launchpad": "Raydium",
      "createdAt": "2025-01-19T10:30:00Z"
    }
  ],
  "total": 150
}`}</pre>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Get Token Details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge>GET</Badge>
                        <code className="text-sm">/tokens/:id</code>
                      </div>
                      <p className="text-sm text-muted-foreground">Get detailed information about a specific token</p>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Path Parameters:</h4>
                        <div className="bg-muted p-3 rounded-md text-sm font-mono">
                          <div>id: <span className="text-muted-foreground">Token ID or Contract Address</span></div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Get Token Security */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge>GET</Badge>
                        <code className="text-sm">/tokens/:id/security</code>
                      </div>
                      <p className="text-sm text-muted-foreground">Get security audit information for a token</p>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Response includes:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                          <li>• Mint authority status</li>
                          <li>• Freeze authority status</li>
                          <li>• LP token burn percentage</li>
                          <li>• Top holder concentration</li>
                          <li>• Honeypot detection</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Trending Tab */}
              <TabsContent value="trending" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Trending Endpoints</CardTitle>
                    <CardDescription>Access trending tokens and market data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge>GET</Badge>
                        <code className="text-sm">/trending</code>
                      </div>
                      <p className="text-sm text-muted-foreground">Get list of trending tokens based on volume and activity</p>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Query Parameters:</h4>
                        <div className="bg-muted p-3 rounded-md space-y-1 text-sm font-mono">
                          <div>?timeframe=<span className="text-muted-foreground">1h|24h|7d</span></div>
                          <div>&chain=<span className="text-muted-foreground">solana|ethereum|bsc</span></div>
                          <div>&limit=<span className="text-muted-foreground">100</span></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Boost Tab */}
              <TabsContent value="boost" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>DexBoost Endpoints</CardTitle>
                    <CardDescription>Access boosted tokens and signals</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge>GET</Badge>
                        <code className="text-sm">/boost/tokens</code>
                      </div>
                      <p className="text-sm text-muted-foreground">Get tokens with boost signals</p>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Response Fields:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                          <li>• Token details (name, symbol, CA)</li>
                          <li>• Boost count and timestamp</li>
                          <li>• Price and market cap</li>
                          <li>• Volume 24h</li>
                          <li>• Social metrics</li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge>GET</Badge>
                        <code className="text-sm">/boost/paid</code>
                      </div>
                      <p className="text-sm text-muted-foreground">Get premium featured tokens (DexPaid)</p>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Tier Levels:</h4>
                        <div className="flex gap-2">
                          <Badge variant="secondary">Diamond</Badge>
                          <Badge variant="secondary">Platinum</Badge>
                          <Badge variant="secondary">Gold</Badge>
                          <Badge variant="secondary">Silver</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wallet Tab */}
              <TabsContent value="wallet" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Wallet Endpoints</CardTitle>
                    <CardDescription>Track wallet activities and holdings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge>GET</Badge>
                        <code className="text-sm">/wallet/:address/portfolio</code>
                      </div>
                      <p className="text-sm text-muted-foreground">Get wallet portfolio and token holdings</p>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge>GET</Badge>
                        <code className="text-sm">/wallet/:address/transactions</code>
                      </div>
                      <p className="text-sm text-muted-foreground">Get wallet transaction history</p>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Query Parameters:</h4>
                        <div className="bg-muted p-3 rounded-md space-y-1 text-sm font-mono">
                          <div>?limit=<span className="text-muted-foreground">50</span></div>
                          <div>&type=<span className="text-muted-foreground">all|buy|sell</span></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* WebSocket Tab */}
              <TabsContent value="websocket" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>WebSocket Connection</CardTitle>
                    <CardDescription>Real-time data streaming</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold">Connection URL</h3>
                      <div className="flex items-center gap-2 bg-muted p-3 rounded-md font-mono text-sm">
                        <code>wss://ws.dextective.io/v2</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          onClick={() => copyToClipboard("wss://ws.dextective.io/v2", "ws-url")}
                        >
                          {copiedEndpoint === "ws-url" ? <IconShieldCheck className="size-4 text-green-500" /> : <IconCopy className="size-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold">Subscribe to Channels</h3>
                      <div className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">
                        <pre>{`// Connect
const ws = new WebSocket('wss://ws.dextective.io/v2');

// Authenticate
ws.send(JSON.stringify({
  type: 'auth',
  apiKey: 'YOUR_API_KEY'
}));

// Subscribe to new tokens
ws.send(JSON.stringify({
  type: 'subscribe',
  channel: 'tokens.new',
  filters: {
    launchpad: 'raydium'
  }
}));

// Listen for messages
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};`}</pre>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold">Available Channels</h3>
                      <ul className="space-y-2">
                        <li className="text-sm">
                          <code className="bg-muted px-2 py-1 rounded">tokens.new</code>
                          <span className="text-muted-foreground ml-2">- New token launches</span>
                        </li>
                        <li className="text-sm">
                          <code className="bg-muted px-2 py-1 rounded">tokens.trending</code>
                          <span className="text-muted-foreground ml-2">- Trending tokens updates</span>
                        </li>
                        <li className="text-sm">
                          <code className="bg-muted px-2 py-1 rounded">boost.signals</code>
                          <span className="text-muted-foreground ml-2">- Boost signal alerts</span>
                        </li>
                        <li className="text-sm">
                          <code className="bg-muted px-2 py-1 rounded">price.updates</code>
                          <span className="text-muted-foreground ml-2">- Real-time price updates</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Rate Limits */}
            <Card>
              <CardHeader>
                <CardTitle>Rate Limits</CardTitle>
                <CardDescription>API usage limits and quotas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Free Tier</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 100 requests/minute</li>
                      <li>• 10,000 requests/day</li>
                      <li>• Basic endpoints only</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Pro Tier</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 500 requests/minute</li>
                      <li>• 100,000 requests/day</li>
                      <li>• All endpoints</li>
                      <li>• WebSocket access</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Enterprise</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Unlimited requests</li>
                      <li>• Priority support</li>
                      <li>• Custom integrations</li>
                      <li>• Dedicated server</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Error Codes */}
            <Card>
              <CardHeader>
                <CardTitle>Error Codes</CardTitle>
                <CardDescription>Common error codes and their meanings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge variant="destructive">400</Badge>
                    <div>
                      <h4 className="font-semibold text-sm">Bad Request</h4>
                      <p className="text-sm text-muted-foreground">Invalid parameters or malformed request</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Badge variant="destructive">401</Badge>
                    <div>
                      <h4 className="font-semibold text-sm">Unauthorized</h4>
                      <p className="text-sm text-muted-foreground">Invalid or missing API key</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Badge variant="destructive">429</Badge>
                    <div>
                      <h4 className="font-semibold text-sm">Too Many Requests</h4>
                      <p className="text-sm text-muted-foreground">Rate limit exceeded</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Badge variant="destructive">500</Badge>
                    <div>
                      <h4 className="font-semibold text-sm">Internal Server Error</h4>
                      <p className="text-sm text-muted-foreground">Server-side error, please try again later</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>Get support and connect with our community</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Button variant="outline" asChild>
                  <a href="https://discord.gg/dextective" target="_blank" rel="noopener noreferrer">
                    <IconExternalLink className="size-4 mr-2" />
                    Join Discord
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://t.me/dextective" target="_blank" rel="noopener noreferrer">
                    <IconExternalLink className="size-4 mr-2" />
                    Telegram Support
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:support@dextective.io">
                    <IconExternalLink className="size-4 mr-2" />
                    Email Support
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
