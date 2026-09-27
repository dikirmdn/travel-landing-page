---
name: Ulinkeun — cinematic destination hero
description: Code-first record of the implemented Indonesian destination carousel.
colors:
  paper: "oklch(19% 0.015 100)"
  ink: "oklch(97% 0.009 85)"
  muted: "oklch(83% 0.015 85)"
  accent: "oklch(81% 0.15 80)"
  accent-hover: "oklch(88% 0.12 80)"
  rule: "oklch(97% 0.009 85 / 0.32)"
  shade: "oklch(10% 0.02 170)"
  clear: "oklch(10% 0.02 170 / 0)"
  dialog: "oklch(24% 0.018 110)"
typography:
  display:
    fontFamily: "var(--font-barlow-condensed), sans-serif"
    fontSize: "clamp(76px, 16vw, 112px)"
    fontWeight: 700
    lineHeight: 0.86
    letterSpacing: "-0.015em"
  card-title:
    fontFamily: "var(--font-barlow-condensed), sans-serif"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: 1
  dialog-title:
    fontFamily: "var(--font-barlow-condensed), sans-serif"
    fontSize: "40px"
    fontWeight: 600
    lineHeight: 1.05
  wordmark:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
  tagline:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.5
  body:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "12px"
    lineHeight: 1.85
  button-label:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "12px"
    fontWeight: 600
rounded:
  card: "12px"
  dialog: "16px"
  discover: "32px"
  circle: "50%"
spacing:
  gutter: "clamp(24px, 4.6vw, 88px)"
  control-gap: "8px"
  card-gap-base: "16px"
  card-gap-medium: "20px"
  card-gap-wide: "24px"
  layout-gap-base: "44px"
  layout-gap-medium: "56px"
components:
  button-discover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
    typography: "{typography.button-label}"
    rounded: "{rounded.discover}"
    padding: "5px 5px 5px 22px"
  button-discover-hover:
    backgroundColor: "{colors.accent-hover}"
  button-circle:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    width: "44px"
    height: "44px"
  button-circle-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-playback:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    width: "44px"
    height: "44px"
  destination-card:
    backgroundColor: "{colors.dialog}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "0"
    width: "160px"
    height: "224px"
  destination-dialog:
    backgroundColor: "{colors.dialog}"
    textColor: "{colors.ink}"
    rounded: "{rounded.dialog}"
    padding: "36px 28px"
    width: "min(540px, calc(100% - 32px))"
  photo-credit:
    textColor: "{colors.ink}"
---

# Design System: Ulinkeun — cinematic destination hero

## Overview

**Creative North Star: "A moving window into Indonesian destinations"**

Full-bleed destination photography establishes the cinematic setting. Warm ivory copy, amber controls, dark photographic scrims, and condensed destination names frame a right-edge portrait filmstrip. Geist carries the smaller Indonesian interface copy.

This is a code-first record of the implemented hero, including its destination-details dialog. The approved cinematic direction supplies the descriptive language; the implementation supplies the values and behavior. It is a hero-scoped system, not a specification for future pages or travel services.

**Key Characteristics:**
- Photography remains the dominant surface, with layered scrims behind text.
- Condensed uppercase destination names contrast with compact Geist interface copy.
- One GSAP timeline coordinates scenery, destination copy, and filmstrip changes.
- Responsive clipping and measured card visibility constrain keyboard card access.
- User pause, native dialog behavior, and reduced-motion handling are implemented controls.

Evidence: `app/globals.css`, `app/layout.tsx`, `components/travel/hero-carousel.tsx`, and `lib/destinations.ts`; context: `PRODUCT.md` and `.impeccable/surfaces/travel-hero.md`. Values below were extracted from source, not sampled from a rendered browser. Frontmatter contains actual base values; responsive overrides and runtime details follow. Descriptive token keys for extracted component values do not imply additional CSS custom properties exist.

## Colors

The palette places warm light text and a single amber accent over very dark, subtly tinted photographic supports. The frontmatter preserves the source OKLCH values without conversion or synthesized tonal ramps.

### Primary
- **Amber marker (`accent`)**: discovery button, focus outlines, location icons, brand dot, footer line, and playback fill.
- **Light amber (`accent-hover`)**: discovery-button hover only.

### Neutral
- **Dark paper (`paper`)**: body and scenery fallback, skip-link surface, and text on amber or inverted controls. Despite its name, this is a dark color.
- **Warm ivory (`ink`)**: primary copy, card numbering, and inverted circular-control backgrounds.
- **Muted ivory (`muted`)**: descriptions, categories, captions, and secondary footer copy.
- **Translucent ivory (`rule`)**: circular-control borders, progress-track bed, and dialog rules.
- **Deep photographic shade (`shade`)**: source color for scrims and the dialog backdrop.
- **Transparent shade (`clear`)**: transparent gradient endpoints.
- **Dark olive dialog (`dialog`)**: detail surface and card fallback.

