<%
firma = "firma" & " = " & request.form("firma")
HTML = HTML & firma & "<br>"
ilgili = "ilgili" & " = " & request.form("ilgili")
HTML = HTML & ilgili & "<br>"
telefon = "Telefon" & " = " & request.form("telefon")
HTML = HTML & telefon & "<br>"
faks = "Faks" & " = " & request.form("faks")
HTML = HTML & faks & "<br>"
email = "Mail" & " = " & request.form("email")
HTML = HTML & Mail & "<br>"

Adres = "Adres" & " = " & request.form("Adres")
HTML = HTML & Adres & "<br>"



note = "Mesajiniz" & " = " & request.form("not")
HTML = HTML & note & "<br>"
ip="<br>Formu gonderen kisinin ip adresi : "+Request.ServerVariables("REMOTE_ADDR")
HTML = HTML & ip & "<br>"
gzaman="Zaman : "+FormatDateTime(Now)
HTML = HTML & gzaman & "<br>"
fsayfa="Forum adresi : "+Request.ServerVariables("HTTP_REFERER")
HTML = HTML & fsayfa & "<br>"

Set myMail = CreateObject("CDONTS.NewMail")
myMail.From="info@sadklima.com"
myMail.To="info@sadklima.com"
myMail.Subject="Iletisim Formu"
myMail.BodyFormat=0
myMail.MailFormat=0
myMail.Body=HTML
myMail.Send
Response.Write "<script language='JavaScript'>alert('Talebiniz firmamıza ulaşmıştır. En kısa süre içerisinde size geri dönüş yapılacaktır.');</script>"

set mymail=nothing
%>
<!-- #INCLUDE file="iletisim.html" -->