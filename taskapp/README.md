# Tasks

A simple, standalone task app. No build step, no dependencies — just open `index.html` in a browser.

## Features

- Add, complete, and delete tasks
- Filter by All / Active / Completed
- Clear all completed tasks
- Persists to `localStorage` so your list survives reloads

## Run it

Open `taskapp/index.html` directly in a browser, or serve the folder with any static server:

```sh
python3 -m http.server --directory taskapp 8000
# then visit http://localhost:8000
```

## Files

- `index.html` — markup
- `styles.css` — styling
- `app.js` — state, rendering, and event handlers (vanilla JS)
