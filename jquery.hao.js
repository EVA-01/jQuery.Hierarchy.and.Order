/* Hierarchy and Order */
jQuery.fn.layered=function(o) {
	var o=jQuery.extend({background:false, position:false, distance:1, startScrollY:0, endScrollY:Infinity, startScrollX:0, endScrollX:Infinity}, o);
	if(jQuery.type(jQuery['layeredData'])=="array") {
		jQuery['layeredData'].push({what:jQuery(this), o:o});
	} else {
		jQuery['layeredData']=[{what:jQuery(this), o:o}];
		jQuery(window).scroll(function(e) {
			jQuery.each(jQuery['layeredData'], function() {
				if(jQuery(this.what.is(":visible"))) {
					var t={};
					var cs={};
					if(this.o.position==true) {
						if(this.o.endScrollY>=jQuery(window).scrollTop() && jQuery(window).scrollTop()>=this.o.startScrollY) {
							cs=jQuery.extend(cs, {top: jQuery(this.what).data('hierarchyAndOrder').position.top+(-jQuery(window).scrollTop()+this.o.startScrollY)*Math.pow(this.o.distance, (-1))});
						}
						if(this.o.endScrollX>=jQuery(window).scrollLeft() && jQuery(window).scrollLeft()>=this.o.startScrollX) {
							cs=jQuery.extend(cs, {left: jQuery(this.what).data('hierarchyAndOrder').position.left+(-jQuery(window).scrollLeft()+this.o.startScrollX)*Math.pow(this.o.distance, (-1))});
						}
					}
					if(this.o.background==true && this.what.css("background-image")!=undefined) {
						var x=false;
						var y=false;
						if(this.o.endScrollY>=jQuery(window).scrollTop() && jQuery(window).scrollTop()>=this.o.startScrollY) {
							y=(0-jQuery(window).scrollTop()+this.o.startScrollY);
						}
						if(this.o.endScrollX>=jQuery(window).scrollLeft() && jQuery(window).scrollTop()>=this.o.startScrollX) {
							x=(0-jQuery(window).scrollLeft()+this.o.startScrollX);
						}
						var bp=jQuery(this.what).data('hierarchyAndOrder').backgroundPosition;
						var cX=bp.xI+bp.xU;
						var cY=bp.yI+bp.yU;
						if(x!=false) {
							var xF=0;
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
											xF=bp.xC;
										break;
									}
								break;
							}
							cX=(xF+x*Math.pow(this.o.distance, (-1)))+"px";
						}
						if(y!=false) {
							var yF=0;
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
											yF=bp.yC;
										break;
									}
								break;
							}
							cY=(yF+y*Math.pow(this.o.distance, (-1)))+"px";
						}
						cs=jQuery.extend(cs, {"background-position": cX+" "+cY});
					}
					jQuery(this.what).css(cs).animate(t, {queue:false, duration:2, easing:'linear'});
				}
			});
		});
	}
	jQuery(this).data('hierarchyAndOrder', {
		position:{
			top:Length.toPx(jQuery(this)[0], jQuery(this).css('top')), 
			left:Length.toPx(jQuery(this)[0], jQuery(this).css('left')), 
			right:jQuery(this).css('right'), 
			bottom:jQuery(this).css('bottom')
		},
		backgroundPosition:{
			full:/(\d+|left|center|right)(.*) (\d+|top|center|bottom)(.*)/.exec(jQuery(this).css('background-position'))[0], 
			xI:/(\d+|left|center|right)(.*) (\d+|top|center|bottom)(.*)/.exec(jQuery(this).css('background-position'))[1], 
			xU:/(\d+|left|center|right)(.*) (\d+|top|center|bottom)(.*)/.exec(jQuery(this).css('background-position'))[2], 
			yI:/(\d+|left|center|right)(.*) (\d+|top|center|bottom)(.*)/.exec(jQuery(this).css('background-position'))[3], 
			yU:/(\d+|left|center|right)(.*) (\d+|top|center|bottom)(.*)/.exec(jQuery(this).css('background-position'))[4],
			xC:Length.toPx(jQuery(this)[0], /(\d+|left|center|right)(.*) (\d+|top|center|bottom)(.*)/.exec(jQuery(this).css('background-position'))[1]+/(\d+|left|center|right)(.*) (\d+|top|center|bottom)(.*)/.exec(jQuery(this).css('background-position'))[2]),
			yC:Length.toPx(jQuery(this)[0], /(\d+|left|center|right)(.*) (\d+|top|center|bottom)(.*)/.exec(jQuery(this).css('background-position'))[3]+/(\d+|left|center|right)(.*) (\d+|top|center|bottom)(.*)/.exec(jQuery(this).css('background-position'))[4])
		}
	});
	jQuery(window).trigger('scroll');
	return jQuery(this);
}