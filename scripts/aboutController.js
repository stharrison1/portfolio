(function(module) {
  var aboutController = {};

  // DONE: Define a function that hides all main section elements, and then reveals just the #about section:
  aboutController.index = function() {
    // $('.tab-content').hide();
    // $('#about').fadeIn();
    repos.requestRepos(repoView.index);
  };

  module.aboutController = aboutController;
})(window);
