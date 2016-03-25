(function(module) {
  var projectsController = {};


  projectsController.index = function() {
    Project.fetchAll(portfolioView.initIndexPage);
  };

  module.projectsController = projectsController;
})(window);
