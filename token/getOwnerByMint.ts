//@ts-ignore: Object is possibly 'null'.
import {clusterApiUrl,Connection, PublicKey} from '@solana/web3.js';
 

(async () => {
    const connection = new Connection(clusterApiUrl("devnet") );
    const tokenMint = '4GYE2Dj3kiFzviGsSDbmUqPVfxZHtcZjsbqK41VUaaJB'; //Token address 
    const largestAccounts = await connection.getTokenLargestAccounts(new PublicKey(tokenMint));
    const largestAccountInfo = await connection.getParsedAccountInfo(largestAccounts.value[0].address); 

    var tokenStr = JSON.stringify( largestAccountInfo.value) 
    var tokenObj = eval("("+tokenStr+")"); 
    console.log("token info: ",tokenObj);  
    console.log( "owner:", tokenObj.data.parsed.info.owner );  

    
      
 
    
 
    /*
    PublicKey {
        _bn: <BN: 6ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a9>
    }
     */
})();


