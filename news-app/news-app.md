## News App — Overview

This is a small React app (built with Vite) that searches and shows news articles. It fetches data from a public news API and displays results as cards.

### Goals
- Show a list of news articles for a search term
- Let users change the search term
- Handle loading and errors in a simple way

## App Structure
- `index.html`: App entry page that mounts the React app at `#root`.
- `src/main.jsx`: Boots the React app and renders `App` inside `StrictMode`.
- `src/App.jsx`: Main screen. Handles search state, fetching, loading, error, and rendering articles.
- `src/components/ArticleCard.jsx`: Shows one article (image, title, source, date, description, link).
- `src/utils/format.js`: Small helpers (e.g., `truncate`).
- `src/index.css`, `src/App.css`: Styles.

## Data Flow (simple)
1. `App` keeps state for `articles`, `query`, `loading`, and `error`.
2. When the app loads (and when you search), `App` fetches articles from the news API using the current `query`.
3. Response data updates `articles`. Errors set `error`. A spinner/message uses `loading`.
4. The list is filtered by the search term and rendered as `ArticleCard` items.

## Key Components and Functions

### `App` (in `src/App.jsx`)
- State:
  - `articles: Article[]` — list of fetched articles
  - `query: string` — current search input (default: "technology")
  - `loading: boolean` — true while fetching
  - `error: string | null` — error message if fetch fails
- Functions:
  - `fetchArticles(q?: string)` — Fetches articles for a query. Sets `loading`, clears `error`, fetches, then updates `articles` or `error` and finally clears `loading`.
  - `handleSubmit(event)` — Prevents form submit default and calls `fetchArticles(query)`.
- Render logic:
  - Header with a search form (input + button)
  - Error message when `error` exists
  - Loading message when `loading` is true
  - Grid of `ArticleCard` when there are results, otherwise a "no results" message

### `ArticleCard` (in `src/components/ArticleCard.jsx`)
- Props:
  - `article` — expects fields like `title`, `description`, `url`, `urlToImage`, `source`, `publishedAt`
- Output:
  - Image (or a placeholder)
  - Title
  - Source name and formatted date
  - Truncated description
  - Link to read more (opens in a new tab)

### `truncate` (in `src/utils/format.js`)
```javascript
export const truncate = (text = "", length = 100) => {
  return text.length > length ? `${text.slice(0, length)}...` : text;
};
```
Use this to limit long descriptions in the UI.

## Networking
- Fetch call is made from the browser to a public news API endpoint.
- The request includes a query string (search term) and pagination size.

## Configuration (no secrets here)
- The app expects a base URL and an API key to call the news API.
- Do not commit secrets. Keep keys out of the repo (e.g., use environment files ignored by Git or a server-side proxy).
- Important: Any key placed in client code (or `import.meta.env.VITE_*`) is visible to users in the browser. For true secrecy, call the API from a backend you control.

## Error and Loading Handling
- `loading` shows a friendly message while fetching.
- `error` shows a short error message if the request fails.

## Styling
- Core layout and card styles live in `src/index.css` and `src/App.css`.

## How to Run (local)
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open the shown local URL in your browser

## Notes
- This file is safe to commit. It contains no secrets or private values.

