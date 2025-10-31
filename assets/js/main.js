document.addEventListener('DOMContentLoaded', () => {
  // ===== Lazy load para imagens dos combos =====
  const lazyImages = document.querySelectorAll('.combo-img .lazy-img');

  /**
   * Marca a imagem como carregada e remove o placeholder visual.
   * @param {HTMLImageElement} img - Imagem que acabou de carregar.
   */
  const onImageLoad = (img) => {
    const placeholder = img.parentElement.querySelector('.img-placeholder');
    if (placeholder) placeholder.remove();
    img.classList.add('loaded');
  };

  /**
   * Define uma imagem de fallback quando houver erro ao carregar a imagem
   * e remove o placeholder visual.
   * @param {HTMLImageElement} img - Imagem que falhou ao carregar.
   */
  const onImageError = (img) => {
    // Fallback para imagem genérica
    img.src = 'assets/img/fallback.svg';
    img.alt = img.alt || 'Imagem indisponível';
    const placeholder = img.parentElement.querySelector('.img-placeholder');
    if (placeholder) placeholder.remove();
  };

  /**
   * Carrega a imagem substituindo o atributo src pelo data-src
   * e registra handlers de load e error.
   * @param {HTMLImageElement} img - Imagem a ser carregada.
   */
  const loadImage = (img) => {
    const src = img.getAttribute('data-src');
    if (!src) return;

    // Define src real de forma assíncrona
    requestAnimationFrame(() => {
      img.src = src;
    });

    img.addEventListener('load', () => onImageLoad(img), { once: true });
    img.addEventListener('error', () => onImageError(img), { once: true });
  };

  // Usa IntersectionObserver quando disponível para lazy loading eficiente.
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          loadImage(img);
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '100px', threshold: 0.01 });

    lazyImages.forEach(img => io.observe(img));
  } else {
    // Fallback: carrega imediatamente
    lazyImages.forEach(loadImage);
  }

  // ===== Header: estado 'scrolled' ao rolar =====
  const header = document.getElementById('header');
  /**
   * Alterna a classe 'scrolled' no header quando há rolagem.
   */
  const onScroll = () => {
    if (!header) return;
    const scrolled = window.scrollY > 10;
    header.classList.toggle('scrolled', scrolled);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== Mobile Menu: toggle acessível =====
  const mobileMenuBtn = document.querySelector('.mobile-menu');
  const navList = document.querySelector('#primary-nav ul');
  const overlay = document.querySelector('.menu-overlay');
  /**
   * Alterna o estado do menu mobile, atualizando atributos de acessibilidade,
   * bloqueando o scroll do body e gerenciando foco.
   */
  const toggleMenu = () => {
    if (!mobileMenuBtn || !navList) return;
    const isOpen = navList.classList.toggle('active');
    mobileMenuBtn.classList.toggle('is-open', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    // Overlay e bloqueio de scroll
    if (overlay) {
      overlay.classList.toggle('active', isOpen);
      overlay.hidden = !isOpen;
    }
    document.body.classList.toggle('menu-open', isOpen);
    // Foco acessível ao abrir
    if (isOpen) {
      const firstLink = navList.querySelector('a');
      if (firstLink) firstLink.focus({ preventScroll: true });
    } else {
      mobileMenuBtn.focus({ preventScroll: true });
    }
  };
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
  }
  if (navList) {
    // Fecha o menu ao clicar em qualquer item interativo dentro da navegação
    navList.addEventListener('click', (e) => {
      const interactive = e.target && e.target.closest('a, button');
      if (!interactive) return;
      // Se for um link, seguimos o comportamento padrão (scroll/ navegação)
      // Para botões (ex.: "Fazer Pedido"), apenas fechamos o menu
      navList.classList.remove('active');
      if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('is-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
      if (overlay) {
        overlay.classList.remove('active');
        overlay.hidden = true;
      }
      document.body.classList.remove('menu-open');
    });
  }
  // Fecha ao clicar na overlay ou apertar ESC
  if (overlay) {
    overlay.addEventListener('click', () => {
      if (!navList || !mobileMenuBtn) return;
      navList.classList.remove('active');
      mobileMenuBtn.classList.remove('is-open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      overlay.classList.remove('active');
      overlay.hidden = true;
      document.body.classList.remove('menu-open');
      mobileMenuBtn.focus({ preventScroll: true });
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList && navList.classList.contains('active')) {
      navList.classList.remove('active');
      if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('is-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.focus({ preventScroll: true });
      }
      if (overlay) {
        overlay.classList.remove('active');
        overlay.hidden = true;
      }
      document.body.classList.remove('menu-open');
    }
  });

  // ===== Sobre: Ajustar altura da imagem ao tamanho da div de texto =====
  const aboutImg = document.querySelector('.about .about-img');
  const aboutText = document.querySelector('.about .about-text');
  const syncAboutImageHeight = () => {
    if (!aboutImg || !aboutText) return;
    // Em telas pequenas, a seção "Sobre" empilha em coluna (via CSS), então removemos altura fixa
    const isStacked = window.innerWidth <= 992;
    if (isStacked) {
      aboutImg.style.height = '';
      return;
    }
    // Igualar altura do contêiner de imagem à altura do bloco de texto adjacente
    const textHeight = aboutText.offsetHeight;
    if (textHeight > 0) {
      aboutImg.style.height = `${textHeight}px`;
    }
  };
  // Inicializa e atualiza em resize com pequeno debounce
  let _syncTimer = null;
  const onResizeAbout = () => {
    clearTimeout(_syncTimer);
    _syncTimer = setTimeout(syncAboutImageHeight, 100);
  };
  window.addEventListener('resize', onResizeAbout);
  window.addEventListener('load', syncAboutImageHeight);
  requestAnimationFrame(syncAboutImageHeight);

  // ===== Testimonials: Carrossel infinito =====
  const carousel = document.querySelector('.testimonials .carousel');
  const viewport = document.getElementById('testimonials-viewport');
  const track = document.getElementById('testimonials-track');
  const prevBtn = document.querySelector('.testimonials .carousel-control.prev');
  const nextBtn = document.querySelector('.testimonials .carousel-control.next');
  const indicators = document.querySelectorAll('.testimonials .carousel-indicators .indicator');

  if (carousel && viewport && track) {
    const AUTO_INTERVAL = parseInt(carousel.getAttribute('data-autoplay-interval'), 10) || 5000;
    let slides = Array.from(track.querySelectorAll('.carousel-slide'));
    const originalCount = slides.length;
    if (originalCount > 0) {
      // Limita texto dos depoimentos a 150 caracteres
      slides.forEach(slide => {
        const textEl = slide.querySelector('.testimonial-text');
        if (textEl && textEl.textContent && textEl.textContent.length > 150) {
          textEl.textContent = textEl.textContent.trim().slice(0, 150) + '…';
        }
      });

      let slidesPerView = 1;
      let slideWidth = 0;
      let currentIndex = 0; // índice dentro do track (inclui clones)
      let autoplayTimer = null;
      let isPaused = false;
      let isDragging = false;
      let startX = 0;
      let currentX = 0;

      const computeSlidesPerView = () => {
        const w = viewport.getBoundingClientRect().width;
        if (w >= 1024) return 3; // 3 cards simultâneos em desktop
        if (w >= 640) return 2;  // 2 cards em tablets
        return 1;                // 1 card em mobile
      };

      const setCSSVars = () => {
        carousel.style.setProperty('--slides-per-view', String(slidesPerView));
      };

      const removeClones = () => {
        track.querySelectorAll('.carousel-slide.is-clone').forEach(cl => cl.remove());
        slides = Array.from(track.querySelectorAll('.carousel-slide'));
      };

      const createClones = () => {
        // Clona último N no início e primeiro N no fim
        const startClones = slides.slice(-slidesPerView).map(s => { const c = s.cloneNode(true); c.classList.add('is-clone'); return c; });
        const endClones = slides.slice(0, slidesPerView).map(s => { const c = s.cloneNode(true); c.classList.add('is-clone'); return c; });
        startClones.forEach(c => track.insertBefore(c, track.firstChild));
        endClones.forEach(c => track.appendChild(c));
        slides = Array.from(track.querySelectorAll('.carousel-slide'));
      };

      const measure = () => {
        slideWidth = viewport.getBoundingClientRect().width / slidesPerView;
      };

      const realIndexFromCurrent = () => {
        // Índice do primeiro slide real visível (0..originalCount-1)
        let idx = currentIndex - slidesPerView;
        while (idx < 0) idx += originalCount;
        while (idx >= originalCount) idx -= originalCount;
        return idx;
      };

      const setAriaVisibleSlides = () => {
        slides.forEach((slide, i) => {
          const isVisible = i >= currentIndex && i < currentIndex + slidesPerView;
          slide.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
          slide.tabIndex = isVisible ? 0 : -1;
        });
      };

      const updateIndicators = () => {
        const realStart = realIndexFromCurrent();
        indicators.forEach((btn, i) => {
          const active = i === realStart;
          btn.classList.toggle('is-active', active);
          btn.setAttribute('aria-selected', active ? 'true' : 'false');
          btn.tabIndex = active ? 0 : -1;
        });
      };

      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const applyTransform = (animate = true) => {
        // Se o usuário prefere menos movimento, evitamos transições animadas
        const useAnimation = animate && !prefersReduced;
        track.style.transition = useAnimation ? '' : 'none';
        const x = -currentIndex * slideWidth;
        track.style.transform = `translateX(${x}px)`;
      };

      const goTo = (index, animate = true) => {
        currentIndex = index;
        applyTransform(animate);
        setAriaVisibleSlides();
        updateIndicators();
      };

      const normalizeOnTransitionEnd = () => {
        // Quando há animação, normalizamos ao término da transição
        track.addEventListener('transitionend', () => {
          // Avançou para clones no fim
          if (currentIndex >= slidesPerView + originalCount) {
            currentIndex -= originalCount;
            applyTransform(false);
            setAriaVisibleSlides();
          }
          // Voltou para clones no início
          else if (currentIndex < slidesPerView) {
            currentIndex += originalCount;
            applyTransform(false);
            setAriaVisibleSlides();
          }
        });
      };

      const normalizeImmediatelyIfNeeded = () => {
        // Em ambientes com redução de movimento, a transição não ocorre, então normalizamos logo após mover
        if (prefersReduced) {
          if (currentIndex >= slidesPerView + originalCount) {
            currentIndex -= originalCount;
            applyTransform(false);
            setAriaVisibleSlides();
          } else if (currentIndex < slidesPerView) {
            currentIndex += originalCount;
            applyTransform(false);
            setAriaVisibleSlides();
          }
        }
      };

      const next = () => { goTo(currentIndex + 1, true); normalizeImmediatelyIfNeeded(); };
      const prev = () => { goTo(currentIndex - 1, true); normalizeImmediatelyIfNeeded(); };

      const pause = () => {
        isPaused = true;
        if (autoplayTimer) {
          clearInterval(autoplayTimer);
          autoplayTimer = null;
        }
      };
      const resume = () => {
        if (!isPaused) return;
        isPaused = false;
        autoplayTimer = setInterval(() => {
          next();
        }, AUTO_INTERVAL);
      };

      const startAutoplay = () => {
        autoplayTimer = setInterval(() => {
          next();
        }, AUTO_INTERVAL);
      };

      // Eventos de controle
      if (prevBtn) prevBtn.addEventListener('click', () => { pause(); prev(); });
      if (nextBtn) nextBtn.addEventListener('click', () => { pause(); next(); });
      indicators.forEach((btn, i) => {
        btn.addEventListener('click', () => {
          pause();
          // Ir para o grupo cujo primeiro slide real é i
          goTo(i + slidesPerView, true);
        });
      });

      // Navegação por teclado
      carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { pause(); next(); }
        else if (e.key === 'ArrowLeft') { pause(); prev(); }
      });

      // Pausa/retoma em hover e foco
      carousel.addEventListener('mouseenter', pause);
      carousel.addEventListener('mouseleave', resume);
      carousel.addEventListener('focusin', pause);
      carousel.addEventListener('focusout', resume);

      // Suporte a touch (swipe via Pointer Events)
      viewport.addEventListener('pointerdown', (e) => {
        isDragging = true;
        startX = e.clientX;
        currentX = e.clientX;
        pause();
        track.style.transition = 'none';
        viewport.setPointerCapture && viewport.setPointerCapture(e.pointerId);
      });
      viewport.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
        const dx = currentX - startX;
        const x = -currentIndex * slideWidth + dx;
        track.style.transform = `translateX(${x}px)`;
      });
      const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = '';
        const dx = currentX - startX;
        const threshold = Math.max(30, slideWidth * 0.25);
        if (Math.abs(dx) > threshold) {
          if (dx < 0) next(); else prev();
        } else {
          goTo(currentIndex, true);
        }
        resume();
      };
      viewport.addEventListener('pointerup', endDrag);
      viewport.addEventListener('pointercancel', endDrag);

      // Resize: recalcula slides por view, recria clones e reposiciona
      let resizeTimeout = null;
      const onResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const real = realIndexFromCurrent();
          removeClones();
          slidesPerView = computeSlidesPerView();
          setCSSVars();
          measure();
          createClones();
          currentIndex = real + slidesPerView;
          applyTransform(false);
          setAriaVisibleSlides();
          updateIndicators();
        }, 100);
      };
      window.addEventListener('resize', onResize);

      // Inicialização
      slidesPerView = computeSlidesPerView();
      setCSSVars();
      // Mede após pintura inicial para garantir largura correta
      requestAnimationFrame(() => {
        measure();
        createClones();
        currentIndex = slidesPerView; // primeiro slide real
        applyTransform(false);
        setAriaVisibleSlides();
        updateIndicators();
        normalizeOnTransitionEnd();
        startAutoplay();
      });
    }
  }
});