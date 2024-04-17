/*获取url内容，并在页面配置div上显示*/
function geturlcontent(purl){
	if(purl.search(/\?/)!=-1)
	{
		purl+='&inajax=1';
	}
	else
	{
		purl+='?inajax=1';
	}
        $.ajax({
         	url: purl,
         	type: 'POST',
         	dataType: 'html',
         	timeout: 61000,
         	error: function(){
         		alert('Please check web status');
         	},
         	success: function(data){
         		showHandleWindow(data);
         	}
         });
}
/*显示弹出的div窗口*/
function showHandleWindow(data){
	$("#page_mask").height($(document).height());
	$("#page_mask").width('100%');
	$('#page_mask').show();
	
	$('#portlet_config_content').html(data);
	//$(data).appendTo('#portlet_config_content');
	$('#portlet_config').css('width','600px');
	$('#portlet_config').css('left',($(window).width() - $('#portlet_config').width())/2);
	$('#portlet_config').css('top',$(document).scrollTop()+($(window).height()- $('#portlet_config').height())/2);
	$('#portlet_config').show();
	$("input[type='reset']").click(function(){
		$('#page_mask').hide();
		$('#portlet_config').hide();
	});
}
/*隐藏弹出的div窗口*/
function hideHandleWindow(){
	$('#page_mask').hide();
	$('#portlet_config').hide();
	
}

function editlist_portlet(pid){
	var purl='/portletmanage.php?action=editlist&id='+pid;
	geturlcontent(purl);
}
function editcontent_portlet(pid){
	var purl='/portletmanage.php?action=editcontent&id='+pid;
	geturlcontent(purl);
}
function container_cssedit()
{
	var purl='/portletmanage.php?action=containercss';
	geturlcontent(purl);
}
function defaultdata_setting()
{
	var purl='/portletmanage.php?action=setting';
	geturlcontent(purl);
}

function container_delete()
{
	$(current_container).remove();
	$('.subcolumns').each(function(){
		if($(this).html()=='')
		{
			$(this).remove();
		}
	});	
}
function tpledit_portlet(pid)
{
	var purl='/portletmanage.php?action=tpledit&id='+pid;
	geturlcontent(purl);
}
function cssedit_portlet(pid){ 
	var purl='/portletmanage.php?action=cssedit&id='+pid;
	geturlcontent(purl);
}

