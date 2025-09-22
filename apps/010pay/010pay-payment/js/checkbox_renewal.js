//
document.addEventListener("DOMContentLoaded", function () {
  const modals = document.querySelectorAll(".modal-slide.type2"); // 모든 type2 모달 선택

  modals.forEach((modal) => {
    const checkAllCheckbox = modal.querySelector("#checkbox_all2"); // 전체 동의 체크박스
    const termsWraps = modal.querySelectorAll(".terms-wrap"); // 모든 terms-wrap
    const toggleButtons = modal.querySelectorAll(".btn-toggle"); // 모든 btn-toggle
    const agreeButton = modal.querySelector("#btn-agree1"); // 동의 버튼

    // 초기화: btn-toggle과 check-all의 상태 동기화
    toggleButtons.forEach((button, index) => {
      const termsWrap = termsWraps[index];
      if (termsWrap) {
        const isCurrentlyVisible =
          window.getComputedStyle(termsWrap).display !== "none";

        // btn-toggle과 상위 check-all에 동일한 open 클래스 설정
        const checkAll = button.closest(".check-all");
        if (checkAll) {
          checkAll.classList.toggle("open", isCurrentlyVisible);
          button.classList.toggle("open", isCurrentlyVisible);
        }
      }
    });

    // 전체 동의 체크박스 이벤트
    checkAllCheckbox.addEventListener("change", function () {
      const isChecked = checkAllCheckbox.checked;

      // 전체 약관 체크박스 상태 변경 및 terms-wrap 접기/펼치기
      termsWraps.forEach((termsWrap, index) => {
        const childCheckboxes = termsWrap.querySelectorAll(
          "input[type='checkbox']"
        );

        childCheckboxes.forEach((childCheckbox) => {
          childCheckbox.checked = isChecked;
        });

        // terms-wrap 접기 및 btn-toggle 클래스 토글
        termsWrap.style.display = isChecked ? "none" : "block";

        if (toggleButtons[index]) {
          const button = toggleButtons[index];
          const checkAll = button.closest(".check-all");

          // btn-toggle과 check-all의 open 클래스 동기화
          button.classList.toggle("open", !isChecked);
          if (checkAll) {
            checkAll.classList.toggle("open", !isChecked);
          }
        }
      });

      // 버튼 활성화 여부 확인
      updateAgreeButtonState();
    });

    // btn-toggle 클릭 이벤트
    toggleButtons.forEach((button, index) => {
      button.addEventListener("click", function () {
        const termsWrap = termsWraps[index]; // btn-toggle과 같은 순서의 terms-wrap

        if (termsWrap) {
          const isCurrentlyVisible =
            window.getComputedStyle(termsWrap).display !== "none";

          // terms-wrap 접기/펼치기
          termsWrap.style.display = isCurrentlyVisible ? "none" : "block";

          // btn-toggle과 check-all의 open 클래스 동기화
          button.classList.toggle("open", !isCurrentlyVisible);
          const checkAll = button.closest(".check-all");
          if (checkAll) {
            checkAll.classList.toggle("open", !isCurrentlyVisible);
          }
        }
      });
    });

    // 개별 약관 체크박스 상태 변경 시 버튼 활성화 여부 확인
    termsWraps.forEach((termsWrap) => {
      const childCheckboxes = termsWrap.querySelectorAll(
        "input[type='checkbox']"
      );

      childCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
          // 전체 동의 체크박스 상태 업데이트
          checkAllCheckbox.checked = Array.from(
            modal.querySelectorAll(".terms-wrap input[type='checkbox']")
          ).every((cb) => cb.checked);

          // 버튼 활성화 여부 확인
          updateAgreeButtonState();
        });
      });
    });

    // 동의 버튼 활성화 여부 업데이트
    function updateAgreeButtonState() {
      const allChecked = Array.from(
        modal.querySelectorAll(".terms-wrap input[type='checkbox']")
      ).every((cb) => cb.checked);

      agreeButton.disabled = !allChecked;
      agreeButton.classList.toggle("disabled", !allChecked);
    }
  });
});

