(function(j){var m=Math.abs,k={},n=function(a){function e(b){if(!d[b]){d[b]=[];this["on"+b]=function(h){j.forEach(d[b],function(c){c&&c.call(a,h)})}}}var d={};return{addEventListener:function(b,h,c){b=b.toLowerCase();e.call(this,b);d[b].push(h);c&&dispatchEvent(b);return h},addEventListeners:function(b,h){b=b.toLowerCase();e.call(this,b);d[b]=d[b].concat(h)},removeEventListener:function(b,h){var c=this.getEventListeners(b),g,i;g=0;for(i=c.length;g<i;g++)if(c[g]===h){i=c[g];c[g]=0;return i}},getEventListeners:function(b){return b?
d[b.toLowerCase()]||[]:d},dispatchEvent:function(b,h){b="on"+b.toString().toLowerCase();this[b]&&this[b](h)}}};j.vimeo=function(a,e,d){return new j.vimeo.init(a,e,d)};j.vimeo.onLoad=function(a){var e=k[a];e.swfObj=document.getElementById(a);e.offsetWidth=e.swfObj.offsetWidth;e.offsetHeight=e.swfObj.offsetHeight;e.offsetParent=e.swfObj.offsetParent;e.offsetLeft=e.swfObj.offsetLeft;e.offsetTop=e.swfObj.offsetTop;e.dispatchEvent("load")};j.getScript("http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js");
j.vimeo.init=function(){function a(c){if(c)return(c=c.match(b))?c[0].substr(30):""}function e(c){if(c)return(c=c.match(h))?c[0].substr(10):""}function d(c,g,i){window.swfobject?swfobject.embedSWF("http://vimeo.com/moogaloop.swf",i,c.offsetWidth,c.offsetHeight,"9.0.0","expressInstall.swf",{clip_id:g,show_portrait:1,show_byline:1,show_title:1,js_api:1,js_onLoad:"Popcorn.vimeo.onLoad",js_swf_id:i},{allowscriptaccess:"always",allowfullscreen:"true",wmode:"transparent"},{}):setTimeout(function(){d(c,g,
i)},1)}var b=/^http:\/\/player\.vimeo\.com\/video\/[\d]+/i,h=/vimeo\.com\/[\d]+/;return function(c,g,i){if(c){if(/file/.test(location.protocol))throw"Must run from a web server!";}else throw"Must supply an id!";var f=this;this._container=document.createElement("div");this._container.id=c+"object";this._target=document.getElementById(c);this._target.appendChild(this._container);i=i||{};i.css&&j.extend(this._target.style,i.css);this.evtHolder=this.addEventFn=null;this.paused=true;this.duration=Number.MAX_VALUE;
this.currentTime=this.ended=0;this.volume=1;this.readyState=this.played=this.initialTime=this.loop=0;this.parentNode=this._target.parentNode;this.previousCurrentTime=this.currentTime;this.previousVolume=this.volume;this.evtHolder=new n(this);this.width=this._target.style.width||"504px";this.height=this._target.style.height||"340px";if(/[\d]%/.test(this.width)){c=this._target.style.width;this._target.style.width=this.width;this.offsetWidth=this._target.offsetWidth;this._target.style.width=c}else{this.offsetWidth=
parseInt(this.width,10);this._target.style.width=this.width+"px"}if(/[\d]%/.test(this.height)){c=this._target.style.height;this._target.style.height=this.height;this.offsetHeight=this._target.offsetHeight;this._target.style.height=c}else{this.offsetHeight=parseInt(this.height,10);this._target.style.height=this.height+"px"}this.offsetTop=this.offsetLeft=0;g=e(g)||a(g);if(!g)throw"No video id";k[this._container.id]=this;d(this,g,this._container.id);this.addEventListener("load",function(){var l=false;
f.duration=f.swfObj.api_getDuration();f.evtHolder.dispatchEvent("durationchange");f.evtHolder.dispatchEvent("loadedmetadata");f.addEventListener("timeupdate",function(){f.currentTime=f.swfObj.api_getCurrentTime()});f.addEventListener("pause",function(){f.paused=true});f.addEventListener("playing",function(){f.paused=false;f.ended=0});f.addEventListener("ended",function(){if(f.loop!=="loop"){f.paused=true;f.ended=1}});f.addEventListener("progress",function(o){if(!l){l=1;f.readyState=3;f.evtHolder.dispatchEvent("readystatechange")}if(o.percent===
100){f.readyState=4;f.evtHolder.dispatchEvent("readystatechange");f.evtHolder.dispatchEvent("canplaythrough")}})})}}();j.vimeo.init.prototype=j.vimeo.prototype;j.extend(j.vimeo.prototype,{setLoop:function(a){if(a){this.loop=a;this.swfObj.api_setLoop(a==="loop"?1:0)}},setVolume:function(a){if(!(!a&&a!==0)){if(a<0)a=-a;if(a>1)a%=1;this.volume=this.previousVolume=a;this.swfObj.api_setVolume(a*100);this.evtHolder.dispatchEvent("volumechange")}},setCurrentTime:function(a){if(!(!a&&a!==0)){this.currentTime=
this.previousCurrentTime=a;this.ended=a>=this.duration;this.swfObj.api_seekTo(a);this.evtHolder.dispatchEvent("seeked");this.evtHolder.dispatchEvent("timeupdate")}},play:function(){if(this.swfObj){if(!this.played){this.played=1;this.startTimeUpdater();this.evtHolder.dispatchEvent("loadstart")}this.evtHolder.dispatchEvent("play");this.swfObj.api_play()}else this.addEventListener("load",this.play)},pause:function(){this.swfObj?this.swfObj.api_pause():this.addEventListener("load",this.pause)},mute:function(){if(this.swfObj)if(this.muted())if(this.paused)this.setVolume(this.oldVol);
else this.volume=this.oldVol;else{this.oldVol=this.volume;if(this.paused)this.setVolume(0);else this.volume=0}else this.addEventListener("load",this.mute)},muted:function(){return this.volume===0},load:function(){if(this.swfObj){this.play();this.pause()}else this.addEventListener("load",this.load)},unload:function(){if(this.swfObj){this.pause();this.swfObj.api_unload();this.evtHolder.dispatchEvent("abort");this.evtHolder.dispatchEvent("emptied")}else this.addEventListener("load",this.unload)},addEventListener:function(a,
e){var d;a=a.type||a.toLowerCase();if(a==="seeked")d="onSeek";else if(a==="timeupdate")d="onProgress";else if(a==="progress")d="onLoading";else if(a==="ended")d="onFinish";else if(a==="playing")d="onPlay";else if(a==="pause")d="on"+a[0].toUpperCase()+a.substr(1);this.evtHolder.addEventListener(a,e,false);if(d&&this.evtHolder.getEventListeners(a).length===1){j.vimeo[d]=d==="onSeek"||d==="onProgress"||d==="onLoading"?function(b,h){k[h].evtHolder.dispatchEvent(a,b)}:function(b){k[b].evtHolder.dispatchEvent(a)};
this.swfObj.api_addEventListener(d,"Popcorn.vimeo."+d)}},removeEventListener:function(a,e){return this.evtHolder.removeEventListener(a,e)},dispatchEvent:function(a){return this.evtHolder.dispatchEvent(a)},getBoundingClientRect:function(){return this._target.getBoundingClientRect()},startTimeUpdater:function(){var a=this,e=0;if(m(this.currentTime-this.previousCurrentTime)>0.75){this.setCurrentTime(this.currentTime);e=1}else this.previousCurrentTime=this.currentTime;this.volume!==this.previousVolume&&
this.setVolume(this.volume);if(!a.paused||e)this.dispatchEvent("timeupdate");a.ended||setTimeout(function(){a.startTimeUpdater.call(a)},33)}})})(Popcorn,window);