// scroll-entrance.js

const BOOTSTRAP = `
(function () {
  'use strict';

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.__scrollEntranceInit) { _scan(); return; }
  window.__scrollEntranceInit = true;

  function inViewport(el, offset) {
    var r = el.getBoundingClientRect();
    var h = window.innerHeight || document.documentElement.clientHeight;
    var threshold = r.height * (offset || 0);
    return r.top < h - threshold && r.bottom > 0;
  }

  function hide(el) {
    el.style.opacity = '0';
    el.setAttribute('data-scroll-state', 'hidden');
  }

  function reveal(el) {
    var anim     = el.getAttribute('data-scroll-anim');
    var duration = el.getAttribute('data-scroll-duration');
    var delay    = el.getAttribute('data-scroll-delay');
    el.style.opacity = '';
    if (duration) el.style.setProperty('--anim-duration', duration + 's');
    if (delay)    el.style.setProperty('--anim-delay',    delay    + 's');
    el.setAttribute('data-onload-animation', anim);
    el.setAttribute('data-scroll-state', 'visible');
  }

  function reset(el) {
    el.removeAttribute('data-onload-animation');
    el.style.removeProperty('--anim-duration');
    el.style.removeProperty('--anim-delay');
    hide(el);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var el     = entry.target;
      var state  = el.getAttribute('data-scroll-state');
      var repeat = el.getAttribute('data-scroll-repeat') === 'true';
      var offset = parseFloat(el.getAttribute('data-scroll-offset') || '0.1');

      if (entry.isIntersecting && entry.intersectionRatio >= offset && state === 'hidden') {
        reveal(el);
      } else if (!entry.isIntersecting && repeat && state === 'visible') {
        reset(el);
      }
    });
  }, { threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5] });

  function _scan() {
    document.querySelectorAll('[data-scroll-anim]').forEach(function (el) {
      if (el.getAttribute('data-scroll-state')) return;
      var offset = parseFloat(el.getAttribute('data-scroll-offset') || '0.1');
      if (inViewport(el, offset)) {
        el.setAttribute('data-scroll-state', 'visible');
      } else {
        hide(el);
        observer.observe(el);
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
`.trim()

export function ScrollEntranceScript() {
  return (
    <script
      id="scroll-entrance-bootstrap"
      dangerouslySetInnerHTML={{ __html: BOOTSTRAP }}
    />
  )
}

export function scrollProps({ scrollAnimation, scrollDuration, scrollDelay, scrollOffset, scrollRepeat } = {}) {
  if (!scrollAnimation || scrollAnimation === 'none') return {}
  return {
    'data-scroll-anim':     scrollAnimation,
    ...(scrollDuration !== undefined && { 'data-scroll-duration': scrollDuration }),
    ...(scrollDelay    !== undefined && { 'data-scroll-delay':    scrollDelay    }),
    ...(scrollOffset   !== undefined && { 'data-scroll-offset':   scrollOffset   }),
    ...(scrollRepeat                 && { 'data-scroll-repeat':   'true'         }),
  }
}