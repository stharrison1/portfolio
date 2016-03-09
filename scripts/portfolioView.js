var portfolioView = {};

portfolioView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      $('#category-filter').append(optionTag);
      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

portfolioView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
    // if (projectData.category){
      $('article').hide();
      // $('article[data-category="' + projectData.category + '"]').fadeIn();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn(); //fadeOut ????
      $('.template').hide();
    }
  });
};

portfolioView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function () {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.main-nav .tab:first').click();
};

portfolioView.setTeasers = function() {
  $('.project-body *:nth-of-type(n+2)').hide();

  $('#projects a.read_on').on('click', function(event) {
    event.preventDefault();
    $(this).hide();
    $(this).parent().find('*').show();
  });
};

$(document).ready(function() {
  //do something
  portfolioView.populateFilters();
  // portfolioView.handleAuthorFilter();
  portfolioView.handleCategoryFilter();
  portfolioView.handleMainNav();
  portfolioView.setTeasers();
});
