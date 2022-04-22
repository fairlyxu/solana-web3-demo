import{_ as n,e as s}from"./app.50ff3e54.js";const a={},p=s(`<h1 id="create-token-account" tabindex="-1"><a class="header-anchor" href="#create-token-account" aria-hidden="true">#</a> Create Token Account</h1><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Keypair<span class="token punctuation">,</span> Transaction<span class="token punctuation">,</span> SystemProgram<span class="token punctuation">,</span> Connection<span class="token punctuation">,</span> PublicKey <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@solana/web3.js&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span>
  <span class="token constant">ACCOUNT_SIZE</span><span class="token punctuation">,</span>
  createAssociatedTokenAccountInstruction<span class="token punctuation">,</span>
  createInitializeAccountInstruction<span class="token punctuation">,</span>
  getAssociatedTokenAddress<span class="token punctuation">,</span>
  getMinimumBalanceForRentExemptAccount<span class="token punctuation">,</span>
  <span class="token constant">TOKEN_PROGRAM_ID</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@solana/spl-token&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> bs58 <span class="token keyword">from</span> <span class="token string">&quot;bs58&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// connection</span>
<span class="token keyword">const</span> connection <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Connection</span><span class="token punctuation">(</span><span class="token string">&quot;https://api.devnet.solana.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8</span>
<span class="token keyword">const</span> feePayer <span class="token operator">=</span> Keypair<span class="token punctuation">.</span><span class="token function">fromSecretKey</span><span class="token punctuation">(</span>
  bs58<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token string">&quot;588FU4PktJWfGfxtzpAAXywSNt74AvtroVzGfKkVN1LwRuvHwKGr851uH8czM5qm4iqLbs1kKoMKtMJG4ATR7Ld2&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY</span>
<span class="token keyword">const</span> alice <span class="token operator">=</span> Keypair<span class="token punctuation">.</span><span class="token function">fromSecretKey</span><span class="token punctuation">(</span>
  bs58<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token string">&quot;4NMwxzmYj2uvHuq8xoqhY8RXg63KSVJM1DXkpbmkUY7YQWuoyQgFnnzn6yo3CMnqZasnNPNuAT2TLwQsCaKkUddp&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> mintPubkey <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PublicKey</span><span class="token punctuation">(</span><span class="token string">&quot;AjMpnWhqrbFPJTQps4wEPNnGuQPMKUcfqHUqAeEf1WM4&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u5275\u5EFAToken Account</span>

<span class="token comment">// \u5982\u679C\u8981\u5728Solana\u4E0A\u6536Token\u7684\u8A71\uFF0C\u6703\u9700\u8981\u5275\u9020\u4E14\u521D\u59CB\u5316\u4E00\u500B\u76F8\u5C0D\u61C9\u7684Token Account</span>
<span class="token comment">// \u63DB\u53E5\u8A71\u8AAA\uFF0C\u5982\u679C\u4F60\u8981\u6536USDC\uFF0C\u4F60\u6703\u9700\u8981\u6E96\u5099\u4E00\u500B\u6536USDC\u7684Account\uFF0C\u5982\u679C\u60F3\u8981\u6536RAY\uFF0C\u4E5F\u662F\u4E00\u6A23\u7684\u3002</span>
<span class="token comment">// \u800C\u9019\u5E7E\u500B\u6536Token\u7684Account\u5728Solana\u88E1\u9762\u90FD\u6703\u662F\u4E0D\u4E00\u6A23\u7684\u5730\u5740 (\u662F\u4E0D\u540C\u7684Account)</span>

<span class="token comment">// \u5275\u5EFAToken Account\u7684\u65B9\u6CD5\u6709\u5169\u7A2E</span>

<span class="token comment">// 1. \u96A8\u6A5F\u7522\u751F</span>
<span class="token comment">// \u9019\u7A2E\u65B9\u6CD5\u7684\u6982\u5FF5\u5C31\u662F\u96A8\u4FBF\u627E\u4E00\u500B\u5730\u5740\uFF0C\u7136\u5F8C\u5C0D\u4ED6\u505AToken Account\u7684\u521D\u59CB\u5316</span>
<span class="token comment">// \u76EE\u524D\u4E0D\u5EFA\u8B70\u4F7F\u7528\u9019\u7A2E\u65B9\u6CD5\uFF0C\u9019\u7A2E\u65B9\u6CD5\u6703\u9020\u6210Token Account\u7BA1\u7406\u4E0A\u7684\u9EBB\u7169 (\u56E0\u70BA\u8981\u8A18\u9304\u8A31\u591A\u4E0D\u540C\u7684Account)</span>
<span class="token comment">// \u73FE\u5728\u6BD4\u8F03\u63A8\u85A6\u80FD\u7528\u7B2C\u4E8C\u7A2E\u65B9\u5F0F\u7522\u751FToken Account</span>

<span class="token comment">// 2. Associated Token Address (ATA)</span>
<span class="token comment">// \u9019\u7A2E\u65B9\u5F0F\u6703\u4F9D\u64DA\u4F60\u7684SOL\u5730\u5740\u63A8\u7B97\u51FA\u4F60\u7684Token Account\u5730\u5740</span>
<span class="token comment">// \u6240\u4EE5\u6BCF\u6B21\u7B97\u51FA\u4F86\u7684\u90FD\u6703\u662F\u4E00\u6A23\u7684\uFF0C\u5728\u7BA1\u7406\u4E0A\u53EA\u9700\u8981\u77E5\u9053SOL\u7684\u5730\u5740\u5C31\u53EF\u4EE5\u77E5\u9053\u4ED6\u7684Token\u5730\u5740</span>

<span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// 1. Random</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">let</span> tokenAccount <span class="token operator">=</span> Keypair<span class="token punctuation">.</span><span class="token function">generate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">ramdom token address: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>tokenAccount<span class="token punctuation">.</span>publicKey<span class="token punctuation">.</span><span class="token function">toBase58</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> tx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Transaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    tx<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>
      <span class="token comment">// create account</span>
      SystemProgram<span class="token punctuation">.</span><span class="token function">createAccount</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        fromPubkey<span class="token operator">:</span> feePayer<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span>
        newAccountPubkey<span class="token operator">:</span> tokenAccount<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span>
        space<span class="token operator">:</span> <span class="token constant">ACCOUNT_SIZE</span><span class="token punctuation">,</span>
        lamports<span class="token operator">:</span> <span class="token keyword">await</span> <span class="token function">getMinimumBalanceForRentExemptAccount</span><span class="token punctuation">(</span>connection<span class="token punctuation">)</span><span class="token punctuation">,</span>
        programId<span class="token operator">:</span> <span class="token constant">TOKEN_PROGRAM_ID</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token comment">// init token account</span>
      <span class="token function">createInitializeAccountInstruction</span><span class="token punctuation">(</span>tokenAccount<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> mintPubkey<span class="token punctuation">,</span> alice<span class="token punctuation">.</span>publicKey<span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">create random token account txhash: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">sendTransaction</span><span class="token punctuation">(</span>tx<span class="token punctuation">,</span> <span class="token punctuation">[</span>feePayer<span class="token punctuation">,</span> tokenAccount<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 2. ATA</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">let</span> ata <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getAssociatedTokenAddress</span><span class="token punctuation">(</span>
      mintPubkey<span class="token punctuation">,</span> <span class="token comment">// mint</span>
      alice<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// owner</span>
      <span class="token boolean">false</span> <span class="token comment">// allow owner off curve</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">ata: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>ata<span class="token punctuation">.</span><span class="token function">toBase58</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> tx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Transaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    tx<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>
      <span class="token function">createAssociatedTokenAccountInstruction</span><span class="token punctuation">(</span>
        feePayer<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// payer</span>
        ata<span class="token punctuation">,</span> <span class="token comment">// ata</span>
        alice<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// owner</span>
        mintPubkey <span class="token comment">// mint</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">create ata txhash: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">sendTransaction</span><span class="token punctuation">(</span>tx<span class="token punctuation">,</span> <span class="token punctuation">[</span>feePayer<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br></div></div>`,2);function t(e,o){return p}var l=n(a,[["render",t],["__file","create-token-account.html.vue"]]);export{l as default};
