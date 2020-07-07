
require('tls').DEFAULT_MIN_VERSION = 'TLSv1'

var url="https://lab.ism.gov.tr/Alisws2konak/alisws.asmx";
var request = require('request-promise');
var VENUSER= "EPHEAL"
var VENPASS="EPHEAL"
var parser = require('fast-xml-parser');
var DOKTOR_KODU='';
var moment = require('moment');

 
  module.exports.ALISEntegKodlari=async function(req,res){

     var xml='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"> <soapenv:Header/>';
     xml+='<soapenv:Body><tem:ALISEntegKodlari><!--Optional:--><tem:VENUSER>'+VENUSER+'</tem:VENUSER><!--Optional:--><tem:VENPASS>'+VENPASS+'</tem:VENPASS>';
     xml+='</tem:ALISEntegKodlari></soapenv:Body></soapenv:Envelope>';
  
  
    var hdr = {
      'content-type': 'text/xml;charset=UTF-8',
      'SOAPAction': "http://tempuri.org/ALISEntegKodlari",
    };
  
    var opt = {
        method: 'post',
        headers: hdr,
        body:xml,
        host:"lab.ism.gov.tr",
        Connection:'Keep-Alive'
    };
    var parsingOptions = {};
    body=await request(url,opt)
    var jsonResult = parser.parse(body, parsingOptions); //xml to json
    var entegreler=jsonResult['soap:Envelope']['soap:Body']['ALISEntegKodlariResponse']['ALISEntegKodlariResult']['EntegKodArr']['EntegKodlar'];
     res.json({entegreler:entegreler});
  
  
  }
  


  module.exports.ALISKayitSorgula=async function(req,res){
    BASTAR='01.01.2018 01:00:00'
    BITTAR='01.03.2020 01:00:00'
    KONTROL_KODU=3502001
    xml=`<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
            <soap12:Body>
              <ALISKayitSorgula xmlns="http://tempuri.org/">
                <VENUSER>${VENUSER}</VENUSER>
                <VENPASS>${VENPASS}</VENPASS>
                <BASTAR>${BASTAR}</BASTAR>
                <BITTAR>${BITTAR}</BITTAR>
                <KONTROL_KODU>${KONTROL_KODU}</KONTROL_KODU>
              </ALISKayitSorgula>
            </soap12:Body>
          </soap12:Envelope>`
    var hdr = {         
            SOAPAction: "http://tempuri.org/ALISKayitSorgula",
            'Content-Type':'application/soap+xml; charset=utf-8',
    };
    
    var opt = {
       method: 'POST',
       headers: hdr,
       body:xml,

    };
    a= await request(url,opt)
    var parsingOptions = {};
    var jsonResult = parser.parse(a, parsingOptions); //xml to json
    var result=jsonResult['soap:Envelope']['soap:Body']['ALISKayitSorgulaResponse']['ALISKayitSorgulaResult'];
    res.json(result)
 }
 


 module.exports.ALISKayitEkleAdv=async function(req,res){
   var dateTime = new Date("2015-06-17 14:24:36");
   dateTime = moment(dateTime).format("DD-MM-YYYY HH:mm:ss");

   ORNEKNO=req.query.ornekNo

   secilenTestler= JSON.parse(req.query.secilenTestler)
   TetkikArr='<TetkikArr>'
for (let index = 0; index < secilenTestler.length; index++) {
     const e = secilenTestler[index];
     TetkikArr+=`<Tetkik>
     <TETKIK_KODU>${e.TEST_ID}</TETKIK_KODU>
     <ISTEM_ID>${e.entegKodu}</ISTEM_ID>
     <TETKIK_ACIK></TETKIK_ACIK>
     <islemSonuc xsi:nil="true" />
     </Tetkik> `
}
TetkikArr+='</TetkikArr>'
url='https://lab.ism.gov.tr/Alisws2konak/alisws.asmx'
  xml=`<?xml version="1.0" encoding="utf-8"?>
  <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
      <ALISKayitEkleAdv xmlns="http://tempuri.org/">
        <entegRec>
          <VENPASS>${VENPASS}</VENPASS>
          <VENUSER>${VENUSER}</VENUSER>
          <ORNEKNO>${ORNEKNO}</ORNEKNO>
          <TETKIKLER>900200</TETKIKLER>
          ${TetkikArr}
          <ISTEM_TARIHI>${VENPASS}</ISTEM_TARIHI>
          <TC_KIMLIKNO>${req.query.hastaTC}</TC_KIMLIKNO>
          <DOSYA_NO>12345</DOSYA_NO>
          <GELIS_NO>string</GELIS_NO>
          <AD>640115</AD>
          <SOYAD>string</SOYAD>
          <CINSIYET>KADIN</CINSIYET>
          <DOGUM_TARIHI>string</DOGUM_TARIHI>
          <DOGUM_YERI>string</DOGUM_YERI>
          <BABA_ADI>string</BABA_ADI>
          <ANA_ADI>string</ANA_ADI>
          <ACIL>RUTIN</ACIL>
          <YATAN>AYAKTAN</YATAN>
          <SGK>BELIRTILMEMIS</SGK>
          <KURUM_KODU>string</KURUM_KODU>
          <KURUM_ADI>string</KURUM_ADI>
          <SERVIS_KODU>string</SERVIS_KODU>
          <SERVIS_ADI>string</SERVIS_ADI>
          <SERPOL>SERVIS</SERPOL>
          <DOKTOR_KODU>string</DOKTOR_KODU>
          <DOKTOR_ADI>string</DOKTOR_ADI>
          <DOKTOR_SOYADI>string</DOKTOR_SOYADI>
          <DOKTOR_SICIL_NO>string</DOKTOR_SICIL_NO>
          <TANI_KODU>string</TANI_KODU>
          <TANI_ADI>string</TANI_ADI>
          <ACIKLAMA>string</ACIKLAMA>
          <TEL>string</TEL>
          <TEL2>string</TEL2>
          <MOBILTEL>string</MOBILTEL>
          <EPOSTA>string</EPOSTA>
          <SONUC_ALABILIR_YAKINI>string</SONUC_ALABILIR_YAKINI>
          <OZELKOD1>string</OZELKOD1>
          <OZELKOD2>string</OZELKOD2>
          <OZELKOD3>string</OZELKOD3>
          <OZELKOD4>string</OZELKOD4>
          <OZELKOD5>string</OZELKOD5>
          <KANALMA_TARIHI>string</KANALMA_TARIHI>
          <LABKABUL_TARIHI>string</LABKABUL_TARIHI>
        </entegRec>
      </ALISKayitEkleAdv>
    </soap12:Body>
  </soap12:Envelope>`


var hdr = {         
'Content-Type':'application/soap+xml; charset=utf-8',
};

var opt = {
method: 'POST',
headers: hdr,
body:xml,
resolveWithFullResponse: true,
json: false,
};

a= await request(url,opt)
var parsingOptions = {};
var jsonResult = parser.parse(a.body, parsingOptions); //xml to json
var result=jsonResult['soap:Envelope']['soap:Body']['ALISKayitEkleAdvResponse']['ALISKayitEkleAdvResult'];
console.log(result)
res.json(result)

}


