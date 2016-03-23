(function(module) {
  //ALL properties of `opts` will be assigned as properies of the newly created project object.
  function Project(opts) {
    Object.keys(opts).forEach(function(e, index, key){ //please expain?
      this[e] = opts[e];
    },this);
  };

  Project.all = []; //when .toHtml is called all projectData will be pushed into this array


//We define and use the method toHTML for the Project class.
  Project.prototype.toHtml = function() {
    //called on portfolioView-71 and 81
    var template = Handlebars.compile($('#projectData-template').text());
    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    // this.body = marked(this.body);
    //WHY DOESN'T THIS WORK?
    return template(this);
  };

//loadAll function collects all projectData and sorts .map puts this in a new sorted Array
  Project.loadAll = function(data) {
    data.sort(function(a,b){
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });
    Project.all = data.map(function(ele) {
      return new Project(ele);
    });
  };

//Sets localStorage to during eTag
  Project.fetchAll = function(callback) {
    $.ajax({
      type: 'HEAD',//just want header
      url: 'scripts/projectData.json',
      success: function(data, message, xhr) {
        var dataEtag = xhr.getResponseHeader('eTag');
        if (localStorage.eTag === dataEtag && localStorage.data) {
          console.log(localStorage.eTag);
          Project.loadAll(JSON.parse(localStorage.data));//parse so that Javascript can understand
          callback();
        } else {
          localStorage.eTag = dataEtag;
          $.getJSON('scripts/projectData.json', function(data) {
            Project.loadAll(data);
            localStorage.data = JSON.stringify(data);
            callback();
          });
        }
      }
    });
  };

//numWordsAll function returns all the words in the projectData body
  Project.numWordsAll = function() {
    return Project.all.map(function(project) {
      return project.body.match(/\b\w+/g).length;
      //need rexpress explanation
    })
    .reduce(function(a, b) {
      return a + b;
    });
  };


//allAuthors function returns the names of all authors without duplicates and pushes to new array
  Project.allAuthors = function() {
    return Project.all.map(function(project){
      return project.author;
    })
      .reduce(function(acc,cur){
        if (acc.indexOf(cur) === -1){
          acc.push(cur);
        }
        return acc;
      },[]);
  };

//numWordsByAuthor function returns all prodect words per author
  Project.numWordsByAuthor = function() {
    return Project.allAuthors().map(function(author) {
      return {
        name: author,
        numWords: Project.all.filter(function(project){
          return project.author == author;
        })
        .map(function(project) {
          return project.body.match(/\b\w+/g).length;
        })
        .reduce(function(a, b) {
          return a + b;
        })
      };
    });
  };
  module.Project = Project;
})(window);
