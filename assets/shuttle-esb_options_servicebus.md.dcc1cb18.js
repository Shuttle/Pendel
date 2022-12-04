import { _ as _export_sfc, o as openBlock, c as createElementBlock, d as createStaticVNode } from "./app.9d87cef0.js";
const __pageData = JSON.parse('{"title":"Service Bus Options","description":"","frontmatter":{},"headers":[{"level":2,"title":"Options","slug":"options","link":"#options","children":[]}],"relativePath":"shuttle-esb/options/servicebus.md"}');
const _sfc_main = { name: "shuttle-esb/options/servicebus.md" };
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="service-bus-options" tabindex="-1">Service Bus Options <a class="header-anchor" href="#service-bus-options" aria-hidden="true">#</a></h1><p>The <code>ServiceBusOptions</code> represents the initial options that the <code>ServiceBus</code> will use to configure the relevant components.</p><p>The options are specified in the <code>ServiceBusBuilder</code> when adding the service bus to the <code>IServiceCollection</code>:</p><div class="language-c#"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki"><code><span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">configuration</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ConfigurationBuilder</span><span style="color:#89DDFF;">()</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddJsonFile</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">appsettings.json</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">Build</span><span style="color:#89DDFF;">();</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">services</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddServiceBus</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">builder</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span></span>\n<span class="line"><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// default values</span></span>\n<span class="line"><span style="color:#A6ACCD;">    builder</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Options</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">CreatePhysicalQueues </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    builder</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Options</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">CacheIdentity </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    builder</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Options</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">AddMessageHandlers </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    builder</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Options</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">RemoveMessagesNotHandled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    builder</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Options</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">RemoveCorruptMessages </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    builder</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Options</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">EncryptionAlgorithm </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> string</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Empty</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    builder</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Options</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">CompressionAlgorithm </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> string</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Empty</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// or bind from configuration</span></span>\n<span class="line"><span style="color:#A6ACCD;">    configuration</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetSection</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">ServiceBusOptions</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">SectionName</span><span style="color:#89DDFF;">)</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Bind</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">builder</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Options</span><span style="color:#89DDFF;">);</span></span>\n<span class="line"><span style="color:#89DDFF;">})</span></span>\n<span class="line"></span></code></pre></div><p>The default JSON settings structure is as follows:</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">Shuttle</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">ServiceBus</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">CreatePhysicalQueues</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">CacheIdentity</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">AddMessageHandlers</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">RemoveMessagesNotHandled</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">RemoveCorruptMessages</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">CompressionAlgorithm</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">GZip</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">EncryptionAlgorithm</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">3DES</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><h2 id="options" tabindex="-1">Options <a class="header-anchor" href="#options" aria-hidden="true">#</a></h2><table><thead><tr><th>Option</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td>AddMessageHandlers</td><td>true</td><td>If <code>true</code>, will call the <code>AddMessageHandlers</code> method on the <code>ServiceBusBuilder</code> implementation for all assemblies in the current domain; else only the handlers in <code>Shuttle.Esb</code> are registered.</td></tr><tr><td>CacheIdentity</td><td>true</td><td>Determines whether or not to re-use the identity returned by the <code>IIdentityProvider</code>.</td></tr><tr><td>CreateQueues</td><td>true</td><td>The endpoint will attempt to create all queues.</td></tr><tr><td>RemoveMessagesNotHandled</td><td>false</td><td>Indicates whether messages received on the endpoint that have no message handler should simply be removed (ignored). If this attribute is <code>true</code> the message will simply be acknowledged; else the message will immmediately be placed in the error queue.</td></tr><tr><td>RemoveCorruptMessages</td><td>false</td><td>A message is corrupt when the <code>TransportMessage</code> retrieved from the queue cannot be deserialized. If <code>false</code> (default) the service bus processed will be killed. If <code>true</code> the messae will be <code>Acknowledged</code> with no processing.</td></tr><tr><td>CompressionAlgorithm</td><td>empty (no compression)</td><td>The name of the compression algorithm to use during message serialization.</td></tr><tr><td>EncryptionAlgorithm</td><td>empty (no encryption)</td><td>The name of the encryption algorithm to use during message serialization.</td></tr></tbody></table><p>The <code>IIdentityProvider</code> implementation is responsible for honouring the <code>cacheIdentity</code> attribute.</p>', 9);
const _hoisted_10 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, _hoisted_10);
}
const servicebus = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  servicebus as default
};