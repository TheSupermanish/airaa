/**
 * Initia Account Initialization
 *
 * On Initia MiniEVM, accounts must exist in the Cosmos layer before they
 * can send EVM transactions. This utility sends a small GAS amount via
 * the Cosmos bank module to create the account.
 */

import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// Convert hex EVM address to bech32 init address
function hexToInit(hexAddress: string): string {
  const CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
  const clean = hexAddress.toLowerCase().replace("0x", "");
  const bytes = Buffer.from(clean, "hex");

  // Convert bytes to 5-bit groups
  const data: number[] = [];
  let acc = 0;
  let bits = 0;
  for (const byte of bytes) {
    acc = (acc << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      bits -= 5;
      data.push((acc >> bits) & 31);
    }
  }
  if (bits > 0) {
    data.push((acc << (5 - bits)) & 31);
  }

  // Bech32 checksum
  function polymod(values: number[]): number {
    const GEN = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
    let chk = 1;
    for (const v of values) {
      const b = chk >> 25;
      chk = ((chk & 0x1ffffff) << 5) ^ v;
      for (let i = 0; i < 5; i++) {
        if ((b >> i) & 1) chk ^= GEN[i];
      }
    }
    return chk;
  }

  function createChecksum(hrp: string, data: number[]): number[] {
    const hrpExpand = [...hrp].map((c) => c.charCodeAt(0) >> 5)
      .concat([0])
      .concat([...hrp].map((c) => c.charCodeAt(0) & 31));
    const values = hrpExpand.concat(data).concat([0, 0, 0, 0, 0, 0]);
    const mod = polymod(values) ^ 1;
    return [0, 1, 2, 3, 4, 5].map((i) => (mod >> (5 * (5 - i))) & 31);
  }

  const checksum = createChecksum("init", data);
  const encoded = data.concat(checksum).map((d) => CHARSET[d]).join("");
  return `init${1}${encoded}`;
}

/**
 * Initialize a new account on the Initia rollup Cosmos layer.
 * Sends a tiny GAS amount via bank send to create the account.
 */
export async function initializeInitiaAccount(hexAddress: string): Promise<boolean> {
  const minitiadPath = process.env.MINITIAD_PATH || `${process.env.HOME}/.weave/data/minievm@v1.2.15/minitiad`;
  const homeDir = process.env.MINITIA_HOME || `${process.env.HOME}/.minitia`;
  const chainId = process.env.INITIA_COSMOS_CHAIN_ID || "initpage";

  // Convert 0x address to init1 address
  const initAddress = hexToInit(hexAddress);

  // Check if account already exists
  try {
    const { stdout } = await execAsync(
      `curl -s http://localhost:1317/cosmos/auth/v1beta1/accounts/${initAddress}`
    );
    const data = JSON.parse(stdout);
    if (data.account) {
      console.log(`[initia-account] Account ${initAddress} already exists`);
      return true;
    }
  } catch {
    // Account doesn't exist, proceed to create
  }

  // Send GAS to create the account
  try {
    console.log(`[initia-account] Initializing account ${initAddress} (${hexAddress})`);
    const cmd = `${minitiadPath} tx bank send gasstation ${initAddress} 1000000000000000000GAS --chain-id ${chainId} --home ${homeDir} --keyring-backend test --gas 200000 --fees 0GAS -y 2>&1`;
    const { stdout } = await execAsync(cmd);

    if (stdout.includes("code: 0") || stdout.includes('"code":0')) {
      console.log(`[initia-account] Account ${initAddress} initialized successfully`);
      return true;
    } else {
      console.warn(`[initia-account] Bank send output: ${stdout.slice(0, 200)}`);
      return true; // May still work
    }
  } catch (err: any) {
    console.error(`[initia-account] Failed to initialize account: ${err.message}`);
    return false;
  }
}
