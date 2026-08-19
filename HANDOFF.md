# Garrett Williamson, marketing stack. Handoff

Last updated 2026-08-19.

Read this first on any future session touching Garrett's marketing. It records why
things are the way they are, which is the part that does not survive in the files.

---

## Who this is for

**Garrett Williamson, CFP(R), CEPA(R)**, Peachtree Planning of Tennessee. Nashville
based, Brentwood office. Registered Rep and Financial Advisor of Park Avenue Securities,
Financial Representative of Guardian. Series 6, 63, 65, 7. Life, variable life, annuity
and health insurance licensed.

He is a referral partner of Nolan's, not a client of the brokerage. The exit planning
work overlaps: Garrett handles the owner's personal financial side of an exit, Nolan
sells the business, Devon Griger handles legal. See the `garrett-exit-planning` skill for
the client deliverable side of that relationship.

Full brand and contact detail is in `BRAND.md`.

## What we are building and why

Garrett has no lead generation asset of his own. The "scorecard" linked from the
Peachtree Planning home page is `livingbalancesheet.com/lbsVision/lite/PeachtreePlanning`,
the stock Guardian Living Balance Sheet tool that every agency in the network points at.
It is not his, it is not differentiated, and it does not build him a list.

So we are porting the mechanic that works on nolanscottteam.com, the TRADE Exit Score, to
his world. Same machine, different subject:

> Score given away free, dollar figure blurred behind an email gate.

The score is interesting but not actionable, so the visitor has already had a real payoff
and is one field away from the thing they actually came for. That asymmetry is the whole
conversion mechanic. Do not soften it by revealing the number earlier.

## Division of labour

| Piece | Owner |
|---|---|
| Front end: landing page, email templates, newsletters, brand | Nolan (this repo) |
| Make scenario, CRM wiring, email sending, fulfilment logic | **Paul** |
| Compliance review and approval | Garrett, through Guardian |

We ship the page plus a documented payload contract and stop there. Do not offer to build
or modify the Make scenario.

## State of play

| Item | State |
|---|---|
| `tool/retirement-number.html` | Built, tested end to end in browser, rebranded to real Peachtree colours. Three placeholders left, see README. |
| `templates/report/` | Template and preview both built. Light palette, real firm disclosure. Awaiting review ID. |
| `BRAND.md` | Done. Sampled from live computed styles, not eyeballed. |
| `brand/peachtree-brand-package.html` | Client facing brand package, same shape as the CCC one. Palette, type, marks, live components, email safety, inventory. |
| `source/` | Files as supplied, suffixed `-original`. |
| `reference/` | Dated capture of the live site sampling the brand was built from. |
| `templates/build-previews.js` + `preview-data.json` | Generates every preview from its template. Run after any template or data edit. |
| `templates/newsletter/` monthly | Template and preview both built. Short form, one planning topic. 15 tokens. Preview is a September 2026 send. |
| `templates/newsletter/` quarterly | Template and preview both built. Long form: feature, ninety day deadlines, market note, anonymised story, two CTAs. 28 tokens. Preview is a Q4 2026 send. |
| `assets/` | The published image repo itself, a git checkout of `nolanbowlin/peachtree-brand-assets`. Live on GitHub Pages, verified 200. |
| `templates/00-index.html` | Front door to the suite. Live thumbnails of all nine pieces. |
| `templates/correspondence/` | Five cold outreach formats for referral partners, plus `correspondence-notes.md` on sequence, partner types and the FINRA and CAN-SPAM limits. |

## Decisions already made, do not relitigate

**The brand is light, not dark.** The first version of both files was crimson `#B22222` on
near black `#150606`, taken from the `garrett-exit-planning` skill. That was wrong. The
live site is white, ink `#111111`, red `#D2232A`, Tinos serif headlines at weight 400,
Mulish body, 10px button radius. Everything public facing matches the site.

Open question worth raising with Nolan once: the `garrett-exit-planning` skill still
builds its HTML briefs in the dark crimson system. Those are private client deliverables
rather than public marketing, so it is defensible to leave them, but it should be a
decision rather than an oversight.

**The money model is deliberately conservative.** 5 percent real return rather than 7,
spending backed out of gross income through a tax and savings factor rather than treated
as gross, business sale proceeds discounted to 70 percent. A model that flatters the
projection makes the gap look smaller, which defeats the purpose of the tool. Full
reasoning is in `README.md` and in the comments at the top of the script.

