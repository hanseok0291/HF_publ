$(window).load(function(){

  // 인풋 입력
  $(".boxInput").each(function(idx, e){
    var $input = $(e).find("input");
    var val = "";
    var blurDelay = false;
    if($(e).find("input").length > 0){
      if($input.val().length > 0 && $(e).find("input").length > 0){
        val = $input.val();
        $input.closest(".boxInput").addClass("active");
        $input.closest(".boxInput").find(".placeholderText").hide();
        $input.closest(".boxInput").find(".dash2, .inputDot").addClass("on");
        if($input.hasClass("lastInput")){
          var lastInputval = $input.closest(".boxInput").find(".lastInput").val();
          $input.closest(".boxInput").find(".lastInput").val("");
          $input.closest(".boxInput").find(".lastInput").val(lastInputval);
          for(var i = 0; i < lastInputval.length;i++){
            $input.closest(".boxInput").find(".inputDot span").eq(i).addClass("fill");
          }
        }
      }
    }

    $input.on("propertychange change paste input", function(){
      val = "";
      
      for(var i = 0;i<$input.length;i++){
        $($input[i]).val()
        val += $($input[i]).val();
      }
      if(val.length > 0){
        $input.closest(".boxInput").find(".inputDel, .ipnutShow").show(); 
        $input.closest(".boxInput").find(".dash2, .inputDot").addClass("on"); 
        $input.closest(".boxInput").find(".placeholderText").hide(); 
      } else {
        $input.closest(".boxInput").find(".inputDel, .ipnutShow").hide();
        $input.closest(".boxInput").find(".dash2, .inputDot").removeClass("on"); 
        $input.closest(".boxInput").find(".placeholderText").show(); 
      }

      if($(this).hasClass("firstInput") && $(this).val().length === 6){
        $input.closest(".boxInput").find(".lastInput").focus();
        $input.closest(".boxInput").addClass("shadow");
      }
      if($(this).hasClass("lastInput")){
        var lastInputval = $(this).val().replace(/\./g, '');
        $input.closest(".boxInput").find(".lastInput").val(lastInputval);
        $input.closest(".boxInput").addClass("active");
        $(this).next($(".inputDot")).find("span").removeClass("fill");
        for(var i = 0; i < $(this).val().length; i ++){
          $(this).next($(".inputDot")).find("span").eq(i).addClass("fill");
        }

        if($(this).val().length === 0){
          var firstInputval = $input.closest(".boxInput").find(".firstInput").val();
          $input.closest(".boxInput").find(".firstInput").val("");
          $input.closest(".boxInput").find(".firstInput").val(firstInputval);
          $input.closest(".boxInput").find(".firstInput").focus();
          $input.closest(".boxInput").addClass("shadow");
        }
      }
    });

    $input.on("focus", function(){
      var $this = $(this);
      $this.closest(".boxInput").addClass("active shadow");
      if($this.closest(".boxInput").find("input").val().length > 0){
        $this.closest(".boxInput").find(".inputDel").show();
      } 
    });

    $input.on("blur", function(){
      var $this = $(this);
      var valCheck = false;
      $this.closest(".boxInput").find("input").each(function(i,e){
        if($(e).val().length > 0){
          valCheck = true;
        }
      })
      $this.closest(".boxInput").find(".inputDel").hide();
      
      if(!valCheck && !blurDelay ){
        $this.closest(".boxInput").removeClass("active");
      }
      if(!$this.hasClass("lastInput")){
        $this.closest(".boxInput").removeClass("shadow");
      }
    });

    $(".boxInput.residentNum, .boxInput.phoneNum").on("click", function(){
      var $this = $(this);
      var valCheck = false;
      $this.find("input").each(function(i, e){
        if($(e).val().length > 0){
          valCheck = true;
        }
      });
      if(!valCheck){
        $this.closest(".boxInput").find("input").eq(0).focus();
      }
    });

    $(".inputDot").on("click", function(){
      var $this = $(this);
      $this.closest(".boxInput").find(".lastInput").focus();
    });

    $(".ipnutShow").on("touchstart", function(){
      $(this).closest(".boxInput").find("input").addClass("show").prop("type", "text");
    });

    $(".ipnutShow").on("touchend", function(){
      $(this).closest(".boxInput").find("input").removeClass("show").prop("type", "password");
    });

    $(".inputDel").on("touchstart mousedown", function(){
      var $this = $(this);
      blurDelay = true;
      $this.closest(".boxInput").find("input").val(""); 
      $this.hide();
      $this.closest("li").find(".inputDot span").removeClass("fill");
      $this.closest("li").find(".placeholderText").show();
      $this.closest("li").find(".ipnutShow").hide();
      $this.closest(".boxInput").find(".dash2, .inputDot").removeClass("on"); 
      $this.closest(".boxInput").find("input").eq(0).focus();
      setTimeout(() => {
        $this.closest(".boxInput").find("input").eq(0).focus();
        blurDelay = false;
      }, 100);
    });
  });

  // 약관 동의 체크 박스
  $(".join-agree .checkbox > input").change("change", function(){
    if($(this).is(":checked")){
      $(this).closest(".join-agree").find(".inner-agree input").prop("checked", true);
    } else {
      $(this).closest(".join-agree").find(".inner-agree input").prop("checked", false);
    }
  });

  // 내부 약관 동의 체크
  $(".inner-agree input").change(function(){
    var checkLength = 0;
    var $innerInput = $(this).closest(".inner-agree").find("input")
    $innerInput.each(function(i, e){
      if($(this).is(":checked")){
        checkLength++;
      }
    });
    if(checkLength === $innerInput.length){
      $(this).closest(".join-agree").find(".checkbox input").prop("checked", true);
    } else {
      $(this).closest(".join-agree").find(".checkbox input").prop("checked", false);
    }
  });

  // 전체 동의
  $(".agreement-btn").on("click", function(){
    if(!$(this).hasClass("active")){
      $(".join-agree input").prop("checked", true);
      $(this).closest(".container").find(".bot-btn").removeClass("disable");
      $(".agreement-btn").addClass("active");
    } else {
      $(".join-agree input").prop("checked", false);
      $(this).closest(".container").find(".bot-btn").addClass("disable");
      $(".agreement-btn").removeClass("active");
    }
    
  });

  $(".formWrap input").on("change", function(){
    var checkLength = 0;
    $(".formWrap input").each(function(i, e){
      if($(this).is(":checked")){
        checkLength++;
      }
    });
    if(checkLength === $(".formWrap input").length){
      $(this).closest(".container").find(".bot-btn").removeClass("disable");
      $(".agreement-btn").addClass("active");
    } else {
      $(this).closest(".container").find(".bot-btn").addClass("disable");
      $(".agreement-btn").removeClass("active");
    }
  });

  //통신사 선택
  $(".boxInput.selectInput, .boxInput.checkInput").on("click", function(){
    $(this).find(".btn-view").css({"transform": "rotate(270deg)"});
  });

  $(".modal-slide").click(function(e){
    if (!$(".modal-content").has(e.target).length) {
      $(".boxInput .btn-view").css({"transform": "rotate(90deg)"});
    }
  });

  $(".modal-slide .btn-close").click(function(e){
    $(".boxInput .btn-view").css({"transform": "rotate(90deg)"});
  });

  // 모달 팝업 제거 시 감지하여 화살표 방향 초기화
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      var attributeName = mutation.attributeName;
      if (attributeName === 'class') {
        var previousClassList = mutation.oldValue ? mutation.oldValue.split(' ') : [];
        var currentClassList = mutation.target.classList;
        if (previousClassList.indexOf('modal-open') !== -1 && !currentClassList.contains('modal-open')) {
          $(".boxInput .btn-view").css({"transform": "rotate(90deg)"});
        }
      }
    });
  });
  
  var targetNode = document.querySelector('body');
  
  observer.observe(targetNode, {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['class']
  });

  $(".modal-info").click(function (e) {
    var $this = $(this);
    if (!$(".modal-content").has(e.target).length && $this.has(".icon-times").length === 0) {
      $(this).fadeOut(200);
      $(this).find(".modal-content").animate({ bottom: -450 }, 200);
      $(".bank-list").scrollTop(0);
  
      // 이중 모달 아닌 경우
      if (!$(this).hasClass("depth2")) {
        scrollOn(); // 바디 스크롤 제거 해제
      }
    }
  });
});

// 전화번호 체크
function formatPhoneNumber() {
  var phoneNumber = document.getElementById("phone").value;
  var formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3");
  document.getElementById("phone").value = formattedPhoneNumber;
}

function removeWhitespace() {
  var phoneNumber = document.getElementById("phone").value;
  var phoneNumberWithoutWhitespace = phoneNumber.replace(/\s/g, "");
  document.getElementById("phone").value = phoneNumberWithoutWhitespace;
}

// maxlength
function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}

// 주민번호 뒷자리 함수
function lastInputCheck(e){
  for(var i = 0; i < e;i++){
    $(".lastInput").closest(".boxInput").find(".inputDot span").eq(i).addClass("fill");
  }
}