var cat = document.getElementById("common-unit-converter-category");

cat.addEventListener("change", function () {
  var catValue = cat.value;

  var allUnits = document.getElementsByClassName("common-unit-converter-unit");
  for (var i = 0; i < allUnits.length; i++) {
    allUnits[i].style.display = "none";
  }
  var appropriateUnitsClass = "common-unit-converter-" + catValue + "-unit";
  var appropriateUnits = document.getElementsByClassName(appropriateUnitsClass);
  for (var i = 0; i < appropriateUnits.length; i++) {
    appropriateUnits[i].style.display = "block";
  }
}, false);

document.getElementById("common-unit-converter-equals-btn").addEventListener("click", function () {
  var catValue = cat.value;
  var mapFrom = document.getElementById("common-unit-converter-" + catValue + "-unit-input").value;
  var mapTo = document.getElementById("common-unit-converter-" + catValue + "-unit-output").value;
  var arr = mapTo.split(',');
  var numberInput = document.getElementById("common-unit-converter-number-input").value;
  var numberOutput = numberInput * arr[mapFrom];
  document.getElementById("common-unit-converter-output").value = numberOutput;
});



