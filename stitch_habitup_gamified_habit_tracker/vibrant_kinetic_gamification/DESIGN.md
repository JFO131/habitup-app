---
name: Vibrant Kinetic Gamification
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#474555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#787587'
  outline-variant: '#c8c4d8'
  surface-tint: '#5742df'
  primary: '#3f22c8'
  on-primary: '#ffffff'
  primary-container: '#5843e0'
  on-primary-container: '#dbd5ff'
  inverse-primary: '#c6bfff'
  secondary: '#0060a9'
  on-secondary: '#ffffff'
  secondary-container: '#3f9eff'
  on-secondary-container: '#00345f'
  tertiary: '#653f00'
  on-tertiary: '#ffffff'
  tertiary-container: '#865400'
  on-tertiary-container: '#ffd29d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4dfff'
  primary-fixed-dim: '#c6bfff'
  on-primary-fixed: '#160066'
  on-primary-fixed-variant: '#3e21c7'
  secondary-fixed: '#d3e4ff'
  secondary-fixed-dim: '#a2c9ff'
  on-secondary-fixed: '#001c38'
  on-secondary-fixed-variant: '#004881'
  tertiary-fixed: '#ffddb7'
  tertiary-fixed-dim: '#ffb95d'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
  stat-numeric:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 32px
    letterSpacing: -0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system drives a gamified habit formation platform aimed at ambitious individuals striving for consistent personal evolution. The experience feels energizing, rewarding, and structured. It transforms daily routines into tangible progress through clear feedback loops, celebration cues, and tactile responsiveness.

The aesthetic blends **Modern Tactile Minimalism** with **Gamified Vibrancy**:
- Clean, open white-space structures that prevent sensory overload.
- Energetic chromatic rewards (electric violets, celebratory golds, and crisp emeralds) that punctuate user achievements.
- Micro-delight feedback patterns: squircle progress tracks, glowing milestone markers, and tactile checklist completions.
- Precision hierarchy ensuring core data (streaks, multipliers, completion states) is readable at a single glance.

## Colors

The palette balances clinical clarity with gamified dopamine triggers. The light canvas ensures high daytime legibility, while purposeful saturated accents drive user focus directly to completion states and performance counters.

- **Primary Violet (`#5843E0`, `#6C5CE7`, `#4834D4`)**: The anchor of identity and navigation. Used for master actions, leveling surfaces, app navigation, and high-tier milestone containers.
- **Secondary Electric Cyan/Blue (`#0984E3`, `#00CEC9`, `#3867D6`)**: Interactive state triggers, quick analytics links, active category chips, and secondary CTAs.
- **Success Emerald (`#00B894`, `#10B981`, `#059669`)**: Strictly reserved for completed habit checkmarks, successful day rings, positive trends, and celebratory banner fills.
- **Reward Amber & Flame Orange (`#FFA502`, `#FF7675`, `#F59E0B`)**: Streak flames, XP count displays, level-up celebration bursts, and critical urgent habits.
- **Neutrals & Surfaces (`#F8FAFC`, `#FFFFFF`, `#64748B`, `#0F172A`)**: Base foundation. Clean `#F8FAFC` page background with pure `#FFFFFF` elevated cards, dark slate `#0F172A` headlines, and subdued `#64748B` supporting metadata.

## Typography

Plus Jakarta Sans is specified across all levels for its contemporary geometric geometry, friendly curved terminals, and open counters. This maintains crisp legibility across small mobile checklists as well as dynamic scale in bold dashboard statistics.

- **Numerics & Stats**: Data metrics (streak counters, XP totals, percentages) use `stat-numeric` with tabular figures enabled (`font-variant-numeric: tabular-nums`) to prevent layout shifting during real-time score updates.
- **Labels & Badges**: Gamification badges and pill tags leverage `label-sm` and `label-md` in uppercase or semi-bold case with slight positive letter spacing to maintain visual authority inside compact containers.
- **Scalability**: Headlines gracefully scale down via dedicated mobile variants below the 768px threshold, avoiding awkward word wraps on routine titles and daily summaries.

## Layout & Spacing

The layout operates on an 8pt base grid within a fluid-responsive system that adapts effortlessly between quick mobile check-ins and widescreen analytical dashboards.

