# The Retirement Number

Marketing stack for Garrett Williamson, CFP(R), CEPA(R), Peachtree Planning of Tennessee.

## Folder map

```
BRAND.md          Palette, type, logo rules, required disclosures.
README.md         This file. The tool, the money model, the payload contract.
HANDOFF.md        Why things are the way they are. Read first on a new session.

assets/           The published image repo. A git checkout of
                  nolanbowlin/peachtree-brand-assets, live on GitHub Pages.
                  Commit and push and the images are live.
brand/            The client facing brand package, as HTML.
reference/        Dated capture of the live site the brand was sampled from.
source/           Files as originally supplied, suffixed -original.
templates/        Email templates. Open 00-index.html first.
  report/         The report that fulfils the tool gate.
  newsletter/     Monthly and quarterly.
tool/             The retirement number lead generation page.
```

Every email exists twice: `-template.html` carries merge tokens for the send platform,
`-preview.html` is the same file filled with sample data for review. Previews are
generated, never hand edited. Rebuild from `templates/`:

```
node build-previews.js
```

## The tool

Same machine as the TRADE Exit Score on nolanscottteam.com: landing, quiz, results with
the score given away and the dollar figures blurred, email gate, confirmation with a
booking link. Peachtree Planning brand throughout, light rather than dark. No Nolan Scott branding anywhere.

## Before it goes live, three things

1. **Webhook.** `WEBHOOK` at the top of the script in `tool/retirement-number.html` is a placeholder. Nothing is captured
   until it points at Garrett's Make scenario or CRM endpoint. It POSTs one JSON payload
   with the lead, every answer, the five category scores and the full money breakdown.
2. **Calendly.** `https://calendly.com/GARRETT-CALENDLY-SLUG` on the confirmation screen.
3. **Compliance.** The `COMPLIANCE` string is written to be reasonable, not to be approved.
   Garrett's broker dealer and OSJ have to sign the exact wording before this runs behind
   paid traffic, and they will likely want their own required disclosure language plus a
   privacy link. This is the one item that can hold up the launch, so start it first.

Optional: the pixel block in `<head>` is empty. Define `window.firePixelEvent(name, data)`
there and the page will fire `ViewContent` on quiz start, `Lead` on gate submit and
`Schedule` on the booking click. Without it the ad account has no conversion signal.

## What the visitor gets free, and what is gated

Free: the READY score out of 100 and the five category bars.
Gated: the retirement number, the projected shortfall or surplus, and the monthly figure
that closes it. The score is interesting but not actionable, which is what makes people
give up an email for the rest. Do not reveal the number earlier.

## Structure

Eight sections, 25 scored questions plus 10 intake and 2 optional exact figures.

- Intake, two sections. Not scored. Feeds the money maths only.
- **R, Runway.** Time and flexibility left.
- **E, Expenses.** Whether they know what retirement costs. Includes the pre-65 health
  insurance bridge and long term care, both of which are usually the first real
  conversation Garrett gets to have.
- **A, Assets.** What is invested, tax diversification, liquidity, access before 59 and a half.
- **D, Dependence.** Concentration in a single asset, business sellability, funded buy sell,
  death and disability. This is the exit planning wedge and it is where the CEPA(R) work
  comes from.
- **Y, Yield.** Social Security timing, number of income sources, guaranteed coverage of
  essentials, withdrawal order, tax in retirement.
- Optional exact figures, last, where skipping costs nothing.

## The money model

Everything is in today's dollars: assets grow at a real return and spending is not
inflated. One assumption instead of two, and it survives being explained on a call.

- Real return before retirement: **5 percent**, deliberately not 7. A portfolio held by
  someone within fifteen years of retiring is not all equities, and a flattering
  projection shrinks the gap, which defeats the purpose of the tool.
- Sustainable withdrawal rate varies with how long the money has to last: 3.4 percent
  retiring before 55, up to 4.6 percent at 70 and over.
- Spending is backed out of gross income through `SPEND_BASE` (80 percent at the bottom
  down to 55 percent at the top) before the retirement adjustment, because gross income
  includes tax and savings. Skipping this step roughly doubles the number and makes the
  tool read as a scare tactic.
- Business proceeds count only when the owner says the sale funds retirement, at 70
  percent of the stated value (55 percent when it is called a bonus rather than the plan),
  covering tax, fees and the gap between owner expectation and buyer price. An owner who
  says they have no idea what it is worth contributes zero rather than a guess, and the
  payload flags it as `business_value_unknown` so the report can say so.

All constants are named at the top of the script. Retune there, not inline.

---

## Merge fields Paul needs to populate

The landing page POSTs the payload described above. These are the template tokens the
fulfilment side has to fill. Anything not directly in the payload is derived, and the
derivation is given.

### `templates/report/email-report-template.html`

Straight from the payload: `number.*`, `scores.*`.

Derived:

| Token | How to derive |
|---|---|
| `{{first_name}}` | First word of `name`. |
| `{{pct.R}}` through `{{pct.Y}}` | Category score times 5. A 13.4 becomes 67. Bar widths. |
| `{{band_label}}` | The `band` string already in the payload. |
| `{{band_color}}` | `#D2232A` for the bottom band, `#B87333` for the second, `#2E7D5B` for the top two. |
| `{{gap_label}}` / `{{gap_color}}` | `surplus` true gives "Projected surplus" and `#2E7D5B`. False gives "Projected shortfall" and `#D2232A`. |
| `{{band_framing}}` | The four paragraphs live in `FRAMING` in the landing page script. Copy them across, index by band. |
| `{{weak_1}}` / `{{weak_2}}` | The two lowest scoring categories. Title and body come from the library below. |
| `{{number.retirement_age}}` | From the `target_retirement` intake band. |
| `{{number.*_formatted}}` | Currency strings. The payload already carries the main ones. |
| `{{business_note}}` | If `business_value_unknown`, say the business was left out because it has never been valued. If `business_proceeds_counted` is above zero, say what was counted and that it is discounted for tax, fees and the gap between owner expectation and buyer price. Otherwise say the business was not counted because the sale is not funding retirement. |
| `{{review_id}}` | The Guardian review ID and expiry. Do not send without it. |

### Weak category library

Pick the two lowest scoring letters and use the matching pair.

- **R, Runway.** "Time is the asset you cannot buy back." The plan leans on a date that has
  not been stress tested. Everything gets easier the earlier a real date is set, and harder
  every year it is not.
- **E, Expenses.** "You cannot fund a number you have never measured." Retirement spending
  is the single biggest input and the one most often guessed. The pre-65 health insurance
  bridge and long term care are where the guesses are worst.
- **A, Assets.** "What is saved matters less than how it is positioned." Contribution rate,
  the split across pre tax, Roth and taxable, and whether anything is reachable before 59
  and a half all move the outcome more than picking better investments.
- **D, Dependence.** "One asset should not be able to end the plan." Concentration in a
  business, one property or employer stock is the risk that does not show up until the day
  it matters. A funded buy sell and a business that can be sold without the owner are what
  turn it from a risk into an asset.
- **Y, Yield.** "The paychecks stop, the bills do not." Social Security timing, how many
  sources pay you, how much of the essentials is covered by income you cannot outlive, and
  the order accounts get drawn down. Usually the cheapest points on the board.

### `templates/newsletter/`

All tokens are content rather than data, written per send. See `HANDOFF.md` for the
content model and the compliance limits on the market note.
