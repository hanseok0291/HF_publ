/**
 * 카드 3D 회전
 * - 좌우 드래그: Y축 회전 각도 제어
 * - 드래그 해제: 현재 각도에서 자동 회전 재개
 * - 측면 면은 CSS 3D transform으로 두께감 표현
 */
(function () {
  "use strict";

  var scene = document.getElementById("cardScene");
  var card = document.getElementById("card3d");

  if (!scene || !card) return;

  var angle = 0;
  var isDragging = false;
  var lastPointerX = 0;
  var velocity = 0;
  var pointerId = null;
  var rafId = null;

  // 자동 회전 속도 (deg/frame, 60fps 기준)
  var AUTO_SPEED = 0.35;
  // 드래그 1px당 회전 각도
  var DRAG_SENSITIVITY = 0.6;
  // 드래그 해제 후 관성 감쇠
  var FRICTION = 0.92;
  // 관성이 이 값 이하면 자동 회전으로 전환
  var VELOCITY_THRESHOLD = 0.05;

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function applyRotation() {
    card.style.transform = "rotateY(" + angle + "deg)";
  }

  function tick() {
    if (!isDragging) {
      if (Math.abs(velocity) > VELOCITY_THRESHOLD) {
        angle += velocity;
        velocity *= FRICTION;
      } else if (!prefersReducedMotion) {
        velocity = 0;
        angle += AUTO_SPEED;
      }
    }

    applyRotation();
    rafId = window.requestAnimationFrame(tick);
  }

  function onPointerDown(event) {
    if (isDragging) return;

    isDragging = true;
    pointerId = event.pointerId;
    lastPointerX = event.clientX;
    velocity = 0;
    scene.classList.add("is-dragging");
    scene.setPointerCapture(pointerId);
  }

  function onPointerMove(event) {
    if (!isDragging || event.pointerId !== pointerId) return;

    var deltaX = event.clientX - lastPointerX;
    var deltaAngle = deltaX * DRAG_SENSITIVITY;

    angle += deltaAngle;
    velocity = deltaAngle;
    lastPointerX = event.clientX;
  }

  function endDrag(event) {
    if (!isDragging || (event.pointerId !== undefined && event.pointerId !== pointerId)) return;

    isDragging = false;
    pointerId = null;
    scene.classList.remove("is-dragging");

    if (scene.hasPointerCapture && scene.hasPointerCapture(event.pointerId)) {
      scene.releasePointerCapture(event.pointerId);
    }
  }

  scene.addEventListener("pointerdown", onPointerDown);
  scene.addEventListener("pointermove", onPointerMove);
  scene.addEventListener("pointerup", endDrag);
  scene.addEventListener("pointercancel", endDrag);
  scene.addEventListener("lostpointercapture", endDrag);

  applyRotation();
  rafId = window.requestAnimationFrame(tick);

  window.addEventListener("beforeunload", function () {
    if (rafId) window.cancelAnimationFrame(rafId);
  });
})();
