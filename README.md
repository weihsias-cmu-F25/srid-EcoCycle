# EcoCycle

A responsive electronics repair landing page with an email-triggered phone repair animation and an embedded YouTube video.

## Publish with GitHub Pages

1. Create a public GitHub repository named `ecocycle`.
2. Upload the contents of this folder to the repository's top level, so `index.html` is at the root. Keep the `assets` folder intact.
3. Commit the files to `main`.
4. Open **Settings → Pages**. Choose **Deploy from a branch**, branch **main**, folder **/(root)**, then **Save**.
5. Once deployment finishes, use the **Visit site** link in those settings.

See [GitHub's publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Local preview

From this folder, run:

```sh
python3 -m http.server 3000
```

Open http://localhost:3000. No build or dependency installation is required. The YouTube embed requires internet access.

## Files

- `index.html`: content, phone illustration, form, and video embed.
- `styles.css`: responsive styles and repair animation.
- `app.js`: email validation and animation handler.
- `assets/favicon.svg`: site icon.

The email interaction is frontend-only. It does not send, log, or store addresses. It does not subscribe visitors to a mailing list. Reduced-motion preferences are supported.