module.exports.ALISKayitSorguTamamlandi=async function(req,res){


   xml=`
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ALISKayitSorguTamamlandi xmlns="http://tempuri.org/">
      <VENUSER>${VENUSER}</VENUSER>
      <VENPASS>${VENPASS}</VENPASS>
      <KAYITSORGU_ARR>
        <KayitSorguTamamla>
          <ORNEKNO>1</ORNEKNO>
          <KONTROL_KODU>string</KONTROL_KODU>
          <RES>1</RES>
          <HATA_MESAJI>string</HATA_MESAJI>
        </KayitSorguTamamla>
        <KayitSorguTamamla>
          <ORNEKNO>2</ORNEKNO>
          <KONTROL_KODU>string</KONTROL_KODU>
          <RES>1</RES>
          <HATA_MESAJI>string</HATA_MESAJI>
        </KayitSorguTamamla>
      </KAYITSORGU_ARR>
    </ALISKayitSorguTamamlandi>
  </soap:Body>
</soap:Envelope>`
   var hdr = {         
           SOAPAction: "http://tempuri.org/ALISKayitSorguTamamlandi",
           'Content-Type':'text/xml; charset=utf-8',
   };
   
   var opt = {
      method: 'POST',
      headers: hdr,
      body:xml,

   };
   a= await request(url,opt)
   var parsingOptions = {};
   var jsonResult = parser.parse(a, parsingOptions); //xml to json
   var result=jsonResult['soap:Envelope']['soap:Body']['ALISKayitSorguTamamlandiResponse']['ALISKayitSorguTamamlandiResult'];
   console.log(result)

   res.json(result)
}


module.exports.ALISSonucDurum=async function(req,res){


   xml=`<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
   <soap12:Body>
     <ALISSonucDurum xmlns="http://tempuri.org/">
       <VENUSER>${VENUSER}</VENUSER>
       <VENPASS>${VENPASS}</VENPASS>
       <ORNEKNO>1</ORNEKNO>
     </ALISSonucDurum>
   </soap12:Body>
 </soap12:Envelope>`
   var hdr = {         
           SOAPAction: "http://tempuri.org/ALISSonucDurum",
           'Content-Type':'text/xml; charset=utf-8',
   };
   
   var opt = {
      method: 'POST',
      headers: hdr,
      body:xml,

   };
   a= await request(url,opt)
   var parsingOptions = {};
   var jsonResult = parser.parse(a, parsingOptions); //xml to json
   var result=jsonResult['soap:Envelope']['soap:Body']['ALISSonucDurumResponse']['ALISSonucDurumResult'];

   res.json(result)
}


module.exports.ALISHastaTumSonuc=async function(req,res){


   xml=`<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
   <soap12:Body>
     <ALISHastaTumSonuc xmlns="http://tempuri.org/">
       <VENUSER>${VENUSER}</VENUSER>
       <VENPASS>${VENPASS}</VENPASS>
       <TC_KIMLIKNO>string</TC_KIMLIKNO>
       <BASTAR>string</BASTAR>
       <BITTAR>string</BITTAR>
     </ALISHastaTumSonuc>
   </soap12:Body>
 </soap12:Envelope>`
   var hdr = {         
           SOAPAction: "http://tempuri.org/ALISHastaTumSonuc",
           'Content-Type':'text/xml; charset=utf-8',
   };
   
   var opt = {
      method: 'POST',
      headers: hdr,
      body:xml,

   };
   a= await request(url,opt)
   var parsingOptions = {};
   var jsonResult = parser.parse(a, parsingOptions); //xml to json
   var result=jsonResult['soap:Envelope']['soap:Body']['ALISHastaTumSonucResponse']['ALISHastaTumSonucResult'];
   console.log(result)
   res.json(result)
}