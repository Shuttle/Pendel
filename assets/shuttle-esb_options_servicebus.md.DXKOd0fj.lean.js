import{_ as a,c as n,a3 as i,o as e}from"./chunks/framework.C4Vvvhxx.js";const k=JSON.parse('{"title":"Service Bus Options","description":"","frontmatter":{},"headers":[],"relativePath":"shuttle-esb/options/servicebus.md","filePath":"shuttle-esb/options/servicebus.md"}'),t={name:"shuttle-esb/options/servicebus.md"};function p(l,s,h,r,d,o){return e(),n("div",null,s[0]||(s[0]=[i(`<h1 id="service-bus-options" tabindex="-1">Service Bus Options <a class="header-anchor" href="#service-bus-options" aria-label="Permalink to &quot;Service Bus Options&quot;">​</a></h1><p>The <code>ServiceBusOptions</code> represents the initial options that the <code>ServiceBus</code> will use to configure the relevant components.</p><p>The options are specified in the <code>ServiceBusBuilder</code> when adding the service bus to the <code>IServiceCollection</code>:</p><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> configuration</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ConfigurationBuilder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AddJsonFile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;appsettings.json&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Build</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">services.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AddServiceBus</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">builder</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // default values</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    builder.Options.CreatePhysicalQueues </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    builder.Options.CacheIdentity </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    builder.Options.AddMessageHandlers </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    builder.Options.RemoveMessagesNotHandled </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    builder.Options.RemoveCorruptMessages </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    builder.Options.EncryptionAlgorithm </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.Empty;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    builder.Options.CompressionAlgorithm </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.Empty;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // or bind from configuration</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    configuration</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GetSection</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ServiceBusOptions.SectionName)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Bind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(builder.Options);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><p>The default JSON settings structure is as follows:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;Shuttle&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;ServiceBus&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;CreatePhysicalQueues&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;CacheIdentity&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;AddMessageHandlers&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;RemoveMessagesNotHandled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;RemoveCorruptMessages&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;CompressionAlgorithm&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;GZip&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;EncryptionAlgorithm&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;3DES&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="options" tabindex="-1">Options <a class="header-anchor" href="#options" aria-label="Permalink to &quot;Options&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Option</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td><code>AddMessageHandlers</code></td><td><code>true</code></td><td>If <code>true</code>, will call the <code>AddMessageHandlers</code> method on the <code>ServiceBusBuilder</code> implementation for all assemblies in the current domain; else only the handlers in <code>Shuttle.Esb</code> are registered.</td></tr><tr><td><code>CacheIdentity</code></td><td><code>true</code></td><td>Determines whether or not to re-use the identity returned by the <code>IIdentityProvider</code>.</td></tr><tr><td><code>CreateQueues</code></td><td><code>true</code></td><td>The endpoint will attempt to create all queues.</td></tr><tr><td><code>RemoveMessagesNotHandled</code></td><td><code>false</code></td><td>Indicates whether messages received on the endpoint that have no message handler should simply be removed (ignored). If this attribute is <code>true</code> the message will simply be acknowledged; else the message will immmediately be placed in the error queue.</td></tr><tr><td><code>RemoveCorruptMessages</code></td><td><code>false</code></td><td>A message is corrupt when the <code>TransportMessage</code> retrieved from the queue cannot be deserialized. If <code>false</code> (default) the service bus processed will be killed. If <code>true</code> the messae will be <code>Acknowledged</code> with no processing.</td></tr><tr><td><code>CompressionAlgorithm</code></td><td>empty (no compression)</td><td>The name of the compression algorithm to use during message serialization.</td></tr><tr><td><code>EncryptionAlgorithm</code></td><td>empty (no encryption)</td><td>The name of the encryption algorithm to use during message serialization.</td></tr></tbody></table><p>The <code>IIdentityProvider</code> implementation is responsible for honouring the <code>CacheIdentity</code> attribute.</p><h2 id="startup" tabindex="-1">Startup <a class="header-anchor" href="#startup" aria-label="Permalink to &quot;Startup&quot;">​</a></h2><p>Once the <code>ServiceBus</code> has been added to a <code>ServiceCollection</code> you can start it using one of the following methods:-</p><h3 id="hosted-start" tabindex="-1">Hosted start <a class="header-anchor" href="#hosted-start" aria-label="Permalink to &quot;Hosted start&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>await Host.CreateDefaultBuilder()</span></span>
<span class="line"><span>    .ConfigureServices(services =&gt;</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        var configuration = new ConfigurationBuilder().AddJsonFile(&quot;appsettings.json&quot;).Build();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        services</span></span>
<span class="line"><span>            .AddSingleton&lt;IConfiguration&gt;(configuration)</span></span>
<span class="line"><span>            .AddServiceBus(builder =&gt;</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                configuration.GetSection(ServiceBusOptions.SectionName).Bind(builder.Options);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                builder.AddMessageHandler(async (IHandlerContext&lt;RegisterMember&gt; context) =&gt;</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    Console.WriteLine();</span></span>
<span class="line"><span>                    Console.WriteLine(&quot;[MEMBER REGISTERED] : user name = &#39;{0}&#39;&quot;, context.Message.UserName);</span></span>
<span class="line"><span>                    Console.WriteLine();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    await context.SendAsync(new MemberRegistered</span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span>                        UserName = context.Message.UserName</span></span>
<span class="line"><span>                    }, transportMessageBuilder =&gt; transportMessageBuilder.Reply());</span></span>
<span class="line"><span>                });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                // To suppress the registration of the \`ServiceBusHostedService\` use this:</span></span>
<span class="line"><span>                builder.SuppressHostedService();</span></span>
<span class="line"><span>            })</span></span>
<span class="line"><span>            .AddAzureStorageQueues(builder =&gt;</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                builder.AddOptions(&quot;azure&quot;, new()</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    ConnectionString = Guard.AgainstNullOrEmptyString(configuration.GetConnectionString(&quot;azure&quot;))</span></span>
<span class="line"><span>                });</span></span>
<span class="line"><span>            });</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    .Build()</span></span>
<span class="line"><span>    .RunAsync(); // The \`ServiceBusHostedService\` will be invoked which starts the \`ServiceBus\`.</span></span></code></pre></div><h3 id="manual-start" tabindex="-1">Manual start <a class="header-anchor" href="#manual-start" aria-label="Permalink to &quot;Manual start&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var configuration = new ConfigurationBuilder().AddJsonFile(&quot;appsettings.json&quot;).Build();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var services = new ServiceCollection()</span></span>
<span class="line"><span>    .AddSingleton&lt;IConfiguration&gt;(configuration)</span></span>
<span class="line"><span>    .AddServiceBus(builder =&gt;</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        configuration.GetSection(ServiceBusOptions.SectionName).Bind(builder.Options);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        builder.AddMessageHandler(async (IHandlerContext&lt;MemberRegistered&gt; context) =&gt;</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            Console.WriteLine();</span></span>
<span class="line"><span>            Console.WriteLine(&quot;[RESPONSE RECEIVED] : user name = &#39;{0}&#39;&quot;, context.Message.UserName);</span></span>
<span class="line"><span>            Console.WriteLine();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            await Task.CompletedTask;</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    .AddAzureStorageQueues(builder =&gt;</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        builder.AddOptions(&quot;azure&quot;, new()</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            ConnectionString = &quot;UseDevelopmentStorage=true;&quot;</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>await using (var serviceBus = await services.BuildServiceProvider().GetRequiredService&lt;IServiceBus&gt;().StartAsync())</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    await serviceBus.SendAsync(new InterestingMessage());</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,15)]))}const u=a(t,[["render",p]]);export{k as __pageData,u as default};
