var projects = [];

function Project(opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.repoUrl = opts.repoUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;

}

Project.prototype.toHtml = function() {
  var $newProject = $('article.template').clone();
  $newProject.removeClass('template');
  if (!this.publishedOn) {
    $newProject.addClass('draft');
  }
  $newProject.attr('data-category', this.category);
  // $newProject.data('category', this.category);
  $newProject.find('h1:first').text(this.title);
  $newProject.find('address a').attr('href', this.repoUrl);
  $newProject.find('.portfolio-body').html(this.body);
  $newProject.find('time[pubdate]').attr('datetime', this.publishedOn);
  $newProject.find('time[pubdate]').attr('title', this.publishedOn);

  $newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

  $newProject.append('<hr>');


  return $newProject;
};

projectData.sort(function(a,b){
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

projectData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a){
  $('#portfolio').append(a.toHtml());
});

$('.template').hide();
