import { clusterApiUrl, Connection, PublicKey, Keypair, Transaction, SystemProgram } from "@solana/web3.js";
import {getOrCreateAssociatedTokenAccount,
  createAssociatedTokenAccount,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
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

  const mintPubkey = new PublicKey("Ay87vN7TNMSFPAqzwHQsPGUvgJiWkeieDraDF23N3tjb"); // token mint address

  // 1) use build-in function
  {
    let ata = await getOrCreateAssociatedTokenAccount(
      connection, // connection
      feePayer, // fee payer
      mintPubkey, // mint
      alice.publicKey // owner,
    );
    //console.log(`ATA: ${ata.toBase58()}`);
    console.log("ATA: ", ata);
    console.log("Token Account: ",ata.address.toBase58());
  }

  // or

  /* 
  // 2) composed by yourself
  {
    // calculate ATA
    let ata = await getAssociatedTokenAddress(
      mintPubkey, // mint
      alice.publicKey // owner
    );
    console.log(`ATA: ${ata.toBase58()}`);

    // if your wallet is off-curve, you should use
    // let ata = await getAssociatedTokenAddress(
    //   mintPubkey, // mint
    //   alice.publicKey // owner
    //   true, // allowOwnerOffCurve
    // );
    
 
    let tx = new Transaction().add(
      createAssociatedTokenAccountInstruction(
        feePayer.publicKey, // payer
        ata, // ata
        alice.publicKey, // owner
        mintPubkey // mint
      )
    );
    console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer])}`);
  }*/
})();
