import { clusterApiUrl, Connection, Keypair, Transaction, SystemProgram } from "@solana/web3.js";
import {
  createInitializeMintInstruction,
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  getMinimumBalanceForRentExemptMint,
  createMint,
} from "@solana/spl-token";
import * as bs58 from "bs58";
import Private_Key from "../config/handleKey";  


(async () => { 
  // connection
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8
  const feePayer = Keypair.fromSecretKey(
    bs58.decode("588FU4PktJWfGfxtzpAAXywSNt74AvtroVzGfKkVN1LwRuvHwKGr851uH8czM5qm4iqLbs1kKoMKtMJG4ATR7Ld2")
  );
 
  // token creator
  const alice = Keypair.fromSecretKey(
    bs58.decode(Private_Key)
  );

  // 1) use build-in function
  let mintPubkey = await createMint(
    connection, // conneciton
    feePayer, // fee payer
    alice.publicKey, // mint authority
    alice.publicKey, // freeze authority (you can use `null` to disable it. when you disable it, you can't turn it on again)
    20 // decimals
  );
  console.log(`mint: ${mintPubkey.toBase58()}`,mintPubkey,alice.publicKey.toBase58()); 
})();


/*
mint publicKey: 
H3X8TLyy8agrUyVy1zBUh6iDLhYi19knEuk3JbXKwxaP
Ay87vN7TNMSFPAqzwHQsPGUvgJiWkeieDraDF23N3tjb
Fg74Br32asbEoFPjbD7KskUSknWtDCsAkw5doE64McUF
B9nexcxVpdBJsohiVmupYadjhggGvsyzTGNxmSvnW1VP
HvsvtYeBs1RxYuh73W9QCWdNZXMBrdhXznXWxUNUCwAL

*/
