"use strict";(()=>{$(document).ready(function(){$(".about-find_item").each(function(){var i=$(this).find(".about-find_img-gallery"),t=i.children(),e=0,n;function a(){t.hide(),t.eq(e).show(),e=(e+1)%t.length,n=setTimeout(a,500)}function o(){n||a()}function s(){clearTimeout(n),n=void 0}$(this).hover(o,s),$(this).is(":hover")&&o()});let r=".about-exp_item",l=".about-exp_card";$(r).hover(function(){let i=$(this).find(l);console.log("card"),$(this).addClass("active"),i.css({visibility:"visible"});let t=10;var e=i[0].getBoundingClientRect(),n=e.left>=t&&e.right<=(window.innerWidth||document.documentElement.clientWidth)-t;n||i.addClass("right")},function(){$(r).removeClass("active"),$(l).removeClass("right"),$(l).attr("style","")}),gsap.registerPlugin(ScrollTrigger),ScrollTrigger.matchMedia({"(max-width: 991px)":function(){let i=$(".about-exp_item"),t=$(".all_list-accordion-line._2"),e=$(".about-exp_badge").height()+8;console.log($(".about-exp_badge").height()),gsap.set(i,{height:e}),gsap.set(t,{rotation:90}),i.on("click",function(){$(window).width()<=991&&gsap.timeline().add(n($(this))).add(a(i.not($(this))),"<")});function n(o){return gsap.timeline().to(o,{height:"auto"}).to($(o).find(t),{rotation:0},"<")}function a(o){return gsap.timeline().to(o,{height:e}).to($(o).find(t),{rotation:90},"<")}}})});})();
