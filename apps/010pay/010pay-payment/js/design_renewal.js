// form
$(function () {
    var input = $("input[type=text], input[type=password], input[type=tel], input[type=email], input[type=number], select, textarea, .input");
    var row = $(".input input, .input select, .input .select");

    // input Focus
    input
        .on("focus", function () {
            $(this).addClass("focus");
            $(".bottom-banner-area.fixed").addClass("hidden-mobile");
            $(this).parents(".input-container").addClass("focus-on");

            // .floating-label.first 텍스트를 변경
            if ($(this).closest(".input-container").hasClass("focus-on")) {
                var floatingLabel = $(this).closest(".input-container").find(".floating-label");

                // id-number 클래스 처리
                if ($(this).closest(".id-number").length) {
                    floatingLabel.text("주민 등록 번호 앞 7자리");
                }
                // type-text 클래스 처리
                else if ($(this).closest(".type-text").length) {
                    floatingLabel.text("텍스트");
                }
                // type-timer 클래스 처리
                else if ($(this).closest(".type-timer").length) {
                    floatingLabel.text("인증 번호");
                }
            }
        })
        .on("blur", function () {
            $(this).removeClass("focus");
            $(".bottom-banner-area.fixed").removeClass("hidden-mobile");
            $(this).parents(".input-container").removeClass("focus-on");

            // id-number 하위 input인 경우, 값이 비어 있지 않으면 focus-on 유지
            var hasValue = false;
            $(this)
                .parents(".input-container")
                .find("input, select, textarea")
                .each(function () {
                    if ($(this).val().trim() !== "") {
                        hasValue = true;
                    }
                });

            // input에 값이 있으면 focus-on 유지, 없으면 제거
            if (hasValue) {
                $(this).parents(".input-container").addClass("comp"); // .comp 클래스 추가 (값이 있을 때)

                // id-number 하위 input인 경우, 텍스트가 "주민 등록 번호 앞 7자리"로 유지되도록 설정
                if ($(this).closest(".id-number").length) {
                    $(this).parents(".input-container").addClass("fill");
                    var floatingLabel = $(this).closest(".input-container").find(".floating-label");
                    floatingLabel.text("주민 등록 번호 앞 7자리");
                }
            } else {
                $(this).parents(".input-container").removeClass("focus-on");
                $(this).parents(".input-container").removeClass("comp");

                // id-number 하위 input인 경우, 원래 텍스트로 복원 ("생년월일")
                if ($(this).closest(".id-number").length) {
                    $(this).parents(".input-container").removeClass("fill");
                    var floatingLabel = $(this).closest(".input-container").find(".floating-label");
                    floatingLabel.text("생년월일");
                }
                // type-text 하위 input인 경우, 원래 텍스트로 복원 ("텍스트 입력")
                else if ($(this).closest(".type-text").length) {
                    var floatingLabel = $(this).closest(".input-container").find(".floating-label");
                    floatingLabel.text("텍스트를 입력 하세요");
                }
                // type-timer 하위 input인 경우, 원래 텍스트로 복원 ("6자리 숫자 입력")
                else if ($(this).closest(".type-timer").length) {
                    var floatingLabel = $(this).closest(".input-container").find(".floating-label");
                    floatingLabel.text("6자리 숫자 입력");
                }
            }
        });

    row.on("focus", function () {
        $(this).parents(".input").addClass("focus");
        $(this).removeClass("focus");
    })
        .blur(function () {
            $(this).parents(".input").removeClass("focus");
        })
        .blur();

    if ($(".id-number").length) {
        var totalInputLength = 0;
        $(".id-number input")
            .on("input change", function () {
                totalInputLength = 0;
                var inputContainer = $(this).closest(".id-number");
                var input = inputContainer.find("input");
                input.each(function (i, e) {
                    var inputLength = $(e).val().length;
                    totalInputLength += inputLength;
                    if (i === 0 && inputLength === 6) {
                        input[1].focus();
                    }
                });
                if (totalInputLength > 0) {
                    inputContainer.find(".icon-del").show();
                } else {
                    inputContainer.find(".icon-del").hide();
                }
            })
            .on("blur", function () {
                $(this).closest(".id-number").find(".icon-del").hide();
            })
            .on("focus", function () {
                if (totalInputLength > 0) {
                    $(this).closest(".id-number").find(".icon-del").show();
                }
            });
    }
});