//
document.addEventListener("DOMContentLoaded", function () {
  const modals = document.querySelectorAll(".modal-slide.type3"); // 모든 type3 모달 선택

  modals.forEach((modal) => {
    const checkAllCheckbox = modal.querySelector("#checkbox3_all"); // 전체 동의 체크박스
    const termsWraps = modal.querySelectorAll(".terms-wrap"); // 모든 terms-wrap
    const agreeButton = modal.querySelector("#btn-agree3"); // 동의 버튼
    const toggleButtons = modal.querySelectorAll(".btn-toggle"); // 모든 btn-toggle 버튼
    const childCheckboxes = modal.querySelectorAll(
      ".terms-wrap input[type='checkbox']"
    ); // 모든 약관 체크박스
    const requiredCheckboxes = modal.querySelectorAll(
      ".terms-wrap input[type='checkbox'][data-required='true']"
    ); // 필수 약관 체크박스

    // 초기화: btn-toggle과 check-all의 상태 동기화
    toggleButtons.forEach((button, index) => {
      const termsWrap = termsWraps[index];
      if (termsWrap) {
        const isCurrentlyVisible =
          window.getComputedStyle(termsWrap).display !== "none";

        // btn-toggle과 상위 check-all에 동일한 open 클래스 설정
        const checkAll = button.closest(".check-all");
        if (checkAll) {
          checkAll.classList.toggle("open", isCurrentlyVisible);
          button.classList.toggle("open", isCurrentlyVisible);
        }
      }
    });

    // 전체 동의 체크박스 이벤트
    checkAllCheckbox.addEventListener("change", function () {
      const isChecked = checkAllCheckbox.checked;

      // 모든 약관 체크박스와 상태 변경
      childCheckboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
      });

      termsWraps.forEach((termsWrap, index) => {
        // 모든 terms-wrap 접기/펼치기
        termsWrap.style.display = isChecked ? "none" : "block";

        // btn-toggle open 클래스 동기화
        const button = toggleButtons[index];
        if (button) {
          button.classList.toggle("open", !isChecked);
        }

        const checkAll = button?.closest(".check-all");
        if (checkAll) {
          checkAll.classList.toggle("open", !isChecked);
        }
      });

      // 버튼 활성화 여부 확인
      updateAgreeButtonState();
    });

    // btn-toggle 클릭 이벤트
    toggleButtons.forEach((button, index) => {
      button.addEventListener("click", function () {
        const termsWrap = termsWraps[index]; // btn-toggle과 같은 순서의 terms-wrap

        if (termsWrap) {
          const isCurrentlyVisible =
            window.getComputedStyle(termsWrap).display !== "none";

          // terms-wrap 접기/펼치기
          termsWrap.style.display = isCurrentlyVisible ? "none" : "block";

          // btn-toggle과 상위 check-all의 open 클래스 동기화
          button.classList.toggle("open", !isCurrentlyVisible);
          const checkAll = button.closest(".check-all");
          if (checkAll) {
            checkAll.classList.toggle("open", !isCurrentlyVisible);
          }
        }
      });
    });

    // 개별 약관 체크박스 상태 변경 시 전체 동의 체크박스와 버튼 상태 업데이트
    childCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        // 전체 동의 체크박스 상태 업데이트
        checkAllCheckbox.checked = Array.from(childCheckboxes).every(
          (cb) => cb.checked
        );

        // 버튼 활성화 여부 확인
        updateAgreeButtonState();
      });
    });

    // 동의 버튼 활성화 여부 업데이트
    function updateAgreeButtonState() {
      // 필수 체크박스가 모두 체크된 경우에만 활성화
      const allRequiredChecked = Array.from(requiredCheckboxes).every(
        (cb) => cb.checked
      );

      agreeButton.disabled = !allRequiredChecked;
      agreeButton.classList.toggle("disabled", !allRequiredChecked);
    }

    // 초기 상태 동기화
    updateAgreeButtonState();
  });
});
//
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".modal-slide.type4");
  if (!modal) return;

  const checkAllCheckbox = modal.querySelector("#checkbox4_all");
  const termsGroups = modal.querySelectorAll("[data-group]");
  const toggleButtons = modal.querySelectorAll(".btn-toggle");

  // 전체 동의 체크박스 클릭 이벤트
  checkAllCheckbox.addEventListener("change", function () {
    const isChecked = checkAllCheckbox.checked;

    termsGroups.forEach((group) => {
      const groupName = group.getAttribute("data-group");
      const relatedTermsLists = modal.querySelectorAll(
        `.terms-list[data-group="${groupName}"]`
      );
      const relatedToggleButton = modal.querySelector(
        `.btn-toggle[data-group="${groupName}"]`
      );

      relatedTermsLists.forEach((termsList) => {
        termsList.style.display = isChecked ? "none" : "block";
      });

      if (relatedToggleButton) {
        relatedToggleButton.classList.toggle("open", !isChecked);
      }
    });

    // 약관 그룹 내 모든 체크박스 상태 업데이트
    modal.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  });

  // btn-toggle 클릭 이벤트
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const groupName = button.getAttribute("data-group");
      const relatedTermsLists = modal.querySelectorAll(
        `.terms-list[data-group="${groupName}"]`
      );

      if (!relatedTermsLists.length) return;

      relatedTermsLists.forEach((termsList) => {
        const isCurrentlyVisible =
          window.getComputedStyle(termsList).display !== "none";
        termsList.style.display = isCurrentlyVisible ? "none" : "block";
      });

      button.classList.toggle("open");
    });
  });
});
//
document.addEventListener("DOMContentLoaded", function () {
  // 하위 체크박스 상태 변경 시 상위 check-all 상태 업데이트
  const updateParentCheckAll = (groupName) => {
    const parentCheckbox = document.querySelector(
      `#checkbox2_${groupName}_all`
    );
    const childCheckboxes = document.querySelectorAll(
      `.terms-list[data-group="${groupName}"] input[type="checkbox"]`
    );

    if (parentCheckbox) {
      const allChecked = Array.from(childCheckboxes).every(
        (checkbox) => checkbox.checked
      );
      parentCheckbox.checked = allChecked; // 모든 하위 체크박스가 체크된 경우 상위 체크박스 체크
    }
  };

  // 모든 하위 체크박스에 이벤트 등록
  const childCheckboxes = document.querySelectorAll(
    ".terms-list input[type='checkbox']"
  );
  childCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const groupName = checkbox
        .closest(".terms-list")
        .getAttribute("data-group");
      if (groupName) {
        updateParentCheckAll(groupName);
      }
    });
  });

  // 상위 check-all 체크박스 상태 변경 시 하위 체크박스 상태 동기화
  const checkAllCheckboxes = document.querySelectorAll(
    ".check-all input[type='checkbox']"
  );
  checkAllCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const groupName = checkbox.getAttribute("data-group");
      if (groupName) {
        const childCheckboxes = document.querySelectorAll(
          `.terms-list[data-group="${groupName}"] input[type="checkbox"]`
        );

        childCheckboxes.forEach((child) => {
          child.checked = checkbox.checked;
        });
      }
    });
  });

  // 초기 상태 동기화
  const initializeParentCheckAllStates = () => {
    const termsGroups = document.querySelectorAll(".terms-list[data-group]");
    termsGroups.forEach((group) => {
      const groupName = group.getAttribute("data-group");
      updateParentCheckAll(groupName);
    });
  };

  initializeParentCheckAllStates();
});
//
/* document.addEventListener("DOMContentLoaded", function () {
  // 특정 그룹의 상태를 업데이트하는 함수
  const updateTermsListDisplay = (groupCheckboxId, groupDataAttr) => {
    const groupCheckbox = document.querySelector(`#${groupCheckboxId}`);
    const termsList = document.querySelector(
      `.terms-list[data-group="${groupDataAttr}"]`
    );
    const toggleButton = document.querySelector(
      `.btn-toggle[data-group="${groupDataAttr}"]`
    );

    if (groupCheckbox && termsList) {
      groupCheckbox.addEventListener("change", function () {
        const isChecked = groupCheckbox.checked;

        // 접기 또는 펼치기
        termsList.style.display = isChecked ? "none" : "block";

        // btn-toggle의 open 클래스 동기화
        if (toggleButton) {
          toggleButton.classList.toggle("open", !isChecked);
        }
      });
    }
  };

  // 그룹별 이벤트 등록
  updateTermsListDisplay("checkbox4_group1_all", "group4_1");
  updateTermsListDisplay("checkbox4_group2_all", "group4_2");
}); */
//
/* document.addEventListener("DOMContentLoaded", function () {
  // 특정 그룹의 하위 체크박스 상태에 따라 상위 체크박스 업데이트
  const updateParentCheckboxState = (groupDataAttr, parentCheckboxId) => {
    const parentCheckbox = document.querySelector(`#${parentCheckboxId}`);
    const childCheckboxes = document.querySelectorAll(
      `.terms-list[data-group="${groupDataAttr}"] input[type="checkbox"]`
    );

    if (parentCheckbox && childCheckboxes.length > 0) {
      // 하위 체크박스 상태 변경 이벤트
      childCheckboxes.forEach((childCheckbox) => {
        childCheckbox.addEventListener("change", function () {
          const allChecked = Array.from(childCheckboxes).every(
            (checkbox) => checkbox.checked
          );
          parentCheckbox.checked = allChecked; // 모든 하위 체크박스가 체크된 경우 상위 체크박스 체크
        });
      });
    }
  };

  // 그룹별 하위 체크박스와 상위 체크박스 연동
  updateParentCheckboxState("group4_1", "checkbox4_group1_all");
  updateParentCheckboxState("group4_2", "checkbox4_group2_all");
}); */
//

