import { _ as _export_sfc, c as createElementBlock, o as openBlock, l as createBaseVNode, a as createTextVNode, a8 as _imports_0 } from "./chunks/framework.CfygL32k.js";
const __pageData = JSON.parse('{"title":"Stream Processing","description":"","frontmatter":{},"headers":[],"relativePath":"shuttle-esb/concepts/patterns/stream-processing.md","filePath":"shuttle-esb/concepts/patterns/stream-processing.md"}');
const _sfc_main = { name: "shuttle-esb/concepts/patterns/stream-processing.md" };
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h1", {
  id: "stream-processing",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createTextVNode("Stream Processing "),
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#stream-processing",
    "aria-label": 'Permalink to "Stream Processing"'
  }, "​")
], -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createTextVNode("With message streaming events are produced in a continuous stream that isn't targeted at any specific consumers. The streams are typically divided into topics and consumers can read messages from a topic. Consumers are usually identified as a logical unit using some form of discriminator. Topcis may also be partitioned and one would have at "),
  /* @__PURE__ */ createBaseVNode("em", null, "most"),
  /* @__PURE__ */ createTextVNode(" the number of consumers as there are partitions.")
], -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("p", null, "The number of messages kept in the stream is determined by a retention policy and consumers may start processing messages from any point in the stream; although typically either the oldest/earliest/tail or most recent/newest/head would be used as a starting point. Messages are, therefore, not removed once consumed but are rather removed once the retention policy determines that they are no longer required. The policy is usually either a period or a maximum size for the stream, or a combination of period and size. This is in contrast to a queue where a message is targeted at a particular logical endpoint and once processed the message is removed.", -1);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createBaseVNode("img", {
    src: _imports_0,
    alt: "Streaming Image"
  })
], -1);
const _hoisted_5 = [
  _hoisted_1,
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, _hoisted_5);
}
const streamProcessing = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  streamProcessing as default
};
