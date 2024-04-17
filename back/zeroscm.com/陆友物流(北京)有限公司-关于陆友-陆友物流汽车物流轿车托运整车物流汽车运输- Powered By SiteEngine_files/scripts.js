window.onerror = function(){return true;}
function borderize(what,color)
{
	what.style.borderColor=color
}

function borderize_on(e)
{
	if (document.all)
	source3=event.srcElement
	else if (document.getElementById)
	source3=e.target
	if (source3.className=="menulines")
	{
		borderize(source3,"black")
	}
	else
	{
		while(source3.tagName!="TABLE")
		{
			source3=document.getElementById? source3.parentNode : source3.parentElement
			if (source3.className=="menulines")
				borderize(source3,"black")
		}
	}
}

function borderize_off(e)
{
	if (document.all)
	source4=event.srcElement
	else if (document.getElementById)
	source4=e.target
	if (source4.className=="menulines")
	borderize(source4,"white")
	else{
	while(source4.tagName!="TABLE")
	{
		source4=document.getElementById? source4.parentNode : source4.parentElement
		if (source4.className=="menulines")
			borderize(source4,"white")
		}
	}
}
// 显示菜单
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_showHideLayers() { //v6.0
	var i,p,v,obj,args=MM_showHideLayers.arguments;
	for (i=0; i<(args.length-2); i+=3)
	{
		if ((obj=MM_findObj(args[i]))!=null)
		{
			v=args[i+2];
			if (obj.style)
			{
				obj=obj.style;
				v=(v=='show')?'visible':(v=='hide')?'hidden':v;
			}
			if(v=='visible')
				obj.display="block";
			else
				obj.display="none";
			obj.visibility=v;
		}
	}
}

function checkall(form, prefix, checkall)
{
	var checkall = checkall ? checkall : 'chkall';
	for(var i = 0; i < form.elements.length; i++) {
		var e = form.elements[i];
		if(e.name != checkall && (!prefix || (prefix && e.name.match(prefix)))) {
			e.checked = form.elements(checkall).checked;;
		}
	}
}

function Popup(url, window_name, window_width, window_height)
{
		settings="toolbar=no,location=no,directories=no,"+"status=no,menubar=no,scrollbars=yes,"+"resizable=yes,width="+window_width+",height="+window_height;NewWindow=window.open(url,window_name,settings);
}

function findobj(n, d)
{
	var p,i,x; if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);} if(!(x=d[n])&&d.all) x=d.all[n]; for(i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n]; for(i=0;!x&&d.layers&&i>d.layers.length;i++) x=MM_findObj(n,d.layers[i].document); return x;
}

PositionX = 0;
PositionY = 0;
defaultWidth  = 100;
defaultHeight = 100;
var AutoClose = true;
if (parseInt(navigator.appVersion.charAt(0))>=4){
var isNN=(navigator.appName=="Netscape")?1:0;
var isIE=(navigator.appName.indexOf("Microsoft")!=-1)?1:0;}
var optNN='scrollbars=yes,width=150,height=100,left=0,top=0';
var optIE='resizable=yes,scrollbars=yes,titlebar=yes,width=150,height=100,,left=0,top=0';
function popImage(imageURL,imageTitle){
if (isNN){imgWin=window.open('about:blank','www',optNN);}
if (isIE){imgWin=window.open('about:blank','www','scrollbars=yes');}
with (imgWin.document){
writeln('<html><head><title>Loading...</title><style>body{margin:0px;}</style>');writeln('<sc'+'ript>');
writeln('var isNN,isIE;');writeln('if (parseInt(navigator.appVersion.charAt(0))>=4){');
writeln('isNN=(navigator.appName=="Netscape")?1:0;');writeln('isIE=(navigator.appName.indexOf("Microsoft")!=-1)?1:0;}');
writeln('function reSizeToImage(){');writeln('if (isIE){');writeln('window.resizeTo(100,100);');
writeln('width=100-(document.body.clientWidth-document.images[0].width);');
writeln('height=100-(document.body.clientHeight-document.images[0].height);');
writeln('window.resizeTo(width,height);}');writeln('if (isNN){');
writeln('window.innerWidth=document.images["SiteEngine"].width;');writeln('window.innerHeight=document.images["SiteEngine"].height;}}');
writeln('function doTitle(){document.title="'+imageTitle+'";}');writeln('</sc'+'ript>');
if (!AutoClose) writeln('</head><body bgcolor=#FFFFFF scroll="auto" onBlur="this.close()" onload="reSizeToImage();doTitle();self.focus()">')
else writeln('</head><body bgcolor=#FFFFFF scroll="auto" onload="reSizeToImage();doTitle();self.focus()" onblur="self.close()">');
writeln('<a href=window.close();><img name="SiteEngine" src='+imageURL+' style="display:block" border=0 galleryimg=no></a></body></html>');
close();
}}