document.addEventListener("DOMContentLoaded", function () {
  const modals = document.querySelectorAll(".modal-slide.type4"); // 모든 type4 모달 선택

  modals.forEach((modal) => {
    const checkAllCheckbox = modal.querySelector("#checkbox4_all"); // 전체 동의 체크박스
    const termsWraps = modal.querySelectorAll(".terms-list"); // 모든 terms-wrap
    const agreeButton = modal.querySelector("#btn-agree4"); // 동의 버튼
    const toggleButtons = modal.querySelectorAll(".btn-toggle"); // 모든 btn-toggle 버튼
    const childCheckboxes = modal.querySelectorAll(
      ".terms-wrap input[type='checkbox']"
    ); // 모든 약관 체크박스
    const requiredCheckboxes = modal.querySelectorAll(
      ".terms-wrap input[type='checkbox'][data-required='true']"
    ); // 필수 약관 체크박스

    // 초기화: btn-toggle과 check-all의 상태 동기화
    toggleButtons.forEach((button, index) => {
      const termsWrap = termsWraps[index];
      if (termsWrap) {
        const isCurrentlyVisible =
          window.getComputedStyle(termsWrap).display !== "none";

        // btn-toggle과 상위 check-all에 동일한 open 클래스 설정
        const checkAll = button.closest(".check-all");
        if (checkAll) {
          checkAll.classList.toggle("open", isCurrentlyVisible);
          button.classList.toggle("open", isCurrentlyVisible);
        }
      }
    });

    // 전체 동의 체크박스 이벤트
    checkAllCheckbox.addEventListener("change", function () {
      const isChecked = checkAllCheckbox.checked;

      // 모든 약관 체크박스와 상태 변경
      childCheckboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
      });

      termsWraps.forEach((termsWrap, index) => {
        // 모든 terms-wrap 접기/펼치기
        termsWrap.style.display = isChecked ? "none" : "block";

        // btn-toggle open 클래스 동기화
        const button = toggleButtons[index];
        if (button) {
          button.classList.toggle("open", !isChecked);
        }

        const checkAll = button?.closest(".check-all");
        if (checkAll) {
          checkAll.classList.toggle("open", !isChecked);
        }
      });

      // 버튼 활성화 여부 확인
      updateAgreeButtonState();
    });

    // 개별 약관 체크박스 상태 변경 시 전체 동의 체크박스와 버튼 상태 업데이트
    childCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        // 전체 동의 체크박스 상태 업데이트
        checkAllCheckbox.checked = Array.from(childCheckboxes).every(
          (cb) => cb.checked
        );

        // 버튼 활성화 여부 확인
        updateAgreeButtonState();
      });
    });

    // 동의 버튼 활성화 여부 업데이트
    function updateAgreeButtonState() {
      // `checkbox4_all`이 체크 상태인지 확인
      const isAllChecked = checkAllCheckbox.checked;

      // 필수 체크박스가 모두 체크된 경우에만 활성화
      const allRequiredChecked = Array.from(requiredCheckboxes).every(
        (cb) => cb.checked
      );

      // 버튼 활성화/비활성화 상태 업데이트
      const shouldEnableButton = isAllChecked && allRequiredChecked;

      agreeButton.disabled = !shouldEnableButton;
      agreeButton.classList.toggle("disabled", !shouldEnableButton);
    }

    // 초기 상태 동기화
    function initializeState() {
      // 모든 체크박스 초기 상태 확인
      childCheckboxes.forEach((checkbox) => {
        checkbox.checked = false; // 초기화 시 모두 체크 해제
      });
      checkAllCheckbox.checked = false; // 전체 동의 체크박스 해제
      agreeButton.disabled = true; // 버튼 비활성화
      agreeButton.classList.add("disabled"); // 비활성화 클래스 추가
    }

    // 실행
    initializeState();
    updateAgreeButtonState(); // 초기 상태를 업데이트
  });
});
//
/* document.addEventListener("DOMContentLoaded", function () {
  const allToggleButton = document.querySelector(
    '.btn-toggle[data-group="all"]'
  ); // data-group="all" 버튼
  const allTermsLists = document.querySelectorAll(
    '.terms-list.terms-block-list[data-group="group4_1"], .terms-list.terms-block-list[data-group="group4_2"]'
  ); // data-group="all" 아래의 모든 terms-list terms-block-list

  if (allToggleButton) {
    allToggleButton.addEventListener("click", function () {
      // 현재 terms-list 상태 확인
      const isCurrentlyVisible = Array.from(allTermsLists).some(
        (termsList) => window.getComputedStyle(termsList).display !== "none"
      );

      // 모든 terms-list 접기/펼치기
      allTermsLists.forEach((termsList) => {
        termsList.style.display = isCurrentlyVisible ? "none" : "block";
      });

      // btn-toggle의 open 클래스 동기화
      allToggleButton.classList.toggle("open", !isCurrentlyVisible);

      // check-all top의 open 클래스 동기화
      const checkAllTop = allToggleButton.closest(".check-all.top");
      if (checkAllTop) {
        checkAllTop.classList.toggle("open", !isCurrentlyVisible);
      }
    });
  }
}); */
//
/* document.addEventListener("DOMContentLoaded", function () {
  // 모든 check-all 체크박스에 이벤트 추가
  const checkAllCheckboxes = document.querySelectorAll(
    ".terms-wrap .check-all input[type='checkbox']"
  );

  checkAllCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      // 해당 체크박스의 data-group 값을 가져오기
      const groupName = checkbox.getAttribute("data-group");

      // 동일한 data-group의 terms-list를 찾음
      const relatedTermsList = document.querySelector(
        `.terms-list[data-group="${groupName}"]`
      );

      if (relatedTermsList) {
        // 체크 상태에 따라 접기/펼치기
        const isChecked = checkbox.checked;
        relatedTermsList.style.display = isChecked ? "none" : "block";

        // 토글 버튼과 관련된 open 클래스 동기화
        const toggleButton = checkbox
          .closest(".check-all")
          .querySelector(".btn-toggle");
        if (toggleButton) {
          toggleButton.classList.toggle("open", !isChecked);
        }
      }
    });
  });

  // 모든 btn-toggle 버튼에 이벤트 추가
  const toggleButtons = document.querySelectorAll(".btn-toggle");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // 해당 버튼의 data-group 값을 가져오기
      const groupName = button.getAttribute("data-group");

      // 동일한 data-group의 terms-list를 찾음
      const relatedTermsList = document.querySelector(
        `.terms-list[data-group="${groupName}"]`
      );

      if (relatedTermsList) {
        // terms-list의 현재 상태에 따라 접기/펼치기
        const isCurrentlyVisible =
          window.getComputedStyle(relatedTermsList).display !== "none";
        relatedTermsList.style.display = isCurrentlyVisible ? "none" : "block";

        // btn-toggle의 open 클래스 토글
        button.classList.toggle("open", !isCurrentlyVisible);
      }
    });
  });
});
 */
