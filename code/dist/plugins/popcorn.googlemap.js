var googleCallback;
(function(p){var v=1,w=false,x=false,y,q;googleCallback=function(c){if(typeof google!=="undefined"&&google.maps&&google.maps.Geocoder&&google.maps.LatLng){y=new google.maps.Geocoder;x=true}else setTimeout(function(){googleCallback(c)},1)};q=function(){if(document.body){w=true;p.getScript("http://maps.google.com/maps/api/js?sensor=false&callback=googleCallback")}else setTimeout(function(){q()},1)};p.plugin("googlemap",function(c){var h,d,l,r=document.getElementById(c.target);w||q();h=document.createElement("div");
h.id="actualmap"+v;h.style.width="100%";h.style.height="100%";v++;if(!r&&p.plugin.debug)throw Error("target container doesn't exist");r&&r.appendChild(h);var z=function(){if(x)if(c.location)y.geocode({address:c.location},function(i,a){if(a===google.maps.GeocoderStatus.OK){c.lat=i[0].geometry.location.lat();c.lng=i[0].geometry.location.lng();l=new google.maps.LatLng(c.lat,c.lng);d=new google.maps.Map(h,{mapTypeId:google.maps.MapTypeId[c.type]||google.maps.MapTypeId.HYBRID});d.getDiv().style.display=
"none"}});else{l=new google.maps.LatLng(c.lat,c.lng);d=new google.maps.Map(h,{mapTypeId:google.maps.MapTypeId[c.type]||google.maps.MapTypeId.HYBRID});d.getDiv().style.display="none"}else setTimeout(function(){z()},5)};z();return{start:function(i,a){var C=this,s,B=function(){if(d){d.getDiv().style.display="block";google.maps.event.trigger(d,"resize");d.setCenter(l);if(a.zoom&&typeof a.zoom!=="number")a.zoom=+a.zoom;a.zoom=a.zoom||8;d.setZoom(a.zoom);if(a.heading&&typeof a.heading!=="number")a.heading=
+a.heading;if(a.pitch&&typeof a.pitch!=="number")a.pitch=+a.pitch;if(a.type==="STREETVIEW"){d.setStreetView(s=new google.maps.StreetViewPanorama(h,{position:l,pov:{heading:a.heading=a.heading||0,pitch:a.pitch=a.pitch||0,zoom:a.zoom}}));var n=function(f,t){var j=google.maps.geometry.spherical.computeHeading;setTimeout(function(){var g=C.media.currentTime;if(typeof a.tween==="object"){for(var b=0,m=f.length;b<m;b++){var e=f[b];if(g>=e.interval*(b+1)/1E3&&(g<=e.interval*(b+2)/1E3||g>=e.interval*m/1E3)){A.setPosition(new google.maps.LatLng(e.position.lat,
e.position.lng));A.setPov({heading:e.pov.heading||j(e,f[b+1])||0,zoom:e.pov.zoom||0,pitch:e.pov.pitch||0})}}n(f,f[0].interval)}else{b=0;for(m=f.length;b<m;b++){e=a.interval;if(g>=e*(b+1)/1E3&&(g<=e*(b+2)/1E3||g>=e*m/1E3)){u.setPov({heading:j(f[b],f[b+1])||0,zoom:a.zoom,pitch:a.pitch||0});u.setPosition(o[b])}}n(o,a.interval)}},t)};if(a.location&&typeof a.tween==="string"){var u=s,o=[],k=new google.maps.DirectionsService,D=new google.maps.DirectionsRenderer(u);k.route({origin:a.location,destination:a.tween,
travelMode:google.maps.TravelMode.DRIVING},function(f,t){if(t==google.maps.DirectionsStatus.OK){D.setDirections(f);for(var j=f.routes[0].overview_path,g=0,b=j.length;g<b;g++)o.push(new google.maps.LatLng(j[g].lat(),j[g].lng()));a.interval=a.interval||1E3;n(o,10)}})}else if(typeof a.tween==="object"){var A=s;k=0;for(var E=a.tween.length;k<E;k++){a.tween[k].interval=a.tween[k].interval||1E3;n(a.tween,10)}}}}else setTimeout(function(){B()},13)};B()},end:function(){if(d)d.getDiv().style.display="none"},
_teardown:function(i){(i=document.getElementById(i.target))&&i.removeChild(h);h=d=l=null}}},{about:{name:"Popcorn Google Map Plugin",version:"0.1",author:"@annasob",website:"annasob.wordpress.com"},options:{start:{elem:"input",type:"text",label:"In"},end:{elem:"input",type:"text",label:"Out"},target:"map-container",type:{elem:"select",options:["ROADMAP","SATELLITE","STREETVIEW","HYBRID","TERRAIN"],label:"Type"},zoom:{elem:"input",type:"text",label:"Zoom"},lat:{elem:"input",type:"text",label:"Lat"},
lng:{elem:"input",type:"text",label:"Lng"},location:{elem:"input",type:"text",label:"Location"},heading:{elem:"input",type:"text",label:"Heading"},pitch:{elem:"input",type:"text",label:"Pitch"}}})})(Popcorn);