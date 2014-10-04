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
  $('#carousel').hover(showStack, hideStack);
  $('#carousel').on('click', '.arrow.right', viewNextItem);
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
  { name: 'AppTree', description: 'Find the best iOS apps rated by people just like you. Ruby on Rails server side and Backbone.js for the front end. The app runs on a single page load.', url: 'http://apptree.herokuapp.com', codeUrl: 'https://github.com/TaliaS1214/AppTree' },
  { name: 'Retreat', description: 'If you are planning on going on a vacation, try getting ideas and itineraries from your friends. My focus was in back-end and front-end technologies like Ruby on Rails, jQuery, and AJAX.', url: 'http://boiling-headland-7736.herokuapp.com/', codeUrl: 'https://github.com/ericfrommelt/retreat_app'},
  { name: 'Giftr', description: 'Sometimes it\'s hard finding the perfect gift for someone. A social site built around gifting might help solve this problem. This app was my first dive into making a Ruby on Rails app!', url: 'http://giftingapp.herokuapp.com', codeUrl: 'https://github.com/truotaku/giftr_app' },
  { name: 'WDIChattr', description: 'My first attempt at learning about web sockets. I built this application using Node.js, Express, and Socket.IO.', url: 'http://wdichattr.herokuapp.com', codeUrl: 'https://github.com/truotaku/learning_websockets' },
  { name: 'TicTacToe', description: 'Tic Tac Toe! I wanted to put my newfound abilities to the test by creating a small front-end game. Javascript and jQuery were used for the logic and animation.', url: 'http://playttt.bitballoon.com', codeUrl: 'https://github.com/truotaku/tictactoe' }
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
  $('#project-website-link').attr('href', projectInfo[0].url);
  $('#project-code-link').attr('href', projectInfo[0].codeUrl);
}

function showStack() {
  var $images = $('#images');
  var topValue = 0;
  var widthValue = 0;
  var leftValue = 0;
  $('.arrow').animate({ opacity: 0.5 });

  // get the reverse order of the jquery array and
  // iterate over it
  $($images.children().get().reverse()).each(function() {
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
  var $images = $('#images');
  $('.arrow').animate({ opacity: 0 }, 300);

  $($images.children().get().reverse()).each(function(index) {
    var widthValue = index * 20;
    var leftValue = index * 10;

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
  var index = $images.first().data('index');

  $('#project-info').children().fadeOut(250, function() {
    $('#project-name').html(projectInfo[index].name);
    $('#project-description').html(projectInfo[index].description);
    $('#project-website-link').attr('href', projectInfo[index].url);
    $('#project-code-link').attr('href', projectInfo[index].codeUrl);
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
        $(this).remove();
      }
    }
  );
}
