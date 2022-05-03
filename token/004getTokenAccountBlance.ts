import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const tokenAccount = new PublicKey("6gjAtv2Wi6Ed7F8Jis4vaJDYXLUfqgj62HsBcuiF7Z62");

  let tokenAmount = await connection.getTokenAccountBalance(tokenAccount);
  console.log(`amount: ${tokenAmount.value.amount}`)
  console.log(`decimals: ${tokenAmount.value.decimals}`)
})();
