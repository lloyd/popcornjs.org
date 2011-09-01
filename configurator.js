$(document).ready(function() {
  $.get("code/dist/manifest.json", function (mani) {
    // populate all of the choices
    for (var k in mani) {
      if (!mani.hasOwnProperty(k)) continue;

      // first remove the ... place holder
      $("#elements > ul." + k + " li:nth-child(2)").remove();

      // now add all the items
      var parent = $("#elements > ul." + k);
      for (var i = 0; i < mani[k].length; i++) {
        var n = $("<div><span class='name'></span></div>");
        var shortname = mani[k][i].replace(/^popcorn./, "").replace(/\.js$/, "");
        n.find(".name").text(shortname).attr("file", mani[k][i]);
        parent.append(n);
      }

    }
  }, 'json');
});
