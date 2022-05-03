import { Keypair, Transaction, Connection, PublicKey } from "@solana/web3.js";
import { createTransferCheckedInstruction } from "@solana/spl-token";
import * as bs58 from "bs58";

// connection
const connection = new Connection("https://api.devnet.solana.com");

// 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8
const feePayer = Keypair.fromSecretKey(
  bs58.decode("588FU4PktJWfGfxtzpAAXywSNt74AvtroVzGfKkVN1LwRuvHwKGr851uH8czM5qm4iqLbs1kKoMKtMJG4ATR7Ld2")
);
console.log("feePayer:",feePayer)

// G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY
const alice = Keypair.fromSecretKey(
  bs58.decode("2GRQvUUNyD7myW2uPq9XJWoaB6gekuE73tgpnwLtoUXYdW8AFBz6F6Eb5DbUxMgkoGLztR2hpScpnpNXjp8FiwYr")
);
console.log("alice:",alice)
const mintPubkey = new PublicKey("3vvJjVngbyo77EAp6bzJnHJUrqdu65gJ6g2KiKRivRvw");

const tokenAccount1Pubkey = new PublicKey("5qwnQfmsTjLwTsDqtL2wBfuWkybtnA87ShjLZAqeJgea");

const tokenAccount2Pubkey = new PublicKey("9bvp44PqRARXmWzfmR9KjEkrT2vifpC1k5xtbRzwgw3e");

// mint token

(async () => {
  let tx = new Transaction();
  tx.add(
    createTransferCheckedInstruction(
      tokenAccount1Pubkey, // from
      mintPubkey, // mint
      tokenAccount2Pubkey, // to
      alice.publicKey, // from's owner
      1, // amount
      0 // decimals
    )
  );
  console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, alice])}`);
})();
