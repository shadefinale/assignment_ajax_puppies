var Puppy = (function(){
  var puppyList;
  var breedsList;
  var puppyName;
  var puppyBreed;

  var cacheElements = function(){
     puppyList = $("#puppy-list");
     breedsList = $("#new-puppy-breed");
     puppyName = $("#new-puppy-name");
     puppyBreed = $("#new-puppy-breed");
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

  var getBreeds = function(){
    var breeds = {};
    $.get("https://pacific-stream-9205.herokuapp.com/breeds.json", function(xhr){
      xhr.forEach(function(breed){
        $("<option value='" + breed.id + "'>" + breed.name + "</option>").appendTo(breedsList);
      })
    })
  }

  var registerPuppy = function(){
    $.ajax({
      url: 'https://pacific-stream-9205.herokuapp.com/puppies.json',
      type: 'post',
      data: JSON.stringify({breed_id: puppyBreed.val(), name: puppyName.val()}),
      contentType: 'application/json',
      dataType: 'json',
      success: function(){ console.log("Success!")}
    });
  }

  return {
    cacheElements: cacheElements,
    updatePuppyList: updatePuppyList,
    getBreeds: getBreeds,
    registerPuppy: registerPuppy
  };
})($);