Source custom properties are `--color-<key>` for these nine entries. Tailwind's inline `background` and `foreground` aliases map to `paper` and `ink`; `font-sans` maps to `--font-body`. The document uses a dark color scheme, muted-on-paper scrollbar colors, and paper-on-accent text selection.

**The Photographic Contrast Rule.** Keep the implemented scrims with the destination photography; the text treatment is composed against these overlays, not the unshaded image.

## Typography

**Display font:** Barlow Condensed, exposed by `next/font/google` as `--font-barlow-condensed`, with `sans-serif` fallback. The layout loads Latin weights 600 and 700 with `display: "swap"`; `--font-display` uses this variable.

**Body font:** Geist, exposed by `next/font/google` as `--font-geist-sans`, Latin subset, with `sans-serif` fallback. No explicit weight list is supplied. `--font-body` uses this variable. The root document language is `id`.

### Hierarchy
- **Destination display:** frontmatter `display`, uppercase, wrapping flex spans split at spaces, maximum width `8ch`, column gap `0.18em`, and `overflow-wrap: anywhere`. Base bottom margin is `20px`, increasing to `28px` at desktop. Responsive sizes are in Layout.
- **Card title:** frontmatter `card-title`, uppercase and nonwrapping; increases with viewport size.
- **Dialog title:** frontmatter `dialog-title`; bottom margin `20px`.
- **Wordmark:** frontmatter `wordmark`; a separate amber dot and a compass icon. Responsive sizes are in Layout.
- **Invitation/tagline:** frontmatter `tagline`, increasing to `16px` at `1024px`.
- **Description:** frontmatter `body`, muted color, maximum width `39ch`; increases to `13px` at `640px` and `14px` at `1440px`.
- **Region metadata:** `11px`, weight 400, tracking `0.015em`, with a `16px` accent map pin; becomes `12px` at desktop. This is destination metadata, not a prescribed heading-prefix pattern for other surfaces.
- **Small interface text:** browser heading `12px`, destination total and playback caption `10px`, card category `9px` then `10px` at `640px`, card link `10px`, footer copy `10px`. Discovery label is frontmatter `button-label`.
- **Counter:** tabular numerals, active number `24px`/500, other counter text `12px`, gap `8px`; the slash has opacity `0.5`.
- **Dialog copy:** paragraphs `13px`/1.8, highlights `12px`/1.6, subheading `13px`, note `11px`, credit `10px`.

These sizes are observed roles, not a mathematically generated type scale.

## Layout

The hero is a relatively positioned, isolated flex column with full-inset scenery and clipped overflow. Both document and hero clip horizontal overflow. The fluid outer gutter is frontmatter `spacing.gutter`. The story copies overlap in one grid cell, while the CTA remains outside the copy stack. Portrait cards are absolutely positioned in a rail and translated by the measured card width plus gap.

| Viewport condition | Composition and type | Card width × height / gap |
| --- | --- | --- |
| Base, below `640px` | One column, story above filmstrip; minimum height `100svh`; layout padding `48px 0 24px`, gap `44px`; display uses the base clamp | `160 × 224px` / `16px` |
| `max-width: 359px` | Base layout with `72px` display, `24px` wordmark, `10px` header exploration label; header and control gaps `12px`, browser heading `11px` | Base dimensions |
| `min-width: 640px` | One column; layout top padding `64px`, gap `56px`; `112px` display, `32px` wordmark, `32px` card title; header note and footer-next button appear | `208 × 284px` / `20px` |
| `min-width: 1024px` | `44% / 56%` columns, zero column gap, layout padding `70px 0 48px`; minimum height `max(760px, 100svh)`; display `clamp(100px, 8.8vw, 154px)`; browser top padding `72px`; footer category appears | `216 × 312px` / `20px` |
| `min-width: 1440px` | `45% / 55%` columns; story left margin `calc(var(--gutter) + 24px)`; browser heading and controls max width `708px`; `36px` card title | `232 × 336px` / `24px` |

Header padding is `28px` vertically at base and `32px` from `640px`. The story has gutter margins; its right margin becomes `40px` at desktop. The browser starts with a gutter left margin, becoming zero at desktop. Its heading and controls have a gutter right margin and a `646px` maximum width until the wide override. Controls start `24px` below the rail, increasing to `32px` at desktop; the caption sits another `12px` below and has minimum height `16px`.

