var cat = document.getElementById("unit-converter-category");

cat.addEventListener("change", function () {
  var catValue = cat.value;

  var allUnits = document.getElementsByClassName("unit-converter-unit");
  for (var i = 0; i < allUnits.length; i++) {
    allUnits[i].style.display = "none";
  }
  var appropriateUnitsClass = "unit-converter-" + catValue + "-unit";
  var appropriateUnits = document.getElementsByClassName(appropriateUnitsClass);
  for (var i = 0; i < appropriateUnits.length; i++) {
    appropriateUnits[i].style.display = "block";
  }
}, false);

var btn = document.getElementById("unit-converter-equals-btn");
btn.addEventListener("click", function () {
  var catValue = cat.value;
  var mapFrom = document.getElementById("unit-converter-" + catValue + "-unit-input").value;
  var mapTo = document.getElementById("unit-converter-" + catValue + "-unit-output").value;
  var arr = mapTo.split(',');
  var numberInput = document.getElementById("unit-converter-number-input").value;
  var numberOutput = numberInput * arr[mapFrom];
  document.getElementById("unit-converter-output").value = numberOutput;
});



