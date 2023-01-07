<%

firma = "firma" & ": " & request.form("firma")
HTML = HTML & firma & "<br>"
ilgili = "ilgili" & ": " & request.form("ilgili")
HTML = HTML & ilgili & "<br>"
telefon = "Telefon" & ": " & request.form("telefon")
HTML = HTML & telefon & "<br>"
faks = "Faks" & ": " & request.form("faks")
HTML = HTML & faks & "<br>"
email = "Mail" & ": " & request.form("email")
HTML = HTML & email & "<br>"
Adres = "Adres" & ": " & request.form("Adres")
HTML = HTML & Adres & "<br>"
%>

<%


   Set Mail = Server.CreateObject("Persits.MailSender")

   Mail.Host = "localmail.webservis.com.tr"

   Mail.From = "webservis@webservis.com.tr"
   Mail.FromName = "SAD Klima Iletisim"
   Mail.AddAddress "info@sadklima.com"


   Mail.Subject = "Sad Klima Iletisim Formu"
   Mail.Body = HTML
   Mail.IsHTML = True



   strErr = ""
   bSuccess = False
   'On Error Resume Next ' catch errors
   Mail.Send ' send message
   If Err <> 0 Then ' error occurred
      strErr = Err.Description
   else
      bSuccess = True
   End If

   Response.Write "<script language='JavaScript'>alert('TALEBINIZI ALDIK, SIZE ULASACAGIZ. TESEKKURLER. SAD KLIMA'); history.back()</script>"

%>