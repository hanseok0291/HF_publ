// form
$(function () {
    var input = $("input[type=text], input[type=password], input[type=tel], input[type=email], input[type=number], select, textarea, .input");
    var row = $(".input input, .input select, .input .select");

    // input Focus
    input
        .focus(function () {
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
        .blur(function () {
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
                $(this).parents(".input-container").addClass("focus-on");
                $(this).parents(".input-container").addClass("comp"); // .comp 클래스 추가 (값이 있을 때)

                // id-number 하위 input인 경우, 텍스트가 "주민 등록 번호 앞 7자리"로 유지되도록 설정
                if ($(this).closest(".id-number").length) {
                    var floatingLabel = $(this).closest(".input-container").find(".floating-label");
                    floatingLabel.text("주민 등록 번호 앞 7자리");
                }
            } else {
                $(this).parents(".input-container").removeClass("focus-on");
                $(this).parents(".input-container").removeClass("comp");

                // id-number 하위 input인 경우, 원래 텍스트로 복원 ("생년월일")
                if ($(this).closest(".id-number").length) {
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
        })
        .blur();

    row.focus(function () {
        $(this).parents(".input").addClass("focus");
        $(this).removeClass("focus");
    })
        .blur(function () {
            $(this).parents(".input").removeClass("focus");
        })
        .blur();

    // input value 삭제 버튼
    $(".form-type input")
        .on("input change", function () {
            var $this = $(this);
            var visible = Boolean($this.val());
            $this.next(".form-control-clear").toggleClass("hidden", !visible);
        })
        .trigger("propertychange");
    $(".form-control-clear").on("click", function () {
        $(this).prev("input").val("").trigger("change").focus();
        $(this).toggleClass("hidden", true);
    });

    // 비밀번호 설정 입력상태 표시
    $(".input-mark input").bind("keyup input", function (e) {
        var keyCode = e.keyCode || e.which;
        var byte = $(this).val();
        var del = $(this).val() + 1;
        $(".input-mark .mark i").removeClass();
        if (byte.length == 1) {
            $(".input-mark .mark i:eq(0)").addClass("on");
        } else if (byte.length == 2) {
            $(".input-mark .mark i:eq(0), .input-mark .mark i:eq(1)").addClass("on");
        } else if (byte.length == 3) {
            $(".input-mark .mark i:eq(0), .input-mark .mark i:eq(1), .input-mark .mark i:eq(2)").addClass("on");
        } else if (byte.length == 4) {
            $(".input-mark .mark i:eq(0), .input-mark .mark i:eq(1), .input-mark .mark i:eq(2), .input-mark .mark i:eq(3)").addClass("on");
        } else if (byte.length == 5) {
            $(".input-mark .mark i:eq(0), .input-mark .mark i:eq(1), .input-mark .mark i:eq(2), .input-mark .mark i:eq(3), .input-mark .mark i:eq(4)").addClass("on");
        } else if (byte.length == 6) {
            $(".input-mark .mark i:eq(0), .input-mark .mark i:eq(1), .input-mark .mark i:eq(2), .input-mark .mark i:eq(3), .input-mark .mark i:eq(4), .input-mark .mark i:eq(5)").addClass("on");
        } else {
            $(".input-mark .mark i").removeClass();
        }
        // console.log(byte.length);
    });

    // IE9 이하 jquery.placeholder.js 적용
    $("input, textarea").placeholder();

    
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
    // 약관 네비 슬라이드
    $(".modal-terms .nav.owl-carousel").owlCarousel({
        items: 1,
        nav: true,
        dots: false,
        smartSpeed: 300,
    });

    // 약관 상세 팝업 > 제목 네비 > 시행일 표시 여백
    $(".modal-terms .nav.owl-carousel .select-sm").parents(".item").addClass("has-select");

    // 모달 슬라이드 닫기(셀렉트 옵션, 은행 선택 레이어 팝업)
    $(".modal-slide .btn-close, .modal-slide .btn-list button, .modal-slide .bank-list button").click(function () {
        var temp = $(this).parents(".modal");
        $(temp).fadeOut(200);
        $(this).parents(".modal-content").animate({ bottom: -450 }, 200);
        $(".bank-list").scrollTop(0);

        // 이중 모달 아닌 경우
        if (!$(temp).hasClass("depth2")) {
            scrollOn(); // 바디 스크롤 제거 해제
        }
    });

    // 셀렉트 옵션 선택(통신사, 머니 충전 계좌, 이용내역 필터 등)
    $(".modal-slide .btn-list .btn").click(function () {
        $(this).parents(".btn-list").find(".btn").removeClass("on");
        $(this).addClass("on");
    });

    // 슬라이드 모달, 은행 선택 레이어 닫기
    $(".modal.type-bank, .modal-slide").click(function (e) {
        if (!$(".modal-content").has(e.target).length && !$("#wrap").hasClass("gigworker")) {
            $(this).fadeOut(200);
            $(this).find(".modal-content").animate({ bottom: -450 }, 200);
            $(".bank-list").scrollTop(0);

            // 이중 모달 아닌 경우
            if (!$(this).hasClass("depth2")) {
                scrollOn(); // 바디 스크롤 제거 해제
            }
        }
    });

    // const selectBoxes = document.querySelectorAll(".select-box");

    // selectBoxes.forEach((selectBox) => {
    //     const label = selectBox.querySelector(".label");
    //     const options = selectBox.querySelectorAll("#modal-select-bank .option-item");

    //     // '기타' 옵션 선택 시 '기타' 입력 formGroup 추가/삭제 함수
    //     const handleSelect = (item) => {
    //         console.log("Selected option text:", item.textContent);
    //         selectBox.classList.remove("active");
    //         label.textContent = item.textContent;
    //         selectBox.classList.add("comp");
    //     };

    //     // 옵션 클릭 시 handleSelect 호출
    //     options.forEach((option) => {
    //         option.addEventListener("click", () => handleSelect(option));
    //     });

    //     // 라벨을 클릭 시 옵션 목록이 열리고 닫힘
    //     label.addEventListener("click", () => {
    //         if (selectBox.classList.contains("active")) {
    //             selectBox.classList.remove("active");
    //         } else {
    //             selectBoxes.forEach((box) => {
    //                 box.classList.remove("active");
    //             });
    //             selectBox.classList.add("active");
    //         }
    //     });
    // });

    // // 모든 '기타' 옵션에 대해 클릭 시 관련 input에 포커스를 이동
    // const otherOptions = document.querySelectorAll(".otherOption");

    // otherOptions.forEach((option) => {
    //     option.addEventListener("click", function () {
    //         const targetInputId = option.getAttribute("data-target"); // data-target 속성값을 가져옴
    //         const targetInput = document.getElementById(targetInputId);
    //         if (targetInput) {
    //             targetInput.focus(); // 해당 input에 포커스 이동
    //         }
    //     });
    // });

    // input 삭제 버튼
    document.querySelectorAll(".js-text-del").forEach((button) => {
        button.addEventListener("mousedown", function () {
            const inputField = this.closest(".input-container").querySelector(".custom-input");
            if (inputField && inputField.classList.contains("custom-input")) {
                inputField.value = ""; // input 값을 지움
                inputField.focus(); // input 필드에 포커스를 다시 줌
            }
        });
    });

    // 검색 인풋
    $(".input-container.search input").on("input", function(e) {
        showCountryList(e.target.value.trim(), $(this).closest(".input-container"));
    });
    
    $(".input-container.search input").on("focus", function() {
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
        var matchedItems = countryArray.filter(function(country) {
            return country.toLowerCase().includes(searchValue.toLowerCase());
        });
    
        // 일치하는 항목이 있을 경우 <li> 추가 및 <ul> 표시, 없으면 숨기기
        if (matchedItems.length > 0) {
            matchedItems.forEach(function(country) {
                $searchList.append(`<li>${country}</li>`);
            });
            $searchList.show(); // 일치하는 항목이 있을 때만 표시
        } else {
            $searchList.hide(); // 일치하는 항목이 없으면 숨기기
        }
    }
    
    // blur 시 <ul> 숨기기
    $(".input-container.search input").on("blur", function() {
        var $this = $(this);
        setTimeout(function(){
            $this.closest(".input-container").find(".search-list").hide();
        }, 10);
    });

    // <li> 클릭 시 해당 항목의 텍스트를 <input>에 설정하고 <ul> 숨기기
    $(document).on("click", ".search-list li", function() {
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

    // 약관 펼치기/접기
    $(".agree-all .btn").click(function () {
        $(this).parents(".agree-all").find(".btn").toggleClass("hidden");
        $(this).parents(".agree-all").next(".agree-list").toggle();
        fixFootBtn();
        wrapPadding();
    });
});

// 모달 setting 및 이벤트
function modalSet() {
    var modalCont = $(".modal-info .modal-content");
    var modalH = $(window).height();
    modalH = modalH * -1;
    $(modalCont).css("bottom", modalH); // 팝업들 bottom 값 setting

    // bottom modal 열기
    $(".info-chg").click(function () {
        var selectId = $(this).attr("id");
        var optionLayer = "modal-" + selectId;
        var temp = $("#" + optionLayer);
        temp.show();
        $(temp).find(".modal-content").animate({ bottom: 0 }, 200);

        // 이중 모달이 아닌 경우
        if (!$(this).hasClass("depth2")) {
            scrollOff(); // 바디 스크롤 제거
        }

        // 바깥 영역 클릭 시 팝업 닫힘
        $(temp).on("click", function (e) {
            if (!$(".modal-content").has(e.target).length) {
                modalOut();
            }
        });

        // 팝업 내 하단 버튼 클릭 시 팝업 닫힘
        $(temp)
            .find(".modal-footer .btn")
            .on("click", function (e) {
                modalOut();
            });

        // bottom modal 닫기
        function modalOut() {
            temp.fadeOut(200);
            $(temp).find(".modal-content").animate({ bottom: modalH }, 200);

            // 이중 모달이 아닌 경우
            if (!$(temp).hasClass("depth2")) {
                scrollOn(); // 바디 스크롤 제거 해제
            }
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
    });
}

// 하단 레이어 팝업(슬라이드 모달) 기본 세팅
var modalCont = $(".modal-info .modal-content");
var modalH = $(window).height();
modalH = modalH * -1;
$(modalCont).css("bottom", modalH); // 팝업들 bottom 값 setting

// input 확인 후 버튼 활성화 함수
function checkInputs(modal) {
    const allFilled = modal
        .find("input")
        .toArray()
        .every((input) => {
            if ($(input).attr("type") === "checkbox") {
                return $(input).is(":checked");
            } else {
                return $(input).val().trim() !== "";
            }
        });

    const btnConfirm = modal.find(".btn-confirm");
    btnConfirm.prop("disabled", !allFilled); // 조건 만족 시 활성화
}

// 하단 레이어 팝업(슬라이드 모달) 열기
function modalOpenSlide(obj) {
    var temp = $("#" + obj);
    var modalCont = $(temp).find(".modal-content");
    var containHeight;
    var contentsHeight;
    setTimeout(function(){
        containHeight  = modalCont[0].querySelector(".modal-body").clientHeight;
        contentsHeight = modalCont[0].querySelector(".modal-body").scrollHeight;
        if(containHeight < contentsHeight) {
            modalCont.addClass("scroll");
        }
    }, 100)
    
    $(modalCont[0]).find(".modal-body").on("scroll", function(){
        var bodyScrollTop = $(this).scrollTop();
        if(contentsHeight - containHeight - 60 <= bodyScrollTop) {
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

    // bottom modal 닫기
    function modalCloseSlide() {
        temp.fadeOut(200);
        $(temp).find(".modal-content").animate({ bottom: modalH }, 200);

        // 이중 모달이 아닌 경우
        if (!$(temp).hasClass("depth2")) {
            scrollOn(); // 바디 스크롤 제거 해제
        }
    }

    // 클릭된 버튼의 부모 select-box에 comp 클래스 추가
    const button = $(event.target); // 클릭된 버튼
    const selectBox = button.closest(".select-box"); // 부모 select-box 찾기
    // selectBox.addClass("comp"); // 부모 select-box에 comp 클래스 추가

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
        modalCloseSlide(); // 모달 닫기
    });

    // input 요소에 이벤트 리스너 추가
    temp.find("input").on("input change", function () {
        checkInputs(temp); // input 상태 확인
    });
    checkInputs(temp); // 초기 상태 확인

    
}

// 하단 레이어 팝업(슬라이드 모달) 열기 + 상단 이동 막기
function modalOpenSlideNoMove(obj) {
    var temp = $("#" + obj);
    var modalCont = $(temp).find(".modal-content");

    temp.show();
    $(modalCont).animate({ bottom: 0 }, 200);
    // 이중 모달이 아닌 경우
    if (obj === "retto") {
        $("body").addClass("modal-open");
    } else if (!$(this).hasClass("depth2")) {
        // scrollOff(); // 바디 스크롤 제거
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

    // bottom modal 닫기
    function modalCloseSlide() {
        var temp = $("#" + obj);
        temp.fadeOut(200);
        var modalContent = $(temp).find(".modal-content");
    }

    // 리사이즈
    $(window).resize(function () {
        modalContPos();
    });
}

// 체크박스 라디오 선택 시 컨테이너 컬러 변경
function checkBorderChange() {
    $(".coupon-wrap input").on("click", function () {
        $(".border-change").removeClass("on");
        $(".coupon-wrap input").not($(this)).prop("checked", false);
        if ($(this).is(":checked")) {
            $(this).closest(".border-change").addClass("on");
            $("#modal-useCoupon .title-text strong").addClass("text-error");
        } else {
            $("#modal-useCoupon .title-text strong").removeClass("text-error");
        }
        modalOpenSlide("modal-useCoupon");
    });
}
checkBorderChange();

/* 개발 시 추가
 * -------------------------------------------------------------------- */
//종료
$(function () {
    $("#header .btn-close").click(function () {
        //가맹점 cancelUrl 호출 페이지 이동
        var processType = $(this).attr("data-processType");
        var formId = $(this).attr("data-formId");
        var returnUrl = $(this).attr("data-returnUrl");

        $.closeAction(processType, formId, returnUrl);
    });

    // sys error 페이지 X버튼 클릭 (token 값이 없기 때문에 바로 cancl url을 submit 해준다.)
    $(".btn-close-error").click(function () {
        var cancelUrl = $("#cancelFm").attr("action");
        if (cancelUrl == "") {
            self.close();
        } else {
            $("#cancelFm").submit();
        }
    });

    $(".btn-exit").click(function () {
        $.promptMessage(naviAlertTitle.orderEnd, naviAlertMsg.orderBrandEnd, $("#commonPrompt"), $("#promptOk"), "self.close()");
    });
});

//서비스관리 화면 이동
$(function () {
    $("#header .btn-svc").click(function () {
        javascript: SettlePay.svc_execute(document.iaDirectFrm);
    });
});

$.closeAction = function (processType, formId, returnUrl) {
    if (processType == "MP") {
        $.closeAlertMessageCallback(naviAlertTitle.orderEnd, naviAlertMsg.orderBrandEnd, $("#closeAlert"), "$.closeMPUrl()");
    } else if (processType == "M") {
        $.promptMessage(naviAlertTitle.orderEnd, naviAlertMsg.orderBrandEnd, $("#commonPrompt"), $("#promptOk"), "$.closeUrl()");
    } else if (processType == "B") {
        $.promptMessage(naviAlertTitle.orderEnd, naviAlertMsg.orderBrandEnd, $("#commonPrompt"), $("#promptOk"), '$.closeBack("' + formId + '", "' + returnUrl + '")');
    } else if (processType == "Z") {
        //모바일 GW용
        $.promptMessageEx2(naviAlertTitle.orderEnd, naviAlertMsg.mobileAppEnd, $("#commonPromptZeroapp"), $("#promptOkZeroapp"), '$.closeZeroApp("' + formId + '", "' + returnUrl + '")');
    } else if (processType == "ZE") {
        //모바일 GW용 (종료 메시지)
        $.promptMessage(naviAlertTitle.orderEnd, naviAlertMsg.orderBrandEnd, $("#commonPrompt"), $("#promptOk"), '$.closeBack("' + formId + '", "' + returnUrl + '")');
    } else {
        $.promptMessage(naviAlertTitle.orderEnd, naviAlertMsg.orderEnd, $("#commonPrompt"), $("#promptOk"), "$.close()");
    }
};

$.closeZeroApp = function (formId, returnUrl) {
    $.closeAlertMessageCallback(naviAlertTitle.orderEnd, "결제가 취소되었습니다.", $("#closeAlert"), "$.closeMPUrl()");
};

$.close = function () {
    $.closeAlertMessageCallback(naviAlertTitle.orderEnd, naviAlertMsg.orderEndOk, $("#closeAlert"), "$.closeUrl()");
};
$.closeUrl = function () {
    var mercntId = $("#mercntId").val();
    var ordNo = $("#ordNo").val();
    var trPrice = $("#trPrice").val();
    var trDay = $("#trDay").val();
    var trTime = $("#trTime").val();
    var mercntParam1 = $("#mercntParam1").val();
    var mercntParam2 = $("#mercntParam2").val();
    var cancelUrl = $("#cancelUrl").val();
    var token = $("#token").val();
    var processType = $("#processType").val();
    var contactType = $("#contactType").val();

    var form = makeBodyForm("POST", "/std/closeAction.do");
    makeBodyFormInput(form, "token", token);
    makeBodyFormInput(form, "mercntId", mercntId);
    makeBodyFormInput(form, "ordNo", ordNo);
    makeBodyFormInput(form, "trPrice", trPrice);
    makeBodyFormInput(form, "trDay", trDay);
    makeBodyFormInput(form, "trTime", trTime);
    makeBodyFormInput(form, "mercntParam1", mercntParam1);
    makeBodyFormInput(form, "mercntParam2", mercntParam2);
    makeBodyFormInput(form, "cancelUrl", cancelUrl);
    makeBodyFormInput(form, "processType", processType);
    makeBodyFormInput(form, "contactType", contactType);
    makeBodyFormSubmit(form);
};

$.closeBack = function (formId, returnUrl) {
    $("#" + formId).attr("action", returnUrl);
    $("#" + formId).submit();
};
$.closeMPUrl = function () {
    $("#cancelFm").submit();
};

function maxLengthCheck(object) {
    if (object.value.length > object.maxLength) {
        object.value = object.value.slice(0, object.maxLength);
    }
}

function makeBodyForm(method, action) {
    var num = Math.floor(Math.random() * 10000) + 1;
    var formName = "SETTLE_FORM_" + num;
    var el = document.getElementsByTagName("body")[0];

    var resultForm = document.createElement("form");
    resultForm.setAttribute("id", formName);
    resultForm.setAttribute("name", formName);
    resultForm.setAttribute("method", method);
    resultForm.setAttribute("action", action);

    el.appendChild(resultForm);

    return formName;
}

function makeBodyFormInput(form, name, value) {
    var formInput = document.createElement("input");

    formInput.setAttribute("type", "hidden");
    formInput.setAttribute("name", name);
    formInput.setAttribute("value", value);

    var el = document.getElementById(form);
    el.appendChild(formInput);
}

function makeBodyFormSubmit(form) {
    var el = document.getElementById(form);
    if (el != null) {
        el.submit();

        setTimeout(function () {
            el.remove();
        }, 1000);
    }
}
