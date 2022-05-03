import { clusterApiUrl, Connection, PublicKey, Keypair, Transaction } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, createTransferCheckedInstruction, TOKEN_PROGRAM_ID, transferChecked } from "@solana/spl-token";
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

  const mintPubkey = new PublicKey("Ay87vN7TNMSFPAqzwHQsPGUvgJiWkeieDraDF23N3tjb");
  const senderPubkey = alice.publicKey;
  const recivePubkey = new PublicKey("EtFg2LC6y9i4U4fYWEESXischtRcJnxNYfrMQRxagX41");
   

 let tokenAccountXPubkey = await getOrCreateAssociatedTokenAccount(
      connection, // connection
      feePayer, // fee payer
      mintPubkey, // mint
      senderPubkey // owner,
    ); 
 console.log("sender account : ",tokenAccountXPubkey.address.toBase58()); 
 

  let tokenAccountYPubkey = await getOrCreateAssociatedTokenAccount(
    connection, // connection
    feePayer, // fee payer
    mintPubkey, // mint
    recivePubkey // owner,
  ); 
  console.log("recieve account : ",tokenAccountYPubkey.address.toBase58());

  // 1) use build-in function
  {
    let txhash = await transferChecked(
      connection, // connection
      feePayer, // payer
      tokenAccountXPubkey.address, // from (should be a token account)
      mintPubkey, // mint
      tokenAccountYPubkey.address, // to (should be a token account)
      alice, // from's owner
      1e8, // amount, if your deciamls is 8, send 10^8 for 1 token
      8 // decimals
    );
    console.log(`txhash: ${txhash}`);
  }

  // or
/*
  // 2) compose by yourself
  {
    let tx = new Transaction().add(
      createTransferCheckedInstruction(
        tokenAccountXPubkey, // from (should be a token account)
        mintPubkey, // mint
        tokenAccountYPubkey, // to (should be a token account)
        alice.publicKey, // from's owner
        1e8, // amount, if your deciamls is 8, send 10^8 for 1 token
        8 // decimals
      )
    );
    console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, alice ])}`);
  }*/
})();
