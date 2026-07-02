const titleSelectors = [
  '.page-service .service-hero h1',
  '.page-about .about-hero h1',
  '.page-board .board-header h1',
  '.page-board .article-board h1',
  '.page-post .article h1',
];

function animateSubpageTitles() {
  document.querySelectorAll(titleSelectors.join(',')).forEach((title) => {
    if (title.dataset.titleAnimated === 'true') return;

    const text = title.textContent?.trim();
    if (!text) return;

    title.dataset.titleAnimated = 'true';
    title.setAttribute('aria-label', text);
    title.textContent = '';

    Array.from(text).forEach((char, index) => {
      const span = document.createElement('span');
      span.className = char === ' ' ? 'subpage-title-char subpage-title-char--space' : 'subpage-title-char';
      span.setAttribute('aria-hidden', 'true');
      span.style.setProperty('--char-delay', `${index * 24}ms`);
      span.textContent = char === ' ' ? '\u00A0' : char;
      title.appendChild(span);
    });
  });
}

animateSubpageTitles();
document.addEventListener('astro:page-load', animateSubpageTitles);
