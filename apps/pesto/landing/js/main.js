(() => {
  const openPreapplyButtons = document.querySelectorAll("[data-open-preapply-modal]");
  const preapplyModal = document.querySelector(".preapply-modal");
  const closePreapplyButtons = document.querySelectorAll("[data-close-preapply-modal]");
  const form = document.querySelector(".preapply-modal-form");
  const emailInput = document.querySelector("#preapply-email");
  const formState = document.querySelector('[data-modal-state="form"]');
  const successState = document.querySelector('[data-modal-state="success"]');
  const submittedEmailText = document.querySelector("[data-preapply-email-text]");
  const usageApplyModal = document.querySelector(".usage-apply-modal");
  const closeUsageApplyButtons = document.querySelectorAll("[data-close-usage-apply-modal]");
  const usageApplyForm = document.querySelector(".usage-apply-modal-form");
  const usageApplyEmailInput = document.querySelector("#usage-apply-email");
  const usageApplyFormState = usageApplyModal?.querySelector('[data-modal-state="form"]');
  const usageApplySuccessState = usageApplyModal?.querySelector('[data-modal-state="success"]');
  const usageApplySubmittedEmailText = document.querySelector("[data-usage-apply-email-text]");
  const termsModal = document.querySelector(".terms-modal");
  const privacyModal = document.querySelector(".privacy-modal");

  const hasPreapply = preapplyModal instanceof HTMLElement && openPreapplyButtons.length > 0;
  const hasUsageApply = usageApplyModal instanceof HTMLElement;
  const hasTerms = termsModal instanceof HTMLElement;
  const hasPrivacy = privacyModal instanceof HTMLElement;

  if (!hasPreapply && !hasUsageApply && !hasTerms && !hasPrivacy) {
    return;
  }

  const isModalOpen = (el) => el instanceof HTMLElement && !el.hasAttribute("hidden");

  const showModal = (el) => {
    if (!(el instanceof HTMLElement)) {
      return;
    }
    el.removeAttribute("hidden");
  };

  const hideModal = (el) => {
    if (!(el instanceof HTMLElement)) {
      return;
    }
    el.setAttribute("hidden", "");
  };

  const resetLegalModalScroll = (el) => {
    const inner = el?.querySelector(".terms-modal-inner");
    if (inner instanceof HTMLElement) {
      inner.scrollTop = 0;
    }
  };

  /* 스크롤 잠금: html overflow + body position:fixed(iOS·모바일에서 배경 스크롤·바운스 방지). 닫을 때 scroll 위치 복원 */
  let modalLockScrollY = 0;

  const updateScrollLock = () => {
    const locked =
      (hasPreapply && isModalOpen(preapplyModal)) ||
      (hasUsageApply && isModalOpen(usageApplyModal)) ||
      isModalOpen(termsModal) ||
      isModalOpen(privacyModal);

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

  const closeLegalModals = () => {
    hideModal(termsModal);
    hideModal(privacyModal);
  };

  const closeTermsModal = () => {
    hideModal(termsModal);
    updateScrollLock();
  };

  const openTermsModal = () => {
    if (!hasTerms) {
      return;
    }
    hideModal(privacyModal);
    if (hasPreapply) {
      hideModal(preapplyModal);
    }
    if (hasUsageApply) {
      hideModal(usageApplyModal);
    }
    showModal(termsModal);
    resetLegalModalScroll(termsModal);
    updateScrollLock();
  };

  const closePrivacyModal = () => {
    hideModal(privacyModal);
    updateScrollLock();
  };

  const openPrivacyModal = () => {
    if (!hasPrivacy) {
      return;
    }
    hideModal(termsModal);
    if (hasPreapply) {
      hideModal(preapplyModal);
    }
    if (hasUsageApply) {
      hideModal(usageApplyModal);
    }
    showModal(privacyModal);
    resetLegalModalScroll(privacyModal);
    updateScrollLock();
  };

  if (hasUsageApply) {
    const setUsageApplyModalState = (state) => {
      if (usageApplyFormState instanceof HTMLElement) {
        usageApplyFormState.hidden = state !== "form";
      }
      if (usageApplySuccessState instanceof HTMLElement) {
        usageApplySuccessState.hidden = state !== "success";
      }
    };

    const closeUsageApplyModal = () => {
      hideModal(usageApplyModal);
      setUsageApplyModalState("form");
      if (usageApplyEmailInput instanceof HTMLInputElement) {
        usageApplyEmailInput.value = "";
      }
      updateScrollLock();
    };

    closeUsageApplyButtons.forEach((closeButton) => {
      closeButton.addEventListener("click", closeUsageApplyModal);
    });

    if (usageApplyForm instanceof HTMLFormElement) {
      usageApplyForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!(usageApplyEmailInput instanceof HTMLInputElement) || !usageApplyEmailInput.value.trim()) {
          return;
        }
        const submittedEmail = usageApplyEmailInput.value.trim();
        if (usageApplySubmittedEmailText) {
          usageApplySubmittedEmailText.textContent = submittedEmail;
        }
        setUsageApplyModalState("success");
      });
    }
  }

  if (hasPreapply) {
    const setModalState = (state) => {
      if (formState) {
        formState.hidden = state !== "form";
      }
      if (successState) {
        successState.hidden = state !== "success";
      }
    };

    const closePreapplyModal = () => {
      hideModal(preapplyModal);
      setModalState("form");
      if (emailInput instanceof HTMLInputElement) {
        emailInput.value = "";
      }
      updateScrollLock();
    };

    const openPreapplyModal = () => {
      closeLegalModals();
      showModal(preapplyModal);
      setModalState("form");
      if (emailInput instanceof HTMLInputElement) {
        emailInput.focus();
      }
      updateScrollLock();
    };

    openPreapplyButtons.forEach((openButton) => {
      openButton.addEventListener("click", (event) => {
        event.preventDefault();
        window.sessionStorage.setItem("pesto_landing_entered_at", new Date().toISOString());
        openPreapplyModal();
      });
    });

    closePreapplyButtons.forEach((closeButton) => {
      closeButton.addEventListener("click", closePreapplyModal);
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
  }

  if (hasTerms || hasPrivacy) {
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest("[data-open-terms-modal]")) {
        event.preventDefault();
        openTermsModal();
        return;
      }

      if (target.closest("[data-open-privacy-modal]")) {
        event.preventDefault();
        openPrivacyModal();
        return;
      }

      if (target.closest("[data-close-terms-modal]")) {
        closeTermsModal();
        return;
      }

      if (target.closest("[data-close-privacy-modal]")) {
        closePrivacyModal();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }
    if (hasPreapply && isModalOpen(preapplyModal)) {
      hideModal(preapplyModal);
      if (formState) {
        formState.hidden = false;
      }
      if (successState) {
        successState.hidden = true;
      }
      if (emailInput instanceof HTMLInputElement) {
        emailInput.value = "";
      }
      updateScrollLock();
    } else if (hasUsageApply && isModalOpen(usageApplyModal)) {
      hideModal(usageApplyModal);
      if (usageApplyFormState instanceof HTMLElement) {
        usageApplyFormState.hidden = false;
      }
      if (usageApplySuccessState instanceof HTMLElement) {
        usageApplySuccessState.hidden = true;
      }
      if (usageApplyEmailInput instanceof HTMLInputElement) {
        usageApplyEmailInput.value = "";
      }
      updateScrollLock();
    } else if (isModalOpen(termsModal)) {
      closeTermsModal();
    } else if (isModalOpen(privacyModal)) {
      closePrivacyModal();
    }
  });
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

