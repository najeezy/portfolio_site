// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require underscore
//= require backbone
//= require handlebars
//= require_tree ./backbone/routers
//= require_tree ./backbone/models
//= require_tree ./backbone/collections
//= require_tree ./backbone/views
//= require_tree ./templates
//= require_tree .

$(function() {
  addInitialProjectImages(carouselStackSize);
  $('#images').hover(showStack, hideStack);
  $('#images').click(viewNextItem);
});

carouselStackSize = 3;
duringClick = false;
projectImageUrls = [
  'assets/apptree.png',
  'assets/retreat.png',
  'assets/giftr.png',
  'assets/wdichattr.png',
  'assets/tictactoe.png'
];

projectInfo = [
  { name: 'AppTree', description: 'Find the best iOS apps rated by people just like you. This app was built by a team of three in about a week. Ruby on Rails server side and Backbone.js for the front end. The app runs on a single page load.' },
  { name: 'Retreat', description: 'test retreat' },
  { name: 'Giftr', description: 'test giftr' },
  { name: 'WDIChattr', description: 'test wdichattr' },
  { name: 'TicTacToe', description: 'test tictactoe' }
];


function addInitialProjectImages(imageCount) {
  for (var i = 0; i < imageCount; i++) {
    $('<img src="' + projectImageUrls[i] +'">')
      .prependTo('#images')
      .attr('data-index', i);
  }

  var $projectsDiv = $('#projects');

  $projectsDiv.find('li').first().addClass('white-background');
  $('#project-name').html(projectInfo[0].name);
  $('#project-description').html(projectInfo[0].description);
}

function showStack() {
  var topValue = 0;
  var widthValue = 0;
  var leftValue = 0;
  $('.arrow').fadeIn(400);

  // get the reverse order of the jquery array and
  // iterate over it
  $($(this).children().get().reverse()).each(function() {
    $(this).animate({
      top: topValue,
      width: '-='+ widthValue,
      marginLeft: '+='+ leftValue
    }, 300);

    topValue -= 10;
    widthValue += 20;
    leftValue += 10;
  });
}

function hideStack() {
  $($(this).children().get().reverse()).each(function(index) {
    var widthValue = index * 20;
    var leftValue = index * 10;
    $('.arrow').fadeOut(400);

    $(this).animate({
      top: 0,
      width: '+='+ widthValue,
      marginLeft: '-='+ leftValue
    }, 300);
  });
}

function viewNextItem() {
  if (!duringClick) {
    duringClick = true;
    addNextProjectImages();
    animateProjectImages();
    changeProjectInfo();
  }
}

function changeProjectInfo() {
  var $images = $('#images').children();
  var index = $images.eq($images.length - 2).data('index');

  $('#project-info').children().fadeOut(250, function() {
    $('#project-name').html(projectInfo[index].name);
    $('#project-description').html(projectInfo[index].description);
    $(this).fadeIn(250);
  });
}

function addNextProjectImages() {
  var lastIndex = $('#images').children().first().data('index');
  if (lastIndex === projectImageUrls.length - 1) {
    nextIndex = 0;
  } else {
    nextIndex = lastIndex + 1;
  }
  var firstIndex = nextIndex - 2;

  var $dots = $('#projects ul li');
  $dots.removeClass('white-background');
  $dots.eq(firstIndex).addClass('white-background');

  var nextImageUrl = projectImageUrls[nextIndex];

  var $image = $('<img src="'+ nextImageUrl +'">').css('width', '700px');

  $image.prependTo('#images')
    .attr('data-index', nextIndex)
    .css('display', 'none')
    .css('top', carouselStackSize * -10)
    .css('margin-left', (-350 + carouselStackSize * 10))
    .css('width', function() {
      return $(this).width() - (20 * carouselStackSize);
    }).fadeIn(500);
}

function animateProjectImages() {
  $images = $('#images');

  $images.children().animate({
    top: '+=10',
    width: '+=20',
    marginLeft: '-=10'
  }, { duration: 500, queue: false });

  $images.children().last().animate(
    {
      marginTop: '+=200px',
      opacity: 0
    },
    {
      duration: 500,
      queue: false,
      start: function() {
        $('.arrow').off();
      },
      complete: function() {
        duringClick = false;
        this.remove();
      }
    }
  );
}
