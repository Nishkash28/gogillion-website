# GoGillion Technologies website

The production source for the static, public website at `https://gogillion.com`.
It is built with React, TypeScript, Vite, GSAP and plain CSS. It has no backend,
database, authentication, payments or secret environment variables.

> **Public repository warning:** Never commit passwords, credentials, private
> documents, internal screenshots, API keys or other secrets.

## Get started

You need a current Node.js release and npm.

```bash
npm install
npm run dev
```

Vite prints the local address to open in your browser.

## Build and preview

```bash
npm run build
npm run preview
```

The production files are created in `dist/`. You can also run `npm run
typecheck` and `npm run lint` independently.

## Edit content

- Company details, mission, vision, philosophy and contact links live in
  `src/data/company.ts`.
- The current applications, their launch order, descriptions, availability and
  links live in `src/data/apps.ts`.
- Add a store or product CTA by placing a complete `https://` URL in the
  appropriate app field. Empty links are never rendered.
- Public logos are in `public/assets/brand/` and `public/assets/apps/`. Update
  the matching data path after replacing a logo.

## Animation architecture

Animation setup is isolated in `src/animations/`. The hero and product story
use a scoped GSAP context and ScrollTrigger timeline. Desktop, tablet and mobile
all preserve the same spatial narrative: one visual device moves through the
current applications, with compact geometry and pacing on narrow or short
viewports.

People who prefer reduced motion receive static compositions with all content
and links intact. Pointer tilt is limited to precise hover devices and is
disabled on touch devices and when reduced motion is requested.

## Deploy with GitHub Pages

The production site is deployed from the `main` branch by
`.github/workflows/deploy-pages.yml`. GitHub Actions installs the locked npm
dependencies, builds the Vite site into `dist/`, uploads that directory as the
GitHub Pages artifact and deploys it to the `github-pages` environment.

No deployment password, API key or repository secret is required. GitHub uses
its automatically generated, short-lived `GITHUB_TOKEN` with only the
permissions needed by the workflow. The final production target is
`https://gogillion.com`. The workflow passes GitHub's resolved Pages base path
to Vite so both the temporary project URL and the final root-domain URL load
the same build correctly. Local and custom-domain builds default to `/`.

### Initial GitHub setup

GitHub Pages must be enabled for the repository before the workflow can
configure or deploy the site. The workflow deliberately does not try to enable
Pages itself because that would require an additional administrator credential.

1. Review the pending files and make sure every file being published is safe
   for a public repository.
2. Commit the website, lockfile and deployment workflow, then push the commit
   to the `main` branch.
3. On GitHub, open the repository and go to **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions** as the source. This
   creates/enables the repository's Pages site.
5. Open the repository's **Actions** tab and select **Deploy website to GitHub
   Pages**. If the push-triggered run started before Pages was enabled, use
   **Re-run all jobs** (or **Run workflow**) after completing step 4.
6. Verify that both the build and deploy jobs finish successfully.
7. Open the temporary GitHub Pages URL shown by the deployment and check the
   site before changing any DNS record.

Every push to `main` starts a deployment automatically. The workflow can also
be started manually from its page in the **Actions** tab by choosing **Run
workflow**.

### Configure `gogillion.com`

The domain remains registered at Hostinger, and Hostinger remains the
authoritative DNS provider. Do not change the domain's nameservers.

1. In GitHub, go to **Repository → Settings → Pages**.
2. Enter `gogillion.com` under **Custom domain** and save it before editing DNS.
   A repository `CNAME` file is intentionally not used by this project.
3. Read GitHub's current
   [custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
   and confirm the current DNS values immediately before making changes.
4. In Hostinger's DNS editor, change only the website-routing records for the
   root host (`@`) and `www` to the values currently specified by GitHub.
5. Do not change, delete or replace any Google Workspace records. In
   particular, leave mail-related MX, SPF, DKIM, DMARC and verification records
   untouched.
6. Allow DNS to propagate, then return to **Settings → Pages** and wait for
   GitHub to confirm the custom domain and provision its TLS certificate.
7. Enable **Enforce HTTPS** only after the certificate is available.

DNS changes are a one-time setup task. They must not be repeated for ordinary
website updates.

### Future updates

The normal publishing flow after initial setup is:

```text
Codex or local edit → commit → push to main → GitHub Actions → automatic deployment
```

Content, styling and animation updates do not require any new DNS work. Check
the Actions run after each push; if the workflow succeeds, GitHub Pages serves
the new production build automatically.
