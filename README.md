# Filmopedia

Filmopedia is a movie and television discovery app. Browse trending and popular titles, filter a catalog by genre, search for a title, and open a detail page for its overview, cast, videos, and recommendations.

## Run locally

1. Install dependencies with `npm install`.
2. Create a `.env.local` file in the project root and add your TMDB API Read Access Token:

   ```text
   VITE_APP_TMDB_TOKEN=your_tmdb_read_access_token
   ```

3. Start the development server with `npm run dev`.

The app requires a TMDB API token to load movie and television data. The token is read by Vite at build time; do not commit a real token.

## Attribution

Film and television metadata and images are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB.

## Available scripts

- `npm run dev` starts the local development server.
- `npm run build` creates a production build in `dist`.
- `npm run preview` serves the production build locally.
