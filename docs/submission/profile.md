# Project profile copy (P-9.2): draft

**Name:** Cliprail

**Tagline:** Get paid for every verified view.

**Track:** Track 03, Social, Attention & Culture

**Short description (1–2 sentences):**
Cliprail is a clipping marketplace on Monad where brands lock budgets in escrow and clippers are paid in USDC per verified
YouTube Shorts view. Chainlink CRE verifies real views, fraud rules run onchain, and every payout builds a reputation the
clipper owns.

**Long description:**
Clipping (cutting long videos into viral Shorts) is a fast-growing creator economy, with much of the workforce in Nigeria
and India. It runs on trust that fails both sides: clippers wait weeks for payouts and see budgets run dry after they post;
brands pay for bot views. Cliprail fixes the money flow. A brand funds a campaign in a Monad escrow contract with a rate per
1,000 views, a per-clip cap, a like-ratio floor, a velocity cap and a hold window. Clippers sign in with a passkey (Mera),
put a claim code in their Short and register it without paying gas. A Chainlink CRE workflow reads real view and like
counts from YouTube with oracle consensus and writes reports onchain; the vault applies every rule, reserves earnings
immediately and pays out after the hold, while brands can flag suspicious clips. Every paid view updates an onchain
reputation that only the escrow can write, which gates premium campaigns. Envio indexes everything for the app. We ran a
real campaign on mainnet during the hackathon with real clippers and real payouts.

**Built with:** Monad, Chainlink CRE, Mera passkeys, Envio HyperIndex, USDC, Next.js, Foundry, Cloudflare Workers.

**Links:** app · judge sandbox · repo · demo video · mainnet contracts · live campaign

**Screenshots (5):** landing with live totals · campaign page · clip registration with green checks · clipper earnings · brand console
