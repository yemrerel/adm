#!/usr/bin/env
var fs =require('fs');
var express=require('express');

var busboy = require('connect-busboy');//file upload kütüphanesi silme!!
 
var path=require('path');
var app =express();
var ejsLayouts=require('express-ejs-layouts');
var bodypARSER=require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(busboy());
app.set('views', path.join(__dirname, '.','views')); 

app.set('view engine','ejs');


app.use(bodypARSER.urlencoded({extended:false}));
app.use(bodypARSER.json());

app.use(ejsLayouts);
app.set("layout extractScripts", true)



app.use('/public',express.static(path.join(__dirname,'public')));



app.use(cookieParser());
app.use(session({cookie:{maxAge:60000000},secret:"melissa", saveUninitialized : true, resave : true}));

var moment = require('moment');

var sys=require('./sys/SYS')

//bebek test------------------------













//-------------------------------



var sys=require('./sys/SYS')

sysno=sys.SYSTakipNoSorgulama('8NQF8GVG0OYOXSUA')
var c=require('./skrsFunctions');

// c.updateSKRS()


require('./routes/RouteManager')(app);


 app.listen(8000);


// var mernis=require('./Mernis');

//  m.KimlikNoIleNufusKayitOrnegiSorgula(21697526390)


var request = require('request');
// url='http://hpvtarama.saglik.gov.tr/hpvtarama/hpv.svc'

// xml= `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
// <soapenv:Header/>
// <soapenv:Body>
//    <tem:BarkodHpvKontrol>
//       <!--Optional:-->
//       <tem:kullaniciAdi>aras.oner@epheal.com</tem:kullaniciAdi>
//       <!--Optional:-->
//       <tem:parola>eQ1234!</tem:parola>
//       <!--Optional:-->
//       <tem:barkodNo>2320000467</tem:barkodNo>
//    </tem:BarkodHpvKontrol>
// </soapenv:Body>
// </soapenv:Envelope>`


// request.post({
//     url:url,
//     method:"POST",
//     headers:{
//         'Content-Type': 'text/xml;charset=UTF-8',
//         SOAPAction: 'http://tempuri.org/WSHPV/BarkodHpvKontrol'

//     },
//      body: xml
// },
// function(error, response, body){
//     console.log(response.statusCode);
//     console.log(body);
// });




// var mernis=require('./Mernis');

//  m.KimlikNoIleNufusKayitOrnegiSorgula(21697526390)


url='http://hpvtarama.saglik.gov.tr/hpvtarama/hpv.svc'

xml= `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:bar="http://schemas.datacontract.org/2004/07/Barla.Service">
<soapenv:Header/>
<soapenv:Body>
   <tem:HastaHpvKontrol>
      <!--Optional:-->
      <tem:kullaniciAdi>aras.oner@epheal.com</tem:kullaniciAdi>
      <!--Optional:-->
      <tem:parola>eQ1234!</tem:parola>
      <!--Optional:-->
      <tem:hasta>
         <!--Optional:-->
         <bar:AdiSoyadi>FATMA GÜLNUR DOĞAN</bar:AdiSoyadi>
         <!--Optional:-->
         <bar:DogumTarihi>1970-02-22T00:00:00</bar:DogumTarihi>
         <bar:KimlikNo>27560169770</bar:KimlikNo>
      </tem:hasta>
   </tem:HastaHpvKontrol>
</soapenv:Body>
</soapenv:Envelope>`


// request.post({
//     url:url,
//     method:"POST",
//     headers:{
//       'Content-Type':'text/xml; charset=utf-8',
//       SOAPAction: 'http://tempuri.org/WSHPV/HastaHpvKontrol'

//     },
//      body: xml
// },
// function(error, response, body){
//     console.log(response.statusCode);
//     console.log(body);
//     console.log(error);

// });





