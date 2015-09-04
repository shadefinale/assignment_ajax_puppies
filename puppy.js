var Puppy = (function(){
  var updatePuppyList = function(){
    var self = this;
    $.get("https://pacific-stream-9205.herokuapp.com/puppies.json", function(xhr){console.log(xhr)});
  }

  return {
    updatePuppyList: updatePuppyList
  };
})($);