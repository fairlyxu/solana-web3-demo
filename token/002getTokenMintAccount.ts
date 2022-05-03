import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { getMint,getAccount  } from "@solana/spl-token";
import {Buffer} from 'buffer';
import BN from 'bn.js';

 

 

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const mint = new PublicKey("B9nexcxVpdBJsohiVmupYadjhggGvsyzTGNxmSvnW1VP");

  const mintAccount = await getMint(connection, mint);
  console.log("mintAccount:" ,mintAccount);

  console.log("mintAccount address:",mintAccount.address.toBase58());
  //console.log(mintAccount.keys("mintAuthority") );
  console.log(mintAccount);

  
 
 
  
  /*
  {
    address: PublicKey {
      _bn: <BN: 7351e5e067cc7cfefef42e78915d3c513edbb8adeeab4d9092e814fe68c39fec>
    },
    mintAuthority: PublicKey {
      _bn: <BN: df30e6ca0981c1a677eed6f7cb46b2aa442ca9b7a10a10e494badea4b9b6944f>
    },
    supply: 0n,
    decimals: 8,
    isInitialized: true,
    freezeAuthority: PublicKey {
      _bn: <BN: df30e6ca0981c1a677eed6f7cb46b2aa442ca9b7a10a10e494badea4b9b6944f>
    }
  }
  */
})();
