import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>SOLANA</CardDescription>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <CardTitle className="flex items-baseline gap-3 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <span>$132.32</span>
            <span className="text-base text-muted-foreground font-normal">132.32 SOL</span>
          </CardTitle>
        </CardContent>
        {/* </CHANGE> */}
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            SOL/USDC <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Solana realtime price
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Binance Smart Chain</CardDescription>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <CardTitle className="flex items-baseline gap-3 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <span>$1,240.00</span>
            <span className="text-base text-muted-foreground font-normal">620.00 BNB</span>
          </CardTitle>
        </CardContent>
        {/* </CHANGE> */}
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            BNB/USDT <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            BNB realtime price
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Ethereum</CardDescription>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <CardTitle className="flex items-baseline gap-3 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <span>$1,430.00</span>
            <span className="text-base text-muted-foreground font-normal">0.45 ETH</span>
          </CardTitle>
        </CardContent>
        {/* </CHANGE> */}
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            ETH/USDT <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Ethereum realtime price</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pulse Chain</CardDescription>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <CardTitle className="flex items-baseline gap-3 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <span>$1,220.00</span>
            <span className="text-base text-muted-foreground font-normal">12,200 WPLS</span>
          </CardTitle>
        </CardContent>
        {/* </CHANGE> */}
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            WPLS/USDT <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Pulse chain realtime price</div>
        </CardFooter>
      </Card>
    </div>
  )
}
