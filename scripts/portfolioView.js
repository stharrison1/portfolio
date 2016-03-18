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

//Hides all content and then fades in only content that is clicked on
  portfolioView.handleMainNav = function () {
    $('.main-nav').on('click', '.tab', function () { //index 41-42
      $('.tab-content').hide();
      $('#' + $(this).data('content')).fadeIn();
    });
    $('.main-nav .tab:first').click();//Page loads on Home
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

//Function called in new.html-86
//It does things that initilizes the initIndexPage
  portfolioView.initNewProjectPage = function() {
    $('.tab-content').show();
    $('#export-field').hide();
    $('project-json').on('focus', function() {
      this.select();
    });
    $('#new-form').on('change', 'input', 'textarea', portfolioView.create); //This is callback function that is passed to jQuery. jQuery will call it when jQuery call that event happens
  };

//Creates new objects
  portfolioView.create = function() {
    var project;
    $('#projects').empty();
    project = new Project({
      title: $('#project-title').val(),
      titleUrl: $('#project').val(),
      body: $('#project-body').val(),
      authorUrl: $('#project-author').val(),
      repoUrl: $('#project-title-url').val(),
      category: $('#project-category').val(),
      publishedOn: $('#project-published:checked').length ? new Date() :null
    });
    $('#projects').append(project.toHtml());
    $('pre code').each(function(i, block){
      hljs.highlightBlock(block);
    });
    $('#export-field').show();
    $('#project-json').val(JSON.stringify(project)+ ',');
  };

//Function called in index.html-82
//Shows all the functions on the index.html page
  portfolioView.initIndexPage = function() {
    Project.all.forEach(function(a){
      $('#portfolio').append(a.toHtml());
    });

    portfolioView.populateFilters();
    portfolioView.handleCategoryFilter();
    portfolioView.handleMainNav();
    portfolioView.setTeasers();
    Project.allAuthors();
    Project.numWordsByAuthor();

  };

//Function called in new.html-56
  portfolioView.initAdminPage = function() {
    var template = Handlebars.compile($('#projectData-template').text());
    Project.numWordsByAuthor().forEach(function(stat) {
      $('.author-stats').append(template(stat));
    });
    $('#projects-stats .projects').text(Project.all.length);
    $('#projects-stats .words').text(Project.numWordsAll());
  };

  module.portfolioView = portfolioView;
})(window);
