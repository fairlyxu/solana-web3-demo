import { clusterApiUrl, Connection, Keypair, Transaction, SystemProgram, PublicKey } from "@solana/web3.js";
import { NATIVE_MINT, getAssociatedTokenAddress, createSyncNativeInstruction, createAccount } from "@solana/spl-token";
import * as bs58 from "bs58";

(async () => {
  // connection
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8
  const feePayer = Keypair.fromSecretKey(
    bs58.decode("588FU4PktJWfGfxtzpAAXywSNt74AvtroVzGfKkVN1LwRuvHwKGr851uH8czM5qm4iqLbs1kKoMKtMJG4ATR7Ld2")
  );

  // G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY
  const alice = Keypair.fromSecretKey(
    bs58.decode("2GRQvUUNyD7myW2uPq9XJWoaB6gekuE73tgpnwLtoUXYdW8AFBz6F6Eb5DbUxMgkoGLztR2hpScpnpNXjp8FiwYr")
  );
   
  var tmp = new PublicKey("B9nexcxVpdBJsohiVmupYadjhggGvsyzTGNxmSvnW1VP")
  // remember to create ATA first
  let ata = await getAssociatedTokenAddress(
    NATIVE_MINT, // mint
    alice.publicKey // owner
  );

  let amount = 1 * 1e9; /* Wrapped SOL's decimals is 9 */

  let tx = new Transaction().add(
    // trasnfer SOL
    SystemProgram.transfer({
      fromPubkey: alice.publicKey,
      toPubkey: ata,
      lamports: amount,
    }),
    // sync wrapped SOL balance
    createSyncNativeInstruction(ata)
  );
  console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, alice])}`);
})();
