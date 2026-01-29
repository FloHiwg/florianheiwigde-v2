# florianheiwig.de

Personal site and blog built with [Hugo](https://gohugo.io/) and the [hugo-book](https://github.com/alex-shpak/hugo-book) theme, deployed to Firebase Hosting.

## Prerequisites

- **Hugo (Extended)** 0.128.0 or later — [Install Hugo](https://gohugo.io/installation/)
- **Go** 1.21+ (required for Hugo modules) — [Install Go](https://go.dev/doc/install)

## Run locally

1. **Clone the repo** (if you haven’t already):
   ```bash
   git clone <repo-url>
   cd florianheiwigde-v2
   ```

2. **Fetch the theme** (Hugo module; run once, or when `go.mod`/deps change):
   ```bash
   hugo mod get
   ```
   Commit the updated `go.mod` and `go.sum` if they change.

3. **Start the dev server** (blog at `http://localhost:1313/`):
   ```bash
   hugo server
   ```

4. **Optional — build like production** (output in `public/blog` with production base URL):
   ```bash
   hugo --minify -d public/blog --baseURL "https://florianheiwig.de/blog/"
   ```

## CI/CD

On **push to `master`**, GitHub Actions:

1. Checks out the repo  
2. Sets up Go and Hugo  
3. Fetches Hugo modules  
4. Builds the site into `public/blog`  
5. Deploys to Firebase Hosting (live channel)

Required secrets:

- `FIREBASE_SERVICE_ACCOUNT_FLORIANHEIWIGDE` — Firebase service account JSON for deployment
