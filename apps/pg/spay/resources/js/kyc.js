// 바디 스크롤 제거/해제
var scrollHeight = 0;
function scrollOff() {
    scrollHeight = $(document).scrollTop();
    $("body").addClass("modal-open");
    $("#wrap").css({
        position: "fixed",
        top: -scrollHeight + "px",
        width: "100%",
        left: "0",
        right: "0",
    });
    var $header = $("#header");
    if ($header.length) {
        $header.css("top", "-0.9px");
    }
}
function scrollOn() {
    $("body").removeClass("modal-open");
    $("#wrap").css({
        position: "relative",
        top: "0",
        width: "auto",
        left: "auto",
        right: "auto",
    });
    var $header = $("#header");
    if ($header.length) {
        $header.css("top", "-1px");
    }
    $(document).scrollTop(scrollHeight);
}

// 모달 열기 함수
var modalOpenExecuted = false;
var modalNext;

// 슬라이드 모달 닫기 함수 (전역 함수로 변경)
function modalCloseSlide(modalElement) {
    var $modal = modalElement ? $(modalElement) : $(".modal-slide.modal-open");
    if ($modal.length === 0) return;

    $modal.removeClass("show");
    $modal.addClass("closing");

    // transition 완료 후 모달 숨김
    setTimeout(function () {
        $modal.removeClass("modal-open closing");
        $modal.css("display", "none");

        // 이중 모달이 아닌 경우
        if (!$modal.hasClass("depth2")) {
            scrollOn(); // 바디 스크롤 제거 해제
        }
    }, 300); // CSS transition 시간과 동일하게
}

function modalOpen(obj1, obj2) {
    // data-target에서 # 제거
    var modalId = obj1.replace("#", "");
    var temp = $("#" + modalId);

    if (temp.length === 0) {
        return;
    }

    modalNext = obj2;
    modalOpenExecuted = true;

    // modal-slide 클래스가 있는 경우 하단 슬라이드 모달 처리
    if (temp.hasClass("modal-slide")) {
        var modalDialog = temp.find(".modal-dialog");

        temp.removeClass("closing"); // 이전에 닫힘 상태였다면 클래스 제거
        temp.addClass("modal-open");
        temp.css("display", "block");
        scrollOff(); // 바디 스크롤 제거

        // CSS transition을 활용한 슬라이드 애니메이션
        setTimeout(function () {
            temp.addClass("show");
        }, 10);

        // 바깥 영역 클릭 시 팝업 닫힘
        temp.off("click.modal-slide").on("click.modal-slide", function (e) {
            // 모달 다이얼로그나 모달 콘텐츠 밖을 클릭했고, 클릭한 요소가 모달 자체이거나 모달의 자식 요소인 경우
            if (!modalDialog.has(e.target).length && (e.target === this || $(e.target).hasClass("modal"))) {
                e.stopPropagation();
                modalCloseSlide(temp);
            }
        });

        // 모달 닫기 버튼 클릭 시
        temp.find(".btn-close, [data-dismiss='modal'], .modal-close")
            .off("click.modal-slide")
            .on("click.modal-slide", function (e) {
                e.preventDefault();
                e.stopPropagation();
                modalCloseSlide(temp);
            });

        // 통신사 선택 모달의 리스트 아이템 클릭 시 선택 처리
        if (modalId === "modalTelecom") {
            temp.find(".select-list li")
                .off("click.telecom")
                .on("click.telecom", function () {
                    var $clickedItem = $(this);
                    var selectedText = $clickedItem.text().trim();
                    var $selectContainer = $(".custom-select.js-modal-slide");
                    var $selectUl = $selectContainer.find(".select ul");

                    // 모달 내 모든 li에서 bold 클래스 제거
                    temp.find(".select-list li").removeClass("bold");

                    // 클릭한 항목에 bold 클래스 추가
                    $clickedItem.addClass("bold");

                    // 선택된 값 표시
                    $selectUl.html("<li>" + selectedText + "</li>");

                    // 모달 닫기
                    modalCloseSlide(temp);
                });
        }
    } else {
        // 일반 모달 처리
        temp.addClass("modal-open");
        temp.css("display", "block");
        scrollOff(); // 바디 스크롤 제거

        // 일반 모달 닫기 함수
        function modalOut() {
            temp.removeClass("modal-open");
            temp.css("display", "none");

            // 이중 모달이 아닌 경우
            if (!temp.hasClass("depth2")) {
                scrollOn(); // 바디 스크롤 제거 해제
            }
        }

        // 팝업 내 닫기 버튼 클릭 시 팝업 닫기
        temp.find(".modal-close, .btn-close, [data-dismiss='modal']")
            .off("click.modal")
            .on("click.modal", function () {
                modalOut();
            });
    }
}

