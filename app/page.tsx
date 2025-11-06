"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cloud, DollarSign, Zap } from "lucide-react"
import WeatherModule from "@/components/weather-module"
import CurrencyConverter from "@/components/currency-converter"
import QuoteGenerator from "@/components/quote-generator"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"weather" | "currency" | "quote">("weather")

  const tabs = [
    { id: "weather", label: "Weather", icon: Cloud },
    { id: "currency", label: "Currency", icon: DollarSign },
    { id: "quote", label: "Quotes", icon: Zap },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">InfoHub</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">Your all-in-one utility companion</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "weather" | "currency" | "quote")}
                variant={isActive ? "default" : "outline"}
                className="flex items-center gap-2 px-6 py-2 h-auto"
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Button>
            )
          })}
        </div>

        {/* Content Area */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">
              {activeTab === "weather" && "Current Weather"}
              {activeTab === "currency" && "Currency Converter"}
              {activeTab === "quote" && "Daily Motivation"}
            </CardTitle>
            <CardDescription>
              {activeTab === "weather" && "Check the current weather conditions"}
              {activeTab === "currency" && "Convert INR to USD and EUR"}
              {activeTab === "quote" && "Get inspired with a motivational quote"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeTab === "weather" && <WeatherModule />}
            {activeTab === "currency" && <CurrencyConverter />}
            {activeTab === "quote" && <QuoteGenerator />}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">
          <p>InfoHub • Your everyday utilities in one place</p>
        </div>
      </div>
    </div>
  )
}
