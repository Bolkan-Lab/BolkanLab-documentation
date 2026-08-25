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
- **Files that should download** (CAD, GERBER, STEP, PDF) go in `.vuepress/public/` and are linked from the site root:
  ```html
  <a href='/building/drawings/my-rig.step.zip' download>Download</a>
  ```
  The `file-loader` rule in `.vuepress/config.ts` covers `.pdf`, `.zip`, `.ait`, `.log`, `.txt` and `.stp`. Add other extensions to that rule's `test` regex if needed.

---

## **Deployment**

Pushing to `master` triggers `.github/workflows/vuepress-deploy.yml`, which builds the site and pushes `.vuepress/dist` to a `gh-pages` branch.

```bash
git add .
git commit -m "Update documentation"
git push
```

---

## **Setup Checklist**

This repository was scaffolded from the BRAIN CoGS mini VR rigs documentation. Before the first deploy:

- [ ] **Logo** — replace `.vuepress/public/images/bolkanlab-logo.svg` with the real Bolkan Lab logo and update `heroImage` in `index.md` to match the new filename.
- [ ] **Deploy target** — in `.github/workflows/vuepress-deploy.yml`, set `repo:` to the repository that serves the site, or delete that line to publish to this repo's own `gh-pages` branch.
- [ ] **Deploy secret** — add an `ACCESS_TOKEN` repository secret (a personal access token with `repo` scope on the target repository) under *Settings → Secrets and variables → Actions*.
- [ ] **Author** — update the `authors` field in `package.json`.
- [ ] **Contact** — add a contact email to `building/index.md`.
- [ ] **Accent color** — `.vuepress/styles/palette.styl` uses a darkened gold so link text meets contrast requirements; switch it to the pure brand yellow `#fcd34d` if preferred (see the comment in that file).
- [ ] **Example pages** — delete `example-module.md` / `example-tool.md` once real pages exist, and remove them from the sidebars.