document.addEventListener("DOMContentLoaded", function () {
  // 특정 그룹의 하위 체크박스 상태에 따라 상위 체크박스 업데이트
  const updateParentCheckboxState = (groupDataAttr) => {
    const parentCheckbox = document.querySelector(
      `input[type="checkbox"][data-group="${groupDataAttr}"][id$="_all"]`
    );
    const childCheckboxes = document.querySelectorAll(
      `.terms-list[data-group="${groupDataAttr}"] input[type="checkbox"]`
    );

    if (parentCheckbox && childCheckboxes.length > 0) {
      // 하위 체크박스 상태 변경 이벤트
      childCheckboxes.forEach((childCheckbox) => {
        childCheckbox.addEventListener("change", function () {
          const allChecked = Array.from(childCheckboxes).every(
            (checkbox) => checkbox.checked
          );
          parentCheckbox.checked = allChecked; // 모든 하위 체크박스가 체크된 경우 상위 체크박스 체크

          // 관련 terms-list 접기/펼치기
          toggleTermsListDisplay(groupDataAttr, !allChecked);

          // 콘솔 출력
          console.log("Clicked Child Checkbox:", childCheckbox);
          console.log("Parent Checkbox:", parentCheckbox);
          console.log("All Child Checkboxes:", childCheckboxes);
        });
      });
    }
  };

  // 특정 그룹의 상위 체크박스 상태 변경 시 하위 체크박스 동기화
  const updateChildCheckboxState = (groupDataAttr) => {
    const parentCheckbox = document.querySelector(
      `input[type="checkbox"][data-group="${groupDataAttr}"][id$="_all"]`
    );
    const childCheckboxes = document.querySelectorAll(
      `.terms-list[data-group="${groupDataAttr}"] input[type="checkbox"]`
    );

    if (parentCheckbox && childCheckboxes.length > 0) {
      parentCheckbox.addEventListener("change", function () {
        const isChecked = parentCheckbox.checked;
        childCheckboxes.forEach((childCheckbox) => {
          childCheckbox.checked = isChecked;
        });

        // 관련 terms-list 접기/펼치기
        toggleTermsListDisplay(groupDataAttr, !isChecked);
      });
    }
  };

  // terms-list를 접거나 펼치는 함수
  const toggleTermsListDisplay = (groupDataAttr, shouldDisplay) => {
    const relatedTermsList = document.querySelector(
      `.terms-list[data-group="${groupDataAttr}"]`
    );

    if (relatedTermsList) {
      relatedTermsList.style.display = shouldDisplay ? "block" : "none";

      // btn-toggle open 클래스 동기화
      const toggleButton = document.querySelector(
        `.btn-toggle[data-group="${groupDataAttr}"]`
      );
      if (toggleButton) {
        toggleButton.classList.toggle("open", shouldDisplay);
      }
    }
  };

  // btn-toggle 클릭 이벤트 추가
  const initializeToggleButtons = () => {
    const toggleButtons = document.querySelectorAll(".btn-toggle");

    toggleButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        // 기본 동작 방지 (체크박스 상태 변경 방지)
        event.preventDefault();

        const groupDataAttr = button.getAttribute("data-group");

        // 관련 terms-list 찾기
        const relatedTermsList = document.querySelector(
          `.terms-list[data-group="${groupDataAttr}"]`
        );

        if (relatedTermsList) {
          const isCurrentlyVisible =
            window.getComputedStyle(relatedTermsList).display !== "none";
          toggleTermsListDisplay(groupDataAttr, !isCurrentlyVisible);
        }
      });
    });
  };

  // 동적으로 모든 data-group 값을 가져와 처리
  const allGroups = Array.from(
    document.querySelectorAll(".terms-list[data-group]")
  ).map((element) => element.getAttribute("data-group"));

  // 중복 제거 후 각 그룹에 대해 처리
  [...new Set(allGroups)].forEach((group) => {
    updateParentCheckboxState(group);
    updateChildCheckboxState(group);
  });

  // btn-toggle 초기화
  initializeToggleButtons();
});

