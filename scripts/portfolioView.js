(function(module){
  var portfolioView = {};//empty object gets functions from below passed in it

  var render = function(project) {
    var template = Handlebars.compile($('#projectData-template').text());

    project.daysAgo = parseInt((new Date() - new Date(project.publishedOn))/60/60/24/1000);
    project.publishStatus = project.publishedOn ? 'published ' + project.daysAgo + ' days ago' : '(draft)';
    project.body = marked(project.body);

    return template(project);
  };


  portfolioView.populateFilters = function() {
    var options,
      template = Handlebars.compile($('#option-template').text());
    options = Project.allCategories(function(rows) {
      if ($('#category-filter option').length < 2){
        $('#category-filter').append(
            rows.map(function(row) {
              return template({val: row.category});
            })
        );
      };
    });
  };


  portfolioView.handleFilters = function() {
    $('category-filter').on('change', 'select', function() {
    //grab the id value and then removes the '-filter'.
      resource = this.id.replace('-filter', '');
      //change the routes to for example, '/author/author'sname'
      page('/' + resource + '/' + $(this).val().replace(/\W+/g, '+')); // Replace any/all whitespace with a +
    });
  };

  portfolioView.index = function(portfolios) {

    $('#portfolio').show().siblings().hide();

    $('#portfolio project').remove();

    portfolios.forEach(function(a) {
      $('#portfolio').append(render(a));
    });

    portfolioView.populateFilters();
    portfolioView.handleFilters();

    if ($('#portfolio project').length > 1) {
      $('.project-body *:nth-of-type(n+2)').hide();
    }
  };

  portfolioView.initAdminPage = function() {
    var template = Handlebars.compile($('#projectData-template').text());
  };

  module.portfolioView = portfolioView;
})(window);
