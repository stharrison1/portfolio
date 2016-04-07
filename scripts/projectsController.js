(function(module) {
  var projectsController = {};

  Project.createTable();  // Ensure the database table is properly initialized

<<<<<<< HEAD
<<<<<<< HEAD
  projectsController.index = function() {
    // $('.tab-content').hide();
    // $('#portfolio').fadeIn();
    Project.fetchAll(portfolioView.initNewProjectPage);
=======
=======
>>>>>>> refactor
  projectsController.index = function(ctx, next) {
    portfolioView.index(ctx.projects);
  };

  projectsController.loadById = function(ctx, next) {
    var projectData = function(project) {
      ctx.projects = project;
      console.log(project);
      console.log(ctx);
      next();
    };

    Project.findWhere('id', ctx.params.id, projectData);
  };

  projectsController.loadByCategory = function(ctx, next) { //
    var categoryData = function(projectsInCategory) {
      ctx.projects = projectsInCategory;
      next();
    };

    Project.findWhere('category', ctx.params.categoryName, categoryData);
<<<<<<< HEAD
>>>>>>> refactor
=======
>>>>>>> refactor
  };

  projectsController.loadAll = function(ctx, next) {
    var projectData = function(allProjects) {
      ctx.projects = Project.all;
      next();
    };

    if (Project.all.length) {  //If-else statement that if you already have project in the object, then run the next callback function.
      ctx.projects = Project.all;
      next();
    } else {  //If there are no projects in the object, then run the Project.fetchAll function to get all the articles from the database.
      Project.fetchAll(projectData);
    }
  };


  module.projectsController = projectsController;
})(window);
