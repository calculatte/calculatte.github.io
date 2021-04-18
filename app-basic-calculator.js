// calculator.js
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
		} else if (currentKey == "=") {
			const bracketFirstSubstitutables = [
				"(0",
				"(1",
				"(2",
				"(3",
				"(4",
				"(5",
				"(6",
				"(7",
				"(8",
				"(9"
			];
			const bracketFirstSubstituents = [
				"*(0",
				"*(1",
				"*(2",
				"*(3",
				"*(4",
				"*(5",
				"*(6",
				"*(7",
				"*(8",
				"*(9"
			];
			const bracketSecondSubstitutables = [
				")0",
				")1",
				")2",
				")3",
				")4",
				")5",
				")6",
				")7",
				")8",
				")9"
			];
			const bracketSecondSubstituents = [
				")*0",
				")*1",
				")*2",
				")*3",
				")*4",
				")*5",
				")*6",
				")*7",
				")*8",
				")*9"
			];

			for (let i = 0; i < bracketFirstSubstitutables.length; i++) {
				if (cli.innerHTML.includes(bracketFirstSubstitutables[i])) {
					cli.innerHTML = cli.innerHTML
						.split(bracketFirstSubstitutables[i])
						.join(bracketFirstSubstituents[i])
						.toString();
				}
			}

			for (let j = 0; j < bracketSecondSubstitutables.length; j++) {
				if (cli.innerHTML.includes(bracketSecondSubstitutables[j])) {
					cli.innerHTML = cli.innerHTML
						.split(bracketSecondSubstitutables[j])
						.join(bracketSecondSubstituents[j]);
				}
			}

			/*
			const bracketThirdSubstitutables = ["+*", "-*", "**", "/*"];
			const bracketThirdSubstituents = ["+", "-", "*", "/"];
			for (let k = 0; k < bracketThirdSubstitutables.length; k++) {
					if (cli.innerHTML.includes(bracketThirdSubstitutables[k])) {
						cli.innerHTML = cli.innerHTML
							.split(bracketThirdSubstitutables[k])
							.join(bracketThirdSubstituents[k])
							.toString();
					}
			}
			*/
			if (cli.innerHTML.charAt(0) == "*")
				cli.innerHTML = cli.innerHTML.substring(1);

			// alert(cli.innerHTML);
			output.innerHTML = eval(cli.innerHTML).toString();
			// cli.innerHTML = "";
		} else if (currentKey == "%") {
			output.innerHTML = eval("(" + cli.innerHTML + ")/100").toString();
			// cli.innerHTML = "";
		} else {
			cli.innerHTML += currentKey;
		}
	});
});
