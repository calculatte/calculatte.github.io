var gcd = function gcd(x, y) {
  if (isNaN(x) || isNaN(y)) return NaN;
  else return y ? gcd(y, x % y) : x;
};

document.querySelector("#gcd-hcf-solver-equals-btn").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#gcd-hcf-solver-output").value = gcd(document.querySelector("#gcd-hcf-solver-first-input").value, document.querySelector("#gcd-hcf-solver-second-input").value);
});