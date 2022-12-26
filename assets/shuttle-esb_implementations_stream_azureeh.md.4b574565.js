import { _ as _export_sfc, o as openBlock, c as createElementBlock, d as createStaticVNode } from "./app.837496c7.js";
const __pageData = JSON.parse('{"title":"AzureEventHubs","description":"","frontmatter":{},"headers":[{"level":2,"title":"Configuration","slug":"configuration","link":"#configuration","children":[]},{"level":2,"title":"Options","slug":"options","link":"#options","children":[]}],"relativePath":"shuttle-esb/implementations/stream/azureeh.md"}');
const _sfc_main = { name: "shuttle-esb/implementations/stream/azureeh.md" };
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="azureeventhubs" tabindex="-1">AzureEventHubs <a class="header-anchor" href="#azureeventhubs" aria-hidden="true">#</a></h1><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">PM&gt; Install-Package Shuttle.Esb.AzureEventHubs</span></span>\n<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-hidden="true">#</a></h2><p>The URI structure is <code>azureeh://configuration-name/queue-name</code>.</p><div class="language-c#"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">services</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddAzureEventHubs</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">builder</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">eventHubQueueOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">EventHubQueueOptions</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">        ConnectionString </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">UseDevelopmentStorage=true</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">        ProcessEvents </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">        ConsumerGroup </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> EventHubConsumerClient</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">DefaultConsumerGroupName</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">        BlobStorageConnectionString </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{BlobStorageConnectionString}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">        BlobContainerName </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{BlobContainerName}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">        OperationTimeout </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> TimeSpan</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">FromSeconds</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">30</span><span style="color:#89DDFF;">),</span></span>\n<span class="line"><span style="color:#A6ACCD;">        ConsumeTimeout </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> TimeSpan</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">FromSeconds</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">30</span><span style="color:#89DDFF;">),</span></span>\n<span class="line"><span style="color:#A6ACCD;">        DefaultStartingPosition </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> EventPosition</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Latest</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">};</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">    eventHubQueueOptions</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">ConfigureProducer </span><span style="color:#89DDFF;">+=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">sender</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">args</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">        Console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">WriteLine</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">$&quot;</span><span style="color:#C3E88D;">[event] : ConfigureProducer / Uri = &#39;</span><span style="color:#89DDFF;">{((</span><span style="color:#FFCB6B;">IQueue</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">sender</span><span style="color:#89DDFF;">).</span><span style="color:#A6ACCD;">Uri</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">};</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">    eventHubQueueOptions</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">ConfigureBlobStorage </span><span style="color:#89DDFF;">+=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">sender</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">args</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">        Console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">WriteLine</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">$&quot;</span><span style="color:#C3E88D;">[event] : ConfigureBlobStorage / Uri = &#39;</span><span style="color:#89DDFF;">{((</span><span style="color:#FFCB6B;">IQueue</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">sender</span><span style="color:#89DDFF;">).</span><span style="color:#A6ACCD;">Uri</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">};</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">    eventHubQueueOptions</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">ConfigureConsumer </span><span style="color:#89DDFF;">+=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">sender</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">args</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">        Console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">WriteLine</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">$&quot;</span><span style="color:#C3E88D;">[event] : ConfigureConsumer / Uri = &#39;</span><span style="color:#89DDFF;">{((</span><span style="color:#FFCB6B;">IQueue</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">sender</span><span style="color:#89DDFF;">).</span><span style="color:#A6ACCD;">Uri</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">};</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">    builder</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddOptions</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">azure</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> eventHubQueueOptions</span><span style="color:#89DDFF;">);</span></span>\n<span class="line"><span style="color:#89DDFF;">});</span></span>\n<span class="line"></span></code></pre></div><p>In the <code>Configure</code> events the <code>args</code> arugment exposes the relevant client options directly should you need to set an values explicitly.</p><p>The default JSON settings structure is as follows:</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">Shuttle</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">AzureEventHubs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">azure</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">ConnectionString</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">UseDevelopmentStorage=true</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">ProcessEvents</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false,</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">ConsumerGroup</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$Default</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">BlobStorageConnectionString</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{BlobStorageConnectionString}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">BlobContainerName</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{BlobContainerName}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">OperationTimeout</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">00:00:30</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">ConsumeTimeout</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">00:00:30</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">DefaultStartingPosition</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Latest</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><h2 id="options" tabindex="-1">Options <a class="header-anchor" href="#options" aria-hidden="true">#</a></h2><table><thead><tr><th>Segment / Argument</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td><code>ConnectionString</code></td><td></td><td>The Azure Event Hubs endpoint to connect to.</td></tr><tr><td><code>ProcessEvents</code></td><td><code>false</code></td><td>Indicates whether the endpoint will process messages. If <code>true</code>, an <code>EventProcessorClient</code> is instanced and configured.</td></tr><tr><td><code>ConsumerGroup</code></td><td>&quot;$Default&quot;</td><td>The consumer group to use when processing events.</td></tr><tr><td><code>BlobStorageConnectionString</code></td><td></td><td>The Azure Storage Account endpoint to connect to in order to perform checkpoints.</td></tr><tr><td><code>BlobContainerName</code></td><td></td><td>The blob container name where checkpoints will be stored.</td></tr><tr><td><code>OperationTimeout</code></td><td>&quot;00:00:30&quot;</td><td>The duration to wait for relevant <code>async</code> methods to complete before timing out.</td></tr><tr><td><code>ConsumeTimeout</code></td><td>&quot;00:00:30&quot;</td><td>The duration to poll for messages before returning <code>null</code>.</td></tr><tr><td><code>DefaultStartingPosition</code></td><td></td><td>The default starting position to use when no checkpoint exists.</td></tr></tbody></table>', 10);
const _hoisted_11 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, _hoisted_11);
}
const azureeh = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  azureeh as default
};