import { NextResponse } from "next/server"

// Mock quotes database
const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    text: "Life is what happens when you are busy making other plans.",
    author: "John Lennon",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
  },
  {
    text: "Whether you think you can, or you think you can't – you're right.",
    author: "Henry Ford",
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
  },
]

export async function GET() {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    // Get random quote
    const randomIndex = Math.floor(Math.random() * quotes.length)
    const selectedQuote = quotes[randomIndex]

    // In production, you could use an external API like quotable.io
    // const response = await fetch('https://api.quotable.io/random');
    // const data = await response.json();

    return NextResponse.json(selectedQuote)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch quote" }, { status: 500 })
  }
}
