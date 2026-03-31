/**
 * 디자인 시스템 가이드 - 공통 스크립트
 * 팝업, 네비게이션 등
 */

(function () {
  'use strict';

  // 팝업 열기/닫기
  document.querySelectorAll('[data-popup-trigger]').forEach(function (trigger) {
    var id = trigger.getAttribute('data-popup-trigger');
    var popup = document.getElementById(id);
    if (!popup) return;

    trigger.addEventListener('click', function () {
      popup.setAttribute('aria-hidden', 'false');
      popup.classList.add('is-open');
    });
  });

  document.querySelectorAll('.popup-close').forEach(function (btn) {
    var popup = btn.closest('.popup');
    if (!popup) return;

    btn.addEventListener('click', function () {
      popup.setAttribute('aria-hidden', 'true');
      popup.classList.remove('is-open');
    });
  });

  document.querySelectorAll('.popup__backdrop').forEach(function (backdrop) {
    var popup = backdrop.closest('.popup');
    if (!popup) return;

    backdrop.addEventListener('click', function () {
      popup.setAttribute('aria-hidden', 'true');
      popup.classList.remove('is-open');
    });
  });
})();
