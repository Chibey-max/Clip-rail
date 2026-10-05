/**
 * Interim ABI fragments written from the frozen interface (PRD §5.1). Replace with the generated
 * ABI from @cliprail/abi once Isaac publishes it (handoff H3); the signatures must not change.
 */
export const vaultAbi = [
  {
    type: "function",
    name: "createCampaign",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "p",
        type: "tuple",
        components: [
          { name: "token", type: "address" },
          { name: "budget", type: "uint128" },
          { name: "cpm", type: "uint128" },
          { name: "maxPerClip", type: "uint128" },
          { name: "maxViewsPerReport", type: "uint64" },
          { name: "minLikeBps", type: "uint16" },
          { name: "holdSecs", type: "uint32" },
          { name: "startsAt", type: "uint64" },
          { name: "endsAt", type: "uint64" },
          { name: "minTier", type: "uint8" },
          { name: "briefHash", type: "bytes32" },
        ],
      },
    ],
    outputs: [{ name: "campaignId", type: "uint256" }],
  },
  {
    type: "function",
    name: "nonces",
    stateMutability: "view",
    inputs: [{ name: "clipper", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
] as const;

export const erc20Abi = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ type: "bool" }],
  },
  { type: "function", name: "name", stateMutability: "view", inputs: [], outputs: [{ type: "string" }] },
  // Circle FiatToken exposes its EIP-712 domain version here ("2").
  { type: "function", name: "version", stateMutability: "view", inputs: [], outputs: [{ type: "string" }] },
] as const;
