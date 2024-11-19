class TermsAgreementManager {
  constructor(overallCheckboxId, groups, buttonSelector) {
      this.overallAgreeCheckbox = document.getElementById(overallCheckboxId);
      this.groups = groups.map(group => ({
          groupAllCheckbox: document.getElementById(group.allCheckboxId),
          groupCheckboxes: document.querySelectorAll(`input[data-group="${group.groupName}"]`),
      }));
      this.confirmButton = document.querySelector(buttonSelector);
      if (!this.confirmButton) {
          console.warn(`Button with selector "${buttonSelector}" not found.`);
      }

      // 그룹 내 및 그룹 외 모든 체크박스를 가져오기
      this.allCheckboxes = this.getAllCheckboxes();
      this.requiredCheckboxes = this.getAllRequiredCheckboxes();
      this.requiredCheckboxesLength = this.requiredCheckboxes.length;
      this.checkedRequiredCount = 0; // 체크된 필수 체크박스 개수

      this.init();
  }

  init() {
      if (!this.confirmButton) {
          console.error("Initialization failed: Confirm button is missing.");
          return;
      }

      // 전체 동의 체크박스 이벤트 등록
      this.overallAgreeCheckbox.addEventListener("change", this.handleOverallAgreeChange.bind(this));

      // 그룹별 체크박스 이벤트 등록
      this.groups.forEach(group => {
          this.handleSubGroupAllCheckbox(group.groupAllCheckbox, group.groupCheckboxes);
          this.handleIndividualCheckboxChange(group.groupCheckboxes, group.groupAllCheckbox);
      });

      // 그룹 외 필수 체크박스 이벤트 등록
      this.requiredCheckboxes.forEach(cb => {
          cb.addEventListener("change", this.updateCheckedRequiredCount.bind(this));
      });

      // 초기 버튼 상태 업데이트
      this.updateButtonState();
  }

  getAllCheckboxes() {
      // 그룹 체크박스 + 그룹 외 체크박스를 모두 가져오기
      const groupCheckboxes = this.groups.flatMap(group => Array.from(group.groupCheckboxes));
      const independentCheckboxes = Array.from(document.querySelectorAll('input[data-required="true"]:not([data-group])'));

      return [...groupCheckboxes, ...independentCheckboxes];
  }

  getAllRequiredCheckboxes() {
      // 그룹 내 필수 체크박스 + 그룹 외 필수 체크박스를 모두 가져오기
      const groupRequiredCheckboxes = this.groups.flatMap(group =>
          Array.from(group.groupCheckboxes).filter(cb => cb.dataset.required === "true")
      );

      return [...groupRequiredCheckboxes, ...independentRequiredCheckboxes];
  }

  handleOverallAgreeChange() {
      const isChecked = this.overallAgreeCheckbox.checked;

      // 모든 체크박스(그룹 포함, 그룹 외 포함)에 동의 상태 설정
      this.allCheckboxes.forEach(cb => (cb.checked = isChecked));

      // 필수 체크박스 카운트를 업데이트
      this.checkedRequiredCount = isChecked ? this.requiredCheckboxesLength : 0;

      // 버튼 상태 업데이트
      this.updateButtonState();
  }

  handleSubGroupAllCheckbox(groupAllCheckbox, groupCheckboxes) {
      groupAllCheckbox.addEventListener("change", () => {
          const isChecked = groupAllCheckbox.checked;
          groupCheckboxes.forEach(cb => (cb.checked = isChecked));
          this.updateOverallAgreeCheckbox();
          this.updateCheckedRequiredCount(); // 그룹 내 필수 체크박스 카운트 업데이트
          this.updateButtonState();
      });
  }

  handleIndividualCheckboxChange(groupCheckboxes, groupAllCheckbox) {
      groupCheckboxes.forEach(cb => {
          cb.addEventListener("change", () => {
              this.updateGroupAllCheckbox(groupCheckboxes, groupAllCheckbox);
              this.updateOverallAgreeCheckbox();
              this.updateCheckedRequiredCount(cb); // 개별 체크박스 클릭 처리
              this.updateButtonState();
          });
      });
  }

  updateGroupAllCheckbox(groupCheckboxes, groupAllCheckbox) {
      const allChecked = Array.from(groupCheckboxes).every(cb => cb.checked);
      groupAllCheckbox.checked = allChecked;
  }

  updateOverallAgreeCheckbox() {
      const allGroupsChecked = this.groups.every(group =>
          Array.from(group.groupCheckboxes).every(cb => cb.checked)
      );
      this.overallAgreeCheckbox.checked = allGroupsChecked;
  }

  updateCheckedRequiredCount(cb = null) {
      if (cb) {
          // 클릭된 체크박스가 필수 항목인지 확인
          if (cb.dataset.required === "true") {
              this.checkedRequiredCount += cb.checked ? 1 : -1;
          }
      } else {
          // 모든 필수 체크박스를 다시 계산
          this.checkedRequiredCount = this.requiredCheckboxes.filter(cb => cb.checked).length;
      }
  }

  updateButtonState() {
      const allRequiredChecked = this.checkedRequiredCount === this.requiredCheckboxesLength;
      if (this.confirmButton) {
          this.confirmButton.disabled = !allRequiredChecked;
      }
  }
}
