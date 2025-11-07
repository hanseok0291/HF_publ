// 약관 동의(페이지 전용) 컨트롤 스크립트
// - 전체 동의(#checkbox_all) ↔ 개별 약관 체크박스 동기화
// - 필수 항목(data-required="true") 모두 체크 시에만 하단 버튼 활성화
// - .btn-toggle[data-group] 존재 시, 해당 그룹의 .terms-list[data-group] 접기/펼치기 지원

document.addEventListener("DOMContentLoaded", function () {
  const agreeWrap = document.querySelector(".agree-full-wrap");

  // 전체 동의 체크박스
  const overallCheckbox = agreeWrap.querySelector("#checkbox_all");

  // 개별 약관 체크박스(전체 동의 제외)
  const childCheckboxes = Array.from(
    agreeWrap.querySelectorAll(
      ".terms-wrap input[type='checkbox'], .terms-list input[type='checkbox']"
    )
  ).filter((cb) => cb.id !== "checkbox_all");

  // 필수 약관 체크박스
  const requiredCheckboxes = childCheckboxes.filter(
    (cb) => cb.getAttribute("data-required") === "true"
  );

  // 하단 동의/진행 버튼(있으면 제어)
  const sendButton = content.querySelector("#send");

  function areAllChildrenChecked() {
    return childCheckboxes.length > 0 && childCheckboxes.every((cb) => cb.checked);
  }

  function areAllRequiredChecked() {
    if (requiredCheckboxes.length > 0) {
      return requiredCheckboxes.every((cb) => cb.checked);
    }
    return areAllChildrenChecked();
  }

  function updateOverallCheckbox() {
    if (!overallCheckbox) return;
    overallCheckbox.checked = areAllChildrenChecked();
  }

  function updateSendButtonState() {
    if (!sendButton) return;
    const enabled = areAllRequiredChecked();
    sendButton.disabled = !enabled;
    sendButton.classList.toggle("disabled", !enabled);
  }

  function onChildChange() {
    updateOverallCheckbox();
    updateSendButtonState();
  }

  // 그룹 토글(.btn-toggle[data-group]) 지원
  const toggleButtons = agreeWrap.querySelectorAll(".btn-toggle[data-group]");
  
  function onOverallChange() {
    if (!overallCheckbox) return;
    const isChecked = overallCheckbox.checked;
    childCheckboxes.forEach((cb) => {
      cb.checked = isChecked;
    });
    
    updateSendButtonState();
  }

  // 이벤트 바인딩
  childCheckboxes.forEach((cb) => {
    cb.addEventListener("change", onChildChange);
  });
  if (overallCheckbox) {
    overallCheckbox.addEventListener("change", onOverallChange);
  }
  
  // 초기 상태 설정: data-initial-state 속성에 따라 다르게 설정
  toggleButtons.forEach((button) => {
    const group = button.getAttribute("data-group");
    const relatedLists = agreeWrap.querySelectorAll(
      `.terms-list[data-group="${group}"]`
    );
    
    // 초기 상태 확인 (agree-full-wrap 또는 button의 data-initial-state 속성)
    const initialState = agreeWrap.getAttribute("data-initial-state") || 
                       button.getAttribute("data-initial-state") || 
                       "closed"; // 기본값: closed (접힌 상태)
    
    // 전체 동의 체크박스가 체크되어 있으면 펼쳐진 상태로 시작
    const isOverallChecked = overallCheckbox && overallCheckbox.checked;
    
    // 초기 상태 설정
    const shouldBeOpen = initialState === "open" || isOverallChecked;
    
    relatedLists.forEach((list) => {
      list.style.display = shouldBeOpen ? "block" : "none";
    });
    
    // 토글 버튼과 check-all의 open 클래스 설정
    if (shouldBeOpen) {
      button.classList.add("open");
      const checkAll = button.closest(".check-all");
      if (checkAll) {
        checkAll.classList.add("open");
      }
    } else {
      button.classList.remove("open");
      const checkAll = button.closest(".check-all");
      if (checkAll) {
        checkAll.classList.remove("open");
      }
    }
  });
  
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const group = button.getAttribute("data-group");
      const relatedLists = agreeWrap.querySelectorAll(
        `.terms-list[data-group="${group}"]`
      );
      if (!relatedLists.length) return;
      let anyShown = false;
      relatedLists.forEach((list) => {
        const isVisible = window.getComputedStyle(list).display !== "none";
        anyShown = anyShown || isVisible;
      });
      // 토글: 현재 하나라도 보이면 모두 접고, 아니면 모두 펼침
      relatedLists.forEach((list) => {
        list.style.display = anyShown ? "none" : "block";
      });
      button.classList.toggle("open", !anyShown);
      const checkAll = button.closest(".check-all");
      if (checkAll) {
        checkAll.classList.toggle("open", !anyShown);
      }
    });
  });

  // 초기 상태 동기화
  updateOverallCheckbox();
  updateSendButtonState();
});


