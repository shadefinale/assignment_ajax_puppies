FILES = (function(){

  function initializeFileListener(){
    var $fileButton = $("#csvFile");
    $fileButton.unbind('change');
    $fileButton.change(function(evt) {
      console.log($(this).val());
    });
  }

  return {
    initializeFileListener: initializeFileListener,
  };
})();