/* 히어로 + problems 카드 그리드 스크롤 페이드 — 혜택(.landing-benefits)·모바일은 제외 */
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

  /**
   * 카드 그리드 — 불투명(1) / 흐림(SCROLL_FADE_MIN_OPACITY) 이진 전환.
   * 그리드 상단이 뷰포트 이 비율 위로 올라가면 하한 불투명도 적용.
   * 계수↑: 더 많이 스크롤한 뒤 흐려짐 / ↓: 더 일찍 흐려짐
   */
  const CARD_FADE_START_TOP_RATIO = 0.42;

  const isCardGridOpaque = (el) => {
    const r = el.getBoundingClientRect();
    const fadeStartTop = (window.innerHeight || 1) * CARD_FADE_START_TOP_RATIO;
    return r.top >= fadeStartTop;
  };

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
      /* 혜택 섹션: 카드 페이드 없음 */
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
      const opaque = isCardGridOpaque(measureEl);
      for (const node of cardsInSection) {
        if (!(node instanceof HTMLElement)) {
          continue;
        }
        if (opaque) {
          node.style.removeProperty("--landing-card-scroll-fade");
        } else {
          node.style.setProperty("--landing-card-scroll-fade", String(SCROLL_FADE_MIN_OPACITY));
        }
      }
    }
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
