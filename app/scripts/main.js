$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$( document ).ready(function() {
  $('.mypanel').hover(function() {
    $(this).find('.panel-footer').css(
      'background-color',
      '#' + Math.floor(Math.random() * 16777215).toString(16)
    );
  }, function() {
    $(this).find('.panel-footer').css('background-color', '');
  });
});

