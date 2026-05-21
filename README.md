# AvangardBeauty landing page

Static single-page website for AvangardBeauty, a boutique hair salon in Sofia.

## Clone

```bash
git clone <repo-url>
cd avangardbeauty-site
```

## Local preview

From the project root:

```bash
python3 -m http.server 8000
```

Open: http://127.0.0.1:8000

The current local development server may also be run on port 5173:

```bash
python3 -m http.server 5173 --bind 127.0.0.1
```

## Where to edit before launch

Search for `<!-- EDIT:` in `index.html`.

Important owner-fill fields:

- Service prices: each service card contains `<!-- EDIT price -->`
- Working hours: contact section contains `Работно време: <!-- EDIT -->`
- Years in business: trust signal contains `<!-- EDIT: confirm exact number -->`
- Form endpoint: booking form comment explains where to add Formspree/Web3Forms URL
- Social links: footer Instagram/Facebook placeholder hrefs
- Exact geo coordinates in the LocalBusiness/HairSalon JSON-LD schema
- Real salon logo/favicon if supplied
- Real salon photos replacing current editorial placeholders

## Deployment to GitHub Pages

This repo includes `.github/workflows/deploy.yml`.

1. Push the repository to GitHub.
2. In GitHub repo settings, enable Pages with **GitHub Actions** as the source.
3. Push to `main`.
4. The workflow deploys automatically.

Final URL format:

```text
https://<username>.github.io/<repo-name>/
```

## Lighthouse target

Aim for 90+ Performance, Accessibility, Best Practices, and SEO. Current implementation is static HTML/CSS/vanilla JS, with lazy-loaded below-the-fold images, semantic landmarks, visible focus states, and SEO/schema metadata.
