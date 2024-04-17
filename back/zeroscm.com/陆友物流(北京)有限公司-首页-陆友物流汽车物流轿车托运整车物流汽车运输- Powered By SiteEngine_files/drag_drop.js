
// iMouseDown represents the current mouse button state: up or down
/*
lMouseState represents the previous mouse button state so that we can
check for button clicks and button releases:

if(iMouseDown && !lMouseState) // button just clicked!
if(!iMouseDown && lMouseState) // button just released!
*/
var boxbgColor="#FFF";
var overbgColor="#ffff99";
var mouseOffset = null;
var iMouseDown  = false;
var lMouseState = false;
var dragObject  = null;

// Demo 0 variables
var DragDrops   = [];
var curTarget   = null;
var lastTarget  = null;
var dragHelper  = null;
var tempDiv     = null;
var rootParent  = null;
var rootSibling = null;
var arrangeContainer=false;

Number.prototype.NaN0=function(){return isNaN(this)?0:this;}

function CreateDragContainer(obj){
	/*
	Create a new "Container Instance" so that items from one "Set" can not
	be dragged into items from another "Set"
	*/
	//DragDrops[cDrag] 为一数组，记录页面所有的容器
	var cDrag        = DragDrops.length;
	DragDrops[cDrag] = [];

	/*
	Each item passed to this function should be a "container".  Store each
	of these items in our current container
	*/
	for(var i=0; i<obj.length; i++){
		var cObj = obj.get(i);
		DragDrops[cDrag].push(cObj);
		cObj.setAttribute('DropObj', cDrag);
		/*
		Every top level item in these containers should be draggable.  Do this
		by setting the DragObj attribute on each item and then later checking
		this attribute in the mouseMove function
		*/
		//alertobject(cObj.attributes);//return;
		for(var j=0; j<cObj.childNodes.length; j++){
			// Firefox puts in lots of #text nodes...skip these
			if(cObj.childNodes[j].nodeName=='#text') continue;
			cObj.childNodes[j].setAttribute('DragObj', cDrag);
		}
	}
}
function setArrangeContainer(obj)
{
	if(arrangeContainer==false)
	{
		arrangeContainer=true;
		obj.style.color="#DDD";
	}
	else
	{
		arrangeContainer=false;
		obj.style.color="#000";
	}
}
function addTableDragContainer(table){
	var cDrag=0;
	for(var tr=0;tr<table.rows.length;tr++){
		var trobj=table.rows[tr];
		for(var tdindex=0;tdindex<trobj.cells.length;tdindex++)
		{
			var tdobj=trobj.cells[tdindex];
			if(tdobj.getAttribute('insertcontainer')=='true')
			{
				DragDrops[cDrag].push(tdobj);
			}
			if(tdobj.childNodes.length>3)
			{
				for(var ij=0; ij<tdobj.childNodes.length; ij++){
					//td做容器，要自己指定，否则严重影响效率,因为td一般都会很多。
					if(tdobj.childNodes[ij].nodeName=='#text') continue;
					tdobj.childNodes[ij].setAttribute('DragObj', cDrag);
				}
			}
		}
	}
}

function refreshDragContainer(ContanerObj){
	
	/*
	Create a new "Container Instance" so that items from one "Set" can not
	be dragged into items from another "Set"
	*/
	var DragDropslentgh        = DragDrops[0].length;
	/*
	Each item passed to this function should be a "container".  Store each
	of these items in our current container
	*/
	var k=0;
	for(k=0; k < DragDropslentgh; k++){
		if(ContanerObj==DragDrops[0][k])
			break;
	}
	if(k >= DragDropslentgh)
	{
		//刷新 指定新增拖动容器
		DragDrops[0].push(ContanerObj);
		ContanerObj.setAttribute('DropObj', 0);
		for(var j=0; j<ContanerObj.childNodes.length; j++){
			// Firefox puts in lots of #text nodes...skip these
			if(ContanerObj.childNodes[j].nodeName=='#text') continue;
			//alert(cObj.childNodes[j].id);
			ContanerObj.childNodes[j].setAttribute('DragObj', 0);
		}
	}
	else
	{
		//刷新 指定已存在容器，该容器中新增了可拖动元素
		//var obj=$("[class='portlet']",ContanerObj);
		for(var j=0; j<ContanerObj.childNodes.length; j++){
			if(ContanerObj.childNodes[j].nodeName=='#text') continue;
			//alert(cObj.childNodes[j]);
			ContanerObj.childNodes[j].setAttribute('DragObj', 0);
		}
	}
}
function alertobject(obj){
	var str='';
	var j=0;
	if(typeof(obj)=="string")
	{
		alert(obj);
		return true;
	}
	for (var i in obj) {//i为索引名称
		if(obj[i]){
			str += i + ": " + obj[i];
			//str += i + ": ";
			if(j%2==1) str+="\r\n";
			else 
				str+="\t\t\t\t";
			j++
		}
	}
	alert(str);
}

