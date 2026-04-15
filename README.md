# WATCHNEXT

WATCHNEXT is a modern, blazing-fast web application built to solve the universal problem of "decision fatigue" when trying to find a show to watch. 

Instead of scrolling endlessly through the Netflix menu, WATCHNEXT provides a highly curated, infinite-scrolling Explore Gallery, a powerful global Search engine, and a slot-machine style **Random Show Picker** that lets fate decide your next binge.

---

## Tech Stack

This project is built using modern web development standards to ensure a fast, robust, and scalable user experience:

- **Frontend Framework**: [React 19](https://react.dev/) — For building interactive, component-based user interfaces.
- **Build Tool**: [Vite](https://vitejs.dev/) — A lightning-fast development server and production bundler.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) — A utility-first CSS framework used to rapidly build custom, responsive designs without leaving the HTML.
- **Routing**: [React Router](https://reactrouter.com/) — Enables seamless Single Page Application (SPA) navigation without reloading the browser.
- **Language**: [TypeScript](https://www.typescriptlang.org/) — Provides static typing to catch bugs early during development and ensure code quality.
- **Icons**: [Lucide React](https://lucide.dev/) — Clean, consistent SVG icons.
- **Networking**: [Axios](https://axios-http.com/) — A promise-based HTTP client for the browser.

---

## Architectural Design

WATCHNEXT is designed as a **Single Page Application (SPA)**. This means that after the initial website loads, navigating between different pages (like the Gallery and the Random Picker) happens instantly in the browser without having to download new HTML from a server.

### State Management & Caching ("Lifting State Up")
One of the architectural highlights of this project is how it handles data caching. Instead of relying on heavy third-party state management libraries (like Redux or React Query), WATCHNEXT utilizes a fundamental React concept called **"Lifting State Up."**

The core data hooks (`useShows` and `useRoulette`) are initialized at the very top of the application tree (`App.tsx`). This ensures that the fetched data survives in memory even when the user navigates between entirely different screens. 
- **Result**: You can scroll down 10 pages in the Gallery, switch to the Roulette page to spin the wheel, and switch back to the Gallery—and your exact scroll position and data are preserved instantly without a single new network request.

### API-Layer Singleton Caching
For static data that never changes (like the list of TV Show Genres), we implemented a custom singleton Promise cache directly inside the network abstraction layer (`api/tmdb.ts`). When multiple UI components request the genres list simultaneously, the API intercepts them, performs exactly **one** network request, and instantly delivers the cached result to all subscribers. 

---

## The API (TMDB)

All data, show descriptions, user ratings, and poster images are powered by the incredible community at **[The Movie Database (TMDB)](https://www.themoviedb.org/)**.

We leverage several of their highly performant endpoints:
- **Discover Endpoint** (`/discover/tv`): Used to fetch the most popular current titles. We pass custom filters `with_watch_providers=8` and `watch_region=US` to strictly enforce that these results are actually available on Netflix USA.
- **Search Endpoint** (`/search/tv`): A powerful global search mechanism. Unlike the gallery, this searches across all major streaming services worldwide.
- **Genre Endpoint** (`/genre/tv/list`): Used to map TMDB's numerical category IDs into human-readable text (e.g., transforming ID `16` into `"Animation"`).

---

## Key Features

* **Infinite Scrolling:** The Explore Gallery uses intelligent window-scroll listeners to automatically fetch and render the next page of shows seamlessly as you approach the bottom of the screen.
* **Responsive Toggle Navigation:** A sleek, mobile-first navigation bar that collapses into a "Hamburger" toggle menu on tablet and mobile devices to maximize vertical screen real estate.
* **Debounced Architecture:** The search bar features deliberate input delaying (debouncing). This allows the user to type out entire words rapidly without the app attempting to fetch data for every single letter stroke, drastically reducing server strain. 

---

## How to Run Locally

If you'd like to run WATCHNEXT on your own machine, follow these steps:

1. **Clone & Install**
   Open your terminal in the project directory and install the required dependencies:
   ```bash
   npm install
   ```

2. **Environment Variables**
   You will need to create a `.env` file in the root directory and add your own TMDB API key:
   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
