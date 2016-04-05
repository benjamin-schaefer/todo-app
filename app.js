(function(){
  var app = angular.module("tasks", ["angular-cache"]);

  // taken from http://stackoverflow.com/questions/26782917/model-is-not-a-date-object-on-input-in-angularjs
  app.directive("formatDate", function(){
    return {
     require: 'ngModel',
      link: function(scope, elem, attr, modelCtrl) {
        modelCtrl.$formatters.push(function(modelValue){
          return new Date(modelValue);
        })
      }
    }
  });

  app.controller("TaskController", function(CacheFactory){

    if (!CacheFactory.get('taskCache')) {
      CacheFactory.createCache('taskCache', {
        deleteOnExpire: 'none',
        storageMode: 'localStorage'
      });
    }
    var taskCache = CacheFactory.get('taskCache');
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
      this.new.maturity = new Date()
    }
    this.resetEditForm = function() {
      this.edit = {};
      this.edit.maturity = new Date()
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

    this.update = function(task) {
      taskCache.put('/tasks/' + task.id, task);
      this.resetEditForm();
    }

    this.delete = function(id) {
      taskCache.remove('/tasks/' + id);
      this.tasks = taskCache.values();
    }
  });
      
})();