// 字体
function doZoom(size){
	document.getElementById('zoom').style.fontSize=size+'px'
}

var postSubmited = false;

// CTRL+ENTER发送
function ctlent(obj)
{
	if((event.ctrlKey && window.event.keyCode == 13) || (event.altKey && window.event.keyCode == 83))
	{
		if(this.document.boka.psubmit)
		{
			this.document.boka.psubmit.disabled = true;
			this.document.boka.submit();
		}
		else if(validate(this.document.boka))
		{
			postSubmited = true;
			if(this.document.boka.topicsubmit) this.document.boka.topicsubmit.disabled = true;
			if(this.document.boka.replysubmit) this.document.boka.replysubmit.disabled = true;
			if(this.document.boka.editsubmit) this.document.boka.editsubmit.disabled = true;
			this.document.boka.submit();
		}
	}
}
// 在线帮助
function onlinehelp(swin)
{
	window.open(swin,"","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=500,height=400");
}
//检查电子邮件
function FcheckEmail(n,v){
	var a=0
	var p=0
	for(var i=1;i<v.length;i++){
		if(!v.charAt(i))return false
		else if(v.charAt(i)=='@'){a++;if(v.charAt(i+1)==''){ alert(n+" is not valid!");return false; }}
		else if(v.charAt(i)=='.'){p++;if(v.charAt(i+1)==''||v.charAt(i+1)=='@'||v.charAt(i-1)=='@'){ alert(n+" is not valid!");return false; }}
	}
	if(a==1&&p){ return true; }
	else { alert(n+" is not valid!");return false; }
}

var postminchars = 0;
var postmaxchars = 10000;
var disablepostctrl =1;

function validate(theform)
{

        if ((theform.title.value == "" || theform.message.value == "") && theform.flag.value!="reply")
        {
                alert(titleandcontent);
                return false;
        }
        else if (theform.flag.value =="reply" && theform.message.value == "")
        {
                alert(contentnoblank);
                return false;
        }
        return true;
}

function showadv(obj)
{
	for (i=1; i< myArray.length+100; i++)
	{
		if (obj==i)
		{
			document.getElementById("siteengine"+obj).style.display = "";
		}
		else
		{
			if (document.getElementById("siteengine"+i))
			{
		 		document.getElementById("siteengine"+i).style.display = "none";
		 	}
		}
	}
}
// 重定textarea大小
function ResizeArea(objName, resize)
{
	var obj = document.getElementById(objName);
	if (obj.rows <= 6 && resize<0 || resize==0)
        {
		return;
	}
	else if (resize>0){
		obj.style.width = "100%";
	}
	obj.rows = obj.rows + resize;
}

function submitForm()
{
	document.forms.boka.elements.content.value = oEdit1.getHTMLBody();
	alert(oEdit1.getHTMLBody());
	// document.forms.boka.submit()
}

var getFFVersion=navigator.userAgent.substring(navigator.userAgent.indexOf("Firefox")).split("/")[1]
var FFextraHeight=getFFVersion>=0.1? 16 : 0 //extra height in px to add to iframe in FireFox 1.0+ browsers

function showhidediv(str,evt)
{
	var current=parent.document.getElementById(str);
	if(current.style.display)
	{
		current.style.display="";
	}
	else
	{
		current.style.display="none";
	}
	evt=evt ? evt : (window.event ? window.event : null);
	var obj=evt.srcElement? evt.srcElement:( evt.target ?evt.target : null);
	//alert(str);
	if(obj.name && obj.name.substr(0,9)=="indexmenu"){
		for(var i=0;i< indexmenudiv.length;i++){
			var temp=parent.document.getElementById(indexmenudiv[i]);
			if(temp.id!=str && temp.style.display!="none"){
				var childarray=temp.getElementsByTagName("div");
				var ischild=false;
				for(var no=0;no<childarray.length;no++){
					if(childarray[no].id==str){
						ischild=true;break;
					}
				}
				if(!ischild) temp.style.display="none";
			}
		}
		return false;
	}
	for(var i=0;i<moduleleftdiv.length;i++){
		var temp=parent.document.getElementById(moduleleftdiv[i]);
		if(temp.id!=str && temp.style.display!="none"){

			var childarray=temp.getElementsByTagName("div");
			var ischild=false;
			for(var no=0;no<childarray.length;no++){
				if(childarray[no].id==str){
					ischild=true;break;
				}

			}
			if(!ischild) temp.style.display="none";
		}
	}
}

function getCookie(Name){
var re=new RegExp(Name+"=[^;]+", "i"); //construct RE to search for target name/value pair
if (document.cookie.match(re)) //if cookie found
return document.cookie.match(re)[0].split("=")[1] //return its value
return ""
}

