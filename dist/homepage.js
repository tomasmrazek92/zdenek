"use strict";(()=>{var r=".figma-block-text-block",a="body",c=".figma-block-text",s="body",d=gsap.timeline({delay:.2,yoyo:!0,repeat:-1,repeatDelay:1});d.to(a,{"--cursorX":"0.5em","--cursorY":"0.5em"}).fromTo(r,{width:"1.2em",height:"0.5em",borderRadius:"0%"},{width:"1em",height:"1em",borderRadius:"50%"},"<0.1").to(c,{yPercent:30,opacity:0},"<").to(s,{"--profileOpacity":"1","--profileY":"0%"},"<");var l=".hp-projects_item",m=".hp-projects_card";$(l).hover(function(){let e=$(this).find(m);e.css({visibility:"visible"});let t=10;var i=e[0].getBoundingClientRect(),o=i.left>=t&&i.right<=(window.innerWidth||document.documentElement.clientWidth)-t;o&&$(this).addClass("active")},function(){$(l).removeClass("active")});})();
