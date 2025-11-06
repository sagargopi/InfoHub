import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// Geist fonts are now imported directly from the geist package

export const metadata: Metadata = {
  title: "InfoHub - Your All-in-One Utility Companion",
  description: "Weather, currency conversion, and motivational quotes all in one place",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
