**Comparison Target**

- Source visual truth:
  - `/var/folders/l0/8hpkr62n4ts7j6w7cf8k_rb40000gn/T/codex-clipboard-caadfefa-3a77-4cb8-a1d6-089e3d743bf7.webp` for the FLC image position.
  - `/var/folders/l0/8hpkr62n4ts7j6w7cf8k_rb40000gn/T/codex-clipboard-a3862fc1-109c-480f-98a9-63861c8b8ed5.webp` and `https://pasteapp.io/` for the rating treatment and App Store glyph.
  - The user's latest values: Kursvalut 4.9 / 140 ratings and FLC Calculator 4.9 / 670 ratings.
- Implementation: `http://127.0.0.1:5173/#projects`, Swift project cards in Russian and dark theme.
- Implementation screenshots: Codex in-app Browser tabs 10 and 11, desktop captures emitted inline during QA. The browser API does not expose a filesystem path for these captures.
- Viewport: 1280 × 720 CSS px at devicePixelRatio 2. Project cards render at 1200 × 744 CSS px.
- State: dark theme; Kursvalut and FLC Calculator selected separately; rating, image area, and footer states inspected.

**Full-view comparison evidence**

- FLC retains the earlier large phone composition and now has visible breathing room above the tall phone rather than touching the card edge.
- Expanding every card from 640 px to 744 px restores the visual area's previous size after the common typography and padding were applied.
- Kursvalut, FLC Calculator, and CustomNumpad all use the same title size, line height, content padding, and card height.
- Rating blocks appear between the description and technology tags without colliding with links or forcing the supplied images smaller.
- Both App Store links use the rounded-square App Store glyph extracted from the live Paste reference.

**Focused-region comparison evidence**

- Paste reference inspection: star icon 18 px, score 16 px bold, separator 12 px bold, rating count set as compact stacked text, and 6 px horizontal gaps.
- Implementation mirrors those measurements and uses the existing secondary-text color token.
- Computed desktop metrics for all three Swift cards: card height `744px`, title `40px / 44px`, content padding `28px 64px 48px`.
- Accessible rating labels resolve to `4.9, 140 Оценок` and `4.9, 670 Оценок`.
- Kursvalut's App Store link resolves to the supplied Apple URL and is visible.

**Findings**

- No actionable P0, P1, or P2 issue remains in the requested scope.

**Required fidelity surfaces**

- Fonts and typography: all Swift cards now share the same 40 px desktop title, 18 px description, line heights, weights, wrapping behavior, and responsive rules. The Paste-derived rating hierarchy is preserved.
- Spacing and layout rhythm: all cards share one content padding and footer rhythm. The shared 744 px height preserves a large visual area while accommodating the new rating row.
- Colors and visual tokens: rating content uses the shared secondary-text token; links and the App Store glyph use the accent token and remain visible in dark theme.
- Image quality and asset fidelity: supplied showcase WebP assets remain at their existing scale. FLC is lowered slightly from the top while keeping the second phone visible.
- Copy and content: ratings are 4.9 / 140 for Kursvalut and 4.9 / 670 for FLC Calculator. Kursvalut now includes the supplied App Store destination.

**Comparison history**

- Earlier P2: applying common text and padding inside a fixed 640 px card reduced the image area. Fix: increased the shared card height to 744 px instead of shrinking showcase imagery. Post-fix evidence: the FLC screenshot again shows the large phone composition, and all three cards report the same 744 px height.
- Earlier P2: showcase cards used smaller title, description, padding, and footer spacing than CustomNumpad. Fix: removed the showcase-only typography and padding overrides. Post-fix evidence: computed title and content metrics match across all three cards.
- Earlier P2: App Store used an Apple logo rather than the requested App Store badge glyph. Fix: extracted the exact 18 × 18 path from Paste into the named `brand-app-store.svg` asset and applied it as a theme-aware mask. Post-fix evidence: both links display the rounded-square A glyph in the accent color.

**Open Questions**

- None.

**Implementation Checklist**

- [x] Lower FLC imagery slightly without reducing it.
- [x] Add reusable rating data and presentation.
- [x] Add Kursvalut App Store link.
- [x] Replace Apple logo with Paste's App Store glyph.
- [x] Unify card typography, padding, footer spacing, and height.
- [x] Verify both localized rating values and responsive rendering.
- [x] Run production build, lint, browser console check, and diff validation.

**Follow-up Polish**

- None required for this iteration.

**Latest iteration: rating spacing, navigation glass, and Safari chrome**

- Source visual truth:
  - `/var/folders/l0/8hpkr62n4ts7j6w7cf8k_rb40000gn/T/codex-clipboard-eb556a70-56ca-4f54-ac13-ef4e947e742b.webp` for the cramped rating label.
  - `/var/folders/l0/8hpkr62n4ts7j6w7cf8k_rb40000gn/T/codex-clipboard-f4944e2f-b47e-4eb8-950b-24d27fc57165.webp` for the resume button crossing the header.
  - `/var/folders/l0/8hpkr62n4ts7j6w7cf8k_rb40000gn/T/codex-clipboard-5cebb7b4-cfe7-47c7-9775-ceccf38a2aaf.webp` and `/var/folders/l0/8hpkr62n4ts7j6w7cf8k_rb40000gn/T/codex-clipboard-914573a6-8de1-49e7-b73a-b05e79367975.webp` for the Safari glass reference.
- Implementation evidence: Codex in-app Browser tab 12, 1280 × 720 CSS px, light and dark themes. Captures were emitted inline; the browser API exposes no screenshot filesystem path.
- Rating: the count and label now use a 2 px row gap and a normal 10 px line height.
- Header glass: the original 40px blur made large text behind the bar dissolve into indistinct shapes. The balanced glass keeps blur at 4.5px and restores the page-background color at 80% opacity so the bar remains white in light mode instead of forming a gray strip. Backdrop contrast is reduced to 80% and brightness set to 105%, fading the content beneath the glass independently from the bar color. Saturation remains subdued at 1.1. The resume button remains below the header layer.
- Header activation: at `scrollY <= 1` the sticky header is transparent with no backdrop filter or divider. Once content starts passing beneath it, `data-scrolled` enables the complete glass material and divider.
- Resume button layering: the fixed liquid surface remains at z-index 900, the visible download control is now at 901, and the header remains at 1000. The button label therefore stays visible during the liquid transition while the entire control continues to pass beneath the header.
- Layering: sticky header z-index is 1000, the fixed resume animation surface is 900, and the button control is 20.
- Safari color: the rendered `meta[name="theme-color"]` remains `#0071e3` after React theme initialization in both appearance modes.
- Comparison history:
  - Earlier P2: `Ratings` touched the numeric count. Fix: added an explicit 2 px internal gap.
  - Earlier P1: the resume button and its fixed animation surface could paint above the sticky header. Fix: placed both below the header stacking layer.
  - Earlier P2: the header blur was sharper and more transparent than the supplied Safari reference. Fix: increased the blur to 40 px and the glass surface to 74% while retaining 180% saturation.
  - Earlier P2: the initial blue `theme-color` was overwritten with white or black when React applied the selected theme. Fix: both initialization paths now keep `#0071e3`.
- No actionable P0, P1, or P2 issue remains in this iteration.

final result: passed
