import{_ as n,e as s}from"./app.50ff3e54.js";const a={},t=s(`<h1 id="get-mint" tabindex="-1"><a class="header-anchor" href="#get-mint" aria-hidden="true">#</a> Get Mint</h1><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Keypair<span class="token punctuation">,</span> Transaction<span class="token punctuation">,</span> SystemProgram<span class="token punctuation">,</span> Connection<span class="token punctuation">,</span> PublicKey <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@solana/web3.js&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> getMint <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@solana/spl-token&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// connection</span>
<span class="token keyword">const</span> connection <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Connection</span><span class="token punctuation">(</span><span class="token string">&quot;https://api.devnet.solana.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> mintPubkey <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PublicKey</span><span class="token punctuation">(</span><span class="token string">&quot;2GouGzZ5Z5s8FJmwPkca8Urma64WBFZ8twRCUbLQARkb&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// fetch mint info</span>

<span class="token comment">// you can get mint informations by a mint address</span>

<span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> mint <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getMint</span><span class="token punctuation">(</span>connection<span class="token punctuation">,</span> mintPubkey<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>mint<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// you will find that the data not include name, symbol, image...</span>
  <span class="token comment">// because in the begin, solana don&#39;t make these data write on chain</span>
  <span class="token comment">// if you want to fetch these info, refer to</span>
  <span class="token comment">// https://github.com/solana-labs/token-list</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div>`,2);function p(e,o){return t}var l=n(a,[["render",p],["__file","get-mint.html.vue"]]);export{l as default};
