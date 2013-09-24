/* Hierarchy and Order */
jQuery.fn.layered=function(o) {
 o=jQuery.extend({background:false, position:false, distance:1, startScrollY:0, endScrollY:Infinity, startScrollX:0, endScrollX:Infinity}, o);
 if(jQuery.type(jQuery(window).data('hierarchyAndOrder'))=="array") {
   k=jQuery(window).data('hierarchyAndOrder');
   k.push({what:jQuery(this), o:o});
   jQuery(window).data('hierarchyAndOrder', k);
 } else {
  jQuery(window).data('hierarchyAndOrder', [{what:jQuery(this), o:o}]);
  jQuery(window).scroll(function(e) {
   jQuery.each(jQuery(window).data('hierarchyAndOrder'), function() {
    t={};
	cs={};
    if(this.o.position==true) {
     if(this.o.endScrollY>=jQuery(window).scrollTop() && jQuery(window).scrollTop()>=this.o.startScrollY) {
	  cs=jQuery.extend(cs, {top: Length.toPx(jQuery(this.what)[0], jQuery(this.what).data('hierarchyAndOrder').position.top)+(-jQuery(window).scrollTop()+this.o.startScrollY)*Math.pow(this.o.distance, (-1))});
	 }
	 if(this.o.endScrollX>=jQuery(window).scrollLeft() && jQuery(window).scrollLeft()>=this.o.startScrollX) {
	  cs=jQuery.extend(cs, {left: Length.toPx(jQuery(this.what)[0], jQuery(this.what).data('hierarchyAndOrder').position.left)+(-jQuery(window).scrollLeft()+this.o.startScrollX)*Math.pow(this.o.distance, (-1))});
	 }
	}
	if(this.o.background==true) {
	 x=false;
	 y=false;
	 if(this.o.endScrollY>=jQuery(window).scrollTop() && jQuery(window).scrollTop()>=this.o.startScrollY) {
	  y=(0-jQuery(window).scrollTop()+this.o.startScrollY);
	 }
	 if(this.o.endScrollX>=jQuery(window).scrollLeft() && jQuery(window).scrollTop()>=this.o.startScrollX) {
	  x=(0-jQuery(window).scrollLeft()+this.o.startScrollX);
	 }
	 bp=jQuery(this.what).data('hierarchyAndOrder').backgroundPosition;
	 cX=bp.xI+bp.xU;
	 cY=bp.yI+bp.yU;
	 if(x!=false) {
	  xF=0;
	  switch(jQuery.type(bp.xU)) {
	   case "string":
	    // Absolute or absolutely relative positions
	    switch(bp.xU) {
		 case "%":
		  xF=jQuery(this.what).outerWidth()*parseFloat(bp.xI)*.01;
		 break;
		 case "":
		 break;
		 default:
		  xF=Length.toPx(jQuery(this.what)[0], bp.xI+bp.xU);
		 break;
	    }
	   break;
	  }
	  cX=(xF+x*Math.pow(this.o.distance, (-1)))+"px";
	 }
	 if(y!=false) {
	  yF=0;
	  switch(jQuery.type(bp.xU)) {
	   case "string":
	    // Absolute or absolutely relative positions
	    switch(bp.yU) {
		 case "%":
		  yF=jQuery(this.what).outerHeight()*parseFloat(bp.yI)*.01;
		 break;
		 case "":
		 break;
		 default:
		  yF=Length.toPx(jQuery(this.what)[0], bp.yI+bp.yU);
		 break;
	    }
	   break;
	  }
	  cY=(yF+y*Math.pow(this.o.distance, (-1)))+"px";
	 }
	 cs=jQuery.extend(cs, {"background-position": cX+" "+cY});
	}
	jQuery(this.what).css(cs).animate(t, {queue:false, duration:2, easing:'linear'});
   });
  });
 }
 jQuery(this).data('hierarchyAndOrder', {
  position:{
   top:jQuery(this).css('top'), 
   left:jQuery(this).css('left'), 
   right:jQuery(this).css('right'), 
   bottom:jQuery(this).css('bottom')
  },
  backgroundPosition:{
   full:/(\d+|left|center|right)(.*) (\d+|top|center|bottom)(.*)/.exec(jQuery(this).css('background-position'))[0], 
   xI:/(\d+|left|center|right)(.*) (\d+|top|center|bottom)(.*)/.exec(jQuery(this).css('background-position'))[1], 
   xU:/(\d+|left|center|right)(.*) (\d+|top|center|bottom)(.*)/.exec(jQuery(this).css('background-position'))[2], 
   yI:/(\d+|left|center|right)(.*) (\d+|top|center|bottom)(.*)/.exec(jQuery(this).css('background-position'))[3], 
   yU:/(\d+|left|center|right)(.*) (\d+|top|center|bottom)(.*)/.exec(jQuery(this).css('background-position'))[4]
  }
 });
 jQuery(window).trigger('scroll');
 return jQuery(this);
}
