

(function(){
  var app = angular.module("tasks", ["angular-cache"]);

  app.controller("TaskController", function(CacheFactory){

    if (!CacheFactory.get('taskCache')) {
      CacheFactory.createCache('taskCache', {
        deleteOnExpire: 'none',
        storageMode: 'localStorage'
      });
    }
    var taskCache = CacheFactory.get('taskCache');

    // if(taskCache.values().length === 0) {
    //   createDefaultValues();
    // }
    this.tasks = taskCache.values();

    this.getMaxIndex = function(){
      var maxIndex = 0;
      this.tasks.forEach(function(task, i, tasks){
        maxIndex = (task.id > maxIndex) ? task.id : maxIndex;
      });
      return maxIndex;
    }
    this.newIndex = this.getMaxIndex();

    this.resetNewForm = function() {
      this.new = {};
    }
    this.resetEditForm = function() {
      this.edit = {};
    }
    this.resetNewForm();
    this.resetEditForm();

    this.add = function() {
      this.new.date_of_creation = new Date();
      this.new.id = ++this.newIndex;
      this.tasks.push(this.new);
      taskCache.put('/tasks/' + this.new.id, this.new);
      this.resetNewForm();
    }

    this.edit = function(id) {
      // body...
      this.resetEditForm();
    }

    this.delete = function(id) {
      taskCache.remove('/tasks/' + id);
      this.tasks = taskCache.values();
    }
  });
      
})();