(function(module) {
  function Projects(opts) {
    for (key in opts) this[key] = opts[key];
  }

  Projects.all = [];

  Projects.prototype.toHtml = function() {
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
    Projects.all = rawData.map(function(ele) {
      return new Projects(ele);
    });
  };

  Projects.fetchAll = function(p) {
    $.ajax({
      type: 'HEAD',
      url: 'scripts/projectData.json',
      success: function(data, message, xhr) {
        var localEtag = xhr.getResponseHeader('eTag');
        localStorage.setItem('eTag', localEtag);
        if (localStorage.eTag === xhr.getResponseHeader('eTag') && localStorage.rawData) {
          console.log(localStorage.eTag);
          Projects.loadAll(JSON.parse(localStorage.rawData));
          p();
        } else {
          $.getJSON('scripts/projectData.json', function(rawData) {
            Projects.loadAll(rawData);
            localStorage.rawData = JSON.stringify(rawData);
            p();
          });
        }
      }
    });
  };

  Projects.numWordsAll = function() {
    return Projects.all.map(function(article) {
      return article.body.match(/\b\w+/g).length;
    })
    .reduce(function(a, b) {
      return a+=b;
    });
  };


  Projects.allAuthors = function() {
    return Projects.all.map(function(article){
      return article.author;
    })
      .reduce(function(acc,cur){

        if (acc.indexOf(cur)<0)acc.push(cur);
        return acc;

      },[]);
  };

  Projects.numWordsByAuthor = function() {
    return Projects.allAuthors().map(function(author) {
      return {
        name:author,
        numWords: Projects.all.filter(function(article){
          return article.author == author;
        })
        .map(function(article) {
          return article.body.match(/\b\w+/g).length;
        })
        .reduce(function(a, b) {
          return a+=b;
        })
      };
    });
  };
  module.Projects = Projects;
})(window);
