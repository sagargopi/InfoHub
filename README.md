# InfoHub

A modern, full-stack web application that brings together three essential utilities in one place: real-time weather information, currency conversion, and inspirational quotes.

## 🌟 Features

- **Weather Module**: Get current weather information for any location
- **Currency Converter**: Convert between INR, USD, and EUR with real-time exchange rates
- **Quote Generator**: Discover motivational quotes to brighten your day
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode**: Built-in dark theme support

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **API**: Next.js API Routes
- **Deployment**: Vercel (recommended)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/infohub.git
   cd infohub
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory and add your API keys:
   ```env
   OPENWEATHER_API_KEY=your_openweather_api_key
   EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

## 🌐 API Endpoints

- `GET /api/weather?location=CityName` - Get weather data
- `GET /api/currency?amount=100&from=INR&to=USD` - Convert currency
- `GET /api/quote` - Get a random motivational quote

## 🎨 Project Structure

```
InfoHub/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   │   ├── currency/
│   │   ├── quote/
│   │   └── weather/
│   ├── components/       # Reusable UI components
│   └── page.tsx          # Main page component
├── public/               # Static files
└── styles/               # Global styles
```

## 📝 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
OPENWEATHER_API_KEY=your_openweather_api_key
EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key
```

## 🚀 Deployment

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel project settings
4. Deploy!
