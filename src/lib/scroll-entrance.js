const BOOTSTRAP = `
(function () {
  'use strict';
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.__scrollEntrance) return;
  window.__scrollEntrance = true;

  // Group observers by threshold to avoid one-per-element overhead
  var observers = {};

  function getObserver(threshold) {
    if (observers[threshold]) return observers[threshold];
    observers[threshold] = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var el     = entry.target;
        var repeat = el.getAttribute('data-anim-repeat') === 'true';
        if (entry.isIntersecting) {
          reveal(el);
          if (!repeat) observers[threshold].unobserve(el);
        } else if (repeat) {
          reset(el);
        }
      });
    }, { threshold: threshold });
    return observers[threshold];
  }

  function reveal(el) {
    var anim     = el.getAttribute('data-anim');
    var duration = el.getAttribute('data-anim-duration');
    var delay    = el.getAttribute('data-anim-delay');
    if (duration) el.style.setProperty('--anim-duration', duration + 's');
    if (delay)    el.style.setProperty('--anim-delay',    delay    + 's');
    el.setAttribute('data-animation', anim);
  }

  function reset(el) {
    el.removeAttribute('data-animation');
    el.style.removeProperty('--anim-duration');
    el.style.removeProperty('--anim-delay');
    el.style.opacity = '0';
  }

  function observe(el) {
    if (el.getAttribute('data-anim-state') === 'ready') return;
    el.setAttribute('data-anim-state', 'ready');
    el.style.opacity = '0';
    var threshold = parseFloat(el.getAttribute('data-anim-threshold') || '0.15');
    getObserver(threshold).observe(el);
  }

  // Scan for any new elements added to the DOM
  function scan(root) {
    (root || document).querySelectorAll('[data-anim]:not([data-anim-state])').forEach(observe);
  }

  // MutationObserver picks up Next.js page transitions automatically
  var mo = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (node) {
        if (node.nodeType !== 1) return;
        if (node.matches('[data-anim]')) observe(node);
        node.querySelectorAll && node.querySelectorAll('[data-anim]:not([data-anim-state])').forEach(observe);
      });
    });
  });

  mo.observe(document.documentElement, { childList: true, subtree: true });

  // Initial scan
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { scan(); });
  } else {
    scan();
  }
})();
`.trim();

export function ScrollEntranceScript() {
  return (
    <script
      id="scroll-entrance-bootstrap"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: BOOTSTRAP }}
    />
  )
}