import{_ as n,e as s}from"./app.50ff3e54.js";const a={},p=s(`<h1 id="use-nonce" tabindex="-1"><a class="header-anchor" href="#use-nonce" aria-hidden="true">#</a> Use Nonce</h1><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>
  Keypair<span class="token punctuation">,</span>
  Transaction<span class="token punctuation">,</span>
  SystemProgram<span class="token punctuation">,</span>
  Connection<span class="token punctuation">,</span>
  <span class="token constant">NONCE_ACCOUNT_LENGTH</span><span class="token punctuation">,</span>
  sendAndConfirmTransaction<span class="token punctuation">,</span>
  PublicKey<span class="token punctuation">,</span>
  NonceAccount<span class="token punctuation">,</span>
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@solana/web3.js&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">CONNECTION</span><span class="token punctuation">,</span> <span class="token constant">FEE_PAYER</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;../../../helper/const&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// \u4F7F\u7528nonce\u6A5F\u5236</span>

<span class="token comment">// \u525B\u525B\u7522\u7684nonce account</span>
<span class="token keyword">const</span> nonceAccountPubkey <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PublicKey</span><span class="token punctuation">(</span><span class="token string">&quot;2ZKe8GmRAqFRj3AvVSFBTLHNNrH1uB23hwjHV3CzJGmf&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u9019\u908A\u7528transfer\u7576\u4F5C\u4F7F\u7528nonce\u6A5F\u5236\u7684\u7BC4\u4F8Btx</span>

  <span class="token comment">// \u96A8\u4FBF\u7522\u4E00\u500Bto\u7684address</span>
  <span class="token keyword">let</span> to <span class="token operator">=</span> Keypair<span class="token punctuation">.</span><span class="token function">generate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// \u5275\u5EFAtx</span>
  <span class="token keyword">let</span> tx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Transaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  tx<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>
    <span class="token comment">// nonce advance\u7684\u64CD\u4F5C\u4E00\u5B9A\u8981\u5728\u7B2C\u4E00\u500Binstruction</span>
    SystemProgram<span class="token punctuation">.</span><span class="token function">nonceAdvance</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      noncePubkey<span class="token operator">:</span> nonceAccountPubkey<span class="token punctuation">,</span>
      authorizedPubkey<span class="token operator">:</span> <span class="token constant">FEE_PAYER</span><span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// \u5F8C\u9762\u653E\u539F\u672C\u60F3\u8981\u505A\u7684\u64CD\u4F5C</span>
    SystemProgram<span class="token punctuation">.</span><span class="token function">transfer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      fromPubkey<span class="token operator">:</span> <span class="token constant">FEE_PAYER</span><span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span>
      toPubkey<span class="token operator">:</span> to<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span>
      lamports<span class="token operator">:</span> <span class="token number">1e8</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// \u9019\u88E1\u5E36nonce account\u88E1\u9762\u5B58\u7684nonce</span>
  tx<span class="token punctuation">.</span>recentBlockhash <span class="token operator">=</span> <span class="token string">&quot;EFtM4FKWZS8WUPd7VFW2Lukzk2KEgCucibrjF2jZDPyZ&quot;</span><span class="token punctuation">;</span>
  tx<span class="token punctuation">.</span>feePayer <span class="token operator">=</span> <span class="token constant">FEE_PAYER</span><span class="token punctuation">.</span>publicKey<span class="token punctuation">;</span>
  tx<span class="token punctuation">.</span><span class="token function">sign</span><span class="token punctuation">(</span><span class="token constant">FEE_PAYER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">let</span> rawtx <span class="token operator">=</span> tx<span class="token punctuation">.</span><span class="token function">serialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">txhash: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">await</span> <span class="token constant">CONNECTION</span><span class="token punctuation">.</span><span class="token function">sendRawTransaction</span><span class="token punctuation">(</span>rawtx<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// \u8981\u6CE8\u610F\u6BCF\u6B21nonce advance\u4E4B\u5F8C\uFF0Cnonce account\u5B58\u7684nonce\u5C31\u4E0D\u4E00\u6A23\u4E86</span>
  <span class="token comment">// \u5982\u679C\u6709\u60F3\u8981\u518D\u6B21\u4F7F\u7528\uFF0C\u9700\u8981\u518D\u53BB\u62FF\u4E00\u6B21nonce</span>
<span class="token punctuation">}</span>

<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> process<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
    process<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br></div></div>`,2);function t(e,c){return p}var l=n(a,[["render",t],["__file","use-nonce.html.vue"]]);export{l as default};
