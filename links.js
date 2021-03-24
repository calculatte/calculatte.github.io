$(document).on("click", "*", function () {
  var href = $(this).attr("href");
  if (href) { window.open(href, "_self") }
  else { return false; }
});