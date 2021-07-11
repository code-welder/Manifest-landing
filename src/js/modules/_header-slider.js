$(document).ready(function(){
  const headerSlider = $('.header__slider')

  headerSlider.slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    arrows: false,
  });

  const sliderDots = $('.header__slider .slick-dots')
  sliderDots.attr('data-before', getCurrentSliderCount())
  sliderDots.attr('data-after', getTotalSlidesLength())

  headerSlider.on('afterChange', function() {
    sliderDots.attr('data-before', getCurrentSliderCount())
  })

  function getCurrentSliderCount() {
    let currentSliderNumber = headerSlider.slick('slickCurrentSlide') + 1

    if (currentSliderNumber < 10) {
      currentSliderNumber = '0' + currentSliderNumber
    }

    return currentSliderNumber
  }

  function getTotalSlidesLength() {
    let length = headerSlider.slick('getSlick')['$slides'].length

    if (length < 10) {
      length = '0' + length
    }

    return length
  }
});