# Dynamic travel hero

Target: app/page.tsx; related: components/travel/hero-carousel.tsx, app/globals.css.
Mode: Experience. Scope: only the dynamic hero, per the user's latest request.

## Direction contract

THESIS: A moving window into Indonesian destinations. The user's approved cinematic carousel is the visual authority; no alternative identity exercise. Exploration itself is the first-viewport action.

OWN-WORLD: Full-bleed destination photography, warm ivory text, amber interactive markers, dark photographic scrims. Condensed bold destination names paired with Geist interface copy. Portrait destination cards form a filmstrip at the right edge.

STORY: Recognize the destination, read a short invitation, move to another location or open its highlights. Booking integration waits for a supplied business contact.

FIRST VIEWPORT: Edge-aligned Ulinkeun wordmark and exploration control, left-aligned destination title and description, three visible upcoming portrait cards on the right, playback controls and a timed progress track below. Mobile stacks text above a horizontally clipped filmstrip; no document overflow.

FORM: Photographic cinematic filmstrip, pinned by the user's reference and confirmed brief. Seed 6436dd29 acknowledged; pinned composition takes precedence over the generated alternatives. Signature: one GSAP timeline synchronizes background crossfade/zoom, text exchange, and card translation.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Content and assets

Four demo destinations: Bali, Bromo, Labuan Bajo, Raja Ampat. Remote editorial photographs have their source URLs and credit links in lib/destinations.ts. No fabricated prices, ratings, testimonials, or contact number. The original reference image is unavailable in the retained context; implementation follows the confirmed written behavior.
