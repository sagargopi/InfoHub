"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, RefreshCw, Copy, Check } from "lucide-react"

interface Quote {
  text: string
  author: string
}

export default function QuoteGenerator() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const fetchQuote = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await fetch("/api/quote")
      if (!response.ok) {
        throw new Error("Failed to fetch quote")
      }
      const data = await response.json()
      setQuote(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not fetch quote")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  const handleCopy = async () => {
    if (quote) {
      await navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          <p className="text-slate-600 dark:text-slate-300">Loading quote...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!quote) {
    return (
      <Alert>
        <AlertDescription>No quote available</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quote Card */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 p-8 rounded-lg border-2 border-amber-200 dark:border-amber-800">
        <div className="mb-4 text-4xl text-amber-600 dark:text-amber-400">"</div>
        <p className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-4 leading-relaxed">
          {quote.text}
        </p>
        <p className="text-lg text-slate-600 dark:text-slate-300">— {quote.author}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-wrap">
        <Button onClick={fetchQuote} variant="outline" className="flex items-center gap-2 bg-transparent">
          <RefreshCw className="w-4 h-4" />
          New Quote
        </Button>
        <Button onClick={handleCopy} variant="default" className="flex items-center gap-2">
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Quote
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
