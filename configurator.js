$(document).ready(function() {
  // fetch the 'manifest', which describes all of the available
  // resources
  $.get("code/dist/manifest.json", function (mani) {
    // populate all of the choices
    for (var k in mani) {
      if (!mani.hasOwnProperty(k)) continue;

      // first remove the ... place holder
      $("#elements > ul[category=" + k + "] li:nth-child(2)").remove();

      // now add all the items
      var parent = $("#elements > ul[category=" + k + "]");
      for (var i = 0; i < mani[k].length; i++) {
        var n = $("<li><div></div></li>");
        var shortname = mani[k][i].replace(/^popcorn./, "").replace(/\.js$/, "");
        n.find("div").text(shortname).attr("file", mani[k][i]);
        parent.append(n);
        // toggle selected class upon click
        n.click(function(e) { $(this).find("div").toggleClass('selected'); });
      }

    }
  }, 'json');

  // set up the build button, which upon a click will cause the custom library
  // to be built
  $("#build_button").click(function() {
    // clear the output textarea
    $("#built_library").val("");

    // clear the progress bar
    $("#progress #current").css('width', "0%").removeClass('complete');

    // first gather all resources
    var resources = [
      "code/dist/popcorn.min.js" // popcorn, the base library, is always included
    ];
    $("#elements div.selected").each(function () {
      var category = $(this).closest("ul").attr('category');
      resources.push("code/dist/" + category + "/" + $(this).attr('file'));
    });
    
    // remember how many resources we are fetching for reasonable progress feedback
    var numRes = resources.length;

    // now fetch them!
    function getNextResource() {
      if (resources.length === 0) {
        $("#progress #current").addClass('complete');
        return;
      }
      var path = resources.shift();
      
      $.get(path, function(data) {
        // update the progress bar
        $("#progress #current").css(
          'width',
          (((numRes - resources.length) / numRes) * 100).toFixed(0) + "%");
        $("#built_library").val($("#built_library").val()+";"+data); 
        var k = $("#built_library").val().length / 1024.0; 
        k = k.toFixed(0) + "kb uncompressed.";
        $("#progress #libsize").text(k);
        getNextResource();
      });
    }
    // start the show
    getNextResource();
  });
});