// 바디 스크롤 제거/해제
var scrollHeight = 0;
function scrollOff() {
    scrollHeight = $(document).scrollTop();
    $("body").addClass("modal-open");
    $("#wrap").css("position", "fixed");
    $("#wrap").css("top", -scrollHeight);
    $("#header").css("top", "-0.9px");
}
function scrollOn() {
    $("body").removeClass("modal-open");
    $("#wrap").css("top", 0);
    $("#wrap").css("position", "relative");
    $("#header").css("top", "-1px");
    $(document).scrollTop(scrollHeight);
}

// 레이어 팝업(모달) 열기
function modalOpen(obj) {
    var temp = $("#" + obj);
    temp.show();
    scrollOff(); // 바디 스크롤 제거

    // 위치
    var thisDialog = temp.children(".modal-dialog");
    var marginValue = thisDialog.outerHeight() / 2;
    $(thisDialog).css("margin-top", "-" + marginValue + "px");
}

// 레이어 팝업(모달) 닫기
function modalClose() {
    $(".modal").hide();
    scrollOn(); // 바디 스크롤 제거 해제
}

// bottom modal 닫기
function modalCloseSlide() {
    console.log("modalCloseSlide called"); // 디버깅 로그
    $(".modal").fadeOut(200);
    $(".modal").find(".modal-content").animate({ bottom: modalH }, 200);

    // 이중 모달이 아닌 경우
    if (!$(".modal").hasClass("depth2")) {
        scrollOn(); // 바디 스크롤 제거 해제
    }
}

function modalCloseNoMove() {
    $(".modal").hide();
    // scrollOn(); // 바디 스크롤 제거 해제
}

function modalClose(obj) {
    if (obj != null && obj != undefined && obj != "") {
        var temp = $("#" + obj);
        temp.hide();
    } else {
        $(".modal").hide();
    }
    scrollOn(); // 바디 스크롤 제거 해제
}

function modalCloseNoMove(obj) {
    if (obj != null && obj != undefined && obj != "") {
        var temp = $("#" + obj);
        temp.hide();
    } else {
        $(".modal").hide();
    }
    // scrollOn(); // 바디 스크롤 제거 해제
}

// 레이어 팝업(모달) 닫기 (오류 페이지 외)
function modalAllClose() {
    $(".modal").hide();
    $("body").removeClass("modal-open"); // 바디 스크롤 제거 해제
}

