<!--#include file="sqlstr.asp"-->
<!--#include file="opendb.asp"-->
<%
sub userinf(href)
oabusyusername=request.cookies("oabusyusername")
oabusyuserdept=request.cookies("oabusyuserdept")
oabusyuserlevel=request.cookies("oabusyuserlevel")

if request("submit")="����" then
password=request("password")
name=request("name")
set conn=opendb("oabusy","conn","accessdsn")
set rs=server.createobject("adodb.recordset")
sql = "update userinf set "
sql = sql & "password=" & SqlStr(password) & ", "
sql = sql & "name=" & SqlStr(name) & " where username=" & sqlstr(oabusyusername)
conn.Execute sql
%>
<br><br>
<font color=red>�û�����ά���ɹ���</font>
<%
else
%>

<script Language="JavaScript">
 function maxlength(str,minl,maxl) {
    if(str.length <= maxl && str.length >= minl){return true;}else{return false;}
                                    }

 function form_check(){

   var l2=maxlength(document.form2.password.value,1,20);
   if(!l2){window.alert("����ĳ��ȴ���1λС��20λ");document.form2.password.focus();return (false);}

   var a1=document.form2.password.value;
   var a2=document.form2.repassword.value;
   if(a1!=a2){window.alert("�������������Ӧ��ͬ");document.form2.repassword.focus();return (false);}

   var l3=maxlength(document.form2.name.value,1,20);
   if(!l3){window.alert("�����ĳ��ȴ���1λС��20λ");document.form2.name.focus();return (false);}

                    }

</script>


<%
set conn=opendb("oabusy","conn","accessdsn")
set rs=server.createobject("adodb.recordset")
sql="select * from userinf where username=" & sqlstr(oabusyusername)
rs.open sql,conn,1
%>
<br><br>
<form action="<%=href%>" method=post name="form2" onsubmit="return form_check();">
<table border=2>
<tr>
<td>
��&nbsp;��&nbsp;����<%=oabusyusername%>
</td>
</tr>
<tr>
<td>
��&nbsp;&nbsp;&nbsp;&nbsp;�룺<input type="password" name="password" size=20 value="<%=rs("password")%>">
</td>
</tr>
<tr>
<td>
����ȷ�ϣ�<input type="password" name="repassword" size=20 value="<%=rs("password")%>">
</td>
</tr>
<tr>
<td>
��&nbsp;&nbsp;&nbsp;&nbsp;����<input type="text" name="name" size=20 value="<%=rs("name")%>">
</td>
</tr>
<tr>
<td>
��&nbsp;&nbsp;&nbsp;&nbsp;�ţ�<%=oabusyuserdept%>
</td>
</tr>
<tr>
<td>
ְ&nbsp;&nbsp;&nbsp;&nbsp;λ��<%=oabusyuserlevel%>
</td>
</tr>
<tr>
<td align=center>
<input type="submit" name="submit" value="����">
</td>
</tr>
</table>
</form>
<%
end if
end sub
%>