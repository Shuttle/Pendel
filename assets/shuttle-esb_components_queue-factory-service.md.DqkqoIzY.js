import{_ as s,c as i,a3 as a,o as t}from"./chunks/framework.C4Vvvhxx.js";const k=JSON.parse('{"title":"Queue Factory Service","description":"","frontmatter":{},"headers":[],"relativePath":"shuttle-esb/components/queue-factory-service.md","filePath":"shuttle-esb/components/queue-factory-service.md"}'),h={name:"shuttle-esb/components/queue-factory-service.md"};function n(r,e,l,o,p,c){return t(),i("div",null,e[0]||(e[0]=[a(`<h1 id="queue-factory-service" tabindex="-1">Queue Factory Service <a class="header-anchor" href="#queue-factory-service" aria-label="Permalink to &quot;Queue Factory Service&quot;">​</a></h1><p>An implementation of the <code>IQueueFactoryService</code> interface is used to manage the queue factories used in Shuttle.Esb.</p><p>The queue factory service should not be swapped out for your own implementation as it is integral to the functioning of Shuttle.Esb and the default implementation should suffice.</p><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h2><h3 id="get" tabindex="-1">Get <a class="header-anchor" href="#get" aria-label="Permalink to &quot;Get&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">IQueueFactory</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> scheme</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">IQueueFactory</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Uri</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> uri</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><p>The method will return an instance of the queue factory registered for the requested <code>scheme</code> in the URI.</p><h3 id="factories" tabindex="-1">Factories <a class="header-anchor" href="#factories" aria-label="Permalink to &quot;Factories&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">IEnumerable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">IQueueFactory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Factories</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre></div><p>Returns the <code>IQueueFactory</code> implementations that the queue factory service is aware of.</p><h3 id="register" tabindex="-1">Register <a class="header-anchor" href="#register" aria-label="Permalink to &quot;Register&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Register</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">IQueueFactory</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> queueFactory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><p>Use this method to explicitly register a queue factory instance.</p><h3 id="contains" tabindex="-1">Contains <a class="header-anchor" href="#contains" aria-label="Permalink to &quot;Contains&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">bool</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Contains</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> scheme</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><p>This method determines whether the queue factory service has a queue factory registered for the given scheme.</p>`,16)]))}const u=s(h,[["render",n]]);export{k as __pageData,u as default};