$(document).ready(function () {
  const modals = document.querySelectorAll(".modal-slide.type5"); // 모든 type5 모달 선택

  modals.forEach((modal) => {
    const groupAllCheckboxes = modal.querySelectorAll('input[type="checkbox"][id*="_all"]'); // 그룹 전체 선택 체크박스들
    const agreeButton = modal.querySelector("#btn-agree4"); // 동의 버튼
    const toggleButtons = modal.querySelectorAll(".btn-toggle"); // 모든 btn-toggle 버튼

    // 각 terms-list의 상태를 추적하는 객체 (초기값: false = 숨김 상태)
    const termsListStates = {};

    // 초기화: 모든 terms-list를 숨김 상태로 설정
    toggleButtons.forEach((button, index) => {
      const termsWrap = modal.querySelectorAll(".terms-list")[index];
      if (termsWrap) {
        const groupName = button.getAttribute("data-group");
        // 초기 상태를 false로 설정 (CSS에서 display: none이므로)
        termsListStates[groupName] = false;
        
        // btn-toggle과 상위 check-all에 동일한 open 클래스 설정 (초기값: false)
        const checkAll = button.closest(".check-all");
        if (checkAll) {
          checkAll.classList.toggle("open", false);
          button.classList.toggle("open", false);
        }
      }
    });

    // 각 그룹의 전체 선택 체크박스 이벤트
    groupAllCheckboxes.forEach((checkAllCheckbox) => {
      checkAllCheckbox.addEventListener("change", function () {
        const isChecked = checkAllCheckbox.checked;
        const groupName = checkAllCheckbox.getAttribute("data-group");

        // 해당 그룹의 하위 체크박스들 상태 변경
        const childCheckboxes = modal.querySelectorAll(
          `.terms-list[data-group="${groupName}"] input[type="checkbox"]`
        );

        childCheckboxes.forEach((childCheckbox) => {
          childCheckbox.checked = isChecked;
        });

        // 해당 그룹의 terms-list 접기/펼치기
        const termsList = modal.querySelector(
          `.terms-list[data-group="${groupName}"]`
        );
        if (termsList) {
          termsList.style.display = isChecked ? "none" : "block";
        }

        // btn-toggle open 클래스 동기화
        const toggleButton = modal.querySelector(
          `.btn-toggle[data-group="${groupName}"]`
        );
        if (toggleButton) {
          toggleButton.classList.toggle("open", !isChecked);
        }

        // 버튼 활성화 여부 확인
        updateAgreeButtonState();
      });
    });

    // 개별 약관 체크박스 상태 변경 시 그룹 전체 선택 체크박스와 버튼 상태 업데이트
    const childCheckboxes = modal.querySelectorAll(
      ".terms-list input[type='checkbox']"
    );

    childCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const groupName = checkbox
          .closest(".terms-list")
          .getAttribute("data-group");
        const groupCheckAllCheckbox = modal.querySelector(
          `input[type="checkbox"][data-group="${groupName}"][id*="_all"]`
        );

        if (groupCheckAllCheckbox) {
          // 해당 그룹의 모든 하위 체크박스가 체크되었는지 확인
          const groupChildCheckboxes = modal.querySelectorAll(
            `.terms-list[data-group="${groupName}"] input[type="checkbox"]`
          );
          const allChecked = Array.from(groupChildCheckboxes).every(
            (cb) => cb.checked
          );
          groupCheckAllCheckbox.checked = allChecked;
        }

        // 버튼 활성화 여부 확인
        updateAgreeButtonState();
      });
    });

    // btn-toggle 클릭 이벤트 추가
    toggleButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        // 기본 동작 방지 (체크박스 상태 변경 방지)
        event.preventDefault();
        event.stopPropagation();

        const groupName = button.getAttribute("data-group");
        
        // 관련 terms-list 찾기
        const termsList = modal.querySelector(
          `.terms-list[data-group="${groupName}"]`
        );
        
        if (termsList) {
          // 상태 추적 변수 사용 (CSS 우선순위 문제 해결)
          const currentState = termsListStates[groupName] || false;
          
          // 상태 토글
          termsListStates[groupName] = !currentState;
          
          // terms-list 접기/펼치기
          termsList.style.display = termsListStates[groupName] ? "block" : "none";

          // btn-toggle open 클래스 토글
          button.classList.toggle("open", termsListStates[groupName]);

          // check-all의 open 클래스도 동기화
          const checkAll = button.closest(".check-all");
          if (checkAll) {
            checkAll.classList.toggle("open", termsListStates[groupName]);
          }
        }
      });
    });

    // 동의 버튼 활성화 여부 업데이트
    function updateAgreeButtonState() {
      // 모든 그룹의 전체 선택 체크박스가 체크되었는지 확인
      const allGroupAllChecked = Array.from(groupAllCheckboxes).every(
        (cb) => cb.checked
      );

      agreeButton.disabled = !allGroupAllChecked;
      agreeButton.classList.toggle("disabled", !allGroupAllChecked);
    }

    // 초기 상태 동기화
    updateAgreeButtonState();
  });
});