- **Desktop (1024px+)**: 12-column grid layout with `gutter` of 1.5rem (24px) and maximum canvas constraint of 1280px. Habit checklists and analytics telemetry reside in an asymmetric 8:4 arrangement.
- **Tablet (768px - 1023px)**: 8-column layout with 1.25rem gutters. Secondary telemetry converts to horizontal sliding carousels above the primary habit stream.
- **Mobile (<768px)**: Single-column stack with `margin-mobile` of 1rem (16px) to maximize touch target width. Primary interactive triggers are sticky-docked along the bottom safe area.
- **Rhythm Rules**: Internal card padding uses `space-md` (16px) on mobile and expands to `space-lg` (24px) on desktop. Item lists adhere strictly to `space-sm` (8px) gaps to reinforce perceived group cohesion.

## Elevation & Depth

Visual hierarchy uses a refined ambient elevation system. Pure white cards float slightly above the `#F8FAFC` foundation, complemented by chromatic glow halos during positive interactions.

- **Base Level (Canvas)**: `#F8FAFC`, zero shadow.
- **Card Level (Surface Rest)**: `#FFFFFF` with a dual-shadow formula: `0 1px 3px rgba(15, 23, 42, 0.04), 0 6px 16px -4px rgba(15, 23, 42, 0.06)`. Edge separation is heightened by a low-opacity border of `1px solid rgba(226, 232, 240, 0.8)`.
- **Raised Interactive (Hover / Focus)**: Elevates with `0 12px 24px -6px rgba(15, 23, 42, 0.08)`. Habit cards tilt up by 1px on hover to signal interactive readiness.
- **Gamified Accent Radiance (Celebration / Active)**:
  - **Streak Flame Focus**: Ambient gold halo using `0 4px 16px rgba(255, 165, 2, 0.25)`.
  - **Completion State**: Subtle emerald halo using `0 4px 16px rgba(0, 184, 148, 0.20)`.
  - **Primary Action**: Violet focus ring and elevation with `0 8px 20px rgba(88, 67, 224, 0.28)`.

## Shapes

The interface embraces a friendly, rounded aesthetic that removes mechanical sharpness in favor of organic momentum.

- **Habit Cards & Core Containers**: Standardized on `rounded-xl` (1.5rem / 24px) to provide a soft, tactile card architecture.
- **Buttons & Interactive Controls**: Formed with `rounded-lg` (1rem / 16px) for solid targets, while compact triggers (pills, badges, category filters) adopt full pill shapes (`rounded-full`).
- **Progress Bars & Check Targets**: Checkmark boxes feature generous `0.625rem` (10px) squircles, matching progress tracks capped with fully rounded pill terminals.

## Components

### Buttons
- **Primary**: Solid `#5843E0` background with pure white text, font weight 600. Features an integrated active scale animation (`scale: 0.98`). Hover introduces a deep violet shadow lift.
- **Success / Complete**: `#00B894` background, white label, paired with a checkmark glyph.
- **Ghost / Neutral**: Transparent with subtle border (`1px solid #E2E8F0`), text in `#334155`. Transitions to `#F1F5F9` on hover.

### Habit Checklist Toggle Cards
- Surface: `#FFFFFF` card with 1rem internal padding and `rounded-xl` border-radius.
- Left zone: Category-tinted iconography within a soft pastel background circle.
- Middle zone: Habit name (`headline-sm`), streak fire badge (`label-sm`), and recurrence frequency.
- Right zone: 44x44px squircle interactive complete target. Unchecked state: neutral border (`2px solid #CBD5E1`). Checked state: transitions to `#00B894` fill with white checkmark and a slight bouncy scale spring. Checked cards dim title text to `#64748B` with a clean strike-through line.

### Streak Counters & Flame Badges
- Encapsulated pill container with background `#FFF7ED` and border `1px solid #FED7AA`.
- Iconography: Saturated fiery orange flame graphic (`#FFA502`).
- Typography: `label-md` in `#C2410C`. Upon milestone increments (e.g., 7-day, 30-day), badge triggers a brief ambient glow.

### XP Progress Bar & Level Meters
- Track: `#E2E8F0` fill, 12px height, full pill radius.
- Indicator: Gradient fill from `#5843E0` to `#00CEC9`. Contains animated shimmering highlight during XP collection events.
- Milestone Node: Squircle indicator floating over the track displaying the next target level in bold micro-type.

### Chips & Pill Filters
- Height: 32px with full pill geometry (`rounded-full`).
- Active State: Filled with `#0984E3` or `#5843E0`, crisp white text.
- Inactive State: `#FFFFFF` background, `1px solid #E2E8F0`, text in `#64748B`. Hover shifts to `#F8FAFC`.

### Form Fields & Inputs
- Height: 48px with `rounded-lg` (1rem).
- Border: `1.5px solid #E2E8F0`. Focus state shifts border directly to `#5843E0` along with a 3px ring of `rgba(88, 67, 224, 0.15)`. Background remains `#FFFFFF`.