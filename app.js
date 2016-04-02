(function(){
  var app = angular.module("tasks", []);

  app.controller("TaskController", function(){
    this.tasks = tasks;
    // todo: get from browser cache / cookies

    this.add = function(task) {
      this.tasks.push(task);
    }
    this.delete = function(task) {

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
    date_of_creation: "2016-04-02",
    maturity: "2016-03-31"
  }
  ];
})();