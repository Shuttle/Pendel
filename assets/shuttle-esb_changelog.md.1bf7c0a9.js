import { _ as _export_sfc, o as openBlock, c as createElementBlock, d as createStaticVNode } from "./app.837496c7.js";
const __pageData = JSON.parse('{"title":"Changelog","description":"","frontmatter":{},"headers":[{"level":2,"title":"v13.2.0","slug":"v13-2-0","link":"#v13-2-0","children":[]},{"level":2,"title":"v13.1.0","slug":"v13-1-0","link":"#v13-1-0","children":[{"level":3,"title":"Date.UtcNow","slug":"date-utcnow","link":"#date-utcnow","children":[]},{"level":3,"title":"DeferredMessageProcessor","slug":"deferredmessageprocessor","link":"#deferredmessageprocessor","children":[]}]}],"relativePath":"shuttle-esb/changelog.md"}');
const _sfc_main = { name: "shuttle-esb/changelog.md" };
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="changelog" tabindex="-1">Changelog <a class="header-anchor" href="#changelog" aria-hidden="true">#</a></h1><h2 id="v13-2-0" tabindex="-1">v13.2.0 <a class="header-anchor" href="#v13-2-0" aria-hidden="true">#</a></h2><ul><li>Fixed deferred processing. Although working it would be sluggish.</li><li>Added <code>DeferredMessageProcessingAdjusted</code> event to <code>DeferredMessageProcessor</code> to indicate when the deferred processing has halted.</li></ul><h2 id="v13-1-0" tabindex="-1">v13.1.0 <a class="header-anchor" href="#v13-1-0" aria-hidden="true">#</a></h2><ul><li>Changed all <code>DateTime.Now</code> to <code>DateTime.UtcNow</code> and the relevant date comparisons use <code>DateTime.ToUniversalTime()</code> to ensure the correct timezone.</li><li>Refactored <code>DeferredMessageProcessor</code> to enable sharing of deferred queues between endpoints.</li><li>Added <code>DeferredMessageProcessingHalted</code> event to <code>DeferredMessageProcessor</code> to indicate when the deferred processing has halted.</li></ul><h3 id="date-utcnow" tabindex="-1">Date.UtcNow <a class="header-anchor" href="#date-utcnow" aria-hidden="true">#</a></h3><p>Since all <code>DateTime.Now</code> calls have been replaced by <code>DateTime.UtcNow</code> please test your software before releasing to production to ensure that any bits making use of internal Shuttle.Esb <code>DateTime</code> values function as expected.</p><h3 id="deferredmessageprocessor" tabindex="-1">DeferredMessageProcessor <a class="header-anchor" href="#deferredmessageprocessor" aria-hidden="true">#</a></h3><p>Before <code>v13.1.0</code> endpoints making use of deferred message processing would require their own deferred queue since each endpoint would track the next time the queue requires processing by checking the smallest <code>IgnoreTillDate</code> in each <code>TransportMessage</code> in the queue.</p><p>From <code>v13.1.0</code> this has changed since each endpoint makes use of the <code>ServiceBusOptions.Inbox.DeferredMessageProcessorResetInterval</code> TimeSpan value to resume checking the deferred queue. There is, of course, nothing preventing one from still making use of different deferred queues.</p>', 10);
const _hoisted_11 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, _hoisted_11);
}
const changelog = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  changelog as default
};