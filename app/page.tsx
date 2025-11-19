import Link from "next/link"
import { IconRocket, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Page() {
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
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Metric Cards */}
              <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                <Card className="@container/card">
                  <CardHeader>
                    <CardDescription>TRENDING TOKENS</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                      1,247
                    </CardTitle>
                    <CardAction>
                      <Badge variant="outline">
                        <IconTrendingUp />
                        +12.5%
                      </Badge>
                    </CardAction>
                  </CardHeader>
                  <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                      Total tokens tracked
                    </div>
                    <div className="text-muted-foreground">
                      Updated every 15 seconds
                    </div>
                  </CardFooter>
                </Card>
                
                <Card className="@container/card">
                  <CardHeader>
                    <CardDescription>BOOST SIGNALS TODAY</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                      342
                    </CardTitle>
                    <CardAction>
                      <Badge variant="outline">
                        <IconTrendingUp />
                        +28.3%
                      </Badge>
                    </CardAction>
                  </CardHeader>
                  <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                      DexScreener boosts
                    </div>
                    <div className="text-muted-foreground">
                      Last 24 hours
                    </div>
                  </CardFooter>
                </Card>
                
                <Card className="@container/card">
                  <CardHeader>
                    <CardDescription>TOTAL VOLUME (24H)</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                      $45.2M
                    </CardTitle>
                    <CardAction>
                      <Badge variant="outline">
                        <IconTrendingUp />
                        +18.7%
                      </Badge>
                    </CardAction>
                  </CardHeader>
                  <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                      Trading volume
                    </div>
                    <div className="text-muted-foreground">
                      Across all tracked tokens
                    </div>
                  </CardFooter>
                </Card>
                
                <Card className="@container/card">
                  <CardHeader>
                    <CardDescription>ACTIVE ALERTS</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                      28
                    </CardTitle>
                    <CardAction>
                      <Badge variant="outline">
                        <IconTrendingDown />
                        -4.2%
                      </Badge>
                    </CardAction>
                  </CardHeader>
                  <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                      Price & volume alerts
                    </div>
                    <div className="text-muted-foreground">
                      Configure in settings
                    </div>
                  </CardFooter>
                </Card>
              </div>

              {/* Boost Activity & Trending Categories */}
              <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @4xl/main:grid-cols-2">
                {/* Boost Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Boost Activity</CardTitle>
                    <CardDescription>Recent boost signals from DexScreener</CardDescription>
                  </CardHeader>
                  <div className="p-6 pt-0">
                    <div className="flex flex-col gap-3">
                      {[
                        { name: "Shiba 2.0", symbol: "SHIBA2", boosts: 12, time: "5m ago", logo: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png" },
                        { name: "Bitcoin", symbol: "BTC", boosts: 8, time: "12m ago", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
                        { name: "Ethereum", symbol: "ETH", boosts: 15, time: "18m ago", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
                        { name: "Dogecoin", symbol: "DOGE", boosts: 6, time: "25m ago", logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.png" },
                        { name: "Solana", symbol: "SOL", boosts: 10, time: "32m ago", logo: "https://cryptologos.cc/logos/solana-sol-logo.png" },
                      ].map((token, i) => (
                        <div key={i} className="flex items-center justify-between rounded-lg border bg-card p-3">
                          <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                              <img
                                src={token.logo || "/placeholder.svg"}
                                alt={token.name}
                                className="size-10 rounded-full"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{token.name}</div>
                              <div className="text-sm text-muted-foreground">{token.symbol}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-primary">
                              <IconRocket className="size-4" />
                              <span className="font-semibold">{token.boosts}x</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{token.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Trending Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle>Trending Categories</CardTitle>
                    <CardDescription>Popular token categories</CardDescription>
                  </CardHeader>
                  <div className="p-6 pt-0">
                    <div className="grid grid-cols-2 gap-3 @lg:grid-cols-3">
                      {[
                        { name: "DeFi", count: 342, icon: "💰" },
                        { name: "NFTs", count: 158, icon: "🖼️" },
                        { name: "GameFi", count: 97, icon: "🎮" },
                        { name: "Meme Coins", count: 523, icon: "🐕" },
                        { name: "AI & ML", count: 76, icon: "🤖" },
                        { name: "Metaverse", count: 124, icon: "🌐" },
                      ].map((category, i) => (
                        <div
                          key={i}
                          className="flex flex-col gap-2 rounded-lg border bg-card p-4 transition-shadow hover:shadow-md"
                        >
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <div className="font-medium">{category.name}</div>
                            <div className="text-sm text-muted-foreground">{category.count} tokens</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Top Trending Tokens */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Trending Tokens</CardTitle>
                    <CardDescription>Most active tokens in the last 24 hours</CardDescription>
                  </CardHeader>
                  <div className="p-6 pt-0">
                    <div className="grid grid-cols-1 gap-4 @md:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
                      {[
                        { id: "btc", name: "Bitcoin", symbol: "BTC", price: "$45,234", change: "+5.2%", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
                        { id: "eth", name: "Ethereum", symbol: "ETH", price: "$3,234", change: "+3.8%", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
                        { id: "sol", name: "Solana", symbol: "SOL", price: "$132", change: "+12.5%", logo: "https://cryptologos.cc/logos/solana-sol-logo.png" },
                        { id: "ada", name: "Cardano", symbol: "ADA", price: "$0.52", change: "+7.3%", logo: "https://cryptologos.cc/logos/cardano-ada-logo.png" },
                        { id: "matic", name: "Polygon", symbol: "MATIC", price: "$0.88", change: "+4.1%", logo: "https://cryptologos.cc/logos/polygon-matic-logo.png" },
                        { id: "avax", name: "Avalanche", symbol: "AVAX", price: "$38.2", change: "+6.9%", logo: "https://cryptologos.cc/logos/avalanche-avax-logo.png" },
                        { id: "link", name: "Chainlink", symbol: "LINK", price: "$15.4", change: "+8.2%", logo: "https://cryptologos.cc/logos/chainlink-link-logo.png" },
                        { id: "uni", name: "Uniswap", symbol: "UNI", price: "$6.8", change: "+3.5%", logo: "https://cryptologos.cc/logos/uniswap-uni-logo.png" },
                      ].map((token, i) => (
                        <Link key={i} href={`/tokens/${token.id}`}>
                          <div
                            className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-shadow hover:shadow-md"
                          >
                            <img
                              src={token.logo || "/placeholder.svg"}
                              alt={token.name}
                              className="size-12 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="font-medium">{token.name}</div>
                              <div className="text-sm text-muted-foreground">{token.symbol}</div>
                              <div className="mt-1 flex items-center gap-2">
                                <span className="font-semibold">{token.price}</span>
                                <span className="text-sm text-green-600 dark:text-green-400">
                                  {token.change}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
