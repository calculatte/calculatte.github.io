function reduceFraction(numerator, denominator) {
  var gcd = function gcd(x, y) {
    if (isNaN(x) || isNaN(y)) return NaN;
    else return y ? gcd(y, x % y) : x;
  };
  gcd = gcd(numerator, denominator);
  return [numerator / gcd, denominator / gcd];
}

document.querySelector("#fraction-simplifier-equals-btn").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#fraction-simplifier-numerator-output").value = reduceFraction(document.querySelector("#fraction-simplifier-numerator-input").value, document.querySelector("#fraction-simplifier-denominator-input").value)[0];
  document.querySelector("#fraction-simplifier-denominator-output").value = reduceFraction(document.querySelector("#fraction-simplifier-numerator-input").value, document.querySelector("#fraction-simplifier-denominator-input").value)[1];
});