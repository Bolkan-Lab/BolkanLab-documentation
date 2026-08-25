# **BolkanLab Documentation**

Documentation for building virtual reality rigs & all software related tools at BolkanLab, Princeton Neuroscience Institute.

---

## **Table of Contents**
1. [Getting Started](#getting-started)
2. [Directory Structure](#directory-structure)
3. [Making Changes to the Documentation](#making-changes-to-the-documentation)
   - [a) Modifying Existing Documentation](#a-modifying-existing-documentation)
   - [b) Adding a New Page](#b-adding-a-new-page)
   - [c) Adding Images and Downloadable Files](#c-adding-images-and-downloadable-files)
4. [Deployment](#deployment)
5. [Setup Checklist](#setup-checklist)
6. [First-time Deploy](#first-time-deploy)

---

## **Getting Started**

There are two ways to run the site locally. Docker is recommended — it needs no local Node.js install.

### Option A — Docker (recommended)

**Prerequisites:** [Docker](https://www.docker.com/) installed.

1. Build the container:
   ```bash
   docker-compose build
   ```

2. Start the development environment:
   ```bash
   docker-compose up
   ```

3. Navigate to [http://localhost:8080](http://localhost:8080) to view the site locally.

4. Edit the documentation files and watch them update live.

### Option B — Node.js directly

**Prerequisites:** Node.js 22 and Yarn.

```bash
yarn install
yarn dev      # dev server on http://localhost:8080
yarn build    # production build into .vuepress/dist
```

---

## **Directory Structure**

```
.vuepress/
  config.ts               # VuePress configuration: title, navbar, sidebars
  enhanceApp.js           # Client-side app hooks
  public/                 # Static assets served from the site root
    images/               # Logo and other site-wide images
  styles/
    palette.styl          # Brand colors
    index.styl            # Custom CSS
building/                 # Documentation for building VR rigs
  index.md                # Section landing page
  assets/images/          # Images for this section
maintenance/              # Documentation for maintenance
software/                 # Software documentation
index.md                  # Home page (hero, tagline, feature cards)
.github/workflows/        # GitHub Actions deployment
```

Each top-level section folder maps to a navbar entry and gets its own sidebar.

---

## **Making Changes to the Documentation**

### a) Modifying Existing Documentation
1. Open the desired `.md` file in the respective directory (e.g. `building/example-module.md`).
2. Make your changes and save. With the dev server up, the change appears immediately.

### b) Adding a New Page
1. Create a new `.md` file in the appropriate directory (e.g. `software/new-feature.md`).
2. Add it to the matching sidebar function in `.vuepress/config.ts` — `getBuildingSidebar()`, `getMaintenanceSidebar()` or `getSoftwareSidebar()`. Paths there are absolute from the repo root and **must include the `.md` extension**.
3. Give the page frontmatter:
   ```markdown
   ---
   title: New feature
   lang: en-US
   ---

   # {{ $frontmatter.title }}
   ```
4. Test locally as described above.

Each section contains an **example page** (`example-module.md` / `example-tool.md`) demonstrating every convention used on this site — figures with captions, tip/warning/danger callouts, tables, code blocks, and download links. Copy it as the starting point for a new page.

### c) Adding Images and Downloadable Files

- **Images for a page** go in that section's `assets/images/` folder and are referenced relatively:
  ```html
  <figure>
    <img src='./assets/images/my-module/photo.png'>
    <center><figcaption><small>Caption</small></figcaption></center>
  </figure>
  ```
- **Files that should download** (CAD, GERBER, STEP, PDF) go in `.vuepress/public/` and are linked from the site root. The published site lives in a subdirectory, so wrap the path in `$withBase` — a hardcoded leading slash works locally but 404s once deployed:
  ```html
  <a :href="$withBase('/building/drawings/my-rig.step.zip')" download>Download</a>
  ```
  The `file-loader` rule in `.vuepress/config.ts` covers `.pdf`, `.zip`, `.ait`, `.log`, `.txt` and `.stp`. Add other extensions to that rule's `test` regex if needed.

---

## **Deployment**

The site is published to **GitHub Pages** by `.github/workflows/deploy.yml`.

```bash
git add .
git commit -m "Update documentation"
git push
```

Pushing to `master` (or `main`) builds the site and deploys `.vuepress/dist` straight to Pages using the built-in `GITHUB_TOKEN` — there is no `gh-pages` branch and no personal access token to manage. Progress is visible under the repository's **Actions** tab, and the live URL is shown on the **github-pages** environment. A first deploy usually takes a couple of minutes.

Pull requests run the same build as a check but never publish, so a broken build is caught before it reaches the site.

### Where the site lives

GitHub serves a project site from a subdirectory named after the repository, so `base` in `.vuepress/config.ts` is set to `/BolkanLab-documentation/` and the site is available at:

```
https://<owner>.github.io/BolkanLab-documentation/
```

If the site later moves to a `<owner>.github.io` repository or a custom domain, the path prefix disappears — set the `VUEPRESS_BASE` environment variable to `/` in the workflow's build step rather than editing `config.ts`.

---

## **Setup Checklist**

This repository was scaffolded from the BRAIN CoGS mini VR rigs documentation. Before the first deploy:

- [ ] **Create the GitHub repository** and push this code (see *First-time deploy* below).
- [ ] **Enable Pages** — *Settings → Pages → Build and deployment → Source: **GitHub Actions***. Without this the deploy job fails.
- [ ] **Repository name** — if the repository is not named `BolkanLab-documentation`, update `base` in `.vuepress/config.ts` to match, or the deployed CSS, JS and images will 404.
- [ ] **Logo** — replace `.vuepress/public/images/bolkanlab-logo.svg` with the real Bolkan Lab logo and update `heroImage` in `index.md` to match the new filename.
- [ ] **Author** — update the `authors` field in `package.json`.
- [ ] **Contact** — add a contact email to `building/index.md`.
- [ ] **Accent color** — `.vuepress/styles/palette.styl` uses a darkened gold so link text meets contrast requirements; switch it to the pure brand yellow `#fcd34d` if preferred (see the comment in that file).
- [ ] **Example pages** — delete `example-module.md` / `example-tool.md` once real pages exist, and remove them from the sidebars.

---

## **First-time deploy**

1. Create an empty repository on GitHub named **`BolkanLab-documentation`** — no README, no `.gitignore`, no license, so the first push is not rejected.

2. Point this checkout at it and push:
   ```bash
   git remote add origin https://github.com/<owner>/BolkanLab-documentation.git
   git push -u origin master
   ```

3. In the new repository, go to **Settings → Pages** and set *Build and deployment → Source* to **GitHub Actions**.

4. Open the **Actions** tab. The push already started a *Deploy documentation site* run; if it failed because Pages was not enabled yet, re-run it from that page.

5. When the run finishes, the site is live at `https://<owner>.github.io/BolkanLab-documentation/`. The URL is also linked from the **github-pages** entry under the repository's *Environments*.

Every later push to `master` redeploys automatically.
