/**
 * Transaction plumbing (playbook D-1.4). Monad bills the gas LIMIT, not the gas used, so every
 * transaction gets an explicit limit of estimateGas × 1.15 instead of a wallet-style fallback.
 */
import {
  BaseError,
  ContractFunctionRevertedError,
  createWalletClient,
  http,
  type Hex,
  type LocalAccount,
} from "viem";
import { chain, publicClient } from "@/lib/chains";
import type { Address } from "@/lib/types";

const GAS_BUFFER_BPS = 11_500n; // ×1.15

export function walletClientFor(account: LocalAccount) {
  return createWalletClient({ account, chain, transport: http() });
}

export interface TxRequest {
  to: Address;
  data?: Hex;
  value?: bigint;
}

/** estimate × 1.15 → explicit gas → send → wait for the receipt. Throws if the transaction reverts. */
export async function sendTx(account: LocalAccount, req: TxRequest): Promise<Hex> {
  const client = publicClient();
  const estimate = await client.estimateGas({ account, ...req });
  const gas = (estimate * GAS_BUFFER_BPS) / 10_000n;
  const hash = await walletClientFor(account).sendTransaction({ ...req, gas, chain });
  const receipt = await client.waitForTransactionReceipt({ hash });
  if (receipt.status !== "success") throw new Error("The transaction failed on chain.");
  return hash;
}

/** Short, user-facing text for a failed write. Prefers the contract's revert reason. */
export function txErrorMessage(error: unknown): string {
  if (error instanceof BaseError) {
    const revert = error.walk((e) => e instanceof ContractFunctionRevertedError);
    if (revert instanceof ContractFunctionRevertedError) {
      return revert.data?.errorName ?? revert.reason ?? "The contract rejected this transaction.";
    }
    if (/insufficient funds/i.test(error.message)) return "Not enough MON to pay for gas.";
    return error.shortMessage;
  }
  return error instanceof Error ? error.message : "Something went wrong.";
}
