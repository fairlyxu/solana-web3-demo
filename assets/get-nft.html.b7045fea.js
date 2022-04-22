import{_ as n,e as s}from"./app.50ff3e54.js";const a={},p=s(`<h1 id="get-nft" tabindex="-1"><a class="header-anchor" href="#get-nft" aria-hidden="true">#</a> Get NFT</h1><h2 id="does-a-wallet-has-a-specific-nft" tabindex="-1"><a class="header-anchor" href="#does-a-wallet-has-a-specific-nft" aria-hidden="true">#</a> Does A Wallet Has A Specific NFT</h2><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">TOKEN_PROGRAM_ID</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@solana/spl-token&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Connection <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@solana/web3.js&quot;</span><span class="token punctuation">;</span>

<span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> connection <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Connection</span><span class="token punctuation">(</span><span class="token string">&quot;https://solana-api.projectserum.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
    <span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">getProgramAccounts</span><span class="token punctuation">(</span><span class="token constant">TOKEN_PROGRAM_ID</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      filters<span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          dataSize<span class="token operator">:</span> <span class="token number">165</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          memcmp<span class="token operator">:</span> <span class="token punctuation">{</span>
            offset<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            bytes<span class="token operator">:</span> <span class="token string">&quot;your mint address here&quot;</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          memcmp<span class="token operator">:</span> <span class="token punctuation">{</span>
            offset<span class="token operator">:</span> <span class="token number">32</span><span class="token punctuation">,</span>
            bytes<span class="token operator">:</span> <span class="token string">&quot;your owner address here&quot;</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          memcmp<span class="token operator">:</span> <span class="token punctuation">{</span>
            offset<span class="token operator">:</span> <span class="token number">64</span><span class="token punctuation">,</span>
            bytes<span class="token operator">:</span> <span class="token string">&quot;Ahg1opVcGX&quot;</span><span class="token punctuation">,</span> <span class="token comment">// bs58 for [1,0,0,0,0,0,0,0], it is a byte array for u64 little endian</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      dataSlice<span class="token operator">:</span> <span class="token punctuation">{</span>
        offset<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        length<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div>`,3);function t(e,o){return p}var l=n(a,[["render",t],["__file","get-nft.html.vue"]]);export{l as default};