function ajaxsubmitportlet(form,purl,css){
	var postdata='';
	var pid=0;
	for(var i=0;i<form.length;i++)
	{
		postdata+=form[i].name+'='+encodeURIComponent(form[i].value)+'&';
		if(form[i].name=='id')
		{
			pid=form[i].value;
		}
	}
	//alert(postdata);
	$.post(purl,postdata,
		function (data){
			if(pid>0)
			{
				refresh_portlet(pid);	
			}
			else
			{
				top.location.reload();	
			}
		// data 可以是 xmlDoc, jsonObj, html, text, 等等.
		//$('#portlet_content_'+pid).html(data);
		//alert(data);
		//if(css)
		//{
		//	var csstxt=$('#portlet_'+pid).get(0).style.cssText;
		//	$('#portlet_'+pid).get(0).style.cssText=csstxt+';'+data;
		//	//$('#portlet_'+pid).css({"width":"400px","height":"400px"});
		//}
		
		}, "XML");
	return false;
}
function refresh_portlet(pid){
	var purl='';
	
	// 由于firefox没有outhtml熟悉，ie下，重新设置内容后<!-- -->注释的内容取不到了，造成保存失败，此两部分只刷新portlet内部
	// ($.browser.msie && $.browser.version < "7.0")
	if($.browser.mozilla || $.browser.msie)
	{
		purl='/portletmanage.php?action=refresh&getinner=1&id='+pid;
	}
	else
	{
		purl='/portletmanage.php?action=refresh&id='+pid;	
	}
        $.ajax({
         	url: purl,
         	type: 'POST',
         	dataType: 'html',
         	timeout: 61000,
         	error: function(){
         	alert('Please check web status');
         	},
         	success: function(data){
         		if($.browser.mozilla || $.browser.msie)
         		{
         			$('[id=portlet_title_content_'+pid+']').each(function(){
	         			this.innerHTML=data;
	         		});
         		}
         		else
         		{
	         		$('[id=portlet_'+pid+']').each(function(){
	         			//this.innerHTML=data;
	         			//alert(this.outerHTML);
	         			$(this).attr('outerHTML',data);
	         			//this.innerHTML=data;
	         			//alert(this.outerHTML);
	         			
	         		});
	         	}
			refreshDragContainer(current_container);
			portletInitial();
			hideHandleWindow();
         	}
         });
}
function hideShow_portlet(pid)
{
	if($('#portlet_content_'+pid).css('display')=="none")
	{
		$('#portlet_content_'+pid).show();
		$('#hideportlet_'+pid).attr('src','/images/portlet/16x16/hide.gif');
		$('#hideportlet_'+pid).attr('title','隐藏');
	}
	else
	{
		$('#portlet_content_'+pid).hide();
		$('#hideportlet_'+pid).attr('src','/images/portlet/16x16/show.gif');
		$('#hideportlet_'+pid).attr('title','显示');
	}
}
function newListPortlet(){ 
	if(!current_container){
		current_container=document.getElementById('body_right');
	}
	var purl='/portletmanage.php?action=newlist';
        $.ajax({
         	url: purl,
         	type: 'POST',
         	dataType: 'html',
         	timeout: 61000,
         	error: function(){
         	alert('Please check web status');
         	},
         	success: function(data){ 
         		insertNewToContainer(data);
         	}
         });
}
function newContentPortlet(){
	if(!current_container){
		current_container=document.getElementById('body_right');
	}
	var purl='/portletmanage.php?action=newcontent';
        $.ajax({
         	url: purl,
         	type: 'POST',
         	dataType: 'html',
         	timeout: 61000,
         	error: function(){
         	alert('Please check web status');
         	},
         	success: function(data){ 
         		insertNewContent(data);
         	}
         });
}
function insertPortlet(id){ 
	if(!current_container){
		current_container=document.getElementById('body_right');
	}
	if(typeof($("#portlet_"+id).get(0))!='undefined' && !confirm("此内容在页面上已存在，确认要重复插入？"))
	{
		//对象存在，且确认不重复插入;
		return false;
	}
	var purl='/portletmanage.php?action=insert&id='+id;
        $.ajax({
         	url: purl,
         	type: 'POST',
         	dataType: 'html',
         	timeout: 61000,
         	error: function(){
         	alert('Please check web status');
         	},
         	success: function(data){ 
         		insertintocontainer(data);
         		hideHandleWindow();
         	}
         });	         	
	
}
function delete_portlet(id)
{
	var purl='/portletmanage.php?action=delete&id='+id;
        $.ajax({
         	url: purl,
         	type: 'POST',
         	dataType: 'html',
         	timeout: 61000,
         	error: function(){
         	alert('Please check web status');
         	},
         	success: function(data){
         		geturlcontent('portletmanage.php?classid=1');
         		if($('#portlet_'+id))
         			$('#portlet_'+id).remove();
         	}
         });
}
function insertintocontainer(data){
	var insertp=$(data);
	insertp.appendTo(current_container);
	$("#page_mask").height($(document).height());
	//var html=$(current_container).html();
	//$(current_container).html(html+data);
	//$("#page_mask").height($(document).height());	
	refreshDragContainer(current_container);
	portletInitial(insertp);
}
function insertNewToContainer(data){
	insertintocontainer(data);
	
	var insertp=$(data);
	var newid=insertp.get(0).id;
	var spid=newid.split('_');
	editlist_portlet(spid[1]);
}
function insertNewContent(data){
	insertintocontainer(data);
	
	var insertp=$(data);
	var newid=insertp.get(0).id;
	var spid=newid.split('_');
	editcontent_portlet(spid[1]);
}


function containerMouseOver()
{
	$('[insertcontainer=true]').mouseover(function(){
		$(this).css('border','1px solid #F00');
		$(this).css('background','#EFA');
		//alert(1);
		current_container=this;
		$('[insertcontainer=true]').each(function(){
			if(this!=current_container)
			{
				$(this).css('border','1px solid #CDE');
				$(this).css('background','#fff');
			}
		})
		var topleft=$(this).offset();//与页面左上角的距离
		//document.getElementById("container_toolbar").style.display='';
		//$("#container_toolbar").css("top",topleft.top-10);  
		//$("#container_toolbar").css("left",topleft.left+$(this).width()-$("#container_toolbar").width()); 
		return false;
	});
}

