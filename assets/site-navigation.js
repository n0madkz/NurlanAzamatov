(() => {
  const links = [...document.querySelectorAll('[data-nav-key]')];
  if (!links.length || document.body.classList.contains('training-page')) return;
  // Preserve old links shared before the full program moved to its own page.
  if (location.hash === '#training') {
    location.replace('training-details.php');
    return;
  }
  let queued = false;
  const update = () => {
    queued = false;
    const marker = Math.min(innerHeight * .3, 220);
    const sections = ['home', 'events', 'about', 'gallery', 'certificates']
      .map(key => ({key, node: key === 'home' ? document.querySelector('.hero') : document.getElementById(key)}))
      .filter(section => section.node)
      .map(section => ({...section, top: section.node.getBoundingClientRect().top}))
      .sort((a, b) => a.top - b.top);
    let active = '';
    sections.forEach(section => { if (section.top <= marker) active = section.key; });
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 4 && sections.length) {
      active = sections[sections.length - 1].key;
    }
    links.forEach(link => {
      const linkActive = link.closest('.public-bottom-nav') && active === 'about' ? 'events' : active;
      if (link.dataset.navKey === linkActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule);
  addEventListener('hashchange', schedule);
  addEventListener('load', schedule);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.querySelector('main'));
  update();
})();
