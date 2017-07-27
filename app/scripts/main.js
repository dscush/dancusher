$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function rnd_color_level(min = 0, max = 16) {
  return "00".replace(/0/g,function(){return (~~(Math.random() * (max - min) + min)).toString(16);});
}

$( document ).ready(function() {
  $('.mypanel').hover(function() {
    let color = '#' + rnd_color_level(0,8) + "FF" + rnd_color_level(8);
    $(this).find('.panel-footer').css(
      'background-color',
      color
    );
  }, function() {
    $(this).find('.panel-footer').css('background-color', '');
  });
});

