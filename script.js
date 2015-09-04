PuppyHandler = (function(){
  var updatePuppyButton;
  var newPuppySubmit;

  function initialize(){
    setupPuppyHandlers();
  }

  function setupPuppyHandlers(){
    updatePuppyButton = $("#update-puppies");
    updatePuppyButton.click(function(evt){
      evt.preventDefault();
      Puppy.updatePuppyList();
    })

    newPuppySubmit = $("#new-puppy-submit");
    newPuppySubmit.click(function(evt){
      evt.preventDefault();
      Puppy.registerPuppy();
    })
  }

  return {
    initialize: initialize,
  };

})(Puppy);


$(document).ready(function(){
  Puppy.cacheElements();
  Puppy.getBreeds();
  PuppyHandler.initialize();

})
