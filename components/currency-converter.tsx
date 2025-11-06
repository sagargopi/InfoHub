"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

interface ConversionData {
  amount: number
  inr: number
  usd: number
  eur: number
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("100")
  const [conversion, setConversion] = useState<ConversionData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchConversion = async (value: string) => {
    try {
      setLoading(true)
      setError("")
      const numAmount = Number.parseFloat(value) || 0

      if (numAmount < 0) {
        setError("Amount must be positive")
        setLoading(false)
        return
      }

      const response = await fetch(`/api/currency?amount=${numAmount}`)
      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates")
      }
      const data = await response.json()
      setConversion(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not fetch conversion rates")
      setConversion(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (amount) {
      fetchConversion(amount)
    }
  }, [amount])

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Amount in INR</label>
        <Input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
          className="w-full"
          min="0"
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        </div>
      ) : conversion ? (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">₹ {conversion.inr}</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">= $ {conversion.usd.toFixed(2)}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">USD</p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">₹ {conversion.inr}</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">= € {conversion.eur.toFixed(2)}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">EUR</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
