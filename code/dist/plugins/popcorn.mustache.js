(function(d){d.plugin("mustache",function(a){var f,b,g,c;d.getScript("https://github.com/janl/mustache.js/raw/master/mustache.js");var i=!!a.dynamic,j=typeof a.template,h=typeof a.data,k=document.getElementById(a.target);if(!k&&d.plugin.debug)throw Error("target container doesn't exist");a.container=k||document.createElement("div");if(j==="function")if(i)g=a.template;else c=a.template(a);else if(j==="string")c=a.template;else if(d.plugin.debug)throw Error("Mustache Plugin Error: options.template must be a String or a Function.");
else c="";if(h==="function")if(i)f=a.data;else b=a.data(a);else if(h==="string")b=JSON.parse(a.data);else if(h==="object")b=a.data;else if(d.plugin.debug)throw Error("Mustache Plugin Error: options.data must be a String, Object, or Function.");else b="";return{start:function(m,e){var l=function(){if(window.Mustache){if(f)b=f(e);if(g)c=g(e);var n=Mustache.to_html(c,b).replace(/^\s*/mg,"");e.container.innerHTML=n}else setTimeout(function(){l()},10)};l()},end:function(m,e){e.container.innerHTML=""},
_teardown:function(){f=b=g=c=null}}},{about:{name:"Popcorn Mustache Plugin",version:"0.1",author:"David Humphrey (@humphd)",website:"http://vocamus.net/dave"},options:{start:{elem:"input",type:"text",label:"In"},end:{elem:"input",type:"text",label:"Out"},target:"mustache-container",template:{elem:"input",type:"text",label:"Template"},data:{elem:"input",type:"text",label:"Data"},dynamic:{elem:"input",type:"text",label:"Dynamic"}}})})(Popcorn);