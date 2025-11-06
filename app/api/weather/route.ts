import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get("city") || "San Francisco"

    // Mock weather data - in production, this would call OpenWeatherMap
    const mockWeatherByCity: Record<
      string,
      { temperature: number; condition: string; humidity: number; windSpeed: number; location: string }
    > = {
      "san francisco": {
        temperature: 22,
        condition: "Partly Cloudy",
        humidity: 65,
        windSpeed: 3.5,
        location: "San Francisco, CA",
      },
      london: {
        temperature: 15,
        condition: "Rainy",
        humidity: 78,
        windSpeed: 4.2,
        location: "London, UK",
      },
      tokyo: {
        temperature: 28,
        condition: "Sunny",
        humidity: 55,
        windSpeed: 2.1,
        location: "Tokyo, Japan",
      },
      dubai: {
        temperature: 35,
        condition: "Clear",
        humidity: 30,
        windSpeed: 1.8,
        location: "Dubai, UAE",
      },
      newyork: {
        temperature: 18,
        condition: "Cloudy",
        humidity: 70,
        windSpeed: 5.3,
        location: "New York, NY",
      },
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Get weather data for the city (case-insensitive)
    const weatherData = mockWeatherByCity[city.toLowerCase()]

    if (weatherData) {
      return NextResponse.json(weatherData)
    }

    // If city not found, return a default response
    return NextResponse.json({
      temperature: 20,
      condition: "Unknown",
      humidity: 50,
      windSpeed: 3.0,
      location: city,
    })

    // In production, you would use:
    // const apiKey = process.env.OPENWEATHER_API_KEY;
    // const response = await fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    // );
    // const data = await response.json();
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}
