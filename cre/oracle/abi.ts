/**
 * Vault reads the oracle needs. `activeClips` returns ActiveClip rows; its exact struct is the oracle's
 * assumption until Isaac's ABI v0 lands (handoff H3). If his differs, change this file and logic.ts's
 * ActiveClip only.
 */
export const vaultReadAbi = [
  {
    type: "function",
    name: "lastRound",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint64" }],
  },
  {
    type: "function",
    name: "activeClips",
    stateMutability: "view",
    inputs: [
      { name: "offset", type: "uint256" },
      { name: "limit", type: "uint256" },
    ],
    outputs: [
      {
        type: "tuple[]",
        components: [
          { name: "clipId", type: "uint256" },
          { name: "campaignId", type: "uint256" },
          { name: "clipper", type: "address" },
          { name: "videoId", type: "string" },
          { name: "status", type: "uint8" },
          { name: "lastViews", type: "uint64" },
          { name: "lastLikes", type: "uint64" },
        ],
      },
    ],
  },
] as const;
