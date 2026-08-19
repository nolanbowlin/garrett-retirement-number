# Peachtree Planning brand package

Sampled directly from the live computed styles on peachtreeplanning.com on 2026-08-19,
not eyeballed from a screenshot. Every value below is what the site actually renders.

Use this for anything built for Garrett Williamson or Peachtree Planning: landing pages,
email, decks, one pagers, ads.

---

## Colour

| Token | Hex | Where it is used |
|---|---|---|
| Brand red | `#D2232A` | The logo mark, every button, rules, accents. This is the brand. 145 separate uses on the home page. |
| Red, pressed | `#B01D23` | Not on the site. Darkened 12 percent for hover and active states. |
| Ink | `#111111` | Body copy, the wordmark, the footer background. |
| Slate | `#394249` | Full width feature bands, the one they use behind "Simplifying Wealth". |
| Charcoal | `#202122` | Secondary dark band. |
| White | `#FFFFFF` | Page background. The site is light. |
| Paper | `#F7F6F4` | Not on the site. Added because a light page with only white and red has no way to separate a card from its background. |
| Hairline | `#E4E2DF` | Not on the site. Card and input borders. |
| Muted text | `#6B6B6B` | Subheads, captions and helper text. |

**No other accent colours.** An early draft of the scorecard ran a red, copper, green
traffic light through the score. Copper and green are not in this palette and a large
orange number read as another brand entirely. If something needs to signal severity, it
gets the brand red or it gets nothing.

`#CC0000` appears twice on the site. It is a stray, almost certainly a hardcoded hex in
one embedded widget. Do not use it. `#D2232A` is the red.

**The site is light.** White page, ink text, red accents, occasional dark bands. Any
deliverable that comes back dark crimson on near black is off brand.

> Note: the existing `garrett-exit-planning` skill builds its HTML briefs in crimson
> `#B22222` on `#150606`, which does not match this. Those briefs predate this sampling.
> Worth deciding whether to migrate them to the real palette or leave them as a
> deliberately separate document style.

## Type

Both are Google Fonts and both are free to embed.

```html
<link href="https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&family=Mulish:wght@300;400;600;700;800&display=swap" rel="stylesheet">
```

- **Tinos**, serif, for headlines. The site sets it at weight 400 even at 90px, so
  headlines are large and light rather than heavy. Do not bold a display headline.
- **Mulish**, sans, for body, UI, labels and buttons. Variable weight 200 to 1000.

**Tinos is metrically compatible with Times New Roman**, which makes the email fallback
exact rather than approximate: `font-family: Tinos, 'Times New Roman', Times, serif`.
Mulish falls back to `Arial, Helvetica, sans-serif`.

## Buttons

From the live site: `#D2232A` background, `#FFFFFF` text, Mulish 700, `border-radius: 10px`,
padding `17.776px 35.552px`, no uppercase, no letter spacing.

Round that to `17px 35px`. The 10px radius matters, it is the most recognisable single
detail after the red, and square corners read as a different firm.

## Logo and image hosting

`assets/` in this folder is published by GitHub Pages from this repo,
served publicly by GitHub Pages. It is a git checkout, not a copy: commit and push and the
images are live. Verified serving 200 with correct content types on 2026-08-19.

**Base URL**

```
https://nolanbowlin.github.io/garrett-retirement-number/assets/img/
```

| File | Actual dimensions | Use |
|---|---|---|
| `peachtree-planning-logo.png` | 600 x 120 | Red mark, black wordmark. White and paper backgrounds. Render at 200 to 220px. |
| `peachtree-planning-logo-reversed.png` | 600 x 120 | Red mark, white wordmark. Slate and charcoal bands only. |
| `peachtree-mark.png` | 240 x 246 | Red mark alone. Favicons, avatars, tight headers. |
| `garrett-williamson-headshot.jpg` | 200 x 200 | Signature and bio rows. |
| `garrett-williamson-headshot-sm.jpg` | 120 x 120 | Compact signatures and footers. |

The reversed lockup was checked at the pixel level rather than taken on trust: the
wordmark region holds the same 4,941 opaque pixels as the light version, all of them
white, with the red mark unchanged at 4 percent coverage. It is a real knockout, not the
colour logo with a filter over it, so it is safe on a dark band.

`source/` holds the files as originally supplied, suffixed `-original`. Two notes on it:
the logo there is pixel identical to the published one and is kept purely for provenance,
while the headshot there is genuinely better than the published copy, which lost 22.8
percent of its pixels to a harder JPEG compression.

**Open item.** 200 x 200 is undersized for a master headshot. The newsletters render it
at 150px, so on a retina screen it is only 1.33x and reads soft. Worth asking Garrett for
the full resolution original.

**The overwrite rule.** Never replace a file that has already shipped in an email. Pages
caches hard and delivered mail cannot be repaired. To change an image, add a new filename
and point new sends at it.

Do not recolour the black wordmark to white in CSS as a shortcut. The mark would stay red
while the wordmark shifted, and the lockup would render as two different weights.

## Required compliance language

Verbatim from the site footer on 2026-08-19. This is not optional decoration, it is the
firm's registered disclosure and it belongs on anything that goes to the public.

> Peachtree Planning is an Agency of The Guardian Life Insurance Company of America
> (Guardian), New York, NY. Securities products and advisory services offered through
> Park Avenue Securities LLC (PAS), member FINRA / SIPC. OSJ: 5600 Glenridge Dr Suite 600
> East, Atlanta, GA 30342, Phone #404-260-1600. PAS is a wholly owned subsidiary of The
> Guardian Life Insurance Company of America (Guardian), New York, NY. Peachtree Planning
> is not an affiliate or subsidiary of PAS or Guardian.

Garrett's own line, from his bio page:

> Registered Representative and Financial Advisor of Park Avenue Securities LLC (PAS),
> Financial Representative of Guardian. CA Insurance License #4138564.

And where CFP(R) marks appear:

> Certified Financial Planner Board of Standards Inc. owns the certification marks CFP(R),
> CERTIFIED FINANCIAL PLANNER(TM), CFP(R) (with plaque design) and CFP(R) (with flame
> design) in the U.S.

**Every public piece carries a review number.** The site footer ends `8894350.1 Exp 5.2028`.
That is a Guardian advertising review ID with an expiry. Anything new, including the
retirement number tool and its email, has to go through the same review and will come
back with its own number and expiry date to print in the footer. Budget time for it and
start it before the creative is finished, not after.

## Contact

Garrett Williamson, CFP(R), CEPA(R)
Peachtree Planning of Tennessee
615-282-5702
Garrett.Williamson@PeachtreePlanning.com
https://www.peachtreeplanning.com/team/garrett-williamson

Offices: 101 Westpark Drive Suite 310, Brentwood, TN 37027 and 5600 Glenridge Dr Suite
600 East, Atlanta, GA 30342. Toll free 800-366-0839.

## One thing worth knowing

The "scorecard" already linked from their home page is
`livingbalancesheet.com/lbsVision/lite/PeachtreePlanning`, the stock Guardian Living
Balance Sheet tool that every agency in the network points at. It is not differentiated
and it is not Garrett's. The retirement number tool is the first thing in this stack that
is actually his, which is the argument for building it and for not making it look like a
Guardian template.
