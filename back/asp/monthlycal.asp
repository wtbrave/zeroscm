<!--#include file="displaysmallworkrec.asp"-->

<%
sub monthlycal(username,superior)
oabusyusername=request.cookies("oabusyusername")

'取得当前年月的1日日期
thismonthfirday=myyear & "-" & mymonth & "-1"
'取得下个月1日的日期
nextmonthfirday=dateadd("m",1,thismonthfirday)
'取得当前月的天数
totaldays=DateDiff("d",thismonthfirday,nextmonthfirday)

'response.write "这个月有：" & totaldays & "天"
'取得取得本月1日的星期数
firdayweek=weekday(thismonthfirday)

%>
<center>
<table border=1 width=95%>
<tr bgcolor="#66aa77">
<td align=center width="14%">星期日
</td>
<td align=center width="14%">星期一
</td>
<td align=center width="14%">星期二
</td>
<td align=center width="14%">星期三
</td>
<td align=center width="14%">星期四
</td>
<td align=center width="14%">星期五
</td>
<td align=center width="14%">星期六
</td>
</tr>
<%
for i=1 to 7
if firdayweek=i then
string1="<tr>"
j=1
do while j<i
string1=string1 & "<td>&nbsp;</td>"
j=j+1
loop
if firdayweek=1 or firdayweek=7 then
string1=string1 & "<td valign=top align=center bgcolor='#cccccc'>" & displaysmallworkrec(thismonthfirday,username,superior) & "</td>"
else
string1=string1 & "<td valign=top align=center>" & displaysmallworkrec(thismonthfirday,username,superior) & "</td>"
end if
end if
next
if firdayweek=7 then string1=string1 & "</tr>"
response.write string1

for i=2 to totaldays-1
if weekday(myyear & "-" & mymonth & "-" & i)=1 then response.write "<tr><td valign=top align=center bgcolor='#cccccc'>" & displaysmallworkrec(myyear & "-" & mymonth & "-" & i,username,superior) & "</td>"
if weekday(myyear & "-" & mymonth & "-" & i)=7 then response.write "<td valign=top align=center bgcolor='#cccccc'>" & displaysmallworkrec(myyear & "-" & mymonth & "-" & i,username,superior) & "</td></tr>"
if weekday(myyear & "-" & mymonth & "-" & i)<>7 and weekday(myyear & "-" & mymonth & "-" & i)<>1 then response.write "<td valign=top align=center>" & displaysmallworkrec(myyear & "-" & mymonth & "-" & i,username,superior) & "</td>"
next

for i=1 to 7
if weekday(myyear & "-" & mymonth & "-" & totaldays)=i then
if weekday(myyear & "-" & mymonth & "-" & totaldays)=1 or weekday(myyear & "-" & mymonth & "-" & totaldays)=7 then
string2="<td valign=top align=center bgcolor='#cccccc'>" & displaysmallworkrec(myyear & "-" & mymonth & "-" & totaldays,username,superior) & "</td>"
else
string2="<td valign=top align=center>" & displaysmallworkrec(myyear & "-" & mymonth & "-" & totaldays,username,superior) & "</td>"
end if
j=7
do while j>i
string2=string2 & "<td>&nbsp;</td>"
j=j-1
loop
string2=string2 & "</tr>"
end if
next
if weekday(myyear & "-" & mymonth & "-" & totaldays)=1 then string2="<tr>" & string2 & "</tr>"
response.write string2
%>
</table>
</center>
<br>
<%
end sub
%>