// 모달 닫기 함수
function modalClose() {
    $("body").removeClass("modal-open");
    $(".modal").removeClass("modal-open");
    $(".modal").addClass("modal-close");
    setTimeout(function () {
        $(".modal").css("display", "none");
        $(".modal").removeClass("modal-close");
        modalOther = 0;
        scrollOn();
    }, 100); // 애니메이션 지속 시간
}

var modalOther = 0;
var lastFocusedElement = null;

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

    // 모달 열기 버튼과 모달 요소, 닫기 버튼을 선택
    const openModalBtns = document.querySelectorAll(".openModalBtn");
    const closeModalBtns = document.querySelectorAll(".closeModalBtn");
    const body = document.body; // body 요소 선택

    // 모달 열기
    openModalBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const targetModal = document.getElementById(this.getAttribute("data-target"));
            targetModal.style.display = "block";
            body.style.overflow = "hidden"; // 모달 열릴 때 스크롤 비활성화
        });
    });

    // 모달 닫기
    closeModalBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const targetModal = document.getElementById(this.getAttribute("data-target"));
            targetModal.style.display = "none";
            body.style.overflow = ""; // 모달 닫힐 때 스크롤 활성화
        });
    });

    // 모달 외부 영역 클릭 시 닫기
    window.addEventListener("click", function (event) {
        const modals = document.querySelectorAll(".modal");
        modals.forEach((modal) => {
            if (event.target === modal) {
                modal.style.display = "none";
                body.style.overflow = ""; // 모달 닫힐 때 스크롤 활성화
            }
        });
    });
    //
});

if (typeof $.alertMessage !== "function") {
    $.alertMessage = function (title, contents, alertObj) {
        var $modal;

        if (alertObj) {
            if (alertObj.jquery) {
                $modal = alertObj;
            } else {
                $modal = $(alertObj);
            }
        }

        if (!$modal || !$modal.length) {
            $modal = $("#commonAlert");
        }

        if (!$modal.length) {
            return;
        }

        var messageTitle = typeof title === "undefined" ? "" : title;
        var messageContents = typeof contents === "undefined" ? "" : contents;

        var $title = $modal.find("#alertTitle");
        if ($title.length) {
            $title.html(messageTitle);
        }

        var $contents = $modal.find("#alertContents");
        if (!$contents.length) {
            $contents = $modal.find(".prompt-contents");
        }
        if ($contents.length) {
            $contents.html(messageContents);
        }

        $modal.show().focus();

        var $dialog = $modal.find(".modal-dialog");
        if ($dialog.length) {
            var marginValue = $dialog.outerHeight() / 2;
            $dialog.css("margin-top", "-" + marginValue + "px");
        }

        if (typeof scrollOff === "function") {
            scrollOff();
        }
    };
}

// 포인트다모아 본인확인 화면 - 닫기 버튼 공통 컨펌 처리
$(document).ready(function () {
    $(document).on("click", ".point-damoa.point-damoa-auth #closeWindow", function () {
        var $btn = $(this);
        var title = $btn.data("confirmTitle");
        var contents = $btn.data("confirmContents");
        var okSelector = $btn.data("confirmOk");

        if (typeof title === "undefined" || title === null) {
            title = "";
        }
        if (typeof contents === "undefined" || contents === null) {
            contents = "화면을 닫으시겠습니까?<br> *입력한 내용이 삭제됩니다.";
        }

        var $okButton = okSelector ? $(okSelector) : $("#confirmOk");

        if ($("#confirmTitle").length) {
            $("#confirmTitle").html(title);
        }
        if ($("#confirmContents").length) {
            $("#confirmContents").html(contents);
        }

        if (typeof $.confirmMessage === "function") {
            $.confirmMessage(title, contents, $okButton, "");
        }
    });
});

