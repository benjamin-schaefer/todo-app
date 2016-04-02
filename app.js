(function(){
  var app = angular.module("tasks", []);

  app.controller("TaskController", function(){
    

    this.tasks = tasks;
    this.new = {};
    // todo: get from browser cache / cookies

    this.add = function() {
      this.new.date_of_creation = new Date();
      this.tasks.push(this.new);
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
})();