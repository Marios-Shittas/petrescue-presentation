const reveals = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.topnav a');
const progressBar = document.getElementById('progressBar');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const menuBtn = document.getElementById('menuBtn');
const topNav = document.getElementById('topNav');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.16 });

reveals.forEach(el => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(section => sectionObserver.observe(section));

const updateScrollUI = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;

  if (scrollTop > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
};

window.addEventListener('scroll', updateScrollUI, { passive: true });
window.addEventListener('load', updateScrollUI);

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

menuBtn.addEventListener('click', () => {
  topNav.classList.toggle('open');
  document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    topNav.classList.remove('open');
    document.body.classList.remove('nav-open');
  });
});
