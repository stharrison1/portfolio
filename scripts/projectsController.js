(function(module) {
  var projectsController = {};

  Project.fetchAll(portfolioView.initIndexPage);

  projectsController.index = function() {
    $('.tab-content').hide();
    $('#portfolio').fadeIn();

  };

  module.projectsController = projectsController;
})(window);
