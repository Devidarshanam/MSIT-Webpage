const defaultConfig = {
  applicationDeadline: '[APPLICATION DEADLINE]',
  applicationOpenDate: '[APPLICATION OPEN DATE]',
  applyUrl: '#apply'
};

async function loadConfig() {
  try {
    const response = await fetch('data/config.json');
    if (!response.ok) throw new Error('Config not available');
    const data = await response.json();
    return { ...defaultConfig, ...data };
  } catch (error) {
    return defaultConfig;
  }
}

function setDynamicContent(config) {
  document.querySelectorAll('[data-field="applicationDeadline"]').forEach((el) => {
    el.textContent = config.applicationDeadline;
  });

  document.querySelectorAll('[data-field="applicationOpenDate"]').forEach((el) => {
    el.textContent = config.applicationOpenDate;
  });

  document.querySelectorAll('[data-apply-link]').forEach((link) => {
    link.setAttribute('href', config.applyUrl || '#apply');
  });
}

function initMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('navMenu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initAccordions() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');

    if (!trigger || !panel) return;

    const openItem = () => {
      items.forEach((otherItem) => {
        otherItem.classList.remove('open');
        const otherTrigger = otherItem.querySelector('.accordion-trigger');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
      });

      item.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    };

    const closeItem = () => {
      item.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      panel.style.maxHeight = '0px';
    };

    trigger.addEventListener('click', () => {
      if (item.classList.contains('open')) {
        closeItem();
      } else {
        openItem();
      }
    });

    if (item.classList.contains('open')) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
}

function initRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', async () => {
  const config = await loadConfig();
  setDynamicContent(config);
  initMenu();
  initAccordions();
  initRevealAnimations();
});
