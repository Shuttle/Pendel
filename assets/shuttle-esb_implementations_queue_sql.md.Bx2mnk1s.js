import { _ as _export_sfc, c as createElementBlock, o as openBlock, a4 as createStaticVNode } from "./chunks/framework.CfygL32k.js";
const __pageData = JSON.parse('{"title":"SQL","description":"","frontmatter":{},"headers":[],"relativePath":"shuttle-esb/implementations/queue/sql.md","filePath":"shuttle-esb/implementations/queue/sql.md"}');
const _sfc_main = { name: "shuttle-esb/implementations/queue/sql.md" };
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="sql" tabindex="-1">SQL <a class="header-anchor" href="#sql" aria-label="Permalink to &quot;SQL&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>PM&gt; Install-Package Shuttle.Esb.Sql.Queue</span></span></code></pre></div><p>Sql RDBMS implementation of the <code>IQueue</code> interface for use with Shuttle.Esb which creates a table for each required queue.</p><h2 id="supported-providers" tabindex="-1">Supported providers <a class="header-anchor" href="#supported-providers" aria-label="Permalink to &quot;Supported providers&quot;">​</a></h2><p>Currently only the <code>System.Data.SqlClient</code> and <code>Microsoft.Data.SqlClient</code> provider names are supported but this can easily be extended. Feel free to give it a bash and please send a pull request if you <em>do</em> go this route. You are welcome to create an issue and assistance will be provided where able.</p><h2 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;Configuration&quot;">​</a></h2><p>TThe URI structure is <code>sql://configuration-name/queue-name</code>.</p><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">services.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AddDataAccess</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">builder</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	builder.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AddConnectionString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;shuttle&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;System.Data.SqlClient&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;server=.;database=shuttle;user id=sa;password=Pass!000&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">services.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AddSqlQueue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">builder</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	builder.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AddOptions</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;shuttle&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> SqlQueueOptions</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	{</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		ConnectionStringName </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;shuttle&quot;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	});</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>The default JSON settings structure is as follows:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;Shuttle&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;SqlQueue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;ConnectionStringName&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;connection-string-name&quot;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="options" tabindex="-1">Options <a class="header-anchor" href="#options" aria-label="Permalink to &quot;Options&quot;">​</a></h2><table><thead><tr><th>Option</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td><code>ConnectionStringName</code></td><td></td><td>The name of the connection string to use. This package makes use of <a href="https://shuttle.github.io/shuttle-core/data/shuttle-core-data.html" target="_blank" rel="noreferrer">Shuttle.Core.Data</a> for data access.</td></tr></tbody></table>', 12);
const _hoisted_13 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, _hoisted_13);
}
const sql = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  sql as default
};