Card text sits `16px` from the sides and `20px` from the bottom at base, then `20px`/`24px` from `640px`. The footer starts at `24px` padding vertically, changes to `24px` top and `32px` bottom at desktop, and gets `36px` bottom padding at wide sizes; horizontal padding remains the gutter.

There are three upcoming destination slots, not a guarantee of three fully visible cards at every viewport. The rail is horizontally clipped by the hero rather than implemented as a scrollable card list. `ResizeObserver` reads `--card-width`, `--card-gap`, and rail width to compute `max(1, floor((railWidth + gap) / (cardWidth + gap)))`; keyboard eligibility is capped at three cards. A partial trailing card can remain visible without entering the Tab order.

The details dialog is centered by native dialog placement and auto margins. Its width and padding are in frontmatter; maximum height is `calc(100svh - 48px)` with vertical overflow scrolling.

## Elevation & Depth

The implementation uses tonal and photographic layering, without box shadows or backdrop blur. Scenery sits at `z-index: -3`, the shade at `-1`, within the isolated hero. During transitions, the incoming scenery layer has local z-index 2 and others 1. The focused skip link sits at z-index 10; the modal uses the browser's dialog top layer.

Exact scrim recipes from `app/globals.css`:

```css
/* Hero: horizontal contrast, bottom grounding, then header contrast. */
background:
  linear-gradient(90deg,
    color-mix(in oklch, var(--color-shade) 76%, transparent),
    color-mix(in oklch, var(--color-shade) 9%, transparent)),
  linear-gradient(0deg,
    color-mix(in oklch, var(--color-shade) 85%, transparent),
    var(--color-clear) 65%),
  linear-gradient(180deg,
    color-mix(in oklch, var(--color-shade) 48%, transparent),
    var(--color-clear) 24%);

/* Portrait card. */
background: linear-gradient(0deg,
  color-mix(in oklch, var(--color-shade) 90%, transparent),
  var(--color-clear) 85%);

/* Native dialog backdrop. */
background: color-mix(in oklch, var(--color-shade) 80%, transparent);
```

**The Tonal Depth Rule.** Preserve the hero's existing gradient and opacity layering when reproducing it; no shadow vocabulary is implemented here.

## Shapes

Portrait cards use frontmatter `rounded.card` with clipped photography; the modal uses `rounded.dialog`. The amber discovery action uses `rounded.discover`, and its inner arrow enclosure is a `38px` circle with a `1px` border mixing paper at 25% with transparency. Circular navigation buttons are `44px` squares with `1px` rule-colored borders. The playback control is an unbordered `44px` square, not another outlined circle.

Other linear accents are deliberately small: the progress track is `2px` high, the footer amber line is `24 × 1px`, and card numbers carry an ivory `1px` underline with `6px` bottom padding. The credit link is underlined with `4px` underline offset. Icons come from Lucide; the interface does not use text glyphs as icon substitutes.

## Components

### Header and exploration entry

The Ulinkeun wordmark links to `/` with accessible name `Ulinkeun — beranda`. The header's `Jelajahi destinasi` button pauses autoplay and programmatically focuses the next destination card using `preventScroll: true`; it does not open a separate navigation page. Its minimum height is `44px`, and hover changes its text to amber. The brand note appears from `640px`.

### Discovery action and details dialog

The amber `Temukan ceritanya` button has minimum height `48px`, gap `24px`, and frontmatter padding/radius. Hover changes to light amber over `180ms` using `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`. It is natively disabled and has `aria-disabled` while a slide transition is busy; disabled opacity is `0.7`.

Activation sets the persistent pause state and opens a native `<dialog>` with `showModal()`. The dialog is labelled by `detail-title`, contains the current description, three destination highlights, an inspiration-only note, and its photo credit. Native modal focus handling and Escape cancellation apply; there is no custom focus trap. The close button and clicks on the backdrop outside the dialog's bounding rectangle close it. On close, focus returns to the discovery button with `preventScroll: true`; playback remains paused. The credit opens its stored `creditUrl` in a new tab with `rel="noreferrer"` and has a minimum `44px` height.

### Destination filmstrip and playback controls

Initial destination is Bali; data order is Bali → Bromo → Labuan Bajo → Raja Ampat → Bali. Four card buttons stay mounted. Relative slot is `(index - active - 1 + count) % count`; the active destination occupies the hidden fourth slot, and the other three are upcoming destinations. Clicking an upcoming card selects it rather than opening its dialog.