function preg_replace(search, replace, str) {
	var len = search.length;
	for(var i = 0; i < len; i++) {
		re = new RegExp(search[i], "ig");
		str = str.replace(re, typeof replace == 'string' ? replace : (replace[i] ? replace[i] : replace[0]));
	}
	return str;
}
function savetemplate(){
	$('.containertoolbar').remove();
	var html=$('.bodydiv').html();
	//alert(html);
	html = html.replace(/<!--portletstart-->((<[^!])*[^<]+)+<!--portletend-->/gi, "") ;//替换调<!--portletstart--><!--portletend-->之间的内容
	var obj=$(html);
	//alert(html);
	var purl='/portletmanage.php?action=savetemplate';
	        $.ajax({
	         	url: purl,
	         	type: 'POST',
	         	dataType: 'html',
	         	data: {'bodyhtml':html,'request_url':currentRequest_uri},
	         	timeout: 61000,
	         	error: function(){
	         		alert('Please check web status');
	         	},
	         	success: function(data){ 
	         		prependtootbar();
	         		alert(data);
	         	}
         	});
}

function showTplInPage(name)
{
	$("[tpltag='instance_"+name+"']").each(function(){
		$(this).css('border','2px DASHED #F00');
		//$(this).css('padding','3')
		//$(this).css('border-top','2px solid red');
		//this.style.zIndex=200;
		//$(this).css('zIndex','200');
	});
}

function  portletInitial(portletobj)
{
	// 当带参数时，只初始化参数对象的portlet；没有参数时，初始化所有portlet
	if(portletobj)
	{
		if($(".portlettitle",portletobj).css('display')=="none")
		{
			$(this).mouseover(function() {
				if(iMouseDown)
				{
					return ; /***正在拖动时，不进行操作**/
				}
				$(".portlettitle",this).show();
			});
			$(this).mouseout(function(e) {
				var obj=$(this).offset();
				if((e.pageY <= obj.top || e.pageY >=obj.top+$(this).height())||(e.pageX <= obj.left || e.pageX >= obj.left + $(this).width()))
				{
					$(".portlettitle",this).hide();
				}
			});
		}
		$(".portlettitle",portletobj).css('cursor','move').mousedown(function(){
			titleMouseDown();
		});
		// 广告iframe的高度自适应
		//
		//$(".adserverarea",this).each(function(){
		//	//alert($(this).contents().find("body").html());
		//	{
		//		//获取iframe的高度   
		//		var height = $(this).contents().find("body").height();
		//		alert(height);
		//		$(this).height(height);
		//	}
		//});
		var quickoprateInTitle=$(".portlettitle .quickoprate",portletobj).size();
		$(portletobj).mouseover(function() {
			if(iMouseDown)
			{
				return ; /***正在拖动时，不进行操作**/
			}
			$(".quickoprate",this).show();
			$(".quickopratemask",this).show();
			if(quickoprateInTitle==0)
			{
				$(".quickoprate",this).css({'z-index':'100','width':$(this).width(),'left':'0','top':25});
			}
			
			$(".quickopratemask",this).css({'width':$(this).width(),'left':'0','top':25,height:$(this).height()-25});//$(this).height()-25
			//alert($('.portlet_title_content',this).css('z-index'))
			$(this).css({'z-index':'10','height':'auto'});
			$('.portlet_title_content',this).css('z-index','10');
		});
		
		$(portletobj).mouseout(function(e) {
			var obj=$(this).offset();
			if((e.pageY <= obj.top || e.pageY >=obj.top+$(this).height())||(e.pageX <= obj.left || e.pageX >= obj.left + $(this).width()))
			{
				$(".quickoprate",this).hide();
				$(".quickopratemask",this).hide();
				$(".quickoprate",this).css({'z-index':'1'});
				$(this).css('z-index','0');
				$('.portlet_title_content',this).css('z-index','0');
			}
		});
	}
	else
	{
		$(".portlet").each(function(){
			if($(".portlettitle",this).css('display')=="none")
			{
				$(this).mouseover(function() {
					if(iMouseDown)
					{
						return ; /***正在拖动时，不进行操作**/
					}
					$(".portlettitle",this).show();
				});
				$(this).mouseout(function(e) {
					var obj=$(this).offset();
					if((e.pageY <= obj.top || e.pageY >=obj.top+$(this).height())||(e.pageX <= obj.left || e.pageX >= obj.left + $(this).width()))
					{
						$(".portlettitle",this).hide();
					}
				});
			}
			$(".portlettitle",this).css('cursor','move').mousedown(function(){
				titleMouseDown();
				
			});
			// 广告iframe的高度自适应
			//
			//$(".adserverarea",this).each(function(){
			//	//alert($(this).contents().find("body").html());
			//	{
			//		//获取iframe的高度   
			//		var height = $(this).contents().find("body").height();
			//		alert(height);
			//		$(this).height(height);
			//	}
			//});
			
			var quickoprateInTitle=$(".portlettitle .quickoprate",this).size();
			$(this).mouseover(function() {
				if(iMouseDown)
				{
					return ; /***正在拖动时，不进行操作**/
				}
				$(".quickoprate",this).show();
				$(".quickopratemask",this).show();
				if(quickoprateInTitle==0)
				{
					$(".quickoprate",this).css({'z-index':'100','width':$(this).width(),'left':'0','top':25});
				}
				
				$(".quickopratemask",this).css({'width':$(this).width(),'left':'0','top':25,height:$(this).height()-25});//$(this).height()-25
				//alert($('.portlet_title_content',this).css('z-index'))
				$(this).css({'z-index':'10','height':'auto'});
				$('.portlet_title_content',this).css('z-index','10');
			});
			
			$(this).mouseout(function(e) {
				var obj=$(this).offset();
				if((e.pageY <= obj.top || e.pageY >=obj.top+$(this).height())||(e.pageX <= obj.left || e.pageX >= obj.left + $(this).width()))
				{
					$(".quickoprate",this).hide();
					$(".quickopratemask",this).hide();
					$(".quickoprate",this).css({'z-index':'1'});
					$(this).css('z-index','0');
					$('.portlet_title_content',this).css('z-index','0');
				}
			});
		});
	}
	
}
// 动态加载css样式 兼容 IE，firefox，opera
function AttachStyle(styDom, styCss, styId){    
    var istyle = styDom.createElement('style');    
    istyle.setAttribute("type", "text/css");    
    if(styId!=null){if(!document.getElementById(styId)){istyle.setAttribute("id", styId);}}    
    if (istyle.styleSheet){    
        istyle.styleSheet.cssText=styCss;    
    }else{    
        istyle.appendChild(styDom.createTextNode(styCss));    
    }
    styDom.getElementsByTagName("head")[0].appendChild(istyle);
    //alert($('head').html());
} 
  
