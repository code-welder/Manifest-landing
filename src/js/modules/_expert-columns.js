$(document).ready(function() {
  const expertColumnsSlider = $('.expert-columns__slider')

  expertColumnsSlider.slick({
    dots: false,
    speed: 500,
    slidesToShow: 2,
    arrows: true,
    prevArrow: $('.expert-columns__btn-prev'),
    nextArrow: $('.expert-columns__btn-next'),
    responsive: [
      {
          breakpoint: 768,
          settings: "unslick"
      }
    ],
  });

  if ($(window).width() <= 769) {

    $('.expert-columns__item').slice(0, 2).show()

    $('.expert-columns__btn-load-more').click( function() {
      $('.expert-columns__item:hidden').slice(0, 2).show()
    })
  }
})