// 레이어 애니메이션 외
$(function () {
    // 셀렉트 옵션 선택(통신사, 머니 충전 계좌, 이용내역 필터 등)
    $(".modal-slide .btn-list .btn").click(function () {
        $(this).parents(".btn-list").find(".btn").removeClass("on");
        $(this).addClass("on");
    });

    // 모든 input 및 select-box 요소의 값이 채워져 있는지 확인하는 함수
    function checkAllInputsAndSelects() {
        const allInputs = document.querySelectorAll(".section input");
        const allSelectBoxes = document.querySelectorAll(".select-box");

        // 모든 input 요소가 채워졌는지 확인
        const inputsFilled = Array.from(allInputs).every((input) => input.value.trim() !== "");
        // 모든 select-box 요소에 comp 클래스가 있는지 확인
        const selectsFilled = Array.from(allSelectBoxes).every((box) => box.classList.contains("comp"));

        return inputsFilled && selectsFilled;
    }

    // input 삭제 버튼
    document.querySelectorAll(".js-text-del").forEach((button) => {
        button.addEventListener("mousedown", function (e) {
            e.preventDefault();
            const inputField = this.closest(".input-container").querySelectorAll(".custom-input");
            inputField.forEach((e, i) => {
                e.value = "";
                if (i === 0) {
                    e.focus();
                }
            });
        });
    });

    // 검색 인풋
    $(".input-container.search input").on("input", function (e) {
        showCountryList(e.target.value.trim(), $(this).closest(".input-container"));
    });

    $(".input-container.search input").on("focus", function () {
        showCountryList($(this).val().trim(), $(this).closest(".input-container"));
    });

    function showCountryList(searchValue, $inputContainer) {
        var countryList = $inputContainer.attr("data-country");
        var countryArray = JSON.parse(countryList);

        var $searchList = $inputContainer.find(".search-list");

        // <ul> 요소가 없으면 생성
        if ($searchList.length === 0) {
            $searchList = $("<ul class='search-list'></ul>").appendTo($inputContainer);
        }

        // 기존 <ul> 내용 지우기
        $searchList.empty();

        // 일치하는 항목 찾기
        var matchedItems = countryArray.filter(function (country) {
            return country.toLowerCase().includes(searchValue.toLowerCase());
        });

        // 일치하는 항목이 있을 경우 <li> 추가 및 <ul> 표시, 없으면 숨기기
        if (matchedItems.length > 0) {
            matchedItems.forEach(function (country) {
                $searchList.append(`<li>${country}</li>`);
            });
            $searchList.show(); // 일치하는 항목이 있을 때만 표시
        } else {
            $searchList.hide(); // 일치하는 항목이 없으면 숨기기
        }
    }

    // blur 시 <ul> 숨기기
    $(".input-container.search input").on("blur", function () {
        var $this = $(this);
        setTimeout(function () {
            $this.closest(".input-container").find(".search-list").hide();
        }, 10);
    });

    // <li> 클릭 시 해당 항목의 텍스트를 <input>에 설정하고 <ul> 숨기기
    $(document).on("click", ".search-list li", function () {
        var selectedCountry = $(this).text();
        var $input = $(this).closest(".input-container").find("input");
        $input.val(selectedCountry); // 선택한 텍스트를 <input> 값으로 설정
        $(this).closest(".search-list").hide(); // 리스트 숨기기
    });
});

// 레이아웃, 토글
$(function () {
    // 짧은 화면 버튼 하단 고정
    function fixFootBtn() {
        var winHeight = $(window).innerHeight();
        var contentHeight = $("#content").innerHeight();
        var gap = winHeight - contentHeight; // 콘텐츠가 짧은 경우

        if (gap >= 0) {
            $(".bottom-area").addClass("fixed");
            $("#content.newType .bottom-area").removeClass("fixed");
            $(".layout-payment .bottom-area").removeClass("fixed");
        } else {
            $(".bottom-area").removeClass("fixed");
        }
    }
    fixFootBtn();

    // 하단 고정 영역 여백 확보
    function wrapPadding() {
        var fixFoot = $(".bottom-area.fixed");
        const matchesMediaQuery = window.matchMedia("(max-width:999px) and (orientation:landscape)").matches;
        const matchesSpecialSize = window.matchMedia("(min-width:690px) and (max-width:720px) and (min-height:720px) and (max-height:750px)").matches;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if (fixFoot.length > 0 && (!matchesMediaQuery || matchesSpecialSize)) {
            var fixFootHeight = $(fixFoot).innerHeight();
            $("#content").css("padding-bottom", fixFootHeight);
            $(".wrap.oneStore").removeClass("horizontal");
        } else {
            $(".wrap.oneStore").addClass("horizontal");
            $("#content").css("padding-bottom", 24);
        }

        // fold 6 대응
        if (matchesSpecialSize) {
            console.log("matchesSpecialSize:", matchesSpecialSize);
            var fixFootHeight = $(fixFoot).innerHeight();
            $("#content").addClass("fold-style");
            $("#content").css("padding-bottom", fixFootHeight);
            $(".wrap.oneStore").removeClass("horizontal");

            // accNo input 요소에 대한 포커스/블러 이벤트 처리
            $("#accNo").on("focus", function () {
                // 포커스가 될 때 .bottom-area에 fold-top-0 클래스 추가
                $(".bottom-area").addClass("fold-top-0");
            });

            $("#accNo").on("blur", function () {
                // 포커스가 해제될 때 .bottom-area에서 fold-top-0 클래스 제거
                $(".bottom-area").removeClass("fold-top-0");
            });
        } else {
            $("#content").removeClass("fold-style");
        }
    }
    wrapPadding();

    // 보안 키패드 상단 링크 위치
    function keypadOffset() {
        if ($(".kpd-wrap").length) {
            var keypadOffset = $(".kpd-wrap").offset().top; // 키패드 상단 오프셋
            var topAreaH = $(".keypad-top-area").innerHeight(); // 키패드 상단 영역 padding-bottom 포함 높이
            var keypadOffsetT = keypadOffset - topAreaH;
            $(".keypad-top-area").css("top", keypadOffsetT);
        }
    }
    keypadOffset();

    // 리사이즈
    $(window).resize(function () {
        fixFootBtn();
        wrapPadding();
        keypadOffset();
    });

    // popover
    $(".open-popover").click(function () {
        $(this).next().toggleClass("hidden");
    });
});

