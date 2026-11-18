(() => {
  const d = document, h = d.documentElement;
  const meta = {
    ru: ['Eugene: fullstack, Python и Flutter разработчик', 'Портфолио Eugene (@eugggeneee): сайты, приложения на Flutter и инструменты на Python. Три рабочих проекта.'],
    en: ['Eugene: fullstack, Python and Flutter developer', 'Portfolio of Eugene (@eugggeneee): websites, Flutter apps and Python tools. Three working projects.']
  };
  const els = [...d.querySelectorAll('[data-en]')];
  els.forEach(e => { e.dataset.ru = e.innerHTML; });
  const aria = d.querySelector('[data-en-label]');
  if (aria) aria.dataset.ruLabel = aria.getAttribute('aria-label');
  const btns = [...d.querySelectorAll('[data-lang]')];
  const og = n => d.querySelector('meta[property="og:' + n + '"]');
  const desc = d.querySelector('meta[name="description"]');

  function apply(l) {
    h.lang = l;
    els.forEach(e => { e.innerHTML = l === 'en' ? e.dataset.en : e.dataset.ru; });
    if (aria) aria.setAttribute('aria-label', l === 'en' ? aria.dataset.enLabel : aria.dataset.ruLabel);
    d.title = meta[l][0];
    desc.content = meta[l][1];
    og('title').content = meta[l][0];
    og('description').content = meta[l][1];
    btns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
  }
  function pick() {
    const q = new URLSearchParams(location.search).get('lang');
    const hs = location.hash.slice(1);
    let s = null;
    try { s = localStorage.getItem('lang'); } catch (e) {}
    return [q, hs, s].find(v => v === 'ru' || v === 'en') || 'ru';
  }
  function setLang(l) {
    apply(l);
    try { localStorage.setItem('lang', l); } catch (e) {}
    const u = new URL(location.href);
    u.searchParams.set('lang', l);
    if (u.hash === '#ru' || u.hash === '#en') u.hash = '';
    history.replaceState(null, '', u);
  }
  btns.forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  apply(pick());
})();
