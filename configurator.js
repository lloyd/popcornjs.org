$(document).ready(function() {
  $.get("code/dist/manifest.json", function (mani) {
    alert(mani);
  });
});
