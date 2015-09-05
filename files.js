FILES = (function(){

  var $dogList;
  var $fileButton;

  function initializeFileListener(){
    $fileButton = $("#csvFile");
    $dogList = $("#potential-puppies");

    $fileButton.unbind('change');
    $fileButton.change(function(evt) {
      $dogList.empty();
      for (var i = 0; i < this.files.length; i++){
        var reader = new FileReader()
        var result = reader.readAsText(this.files[i], "UTF-8")
        reader.onload = (function(){
          displayDogs(parseResults(reader.result));
        })
      }
      if (this.files.length > 0) appendUploadButton();
    });
  }

  function appendUploadButton(){
    $dogList.append("<button id='batch-upload'>UPLOAD DOGS</button>");
  }

  function parseResults(results){
    var ret = results.split("\n").map(function(listing){
      var splitListing = listing.split(",").map(function(value){ return value.replace(/[ ]{1,}/g, "")})
      return {name: splitListing[0], breed_id: splitListing[1]};
    })
    console.log(ret)
    return ret;
  }

  function displayDogs(results){
    results.slice(0, results.length-1).forEach(function(result){
      console.log(result, result.name, result.breed_id);
      $("<li>" + result.name + ", " + result.breed_id + "</li>").appendTo($dogList);
    })
  }

  return {
    initializeFileListener: initializeFileListener,
  };
})();
