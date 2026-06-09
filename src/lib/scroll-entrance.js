export function ScrollEntranceScript() {
  return (
    <script
      id="scroll-entrance-bootstrap"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: BOOTSTRAP }}
    />
  )
}
const BOOTSTRAP = `
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.__scrollEntranceInit) { window._scrollEntranceScan && window._scrollEntranceScan(); return; }
  window.__scrollEntranceInit = true;

  function inViewport(el, threshold) {
    var r = el.getBoundingClientRect();
    var h = window.innerHeight || document.documentElement.clientHeight;
    return r.top <= h * (1 - threshold) && r.bottom >= 0;
  }

  function prime(el) {
    el.style.opacity = '0';
    el.setAttribute('data-anim-state', 'hidden');
  }

  function reveal(el) {
    var anim     = el.getAttribute('data-anim');
    var duration = el.getAttribute('data-anim-duration');
    var delay    = el.getAttribute('data-anim-delay');
    el.style.opacity = '';
    if (duration) el.style.setProperty('--anim-duration', duration + 's');
    if (delay)    el.style.setProperty('--anim-delay',    delay    + 's');
    el.setAttribute('data-animation', anim);
    el.setAttribute('data-anim-state', 'visible');
  }

  function reset(el) {
    el.removeAttribute('data-animation');
    el.style.removeProperty('--anim-duration');
    el.style.removeProperty('--anim-delay');
    prime(el);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var el        = entry.target;
      var state     = el.getAttribute('data-anim-state');
      var repeat    = el.getAttribute('data-anim-repeat') === 'true';
      var threshold = parseFloat(el.getAttribute('data-anim-threshold') || '0.1');
      if (entry.isIntersecting && entry.intersectionRatio >= threshold && state === 'hidden') {
        reveal(el);
      } else if (!entry.isIntersecting && repeat && state === 'visible') {
        reset(el);
      }
    });
  }, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5] });

  function _scan() {
    document.querySelectorAll('[data-anim]:not([data-anim-state])').forEach(function (el) {
      var threshold = parseFloat(el.getAttribute('data-anim-threshold') || '0.1');
      prime(el);
      observer.observe(el);
      if (inViewport(el, threshold)) {
        reveal(el);
      }
    });
  }

  window._scrollEntranceScan = _scan;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _scan);
  } else {
    _scan();
  }
})();
`.trim();