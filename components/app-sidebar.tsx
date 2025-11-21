"use client"

import * as React from "react"
import {
  IconBell,
  IconBrandTelegram,
  IconChartBar,
  IconDatabase,
  IconFileAi,
  IconHelp,
  IconInnerShadowTop,
  IconReport,
  IconRocket,
  IconSettings,
  IconSparkles,
  IconTarget,
  IconCopy,
  IconTrendingUp,
  IconRobotFace,
  IconKey,
  IconBook,
  IconDiamond, // Added IconDiamond for DexPaid menu
  IconBrandX, // Added social media icons
  IconBrandDiscord,
  IconBrandGithub, // Added GitHub icon for sidebar
} from "@tabler/icons-react"

import { NavPremium } from '@/components/nav-premium'
import { NavDocuments } from '@/components/nav-documents'
import { NavMain } from '@/components/nav-main'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/favicon.jpg",
  },
  navMain: [
    {
      title: "New Tokens",
      url: "/tokens",
      icon: IconSparkles,
    },
    {
      title: "DexBoost",
      url: "/dexboost",
      icon: IconRocket,
    },
    {
      title: "DexPaid",
      url: "/dexpaid",
      icon: IconDiamond,
    },
    {
      title: "Trending Token",
      url: "/trending-token",
      icon: IconChartBar,
    },
    {
      title: "Alerts",
      url: "/alerts",
      icon: IconBell,
    },
  ],
  premium: [
    {
      name: "Snipe Mode",
      url: "/snipe-mode",
      icon: IconTarget,
    },
    {
      name: "Copy Trade",
      url: "/copy-trade",
      icon: IconCopy,
    },
    {
      name: "DCA",
      url: "/dca",
      icon: IconTrendingUp,
    },
    {
      name: "Pump Meta",
      url: "/pump-meta",
      icon: IconRocket,
    },
    {
      name: "AI Assistant",
      url: "/ai-assistant",
      icon: IconRobotFace,
    },
  ],
  documentation: [
    {
      name: "Documentation",
      url: "/documentation",
      icon: IconBook,
    },
    {
      name: "Whitepaper",
      url: "/Dexlite%20Litepaper%20V1.0.pdf",
      icon: IconFileAi,
    },
    {
      name: "API Key",
      url: "/api-key",
      icon: IconKey,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "About DexLite",
      url: "/about",
      icon: IconHelp,
    },
  ],
  socialLinks: [
    {
      name: "X",
      url: "https://x.com/DexliteApp",
      icon: IconBrandX,
    },
    {
      name: "Discord",
      url: "https://discord.com",
      icon: IconBrandDiscord,
    },
    {
      name: "Telegram",
      url: "https://t.me",
      icon: IconBrandTelegram,
    },
    {
      name: "GitHub",
      url: "https://github.com",
      icon: IconBrandGithub,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/" className="flex items-center gap-2">
                <img src="/favicon.jpg" alt="DexLite" className="w-5 h-5 rounded" />
                <span className="text-base font-semibold">DexLite</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavPremium items={data.premium} />
        <NavDocuments items={data.documentation} />
        <NavSecondary items={data.navSecondary} socialLinks={data.socialLinks} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