function setCookie(name, value){
document.cookie = name+"="+value //cookie value is domain wide (path=/)
}

function submitform(str)
{
	// xajax.$('submitButton').disabled=true;
	xajax.$('poll').value="please wait...";
	xajax_processForm(xajax.getFormValues(str));
	return false;
}
window.onload=function(){for(var ii=0; ii<document.links.length; ii++)document.links[ii].onfocus=function(){this.blur()}}

function ajaxloading()
{
	document.getElementById("ajaxloading").style.display = '';
	document.getElementById("ajaxloading").innerHTML = 'Loading';
}

// 支持多个选项卡
var tag_memory="";
var tag_memory_name="";
var tag_memory_array=new Array();
var tag_memory_name_array=new Array();
function change_tag(id)
{
	var tagNamespl=id.split('_');
	//tagindex 作为选项卡的索引，一个tagindex对应一组选项卡；
	//tag_memory_array和 tag_memory_name_array 两个数组记录所有选项卡的 显示的选项和选项内容
	var tagindex=tagNamespl[0];
	tag_memory=tag_memory_array[tagindex];
	if (typeof(tag_memory)!="undefined" && tag_memory!="")
	{
		// document.getElementById(tag_memory).style.fontWeight="900";
		document.getElementById(tag_memory).style.color="#5C5C5C";
		// document.getElementById(tag_memory).style.cursor = "hand";
		document.getElementById(tag_memory).style.background='url("/images/btn_bg.gif")';
		// document.getElementById(tag_memory).style.borderBottom="solid 1px;";
	}
	tag_memory_array[tagindex]=id;
	// document.getElementById(id).style.fontWeight="900";
	// document.getElementById(id).style.color="#0F5DAB";
	document.getElementById(id).style.cursor = "hand";
	document.getElementById(id).style.background='url("/images/btn_select.gif")';
	document.getElementById(id).style.borderBottom="solid 0px;";
	var tag_content_name=id.replace('_','');
	tag_memory_name=tag_memory_name_array[tagindex];
	if (typeof(tag_memory_name)!="undefined" && tag_memory_name!="")
	{
		document.getElementById(tag_memory_name).style.display="none";
	}
	tag_memory_name_array[tagindex]=tag_content_name;
    	if (typeof(tag_content_name)!="undefined" && tag_content_name!="")
    	{
    		document.getElementById(tag_content_name).style.display="";
	}
}
// js实现不变形的自动缩略图效果-支持FF   2008-5-13 10:32:45
function DrawImage(ImgD,imageWidth,imageHeight)
{
	var image=new Image();
	image.src=ImgD.src;
	if(image.width>0 && image.height>0)
	{
		flag=true;
		if(image.width/image.height>= imageWidth/imageHeight)
		{
			if(image.width>imageWidth)
			{
				ImgD.width=imageWidth;
				ImgD.height=(image.height*imageWidth)/image.width;
			}
			else
			{
				ImgD.width=image.width;
				ImgD.height=image.height;
			}
		}
		else
		{
			if(image.height>imageHeight)
			{
				ImgD.height=imageHeight;
				ImgD.width=(image.width*imageHeight)/image.height;
			}
			else
			{
				ImgD.width=image.width;
				ImgD.height=image.height;
			}
		}
	}
}


function alertobject(obj){
	var str='';
	var j=0;
	for (var i in obj) {//i为索引名称
		if(obj[i])
		{
			str += i + ": " + obj[i];
			str+="\r\n";
		}
		j++
	}
	// document.write(str);
	alert(str);
}

/************无关portlet操作的js***********************/

function ajax_digit(module,id)
{
	ajaxStart();
	$.post('/ajax.php','action=dig&module='+module+'&id='+id,
		function (data){
			var result=data.split(';');
			if(result.length>1)
			{
				$("[name='dignum_"+module+id+"']").each(function(){
					$(this).html(result[0]);
				});
				$("[name='dig_"+module+id+"']").each(function(){
					$(this).html(result[1]);
				});
			}
			else
			{
				$("[name='dig_"+module+id+"']").each(function(){
					$(this).html(data);
				});
			}
			ajaxEnd();
		}, "XML");
	return false;
}
function ajax_supportcomments(id,type)
{
	ajaxStart();
	$.post('/ajax.php','action=suportcomment&type='+type+'&id='+id,
		function (data){
			//alert(parseInt(data));
			if(parseInt(data)>0)
			{
				$("#"+type+"_"+id).html(data);
				ajaxEnd();
			}
			else
			{
				ajaxEnd(data);
			}
		}, "XML");
	return false;
}

