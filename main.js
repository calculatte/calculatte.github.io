$("body").on("click", ".snackbar-trigger", function (e) {
  e.preventDefault();
  $(".snackbar").removeClass("shown");
});