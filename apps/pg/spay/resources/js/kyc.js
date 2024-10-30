$(document).ready(function () {
    /* 셀렉트 박스 */
    const selectBoxes = document.querySelectorAll(".selectBox");

    selectBoxes.forEach((selectBox) => {
        const label = selectBox.querySelector(".label");
        const options = selectBox.querySelectorAll(".optionItem");

        // 클릭한 옵션의 텍스트를 라벨 안에 넣음
        const handleSelect = (item) => {
            selectBox.classList.remove("active");
            label.innerHTML = item.textContent;
            selectBox.classList.add("comp");
        };

        // 옵션 클릭 시 클릭한 옵션을 넘김
        options.forEach((option) => {
            option.addEventListener("click", () => handleSelect(option));
        });

        // 라벨을 클릭시 옵션 목록이 열림/닫힘
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
