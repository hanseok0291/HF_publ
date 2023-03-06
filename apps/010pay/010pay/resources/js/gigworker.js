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
        $input.closest(".boxInput").find(".inputDel, .dash").show(); 
        $input.closest(".boxInput").find(".placeholderText").hide(); 
      } else {
        $input.closest(".boxInput").find(".inputDelm, .dash").hide();
        $input.closest(".boxInput").find(".placeholderText").show(); 
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

    $(".inputDel").on("touchstart mousedown", function(){
      var $this = $(this);
      blurDelay = true;
      $this.closest(".boxInput").find("input").val(""); 
      $this.hide();
      val = "";
      $this.closest("li").find(".placeholderText").show();
      $this.closest("li").find(".dash").hide();
      $this.closest(".boxInput").find("input").eq(0).focus();
      setTimeout(() => {
        $this.closest(".boxInput").find("input").eq(0).focus();
        blurDelay = false;
      }, 100);
      
    });
  });
});

// maxlength
function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}