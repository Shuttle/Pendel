import{_ as i,c as a,a3 as e,o as t}from"./chunks/framework.C4Vvvhxx.js";const c=JSON.parse('{"title":"Shuttle.Core.Compression","description":"","frontmatter":{},"headers":[],"relativePath":"shuttle-core/shuttle-core-compression.md","filePath":"shuttle-core/shuttle-core-compression.md"}'),n={name:"shuttle-core/shuttle-core-compression.md"};function l(h,s,p,o,r,k){return t(),a("div",null,s[0]||(s[0]=[e(`<h1 id="shuttle-core-compression" tabindex="-1">Shuttle.Core.Compression <a class="header-anchor" href="#shuttle-core-compression" aria-label="Permalink to &quot;Shuttle.Core.Compression&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>PM&gt; Install-Package Shuttle.Core.Compression</span></span></code></pre></div><p>Provides a compression adapter through the <code>ICompressionAlgorithm</code> interface.</p><p>Implementations available in this package:</p><ul><li><code>DeflateCompressionAlgorithm</code></li><li><code>GZipCompressionAlgorithm</code></li><li><code>NullCompressionAlgorithm</code></li></ul><p>There is also an <code>ICompressionService</code> that acts as a central container for all registered <code>ICompressionAlgorithm</code> implementations.</p><h2 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;Configuration&quot;">​</a></h2><p>In order to add compression:</p><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">services.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AddCompression</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre></div><p>This will try to add the <code>CompressionService</code> singleton.</p><p>In order to add specific compression algorithms use the relevant builder calls:</p><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">services.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AddCompression</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">builder</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	builder.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AddGzip</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	builder.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AddDeflate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	builder.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AddNull</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><p>The <code>ICompressionService</code> can be injected into any class that requires compression services:</p><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> algorithm</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> compressionService.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;algorithm-name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> compressed</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> algorithm.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">CompressAsync</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Encoding.UTF8.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GetBytes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;some data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> decompressed</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> algorithm.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">DecompressAsync</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(compressed);</span></span></code></pre></div>`,15)]))}const g=i(n,[["render",l]]);export{c as __pageData,g as default};
