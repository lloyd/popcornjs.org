(function(d,i){function e(b,c){if(b)b.style.display=c;else setTimeout(function(){e(b,c)},10)}var f=false;d.plugin("facebook",{manifest:{about:{name:"Popcorn Facebook Plugin",version:"0.1",author:"Dan Ventura",website:"dsventura.blogspot.com"},options:{type:{elem:"select",options:["LIKE","LIKE-BOX","ACTIVITY","FACEPILE","LIVE-STREAM","SEND"],label:"Type"},target:"facebook-container",start:{elem:"input",type:"number",label:"In"},end:{elem:"input",type:"number",label:"Out"},font:{elem:"input",type:"text",
label:"font"},xid:{elem:"input",type:"text",label:"Xid"},href:{elem:"input",type:"text",label:"Href"},site:{elem:"input",type:"text",label:"Site"},height:{elem:"input",type:"text",label:"Height"},width:{elem:"input",type:"text",label:"Width"},action:{elem:"select",options:["like","recommend"],label:"Action"},stream:{elem:"select",options:["false","true"],label:"Stream"},header:{elem:"select",options:["false","true"],label:"Header"},layout:{elem:"select",options:["standard","button_count","box_count"],
label:"Layout"},max_rows:{elem:"input",type:"text",label:"Max_rows"},border_color:{elem:"input",type:"text",label:"Border_color"},event_app_id:{elem:"input",type:"text",label:"Event_app_id"},colorscheme:{elem:"select",options:["light","dark"],label:"Colorscheme"},show_faces:{elem:"select",options:["false","true"],label:"Showfaces"},recommendations:{elem:"select",options:["false","true"],label:"Recommendations"},always_post_to_friends:{elem:"input",options:["false","true"],label:"Always_post_to_friends"}}},
_setup:function(b){var c=document.getElementById(b.target);if(!document.getElementById("fb-root")){var g=document.createElement("div");g.setAttribute("id","fb-root");document.body.appendChild(g)}if(!f||b.event_app_id){f=true;d.getScript("http://connect.facebook.net/en_US/all.js");i.fbAsyncInit=function(){FB.init({appId:b.event_app_id||"",status:true,cookie:true,xfbml:true})}}b.type=(b.type||"like").toLowerCase();if(!(["like","like-box","activity","facepile","comments","live-stream","send"].indexOf(b.type)>
-1))b.type="like";b._container=document.createElement("fb:"+b.type);(function(a){a._container.style.display="none";var h=a.type==="activity"?"site":"href";a._container.setAttribute(h,a[h]||document.URL);return{like:function(){a._container.setAttribute("send",a.send||false);a._container.setAttribute("width",a.width);a._container.setAttribute("show_faces",a.show_faces);a._container.setAttribute("layout",a.layout);a._container.setAttribute("font",a.font);a._container.setAttribute("colorscheme",a.colorscheme)},
"like-box":function(){a._container.setAttribute("height",a.height||250);a._container.setAttribute("width",a.width);a._container.setAttribute("show_faces",a.show_faces);a._container.setAttribute("stream",a.stream);a._container.setAttribute("header",a.header);a._container.setAttribute("colorscheme",a.colorscheme)},facepile:function(){a._container.setAttribute("height",a.height);a._container.setAttribute("width",a.width);a._container.setAttribute("max_rows",a.max_rows||1)},activity:function(){a._container.setAttribute("width",
a.width);a._container.setAttribute("height",a.height);a._container.setAttribute("header",a.header);a._container.setAttribute("border_color",a.border_color);a._container.setAttribute("recommendations",a.recommendations);a._container.setAttribute("font",a.font);a._container.setAttribute("colorscheme",a.colorscheme)},"live-stream":function(){a._container.setAttribute("width",a.width||400);a._container.setAttribute("height",a.height||500);a._container.setAttribute("always_post_to_friends",a.always_post_to_friends||
false);a._container.setAttribute("event_app_id",a.event_app_id);a._container.setAttribute("xid",a.xid)},send:function(){a._container.setAttribute("font",a.font);a._container.setAttribute("colorscheme",a.colorscheme)}}})(b)[b.type]();if(!c&&d.plugin.debug)throw Error("flickr target container doesn't exist");c&&c.appendChild(b._container)},start:function(b,c){e(c._container,"inline")},end:function(b,c){e(c._container,"none")}})})(Popcorn,this);
