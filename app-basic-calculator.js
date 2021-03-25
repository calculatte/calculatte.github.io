const btns = document.querySelectorAll("button");
const cli = document.querySelector("#basic-calculator-display-cli");
const output = document.querySelector("#basic-calculator-display-output");

btns.forEach(function (currentBtn) {
  currentBtn.addEventListener("click", (e) => {
    // e.preventDefault();
    let currentKey = currentBtn.getAttribute("data-key");
    // For terminating cases, cli is cleared, else currentKey is added on to cli
    if (currentKey == "AC") {
      output.innerHTML = "0";
      cli.innerHTML = "";
    }
    else if (currentKey == "=") {
      const bracketPrimarySubstitutables = ["0(", "1(", "2(", "3(", "4(", "5(", "6(", "7(", "8(", "9("];
      const bracketSecondarySubstitutables = ["+*", "-*", "**", "/*"];
      const bracketSecondarySubstituents = ["+", "-", "*", "/"];
      for (let i = 0; i < bracketPrimarySubstitutables.length; i++) {
        if (cli.innerHTML.includes(bracketPrimarySubstitutables[i])) {
          cli.innerHTML = cli.innerHTML.replace(/\(/g, "*(").toString();
          for (let j = 0; j < bracketSecondarySubstitutables.length; j++) {
            if (cli.innerHTML.includes(bracketSecondarySubstitutables[j])) {
              cli.innerHTML = cli.innerHTML.replace(new RegExp(bracketSecondarySubstitutables[j], "g"), new RegExp(bracketSecondarySubstituents[j], "g")).toString();
            }
          }
        }
      }
      output.innerHTML = eval(cli.innerHTML).toString();
      // cli.innerHTML = "";
    }
    else if (currentKey == "%") {
      output.innerHTML = eval("(" + cli.innerHTML + ")/100").toString();
      // cli.innerHTML = "";
    }
    else {
      cli.innerHTML += currentKey;
    }

  });
})