(function(module) {
  var projectsController = {};

  Project.fetchAll(portfolioView.initIndexPage);

  projectsController.index = function() {
    // $('.tab-content').hide();
    // $('#portfolio').fadeIn();
    Project.fetchAll(portfolioView.initNewProjectPage);
  };

  module.projectsController = projectsController;
})(window);
