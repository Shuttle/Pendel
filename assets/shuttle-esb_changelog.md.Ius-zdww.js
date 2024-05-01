import { _ as _export_sfc, c as createElementBlock, o as openBlock, a4 as createStaticVNode } from "./chunks/framework.CfygL32k.js";
const __pageData = JSON.parse('{"title":"Changelog","description":"","frontmatter":{},"headers":[],"relativePath":"shuttle-esb/changelog.md","filePath":"shuttle-esb/changelog.md"}');
const _sfc_main = { name: "shuttle-esb/changelog.md" };
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="changelog" tabindex="-1">Changelog <a class="header-anchor" href="#changelog" aria-label="Permalink to &quot;Changelog&quot;">​</a></h1><h2 id="v14-0-0" tabindex="-1">v14.0.0 <a class="header-anchor" href="#v14-0-0" aria-label="Permalink to &quot;v14.0.0&quot;">​</a></h2><ul><li>Implemented <code>async</code>/<code>await</code> methods.</li><li>Removed message distribution as all major queuing mechanisms are brokers.</li></ul><h2 id="v13-2-0" tabindex="-1">v13.2.0 <a class="header-anchor" href="#v13-2-0" aria-label="Permalink to &quot;v13.2.0&quot;">​</a></h2><ul><li>Fixed deferred processing. Although working, it would be sluggish.</li><li>Added <code>DeferredMessageProcessingAdjusted</code> event to <code>DeferredMessageProcessor</code> to indicate when the deferred processing has halted.</li></ul><h2 id="v13-1-0" tabindex="-1">v13.1.0 <a class="header-anchor" href="#v13-1-0" aria-label="Permalink to &quot;v13.1.0&quot;">​</a></h2><ul><li>Changed all <code>DateTime.Now</code> to <code>DateTime.UtcNow</code> and the relevant date comparisons use <code>DateTime.ToUniversalTime()</code> to ensure the correct timezone.</li><li>Refactored <code>DeferredMessageProcessor</code> to enable sharing of deferred queues between endpoints.</li><li>Added <code>DeferredMessageProcessingHalted</code> event to <code>DeferredMessageProcessor</code> to indicate when the deferred processing has halted.</li></ul><h3 id="date-utcnow" tabindex="-1">Date.UtcNow <a class="header-anchor" href="#date-utcnow" aria-label="Permalink to &quot;Date.UtcNow&quot;">​</a></h3><p>Since all <code>DateTime.Now</code> calls have been replaced by <code>DateTime.UtcNow</code> please test your software before releasing to production to ensure that any bits making use of internal Shuttle.Esb <code>DateTime</code> values function as expected.</p><h3 id="deferredmessageprocessor" tabindex="-1">DeferredMessageProcessor <a class="header-anchor" href="#deferredmessageprocessor" aria-label="Permalink to &quot;DeferredMessageProcessor&quot;">​</a></h3><p>Before <code>v13.1.0</code> endpoints making use of deferred message processing would require their own deferred queue since each endpoint would track the next time the queue requires processing by checking the smallest <code>IgnoreTillDate</code> in each <code>TransportMessage</code> in the queue.</p><p>From <code>v13.1.0</code> this has changed since each endpoint makes use of the <code>ServiceBusOptions.Inbox.DeferredMessageProcessorResetInterval</code> TimeSpan value to resume checking the deferred queue. There is, of course, nothing preventing one from still making use of different deferred queues.</p>', 12);
const _hoisted_13 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, _hoisted_13);
}
const changelog = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  changelog as default
};