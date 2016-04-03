

(function(){
  var app = angular.module("tasks", ["angular-cache"]);

  app.controller("TaskController", function(CacheFactory){

    if (!CacheFactory.get('taskCache')) {
      CacheFactory.createCache('taskCache', {
        deleteOnExpire: 'none',
        storageMode: 'localStorage'
      });
    }
    taskCache = CacheFactory.get('taskCache');

    if(taskCache.values().length === 0) {
      createDefaultValues();
    }

    this.tasks = taskCache.values();
    this.new = {};        // dummy for new object

    this.add = function() {
      this.new.date_of_creation = new Date();
      this.tasks.push(this.new);
      taskCache.put('/tasks/'+taskCache.values().length, this.new)
      this.new = {};
    }

    this.edit = function() {
      // body...
    }

    this.delete = function() {

    }
  });

  var tasks = [{
    title: "Müll rausbringen",
    description: "Bring den Müll raus!",
    date_of_creation: "2016-04-02",
    maturity: "2016-04-02"
  }, 
  {
    title: "Küche saubermachen",
    description: "Oberflächen abwischen, abwaschen, Boden kehren und wischen",
    date_of_creation: "2016-04-02",
    maturity: "2016-04-03"
  },
  {
    title: "zu move:elevator-Vorstellungsgespräch gehen",
    description:"siehe Titel",
    date_of_creation: "2016-04-02",
  }
  ];

  var createDefaultValues = function() {
    console.log("createDefaultValues");
    tasks.forEach(function(task, index, array){
      taskCache.put('/tasks/'+index, task);
    });
  }
      
})();




/*




angular.module('myApp', ['angular-cache'])
  .config(function (CacheFactoryProvider) {
    angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
  })
  .service('BookService', function (CacheFactory, $http) {
    if (!CacheFactory.get('bookCache')) {
      // or CacheFactory('bookCache', { ... });
      CacheFactory.createCache('bookCache', {
        deleteOnExpire: 'aggressive',
        recycleFreq: 60000
      });
    }

    var bookCache = CacheFactory.get('bookCache');

    return {
      findBookById: function (id) {
        return $http.get('/api/books/' + id, { cache: bookCache });
      }
    };
  });

  */