Cards use cover photography and their destination-specific object positions. Hover scales the photo to `1.055` over `500ms` with the shared CSS easing. Native buttons support Enter/Space activation. Previous/next buttons use `44px` circles, an ivory background and dark text on hover, with `180ms` color/background transitions. The footer-next action appears from `640px` and selects the next destination.

Autoplay uses a linear five-second `scaleX(0 → 1)` progress tween, then requests the next destination. The five seconds are the countdown, not the full wall-clock slide cycle: transitions and image readiness can add time. Progress resets to zero when playback state changes; resuming starts a fresh countdown rather than preserving elapsed time.

Playback requires all of: not explicitly paused, no mouse hover over the destination browser, the visibility state true, no reduced-motion preference, no open dialog, and no busy transition. A mouse pointer entering the browser temporarily suspends playback; pointer leave clears that hover state. Visibility combines `!document.hidden` with `IntersectionObserver`'s `entry.isIntersecting`; the observer is configured with threshold `0.15`. The callback does not separately compare `intersectionRatio` to 15%.

Manual card selection, navigation arrows, footer-next, horizontal swipe, header exploration, opening details, and keyboard-visible focus inside the hero set a persistent pause. Left/Right arrow keys anywhere inside the hero prevent default scrolling, pause, and select the adjacent destination unless the dialog is open. Rail swipes require horizontal displacement greater than `45px` and greater than the vertical displacement; swipe left advances and right reverses. The rail uses `touch-action: pan-y`; cancellation clears the stored touch origin. Explicit playback activation toggles the pause state.

The playback button's accessible name is `Putar carousel otomatis` when paused or reduced, otherwise `Jeda carousel`. Its `aria-pressed` is `!paused && !reduced`, and its icon follows those same states. Temporary hover/visibility/busy suspension does not change that pressed-state calculation. The visible caption prioritizes reduced motion, then explicit pause, then hover, then the five-second message; it does not separately describe visibility or transition suspension.

### Synchronized transition and image readiness

One GSAP timeline drives scenery, copy, and cards. Default easing is `power3.inOut` and the normal base duration is `1.05s`. Incoming scenery fades in while scaling `1.045 → 1`; outgoing scenery fades out at the same time. Old copy children move to `y: -18` and fade over `duration × 0.3`, staggered by `0.025s`. The old copy is hidden at `duration × 0.4`. New copy becomes visible at `duration × 0.32`, then enters from `y: 28` and opacity zero over `duration × 0.6`, with `0.055s` stagger and `power3.out`. Child staggering can extend the timeline beyond the base duration.

Cards ordinarily translate to their new slot over the base duration. A wrapping card travels to `-stride`, fades out, and scales to `0.94` over `duration × 0.6`; it is repositioned at that point, then, if upcoming, fades back in over `duration × 0.35` starting at `duration × 0.65`. Repeated navigation is ignored while the transition lock is set. Cards and previous/next/footer controls expose `aria-disabled` while busy but are not natively disabled; the navigation guard enforces the lock. The discovery button is natively disabled.

All scenery layers render as `next/image` images with `fill`, `sizes="100vw"`, and `unoptimized`. Bali is preloaded; other scenery images explicitly use eager loading. Card images use the same source with `fill`, `unoptimized`, and `sizes="(max-width: 640px) 160px, 232px"`. Both uses apply the stored object position and CSS `object-fit: cover`.

If a target background has neither loaded nor failed, navigation stores a pending target and sets the status `Menyiapkan foto destinasi…`; it waits for that image's load/error callback before transitioning. A failed image is allowed as a target, with the dark fallback still available. An active failed background displays `Foto belum tersedia. Kamu tetap bisa menjelajahi ceritanya.`; card images have no separate error handler.

### Accessibility and reduced motion

