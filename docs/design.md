# Cliprail design spec (P-0.2)

Mobile-first: most clippers will use a phone. Design at 360 px first, then scale to desktop.
Dark theme by default. The product is about money, so numbers must be clear and never faked.

## Colour tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0B0A10` | Page background |
| `--surface` | `#15131D` | Cards, modals |
| `--surface-2` | `#1E1B29` | Inputs, table rows on hover |
| `--border` | `#2A2638` | Borders, dividers |
| `--text` | `#F4F2FA` | Primary text |
| `--text-muted` | `#A39FB5` | Secondary text, labels |
| `--accent` | `#7C5CFF` | Primary actions, links, focus rings (Monad-adjacent purple) |
| `--accent-fg` | `#FFFFFF` | Text on accent |
| `--money` | `#2BD98A` | Verified and paid amounts only |
| `--holding` | `#F5B83D` | Amounts in the hold window |
| `--danger` | `#FF5A6E` | Flagged, rejected, errors |
| `--info` | `#5AB4FF` | Pending, informational |

Rule: green is reserved for money that is verified or paid. Never use it for decoration.

## Typography

- Font: Inter (via `next/font`), tabular figures (`font-variant-numeric: tabular-nums`) for every amount and count.
- Scale: 12 / 14 / 16 (body) / 20 / 24 / 32 / 48 (hero numbers).
- Amounts: `$12.40` style with two decimals; views with thousands separators (`152,300`).

## Spacing and shape

- 4 px base grid. Card padding 16 (mobile) / 24 (desktop).
- Radius: 12 for cards, 10 for buttons and inputs, 999 for badges.
- Tap targets at least 44 px tall.

## Components

| Component | Variants and states | Notes |
|---|---|---|
| Button | primary, secondary, ghost, danger · idle, loading, disabled | Loading shows a spinner and keeps the label width |
| Card | default, interactive (hover lift) | |
| Badge (clip/campaign status) | Pending (info), Active (accent), Flagged (danger), Rejected (danger, muted), Ended (muted), Closed (muted) | Text plus colour, never colour alone |
| Tier badge | Tier 0 New, Tier 1, Tier 2 | |
| Stat tile | label, value, optional delta | Value uses tabular figures |
| Budget meter | stacked bar: paid (money) / reserved (holding) / free (border) | Legend with exact amounts underneath |
| Counter | animates from old to new value when a new receipt arrives | Only animates on real onchain changes. Never ticks on a timer |
| Table | dense on desktop, collapses to stacked rows on mobile | |
| Empty state | icon, one sentence, one action | Every list needs one |
| Toast | success (with explorer tx link), error, info | |
| Modal | Radix Dialog | Auth modal uses it |
| Stepper | for the brand wizard (4 steps) and clip registration (3 steps) | |
| Address chip | shortened `0x1234…abcd`, copy button, explorer link | |
| Tx link | opens MonadVision in a new tab | |
| Receipt row | round, views delta, amount, unlock time or "paid", tx link | |
| Claim code box | large monospace code, copy button, "paste this in your Short's description" | The most important UI for clippers |

## Copy rules

- Never say "blockchain", "gas" or "wallet" to clippers on the main path. Say "account", "verified", "paid".
- Always show which numbers are verified onchain and which are live but unverified, side by side and labelled.
