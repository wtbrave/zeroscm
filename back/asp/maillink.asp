<%
function maillink(a)
if a<>"" then
maillink="<a href=mailto:" & a & ">" & a & "</a>"
else
maillink="��"
end if
end function
%>