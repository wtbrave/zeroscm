/*
 * jqDnR - Minimalistic Drag'n'Resize for jQuery.
 *
 * Copyright (c) 2007 Brice Burgess <bhb@iceburg.net>, http://www.iceburg.net
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * $Version: 2007.08.19 +r2
 */

(function($){
$.fn.jqDrag=function(h){return i(this,h,'d');};
$.fn.jqResize=function(h){return i(this,h,'r');};
$.jqDnR={
	dnr:{},e:0,
	drag:function(v){
	var name=E.get(0).id;
	 if(M.k == 'd')
	 {
	 	E.css({left:M.X+v.pageX-M.pX,top:M.Y+v.pageY-M.pY});
	 }
	 else
	 {
	 	var d_height=v.pageY-M.pY+M.H;
		var d_width=(Math.max(v.pageX-M.pX+M.W,0));
		if(d_width<760 || d_height<360)
		{
			return false;
		}
		if(isIE6>0)
		{
			d_height = d_height-3;
		}
		setWindowHeight(name,d_height);
		setWindowWidth(name,d_width);
		$('#'+name+'_layer').height(d_height);
		$('#'+name+'_content').height(d_height);
		//$('#windowurl'+name).height(d_height-30);
		//$('#'+name+'_layer').width(d_width);
		//$('#'+name+'_content').width(d_width-12);
		//$('#windowurl'+name).width(d_width-12);
	 	E.css({width:Math.max(v.pageX-M.pX+M.W,0),height:Math.max(v.pageY-M.pY+M.H,0)});
	}
	$('#windowurl'+name).hide();
	$('#footer-tips').height(0);
	return false;
	},
	stop:function(){
		var name=E.get(0).id;
		$('#windowurl'+name).show();
		$('#footer-tips').height(65);
		E.css('opacity',M.o);$().unbind('mousemove',J.drag).unbind('mouseup',J.stop);
	}
};
var J=$.jqDnR,M=J.dnr,E=J.e,
i=function(e,h,k){
	return e.each(function(){
		 h=(h)?$(h,e):e;
		 h.bind('mousedown',{e:e,k:k},function(v){
		 	var d=v.data,p={};E=d.e;
			 // attempt utilization of dimensions plugin to fix IE issues
			 if(E.css('position') != 'relative'){
			 	try{E.position(p);}catch(e){}
			 }
			 M={
			 	X:p.left||f('left')||0,
			 	Y:p.top||f('top')||0,
			 	W:f('width')||E[0].scrollWidth||0,
			 	H:f('height')||E[0].scrollHeight||0,
			 	pX:v.pageX,
			 	pY:v.pageY,
			 	k:d.k,
			 	o:E.css('opacity')
			 };
			E.css({opacity:1});
			$().mousemove($.jqDnR.drag).mouseup($.jqDnR.stop);
			return false;
		 });
	});
},
f=function(k){
	return parseInt(E.css(k))||false;
	};
})(jQuery);