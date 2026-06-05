# PROPERTY KIT — BRAND GUIDELINES

## ESSENCE
Apple clarity + Airbnb warmth + luxury fashion editorial. Spacious. Confident. Warm. Premium without being cold.

---

## COLORS
Layout is **~80% light, ~20% dark ratio**. Or just 90-100% light. Dark sections for contrast are used sparingly for maximum contrast impact.

Primary teal

- Light surfaces live in the **cream range** — always warm-tinted, never cold white. Alternate cream shades between sections to create depth without adding visual noise.
- **Grey range** handles all text hierarchy and subtle UI elements. Heavier greys for headings, lighter greys for body, muted greys for captions and metadata.
- **Primary (teal/sage)** is the sole accent. Use it to draw the eye:  should be used sparingly, and often in the muted shades. Primary is reserved for very decisive design directions.
- **Dark range** is reserved for high-impact sections. On dark backgrounds, use the **white opacity range** (`--white-100` → `--white-900`) for all text and surface layering.
- **White** as a surface sits above cream — use it for cards, modals, and elevated elements to create layering hierarchy.


---

## TYPOGRAPHY
- **Manrope:** headings, UI, nav, buttons, labels, stats
- **DM Sans:** body copy, descriptions, form fields — never Manrope for paragraphs
- **Tight letter spacing is the brand signature** — always negative on headings (`--ls-1` through `--ls-3`). Only go wide (`--ls-5` → `--ls-7`) for ALL-CAPS text: buttons, eyebrows, pill tags.
- **Line heights:** `--lh-1` (0.92) for display/hero — dramatic. `--lh-2` (1.00) for headlines. `--lh-6` (1.65) for body — never below `1.55` for paragraphs.
- **Hierarchy:** pill eyebrow (`--fs-1`, wide tracking) → bold headline (Manrope, `--fs-8/9`, tight) → DM Sans body (`--fs-base`). The font contrast between Manrope and DM Sans IS the premium feel.


---

## SPACING & RESPONSIVE SIZING

The spacing scale (`--sp-1` → `--sp-16`) provides **core reference anchors** — not a rigid closed system. When you need a value between steps, or outside the scale entirely, use it or hard-code. The scale is a guide, not a jail.

**The clamp rule — apply ~90% of the time to all sizes, spacings & dimensions:**

> Viewport range: **400px (mobile) → 1280px (desktop)**
>
> Formula:
> ```
> vw     = (max - min) / 880 * 100
> offset = min - (400 × vw / 100)
> result → clamp(min, offset + Xvw, max)
> ```
> Example — padding that should be 24px on mobile and 48px on desktop:
> `vw = 24/880×100 = 2.727`, `offset = 24 - 10.91 = 13.09`
> → `clamp(24px, 13.09px + 2.727vw, 48px)`

The remaining ~10% — use fixed values when a dimension truly must not scale (1px borders, specific fixed icon sizes, overlay opacities).

- Section vertical padding: `--sp-15` (120px) desktop, never below `--sp-13` (80px). Clamp it.
- Card inner padding: `--sp-10/--sp-11` (48–56px) desktop. Clamp it.
- More whitespace = more expensive. When unsure, go spacious.

---

## EVERY DEVICE — DESIGN & CODE

**Design for mobile first, delight on desktop.** Many of the platform's clients will view agent websites on their phones. Every layout, component, and interaction must be considered at both ends of the viewport range — not retrofitted after the fact.

- Typography, spacing, padding, and gaps must all respond smoothly — use the clamp formula above.
- Touch targets: minimum 44×44px on mobile. Never rely on hover-only affordances.
- Stacked layouts on mobile: multi-column grids should reflow gracefully — test at 400px, not just 768px.
- In code: mobile styles first, then `min-width` breakpoints to enhance upward. Never patch mobile as an afterthought.

---

## BORDER RADIUS
- Bigger element = bigger radius. Never square-corner anything.
- Buttons: `--r-3`. Cards: `--r-5`. Layout blocks/CTAs: `--r-6`. Pills/avatars: `--r-7`.

---

## ICONS
- Stroke only. `stroke-width="1.5"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, `currentColor`
- Wrap in a framed container (`--r-2`) — primary-tinted on light surfaces, white-opacity on dark surfaces.

---

## CSS VARS
Use `--vars` **~90% of the time.** Hard-code only when no var is a genuine fit — e.g. a specific rgba overlay for a text-over-image contrast fix, or a one-off 1px rule. If you're reaching outside the vars regularly, the scale needs a new token.
