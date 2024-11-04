$(document).ready(function () {
    /* 셀렉트 박스 */
    const selectBoxes = document.querySelectorAll(".selectBox");

    selectBoxes.forEach((selectBox) => {
        const label = selectBox.querySelector(".label");
        const options = selectBox.querySelectorAll(".optionItem");

        // '기타' 옵션 선택 시 '기타' 입력 formGroup 추가/삭제 함수
        const handleSelect = (item) => {
            selectBox.classList.remove("active");
            label.textContent = item.textContent;
            selectBox.classList.add("comp");

            const formGroup = selectBox.closest(".formGroup");

            // unique ID 생성
            const uniqueId = `otherCountryInput-${Math.random().toString(36).substring(2, 9)}`;

            if (item.textContent.trim() === "기타") {
                // '기타' 옵션이 선택되었고, 해당 formGroup 아래에 추가된 '기타' 입력 필드가 없을 때
                if (!formGroup.nextElementSibling || !formGroup.nextElementSibling.classList.contains("otherCountryInput")) {
                    formGroup.insertAdjacentHTML(
                        "afterend",
                        `
                    <div class="formGroup otherCountryInput" id="${uniqueId}">
                        <label for="${uniqueId}-input"></label>
                        <input type="text" id="${uniqueId}-input" name="other1" placeholder="국가 입력">
                    </div>
                `
                    );
                }
            } else {
                // '기타' 외의 옵션 선택 시 '기타' 입력 formGroup 삭제
                if (formGroup.nextElementSibling && formGroup.nextElementSibling.classList.contains("otherCountryInput")) {
                    formGroup.nextElementSibling.remove();
                }
            }
        };

        // 옵션 클릭 시 handleSelect 호출
        options.forEach((option) => {
            option.addEventListener("click", () => handleSelect(option));
        });

        // 라벨을 클릭 시 옵션 목록이 열리고 닫힘
        label.addEventListener("click", () => {
            if (selectBox.classList.contains("active")) {
                selectBox.classList.remove("active");
            } else {
                // 다른 selectBox는 닫기
                selectBoxes.forEach((box) => {
                    box.classList.remove("active");
                });
                selectBox.classList.add("active");
            }
        });
    });

    // 모든 '기타' 옵션에 대해 클릭 시 관련 input에 포커스를 이동
    const otherOptions = document.querySelectorAll(".otherOption");

    otherOptions.forEach((option) => {
        option.addEventListener("click", function () {
            const targetInputId = option.getAttribute("data-target"); // data-target 속성값을 가져옴
            const targetInput = document.getElementById(targetInputId);
            if (targetInput) {
                targetInput.focus(); // 해당 input에 포커스 이동
            }
        });
    });

    // 파일 등록 버튼
    const uploadBtns = document.querySelectorAll(".uploadBtn");

    uploadBtns.forEach((button) => {
        button.addEventListener("click", function () {
            const fileInputId = this.getAttribute("data-file-id");
            const fileInput = document.getElementById(fileInputId);

            // 파일 선택 창 열기
            fileInput.click();

            // 파일 선택 후 파일명을 열에 표시
            fileInput.addEventListener("change", function () {
                const fileNameCell = document.getElementById(`fileName${fileInputId.slice(-1)}`); // 해당 열의 파일명 셀
                if (fileInput.files.length > 0) {
                    fileNameCell.textContent = fileInput.files[0].name;
                }
            });
        });
    });
});
