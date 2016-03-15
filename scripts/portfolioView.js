var portfolioView = {};

portfolioView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).attr('data-category');
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

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

portfolioView.initNewProjectPage = function() {
  $('.tab-content').show();
  $('#export-field').hide();
  $('article-json').on('focus', function() {
    this.slect();
  });
  $('#new-form').on('change', 'input', 'textarea', portfolioView.create);
};

portfolioView.create = function() {
  var article;
  $('#articles').empty();
  article = new Projects({
    title: $('#article-title').val(),
    body: $('#article-body').val(),
    authorUrl: $('#article-author').val(),
    repoUrl: $('#article-author-url').val(),
    category: $('#article-category').val(),
    publishedOn: $('#article-published:checked').length ? new Date() :null
  });
  $('#articles').append(article.toHtml());
  $('#articles').each(function(i, block){
    hljs.highlightBlock(block);
  });
  $('#export-field').show();
  $('#article-json').val(JSON.stringify(article));
};

portfolioView.initIndexPage = function() {
  Projects.all.forEach(function(a){
    $('#portfolio').append(a.toHtml());
  });
  portfolioView.populateFilters();
  portfolioView.handleCategoryFilter();
  portfolioView.handleMainNav();
  portfolioView.setTeasers();
};
