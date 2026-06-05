/* PROPERTY KIT — DESIGN TOKENS
   Fonts: Manrope (display) · DM Sans (body)
   Google: Manrope:wght@300;400;500;600;700;800;900 | DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400
   CLAMP FORMULA — viewport min: 400px, max: 1280px
   vw     = (max - min) / 880 * 100
   offset = min - (400 × vw / 100)
   result → clamp(min, offset + Xvw, max)
   Use for ~90% of sizes, spacings & dimensions. Hard-code only when
   a var genuinely doesn't fit (e.g. a 1px border, specific overlay opacity).
*/
:root {
  /* ── FONTS ─────────────────────────────────────────── */
  --font-display: 'Manrope', sans-serif;
  --font-body:    'DM Sans', sans-serif;
  /* ── FONT SIZES ─────────────────────────────────────
     --fs-base is the body anchor. It lives at --fs-4 in the scale.
     Fixed below base: too small to meaningfully fluid-scale.
     Fluid above base: use clamp so they land exactly right at
     400px (mobile) and 1280px (desktop). ─────────────── */
  --fs-1:    clamp( 9px,  8.55px + 0.114vw,  10px);  /* micro / eyebrow  */
  --fs-2:    clamp(11px, 10.55px + 0.114vw,  12px);  /* label / button   */
  --fs-3:    clamp(12px, 11.55px + 0.114vw,  13px);  /* body-sm / caption*/
  --fs-4:    clamp(14px, 13.55px + 0.114vw,  15px);  /* ← BASE body      */
  --fs-base: var(--fs-4);                             /* alias            */
  --fs-5:    clamp(15px, 14.55px + 0.114vw,  16px);  /* body-lg / lede   */
  --fs-6:    clamp(18px, 14.36px + 0.909vw,  26px);  /* subtitle         */
  --fs-7:    clamp(22px, 15.64px + 1.591vw,  36px);  /* title            */
  --fs-8:    clamp(32px, 19.27px + 3.182vw,  60px);  /* headline         */
  --fs-9:    clamp(56px, 23.27px + 8.182vw, 128px);  /* display / hero   */
  /* ── LETTER SPACINGS — 1 tightest → 7 widest ──────── */
  --ls-1: -0.05em;   /* display */
  --ls-2: -0.04em;   /* headline */
  --ls-3: -0.03em;   /* title */
  --ls-4: -0.01em;   /* body */
  --ls-5:  0.08em;   /* button / all-caps UI */
  --ls-6:  0.12em;   /* pill tags */
  --ls-7:  0.18em;   /* eyebrow */
  /* ── LINE HEIGHTS — 1 tightest → 6 loosest ─────────── */
  --lh-1: 0.92;   /* display — dramatic stacked */
  --lh-2: 1.00;   /* headline */
  --lh-3: 1.10;   /* title */
  --lh-4: 1.30;   /* tight UI / card titles */
  --lh-5: 1.60;   /* body-sm */
  --lh-6: 1.65;   /* body — never below 1.55 for paragraphs */
  /* ── PRIMARY — teal/sage ────────────────────────────── */
  --primary-100: 
#EBF2F1;
  --primary-200: 
#D4E7E5;
  --primary-300: 
#AECFCB;
  --primary-400: 
#83B5AF;
  --primary-500: 
#5C9B93;   /* main brand accent */
  --primary-600: 
#4A8079;
  --primary-700: 
#3A6560;
  --primary-800: 
#2A4A46;
  --primary-900: 
#1A302E;
  /* ── CREAM — warm off-whites ────────────────────────── */
  --cream-100: 
#FDFCFA;
  --cream-200: 
#F8F5F0;
  --cream-300: 
#F4F1EC;   /* primary page bg */
  --cream-400: 
#EAE6DE;
  --cream-500: 
#E0DBD1;
  --cream-600: 
#D4CEC3;
  --cream-700: 
#C4BDB0;
  --cream-800: 
#A8A096;
  --cream-900: 
#8A8278;
  /* ── DARK — near-blacks ─────────────────────────────── */
  --dark-100: 
#3D3D3D;
  --dark-200: 
#2C2C2C;
  --dark-300: 
#1A1A1A;
  --dark-400: 
#141414;
  --dark-500: 
#0B0B0B;   /* primary dark */
  --dark-600: 
#080808;
  --dark-700: 
#050505;
  --dark-800: 
#030303;
  --dark-900: 
#000000;
  /* ── GREY — neutrals ────────────────────────────────── */
  --grey-100: 
#F5F5F5;
  --grey-200: 
#E8E8E8;
  --grey-300: 
#D4D4D4;
  --grey-400: 
#BEBEBE;
  --grey-500: 
#9A9A9A;
  --grey-600: 
#7A7A7A;
  --grey-700: 
#5A5A5A;
  --grey-800: 
#3A3A3A;
  --grey-900: 
#1A1A1A;
  /* ── WHITE — opacity steps for dark surfaces ────────── */
  --white-100: rgba(255,255,255,0.05);
  --white-200: rgba(255,255,255,0.10);
  --white-300: rgba(255,255,255,0.20);
  --white-400: rgba(255,255,255,0.35);
  --white-500: rgba(255,255,255,0.50);
  --white-600: rgba(255,255,255,0.65);
  --white-700: rgba(255,255,255,0.80);
  --white-800: rgba(255,255,255,0.92);
  --white-900: rgba(255,255,255,1.00);
  /* ── BORDER COLORS — 1 lightest → 4 darkest ─────────── */
  --border-col-1: rgba(11,11,11,0.06);
  --border-col-2: rgba(11,11,11,0.10);
  --border-col-3: rgba(11,11,11,0.16);
  --border-col-4: rgba(11,11,11,0.24);
  /* ── RADII — 1 smallest → 7 full ───────────────────── */
  --r-1: 4px;
  --r-2: 8px;
  --r-3: 14px;    /* buttons */
  --r-4: 20px;
  --r-5: 28px;    /* cards */
  --r-6: 40px;    /* layout blocks */
  --r-7: 999px;   /* pills / avatars */
  /* ── ICON SIZES — 1 smallest → 6 largest ───────────── */
  --icon-size-1: 12px;
  --icon-size-2: 14px;
  --icon-size-3: 18px;
  --icon-size-4: 20px;
  --icon-size-5: 24px;
  --icon-size-6: 32px;
  /* ── SPACING ─────────────────────────────────────────
     8px base grid. These are the CORE reference values —
     not an exhaustive rigid list. Use them as anchors.
     When you need a value between steps, clamp it or
     hard-code — the scale is a guide, not a jail.
     For responsive use, wrap in clamp() at the call site:
       e.g. padding: clamp(var(--sp-5), 3vw, var(--sp-9));
  ──────────────────────────────────────────────────── */
  --sp-1:   2px;
  --sp-2:   4px;
  --sp-3:   8px;
  --sp-4:  12px;
  --sp-5:  16px;
  --sp-6:  20px;
  --sp-7:  24px;
  --sp-8:  32px;
  --sp-9:  40px;
  --sp-10: 48px;
  --sp-11: 56px;
  --sp-12: 64px;
  --sp-13: 80px;
  --sp-14: 96px;
  --sp-15: 120px;
  --sp-16: 160px;
}
/* ── BUTTONS ──────────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: var(--ls-5);
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  transition: background 0.25s cubic-bezier(0.22,1,0.36,1),
              transform  0.25s cubic-bezier(0.22,1,0.36,1),
              box-shadow 0.25s cubic-bezier(0.22,1,0.36,1),
              border-color 0.25s cubic-bezier(0.22,1,0.36,1),
              color 0.25s cubic-bezier(0.22,1,0.36,1);
}
.btn-primary       { background: var(--primary-500); color: #fff; border-radius: var(--r-3); }
.btn-primary:hover { background: var(--primary-400); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(92,155,147,.35); }
.btn-dark          { background: var(--dark-500); color: #fff; border-radius: var(--r-3); }
.btn-dark:hover    { background: var(--dark-300); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,.25); }
.btn-outline       { background: transparent; color: var(--dark-500); border: 1.5px solid var(--border-col-3); border-radius: var(--r-3); }
.btn-outline:hover { border-color: var(--dark-500); transform: translateY(-1px); }
.btn-ghost         { background: transparent; color: var(--grey-700); border-bottom: 1.5px solid transparent; padding-left: 0; padding-right: 0; border-radius: 0; }
.btn-ghost:hover   { color: var(--dark-500); border-bottom-color: var(--dark-500); }
.btn-sm { padding: 10px 20px; font-size: var(--fs-1); }
.btn-md { padding: 16px 32px; font-size: var(--fs-2); }
.btn-lg { padding: 18px 36px; font-size: var(--fs-2); }
.btn-ghost.btn-sm { padding: 8px 0; }
.btn-ghost.btn-md { padding: 12px 0; }
.btn-ghost.btn-lg { padding: 16px 0; }
.btn-icon { width: var(--icon-size-2); height: var(--icon-size-2); flex-shrink: 0; transition: transform 0.2s cubic-bezier(0.22,1,0.36,1); }
.btn:hover .btn-icon-arrow { transform: translate(2px,-2px); }
.btn:hover .btn-icon-right { transform: translateX(3px); } /*