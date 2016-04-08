(function(module) {
  //ALL properties of `opts` will be assigned as properies of the newly created project object.
  function Project(opts) {
    Object.keys(opts).forEach(function(e, index, key){
      this[e] = opts[e];
    },this);
  };

  Project.all = []; //when .toHtml is called all projectData will be pushed into this array

  Project.createTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS projects (' +
        'id INTEGER PRIMARY KEY, ' +
        'title VARCHAR(255) NOT NULL, ' +
        'titleUrl VARCHAR(255) NOT NULL, ' +
        'category VARCHAR(20), ' +
        'author VARCHAR(255) NOT NULL, ' +
        'repoUrl VARCHAR (255), ' +
        'publishedOn DATETIME, ' +
        'body TEXT NOT NULL);',
        callback
    );
  };


  Project.truncateTable = function(callback) {
    webDB.execute(
      'DELETE FROM projects;',
      callback
    );
  };

  Project.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO projects (title, titleUrl, category, author, repoUrl, publishedOn, body) VALUES (?, ?, ?, ?, ?, ?, ?);',
          'data': [this.title, this.titleUrl, this.category, this.author, this.repoUrl, this.publishedOn, this.body],
        }
      ],
      callback
    );
  };

  Project.prototype.deleteRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM projects WHERE id = ?;',
          'data': [this.id]
        }
      ],
      callback
    );
  };

  Project.prototype.updateRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'UPDATE projects SET title = ?, titleUrl = ?, category = ?, author = ?, reporUrl = ?, publishedOn = ?, body = ? WHERE id = ?;',
          'data': [this.title, this.titleUrl, this.category, this.author, this.repoUrl, this.publishedOn, this.body, this.id]
        }
      ],
      callback
    );
  };

  Project.loadAll = function(rows) {
    Project.all = rows.map(function(ele) {
      return new Project(ele);
    });
  };

  Project.fetchAll = function(callback) {
    webDB.execute('SELECT * FROM projects ORDER BY publishedOn DESC', function(rows) {
      if (rows.length) {
        Project.loadAll(rows);
        callback();
      } else {
        $.getJSON('scripts/projectData.json', function(rawData) {
          // Cache the json, so we don't need to request it next time:
          rawData.forEach(function(item) {// Instantiate an article based on item from JSON
            var project = new Project(item);// Cache the project in DB
            project.insertRecord();
          });
          webDB.execute('SELECT * FROM projects', function(rows) {
            Project.loadAll(rows);
            callback();
          });
        });
      }
    });
  };

  Project.findWhere = function(field, value, callback) {
    webDB.execute(
      [
        {
          sql: 'SELECT * FROM projects WHERE ' + field + ' = ?;',
          data: [value]
        }
      ],
      callback
    );
  };

  // Example of async, SQL-based approach to getting unique data
  Project.allCategories = function(callback) {
    webDB.execute('SELECT DISTINCT category FROM projects;', callback);
  };

  module.Project = Project;
})(window);
