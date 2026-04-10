# Tasks

A simple, standalone task app. No build step, no dependencies — just open `index.html` in a browser.

## Features

- Add, complete, and delete tasks
- Filter by All / Active / Completed
- Clear all completed tasks
- Persists to `localStorage` so your list survives reloads

## Run it locally

Open `taskapp/index.html` directly in a browser, or serve the folder with any static server:

```sh
python3 -m http.server --directory taskapp 8000
# then visit http://localhost:8000
```

## Deploy

No build step — just static files. Three easy options:

### Netlify Drop (fastest, zero setup)

Go to <https://app.netlify.com/drop> and drag the `taskapp/` folder onto the page. You'll get a live URL instantly.

### Netlify (from this repo)

1. In Netlify, click **Add new site → Import an existing project** and pick this repo.
2. Set **Base directory** to `taskapp`.
3. Leave **Build command** empty and **Publish directory** as `.` (or just `taskapp`).
4. Deploy. `netlify.toml` in this folder already sets these defaults.

### Vercel (from this repo)

1. In Vercel, click **Add New → Project** and import this repo.
2. Set **Root Directory** to `taskapp`.
3. Framework preset: **Other**. No build command needed.
4. Deploy. `vercel.json` in this folder already sets these defaults.

## Files

- `index.html` — markup
- `styles.css` — styling
- `app.js` — state, rendering, and event handlers (vanilla JS)
- `netlify.toml` — Netlify config (no build, publish current dir)
- `vercel.json` — Vercel config (no build, serve current dir)
