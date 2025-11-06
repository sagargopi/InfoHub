import { NextResponse } from "next/server"

interface ExchangeRates {
  usd: number;
  eur: number;
  timestamp: number;
}

// Cache exchange rates for 1 hour
let cachedRates: ExchangeRates | null = null
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

// Fallback rates in case API fails (updated Nov 2025)
const FALLBACK_RATES: Omit<ExchangeRates, 'timestamp'> = {
  usd: 0.014,  // 1 INR = 0.014 USD (approximate)
  eur: 0.013,  // 1 INR = 0.013 EUR (approximate)
}

async function fetchExchangeRates(): Promise<ExchangeRates> {
  const apiKey = process.env.EXCHANGE_RATE_API_KEY
  
  if (!apiKey) {
    console.warn('No EXCHANGE_RATE_API_KEY found. Using fallback rates.')
    return {
      ...FALLBACK_RATES,
      timestamp: Date.now()
    }
  }

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`,
      { next: { revalidate: 3600 } } // Revalidate every hour
    )

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    
    if (data.result !== 'success') {
      throw new Error('Failed to fetch exchange rates')
    }

    return {
      usd: data.conversion_rates.USD,
      eur: data.conversion_rates.EUR,
      timestamp: Date.now()
    }
  } catch (error) {
    console.error('Error fetching exchange rates:', error)
    return {
      ...FALLBACK_RATES,
      timestamp: Date.now()
    }
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const amount = Number.parseFloat(searchParams.get("amount") || "0")

    // Validate input
    if (isNaN(amount) || amount < 0) {
      return NextResponse.json(
        { error: "Please provide a valid positive amount" },
        { status: 400 }
      )
    }

    // Use cached rates if available and not expired
    const now = Date.now()
    if (!cachedRates || now - cachedRates.timestamp > CACHE_DURATION) {
      cachedRates = await fetchExchangeRates()
    }

    // At this point, cachedRates is guaranteed to have a value
    const rates = cachedRates || {
      usd: FALLBACK_RATES.usd,
      eur: FALLBACK_RATES.eur,
      timestamp: now
    }

    // Calculate conversions (amount in INR * rate = amount in target currency)
    const usdAmount = Number((amount * rates.usd).toFixed(2))
    const eurAmount = Number((amount * rates.eur).toFixed(2))
    
    // For debugging
    console.log('Exchange rates:', {
      usdRate: rates.usd,
      eurRate: rates.eur,
      amountInr: amount,
      calculatedUsd: usdAmount,
      calculatedEur: eurAmount
    })

    const conversionData = {
      amount: amount,
      inr: amount,
      usd: usdAmount,
      eur: eurAmount,
      lastUpdated: new Date().toISOString(),
      source: 'api',
    }

    return NextResponse.json(conversionData)
  } catch (error) {
    console.error('Currency conversion error:', error)
    
    // Fallback to mock rates in case of error
    const amount = Number.parseFloat(new URL(request.url).searchParams.get("amount") || "0")
    
    return NextResponse.json({
      amount: amount,
      inr: amount,
      usd: Number((amount * FALLBACK_RATES.usd).toFixed(2)),
      eur: Number((amount * FALLBACK_RATES.eur).toFixed(2)),
      lastUpdated: new Date().toISOString(),
      source: 'fallback',
      error: 'Using fallback rates due to API error'
    }, { status: 200 })
  }
}
