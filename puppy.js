var Puppy = (function(){
  var puppyList;

  var cacheElements = function(){
     puppyList = $("#puppy-list");
  }

  var updatePuppyList = function(){
    $.get("https://pacific-stream-9205.herokuapp.com/puppies.json", function(xhr){
      xhr.map(function(el){ return puppify(el) }).forEach(function(el){
        $("<li>" + el.toText() + "</li>").appendTo(puppyList);
      })
    });
  }

  var puppify = function(el){
    var puppyObject = {};
    puppyObject.breed = el.breed.name;
    puppyObject.name = el.name;
    puppyObject.createdAt = el.created_at;
    puppyObject.toText = function(){
      return "" + this.name + " (" + this.breed + ") created " + this.createdAt + ".";
    }
    return puppyObject;
  }

  return {
    cacheElements: cacheElements,
    updatePuppyList: updatePuppyList,
  };
})($);