// 하단 레이어 팝업(슬라이드 모달) 기본 세팅
var modalCont = $(".modal-info .modal-content");
var modalH = $(window).height();
modalH = modalH * -1;
$(modalCont).css("bottom", modalH); // 팝업들 bottom 값 setting

// 하단 레이어 팝업(슬라이드 모달) 열기
function modalOpenSlide(obj) {
    var temp = $("#" + obj);
    var modalCont = $(temp).find(".modal-content");
    var containHeight;
    var contentsHeight;
    setTimeout(function () {
        containHeight = modalCont[0].querySelector(".modal-body").clientHeight;
        contentsHeight = modalCont[0].querySelector(".modal-body").scrollHeight;
        if (containHeight < contentsHeight) {
            modalCont.addClass("scroll");
        }
    }, 100);

    $(modalCont[0])
        .find(".modal-body")
        .on("scroll", function () {
            var bodyScrollTop = $(this).scrollTop();
            if (contentsHeight - containHeight - 60 <= bodyScrollTop) {
                $(modalCont[0]).removeClass("scroll");
            } else {
                $(modalCont[0]).addClass("scroll");
            }
        });

    temp.show();
    $(modalCont).animate({ bottom: 0 }, 200);
    // 이중 모달이 아닌 경우
    if (obj === "modal-useCoupon") {
        $("body").addClass("modal-open");
    } else if (!$(this).hasClass("depth2")) {
        scrollOff(); // 바디 스크롤 제거
    }

    // 팝업 내 하단 버튼 클릭 시 팝업 닫힘
    else
        $(temp)
            .find(".modal-footer .btn")
            .on("click", function (e) {
                if (!$(this).hasClass("not-close")) {
                    modalCloseSlide();
                }
            });

    // 모달 외부 클릭 시 닫기 처리 및 01 출력
    temp.on("click", function (e) {
        // 외부를 클릭했는지 확인
        if (!$(e.target).closest(".modal-content").length) {
            modalCloseSlide(); // 모달 닫기
        }
    });
    // js-modal-close 버튼 클릭 시 모달 닫기 실행
    temp.find(".js-modal-close").on("click", function () {
        modalCloseSlide();
    });

    // 클릭된 버튼의 부모 select-box에 comp 클래스 추가
    let button;
    let selectBox;

    if (event && event.target) {
        // 클릭 이벤트가 발생한 경우
        button = $(event.target); // 클릭된 버튼
        selectBox = button.closest(".select-box"); // 부모 select-box 찾기
    } else {
        // 클릭 이벤트가 발생하지 않은 경우 기본값 또는 대체 로직 처리
        button = $(".select-box .label"); // 예: 첫 번째 .label 선택
        selectBox = button.closest(".select-box");
    }

    // 이후 로직 처리
    if (button && selectBox) {
        console.log("Button:", button);
        console.log("SelectBox:", selectBox);
        // 추가 작업 수행
    }

    // 모달 높이가 큰 경우 포지션 변경
    function modalContPos() {
        var modalContent = temp.find(".modal-content");
        var modalContentH = temp.find(".modal-content").height();
        var modalDialogH = temp.find(".modal-dialog").height();
        var gap = modalDialogH - modalContentH;
        if (gap < 0) {
            modalContent.css("position", "relative");
        } else {
            modalContent.css("position", "fixed");
        }
    }
    modalContPos();

    // 리사이즈
    $(window).resize(function () {
        modalContPos();
    });

    // 버튼 활성화 업데이트 함수
    function updateConfirmButton() {
        const allChecked = temp.find(".terms-list .checkbox.child input").length === temp.find(".terms-list .checkbox.child input:checked").length;
        const confirmButton = temp.find(".btn-confirm");

        // 모든 체크박스가 체크되었으면 버튼 활성화, 아니면 비활성화
        if (allChecked) {
            confirmButton.removeClass("disabled").prop("disabled", false);
        } else {
            confirmButton.addClass("disabled").prop("disabled", true);
        }
    }
    // 전체 동의 체크박스 클릭 시, 모든 개별 약관 체크박스 상태 업데이트
    temp.find("#checkbox_011_01").on("change", function () {
        const isChecked = $(this).is(":checked");
        temp.find(".terms-list .checkbox.child input").prop("checked", isChecked);
        updateConfirmButton();
    });
    // 개별 체크박스 클릭 시, 전체 동의 체크박스 상태와 확인 버튼 업데이트
    temp.find(".terms-list .checkbox.child input").on("change", function () {
        const allChecked = temp.find(".terms-list .checkbox.child input").length === temp.find(".terms-list .checkbox.child input:checked").length;
        temp.find("#checkbox_011_01").prop("checked", allChecked);
        updateConfirmButton();
    });

    // 리스트에서 선택한 항목을 버튼에 반영
    $(".option-item button").on("click", function () {
        var selectedBank = $(this).text().trim(); // 선택한 이름 가져오기
        selectBox.find(".label").text(selectedBank); // 버튼에 텍스트 업데이트
        selectBox.addClass("comp");

        // step-list에서 현재 on 클래스가 있는 li 찾고 다음 li에 on 클래스 추가
        var currentStep = $(".step-list li.on"); // 현재 on 클래스가 있는 li
        var nextStep = currentStep.next("li"); // 다음 li 요소 찾기

        // 다음 li가 있을 경우에만 on 클래스 추가
        if (nextStep.length) {
            nextStep.addClass("on"); // 다음 li에 on 클래스 추가
        }
        modalCloseSlide(); // 모달 닫기
    });
}

