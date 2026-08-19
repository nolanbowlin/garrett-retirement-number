# Peachtree Planning Brand Assets

Image host for Garrett Williamson and Peachtree Planning email. Every logo and
headshot referenced by an email lives here and is served over HTTPS by GitHub Pages.

**Base URL**

```
https://nolanbowlin.github.io/garrett-retirement-number/assets/img/
```

Reference an asset by filename appended to that base, for example
`https://nolanbowlin.github.io/garrett-retirement-number/assets/img/peachtree-planning-logo.png`.

## Why a repo and not an attachment

Email clients do not render local files, and a base64 embedded logo inflates every
send and gets stripped by some clients. Every image in an HTML email has to be a
public URL that stays reachable for as long as the mail sits in someone's inbox,
which is indefinitely. Hosting them here means Garrett's email never depends on a
Drive share link or a marketing platform that changes its CDN.

## Contents

| File | Size | Use |
|---|---|---|
| `peachtree-planning-logo.png` | 600x120, transparent | Full lockup for white or light backgrounds. Render at 220px in email. |
| `peachtree-planning-logo-reversed.png` | 600x120, transparent | White wordmark, red mark held. For the slate `#394249` and charcoal `#202122` bands. |
| `peachtree-mark.png` | 240 square | Red mark only. Favicons, avatars, tight headers. |
| `garrett-williamson-headshot.jpg` | 200 square | Signature block and bio rows. |
| `garrett-williamson-headshot-sm.jpg` | 120 square | Compact signature and footers. |

## Brand

Full palette, type and usage rules are in `BRAND.md` one directory up. The short
version:

- Brand red `#D2232A`. Ink `#111111`. Slate `#394249`. White page.
- The site is **light**. A deliverable that comes back dark crimson on near black
  is off brand.
- Tinos for headlines, Mulish for body. Tinos is metrically compatible with Times
  New Roman, so the email fallback is exact rather than approximate.

## Rules

- **Never overwrite a file that has already shipped in an email.** GitHub Pages caches
  aggressively and mail already delivered cannot be repaired. To change an image, add
  a new filename and point new sends at it.
- **Only web-ready derivatives belong here.** Originals stay in the client folder.
- The reversed logo is not the colour logo with a filter over it. The ink is knocked
  out to white while the red mark holds, which is what keeps the lockup readable on a
  dark band.
