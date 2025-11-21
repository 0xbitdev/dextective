"use client"

import React, { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error for debugging
    console.error('Global error boundary caught:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white dark:bg-gray-900 border rounded p-6 shadow">
        <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
        <p className="text-sm text-muted-foreground mb-4">An unexpected error occurred. You can try to recover.</p>
        <pre className="text-xs bg-muted p-2 rounded overflow-auto mb-4">{String(error?.message)}</pre>
        <div className="flex gap-2">
          <button
            className="px-3 py-2 rounded bg-blue-600 text-white"
            onClick={() => reset()}
          >
            Try again
          </button>
          <button
            className="px-3 py-2 rounded border"
            onClick={() => location.reload()}
          >
            Reload
          </button>
        </div>
      </div>
    </div>
  )
}
