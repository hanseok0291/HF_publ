$(window).load(function(){
  // 인풋 입력
  $(".boxInput").each(function(idx, e){
    var $input = $(e).find("input");
    var val = "";
    var blurDelay = false;
    $input.on("propertychange change paste input", function(){
      val = "";
      for(var i = 0;i<$input.length;i++){
        $($input[i]).val()
        val += $($input[i]).val();
      }
      if(val.length > 0){
        $input.closest(".boxInput").find(".inputDel, .dash2, .ipnutShow").show(); 
        $input.closest(".boxInput").find(".placeholderText").hide(); 
      } else {
        $input.closest(".boxInput").find(".inputDel, .dash2, .ipnutShow").hide();
        $input.closest(".boxInput").find(".placeholderText").show(); 
      }

      if($(this).hasClass("lastInput")){
        $input.closest(".boxInput").addClass("active");
        $(this).next($(".inputDot")).find("span").removeClass("fill");
        for(var i = 0; i < $(this).val().length; i ++){
          $(this).next($(".inputDot")).find("span").eq(i).addClass("fill");
        }
      }
    });

    $input.on("focus", function(){
      var $this = $(this);
      $this.closest(".boxInput").addClass("active shadow");
      if(val.length > 0 || $this.closest(".boxInput").find("input").val() > 0){
        $this.closest(".boxInput").find(".inputDel").show();
      } 
    });

    $input.on("blur", function(){
      var $this = $(this);
      $this.closest(".boxInput").find(".inputDel").hide();
      $this.closest(".boxInput").removeClass("shadow");
      if(val.length === 0 && !blurDelay ){
        $this.closest(".boxInput").removeClass("active");
      }
    });

    $(".placeholderText").on("click", function(){
      var $this = $(this);
      $this.closest(".boxInput").find("input").eq(0).focus();
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
      val = "";
      $this.closest("li").find(".inputDot span").removeClass("fill");
      $this.closest("li").find(".placeholderText").show();
      $this.closest("li").find(".dash2, .ipnutShow").hide();
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
});


// maxlength
function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}

// 레이어 팝업(모달) 닫기
function modalClose() {
  $(".modal").hide();
}

function modalClose(obj) {
  if (obj != null && obj != undefined && obj != "") {
    var temp = $("#" + obj);
    temp.hide();
  } else {
    $(".modal").hide();
  }
}

