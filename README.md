# Filmopedia

**Discover your next favorite film or TV show.**

Filmopedia is a responsive discovery app for browsing movies and television. Explore what is trending, search for titles, filter by genre, and view details including cast, videos, and recommendations.

## Features

- Browse trending, popular, and top-rated movies and TV shows.
- Search for films and series, and explore dedicated detail pages.
- Sort discovery results and filter by multiple genres.
- View title overviews, cast, trailers, and recommendations.
- Use responsive navigation, light and dark themes, and loading skeletons.

## Built with

- React 18
- TypeScript
- Vite
- React Router
- The Movie Database (TMDB) API

## Getting started

### Prerequisites

- Node.js 18 or later
- npm
- A TMDB API Read Access Token

### Install and run

1. Install the project dependencies:

   ```sh
   npm install
   ```

2. Create a `.env.local` file in the project root and add your TMDB token:

   ```env
   VITE_APP_TMDB_TOKEN=your_tmdb_read_access_token
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

Vite prints the local URL when the server starts. The token is used by the browser app, so it is included in client-side requests; do not use it as a confidential server-side secret, and do not commit `.env.local`.

## Project scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run typecheck` | Check TypeScript types without emitting files. |
| `npm run lint` | Run ESLint across the project. |
| `npm run build` | Type-check and create the production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |

## Project structure

```text
src/
├── api/          TMDB API client
├── components/   Reusable UI grouped by feature
├── hooks/        Data-fetching hooks
├── pages/        Route-level pages
├── types/        Shared TypeScript models
└── utils/        Shared helpers
```

## Data attribution

Film and television metadata and images are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB.

## Connect

[LinkedIn](https://www.linkedin.com/in/arunkumar198857)
