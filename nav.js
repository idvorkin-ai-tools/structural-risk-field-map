// Page selector: turns the unit/chapter eyebrow on each chapter page into a
// jump-to-page dropdown. The label stays as written; a transparent native
// <select> sits over it, so phones get the system picker and keyboards work.
// Template from the field-map skill: copy to the site root as nav.js and fill PAGES.
// Canonical live copy: technical-ai-safety-field-map/nav.js.
(function () {
  // From the index cards: [group label, [[path from site root, option label], ...]].
  var PAGES = [
    ['Field map', [['index.html', 'Home · all parts']]],
    ['Arc 1 · The problem', [
      ['parts/p01.html', "01 Nobody's fault: what structural risk is"],
      ['parts/p02.html', '02 Gradual disempowerment: the argument'],
      ['parts/p03.html', '03 Three systems: the economy, culture and the state'],
      ['parts/p04.html', "04 Replies, and Barak's fake graphs"]]],
    ['Arc 2 · Power and races', [
      ['parts/p05.html', '05 Concentration of power'],
      ['parts/p06.html', '06 Race dynamics']]],
    ['Arc 3 · Levers', [
      ['parts/p07.html', '07 Compute governance'],
      ['parts/p08.html', '08 Export controls'],
      ['parts/p09.html', '09 Compute thresholds'],
      ['parts/p10.html', '10 Safety frameworks and the EU code'],
      ['parts/p11.html', '11 Liability'],
      ['parts/p12.html', '12 International coordination']]]
  ];

  var root = new URL('.', document.currentScript.src);
  function init() {
    var box = document.querySelector('main .eyebrow .box');
    if (!box) return;
    var here = location.pathname.replace(/\/$/, '/index.html');
    var sel = document.createElement('select');
    sel.className = 'page-select';
    sel.setAttribute('aria-label', 'Jump to page');
    var current = null;
    PAGES.forEach(function (g) {
      var og = document.createElement('optgroup');
      og.label = g[0];
      g[1].forEach(function (p) {
        var o = new Option(p[1], new URL(p[0], root).href);
        if (new URL(p[0], root).pathname === here) { o.selected = true; current = o.value; }
        og.appendChild(o);
      });
      sel.appendChild(og);
    });
    if (!current) return; // page not in the list: leave the eyebrow alone
    sel.addEventListener('change', function () { if (sel.value !== current) location.href = sel.value; });
    // Back/forward restores the changed value from the bfcache; put it back.
    addEventListener('pageshow', function () { sel.value = current; });
    box.classList.add('page-pick');
    // Comments mode (annotate.js) comments on selected text, so there only the caret opens the
    // list and the label stays selectable. ponytail: read once at load; toggling comments
    // mid-page keeps the old hit area until reload.
    var annot = /[?&]annotate=(1|true|on)\b/.test(location.search);
    try { annot = annot || (localStorage.getItem('blogAnnotate') === '1' && !/[?&]annotate=(0|false|off)\b/.test(location.search)); } catch (e) {}
    if (annot) box.classList.add('page-pick-caret');
    box.appendChild(sel);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
