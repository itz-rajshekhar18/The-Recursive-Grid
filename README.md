# Recursive Grid

An interactive 3x3 grid game built with React, Next.js, and Tailwind CSS featuring dynamic ripple effects and locking mechanics.

## Overview

This project demonstrates a grid-based interactive component where clicking boxes triggers cascading effects based on mathematical rules. Each cell can increment, affect its neighbors, and eventually lock when reaching a threshold.

## Features

- **3x3 Interactive Grid**: Click any unlocked cell to increment its value
- **Dynamic Styling**: Cells change color based on even/odd values
- **Ripple Effects**: Actions cascade to neighboring cells based on divisibility rules
- **Locking Mechanism**: Cells lock at value ≥15 and turn red
- **Reset Functionality**: Reset button to restart the grid

## Game Rules

### Click Interaction
- Click any unlocked cell to increment its value by 1
- Locked cells (red) cannot be clicked

### Ripple Rules

**Rule A - Divisible by 3:**
- When a cell's value becomes divisible by 3, the cell to its RIGHT decrements by 1
- Only applies if there's a right neighbor (not in the last column)
- Locked neighbors are not affected

**Rule B - Divisible by 5:**
- When a cell's value becomes divisible by 5, the cell BELOW increments by 2
- Only applies if there's a bottom neighbor (not in the last row)
- Locked neighbors are not affected

### Locking System
- Any cell reaching value ≥15 becomes locked
- Locked cells:
  - Turn red with white text
  - Cannot be clicked
  - Are immune to ripple effects from neighbors

### Visual Styling
- **Even numbers**: Gray background (#e0e0e0) with black text
- **Odd numbers**: Dark blue background (#1a237e) with white text
- **Locked cells**: Red background with white text
- All cells have rounded corners and a distinct black shadow

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **React 18** - UI library with functional components and hooks
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **No external UI libraries** - Pure React implementation

## Project Structure

```
recursive-grid/
├── app/
│   ├── page.tsx          # Main grid component
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── public/               # Static assets
└── package.json          # Dependencies
```

## Implementation Details

### State Management
- Uses React `useState` hook to manage grid state
- Each cell is an object: `{ value: number, locked: boolean }`
- Immutable state updates with deep copying

### Edge Handling
- Boundary checks prevent array access errors
- Right neighbor: `col < 2`
- Bottom neighbor: `row < 2`
- Locked status checked before any modification

## Example Gameplay

1. Click center cell (1,1) → value becomes 1
2. Click again → value becomes 2
3. Click again → value becomes 3 (divisible by 3!)
   - Right cell (1,2) decrements to -1
4. Continue clicking to trigger more ripple effects
5. Watch cells lock when they reach 15
