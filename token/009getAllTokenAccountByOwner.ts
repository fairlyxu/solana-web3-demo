import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"; 

(async () => {
  // connection
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const owner = new PublicKey("5qwnQfmsTjLwTsDqtL2wBfuWkybtnA87ShjLZAqeJgea");
  let response = await connection.getParsedTokenAccountsByOwner(owner, { programId: TOKEN_PROGRAM_ID });

  response.value.forEach((accountInfo) => {
    console.log(`pubkey: ${accountInfo.pubkey.toBase58()}`)
    console.log(`mint: ${accountInfo.account.data["parsed"]["info"]["mint"]}`);
    console.log(`owner: ${accountInfo.account.data["parsed"]["info"]["owner"]}`);
    console.log(`decimals: ${accountInfo.account.data["parsed"]["info"]["tokenAmount"]["decimals"]}`);
    console.log(`amount: ${accountInfo.account.data["parsed"]["info"]["tokenAmount"]["amount"]}`);
    console.log("====================")
  });


  console.log("*******************************")



  // filter by mint
  const mint = new PublicKey("4GYE2Dj3kiFzviGsSDbmUqPVfxZHtcZjsbqK41VUaaJB"); 
  let response1 = await connection.getParsedTokenAccountsByOwner(owner, { mint: mint });

  response1.value.forEach((accountInfo) => {
    console.log(`pubkey: ${accountInfo.pubkey.toBase58()}`);
    console.log(`mint: ${accountInfo.account.data["parsed"]["info"]["mint"]}`);
    console.log(`owner: ${accountInfo.account.data["parsed"]["info"]["owner"]}`);
    console.log(`decimals: ${accountInfo.account.data["parsed"]["info"]["tokenAmount"]["decimals"]}`);
    console.log(`amount: ${accountInfo.account.data["parsed"]["info"]["tokenAmount"]["amount"]}`);
    console.log("====================");
  });

})();
