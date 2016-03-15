function Projects(opts) {
  for (key in opts) this[key] = opts[key];
}

Projects.all = [];

Projects.prototype.toHtml = function() {
  // var source = $('#projectData-template').html();
  var template = Handlebars.compile($('#projectData-template').text());
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  // this.body = marked(this.body); WHY DOESN'T THIS WORK?
  return template(this);
};

Projects.loadAll = function(rawData) {
  rawData.sort(function(a,b){
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });
  rawData.forEach(function(ele) {
    Projects.all.push(new Projects(ele));
  });
};
// projects.forEach(function(a){
//   $('#portfolio').append(a.toHtml());
// });
//
// $('.template').hide();

Projects.fetchAll = function() {
  var localEtag;
  $.ajax({
    type: 'HEAD',
    url: 'scripts/projectData.json',
    success: function(data, message, xhr) {
      localEtag = xhr.getResponseHeader('eTag');
      localStorage.setItem('eTag', localEtag);
      if (localStorage.eTag === xhr.getResponseHeader('eTag') && localStorage.rawData) {
        console.log(localStorage.eTag);
        Projects.loadAll(JSON.parse(localStorage.rawData));
        portfolioView.initIndexPage();
      } else {
        $.getJSON('scripts/projectData.json', function(rawData) {
          Projects.loadAll(rawData);
          localStorage.rawData = JSON.stringify(rawData);
          portfolioView.initIndexPage();
        });
      }
    }
  });
};
