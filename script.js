PuppyHandler = (function(){
  var $updatePuppyButton;
  var $newPuppySubmit;

  function initialize(){
    setupPuppyHandlers();
  }

  function setupPuppyHandlers(){
    $updatePuppyButton = $("#update-puppies");
    $updatePuppyButton.click(function(evt){
      evt.preventDefault();
      Puppy.updatePuppyList();
    })

    $newPuppySubmit = $("#new-puppy-submit");
    $newPuppySubmit.click(function(evt){
      evt.preventDefault();
      Puppy.registerPuppy();
      // Puppy.performRequest('registerPuppy');
    })
  }

  return {
    initialize: initialize,
  };

})(Puppy);


$(document).ready(function(){
  Puppy.cacheElements();
  Puppy.getBreeds();
  Puppy.setupAjax();
  PuppyHandler.initialize();
  FILES.initializeFileListener();

})
