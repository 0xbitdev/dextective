"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IconLock } from "@tabler/icons-react"
import { toast } from "sonner"

interface AccessCodeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  featureName: string
}

export function AccessCodeDialog({ open, onOpenChange, featureName }: AccessCodeDialogProps) {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate validation
    setTimeout(() => {
      if (code === "1234") {
        toast.success("Access granted!", {
          description: `You now have access to ${featureName}`,
        })
        onOpenChange(false)
        setCode("")
      } else {
        toast.error("Invalid access code", {
          description: "Please enter the correct 4-digit code",
        })
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <IconLock className="size-5 text-primary" />
            <DialogTitle>Premium Feature</DialogTitle>
          </div>
          <DialogDescription>
            Enter your 4-digit access code to unlock {featureName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Access Code</Label>
              <Input
                id="code"
                type="text"
                maxLength={4}
                placeholder="Enter 4-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                className="text-center text-2xl tracking-widest"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false)
                setCode("")
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={code.length !== 4 || loading}>
              {loading ? "Verifying..." : "Unlock"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
