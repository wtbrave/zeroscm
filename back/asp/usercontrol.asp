<!--#include file="sqlstr.asp"-->
<!--#include file="checked.asp"-->
<!--#include file="opendb.asp"-->
<%
sub usercontrol(href)
On Error Resume Next
oabusyuserdept=request.cookies("oabusyuserdept")
if request("detel")="ɾ��" and request("delid")<>"" then
set conn=opendb("oabusy","conn","accessdsn")
count=0
condition=""
for each idno in request("delid")
count=count+1
condition=condition+"username=" & sqlstr(idno)
if count<request("delid").count then
condition=condition+" or "
end if
next
'ɾ�����ݿ��еļ�¼
sql = "delete * from userinf where " & condition
conn.Execute sql
end if



if request("forbid")="����" then
set conn=opendb("oabusy","conn","accessdsn")
count=0
count1=0
allid=""
condition=""
notcondition=""
for each id in request("allid")
count1=count1+1
allid=allid & id
if count1<request("allid").count then
allid=allid+","
end if
next
for each idno in request("forbidid")
count=count+1
condition=condition+"id=" & idno
notcondition=notcondition+"id<>" & idno
if count<request("forbidid").count then
condition=condition+" or "
notcondition=notcondition+" and "
end if
next
if condition<>"" then
sql = "update userinf set forbid='yes' where " & condition
conn.Execute sql
end if
if notcondition<>"" then
sql = "update userinf set forbid='no' where id in (" & allid & ") and " & notcondition
else
sql = "update userinf set forbid='no' where id in (" & allid & ")"
end if
conn.Execute sql
end if




'�����ݿ���ʾ������oabustuserdept���û�
set conn=opendb("oabusy","conn","accessdsn")
set rs=server.createobject("adodb.recordset")
sql="select * from userinf"
rs.open sql,conn,1
%>
<form action="<%=href%>" method=post>
<table border="1" cellspacing="0" cellpadding="0" width="90%">
<tr>
<td width="30" align="center"><input type="submit" value="ɾ��" name="detel"></td>
<td align=center><b>����</b></td>
<td align=center><b>�û���</b></td>
<td align=center><b>����</b></td>
<td align=center><b>����</b></td>
<td align=center><b>����</b></td>
<td width="30" align="center"><input type="submit" value="����" name="forbid"></td>
</tr>
<%
while not rs.eof and not rs.bof
%>

<tr>
<td align="center"><input type="checkbox" name="delid" value="<%=rs("username")%>"></td>
<td align="center"><a href="edituserinf.asp?username=<%=rs("username")%>"><%=rs("name")%></a></td>
<td align="center"><%=rs("username")%></td>
<td align="center"><%=rs("password")%></td>
<td align="center"><%=rs("userdept")%></td>
<td align="center"><%=rs("userlevel")%></td>
<td align="center"><input type="checkbox" name="forbidid" value="<%=rs("id")%>"<%=checked(rs("forbid"),"yes")%>><input type="hidden" name="allid" value="<%=rs("id")%>">
</td>
</tr>
<%
rs.movenext
wend
%>
</table>
</form>
<%
end sub
%>