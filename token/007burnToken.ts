import { clusterApiUrl, Connection, PublicKey, Keypair, Transaction } from "@solana/web3.js";
import { burnChecked, createBurnCheckedInstruction, TOKEN_PROGRAM_ID,getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
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

 
 const mintPubkey = new PublicKey("B9nexcxVpdBJsohiVmupYadjhggGvsyzTGNxmSvnW1VP");  //token address

 let tokenAccountPubkey = await getOrCreateAssociatedTokenAccount(
   connection, // connection
   feePayer, // fee payer
   mintPubkey, // mint
   alice.publicKey // owner,
 ); 
 console.log("Token Account: ",tokenAccountPubkey.address.toBase58());



  // 1) use build-in function
  {
    let txhash = await burnChecked(
      connection, // connection
      feePayer, // payer
      tokenAccountPubkey.address, // token account
      mintPubkey, // mint
      alice, // owner
      1e8, // amount, if your deciamls is 8, 10^8 for 1 token
      8
    );
    console.log(`txhash: ${txhash}`);
  }

  // or 
  // 2) compose by yourself
/*  {
    let tx = new Transaction().add(
      createBurnCheckedInstruction(
        tokenAccountPubkey, // token account
        mintPubkey, // mint
        alice.publicKey, // owner of token account
        1e8, // amount, if your deciamls is 8, 10^8 for 1 token
        8 // decimals
      )
    );
    console.log(`txhash: ${await connection.sendTransaction(tx, 
      [feePayer, alice //fee payer + token authority 
     ])}`);
  }*/
})();
