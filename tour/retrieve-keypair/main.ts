
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as bs58 from "bs58";

// connection
const connection = new Connection("https://api.devnet.solana.com");


 

(async () => {
    // 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8
const feePayer = Keypair.fromSecretKey(
    bs58.decode("36w2jNiCednshhe8iwsYy1BcaLnM59HGMnpQgKgGLvq53wWBQaedX4U5F4JYVAn4GsibhAFJdXgnBAFNk4e9QnKF")
  );
  console.log(feePayer)
  let balance = await connection.getBalance(feePayer.publicKey);
  console.log(`${balance / LAMPORTS_PER_SOL} SOL`);
})();
