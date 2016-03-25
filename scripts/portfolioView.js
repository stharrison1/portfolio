(function(module){
  var portfolioView = {};//empty object gets functions from below passed in it

//added category from ProjectData to OptionTag filter
  portfolioView.populateFilters = function() {
    $('article').each(function() {//index 16-26
      var val = $(this).attr('data-category');//index 16
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    });
  };

//Filters category-filter when user changes category
  portfolioView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide();
        $('article[data-category="' + $(this).val() + '"]').fadeIn();
      } else {
        $('article').fadeIn();
        $('.template').hide();
      }
    });
  };

//Shows only 1st two paragraphs of body
  portfolioView.setTeasers = function() {
    $('.project-body *:nth-of-type(n+2)').hide();
//if read_on clicked show content
    $('#projects a.read_on').on('click', function(event){ //index 25
      event.preventDefault();
      $(this).hide();
      $(this).parent().find('*').show();
    });
  };

//Function called in index.html-82
//Shows all the functions on the index.html page
  portfolioView.initIndexPage = function() {
    $('#portfolio').show().siblings().hide();
    Project.all.forEach(function(a){
      $('#portfolio').append(a.toHtml());
    });
    portfolioView.populateFilters();
    portfolioView.handleCategoryFilter();
    portfolioView.setTeasers();
  };


  module.portfolioView = portfolioView;
})(window);
