const web3 = require('@solana/web3.js');

(async () => {
  const solana = new web3.Connection("https://api.mainnet-beta.solana.com");

//the public solana address
  const accountPublicKey = new web3.PublicKey(
    "5qwnQfmsTjLwTsDqtL2wBfuWkybtnA87ShjLZAqeJgea"
  );

//mintAccount = the token mint address
  const mintAccount = new web3.PublicKey(
    "4GYE2Dj3kiFzviGsSDbmUqPVfxZHtcZjsbqK41VUaaJB"
  );
  const account = await solana.getTokenAccountsByOwner(accountPublicKey, {
      mint: mintAccount});

      console.log(account.value[0].pubkey.toString());

})();
