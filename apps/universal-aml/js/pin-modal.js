/**
 * PIN 알럿 모달 — 확인 클릭 시 해당 .pin-modal 닫기(hidden)
 */
(function () {
  function closeModal(modal) {
    if (!modal) return;
    modal.setAttribute("hidden", "");
    modal.setAttribute("aria-hidden", "true");
  }

  document.addEventListener(
    "click",
    function (ev) {
      var el = ev.target;
      if (!el || !el.closest) return;
      var btn = el.closest(".pin-modal-actions .pin-modal-btn--primary");
      if (!btn) return;
      var modal = btn.closest(".pin-modal");
      closeModal(modal);
    },
    false
  );
})();
