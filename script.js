(function () {
  var btns = Array.prototype.slice.call(document.querySelectorAll('.filters button'));
  var groups = Array.prototype.slice.call(document.querySelectorAll('[data-k]'));
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-f');
      btns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      groups.forEach(function (g) { g.hidden = f !== 'all' && g.getAttribute('data-k') !== f; });
    });
  });
  var cb = document.getElementById('copy-email');
  if (cb) cb.addEventListener('click', function () {
    var el = document.getElementById('email');
    function done() { cb.textContent = 'Copied'; setTimeout(function () { cb.textContent = 'Copy'; }, 1600); }
    function fallback() { var r = document.createRange(); r.selectNodeContents(el); var s = getSelection(); s.removeAllRanges(); s.addRange(r); }
    try { navigator.clipboard.writeText(el.textContent).then(done, fallback); } catch (e) { fallback(); }
  });
})();
