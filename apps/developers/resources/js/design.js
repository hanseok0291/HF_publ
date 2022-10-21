$(document).ready(function(){
	/* ======= Fixed page nav when scrolled ======= */
	$(window).on('scroll', function() {
		$('#page-nav-wrapper').removeClass('fixed');

		 var scrollTop = $(this).scrollTop();

		 // Check fixednav contains any element before get the offset - https://stackoverflow.com/questions/20175094/uncaught-typeerror-cannot-read-property-top-of-undefined
		 var fixednav = $('#page-nav-wrapper');
		
		 if(fixednav.length) {
			var topDistance = $('#page-nav-wrapper').offset().top;
		 }

		 if ( (topDistance) > scrollTop ) {
			$('#page-nav-wrapper').removeClass('fixed');
			$('body').removeClass('sticky-page-nav');
		 }
		 else {
			$('#page-nav-wrapper').addClass('fixed');
			$('body').addClass('sticky-page-nav');
		 }

	});
});