function mouseCoords(ev){
	var x,y=0;
	if(ev.pageX || ev.pageY){
		return {x:ev.pageX, y:ev.pageY};
	}
	return {		
		x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:ev.clientY + document.body.scrollTop  - document.body.clientTop
	};
}

function getMouseOffset(target, ev){
	//鼠标位置，相对于target 左上角的位置
	ev = ev || window.event;

	var docPos    = getPosition(target);
	var mousePos  = mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}



function getPosition(e){
	var left = 0;
	var top  = 0;
	while (e.offsetParent){
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		e     = e.offsetParent;
	}

	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);

	return {x:left, y:top};

}

function SetCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 30; //此 cookie 将被保存 30 天
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)//取cookies函数        
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return unescape(arr[2]); return null;

}
function setorderonload(){
	var cookievalue=getCookie('contentorder');
	//alert(cookievalue);
	var conarray=cookievalue.split('||');
	
	for(var i=0;i< conarray.length ;i++){
		
		if(typeof(conarray[i])!='undefined' && conarray[i]!=''){
			var coba=conarray[i].split(':');
			var containerobj=document.getElementById(coba[0]);
			var innerobjids=coba[1].split(',');
			for(var j=0;j<innerobjids.length;j++){
				if(typeof(innerobjids[j])!='undefined' && innerobjids[j]!=''){
					var innerobj=document.getElementById(innerobjids[j]);
					containerobj.appendChild(innerobj);
				}
			}
		}
	}
	
}
function getContainerOrder(){
	var cObj=DragDrops[0][2];
	var str='';
	var cookievalue='';
	//alert(DragDrops[0].length);
	for(var i=0; i< DragDrops[0].length; i++){
		str='';
		cObj=DragDrops[0][i];
		for(var j=0; j<cObj.childNodes.length; j++){
			//alertobject(cObj.childNodes[j]);
			if(cObj.childNodes[j]){
				if(cObj.childNodes[j].nodeName=='#text') continue;
				
				var idname=cObj.childNodes[j].id;
				if(typeof(idname)=='undefined')
				{
					continue;
					alertobject(cObj.childNodes[j]);
				}
				str+=idname+',';
			}
		}
		cookievalue+=cObj.id+':'+str+'||';
	}
	//alert(cookievalue);
	SetCookie('contentorder',cookievalue);
	alert('save success!');
}
var mouseobj=null;
function mousePosition()
{
	$().mousemove(function(e){
                mouseobj= {x:e.pageX,y:e.pageY};
                //alert(obj.x);
                return mouseobj;
        });
        return mouseobj;
}
function insertAfter(newElement,targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
// 如果最后的节点是目标元素，则直接添加。因为默认是最后
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement,targetElement.nextSibling);
//如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面。
  }
}
function mouseMove(ev){
	ev         = ev || window.event;
	
	/*
	We are setting target to whatever item the mouse is currently on

	Firefox uses event.target here, MSIE uses event.srcElement
	*/
	var target   = ev.target || ev.srcElement;
	var mousePos = mouseCoords(ev);
	
	/*
	dragObj is the grouping our item is in (set from the createDragContainer function).
	if the item is not in a grouping we ignore it since it can't be dragged with this
	script.
	*/
	var dragObj;
	if(typeof(target.getAttribute)!='undefined')
        {
		dragObj = target.getAttribute('DragObj');
		if(target.getAttribute('dragable')=='false')
		{
			dragObj=null;
		}
	}
	var targetiscontainer=null;
	if(curTarget && iMouseDown)
	{
		if(iMouseDown)
		{
			for(var i=0; i<DragDrops[0].length; i++){
				//当前的target 是否是容器类的，是则dragObj=0;拖动时经过容器元素时，设置target
				if(DragDrops[0][i]==target)
				{
					dragObj=0;
					target=curTarget;
					//alert(curTarget.id);
				}
			}
		}
	}
	while(dragObj==null)
	{
		if(target.parentNode)
		{
			target=target.parentNode;
		}
		else
		{
			break;	
		}
		//alert(typeof(target.getAttribute));
        	if(typeof(target.getAttribute)!='undefined')
        	{
			dragObj = target.getAttribute('DragObj');
			
			if(target.getAttribute('dragable')=='false')
			{
				break;
			}
		}
		
	}
	
	if(arrangeContainer==true)
	{
		if(target.getAttribute('insertcontainer')!='true')
			dragObj=null;
	}
	if(dragObj!=null){
		// 点击拖到时执行，一次拖动只执行一次,指定拖动对象
		
		if(iMouseDown && !lMouseState){
			//alertobject(curTarget);
			// mouseDown target
			curTarget     = target;
			// Record the mouse x and y offset for the element
			rootParent    = curTarget.parentNode;
			rootSibling   = curTarget.nextSibling;

			mouseOffset   = getMouseOffset(target, ev);

			// We remove anything that is in our dragHelper DIV so we can put a new item in it.
			//for(var i=0; i<dragHelper.childNodes.length; i++)
			//	dragHelper.removeChild(dragHelper.childNodes[i]);

			// Make a copy of the current item and put it in our drag helper.
			dragHelper.appendChild(curTarget.cloneNode(true));
			dragHelper.style.display = 'block';
			
			dragHelper.style.width=curTarget.offsetWidth;
			//disable dragging from our helper DIV (it's already being dragged)
			dragHelper.firstChild.removeAttribute('DragObj');			

			/*
			Record the current position of all drag/drop targets related
			to the element.  We do this here so that we do not have to do
			it on the general mouse move event which fires when the mouse
			moves even 1 pixel.  If we don't do this here the script
			would run much slower.
			*/
			var dragConts = DragDrops[dragObj];
			
			/*
			first record the width/height of our drag item.  Then hide it since
			it is going to (potentially) be moved out of its parent.
			*/
			curTarget.style.display  = 'none';
		}
	}

	// If we get in here we are dragging something
	//拖动的元素为 curTarget
	var Cposition = null;	// 容器位置
	var Mposition = null;	// 鼠标位置
	Mposition=mousePosition();	// 鼠标位置
	if(curTarget){
		// move our helper div to wherever the mouse is (adjusted by mouseOffset)
		//dragHelper.style.top  = mousePos.y - mouseOffset.y;
		//dragHelper.style.left = mousePos.x - mouseOffset.x;
		$(dragHelper).css('top',mousePos.y - mouseOffset.y);
		$(dragHelper).css('left',mousePos.x - mouseOffset.x);
		//alert(mousePos.y +'===' +(mousePos.y - mouseOffset.y) +';'+ (mousePos.x - mouseOffset.x))
		
		var dragConts  = DragDrops[curTarget.getAttribute('DragObj')];
		var activeCont = null;		
		
		for(var i=0; i<dragConts.length; i++){
			//alertobject(dragConts[i]);
						
			//alert(Mposition.x+";=="+Mposition.y);
			Cposition=$(dragConts[i]).offset(); //容器位置
			//alert(Cposition.left+';'+Cposition.top)
			
			if(Mposition.x >=Cposition.left && Mposition.x<=Cposition.left+$(dragConts[i]).width() && Mposition.y <= Cposition.top+$(dragConts[i]).height() && Mposition.y >= Cposition.top )
			{
				activeCont = dragConts[i];
				//alert(dragConts[i].id);
			}
		}
		if(activeCont){
			do{
				var hasinner=false;
				for(var i=activeCont.childNodes.length-1; i>=0; i--){
					
					if(activeCont.childNodes[i].insertcontainer!="true") //
						continue;
					//alert(Mposition.x+";=="+Mposition.y);
					Cposition=$(activeCont.childNodes[i]).offset(); //容器位置
					if(Mposition.x>=Cposition.left && Mposition.x<=Cposition.left+$(activeCont.childNodes[i]).width() && Mposition.y <= Cposition.top+$(activeCont.childNodes[i]).height() && Mposition.y >= Cposition.top )
					{
						activeCont = activeCont.childNodes[i];
						hasinner=true;
					}
				}
				if(i<0)
				{
					break;
				}
			}while(hasinner);
		}
		// Our target object is in one of our containers.  Check to see where our div belongs
		if(activeCont){
			// beforeNode will hold the first node AFTER where our div belongs
			var beforeNode = null;
			var afterNode = null;

			// loop through each child node (skipping text nodes).
			for(var i=activeCont.childNodes.length-1; i>=0; i--){
				with(activeCont.childNodes[i]){
					if(nodeName=='#text') continue;
					
					//alert(Mposition.x+";=="+Mposition.y);
					Cposition=$(activeCont.childNodes[i]).offset(); //容器位置
					if(Mposition.x>=Cposition.left && Mposition.x<=Cposition.left+$(activeCont.childNodes[i]).width() && 
					Mposition.y <= Cposition.top+$(activeCont.childNodes[i]).height()/2 && Mposition.y >= Cposition.top )
					{
						beforeNode = activeCont.childNodes[i];
					}
					else if(Mposition.x>=Cposition.left && Mposition.x<=Cposition.left+$(activeCont.childNodes[i]).width() && 
					Mposition.y <= Cposition.top+$(activeCont.childNodes[i]).height() && Mposition.y > Cposition.top+$(activeCont.childNodes[i]).height()/2 )
					{
						afterNode = activeCont.childNodes[i];
					}
				}
			}
			//alert(afterNode + ';'+ beforeNode);
			// the item being dragged belongs before another item
			if(beforeNode){
				if(beforeNode!=curTarget.nextSibling){
					activeCont.insertBefore(curTarget, beforeNode);
				}

			// the item being dragged belongs at the end of the current container
			}else if(afterNode)
			{
				insertAfter(curTarget, afterNode);
			} else {
				activeCont.appendChild(curTarget);
			}
			//alert(11);

			// make our drag item visible
			if(curTarget.style.display!=''){
				curTarget.style.display  = '';
			}
		} else {

			// our drag item is not in a container, so hide it.
			if(curTarget.style.display!='none'){
				curTarget.style.display  = 'none';
			}
		}
	}

	// track the current mouse state so we can compare against it next time
	lMouseState = iMouseDown;
	//
	// mouseMove target
	lastTarget  = target;

	// this helps prevent items on the page from being highlighted while dragging
	return false;
}

function mouseUp(ev){
	if(curTarget){
		// hide our helper object - it is no longer needed
		dragHelper.style.display = 'none';

		// if the drag item is invisible put it back where it was before moving it
		if(curTarget.style.display == 'none'){
			if(rootSibling){
				rootParent.insertBefore(curTarget, rootSibling);
			} else {
				rootParent.appendChild(curTarget);
			}
		}
		for(var i=0; i<dragHelper.childNodes.length; i++)
			dragHelper.removeChild(dragHelper.childNodes[i]);
		// make sure the drag item is visible
		curTarget.style.display = '';
	}
	curTarget  = null;
	iMouseDown = false;
}
var lastclickcontainer=null;
//function mouseDown(ev){
//	iMouseDown = true;
//	
//	// set the class on our helper DIV if necessary	
//	if(lastTarget){
//		return false;
//	}
//}
function titleMouseDown(ev){
	iMouseDown = true;
	ev         = ev || window.event;
	//alert(11);
	var target   = ev.target || ev.srcElement;
	var mousePos = mouseCoords(ev);
	if(target.getAttribute('dragable')=='false')
	{
		iMouseDown = false;
	}
}

