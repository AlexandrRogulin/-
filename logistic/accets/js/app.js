$(function () {

	let intro = $('#intro');
	let header = $('#header');
	let introH = intro.innerHeight();
	let headerH = header.innerHeight();
	let scrollTop = $(window).scrollTop();

	/* Header class on scroll
	=================================================*/
	headerScroll();

	$(window).on('scroll resize', function () {
		headerScroll();
	});

	function headerScroll() {
		introH = intro.innerHeight();
		headerH = header.innerHeight();

		let scrollTop = $(this).scrollTop();

		if (scrollTop >= introH - headerH) {
			header.addClass('header--dark');
		} else {
			header.removeClass('header--dark');
		}
	}

	/* Smooth class to section
	=================================================*/

	$("[data-scroll]").on('click', function(event) {
		event.preventDefault();

		let scrollEl = $(this).data('scroll');
		let scrollElPosition = $(scrollEl).offset().top;

		$("html, body").animate({
			scrollTop: scrollElPosition - headerH
		}, 500);
	});


	/* ScrollSpy
	=================================================*/
	let windowH = $(window).height();

	scrollSpy(scrollTop);

	$(window).on('scroll', function() {
		scrollTop = $(this).scrollTop();

		scrollSpy(scrollTop);
	});

	function scrollSpy(scrollTop) {
		$("[data-scrollSpy]").each(function() {

			let $this = $(this);
			let sectionID = $this.data('scrollspy');
			let sectionOffset = $this.offset().top;
			sectionOffset = sectionOffset - (windowH * 0.3);

			if(scrollTop >= sectionOffset) {
				$('#nav [data-scroll]').removeClass('active');

				$('#nav [data-scroll="' + sectionID + '"]').addClass('active');
			}

			if(scrollTop == 0) {
				$('#nav [data-scroll]').removeClass('active');
			}
		});
	}


	/* Modal
	=================================================*/

	$('[data-modal]').on('click', function(event) {
		event.preventDefault();

		let modal = $(this).data('modal');

		$('body').addClass('no-scroll');
		$(modal).addClass('show');

		setTimeout(function() {
			$(modal).find('.modal__content').css({
				transform: 'scale(1)',
				opacity: '1'
			});
		}, 200);
	});

	$(' [data-modal-close]').on('click', function(event) {
		event.preventDefault();
		let modal = $(this).parents('.modal');
		modalClose(modal);
	});

	$('.modal').on('click', function() {
		let modal = $(this);
		modalClose(modal);
	});

	$('.modal__content').on('click', function(event) {
		event.stopPropagation();
	});

	function modalClose(modal) {

		modal.find('.modal__content').css({
			transform: 'scale(0.5)',
			opacity: '0'
		});

		setTimeout(function() {
			$('body').removeClass('no-scroll');
			modal.removeClass('show');
		}, 200);
	}

});