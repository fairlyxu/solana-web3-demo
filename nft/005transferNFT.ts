import { clusterApiUrl, Connection, PublicKey, Keypair, Transaction } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount,createTransferCheckedInstruction, TOKEN_PROGRAM_ID, transferChecked } from "@solana/spl-token";
import * as bs58 from "bs58";
import Private_Key from "../config/handleKey";  

(async () => {
  // connection
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // fee payer
  const feePayer = Keypair.fromSecretKey(
    bs58.decode("588FU4PktJWfGfxtzpAAXywSNt74AvtroVzGfKkVN1LwRuvHwKGr851uH8czM5qm4iqLbs1kKoMKtMJG4ATR7Ld2")
    
  );

  // sender  
  const alice = Keypair.fromSecretKey(
    bs58.decode(Private_Key)
  );

  const mintPubkey = new PublicKey("GPhKKPzyKCbCi3sqredBso4PrEGbTyuvPpdxUGr1U1RW");      
 
  const senderPubkey = new PublicKey("5qwnQfmsTjLwTsDqtL2wBfuWkybtnA87ShjLZAqeJgea");
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
 
 
  {
    let txhash = await transferChecked(
      connection, // connection
      feePayer, // payer
      tokenAccountXPubkey.address, // from (should be a token account)
      mintPubkey, // mint
      tokenAccountYPubkey.address, // to (should be a token account)
      alice, // from's owner
      1, // amount, if your deciamls is 8, send 10^8 for 1 token
      0 // decimals
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
 
