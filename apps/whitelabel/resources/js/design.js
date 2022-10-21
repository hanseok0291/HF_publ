$(document).ready(function(){
	// form focus ui
	var $input = $('input[type=text], input[type=password], input[type=tel], select, .select');
	var $inputChild = $('.form-control').find($input);
	$input.focus(function(){
		$(this).addClass('focus');
	}).blur(function(){
		$(this).removeClass('focus');
	}).blur();
	$inputChild.focus(function(){
		$(this).parents('.form-control').addClass('focus');
		$(this).removeClass('focus');
	}).blur(function(){
		$(this).parents('.form-control').removeClass('focus');
	}).blur();

	// 비밀번호 입력 상태 표시(기존 소스 재사용)
	$('.input-mark input').bind("keyup input", function(e) {
		var keyCode = e.keyCode || e.which;
		var byte = $(this).val();
		var del = $(this).val() + 1;
		$('.input-mark .mark i').removeClass();
		if (byte.length == 1) {
			$('.input-mark .mark i:nth-child(1)').addClass('on');
		} else if (byte.length == 2) {
			$('.input-mark .mark i:nth-child(-n+2)').addClass('on');
		} else if (byte.length == 3) {
			$('.input-mark .mark i:nth-child(-n+3)').addClass('on');
		} else if (byte.length == 4) {
			$('.input-mark .mark i:nth-child(-n+4)').addClass('on');
		} else if (byte.length == 5) {
			$('.input-mark .mark i:nth-child(-n+5)').addClass('on');
		} else if (byte.length == 6) {
			$('.input-mark .mark i:nth-child(-n+6)').addClass('on');
		} else {
			$('.input-mark .mark i').removeClass();
		}
		// console.log(byte.length);
	});

	// tab style radio slider (iOS 15 애니메이션 버그 해결 : 위치 % -> px)
	function checkSlider(){
		var checkItem = $('.check-slider > input[type="radio"]').eq(1); // 2번째 input
		var sliderWidth = $('.check-slider').innerWidth() / 2; // input이 2개인 경우 50% 위치 값 -> px 계산
		if($(checkItem).is(':checked')){
			$('.check-slider .slider').css('left', sliderWidth);
		} else {
			$('.check-slider .slider').css('left', 0);
		}
	}

	// 버튼 목록 - 옵션 버튼 토글(활성, 비활성)
	$('.btn-list .btn').click(function(){
		$(this).parent('li').addClass('active').siblings('li').removeClass('active');
	});

	// click
	$('.check-slider').click(function(){
		checkSlider();
	});

	// load (IE 새로고침 시 갱신을 위해 기본 호출)
	checkSlider();

	// resize
	$(window).resize(function(){
		checkSlider();
	});
});
