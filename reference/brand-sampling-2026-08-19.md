# Brand sampling, peachtreeplanning.com, 19 August 2026

The raw capture the brand package was built from. Kept because "where did that hex
come from" is the question that gets asked a year later, and the site will have changed
by then.

Method: loaded the live home page in a browser and read `getComputedStyle` off the real
DOM. These are rendered values, not values read off a screenshot or picked out of a
design file.

## Type, from the loaded stylesheet

```
https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap
```

| Element | Computed |
|---|---|
| `body` | `Mulish, sans-serif`, background `#FFFFFF`, colour `#111111` |
| `h2` (hero, "Empowering People to Create Generational Impact") | `Tinos, serif`, weight **400**, size **90px**, colour `#FFFFFF` |
| `h4` (footer "Visit") | `Tinos, serif`, weight 400, 18px |

The hero being weight 400 at 90px is the single most useful thing in this capture. It
is why display headlines in this system are never bolded.

## Colour, counted across the home page

| Hex | Occurrences | Verdict |
|---|---|---|
| `#D2232A` | 145 | The brand red. |
| `#CC0000` | 2 | Stray. Almost certainly hardcoded inside one embedded widget. Do not use. |

Dark bands found, by computed background on elements over 140px tall and 500px wide:

| Hex | Element | Height |
|---|---|---|
| `#202122` | `DIV` | 389px |
| `#394249` | `SECTION` | 374px |
| `#111111` | `FOOTER` | 694px |

## Buttons, computed

```
background-color : #D2232A
color            : #FFFFFF
font-family      : Mulish, sans-serif
font-weight      : 700
border-radius    : 10px
padding          : 17.776px 35.552px
text-transform   : none
letter-spacing   : normal
```

Rounded to `17px 35px` in this system. The 10px radius is carried verbatim.

## Required disclosure, verbatim from the footer

> Peachtree Planning is an Agency of The Guardian Life Insurance Company of America
> (Guardian), New York, NY. Securities products and advisory services offered through
> Park Avenue Securities LLC (PAS), member FINRA / SIPC. OSJ: 5600 Glenridge Dr Suite 600
> East, Atlanta, GA 30342, Phone #404-260-1600. PAS is a wholly owned subsidiary of The
> Guardian Life Insurance Company of America (Guardian), New York, NY. Peachtree Planning
> is not an affiliate or subsidiary of PAS or Guardian.

From Garrett's bio page:

> Registered Representative and Financial Advisor of Park Avenue Securities LLC (PAS),
> Financial Representative of Guardian. CA Insurance License #4138564.

CFP Board marks notice, from the same page:

> Certified Financial Planner Board of Standards Inc. owns the certification marks
> CFP(R), CERTIFIED FINANCIAL PLANNER(TM), CFP(R) (with plaque design) and CFP(R) (with
> flame design) in the U.S.

The footer carries an advertising review ID and expiry: `8894350.1 Exp 5.2028`. That is
the format anything new has to end with once it clears review.

## Offices and contact, from the footer

- 101 Westpark Drive, Suite 310, Brentwood, TN 37027
- 5600 Glenridge Dr Suite 600 East, Atlanta, GA 30342
- Toll free 800-366-0839, Atlanta 404-260-1600, Nashville 615-376-8300
- Garrett direct: 615-282-5702, Garrett.Williamson@PeachtreePlanning.com

## The existing "scorecard"

The home page CTA "How do your finances stack up? Get Your Scorecard Now" points at:

```
https://www.livingbalancesheet.com/lbsVision/lite/PeachtreePlanning
```

That is the stock Guardian Living Balance Sheet tool. Every agency in the network points
at the same product with their own slug on the end. It is not differentiated, it is not
Garrett's, and it does not build him a list. That is the case for building the
retirement number tool, and the case for not making it look like a Guardian template.

## Asset verification

The reversed logo was checked pixel by pixel rather than taken on trust, by drawing both
files to a canvas and counting:

| File | Wordmark region | Result |
|---|---|---|
| `peachtree-planning-logo.png` | 4,941 opaque pixels | all black, red mark 4% coverage |
| `peachtree-planning-logo-reversed.png` | 4,941 opaque pixels | all white, red mark 4% coverage |

Same geometry, inverted wordmark, mark untouched. A genuine knockout rather than the
colour file with a filter baked in, so it is safe on the slate band.

The two files in `source/` were compared against the published ones in `assets/img/`:

| File | Finding |
|---|---|
| Logo | Pixel identical. 0 of 72,000 pixels differ. The source copy is duplication, kept only for provenance. |
| Headshot | Same 200x200, but 22.8% of pixels differ with a max delta of 146. The published copy is a harder JPEG compression. The source file is the better one. |

**Open item:** 200x200 is undersized for a master headshot. The newsletters render it at
150px, so on a retina screen that is only 1.33x and reads soft. Worth asking Garrett for
the full resolution original.
