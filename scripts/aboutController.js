(function(module) {
  var aboutController = {};

  // Function hides all main section elements, and then reveals just the #about section:
  aboutController.index = function() {
    repos.requestRepos(repoView.index);
  };
  module.aboutController = aboutController;
})(window);
