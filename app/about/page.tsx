"use client"

import { useState } from "react"
import {
  IconShieldCheck,
  IconRocket,
  IconChartBar,
  IconTarget,
  IconCopy,
  IconTrendingUp,
  IconRobotFace,
  IconBell,
  IconSparkles,
  IconDiamond,
  IconBrandTelegram,
  IconBrandX,
  IconBrandDiscord,
  IconBrandGithub,
  IconCheck,
  IconArrowRight,
  IconInnerShadowTop,
  IconCalendarEvent, // Added for Roadmap
} from "@tabler/icons-react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image' // Added for Integrated Launchpads

export default function AboutPage() {
  const [copied, setCopied] = useState(false)
  const contractAddress = "6Z5qEoiWMsjz95R7g61axKMMYzvaUZAzpTDfVTBupump" // Replace with actual contract address

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-6 p-4 lg:gap-8 lg:p-6">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 lg:p-12">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <IconInnerShadowTop className="size-12 text-primary" />
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Dexlite
                </h1>
              </div>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mb-6">
                Your Ultimate Solana Trading Intelligence Platform
              </p>
              <p className="text-base text-muted-foreground max-w-4xl leading-relaxed">
                Dexlite is a comprehensive, real-time crypto trading analytics and automation platform built specifically for the Solana ecosystem.
                We empower traders with cutting-edge tools to discover new token launches, monitor trending assets, execute automated trading strategies,
                and make data-driven decisions with confidence.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                <Badge variant="secondary" className="text-sm">Real-Time Analytics</Badge>
                <Badge variant="secondary" className="text-sm">Automated Trading</Badge>
                <Badge variant="secondary" className="text-sm">Security Audits</Badge>
                <Badge variant="secondary" className="text-sm">Copy Trading</Badge>
              </div>
            </div>
          </div>

          <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-background">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <IconShieldCheck className="size-5 text-primary" />
                $DEXT Token Contract Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border">
                <code className="flex-1 text-sm font-mono break-all">
                  {contractAddress}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopy}
                  className="shrink-0"
                >
                  {copied ? (
                    <IconCheck className="size-4 text-green-500" />
                  ) : (
                    <IconCopy className="size-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Always verify the contract address before making any transactions
              </p>
            </CardContent>
          </Card>

          {/* Mission & Vision */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconTarget className="size-5 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  To democratize access to professional-grade trading tools and intelligence, enabling both novice and experienced traders
                  to navigate the fast-paced Solana DeFi ecosystem with confidence and precision.
                </p>
                <p>
                  We believe everyone should have access to the same powerful tools that professional traders use, leveling the playing field
                  and creating opportunities for all participants in the crypto market.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconRocket className="size-5 text-primary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  To become the most trusted and comprehensive trading intelligence platform in the Solana ecosystem, setting the standard
                  for real-time data accuracy, security auditing, and automated trading capabilities.
                </p>
                <p>
                  We envision a future where every trader has access to institutional-grade analytics and automation, making informed
                  trading decisions accessible to everyone.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Core Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Core Features</CardTitle>
              <CardDescription>
                Comprehensive tools designed to give you a competitive edge in the Solana ecosystem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Token Discovery */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <IconSparkles className="size-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">New Token Discovery</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Real-time monitoring of newly launched tokens on Solana with instant notifications. Filter by launchpad
                      (Raydium, Jupiter, Orca, Pump.fun), view social media presence, track initial liquidity, and get detailed
                      token metrics within seconds of launch. Stay ahead of the market with our sub-second detection algorithms.
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Instant launch detection across all major DEXs</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Social media verification (X, Telegram, Website)</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Initial liquidity and holder analysis</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Integration with top trading bots (Trojan, Axiom, Maestro)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              {/* DexBoost */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <IconRocket className="size-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">DexBoost Signals</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Community-powered boost signals that highlight tokens gaining momentum. Track boost counts, velocity, and sentiment
                      to identify trending opportunities before they go mainstream. Our algorithm analyzes boost patterns, timing, and
                      source credibility to surface the most promising signals.
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Real-time boost tracking with velocity metrics</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Sentiment analysis and boost quality scoring</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Historical boost performance correlation</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Quick-buy integration with trading bots</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              {/* DexPaid */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <IconDiamond className="size-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">DexPaid Premium Listings</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Curated premium token listings with verified projects that have passed our rigorous vetting process. Tokens are
                      categorized by tier (Diamond, Platinum, Gold, Silver) based on fundamentals, team credibility, contract security,
                      and market metrics. Premium listings receive enhanced visibility and detailed audit reports.
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Multi-tier verification system</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Comprehensive security audits and smart contract analysis</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Team background checks and project roadmap verification</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Priority placement and featured status</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Trending Tokens */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <IconChartBar className="size-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Trending Token Analytics</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Advanced analytics dashboard tracking price movements, volume surges, and market cap growth across the Solana ecosystem.
                      Our proprietary trending algorithm considers multiple factors including trading volume, holder growth, social mentions,
                      and price velocity to identify tokens with genuine momentum.
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Real-time price tracking with candlestick charts</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Volume analysis and liquidity depth monitoring</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Holder distribution and whale tracking</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Top traders and KOL activity monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Alerts System */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <IconBell className="size-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Custom Alert System</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Create personalized alerts for price movements, volume thresholds, new token launches, boost signals, and more.
                      Receive instant notifications via browser, Telegram, or Discord when your conditions are met. Never miss an opportunity
                      with our flexible multi-condition alert builder.
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Multi-condition alert builder with AND/OR logic</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Cross-platform notifications (Browser, Telegram, Discord)</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Price alerts, volume spikes, and holder changes</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Alert history and performance tracking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Features */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <IconShieldCheck className="size-6 text-primary" />
                Premium Access Features
              </CardTitle>
              <CardDescription>
                Advanced trading automation and intelligence tools for serious traders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Snipe Mode */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <IconTarget className="size-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Snipe Mode</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Automated token launch sniping with multiple detection modes. Configure buy amounts, slippage tolerance, priority fees,
                      tax limits, and anti-rug protection. Detect token launches, liquidity additions, and migration events instantly with
                      sub-second execution through integrated trading bots.
                    </p>
                    <div className="mt-3 space-y-2">
                      <Badge variant="outline" className="mr-2">Token Launch Detection</Badge>
                      <Badge variant="outline" className="mr-2">Liquidity Monitoring</Badge>
                      <Badge variant="outline" className="mr-2">Migration Events</Badge>
                    </div>
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Configurable buy conditions and risk parameters</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Anti-rug checks (honeypot, mint authority, freeze authority)</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Auto-sell strategies with trailing stop-loss</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Multi-wallet management and position tracking</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Copy Trading */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <IconCopy className="size-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Copy Trade</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Mirror successful traders' strategies automatically. Browse top-performing wallets, analyze their win rates, average
                      hold times, and profit/loss ratios. Set up copy conditions, allocate capital, and execute trades simultaneously with
                      your selected traders while maintaining full control over your risk parameters.
                    </p>
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Top trader leaderboard with verified performance metrics</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Customizable copy parameters (allocation, max buy, stop-loss)</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Real-time trade mirroring with delay settings</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Performance tracking and PnL reporting</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              {/* DCA */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <IconTrendingUp className="size-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Dollar-Cost Averaging (DCA)</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Automated DCA strategies to build positions systematically over time. Set up recurring purchases at fixed intervals
                      or price-based triggers. Reduce timing risk, smooth out volatility, and accumulate tokens at average prices with
                      complete customization of intervals, amounts, and stop conditions.
                    </p>
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Time-based and price-based DCA triggers</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Budget management and allocation tracking</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Average price calculation and unrealized PnL</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Auto-stop on budget depletion or target price</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Pump Meta */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <IconRocket className="size-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Pump Meta Analytics</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Advanced analytics for Pump.fun token launches with early detection and graduation tracking. Monitor bonding curve
                      progress, detect potential pumps before they happen, and track migration to Raydium. Our algorithm analyzes buy
                      patterns, holder distribution, and social sentiment to identify high-potential launches.
                    </p>
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Real-time Pump.fun launch monitoring</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Bonding curve progress and graduation predictions</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Early holder analysis and whale tracking</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Post-graduation performance tracking</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              {/* AI Assistant */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <IconRobotFace className="size-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">AI Trading Assistant</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Intelligent AI assistant powered by advanced machine learning models trained on millions of Solana transactions.
                      Get natural language insights, risk assessments, and trading recommendations. Ask questions about tokens, analyze
                      charts, receive portfolio suggestions, and get real-time market sentiment analysis in conversational format.
                    </p>
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Natural language token analysis and risk assessment</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Chart pattern recognition and technical analysis</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Portfolio optimization recommendations</li>
                      <li className="flex items-center gap-2"><IconCheck className="size-4 text-primary" /> Market sentiment analysis and trend predictions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security & Technology */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <IconShieldCheck className="size-6 text-primary" />
                Security & Technology
              </CardTitle>
              <CardDescription>
                Enterprise-grade security and cutting-edge technology stack
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Smart Contract Auditing</h4>
                <p className="leading-relaxed">
                  Every token listed on Dexlite undergoes automated security scanning for common vulnerabilities including honeypot
                  detection, mint authority status, freeze authority checks, ownership renouncement verification, and liquidity lock analysis.
                  Our multi-layered audit system provides risk scores and detailed reports for informed decision-making.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Real-Time Data Pipeline</h4>
                <p className="leading-relaxed">
                  Built on high-performance infrastructure with direct RPC connections to Solana mainnet nodes. Our custom-built indexing
                  system processes blocks in real-time with sub-second latency, ensuring you receive the freshest data possible. We maintain
                  redundant data sources and automatic failover to guarantee 99.9% uptime.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Wallet Security</h4>
                <p className="leading-relaxed">
                  Dexlite never stores your private keys or has access to your funds. We integrate with industry-standard Solana wallets
                  (Phantom, Solflare, Torus) using secure wallet adapter protocols. All trading bot integrations use API keys with
                  permission-based access controls, and we support hardware wallet integration for maximum security.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">API & Developer Access</h4>
                <p className="leading-relaxed">
                  Comprehensive REST API and WebSocket feeds for developers building on top of Dexlite. Access the same data and
                  functionality that powers our platform with generous rate limits and detailed documentation. Enterprise plans include
                  dedicated support, custom endpoints, and priority infrastructure access.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <IconCalendarEvent className="size-6 text-primary" />
                Development Roadmap
              </CardTitle>
              <CardDescription>
                Our journey to becoming the leading Solana trading intelligence platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* November 2025 */}
              <div className="relative pl-8 pb-6 border-l-2 border-primary/20">
                <div className="absolute -left-3 top-0 size-6 rounded-full bg-primary flex items-center justify-center">
                  <div className="size-3 rounded-full bg-background" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">November 2025</Badge>
                    <Badge variant="outline">Current</Badge>
                  </div>
                  <h4 className="font-semibold text-lg">Token Launch & Beta Release</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <IconCheck className="size-4 text-primary" />
                      $DEXT token launch on Solana
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck className="size-4 text-primary" />
                      Public beta platform launch with core features
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck className="size-4 text-primary" />
                      Real-time new token detection system
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck className="size-4 text-primary" />
                      DexBoost and DexPaid listing integration
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck className="size-4 text-primary" />
                      Basic wallet connection and trading bot integration
                    </li>
                  </ul>
                </div>
              </div>

              {/* December 2025 */}
              <div className="relative pl-8 pb-6 border-l-2 border-primary/20">
                <div className="absolute -left-3 top-0 size-6 rounded-full bg-primary/60 flex items-center justify-center">
                  <div className="size-3 rounded-full bg-background" />
                </div>
                <div className="space-y-2">
                  <Badge variant="default">December 2025</Badge>
                  <h4 className="font-semibold text-lg">Premium Features & Trading Tools</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <IconArrowRight className="size-4 text-primary" />
                      Snipe Mode with multi-detection capabilities
                    </li>
                    <li className="flex items-center gap-2">
                      <IconArrowRight className="size-4 text-primary" />
                      Copy Trade feature with top trader leaderboard
                    </li>
                    <li className="flex items-center gap-2">
                      <IconArrowRight className="size-4 text-primary" />
                      DCA strategies automation
                    </li>
                    <li className="flex items-center gap-2">
                      <IconArrowRight className="size-4 text-primary" />
                      Advanced security auditing with smart contract analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <IconArrowRight className="size-4 text-primary" />
                      Custom alert system with multi-platform notifications
                    </li>
                    <li className="flex items-center gap-2">
                      <IconArrowRight className="size-4 text-primary" />
                      Mobile app beta release (iOS & Android)
                    </li>
                  </ul>
                </div>
              </div>

              {/* January 2026 */}
              <div className="relative pl-8 pb-6 border-l-2 border-primary/20">
                <div className="absolute -left-3 top-0 size-6 rounded-full bg-primary/40 flex items-center justify-center">
                  <div className="size-3 rounded-full bg-background" />
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">January 2026</Badge>
                  <h4 className="font-semibold text-lg">AI Integration & API Launch</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <IconArrowRight className="size-4 text-muted-foreground" />
                      AI Trading Assistant with natural language processing
                    </li>
                    <li className="flex items-center gap-2">
                      <IconArrowRight className="size-4 text-muted-foreground" />
                      Pump Meta analytics for Pump.fun launches
                    </li>
                    <li className="flex items-center gap-2">
                      <IconArrowRight className="size-4 text-muted-foreground" />
                      Public API launch with comprehensive documentation
                    </li>
                    <li className="flex items-center gap-2">
                      <IconArrowRight className="size-4 text-muted-foreground" />
                      WebSocket feeds for real-time data streaming
                    </li>
                    <li className="flex items-center gap-2">
                      <IconArrowRight className="size-4 text-muted-foreground" />
                      Portfolio tracking and performance analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <IconArrowRight className="size-4 text-muted-foreground" />
                      Advanced charting with technical indicators
                    </li>
                  </ul>
                </div>
              </div>

              {/* February 2026 */}
              <div className="relative pl-8">
                <div className="absolute -left-3 top-0 size-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="size-3 rounded-full bg-background" />
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">February 2026</Badge>
                  <h4 className="font-semibold text-lg">Ecosystem Expansion & V2 Launch</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <IconArrowRight className="size-4 text-muted-foreground" />
                      Dexlite V2 with enhanced UI/UX
                    </li>
                    <li className="flex items-center gap-2">
                      <IconArrowRight className="size-4 text-muted-foreground" />
                      Multi-chain expansion (Base, Ethereum, BSC)
                    </li>
                    <li className="flex items-center gap-2">
                      <IconArrowRight className="size-4 text-muted-foreground" />
                      Social trading features and community leaderboards
                    </li>
                    <li className="flex items-center gap-2">
                      <IconArrowRight className="size-4 text-muted-foreground" />
                      Token holder rewards and staking program
                    </li>
                    <li className="flex items-center gap-2">
                      <IconArrowRight className="size-4 text-muted-foreground" />
                      Partnership integrations with major CEXs
                    </li>
                    <li className="flex items-center gap-2">
                      <IconArrowRight className="size-4 text-muted-foreground" />
                      Enterprise API tier with dedicated infrastructure
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Integrated Launchpads & DEXs</CardTitle>
              <CardDescription>
                Direct integration with leading Solana launchpads and decentralized exchanges for comprehensive market coverage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="flex flex-col items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="relative size-16">
                    <Image
                      src="/raydium.png"
                      alt="Raydium"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">Raydium</span>
                </div>

                <div className="flex flex-col items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="relative size-16">
                    <Image
                      src="/jup.png"
                      alt="Jupiter"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">Jupiter</span>
                </div>

                <div className="flex flex-col items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="relative size-16">
                    <Image
                      src="/orca.png"
                      alt="Orca"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">Orca</span>
                </div>

                <div className="flex flex-col items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="relative size-16">
                    <Image
                      src="/pumpfun.png"
                      alt="Pump.fun"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">Pump.fun</span>
                </div>

                <div className="flex flex-col items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="relative size-16">
                    <Image
                      src="/meteora.png"
                      alt="Meteora"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">Meteora</span>
                </div>

                <div className="flex flex-col items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="relative size-16">
                    <Image
                      src="/moonit.png"
                      alt="Moonshot"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">Moonshot</span>
                </div>

                <div className="flex flex-col items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="relative size-16">
                    <Image
                      src="/bonk.png"
                      alt="Bonkbot"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">Bonkbot</span>
                </div>

                <div className="flex flex-col items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="relative size-16">
                    <Image
                      src="/belive.png"
                      alt="Believe"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">Believe</span>
                </div>

                <div className="flex flex-col items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="relative size-16">
                    <Image
                      src="/bags.png"
                      alt="BagSwap"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">BagSwap</span>
                </div>

                <div className="flex flex-col items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="relative size-16">
                    <Image
                      src="/heven.png"
                      alt="Heaven"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">Heaven</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground text-center">
                  Dexlite aggregates data from all major Solana launchpads and DEXs in real-time,
                  giving you comprehensive market coverage and the fastest token detection in the ecosystem.
                </p>
              </div>
            </CardContent>
          </Card>


          {/* Platform Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Tokens Tracked</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">50K+</div>
                <p className="text-xs text-muted-foreground mt-1">Active Solana tokens</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Daily Launches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,000+</div>
                <p className="text-xs text-muted-foreground mt-1">New tokens detected</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>API Requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">10M+</div>
                <p className="text-xs text-muted-foreground mt-1">Requests per day</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active Users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">25K+</div>
                <p className="text-xs text-muted-foreground mt-1">Traders worldwide</p>
              </CardContent>
            </Card>
          </div>

          {/* Community */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Join Our Community</CardTitle>
              <CardDescription>
                Connect with thousands of traders, get support, and stay updated on new features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" asChild className="h-auto flex-col gap-2 p-4">
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                    <IconBrandX className="size-6" />
                    <div className="text-center">
                      <div className="font-semibold">X (Twitter)</div>
                      <div className="text-xs text-muted-foreground">Follow for updates</div>
                    </div>
                  </a>
                </Button>

                <Button variant="outline" asChild className="h-auto flex-col gap-2 p-4">
                  <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                    <IconBrandDiscord className="size-6" />
                    <div className="text-center">
                      <div className="font-semibold">Discord</div>
                      <div className="text-xs text-muted-foreground">Join discussions</div>
                    </div>
                  </a>
                </Button>

                <Button variant="outline" asChild className="h-auto flex-col gap-2 p-4">
                  <a href="https://t.me" target="_blank" rel="noopener noreferrer">
                    <IconBrandTelegram className="size-6" />
                    <div className="text-center">
                      <div className="font-semibold">Telegram</div>
                      <div className="text-xs text-muted-foreground">Get instant alerts</div>
                    </div>
                  </a>
                </Button>

                <Button variant="outline" asChild className="h-auto flex-col gap-2 p-4">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <IconBrandGithub className="size-6" />
                    <div className="text-center">
                      <div className="font-semibold">GitHub</div>
                      <div className="text-xs text-muted-foreground">View open source</div>
                    </div>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Support */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Contact & Support</CardTitle>
              <CardDescription>
                We're here to help you succeed. Reach out anytime.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">General Inquiries</h4>
                  <p className="text-sm text-muted-foreground">hello@Dexlite.io</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Technical Support</h4>
                  <p className="text-sm text-muted-foreground">support@Dexlite.io</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Partnership Inquiries</h4>
                  <p className="text-sm text-muted-foreground">partnerships@Dexlite.io</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Developer API</h4>
                  <p className="text-sm text-muted-foreground">api@Dexlite.io</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">Documentation</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Comprehensive guides, API references, and tutorials to help you get the most out of Dexlite.
                </p>
                <Button variant="outline" asChild>
                  <a href="/documentation">
                    View Documentation <IconArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Dexlite © 2025. All rights reserved.</p>
            <p className="mt-1">Built with ❤️ for the Solana community</p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