function ajaxStart()
{
	$("#ajaxloading").html('loading...');
	$("#ajaxloading").css('top',$(document).scrollTop()+20);
	$("#ajaxloading").fadeIn("fast");
}

function ajaxEnd(data){
	if(data)
	{
		$('#ajaxloading').html(data);
	}
	else
	{
		$('#ajaxloading').html('done.');
	}
	$("#ajaxloading").fadeOut(300).fadeIn(100).fadeOut(100);
}
//普通登陆
function ajaxlogin(form,purl){
	var postdata='';
	var pid=0;
	if(purl.search(/\?/)!=-1)
	{
		purl+='&inajax=1';
	}
	else
	{
		purl+='?inajax=1';
	}
	for(var i=0;i<form.length;i++)
	{
		postdata+=form[i].name+'='+encodeURIComponent(form[i].value)+'&';
	}
	$.post(purl,postdata,
		function (data){
			$('#portlet_content_6').html(data);
		}, "XML");
	return false;
}
//横向登陆
function ajaxloginH(form,purl){
	var postdata='';
	var pid=0;
	if(purl.search(/\?/)!=-1)
	{
		purl+='&inajax=1&type=horiz';
	}
	else
	{
		purl+='?inajax=1&type=horiz';
	}
	for(var i=0;i<form.length;i++)
	{
		postdata+=form[i].name+'='+encodeURIComponent(form[i].value)+'&';
	}
	$.post(purl,postdata,
		function (data){
			$('#portlet_content_12').html(data);
		}, "XML");
	return false;
}
//内容分页
function getcontentpages(module,id,page){
	var purl='ajax.php?inajax=1&action=contentpage';
        $.ajax({
         	url: purl,
         	type: 'POST',
         	dataType: 'html',
         	data: {'module':module,'id':id,'page':page},
         	timeout: 2000,
         	error: function(){
         		alert('Please check web status');
         	},
         	success: function(data){
         		$('#text').html(data);
         	}
         });
}

//提交表單  表單中包含name為returnarea 的hidden input，值為返回的ajax內容填充區域；沒有此值的話，返回無操作
function ajaxSubmitForm(form,purl){
	var postdata='';
	var returnarea="";
	if(purl.search(/\?/)!=-1)
	{
		purl+='&inajax=1';
	}
	else
	{
		purl+='?inajax=1';
	}
	for(var i=0;i<form.length;i++)
	{
		if(form[i].name=='returnarea')
		{
			returnarea=form[i].value;
		}
		//alertobject(form[i])
		if(form[i].type=="checkbox" && !form[i].checked )
		{
			continue;
		}
		postdata+=form[i].name+'='+encodeURIComponent(form[i].value)+'&';
	}
	$.post(purl,postdata,
		function (data){
			//alert(data);
			if(returnarea!="")
			{
				$('#'+returnarea).html(data);
			}
		}, "html");
	return false;
}

function tpleditmode(){
	if($('#tpleditmode').attr('checked'))
	{
		setCookie('tpleditmode','true');
	}
	else
	{
		setCookie('tpleditmode','false');
	}
	top.location.reload();
}
function prependtootbar()
{
	$('.containertoolbar').remove();
	$('[insertcontainer=true]').prepend($('<div class="containertoolbar" style="border:1px solid #CDE">'+$('#container_toolbar').html()+'</div>'));
}

$(document).ready(function() {
	//$('body').scroll(function(){
	//	alert(123);
	//});

	/*********前台效果 开始********/
	// menu菜单鼠标显示下级，FIrefox和chrome不需要js
	if($.browser.msie)
	{
		$('.menu1').mouseover(function(){
			if($('ul',this).css('visibility')=='hidden')
				$('ul',this).css('visibility','visible');
		})
		$('.menu1').mouseout(function(e){
			//alert(e.pageX   + ',' +e.pageY);
			var obj=$('ul',this).offset();
			if((e.pageY <= obj.top || e.pageY >=obj.top+$('ul',this).height())||(e.pageX <= obj.left || e.pageX >= obj.left + $('ul',this).width()))
			{
				$('ul',this).css('visibility','hidden');
			}
		});
	}
	//alert($('img','#container_txtimg').size());
	// 点击小图放大
	$('img','#container_txtimg').lightBox({fixedNavigation:true});
	/*********前台效果 结束********/

	/*********前台拖到编辑等相关部分********/
	$('#showhidetoolbar').click(function(){
		if($('#portlet_toolbar').css('display')!='none')
		{
			$('#portlet_toolbar').css('display','none');
			//$('#portlet_toolbar').animate({left: "+="+$('#portlet_toolbar').width()}, 1200);
		}
		else
		{
			$('#portlet_toolbar').css('display','block');
			//$('#portlet_toolbar').animate({left: -$('#portlet_toolbar').width()}, 1200);
		}
	});
});
