(function(c){c.plugin("lowerthird",{manifest:{about:{name:"Popcorn lowerthird Plugin",version:"0.1",author:"Scott Downe",website:"http://scottdowne.wordpress.com/"},options:{start:{elem:"input",type:"text",label:"In"},end:{elem:"input",type:"text",label:"Out"},target:"lowerthird-container",salutation:{elem:"input",type:"text",label:"Text"},name:{elem:"input",type:"text",label:"Text"},role:{elem:"input",type:"text",label:"Text"}}},_setup:function(b){var a=document.getElementById(b.target);if(!this.container){this.container=
document.createElement("div");this.container.style.position="absolute";this.container.style.color="white";this.container.style.textShadow="black 2px 2px 6px";this.container.style.fontSize="24px";this.container.style.fontWeight="bold";this.container.style.paddingLeft="40px";this.container.style.width=this.video.offsetWidth+"px";this.container.style.left=this.position().left+"px";this.video.parentNode.appendChild(this.container)}if(b.target&&b.target!=="lowerthird-container"){b.container=document.createElement("div");
if(!a&&c.plugin.debug)throw Error("target container doesn't exist");a&&a.appendChild(b.container)}else b.container=this.container},start:function(b,a){a.container.innerHTML=(a.salutation?a.salutation+" ":"")+a.name+(a.role?"<br />"+a.role:"");this.container.style.top=this.position().top+this.video.offsetHeight-(40+this.container.offsetHeight)+"px"},end:function(b,a){a.container.innerHTML=""}})})(Popcorn);
