$('#burger').on('click', function() {
  $('#popup-menu').addClass('popup-menu--open')
  $('body').css('overflow', 'hidden');

  $('.popup-menu__close-btn').on('click', function() {
    $('#popup-menu').removeClass('popup-menu--open')
    $('body').css('overflow', 'auto');
  })
})