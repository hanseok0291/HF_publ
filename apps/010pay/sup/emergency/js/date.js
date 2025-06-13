const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth() + 1;

// 전역 상태
let currentYear = todayYear;
let currentMonth = todayMonth;
let modalYear = currentYear;
let modalMonth = currentMonth;

const externalMonthTexts = document.querySelectorAll('.month-wrap .month-text');
const modal = document.getElementById('modal-period');
const yearText = modal.querySelector('.year-text');
const yearPrevBtn = modal.querySelector('.year-wrap .prev-btn');
const yearNextBtn = modal.querySelector('.year-wrap .next-btn');
const monthButtons = modal.querySelectorAll('.month-list-wrap button');
const minYear = 2000;

function updateExternalMonthUI() {
  externalMonthTexts.forEach((el) => {
    if (currentYear === todayYear) {
      el.textContent = `${currentMonth}월`;
    } else {
      el.textContent = `${currentYear}년 ${currentMonth}월`;
    }
  });
}


function updateMonthUI() {
  const monthWrap = document.querySelector('.month-wrap');
  const prevBtn = monthWrap.querySelector('.prev-btn');
  const nextBtn = monthWrap.querySelector('.next-btn');
  const monthText = monthWrap.querySelector('.month-text');

  if (currentYear === todayYear) {
    monthText.textContent = `${currentMonth}월`;
  } else {
    monthText.textContent = `${currentYear}년 ${currentMonth}월`;
  }

  const isFuture =
    currentYear > todayYear ||
    (currentYear === todayYear && currentMonth >= todayMonth);

  nextBtn.classList.toggle('disabled', isFuture);
  nextBtn.disabled = isFuture;

  prevBtn.classList.remove('disabled');
  prevBtn.disabled = false;

  modalYear = currentYear;
  modalMonth = currentMonth;

  updateModalUI();
}

function updateModalUI() {
  yearText.textContent = `${modalYear}년`;

  monthButtons.forEach((btn, index) => {
    const month = index + 1;
    const isFuture =
      modalYear > todayYear || (modalYear === todayYear && month > todayMonth);

    btn.disabled = isFuture;
    btn.classList.remove('active');

    if (!isFuture && modalYear === currentYear && month === currentMonth) {
      btn.classList.add('active');
    }
  });

  const prevDisabled = modalYear <= minYear;
  yearPrevBtn.classList.toggle('disabled', prevDisabled);
  yearPrevBtn.disabled = prevDisabled;

  const nextDisabled = modalYear >= todayYear;
  yearNextBtn.classList.toggle('disabled', nextDisabled);
  yearNextBtn.disabled = nextDisabled;
}

document.addEventListener('DOMContentLoaded', function () {
  // 외부 month-wrap의 이전/다음 버튼 바인딩
  const monthWrap = document.querySelector('.month-wrap');
  const prevBtn = monthWrap.querySelector('.prev-btn');
  const nextBtn = monthWrap.querySelector('.next-btn');

  prevBtn.addEventListener('click', function () {
    if (currentMonth === 1) {
      currentYear--;
      currentMonth = 12;
    } else {
      currentMonth--;
    }
    updateMonthUI();
  });

  nextBtn.addEventListener('click', function () {
    const isFuture =
      currentYear > todayYear ||
      (currentYear === todayYear && currentMonth >= todayMonth);
    if (isFuture) return;

    if (currentMonth === 12) {
      currentYear++;
      currentMonth = 1;
    } else {
      currentMonth++;
    }
    updateMonthUI();
  });

  // 연도 변경 버튼 바인딩 (초기 1회만)
  yearPrevBtn.addEventListener('click', function () {
    if (modalYear > minYear) {
      modalYear--;
      updateModalUI();
    }
  });

  yearNextBtn.addEventListener('click', function () {
    if (modalYear < todayYear) {
      modalYear++;
      updateModalUI();
    }
  });

  // 월 버튼 바인딩 (초기 1회만)
  monthButtons.forEach((btn, index) => {
    btn.addEventListener('click', function () {
      if (btn.disabled) return;

      modalMonth = index + 1;
      currentYear = modalYear;
      currentMonth = modalMonth;

      updateExternalMonthUI();
      updateMonthUI();
      modalCloseSlide('modal-period');
    });
  });

  // 모달 오픈 감지해서 연도/월 초기화
  const observer = new MutationObserver(() => {
    if (modal.classList.contains('open')) {
      modalYear = currentYear;
      modalMonth = currentMonth;
      requestAnimationFrame(() => {
        updateModalUI();
      });
    }
  });

  observer.observe(modal, { attributes: true, attributeFilter: ['class'] });

  // 모달 닫기 버튼
  modal.querySelector('.js-modal-close').addEventListener('click', function () {
    modal.classList.remove('open');
  });

  // 최초 렌더링
  updateExternalMonthUI();
  updateMonthUI();
});
