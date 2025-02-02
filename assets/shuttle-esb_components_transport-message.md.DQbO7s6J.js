import{_ as s,c as a,a3 as i,o as t}from"./chunks/framework.C4Vvvhxx.js";const g=JSON.parse('{"title":"TransportMessage","description":"","frontmatter":{},"headers":[],"relativePath":"shuttle-esb/components/transport-message.md","filePath":"shuttle-esb/components/transport-message.md"}'),n={name:"shuttle-esb/components/transport-message.md"};function l(h,e,p,o,r,d){return t(),a("div",null,e[0]||(e[0]=[i('<h1 id="transportmessage" tabindex="-1">TransportMessage <a class="header-anchor" href="#transportmessage" aria-label="Permalink to &quot;TransportMessage&quot;">​</a></h1><h2 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-label="Permalink to &quot;Properties&quot;">​</a></h2><h3 id="message" tabindex="-1">Message <a class="header-anchor" href="#message" aria-label="Permalink to &quot;Message&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> System.Byte[] Message { get; set; }</span></span></code></pre></div><p>The actual message stream returned from the [Serializer] represented as a byte array.</p><h3 id="messagereceivedid" tabindex="-1">MessageReceivedId <a class="header-anchor" href="#messagereceivedid" aria-label="Permalink to &quot;MessageReceivedId&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> System.Guid MessageReceivedId { get; set; }</span></span></code></pre></div><p>This is the Id of the message that was being processed when the message was sent. So if message with <code>MessageId</code> <em>ABC123</em> was received and you sent another message that will have a new <code>MessageId</code> of, say, <em>DEF321</em> then the <code>MessageReceivedId</code> of the new message with <code>MessageId</code>: <em>DEF321</em> will be <em>ABC123</em>.</p><h3 id="messageid" tabindex="-1">MessageId <a class="header-anchor" href="#messageid" aria-label="Permalink to &quot;MessageId&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> System.Guid MessageId { get; set; }</span></span></code></pre></div><p>The unique Id of this message.</p><h3 id="correlationid" tabindex="-1">CorrelationId <a class="header-anchor" href="#correlationid" aria-label="Permalink to &quot;CorrelationId&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CorrelationId { get; set; }</span></span></code></pre></div><p>The <code>CorrelationId</code> is not used by the core Shuttle.Esb and you are free to use it to correlate your messages.</p><h3 id="senderinboxworkqueueuri" tabindex="-1">SenderInboxWorkQueueUri <a class="header-anchor" href="#senderinboxworkqueueuri" aria-label="Permalink to &quot;SenderInboxWorkQueueUri&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> SenderInboxWorkQueueUri { get; set; }</span></span></code></pre></div><p>The <code>Uri</code> of the inbox of the endpoint where the message originated. If the sender did not have an inbox then this value will be empty.</p><h3 id="recipientinboxworkqueueuri" tabindex="-1">RecipientInboxWorkQueueUri <a class="header-anchor" href="#recipientinboxworkqueueuri" aria-label="Permalink to &quot;RecipientInboxWorkQueueUri&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> RecipientInboxWorkQueueUri { get; set; }</span></span></code></pre></div><p>The <code>Uri</code> of the inbox of the destination endpoint of this message.</p><h3 id="principalidentityname" tabindex="-1">PrincipalIdentityName <a class="header-anchor" href="#principalidentityname" aria-label="Permalink to &quot;PrincipalIdentityName&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> PrincipalIdentityName { get; set; }</span></span></code></pre></div><p>The name of <code>WindowsIdentity</code> that dispatched the message. May be <em>Anonymous</em>.</p><h3 id="ignoretilldate" tabindex="-1">IgnoreTillDate <a class="header-anchor" href="#ignoretilldate" aria-label="Permalink to &quot;IgnoreTillDate&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> System.DateTime IgnoreTillDate { get; set; }</span></span></code></pre></div><p>The message will not be processed while the current date is before this date.</p><h3 id="expirydate" tabindex="-1">ExpiryDate <a class="header-anchor" href="#expirydate" aria-label="Permalink to &quot;ExpiryDate&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> System.DateTime ExpiryDate { get; set; }</span></span></code></pre></div><h3 id="priority" tabindex="-1">Priority <a class="header-anchor" href="#priority" aria-label="Permalink to &quot;Priority&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Priority { get; set; }</span></span></code></pre></div><p>Determines the date that the message will expire. It will not be processed after this date. The default value is <code>DateTime.MaxValue</code>..</p><h3 id="senddate" tabindex="-1">SendDate <a class="header-anchor" href="#senddate" aria-label="Permalink to &quot;SendDate&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> System.DateTime SendDate { get; set; }</span></span></code></pre></div><p>The date that the message was sent.</p><h3 id="failuremessages" tabindex="-1">FailureMessages <a class="header-anchor" href="#failuremessages" aria-label="Permalink to &quot;FailureMessages&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> List</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> FailureMessages { get; set; }</span></span></code></pre></div><p>A list of message containing each failure that occurred.</p><h3 id="messagetype" tabindex="-1">MessageType <a class="header-anchor" href="#messagetype" aria-label="Permalink to &quot;MessageType&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MessageType { get; set; }</span></span></code></pre></div><p>The <code>FullName</code> of the message type represented by the <code>Message</code> property.</p><h3 id="assemblyqualifiedname" tabindex="-1">AssemblyQualifiedName <a class="header-anchor" href="#assemblyqualifiedname" aria-label="Permalink to &quot;AssemblyQualifiedName&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AssemblyQualifiedName { get; set; }</span></span></code></pre></div><p>The <code>AssemblyQualifiedName</code> of the message type represented by the <code>Message</code> property.</p><h3 id="encryptionalgorithm" tabindex="-1">EncryptionAlgorithm <a class="header-anchor" href="#encryptionalgorithm" aria-label="Permalink to &quot;EncryptionAlgorithm&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> EncryptionAlgorithm { get; set; }</span></span></code></pre></div><p>The name of the encryption algorithm used to encrypt the message; else empty.</p><h3 id="compressionalgorithm" tabindex="-1">CompressionAlgorithm <a class="header-anchor" href="#compressionalgorithm" aria-label="Permalink to &quot;CompressionAlgorithm&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CompressionAlgorithm { get; set; }</span></span></code></pre></div><p>The name of the compression algorithm used to compress the message; else empty.</p><h3 id="headers" tabindex="-1">Headers <a class="header-anchor" href="#headers" aria-label="Permalink to &quot;Headers&quot;">​</a></h3><div class="language-c# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> List</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Shuttle.Esb.TransportHeader</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Headers { get; set; }</span></span></code></pre></div><p>An arbitrary list of <code>TransportHeader</code> objects that may be used to carry information not contained in the <code>Message</code> property.</p>',52)]))}const k=s(n,[["render",l]]);export{g as __pageData,k as default};
