(() => {
  const nav = document.getElementById('nav');
  const langBtn = document.getElementById('langBtn');
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  let lang = localStorage.getItem('zhuchaoshi-lang') || 'zh';

  const titles = {
    index: { zh: '住巢氏｜室内设计、建筑与空间设计、园林景观设计', en: 'Zhu Chaoshi | Interior, Architecture & Landscape Design' },
    about: { zh: '关于住巢氏｜广东元启企业管理有限公司', en: 'About Zhu Chaoshi | Guangdong Yuanqi Enterprise Management Co., Ltd.' },
    services: { zh: '住巢氏设计业务｜室内设计、建筑与空间设计、园林景观设计', en: 'Zhu Chaoshi Design Services | Interior, Architecture & Landscape Design' }
  };

  const page = document.body.dataset.page || 'index';
  const applyLanguage = () => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    document.querySelectorAll('[data-zh][data-en]').forEach((el) => {
      el.textContent = lang === 'en' ? el.dataset.en : el.dataset.zh;
    });
    if (langBtn) langBtn.textContent = lang === 'en' ? '中' : 'EN';
    if (titles[page]) document.title = titles[page][lang];
  };

  const syncNav = () => nav?.classList.toggle('is-scrolled', window.scrollY > 36);
  window.addEventListener('scroll', syncNav, { passive: true });
  syncNav();

  langBtn?.addEventListener('click', () => {
    lang = lang === 'en' ? 'zh' : 'en';
    localStorage.setItem('zhuchaoshi-lang', lang);
    applyLanguage();
  });

  menuBtn?.addEventListener('click', () => {
    const open = nav.classList.toggle('menu-open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }
  applyLanguage();
})();
