var Puppy = (function(){
  var $puppyList,
      $breedsList,
      $puppyName,
      $puppyBreed,
      $puppyErrors;

  var cacheElements = function(){
     $puppyList = $("#puppy-list");
     $breedsList = $("#new-puppy-breed");
     $puppyName = $("#new-puppy-name");
     $puppyBreed = $("#new-puppy-breed");
     $puppyErrors = $("#new-puppy-errors");
  }

  // performRequest is a wrapper to allow us to display progress information to the user
  // without having to repeat this code
  var performRequest = function(callback){
    // Display the waiting message
    // Set a 1s timeout to display the 'sorry it's taking so long message'
    // Run the callback function
    // If it was successful, display success message
    // If it wasn't, display error message.

    console.log("Waiting");
    var wrappedCallback = promiseWrapper(callback);

    wrappedCallback.done( function(){
      alert("Promise Success!");
    });

    wrappedCallback.fail( function(){
      alert("Promise Failed...");
    });

  }

  var promiseWrapper = function(callback){
    var callbackPromise = $.Deferred();
    Puppy[callback](callbackPromise);

    return callbackPromise.promise();
  }

  // With our response, take the list of objects, turn them into nicer puppy objects,
  // Sort them by creation date, and for each puppy object, append it to our list.
  var updatePuppyList = function(){
    $.get("https://pacific-stream-9205.herokuapp.com/puppies.json", function(xhr){
      $puppyList.empty();
      xhr.map(function(el){ return puppify(el) }).sort(function(p1, p2){return creationDate(p1, p2)}).forEach(function(puppy){
        var $listElement = $("<li>" + puppy.toText() + "  <a href='#'>Adopt</a></li>").appendTo($puppyList);
        $listElement.on('click', 'a', function(){
          $.ajax({url:    'https://pacific-stream-9205.herokuapp.com/puppies/' + puppy.id + '.json',
                  type:   'delete',
                  success: function(){
                    updatePuppyList();
                    console.log(puppy.name + " was adopted!")
                 }})
        })
      })
      // If chrome would update to the next version that came out 3 days ago we could use arrow notation
      // xhr.map( el => puppify(el)).sort((p1, p2) => creationDate(p1, p2)).forEach(function(puppy){
      //   $("<li>" + puppy.toText() + "</li>").appendTo($puppyList);
      // })
    });
  }

  var creationDate = function(p1, p2){
    return new Date(p2.createdAt) - new Date(p1.createdAt)
  }

  var puppify = function(el){
    var puppyObject = {};
    puppyObject.id = el.id;
    puppyObject.breed = el.breed.name;
    puppyObject.name = el.name;
    puppyObject.createdAt = el.created_at;
    puppyObject.toText = function(){
      return "" + this.name + " (" + this.breed + ") created " + new Date(this.createdAt) + ".";
    }
    return puppyObject;
  }

  var getBreeds = function(){
    var breeds = {};
    $.get("https://pacific-stream-9205.herokuapp.com/breeds.json", function(xhr){
      xhr.forEach(function(breed){
        $("<option value='" + breed.id + "'>" + breed.name + "</option>").appendTo($breedsList);
      })
    })
  }

  var registerPuppy = function(callbackPromise){
    $.ajax({
      url: 'https://pacific-stream-9205.herokuapp.com/puppies.json',
      type: 'post',
      data: JSON.stringify({breed_id: $puppyBreed.val(), name: $puppyName.val()}),
      contentType: 'application/json',
      dataType: 'json',
      success: function(){ updatePuppyList(); console.log("Success!"); callbackPromise.resolve();},
      error: function(xhr){ displayPuppyErrors(JSON.parse(xhr.responseText)); console.log("ERROR!!!!!!"); callbackPromise.reject();}
    });
  }

  var displayPuppyErrors = function(errorObj){
    $puppyErrors.empty();
    for (key in errorObj){
      $("<li>" + key + " error: " + errorObj[key] + "</li>").appendTo($puppyErrors);
    }
  }

  var performRequest = function(callback){

  }

  return {
    cacheElements: cacheElements,
    updatePuppyList: updatePuppyList,
    getBreeds: getBreeds,
    registerPuppy: registerPuppy,
    performRequest: performRequest,
  };
})($);
