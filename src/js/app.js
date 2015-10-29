var $nav = $('nav#top-nav');
var threshold = 40;
$(window).scroll(function () {
	var scroll = $(window).scrollTop();
	if (scroll >= threshold) {
		$nav.addClass('alt');
	} else {
		$nav.removeClass('alt');
	}
});