document.addEventListener('DOMContentLoaded', async () => {
  const fragments = {
    header: {
      path: 'components/header.html',
      fallback: `
        <header class="top-status-bar">
          <div class="status-item">
            <span class="status-badge"></span>
            <span class="terminal-text">BLACK_LAB // COORD_TDS</span>
          </div>
          <div class="tags-container">
            <span class="tag">[IA]</span>
            <span class="tag">[MOBILE]</span>
            <span class="tag">[APS]</span>
            <span class="tag">[INOVAÇÃO]</span>
            <span class="tag">[FRONTEND]</span>
          </div>
        </header>`
    },
    navbar: {
      path: 'components/navbar.html',
      fallback: `
        <nav class="navbar">
          <div class="nav-brand">BLACK<span>.TDS</span></div>
          <div class="nav-links">
            <a href="index.html" data-page="home">// HOME</a>
            <a href="IA.html" data-page="ia">// TERMINAL IA</a>
            <a href="formspree.html" data-page="formspree">// MENSAGEM</a>
            <a href="#">// DETALHES</a>
            <a href="#">// SOBRE</a>
          </div>
        </nav>`
    },
    footer: {
      path: 'components/footer.html',
      fallback: `
        <footer class="site-footer">
          <p>BLACK LAB © 2026 · Desenvolvimento de Sistemas</p>
        </footer>`
    }
  };

  const loadFragment = async (key) => {
    const container = document.getElementById(`site-${key}`);
    if (!container) return;

    try {
      const response = await fetch(fragments[key].path, { cache: 'no-store' });
      if (!response.ok) throw new Error('Fragment not found');
      container.innerHTML = await response.text();
    } catch (error) {
      container.innerHTML = fragments[key].fallback;
    }
  };

  await Promise.all([loadFragment('header'), loadFragment('navbar'), loadFragment('footer')]);

  const currentPage = document.body.dataset.page || '';
  document.querySelectorAll('[data-page]').forEach((link) => {
    if (link.getAttribute('data-page') === currentPage) {
      link.classList.add('active');
    }
  });
});
