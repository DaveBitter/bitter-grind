# Bitter Grind ☕

A sleek, modern web application to help amateur baristas perfect their pourover coffees and espressos with interactive ratio calculators, step-by-step brewing guides, and comprehensive technique libraries.

## Features

### 🧮 Ratio Calculator
- Interactive sliders to dial in your perfect coffee-to-water ratio
- Real-time visualization with pie charts and pour structure timelines
- Support for multiple brewing methods and techniques
- Standardized output to ~300-350ml (one standard coffee cup)

### 📖 Brewing Guides
- Step-by-step instructions with interactive timers
- Visual indicators for current brewing step
- Automatic scaling based on your custom ratio
- Support for 11+ brewing methods:
  - V60 (James Hoffmann, Scott Rao)
  - Chemex
  - AeroPress
  - Espresso
  - French Press
  - Kalita Wave
  - Cold Brew
  - Moka Pot
  - Clever Dripper
  - Siphon

### 📚 Technique Library
- Comprehensive history and explanations for each technique
- Author information and brewing parameters
- Expandable details with "read more" functionality
- Organized by brewing method

### 📊 Data Visualization
- Ratio comparison charts across different techniques
- Pour structure visualization showing water accumulation over time
- Interactive charts with smooth, natural pour curves

### ⭐ Favorites System
- Save your preferred brewing methods
- Favorites appear first in all lists
- Persistent storage using localStorage

### 🎨 Modern UI/UX
- Light and dark mode support
- Responsive design with mobile-first approach
- Native app-like experience on mobile devices
- Bottom navigation bar for mobile
- Sleek blur effects and modern animations
- Orange and reddish color scheme

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) 16.0.3 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: [Radix UI](https://www.radix-ui.com/) Primitives
- **Charts**: [Recharts](https://recharts.org/)
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js (stable version)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bitter-grind
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles and Tailwind config
├── components/             # React components
│   ├── RatioCalculator.tsx # Interactive ratio calculator
│   ├── BrewingGuide.tsx   # Step-by-step brewing guide
│   ├── TechniqueLibrary.tsx # Technique library with accordion
│   ├── Timer.tsx           # Reusable timer component
│   ├── BottomNav.tsx       # Mobile bottom navigation
│   ├── mode-toggle.tsx     # Theme switcher
│   ├── charts/             # Chart components
│   │   ├── RatioChart.tsx
│   │   ├── TimelineChart.tsx
│   │   └── TimingChart.tsx
│   └── ui/                 # Radix UI component wrappers
├── hooks/                  # Custom React hooks
│   └── useFavorites.ts     # Favorites management hook
└── lib/                    # Utility functions and data
    ├── brewing-data.ts     # Brewing methods and techniques data
    ├── brewing-utils.ts    # Brewing-related utilities
    └── utils.ts            # General utilities (cn helper)
```

## Usage

### Ratio Calculator
1. Select a brewing method from the tabs
2. Choose a technique (if multiple available)
3. Adjust coffee amount and ratio using the sliders
4. View the calculated water amount and visualizations
5. Click "Start Brewing Guide" to use these settings in the guide

### Brewing Guide
1. Navigate to the "Guide" tab
2. Select your brewing method and technique
3. Click "Start" to begin the interactive timer
4. Follow the step-by-step instructions
5. The timer automatically progresses through each step

### Technique Library
1. Navigate to the "Library" tab
2. Browse brewing methods and techniques
3. Click "Read more" to expand detailed history and explanations
4. Use the star icon to favorite methods

### Data Visualization
1. Navigate to the "Data" tab
2. View ratio comparisons across techniques
3. Explore pour structure visualizations
4. Switch between different brewing methods

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Features in Detail

### Responsive Design
- Desktop: Horizontal tab navigation
- Mobile: Bottom sticky navigation bar with icons
- Safe area insets for iOS devices
- Touch-optimized interactions

### Theme System
- Manual light/dark mode toggle
- System preference detection disabled
- Smooth theme transitions
- CSS variables for consistent theming

### Data Persistence
- Favorites stored in localStorage
- Persists across browser sessions
- No backend required

## License

This project is private and proprietary.

## Acknowledgments

- Brewing techniques inspired by James Hoffmann, Scott Rao, and other coffee experts
- UI components built with Radix UI Primitives
- Charts powered by Recharts

---

Made with ☕ and ❤️ for coffee enthusiasts
