# Redirector

A tiny cloudflare worker that converts youtube urls into redirect targets for the **missing-subtitles** project.

It extracts the video shortcode from any youtube link and redirects users to either the github tree view or the raw `.vtt` subtitle file, depending on which worker deployment is hit.

Currently supports `(www.)youtube.com` and `youtu.be` links.

## Overview

```plaintext
https://missub.cc/<youtube_url>     → github tree view for the subtitle folder
https://raw.missub.cc/<youtube_url> → raw .vtt subtitle file
```

Both deployments share one codebase, differing only by an environment variable (`MODE`) defined in their respective `wrangler.toml` files.

## Example

Input:

```plaintext
https://raw.missub.cc/https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

Redirects to:

```plaintext
https://raw.githubusercontent.com/missing-subtitles/missing-subtitles/refs/heads/master/dQw4w9WgXcQ/dQw4w9WgXcQ.vtt
```

## Directory Structure

```bash
missing-subtitles-worker/
├── src/
│   └── index.js         # main worker logic (es module)
├── config.js            # environment-specific redirect targets
├── wrangler.toml        # main domain deployment
├── wrangler.raw.toml    # raw subdomain deployment
└── package.json
```

## Deployment

### Prerequisites

* node.js + npm
* cloudflare wrangler (`npm install -g wrangler`)
* a cloudflare account + worker domain

### Build & Deploy

```bash
# deploy main domain (github tree view)
wrangler deploy --config wrangler.toml

# deploy raw domain (.vtt redirect)
wrangler deploy --config wrangler.raw.toml
```

or

```bash
npm run deploy:main
npm run deploy:raw
```

## Configuration

Each `wrangler.toml` defines an environment variable:

```toml
[vars]
MODE = "main"   # or "raw"
```

`index.js` reads this via `env.MODE` to determine which redirect base to use.

## Notes

* Schemeless inputs (`youtube.com/watch?v=…`) are auto-prefixed with `https://`
* Invalid or unrecognized urls return `400 Invalid YouTube URL`
* Unexpected runtime errors return `500 Internal Server Error`

---

## License

AGPLv3
