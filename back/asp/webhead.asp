<%
sub webhead()
user_code=request.cookies("user_code")
oabusyname=request.cookies("oabusyname")
oabusyusername=request.cookies("oabusyusername")
oabusyuserdept=request.cookies("oabusyuserdept")
oabusyuserlevel=request.cookies("oabusyuserlevel")
%>
<table border="0" width="100%" cellspacing="0" cellpadding="0">
  <tr>
    <td width=155 height=60><img src="images/logo.gif" width=155 height=60 border=0 alt="��ϵͳͼ��"></td>
    <td width="100%" valign=top>
      <table border="0" width="100%" cellspacing="0" cellpadding="0">
  <tr>
    <td height=5></td>
  </tr>
</table>

      <table border="0" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td width="20%" height="32" align=center>���ţ�<%=oabusyuserdept%></td>
          <td width="20%" align=center>������<%=user_code%></td>
          <td width="20%" align=center>ְλ��<%=oabusyuserlevel%></td>
          <td width="20%" align=center>
<script language="JavaScript">
<!---
   today=new Date();

	 
   function initArray(){
	 this.length=initArray.arguments.length
	 for(var i=0;i<this.length;i++)
	 this[i+1]=initArray.arguments[i]  }
	 
  var d=new initArray("<font color=RED>������","<font color=black>����һ","<font color=black>���ڶ�","<font color=black>������","<font color=black>������","<font color=black>������","<font color=GREEN>������"); 

  document.write(today.getFullYear(),"��",today.getMonth()+1,"��",today.getDate(),"��",d[today.getDay()+1]);  

//-->
</script>
          </td>
          <td width="20%" align=center>&nbsp;</td>
        </tr>
      </table>

      <table border="0" width="100%" cellspacing="0" cellpadding="0">
  <tr>
    <td height=1 bgcolor=red width=100%></td>
  </tr>
</table>    </td>
  </tr>
</table>





<%
end sub
%>