**Images must not be hosted on a domain we do not control.** Same rule as the CCC
newsletter. Email that has already been delivered cannot be repaired when a host goes
away.

## Asset hosting, resolved

Live at `nolanbowlin/peachtree-brand-assets`, served by GitHub Pages. The checkout is
`assets/` in this folder, matching the CCC layout: that folder IS the repo, so a commit
and push puts images live.

```
https://nolanbowlin.github.io/garrett-retirement-number/assets/img/
```

All five assets verified serving HTTP 200 with correct content types on 2026-08-19. The
reversed lockup was verified at the pixel level, not taken on trust, and is a genuine
knockout.

One note for whoever touches this next: **do not switch these URLs to
`raw.githubusercontent.com`.** Raw serves with short cache headers, can rate limit, and
is handled inconsistently once Gmail proxies it. Pages is the right surface. If the
volume ever justifies it, the upgrade path is a Netlify deploy off the same repo onto a
custom domain, which is the CCC pattern, not a move back to raw.

**The overwrite rule applies here exactly as it does to the CCC images.** Pages caches
hard and delivered mail cannot be repaired. Changing an image means a new filename, never
an overwrite.

Still open, and it is a business question rather than a technical one: the repo sits under
Nolan's GitHub account. Decide whether Garrett eventually gets the keys or Nolan hosts it
as a service. It matters the day the relationship changes.


## Two versions of every document

Every email exists twice, and the second one is generated rather than written:

| Suffix | Who it is for | What it is |
|---|---|---|
| `-template.html` | Paul | Merge tokens intact. This is what the send platform gets. |
| `-preview.html` | Garrett and the client | Every token filled with sample data, so the layout, tone and length can be judged. |

The previews are **build artefacts**. Edit the template or `preview-data.json` and run:

```
node build-previews.js
```

Anything typed directly into a preview is gone on the next build.

The reason they are generated rather than maintained as two hand written copies:
the moment the same document exists twice and is edited in two places it drifts, and
the copy that drifts is always the one nobody opened recently. Garrett approves the
preview and Paul builds against the template, so a divergence between them is a
divergence between what the client signed off and what actually gets sent. The build
fails loudly on any unfilled token rather than shipping a preview with visible
handlebars, because a preview with a token showing reads as a bug to a client.

Every preview carries a yellow PREVIEW, NOT APPROVED FOR SENDING banner at the top so
a file forwarded on its own is never mistaken for approved creative. Take it out
consciously when the time comes, not by accident.

The figures in the report preview are not invented. They are the real output of the
model in `retirement-number.html` for the persona described in `preview-data.json`, so
the preview reconciles if anyone checks the arithmetic. Keep it that way.

## Compliance is the long pole

This is a FINRA and Guardian regulated advisor. Nothing public facing ships without
review, and review is slow. Start it before the creative is finished, not after.

- The firm disclosure block is verbatim in `BRAND.md` and already wired into the landing
  page. It is required, not decorative.
- Every approved public piece carries a review ID and expiry, printed in the footer in
  the format their own site uses: `8894350.1 Exp 5.2028`. The tool, the email and each
  newsletter will each get their own. There is a placeholder waiting for it.
- The methodology language on the results screen is ours and is the part most likely to
  come back with edits. Expect to lose some of the plain speaking.
- Anything that reads as a projection of investment performance, a guarantee, or
  personalised advice will not clear. The tool is careful about this already: it says
  directional estimate, it names its assumptions, and it never recommends a product.

## Next actions

1. Write the first month of newsletter copy and the first quarterly. The templates are
   built, what they need now is content, and the content is what compliance actually
   reviews.
2. Get the whole batch into Guardian advertising review at once: the landing page, the
   report email, and both newsletter templates. Every one comes back with its own review
   ID and expiry to print in the footer. There is a `{{review_id}}` token waiting in each.
3. Fill the three placeholders in the landing page: webhook, Calendly slug, pixel.
4. Hand Paul the payload contract in `README.md` so he can build the Make side.

## Related

- `BRAND.md`, this folder. Palette, type, logo rules, required disclosures.
- `README.md`, this folder. The tool itself, the money model, the payload contract.
- `ccc-newsletter-builder` skill. The newsletter pattern to copy.
- `garrett-exit-planning` skill. The client deliverable side of the relationship.
