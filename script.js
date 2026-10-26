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
(function () {
  // Embed YouTube only on the published site; elsewhere the thumbnails stay plain links.
  var live = /(^|\.)olena-sobolieva\.info$|^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  if (!live) return;
  Array.prototype.slice.call(document.querySelectorAll('.vthumb[data-yt]')).forEach(function (a) {
    var id = a.getAttribute('data-yt');
    a.style.backgroundImage = 'url(https://i.ytimg.com/vi/' + id + '/hqdefault.jpg)';
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var box = document.createElement('div');
      box.className = 'vthumb playing';
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      f.title = a.getAttribute('data-title') || 'Video';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      f.allowFullscreen = true;
      box.appendChild(f);
      a.parentNode.replaceChild(box, a);
      f.focus();
    });
  });
})();