- The hero is a section labelled `Jelajahi destinasi Indonesia` with `aria-roledescription="carousel"`. It does not add slide roles or `aria-current` to cards.
- `Lewati ke destinasi` targets the story wrapper `#destination-content`, which has `tabIndex={-1}` and no outline. The skip link is translated above the viewport until focused; then it becomes visible.
- Background scenery is `aria-hidden`; all destination photos use empty alt text. Decorative Lucide icons are `aria-hidden`. Named card buttons expose `Jelajahi {destination name}`; text, not the image, names each action.
- Only active destination copy has `aria-hidden={false}`. The active card is `aria-hidden` and outside the Tab order. Upcoming cards whose slots exceed the measured fully fitting count also have `tabIndex={-1}`; these offscreen or partially clipped upcoming cards are **not** additionally marked `aria-hidden`.
- Tab-eligible cards follow the mounted data/DOM order, not a reordered visual slot sequence. The code does not explicitly move focus to another card after changing the active destination; `tabIndex` controls future Tab entry rather than forcibly blurring a currently focused card.
- Buttons and links get an amber `2px` `:focus-visible` outline with `5px` offset. Card focus uses offset `-4px` so its ring remains inside the clipped card. Keyboard-visible focus anywhere within the hero sets the persistent pause state.
- A screen-reader-only atomic destination message is `aria-live="polite"` only while `paused` is true; otherwise it is `off`. Reduced motion alone does not set `paused`. A separate `role="status"` region carries the pending-image message. The progress track is decorative (`aria-hidden`), not an announced progressbar.
- Reduced motion is subscribed through `matchMedia("(prefers-reduced-motion: reduce)")`, with a server snapshot of `true`. It disables autoplay and natively disables the playback button. Manual destination navigation remains available.
- Reduced-motion transitions retain a short `0.12s` base crossfade. Scenery scale stays at 1, text translation and staggering become zero, and cards immediately reposition with `gsap.set`. This is reduced motion, not a promise of zero animation.
- The reduced-motion CSS sets transition durations to `0.01ms !important`, forces `scroll-behavior: auto !important`, and removes the card-hover enlargement. It does not globally set CSS animation durations. Shared button active feedback still translates enabled buttons down `1px`.

**Visible card focus:** Preserve measured Tab eligibility and the inset card focus outline; clipping a card is not sufficient to remove it from sequential keyboard navigation.

### Sourced destination photography

`lib/destinations.ts` is the provenance and crop-position source of truth. Each remote demo asset is reused for scenery and its card; its recorded credit link is available in the details dialog. These are the stored provider/source labels, not verified photographer identities, license determinations, or brand-owned asset claims. Replace the image and credit together when substituting assets.

| Destination | Recorded credit | Object position |
| --- | --- | --- |
| Bali | Foto Bali · Unsplash | `center 52%` |
| Bromo | Bromo–Semeru–Batok–Widodaren · Wikimedia Commons | `center 48%` |
| Labuan Bajo | Labuan Bajo, January 2020 · Wikimedia Commons | `center 50%` |
| Raja Ampat | Raja Ampat Islands · PLOS Biology / Wikimedia Commons | `center 45%` |

- **Bali image:** <https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2200&q=85>
  - Stored credit/source URL: <https://images.unsplash.com/photo-1537996194471-e657df975ab4> (a direct image URL, not an author profile or photo-detail page).
- **Bromo image:** <https://upload.wikimedia.org/wikipedia/commons/8/8e/Bromo-Semeru-Batok-Widodaren.jpg>
  - Stored credit/source URL: <https://commons.wikimedia.org/wiki/File:Bromo-Semeru-Batok-Widodaren.jpg>
- **Labuan Bajo image:** <https://upload.wikimedia.org/wikipedia/commons/4/45/Labuan_Bajo%2C_a_port_in_West_Flores%2C_Nusa_Tenggara%2C_Indonesia%3B_January_2020.jpg>
  - Stored credit/source URL: <https://commons.wikimedia.org/wiki/File:Labuan_Bajo,_a_port_in_West_Flores,_Nusa_Tenggara,_Indonesia;_January_2020.jpg>
- **Raja Ampat image:** <https://upload.wikimedia.org/wikipedia/commons/a/a1/Raja_Ampat_Islands_-_journal.pbio.1001457.g001.png>
  - Stored credit/source URL: <https://commons.wikimedia.org/wiki/File:Raja_Ampat_Islands_-_journal.pbio.1001457.g001.png>

Destination descriptions and highlights are exploration content. The dialog explicitly identifies them as inspiration rather than a travel package; no pricing, availability, booking service, testimonial, or contact details are established by this hero.

## Do's and Don'ts

### Do:
- **Do** retain the implemented photographic scrims behind warm ivory copy.
- **Do** use Barlow Condensed for destination titles and Geist for interface copy.
- **Do** keep manual navigation, persistent pause, measured card Tab eligibility, and inset card focus visible.
- **Do** preserve the short reduced-motion crossfade and disabled autoplay when describing current behavior.
- **Do** update each demo image together with its credit and crop position in `lib/destinations.ts`.

### Don't:
- **Don't** describe the five-second countdown as the exact duration of a complete slide cycle.
- **Don't** promise three fully visible cards at every viewport or a visually reordered Tab sequence.
- **Don't** claim motion is entirely removed or all offscreen cards are hidden from assistive technology.
- **Don't** infer photographer identities, licensing terms, or brand ownership beyond the recorded source links.
- **Don't** turn destination inspiration into claims about packages, prices, availability, testimonials, or booking contacts.
