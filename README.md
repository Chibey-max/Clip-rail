# Cliprail

Verified pay-per-view clipping on Monad. Brands fund clipping campaigns in escrow, clippers post YouTube Shorts,
a Chainlink CRE workflow verifies real view counts, and clippers are paid in USDC per verified view after a short
fraud hold. Every payout builds a reputation the clipper owns onchain.

> "Most platforms ask you to trust a view count. We made the view count pay, and the payment is the proof."

Built for **Monad Metropolis**, Track 03 (Social, Attention & Culture). Work in progress, build window Oct 3–13 2026.

## Repo layout

| Path | What | Owner |
|---|---|---|
| `contracts/` | Foundry: `CampaignVault`, `CreatorReputation`, `MockUSDC` | Isaac |
| `cre/` | Chainlink CRE oracle workflow (TypeScript) | David |
| `ops/` | Cloudflare Worker: relayer, YouTube preview, keeper, sandbox | Isaac |
| `indexer/` | Envio HyperIndex (GraphQL for the app) | Patrick |
| `web/` | Next.js app | Patrick (UI), David (accounts and transactions) |
| `packages/abi` | ABIs and `addresses.json` | Isaac |
| `packages/shared` | `claimCode`, `parseVideoId`, EIP-712 types | David |
| `docs/` | Design, bounties, security, gas, device matrix | All |

## Contributing

Branches: `isaac/<topic>`, `david/<topic>`, `patrick/<topic>` → PR → `main` with one review.
Never commit keys or `.env` files. Copy `.env.example` and fill values from the team vault.

## AI tool disclosure

Required by Metropolis Rules §4.1.4. To be completed before submission: list each AI tool used and what it was used for.

## License

MIT