// 버튼 클릭시 텍스트 변경
document.querySelectorAll(".js-change-btn").forEach((button) => {
    button.addEventListener("click", function () {
        const title = this.dataset.title || ""; // 버튼의 데이터 속성에서 제목 가져오기
        const message = this.dataset.message || ""; // 버튼의 데이터 속성에서 메시지 가져오기
        const cancelText = this.dataset.cancel || "취소"; // 취소 버튼 텍스트
        const confirmText = this.dataset.confirm || "확인"; // 확인 버튼 텍스트
        const showCancel = this.dataset.showCancel !== "false"; // 취소 버튼 표시 여부

        // 모달 내용 업데이트
        document.getElementById("promptTitle").innerHTML = title;
        document.getElementById("promptContents").innerHTML = message;
        document.querySelector("#commonPrompt .btn-cancel").innerHTML = cancelText;
        document.querySelector("#commonPrompt .btn-confirm").innerHTML = confirmText;

        // 취소 버튼 표시/숨기기
        const cancelButton = document.getElementById("promptNo");
        if (showCancel) {
            cancelButton.style.display = "inline-block";
            cancelButton.innerHTML = cancelText;
        } else {
            cancelButton.style.display = "none";
        }

        // 모달 표시 (여기서 modalOpen은 모달을 여는 함수로 가정)
        modalOpen("commonPrompt");
    });
});