// 모달(레이어 팝업), 배너, 팝오버
$(function () {
    // 모달 열기
    $("[data-toggle='modal']").click(function () {
        var openBtn = $(this); // "보기" 버튼 참조
        var target = $(this).attr("data-target"); // 모달 ID
        var modal = $(target);
        $(target).show(); // 모달 열기
        scrollOff(); // 바디 스크롤 제거

        // 모달 위치 조정
        var thisDialog = modal.find(".modal-dialog");
        var marginValue = thisDialog.outerHeight() / 2;
        thisDialog.css("margin-top", "-" + marginValue + "px");

        // 포커스 이동 및 aria-hidden 관리
        setTimeout(function () {
            var modal = $(target)[0];
            var termsTitle = $(target).find(".terms-title")[0];
            if (termsTitle) {
                termsTitle.setAttribute("tabindex", "0"); // 포커스 가능하도록 설정
                termsTitle.focus(); // terms-title로 포커스 이동
            }

            // 외부 콘텐츠 aria-hidden 설정
            // $("#wrap, #header, #content, #footer").attr("aria-hidden", "true");
        }, 300); // 모달 열림에 딜레이가 있으면 약간의 시간 지연을 줄 수 있음

        // 마지막 포커스된 요소 저장 (초점을 복귀할 요소)
        lastFocusedElement = openBtn;
    });

    // 모달 닫기
    $("[data-dismiss='modal']").click(function () {
        var target = $(this).parents(".modal");
        $(target).hide(); // 모달 닫기, aria-hidden 설정
        scrollOn(); // 바디 스크롤 제거 해제

        // 외부 콘텐츠 aria-hidden 해제
        // $("#wrap, #header, #content, #footer").attr("aria-hidden", "false");

        // 모달 닫힐 때 포커스 복귀
        if (lastFocusedElement) {
            lastFocusedElement.focus(); // "보기" 버튼으로 포커스 이동
            lastFocusedElement = null; // 참조 해제
        }
    });

    // 배너 닫기(플로팅 배너)
    $("[data-dismiss='banner']").click(function () {
        var target = $(this).parents(".banner");
        $(target).hide();
    });

    // popover 닫기
    $("[data-dismiss='popover']").click(function () {
        var target = $(this).parents(".popover");
        $(target).hide();
    });

    // 모달 열기 버튼
    $(".js-modal-slide").click(function () {
        var chk = $(this).attr("data-chk"); // 모달이 열리는지 체크
        var target = $(this).attr("data-target"); // 모달 ID
        if (chk == "false") {
        } else {
            modalOpen(target);
        }
    });

    // 모달 외부 클릭 시 닫기 (일반 모달만 처리, 슬라이드 모달은 modalOpen 내부에서 처리)
    $(".modal").on("click", function (event) {
        var $modal = $(this);
        // 슬라이드 모달은 modalOpen 내부에서 이미 처리되므로 제외
        if ($modal.hasClass("modal-slide")) {
            return;
        }

        if ($(event.target).closest(".modal-dialog, .modal-content").length === 0) {
            modalClose();
        }
    });
});

// maxlength
function maxLengthCheck(object) {
    if (object.value.length > object.maxLength) {
        object.value = object.value.slice(0, object.maxLength);
    }
}

// 전화번호 체크
function formatPhoneNumber() {
    var phoneChk = document.getElementById("phone");
    if (phoneChk) {
        phoneChk.addEventListener("input", function () {
            // 현재 입력된 값
            var inputValue = this.value;
            // 숫자 이외의 문자는 모두 제거
            var phoneNumber = inputValue.replace(/\D/g, "");
            // 전화번호 형식에 맞게 "-" 추가
            var formattedNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
            // 입력된 값을 형식에 맞게 업데이트
            this.value = formattedNumber;
        });
    }
}
