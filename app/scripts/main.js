$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function rnd_color_level(min = 0, max = 16) {
  return "00".replace(/0/g,function(){return (~~(Math.random() * (max - min) + min)).toString(16);});
}

$( document ).ready(function() {
  $('.mypanel').hover(function() {
    let colors = [
      rnd_color_level(0,8),
      rnd_color_level(0,8),
      rnd_color_level(14)
    ]
    let first_color = Math.floor(Math.random() * 3);
    let color = '#' + colors[first_color] + colors[(first_color + 1) % 3] + colors[(first_color + 2) % 3];
    $(this).find('.panel-footer').css(
      'background-color',
      color
    );
    $('strong').css('color', color);
    $('p > a').css('color', color);
  }, function() {
    $(this).find('.panel-footer').css('background-color', '');
  });
});

