(function(module) {
  var aboutController = {};

 //controller function for loading about on index.html, routing handled in routes.js
  aboutController.index = function() {
    repos.requestRepos(repoView.index);
  };
  module.aboutController = aboutController;
})(window);
