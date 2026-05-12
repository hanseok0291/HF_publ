(() => {
  const openButtons = document.querySelectorAll("[data-open-preapply-modal]");
  const preapplyModal = document.querySelector(".preapply-modal");
  const closeButtons = document.querySelectorAll("[data-close-preapply-modal]");
  const form = document.querySelector(".preapply-modal-form");
  const emailInput = document.querySelector("#preapply-email");
  const formState = document.querySelector('[data-modal-state="form"]');
  const successState = document.querySelector('[data-modal-state="success"]');
  const submittedEmailText = document.querySelector("[data-preapply-email-text]");
  const termsModal = document.querySelector(".terms-modal");
  const openTermsButtons = document.querySelectorAll("[data-open-terms-modal]");
  const closeTermsButtons = document.querySelectorAll("[data-close-terms-modal]");

  if (!openButtons.length || !preapplyModal) {
    return;
  }

  /* 스크롤 잠금: html overflow + body position:fixed(iOS·모바일에서 배경 스크롤·바운스 방지). 닫을 때 scroll 위치 복원 */
  let modalLockScrollY = 0;

  const updateScrollLock = () => {
    const isPreapplyOpen = !preapplyModal.hidden;
    const isTermsOpen = termsModal instanceof HTMLElement ? !termsModal.hidden : false;
    const locked = isPreapplyOpen || isTermsOpen;

    if (locked) {
      if (!document.body.classList.contains("landing-modal-scroll-lock")) {
        modalLockScrollY = window.scrollY || document.documentElement.scrollTop || 0;
      }
      document.documentElement.classList.add("landing-modal-scroll-lock");
      document.body.classList.add("landing-modal-scroll-lock");
      document.body.style.position = "fixed";
      document.body.style.top = `-${modalLockScrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      return;
    }

    document.documentElement.classList.remove("landing-modal-scroll-lock");
    document.body.classList.remove("landing-modal-scroll-lock");
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, modalLockScrollY);
  };

  const setModalState = (state) => {
    if (formState) {
      formState.hidden = state !== "form";
    }
    if (successState) {
      successState.hidden = state !== "success";
    }
  };

  const closeModal = () => {
    preapplyModal.hidden = true;
    setModalState("form");
    if (emailInput instanceof HTMLInputElement) {
      emailInput.value = "";
    }
    updateScrollLock();
  };

  const openModal = () => {
    preapplyModal.hidden = false;
    setModalState("form");
    if (emailInput instanceof HTMLInputElement) {
      emailInput.focus();
    }
    updateScrollLock();
  };

  const closeTermsModal = () => {
    if (!(termsModal instanceof HTMLElement)) {
      return;
    }
    termsModal.hidden = true;
    updateScrollLock();
  };

  const openTermsModal = () => {
    if (!(termsModal instanceof HTMLElement)) {
      return;
    }
    termsModal.hidden = false;
    updateScrollLock();
  };

  openButtons.forEach((openButton) => {
    openButton.addEventListener("click", (event) => {
      event.preventDefault();
      window.sessionStorage.setItem("pesto_landing_entered_at", new Date().toISOString());
      openModal();
    });
  });

  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }
    if (!preapplyModal.hidden) {
      closeModal();
    } else if (termsModal instanceof HTMLElement && !termsModal.hidden) {
      closeTermsModal();
    }
  });

  openTermsButtons.forEach((openTermsButton) => {
    openTermsButton.addEventListener("click", (event) => {
      event.preventDefault();
      openTermsModal();
    });
  });

  closeTermsButtons.forEach((closeTermsButton) => {
    closeTermsButton.addEventListener("click", () => {
      closeTermsModal();
    });
  });

  if (form instanceof HTMLFormElement) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!(emailInput instanceof HTMLInputElement) || !emailInput.value.trim()) {
        return;
      }
      const submittedEmail = emailInput.value.trim();
      window.sessionStorage.setItem("pesto_preapply_email", submittedEmail);
      if (submittedEmailText) {
        submittedEmailText.textContent = submittedEmail;
      }
      setModalState("success");
    });
  }
})();

/* landing-hero: 하단이 뷰포트 안에 완전히 들어온 뒤 view 출력 + body.landing-hero-revealed(후킹용, 레이아웃은 CSS 고정 sticky) — 1회 */
(() => {
  const hero = document.querySelector(".landing-hero");
  if (!(hero instanceof HTMLElement)) {
    return;
  }

  let didLogView = false;

  const detach = () => {
    window.removeEventListener("scroll", maybeLogView);
    window.removeEventListener("resize", maybeLogView);
  };

  const maybeLogView = () => {
    if (didLogView) {
      return;
    }
    const rect = hero.getBoundingClientRect();
    const vh = window.innerHeight;
    /* 하단이 뷰포트 하단 이상으로 올라왔고, 아직 화면 위로 완전히 사라지지 않음 */
    if (rect.bottom > 0 && rect.bottom <= vh) {
      didLogView = true;
      console.log("view");
      document.body.classList.add("landing-hero-revealed");
      detach();
    }
  };

  window.addEventListener("scroll", maybeLogView, { passive: true });
  window.addEventListener("resize", maybeLogView);
  maybeLogView();
})();

/* 토스 페이스페이형: 뷰포트 진입 시 타이틀 → 카드 순차 등장 (.landing-reveal-section) */
(() => {
  const sections = document.querySelectorAll(".landing-reveal-section");
  if (!sections.length) {
    return;
  }

  const prefersReduced =
    typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    sections.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.classList.add("landing-reveal-section--active");
      }
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) {
          continue;
        }
        entry.target.classList.add("landing-reveal-section--active");
        observer.unobserve(entry.target);
        /* 카드 스크롤 페이드 모듈이 즉시 비율 반영 */
        window.dispatchEvent(new CustomEvent("pesto-landing-reveal-active", { bubbles: true }));
      }
    },
    { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.14 }
  );

  sections.forEach((section) => {
    io.observe(section);
  });
})();

/* 카드·히어로 스크롤 페이드 — 카드: 섹션별 .landing-card-grid 한 번 측정 후 동일 opacity. 히어로: 다음 섹션 덮임 */
(() => {
  const prefersReduced =
    typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    return;
  }

  const hero = document.querySelector(".landing-hero");
  const problemsSection = document.querySelector(".landing-main > section:nth-of-type(2)");
  const revealSections = document.querySelectorAll(".landing-main .landing-reveal-section");

  /* common.css @media (max-width: 767px) 와 동일 — 모바일 레이아웃에서는 스크롤 페이드 미적용 */
  const isMobileNoScrollFade = () =>
    typeof window.matchMedia === "function" && window.matchMedia("(max-width: 767px)").matches;

  const resetScrollFadeToOpaque = () => {
    if (hero instanceof HTMLElement) {
      hero.style.setProperty("--landing-hero-scroll-fade", "1");
      hero.style.removeProperty("pointer-events");
    }
    for (const section of revealSections) {
      for (const node of section.querySelectorAll(".landing-card")) {
        if (node instanceof HTMLElement) {
          node.style.removeProperty("--landing-card-scroll-fade");
        }
      }
    }
  };

  /* 스크롤 페이드 최저 불투명도(0~1). 1에 가까울수록 덜 흐려짐 */
  const SCROLL_FADE_MIN_OPACITY = 0.36;

  /** raw 0~1(완전 흐림~선명) → [SCROLL_FADE_MIN_OPACITY, 1] 구간으로 매핑 */
  const toScrollFadeOpacity = (raw) => {
    const t = Math.max(0, Math.min(1, raw));
    return SCROLL_FADE_MIN_OPACITY + (1 - SCROLL_FADE_MIN_OPACITY) * t;
  };

  /** 세로 스크롤 기준: 보이는 높이 / 카드 높이 */
  const heightVisibleRatio = (el) => {
    const r = el.getBoundingClientRect();
    const h = r.height;
    if (h <= 0) {
      return 0;
    }
    const vh = window.innerHeight;
    const visBottom = Math.min(r.bottom, vh);
    const visTop = Math.max(r.top, 0);
    const visibleH = Math.max(0, visBottom - visTop);
    return visibleH / h;
  };

  /* 카드 높이 대비 가시 비율이 이 값 미만이면 페이드(값↑ = 클리핑 시 더 일찍) */
  const CARD_FADE_FULL_VISIBLE_RATIO = 0.64;

  /** 임계 미만: 0으로 빠르게(4제곱) */
  const fadeOpacityFromRatio = (ratio) => {
    if (ratio >= CARD_FADE_FULL_VISIBLE_RATIO) {
      return 1;
    }
    const t = Math.max(0, Math.min(1, ratio / CARD_FADE_FULL_VISIBLE_RATIO));
    return t * t * t * t;
  };

  /**
   * 뷰포트 세로 중앙 대비 요소(카드 그리드) 중심 — 섹션 단위로 한 번만 쓰면 카드가 동시에 페이드
   * upPx = (뷰 중앙 Y) − (블록 중심 Y) → 스크롤로 올라갈수록 upPx 증가
   */
  const CARD_CENTER_FADE_DEADBAND_PX = 6;
  const positionFadeRatio = (el) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const cardMidY = (r.top + r.bottom) / 2;
    const viewMidY = vh * 0.5;
    const upPx = viewMidY - cardMidY;
    if (upPx <= CARD_CENTER_FADE_DEADBAND_PX) {
      return 1;
    }
    const bandPx = Math.max(72, Math.min(132, vh * 0.17));
    const t = Math.max(0, Math.min(1, (upPx - CARD_CENTER_FADE_DEADBAND_PX) / bandPx));
    return 1 - t * t * t;
  };

  /** problems 상단이 뷰포트 위로 올라간 정도로 sticky 히어로 전체 페이드 */
  const updateHeroScrollFade = () => {
    if (!(hero instanceof HTMLElement) || !(problemsSection instanceof HTMLElement)) {
      return;
    }
    const vh = window.innerHeight || 1;
    const top = problemsSection.getBoundingClientRect().top;
    /* 아직 아래에 있음 — 계수↑면 히어로 불투명 유지 구간이 길어짐; ↓면 더 일찍 페이드 */
    const heroFadeStartTop = vh * 0.32;
    if (top >= heroFadeStartTop) {
      hero.style.setProperty("--landing-hero-scroll-fade", "1");
      hero.style.removeProperty("pointer-events");
      return;
    }
    /* 덮이는 구간: band↓이면 같은 스크롤에 더 빨리 0에 도달 */
    const band = vh * 0.32;
    const gone = Math.max(0, Math.min(1, (heroFadeStartTop - top) / band));
    const raw = 1 - gone;
    const op = toScrollFadeOpacity(raw);
    hero.style.setProperty("--landing-hero-scroll-fade", String(op));
    /* 불투명도 바닥이 있으므로 덮임 비율로 클릭 통과 */
    if (gone > 0.88) {
      hero.style.pointerEvents = "none";
    } else {
      hero.style.removeProperty("pointer-events");
    }
  };

  let ticking = false;

  const updateCardScrollFade = () => {
    for (const section of revealSections) {
      if (!(section instanceof HTMLElement)) {
        continue;
      }
      const cardsInSection = section.querySelectorAll(".landing-card");
      if (!section.classList.contains("landing-reveal-section--active")) {
        for (const node of cardsInSection) {
          if (node instanceof HTMLElement) {
            node.style.removeProperty("--landing-card-scroll-fade");
          }
        }
        continue;
      }
      /* 혜택 섹션: 스크롤 페이드 바닥 미적용 — 항상 불투명 1 */
      if (section.classList.contains("landing-benefits")) {
        for (const node of cardsInSection) {
          if (node instanceof HTMLElement) {
            node.style.removeProperty("--landing-card-scroll-fade");
          }
        }
        continue;
      }
      const grid = section.querySelector(".landing-card-grid");
      const measureEl = grid instanceof HTMLElement ? grid : section;
      const ratio = heightVisibleRatio(measureEl);
      const pos = positionFadeRatio(measureEl);
      const raw = fadeOpacityFromRatio(ratio) * pos;
      const op = toScrollFadeOpacity(raw);
      for (const node of cardsInSection) {
        if (node instanceof HTMLElement) {
          node.style.setProperty("--landing-card-scroll-fade", String(op));
        }
      }
    }
  };

  const onScrollOrResize = () => {
    if (ticking) {
      return;
    }
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      if (isMobileNoScrollFade()) {
        resetScrollFadeToOpaque();
        return;
      }
      updateHeroScrollFade();
      updateCardScrollFade();
    });
  };

  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);
  window.addEventListener("pesto-landing-reveal-active", onScrollOrResize);
  onScrollOrResize();
})();
