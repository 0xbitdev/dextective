"use client"

import { useState } from "react"
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { IconRobot, IconSend, IconSparkles } from "@tabler/icons-react"
import { AccessCodeDialog } from "@/components/access-code-dialog"

export default function AIAssistantPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [message, setMessage] = useState("")

  const suggestions = [
    "Analyze SOL price action for the next 24h",
    "Find tokens with high volume and low market cap",
    "What are the trending narratives today?",
    "Give me a risk assessment for PEPE token",
  ]

  const chatHistory = [
    { role: "assistant", content: "Hello! I'm your AI trading assistant. How can I help you today?" },
  ]

  const handleSend = () => {
    if (message.trim()) {
      setDialogOpen(true)
    }
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
          <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <IconRobot className="size-6" />
                <h1 className="text-2xl font-bold">AI Assistant</h1>
              </div>
              <p className="text-muted-foreground">Get AI-powered insights for your trading decisions</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Chat</CardTitle>
                  <CardDescription>Ask anything about tokens, trading, or market analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="min-h-[400px] space-y-4 rounded-lg border p-4">
                      {chatHistory.map((msg, i) => (
                        <div key={i} className="flex gap-3">
                          <Avatar className="size-8">
                            <AvatarFallback>
                              <IconRobot className="size-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">AI Assistant</p>
                            <p className="text-sm text-muted-foreground">{msg.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Ask me anything..." 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSend()
                          }
                        }}
                      />
                      <Button size="icon" onClick={handleSend}>
                        <IconSend className="size-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconSparkles className="size-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {suggestions.map((suggestion, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          className="w-full justify-start text-left h-auto whitespace-normal"
                          onClick={() => {
                            setMessage(suggestion)
                            setDialogOpen(true)
                          }}
                        >
                          <span className="text-sm">{suggestion}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Token analysis & research</li>
                      <li>• Market sentiment analysis</li>
                      <li>• Risk assessment</li>
                      <li>• Trading strategies</li>
                      <li>• Portfolio recommendations</li>
                      <li>• Real-time market insights</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
      <AccessCodeDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        featureName="AI Assistant" 
      />
    </SidebarProvider>
  )
}
