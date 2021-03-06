var navHomeBtn = document.getElementById("nav-home-btn");
navHomeBtn.addEventListener("click", function () {
  location.reload();
});

var appInfobox = document.getElementsByClassName("launcher-infobox");
for (var i = 0; i < appInfobox.length; i++) {
  appInfobox[i].addEventListener("mouseover", function () {
    this.getElementsByTagName("p")[0].style.backgroundColor = "var(--darkOrange)";
    this.getElementsByTagName("p")[0].style.color = "var(--white)";
  });
  appInfobox[i].addEventListener("mouseout", function () {
    this.getElementsByTagName("p")[0].style.backgroundColor = "";
    this.getElementsByTagName("p")[0].style.color = "";
  });
}
for (var i = 0; i < appInfobox.length; i++) {
  appInfobox[i].addEventListener("click", function () {
    var previouslySelected = document.getElementsByClassName("launcher-infobox-active-text");
    previouslySelected[0].className = previouslySelected[0].className.replace(" launcher-infobox-active-text", "");
    this.getElementsByTagName("p")[0].className += " launcher-infobox-active-text";
  });
}


var navGoBtn = document.getElementById("nav-go-btn");
navGoBtn.addEventListener("click", function () {
  var appFirstName = document.getElementsByClassName("launcher-infobox-active-text")[0].innerHTML;
  var appID = document.getElementsByClassName("launcher-infobox-active-text")[0].parentNode.id;
  if (appID.includes("general")) {
    var newAppLauncherID = "app-" + appFirstName.charAt(0).toLowerCase() + appFirstName.slice(1) + "-launcher";
    launchFromGeneral(newAppLauncherID);
  }
  else {
    var appIDSplitValues = [];
    appIDSplitValues = appID.split("-");
    var appFirstName = appIDSplitValues[3];
    var appType = appIDSplitValues[1].slice(0, -1);
    var newAppID = "app-" + appFirstName + "-" + appType;

    launchFromSpecific(newAppID, appType);
  }
});

function launchFromGeneral(newAppLauncherID) {
  document.getElementById("app-general-launcher").style.display = "none";
  document.getElementById(newAppLauncherID).style.display = "flex";
}

function launchFromSpecific(newAppID, appType) {
  // Loading of JS (via <script></script>)
  /*
  var newAppScriptID = newAppID + "-scripts";
  if (!document.getElementById(newAppScriptID)) {
    var newAppScript = document.createElement("script");
    newAppScript.id = newAppScriptID;
    newAppScript.src = newAppID + ".js";
    document.getElementsByTagName("body")[0].appendChild(newAppScript);
  }
  */
  var specificAppLauncherID = "app-" + appType + "s-launcher";
  document.getElementById(specificAppLauncherID).style.display = "none";
  document.getElementById(newAppID).style.display = "flex";

}