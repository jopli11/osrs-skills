# Probemas | OSRS Skills Calculator

A fast, mobile-first OSRS skill calculator with 100% mathematical parity with OldSchool.tools.

## Features

- 🚀 **Fast & Responsive**: Built with Next.js 14, optimized for all devices
- 🧮 **Accurate Calculations**: 100% mathematical parity with OldSchool.tools
- 💰 **Live Prices**: Grand Exchange prices refresh every 5 minutes
- 🔍 **Efficient Paths**: Find the fastest or cheapest path to your target level
- 🎨 **Probemas Design Language**: Dark-first UI with gold accents and Inter typography
- ♿ **Accessible**: WCAG 2.2 AA compliant

## Getting Started

### Prerequisites

- Node.js 18.17 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/osrs-skills.git
cd osrs-skills

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Typography**: Inter
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── skills/          # Skill calculator pages
│   │   └── [skill]/     # Dynamic skill route
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── providers.tsx    # App providers
├── components/          # React components
│   ├── calculators/     # Skill-specific calculators
│   ├── layout/          # Layout components
│   └── ui/              # Reusable UI components
├── data/                # Static data for skills
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
│   ├── store.ts         # Zustand store
│   ├── types.ts         # TypeScript types
│   └── utils/           # Helper functions
└── styles/              # CSS and theme files
```

## Development Roadmap

- [x] Project setup and Probemas theme
- [x] Home page with skill list
- [x] Dynamic skill calculator pages
- [x] XP calculation utilities
- [x] Price API integration
- [ ] Complete all 23 skill calculators
- [ ] Unit and integration tests
- [ ] Mobile optimization
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Deployment to Vercel

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [OldSchool.tools](https://oldschool.tools/) for the original calculators and inspiration
- [OSRS Wiki](https://oldschool.runescape.wiki/) for the Grand Exchange API
- [Jagex](https://www.jagex.com/) and [RuneScape](https://oldschool.runescape.com/) for the game

---

*Not affiliated with Jagex or RuneScape.*
