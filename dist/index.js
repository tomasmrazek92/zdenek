"use strict";(()=>{$(document).ready(function(){let i=!1,a;$(".navbar_menu-btn").on("click",function(){i?($("html, body").scrollTop(a).removeClass("overflow-hidden"),i=!1):(a=$(window).scrollTop(),$("html, body").scrollTop(0).addClass("overflow-hidden"),i=!0)}),$(".navbar_menu-overlay").on("click",function(){$(".navbar_menu-btn").trigger("click")});let s=".about-test_content";if($(s)){let t=new Swiper(s,{slidesPerView:1,spaceBetween:0,speed:250,effect:"fade",autoHeight:!0,fadeEffect:{crossFade:!0},loop:!0,observer:!0,navigation:{nextEl:".swiper-arrow.next",prevEl:".swiper-arrow.prev"},on:{slideChange:e=>{let n=e.realIndex,o=$(".about-test_visual-item"),r=$(".about-test_overlay");console.log(n),r.stop().animate({width:"102%"},500,function(){o.hide(),o.eq(n).show(),r.animate({width:"0%"})})}}})}let p=new SplitType(".button_label div",{types:"chars",tagName:"span"});function u(t,e){let n=$(t).find(".button_label div");if(n.length){let o=gsap.timeline();o.to(n.eq(0),{duration:e===!0?.7:1.4,yPercent:e===!0?-100:0}),o.to(n.eq(1).find(".char"),{yPercent:e===!0?-100:0,delay:.1,duration:e===!0?.7:1,stagger:{each:e===!0?.015:0},ease:Circ.easeOut},"<")}}$(".button").on("mouseenter mouseleave",function(t){u($(this),t.type==="mouseenter")});let l=$(".page-transition_trigger"),d=1600,c=800,f="no-transition";$("a").on("click",function(t){if($(".page-transition_mask").addClass($(this).is("[work-link]")?"bg-dark":"bg-default"),$(this).prop("hostname")===window.location.host&&$(this).attr("href").indexOf("#")===-1&&!$(this).hasClass(f)&&$(this).attr("target")!=="_blank"&&l.length>0){t.preventDefault();let e=$(this).attr("href");l.click(),setTimeout(function(){window.location=e},c)}}),window.onpageshow=function(t){t.persisted&&window.location.reload()},setTimeout(()=>{$(window).on("resize",function(){setTimeout(()=>{$(".page-transition").css("display","none")},50)})},d)});})();
