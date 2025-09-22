$(document).ready(function () {
  // 컨텐츠 토글
  const cardPreSaveCalcEl = document.querySelector(
    ".card-box.card-pre-save-calc"
  );
  const titleTextEl = cardPreSaveCalcEl.querySelector(".title-wrap");
  titleTextEl.addEventListener("click", function () {
    cardPreSaveCalcEl.classList.toggle("open");
  });


  // 단계 관련 변수
  const totalSteps = 11; // 1만원부터 50만원까지 5만원씩 증가 = 11단계
  let currentStep = 1;
  const stepKnob = document.getElementById("stepKnob");
  const snapPoints = document.querySelectorAll(".snap-point");
  const track = document.querySelector(".step-track");
  const stepProgress = document.querySelector(".step-progress");
  const pointValue = document.querySelector(".point-value");
  const trackRect = () => track.getBoundingClientRect();
  const leftPadding = 12;
  const rightPadding = 12;

  // 금액 계산 함수 (4% 적립용 - 최대 50만원)
  function getAmountFromStep(step) {
    if (step === 1) {
      return 10000; // 1단계 = 1만원
    } else {
      return (step - 1) * 50000; // 2단계부터 5만원씩 증가 (2단계=5만원, 3단계=10만원, 4단계=15만원...)
    }
  }

  function getPointFromAmount(amount) {
    return Math.floor(amount * 0.04); // 4% 적립
  }

  function updateStepperUI(step) {
    // 노브 위치 이동
    const trackW = track.offsetWidth - leftPadding - rightPadding;
    const pos = leftPadding + ((step - 1) / (totalSteps - 1)) * trackW;
    stepKnob.style.left = `${pos}px`;

    // 진행률 업데이트
    const progressWidth = ((step - 1) / (totalSteps - 1)) * trackW + 10;
    stepProgress.style.width = `${progressWidth}px`;

    // 금액과 포인트 업데이트
    const amount = getAmountFromStep(step);
    const point = getPointFromAmount(amount);

    if (pointValue) {
      pointValue.textContent = point.toLocaleString();
    }

    // 동작 전/후 문구 업데이트
    const actionText = document.getElementById("actionText");
    if (actionText) {
      // 금액을 만원 단위로 변환 (모든 단계에서 동일하게 표시)
      const amountInMan = amount / 10000;
      actionText.innerHTML = `매달 라운드에서 ${amountInMan}만원 씩 쓰면`;
    }
  }

  // 드래그 관련 변수
  let dragging = false;
  let dragStartX = 0;
  let knobStartLeft = 0;

  function getStepFromPosition(x) {
    const rect = trackRect();
    const trackW = rect.width - leftPadding - rightPadding;
    let relX = x - rect.left - leftPadding;
    relX = Math.max(0, Math.min(trackW, relX));
    const ratio = relX / trackW;
    let step = Math.round(ratio * (totalSteps - 1)) + 1;
    step = Math.max(1, Math.min(totalSteps, step));
    return step;
  }

  stepKnob.addEventListener("mousedown", function (e) {
    dragging = true;
    dragStartX = e.clientX;
    knobStartLeft = parseInt(stepKnob.style.left) || leftPadding;
    document.body.style.userSelect = "none";
    document.body.style.overflow = "hidden"; // 스크롤 제거
  });

  document.addEventListener("mousemove", function (e) {
    if (!dragging) return;
    const dx = e.clientX - dragStartX;
    const rect = trackRect();
    const trackW = rect.width - leftPadding - rightPadding;
    let newLeft = knobStartLeft + dx;
    newLeft = Math.max(leftPadding, Math.min(leftPadding + trackW, newLeft));
    stepKnob.style.left = `${newLeft}px`;

    // 스냅 미리보기
    const step = getStepFromPosition(e.clientX);
    updateStepperUI(step);
  });

  document.addEventListener("mouseup", function (e) {
    if (!dragging) return;
    dragging = false;
    document.body.style.userSelect = "";
    document.body.style.overflow = ""; // 스크롤 복원
    const step = getStepFromPosition(e.clientX);
    currentStep = step;
    updateStepperUI(currentStep);
  });

  // 모바일 터치 지원
  stepKnob.addEventListener("touchstart", function (e) {
    dragging = true;
    dragStartX = e.touches[0].clientX;
    knobStartLeft = parseInt(stepKnob.style.left) || leftPadding;
    document.body.style.userSelect = "none";
    document.body.style.overflow = "hidden"; // 스크롤 제거
  });

  document.addEventListener("touchmove", function (e) {
    if (!dragging) return;
    const dx = e.touches[0].clientX - dragStartX;
    const rect = trackRect();
    const trackW = rect.width - leftPadding - rightPadding;
    let newLeft = knobStartLeft + dx;
    newLeft = Math.max(leftPadding, Math.min(leftPadding + trackW, newLeft));
    stepKnob.style.left = `${newLeft}px`;

    // 스냅 미리보기
    const step = getStepFromPosition(e.touches[0].clientX);
    updateStepperUI(step);
  });

  document.addEventListener("touchend", function (e) {
    if (!dragging) return;
    dragging = false;
    document.body.style.userSelect = "";
    document.body.style.overflow = ""; // 스크롤 복원
    // 마지막 터치 위치로 단계 결정
    let clientX = dragStartX;
    if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
    }
    const step = getStepFromPosition(clientX);
    currentStep = step;
    updateStepperUI(currentStep);
  });

  // 스냅 포인트 클릭 시 바로 이동
  snapPoints.forEach((point, idx) => {
    point.addEventListener("click", function () {
      currentStep = idx + 1;
      updateStepperUI(currentStep);
    });
  });

  // 초기화
  updateStepperUI(currentStep);

  // 초기 금액 설정 (1단계 = 5만원)
  const initialAmount = getAmountFromStep(currentStep);
  const initialPoint = getPointFromAmount(initialAmount);
  if (pointValue) {
    pointValue.textContent = initialPoint.toLocaleString();
  }

  // 두 번째 stepper 관련 변수
  const stepKnob2 = document.querySelectorAll(".step-knob")[1];
  const snapPoints2 = document.querySelectorAll(
    ".save-point-box:nth-child(2) .snap-point"
  );
  const track2 = document.querySelectorAll(".step-track")[1];
  const stepProgress2 = document.querySelectorAll(".step-progress")[1];
  const pointValue2 = document.querySelectorAll(".point-value")[1];
  const actionText2 = document.querySelectorAll("#actionText")[1];
  let currentStep2 = 1;

  // 두 번째 stepper 금액 계산 함수 (1% 적립용 - 최대 200만원)
  function getAmountFromStep2(step) {
    if (step === 1) {
      return 10000; // 1단계 = 1만원
    } else {
      return (step - 1) * 50000; // 2단계부터 5만원씩 증가 (2단계=5만원, 3단계=10만원, 4단계=15만원...)
    }
  }

  function getPointFromAmount2(amount) {
    return Math.floor(amount * 0.01); // 1% 적립
  }

  function updateStepperUI2(step) {
    // 노브 위치 이동
    const trackW = track2.offsetWidth - leftPadding - rightPadding;
    const pos = leftPadding + ((step - 1) / (40)) * trackW; // 1% 적립용은 41단계 (1만원~200만원, 5만원씩 증가)
    stepKnob2.style.left = `${pos}px`;

    // 진행률 업데이트
    const progressWidth = ((step - 1) / (40)) * trackW; // 1% 적립용은 41단계
    stepProgress2.style.width = `${progressWidth}px`;

    // 금액과 포인트 업데이트
    const amount = getAmountFromStep2(step);
    const point = getPointFromAmount2(amount);

    if (pointValue2) {
      pointValue2.textContent = point.toLocaleString();
    }

    // 동작 전/후 문구 업데이트
    if (actionText2) {
      const amountInMan = amount / 10000;
      actionText2.innerHTML = `매달 일반 가맹점에서 ${amountInMan}만원 씩 쓰면`;
    }
  }

  // 두 번째 stepper 드래그 이벤트
  let dragging2 = false;
  let dragStartX2 = 0;
  let knobStartLeft2 = 0;

  function getStepFromPosition2(x) {
    const rect = track2.getBoundingClientRect();
    const trackW = rect.width - leftPadding - rightPadding;
    let relX = x - rect.left - leftPadding;
    relX = Math.max(0, Math.min(trackW, relX));
    const ratio = relX / trackW;
    let step = Math.round(ratio * 40) + 1; // 1% 적립용은 41단계 (1만원~200만원, 5만원씩 증가)
    step = Math.max(1, Math.min(41, step));
    return step;
  }

  stepKnob2.addEventListener("mousedown", function (e) {
    dragging2 = true;
    dragStartX2 = e.clientX;
    knobStartLeft2 = parseInt(stepKnob2.style.left) || leftPadding;
    document.body.style.userSelect = "none";
    document.body.style.overflow = "hidden"; // 스크롤 제거
  });

  document.addEventListener("mousemove", function (e) {
    if (!dragging2) return;
    const dx = e.clientX - dragStartX2;
    const rect = track2.getBoundingClientRect();
    const trackW = rect.width - leftPadding - rightPadding;
    let newLeft = knobStartLeft2 + dx;
    newLeft = Math.max(leftPadding, Math.min(leftPadding + trackW, newLeft));
    stepKnob2.style.left = `${newLeft}px`;

    // 스냅 미리보기
    const step = getStepFromPosition2(e.clientX);
    updateStepperUI2(step);
  });

  document.addEventListener("mouseup", function (e) {
    if (!dragging2) return;
    dragging2 = false;
    document.body.style.userSelect = "";
    document.body.style.overflow = ""; // 스크롤 복원
    const step = getStepFromPosition2(e.clientX);
    currentStep2 = step;
    updateStepperUI2(currentStep2);
  });

  // 두 번째 stepper 터치 지원
  stepKnob2.addEventListener("touchstart", function (e) {
    dragging2 = true;
    dragStartX2 = e.touches[0].clientX;
    knobStartLeft2 = parseInt(stepKnob2.style.left) || leftPadding;
    document.body.style.userSelect = "none";
    document.body.style.overflow = "hidden"; // 스크롤 제거
  });

  document.addEventListener("touchmove", function (e) {
    if (!dragging2) return;
    const dx = e.touches[0].clientX - dragStartX2;
    const rect = track2.getBoundingClientRect();
    const trackW = rect.width - leftPadding - rightPadding;
    let newLeft = knobStartLeft2 + dx;
    newLeft = Math.max(leftPadding, Math.min(leftPadding + trackW, newLeft));
    stepKnob2.style.left = `${newLeft}px`;

    // 스냅 미리보기
    const step = getStepFromPosition2(e.touches[0].clientX);
    updateStepperUI2(step);
  });

  document.addEventListener("touchend", function (e) {
    if (!dragging2) return;
    dragging2 = false;
    document.body.style.userSelect = "";
    document.body.style.overflow = ""; // 스크롤 복원
    let clientX = dragStartX2;
    if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
    }
    const step = getStepFromPosition2(clientX);
    currentStep2 = step;
    updateStepperUI2(currentStep2);
  });

  // 두 번째 stepper 스냅 포인트 클릭 이벤트
  snapPoints2.forEach((point, idx) => {
    point.addEventListener("click", function () {
      currentStep2 = idx + 1;
      updateStepperUI2(currentStep2);
    });
  });

  // 두 번째 stepper 초기화
  updateStepperUI2(currentStep2);
});
