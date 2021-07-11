$('.header__search-btn').on('click', function() {
  $('.search-popup').addClass('search-popup--open')
  $('body').css('overflow', 'hidden');

  $('.search-popup__close-btn').on('click', function() {
    $('.search-popup').removeClass('search-popup--open')
    $('body').css('overflow', 'auto');
  })
})
