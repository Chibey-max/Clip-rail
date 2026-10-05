# contracts

Foundry project (foundry-monad template, solc 0.8.28, OpenZeppelin v5.1.0, forge-std v1.9.4). Owner: Isaac.
Playbook tasks I-0.2 onward.

```
src/CampaignVault.sol            escrow, registry, report rules, hold, flags, release
src/CreatorReputation.sol        vault-only stats and tiers
src/interfaces/                  ICampaignVault, ICreatorReputation (frozen interface, PRD §5 + playbook §C)
src/cre/                         Chainlink ReceiverTemplate, IReceiver, IERC165 (verbatim from the CRE docs)
src/mocks/MockUSDC.sol           6 decimals, permit, mint ≤ 10k per call
script/Deploy.s.sol              Reputation → Vault → setVault → allow tokens
scripts/export-abi.sh            out/ → packages/abi/*.json
```

```bash
git submodule update --init --recursive
forge build && forge test
FOUNDRY_PROFILE=ci forge test        # ≥ 10k fuzz runs
./scripts/export-abi.sh
```
