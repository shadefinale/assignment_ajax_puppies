PuppyHandler = (function(){
  var updatePuppyButton;
  var newPuppyName;
  var newPuppyBreed;
  var newPuppySubmit;

  function initialize(){
    setupPuppyHandlers();
  }

  function setupPuppyHandlers(){
    updatePuppyButton = $("#update-puppies");
    newPuppyName = $("#new-puppy-name");
    newPuppyBreed = $("#new-puppy-breed");
    newPuppySubmit = $("#new-puppy-submit");

    updatePuppyButton.click(function(evt){
      evt.preventDefault();
      Puppy.updatePuppyList();
    })
  }

  return {
    initialize: initialize,
  };

})(Puppy);

$(document).ready(function(){
  Puppy.cacheElements();
  PuppyHandler.initialize();

})
