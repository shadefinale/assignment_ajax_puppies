FILES = (function(){

  var fileCache;

  function initializeFileListener(){
    var $fileButton = $("#csvFile");
    $fileButton.unbind('change');
    $fileButton.change(function(evt) {
      for (var i = 0; i < this.files.length; i++){
        var reader = new FileReader()
        var result = reader.readAsText(this.files[i], "UTF-8")
        reader.onload = (function(){
          fileCache = reader.result;
        })
      }
    });
  }

  return {
    initializeFileListener: initializeFileListener,
  };
})();
