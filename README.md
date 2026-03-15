# Who Wants to Be a Millionaire

A browser-based trivia game built with Next.js, inspired by the classic TV show. Answer 14 questions correctly to win $1,000,000.

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **TypeScript 5**
- **SCSS Modules** + CSS custom properties
- **Inter** (Google Fonts via `next/font`)
- **pnpm**

## Features

- 14 trivia questions with increasing difficulty
- Prize ladder sidebar with active/earned states
- Answer reveal animations with timed transitions
- Session persistence — reload the page and continue where you left off
- Fully responsive (mobile drawer + desktop sidebar)

## Gameplay

1. Press **Start** on the welcome screen
2. Select one of four answers (A, B, C, D)
3. Correct → advance to the next question after a short delay
4. Wrong → game ends, you keep the last earned prize
5. Answer all 14 correctly → win $1,000,000

## Project Structure

```
src/
├── app/                  # Next.js App Router (layout, page, error, not-found)
├── assets/icons/         # SVG icons (imported as React components)
├── components/
│   ├── AnswerButton/     # Single answer option with hexagon shape and states
│   ├── AnswerList/       # Grid of 4 answer buttons
│   ├── Button/           # Generic button
│   ├── Game/             # Main game container, orchestrates all screens
│   ├── HeroScreen/       # Welcome and game-over screen
│   ├── Loader/           # Loading spinner
│   └── PrizeLadder/      # Prize ladder sidebar
├── constants/            # Game status, answer result, storage key, letters
├── shared/
│   ├── content/game.json # Questions, answers and prize amounts
│   ├── hooks/useGame.ts  # All game state and logic
│   └── types/            # TypeScript interfaces + SVG declarations
└── styles/               # Global styles, color palette, breakpoints
```

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description              |
|-----------------|--------------------------|
| `pnpm dev`      | Start development server |
| `pnpm build`    | Production build         |
| `pnpm start`    | Run production server    |
| `pnpm lint`     | Check code with ESLint   |
| `pnpm lint:fix` | Fix ESLint issues        |
