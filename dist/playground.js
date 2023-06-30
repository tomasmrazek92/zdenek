"use strict";(()=>{var n=document.getElementById("drawingCanvas"),c=n.getContext("2d"),p=!1;c.lineWidth=5;var g=document.getElementById("base64Image");n.addEventListener("mousedown",e=>{p=!0;let t=n.getBoundingClientRect(),o=n.width/t.width,i=n.height/t.height,s=e.clientX-t.left,l=e.clientY-t.top;c.beginPath(),c.moveTo(s*o,l*i)});n.addEventListener("mousemove",e=>{if(!p)return;let t=n.getBoundingClientRect(),o=n.width/t.width,i=n.height/t.height,s=e.clientX-t.left,l=e.clientY-t.top;c.lineTo(s*o,l*i),c.stroke()});n.addEventListener("mouseup",()=>{p=!1;let t=n.toDataURL("").replace(/^data:image\/(png|jpeg|jpg);base64,/,"");g.removeAttribute("maxlength"),g.value=t});$("#createBtn").on("click",function(){$("#submitBtn").trigger("click")});var d=".plg-modal",f=".plg-modal_content",u=".plg-modal_slider";var r,m=!1,a=!1,w;$(".plg-visuals_visual").on("click",function(){let e=$(this),t=e.find(".name").val(),o=e.find(".slug").val();$(f).empty();let i=gsap.timeline();i.set(d,{opacity:0}),i.to(d,{opacity:1,display:"block"}),$(f).load("/playground-items/"+o+" .plg-modal_slider",function(){m=!0,a&&(r.destroy(!0,!0),a=!1),y(),h(u),$(".plg-modal_head-inner p").text(t);let s=$(d).find(".plg-modal_item-1");gsap.timeline().from(s,{y:"2rem",opacity:0,stagger:{each:.2}}),window.matchMedia("(min-width: 0px) and (max-width: 991px)")&&$(f).find("video").each(function(){$(this)[0].load(),$(this)[0].play()})})});function h(e){let t=window.matchMedia("(min-width: 0px) and (max-width: 991px)"),o=window.matchMedia("(min-width: 992px)");m&&(o.matches?a||(a=!0,r=new Swiper(e,{slidesPerView:"auto",spaceBetween:48,speed:500,observer:!0,mousewheel:!0,keyboard:{enabled:!0},shortSwipes:!1,threshold:200,on:{slideChange:i=>{v($(".swiper-wrapper"),i.realIndex)},init:i=>{v($(".swiper-wrapper"),i.realIndex)},onRealIndexChange:i=>{i.allowTouchMove=!1,i.unsetGrabCursor()},onTouchEnd:i=>{i.allowTouchMove=!0}}})):t.matches&&a&&(r.destroy(!0,!0),a=!1))}window.addEventListener("load",function(){h(u)});window.addEventListener("resize",function(){h(u)});var v=(e,t)=>{let o=$(e).find("[visual-video]").not(".w-condition-invisible"),s=$(e).find(".swiper-slide").eq(t);console.log(o),o.each(function(){$(this).find("video")[0].pause(),$(this).find("video")[0].currentTime=0});let l=s.find(o).find("video")[0];console.log(l),l&&l.play()};$("#modalClose").on("click",function(){r&&r.destroy(),m=!1,y();let e=gsap.timeline(),t=$(d).find(".plg-modal_item-1");e.to(t,{y:"2rem",opacity:0,stagger:{each:.2}}),e.to(d,{opacity:0},"<"),e.set(d,{display:"none"})});document.addEventListener("keydown",function(e){m===!0&&e.keyCode===27&&$("#modalClose").click()});var y=()=>{m?(w=$(window).scrollTop(),$("html, body").scrollTop(0).addClass("overflow-hidden")):$("html, body").scrollTop(w).removeClass("overflow-hidden")};})();
