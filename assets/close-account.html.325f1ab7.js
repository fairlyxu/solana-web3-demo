import{_ as n,e as s}from"./app.50ff3e54.js";const a={},p=s(`<h1 id="close-account" tabindex="-1"><a class="header-anchor" href="#close-account" aria-hidden="true">#</a> Close Account</h1><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> PublicKey<span class="token punctuation">,</span> Connection<span class="token punctuation">,</span> Transaction <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@solana/web3.js&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">CONNECTION</span><span class="token punctuation">,</span> <span class="token constant">ALICE</span><span class="token punctuation">,</span> <span class="token constant">TEST_MINT</span><span class="token punctuation">,</span> <span class="token constant">FEE_PAYER</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;../../../helper/const&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">ASSOCIATED_TOKEN_PROGRAM_ID</span><span class="token punctuation">,</span> <span class="token constant">TOKEN_PROGRAM_ID</span><span class="token punctuation">,</span> <span class="token constant">NATIVE_MINT</span><span class="token punctuation">,</span> Token <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@solana/spl-token&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// close token account</span>
<span class="token comment">// \u7576\u67D0\u500Btoken account\u4F60\u4E0D\u60F3\u8981\u518D\u4F7F\u7528\u4E86\uFF0C\u4F60\u53EF\u4EE5\u4F7F\u7528\u6B64\u64CD\u4F5C\u628A\u88E1\u9762\u7684rent\u56DE\u6536\u3002</span>
<span class="token comment">// \u4F46\u5728close\u7684\u6642\u5019\u6703\u56E0\u70BAmint\u4E0D\u540C\u800C\u6709\u4E0D\u540C\u9650\u5236</span>
<span class="token comment">// 1. \u5982\u679C\u662F wrapped SOL, \u4F60\u53EF\u4EE5\u76F4\u63A5close, \u6C92\u6709\u9650\u5236</span>
<span class="token comment">// 2. \u5982\u679C\u662F \u5176\u4ED6\u7684mint(USDC, SRM ...), \u4F60\u9700\u8981\u5148\u628Atoken\u90FD\u8F49\u51FA\uFF0C\u8B93token balance\u8B8A\u62100\u4E4B\u5F8C\u624D\u80FDclose</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> tx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Transaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  tx<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>
    Token<span class="token punctuation">.</span><span class="token function">createCloseAccountInstruction</span><span class="token punctuation">(</span>
      <span class="token constant">TOKEN_PROGRAM_ID</span><span class="token punctuation">,</span> <span class="token comment">// \u5B9A\u503C</span>
      <span class="token keyword">new</span> <span class="token class-name">PublicKey</span><span class="token punctuation">(</span><span class="token string">&quot;Dmysc2pPCGQSzkgkMtcZAtGFzYa7DzohqBxh7aF1YxG3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// \u8981\u56DE\u6536\u7684token account</span>
      <span class="token constant">ALICE</span><span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// rent\u8981\u56DE\u6536\u7684\u5730\u5740</span>
      <span class="token constant">ALICE</span><span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// token account authority</span>
      <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// multisig</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  tx<span class="token punctuation">.</span>feePayer <span class="token operator">=</span> <span class="token constant">FEE_PAYER</span><span class="token punctuation">.</span>publicKey<span class="token punctuation">;</span>

  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">txhash: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">await</span> <span class="token constant">CONNECTION</span><span class="token punctuation">.</span><span class="token function">sendTransaction</span><span class="token punctuation">(</span>tx<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token constant">ALICE</span><span class="token punctuation">,</span> <span class="token constant">FEE_PAYER</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> process<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
    process<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div>`,2);function t(c,o){return p}var l=n(a,[["render",t],["__file","close-account.html.vue"]]);export{l as default};
