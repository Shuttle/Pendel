import { _ as _export_sfc, o as openBlock, c as createElementBlock, d as createStaticVNode } from "./app.9d87cef0.js";
const __pageData = JSON.parse('{"title":"Shuttle.Core.DependencyInjection","description":"","frontmatter":{},"headers":[],"relativePath":"shuttle-core/infrastructure/shuttle-core-dependencyinjection.md"}');
const _sfc_main = { name: "shuttle-core/infrastructure/shuttle-core-dependencyinjection.md" };
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="shuttle-core-dependencyinjection" tabindex="-1">Shuttle.Core.DependencyInjection <a class="header-anchor" href="#shuttle-core-dependencyinjection" aria-hidden="true">#</a></h1><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">PM&gt; Install-Package Shuttle.Core.DependencyInjection</span></span>\n<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>Add components to <code>IServiceCollection</code> by convention:</p><div class="language-c#"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki"><code><span class="line"><span style="color:#FFCB6B;">IServiceCollection</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">services</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ServiceCollection</span><span style="color:#89DDFF;">();</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">services</span></span>\n<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">FromAssembly</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">assembly</span><span style="color:#89DDFF;">)</span></span>\n<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Add</span><span style="color:#89DDFF;">();</span></span>\n<span class="line"></span></code></pre></div><p>The above would be the simplest case and adds all types using either a matching interface (with the same name as the class prefixed with <code>I</code>) or the first interface found. The default service lifetime is <code>Singleton</code>.</p><p>In order to filter the types add a <code>Filter</code> function:</p><div class="language-c#"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki"><code><span class="line"><span style="color:#FFCB6B;">IServiceCollection</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">services</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ServiceCollection</span><span style="color:#89DDFF;">();</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">services</span></span>\n<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">FromAssembly</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">assembly</span><span style="color:#89DDFF;">)</span></span>\n<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Filter</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> type</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Name</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Equals</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">FilteredType</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> StringComparison</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">InvariantCultureIgnoreCase</span><span style="color:#89DDFF;">))</span></span>\n<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Add</span><span style="color:#89DDFF;">();</span></span>\n<span class="line"></span></code></pre></div><p>If a particular interface should be used for a selected type it may be specified as follows:</p><div class="language-c#"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki"><code><span class="line"><span style="color:#FFCB6B;">IServiceCollection</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">services</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ServiceCollection</span><span style="color:#89DDFF;">();</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">services</span></span>\n<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">FromAssembly</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">assembly</span><span style="color:#89DDFF;">)</span></span>\n<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetServiceType</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">ISomeInterface</span><span style="color:#89DDFF;">))</span></span>\n<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Add</span><span style="color:#89DDFF;">();</span></span>\n<span class="line"></span></code></pre></div><p>The service lifetime may also be specified:</p><div class="language-c#"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki"><code><span class="line"><span style="color:#FFCB6B;">IServiceCollection</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">services</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ServiceCollection</span><span style="color:#89DDFF;">();</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">services</span></span>\n<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">FromAssembly</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">assembly</span><span style="color:#89DDFF;">)</span></span>\n<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetServiceLifetime</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> ServiceLifetime</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Transient</span><span style="color:#89DDFF;">)</span></span>\n<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Add</span><span style="color:#89DDFF;">();</span></span>\n<span class="line"></span></code></pre></div><p>Since this is a builder interface all the bits may be used in combination:</p><div class="language-c#"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki"><code><span class="line"><span style="color:#FFCB6B;">IServiceCollection</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">services</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ServiceCollection</span><span style="color:#89DDFF;">();</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">services</span></span>\n<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">FromAssembly</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">assembly</span><span style="color:#89DDFF;">)</span></span>\n<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Filter</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> type</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Name</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Equals</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">FilteredType</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> StringComparison</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">InvariantCultureIgnoreCase</span><span style="color:#89DDFF;">))</span></span>\n<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetServiceType</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">ISomeInterface</span><span style="color:#89DDFF;">))</span></span>\n<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetServiceLifetime</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> ServiceLifetime</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Transient</span><span style="color:#89DDFF;">)</span></span>\n<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Add</span><span style="color:#89DDFF;">();</span></span>\n<span class="line"></span></code></pre></div>', 13);
const _hoisted_14 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, _hoisted_14);
}
const shuttleCoreDependencyinjection = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  shuttleCoreDependencyinjection as default
};