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

// code for Process page
$('.big-blob p').hide().attr('tabindex', '0');
$('.big-blob p:first-of-type').show();

$('.big-blob').on('click', 'li a', function(e) {
	e.preventDefault();
	var blob = $(this).closest('.big-blob');
	var trigger = $(this);
	var cypher = trigger.text().toLowerCase().replace(' ','-');
	blob.attr('data-subprocess', cypher);
	blob.addClass('red');
	blob.find('p').hide();
	$('#'+cypher).show().focus();
	blob.find('a').removeClass();
	trigger.addClass('open');
});