function setbodylayout(str)
{
	var type=new Array();
	var type= str.split('_');
	if(type.length ==2)
	{
		type[0]=type[0]-0.5;
		type[1]=type[1]-0.5;
	}
	if(type.length ==3)
	{
		type[0]=type[0]-0.33;
		type[1]=type[1]-0.33;
		type[2]=type[2]-0.33;
	}
	
	if(type.length >=2)
	{
		var csshtml='';
		if(type.length==2)
		{
			csshtml+='#col1 { float: left; width: '+type[0]+'%;  margin: 0 0 0 -2px; } '+
			'#col2 { display:none;} #col3 { float: right; width: '+type[1]+'%; margin-left: -1px; margin-right: 0; }';
		}
		else
		{
			csshtml+='#col1 { float: left; width: '+type[0]+'%;  margin: 0 1px 0 -2px; } '+
			'#col2 { display:block;float: left; width: '+type[1]+'%;  margin: 0 -5px 0 3px; } '+
			'#col3 { float: right; width: '+type[2]+'%; margin-left: -1px; margin-right: 0; }';
		}
		if(!$.browser.msie) 
		{
			AttachStyle(document,csshtml,'attach-col-css');
		}
		var bodysource=$('#bodycontentContainer').html();
		if($('#appendcss').size()>0)
		{
			$('#appendcss').html('<style>'+csshtml+'</style>');
		}
		else
		{
			$('#bodycontentContainer').html('<div id="appendcss"><style>'+csshtml+'</style></div>'+bodysource);
		}
	}
	
	$('[insertcontainer="true"]').each(function(){
		$(this).addClass("DragContainer");	
	});
	$('#portlet_config').hide();
	$('#page_mask').hide();
	portletInitial();
	containerMouseOver();
}
