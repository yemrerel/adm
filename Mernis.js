var request = require('request-promise');
const uuidv1 = require('uuid/v1');
var parser = require('fast-xml-parser');
const Database = require('better-sqlite3');
const dbSkrs = new Database('skrs.db', { });
const dbMelissa = new Database('melissa.db', { });

  //  const username = "test_user";
  //  const password = "f6)@6U:l";
  const username = dbMelissa.prepare("SELECT * FROM User where ProfilTipi='Doktor'").get().KpsKullaniciAdi
 const password = dbMelissa.prepare("SELECT * FROM User where ProfilTipi='Doktor'").get().KpsSifre
kurumKodu = 123456//dbMelissa.prepare("SELECT * FROM User where ProfilTipi='Doktor'").get().KurumKodu


var uygulamaKodu = "8353df93-453c-4e23-8be8-2f913dd35313";

module.exports.BilesikKisiveAdresSorgula= async function(sorgulanacakKimlikNo){
      
        const stsTestUrl = "https://kpsv2test.saglik.gov.tr/STS/STSService.svc";
        const kpsServiceTestUrl = "https://kpsv2test.saglik.gov.tr/Router/RoutingService.svc";
        var tokenEnvelope = "";
        var created=new Date();
        var expires=created;
        created=created.toISOString();
        expires.setMinutes(expires.getMinutes()+5);
        expires=expires.toISOString();

        tokenEnvelope += '<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">';
        tokenEnvelope += '<s:Header>';
        tokenEnvelope += '<a:Action s:mustUnderstand="1">http://docs.oasis-open.org/ws-sx/ws-trust/200512/RST/Issue</a:Action>';
        tokenEnvelope += "<a:MessageID>urn:uuid:" + uuidv1().toString()+ "</a:MessageID>";
        tokenEnvelope += "<a:ReplyTo>";
        tokenEnvelope += "<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>";
        tokenEnvelope += '</a:ReplyTo>';
        tokenEnvelope += '<a:To s:mustUnderstand="1">' + stsTestUrl + '</a:To>';
        tokenEnvelope += '<KurumKodu a:IsReferenceParameter="true" xmlns="">' + kurumKodu + "</KurumKodu>";
        tokenEnvelope += '<UygulamaKodu a:IsReferenceParameter="true" xmlns="">' + uygulamaKodu + '</UygulamaKodu>';
        tokenEnvelope += '<o:Security s:mustUnderstand="1" xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">';
        tokenEnvelope += '<u:Timestamp u:Id="_0">';
        tokenEnvelope += '<u:Created>' + created.toString() + '</u:Created>';
        tokenEnvelope += '<u:Expires>' + expires.toString() + '</u:Expires>';
        tokenEnvelope += "</u:Timestamp>";
        tokenEnvelope += '<o:UsernameToken u:Id="uuid-;' + uuidv1().toString() + '-1">';
        tokenEnvelope += '<o:Username>' + username + '</o:Username>';
        tokenEnvelope += '<o:Password>' + password + '</o:Password>';
        tokenEnvelope += '</o:UsernameToken>';
        tokenEnvelope += '</o:Security>';
        tokenEnvelope += '</s:Header>';
        tokenEnvelope += '<s:Body>';
        tokenEnvelope += '<trust:RequestSecurityToken xmlns:trust="http://docs.oasis-open.org/ws-sx/ws-trust/200512">';
        tokenEnvelope += '<wsp:AppliesTo xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy">';
        tokenEnvelope += '<a:EndpointReference>';
        tokenEnvelope += "<a:Address>" + kpsServiceTestUrl + "</a:Address>";
        tokenEnvelope += "</a:EndpointReference>";
        tokenEnvelope += "</wsp:AppliesTo>";
        tokenEnvelope += "<trust:KeyType>http://docs.oasis-open.org/ws-sx/ws-trust/200512/Bearer</trust:KeyType>";
        tokenEnvelope += "<trust:RequestType>http://docs.oasis-open.org/ws-sx/ws-trust/200512/Issue</trust:RequestType>";
        tokenEnvelope += "</trust:RequestSecurityToken>";
        tokenEnvelope += "</s:Body>";
        tokenEnvelope += "</s:Envelope>";

        var hdr = {
              'Content-Type': 'application/soap+xml; charset=UTF-8',
        };
        var opt = {
           uri:stsTestUrl,
           method: 'post',
           headers: hdr,
           body:tokenEnvelope,
        };

        responseToken=await request(opt)
        tok=responseToken.split('<trust:RequestedSecurityToken>');
        var token=tok[1].split('</trust:RequestedSecurityToken>')[0];
    

       created=new Date();
       expires=created;
       created=created.toISOString();
       expires.setMinutes(expires.getMinutes()+5);
       expires=expires.toISOString();
  
       var kpsRequestEnvelope="";
       kpsRequestEnvelope += '<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">';
       kpsRequestEnvelope += '<s:Header>';
       kpsRequestEnvelope += '<a:Action s:mustUnderstand="1">https://www.saglik.gov.tr/KPS/01/01/2017/IKpsServices/BilesikKisiveAdresSorgula</a:Action>';
       kpsRequestEnvelope += '<a:MessageID>urn:uuid:' + uuidv1() + '</a:MessageID>';
       kpsRequestEnvelope += '<a:ReplyTo>';
       kpsRequestEnvelope += '<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>';
       kpsRequestEnvelope += "</a:ReplyTo>";
       kpsRequestEnvelope += '<a:To s:mustUnderstand="1">' + kpsServiceTestUrl + '</a:To>';
       kpsRequestEnvelope += '<o:Security s:mustUnderstand="1" xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">';
       kpsRequestEnvelope += '<u:Timestamp u:Id="_0">';
       kpsRequestEnvelope += '<u:Created>' + created.toString() + '</u:Created>';
       kpsRequestEnvelope += '<u:Expires>' + expires.toString() + '</u:Expires>';
       kpsRequestEnvelope += '</u:Timestamp>';
  
       kpsRequestEnvelope += token;
  
       kpsRequestEnvelope += '</o:Security>';
       kpsRequestEnvelope += '</s:Header>';
       kpsRequestEnvelope += '<s:Body>';
       kpsRequestEnvelope += '<BilesikKisiveAdresSorgula xmlns="https://www.saglik.gov.tr/KPS/01/01/2017">';
       kpsRequestEnvelope += '<kimlikNo>' + sorgulanacakKimlikNo + '</kimlikNo>';
       kpsRequestEnvelope += "</BilesikKisiveAdresSorgula>";
       kpsRequestEnvelope += '</s:Body>';
       kpsRequestEnvelope += '</s:Envelope>';
  
       hdr = {
        'content-type': 'application/soap+xml ;charset=UTF-8',
        'Connection':"Keep-Alive",
       };
       opt = {
         uri:kpsServiceTestUrl,
         method: 'post',
         headers: hdr,
         body:kpsRequestEnvelope,  
       };
  
       respondeKPS=await request(opt)
  
         json=parser.parse(respondeKPS, {});
         json=json['s:Envelope']['s:Body']['BilesikKisiveAdresSorgulaResponse']['BilesikKisiveAdresSorgulaResult'];
         json=JSON.parse(JSON.stringify(json));
         return json.Sonuc
} 



module.exports.KimlikNoIleNufusKayitOrnegiSorgula= async function(sorgulanacakKimlikNo){
console.log(sorgulanacakKimlikNo)
       const stsTestUrl = "https://kpsv2test.saglik.gov.tr/STS/STSService.svc";
       const kpsServiceTestUrl = "https://kpsv2test.saglik.gov.tr/Router/RoutingService.svc";
       var tokenEnvelope = "";
       var created=new Date();
       var expires=created;
       created=created.toISOString();
       expires.setMinutes(expires.getMinutes()+5);
       expires=expires.toISOString();

       tokenEnvelope += '<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">';
       tokenEnvelope += '<s:Header>';
       tokenEnvelope += '<a:Action s:mustUnderstand="1">http://docs.oasis-open.org/ws-sx/ws-trust/200512/RST/Issue</a:Action>';
       tokenEnvelope += "<a:MessageID>urn:uuid:" + uuidv1().toString()+ "</a:MessageID>";
       tokenEnvelope += "<a:ReplyTo>";
       tokenEnvelope += "<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>";
       tokenEnvelope += '</a:ReplyTo>';
       tokenEnvelope += '<a:To s:mustUnderstand="1">' + stsTestUrl + '</a:To>';
       tokenEnvelope += '<KurumKodu a:IsReferenceParameter="true" xmlns="">' + kurumKodu + "</KurumKodu>";
       tokenEnvelope += '<UygulamaKodu a:IsReferenceParameter="true" xmlns="">' + uygulamaKodu + '</UygulamaKodu>';
       tokenEnvelope += '<o:Security s:mustUnderstand="1" xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">';
       tokenEnvelope += '<u:Timestamp u:Id="_0">';
       tokenEnvelope += '<u:Created>' + created.toString() + '</u:Created>';
       tokenEnvelope += '<u:Expires>' + expires.toString() + '</u:Expires>';
       tokenEnvelope += "</u:Timestamp>";
       tokenEnvelope += '<o:UsernameToken u:Id="uuid-;' + uuidv1().toString() + '-1">';
       tokenEnvelope += '<o:Username>' + username + '</o:Username>';
       tokenEnvelope += '<o:Password>' + password + '</o:Password>';
       tokenEnvelope += '</o:UsernameToken>';
       tokenEnvelope += '</o:Security>';
       tokenEnvelope += '</s:Header>';
       tokenEnvelope += '<s:Body>';
       tokenEnvelope += '<trust:RequestSecurityToken xmlns:trust="http://docs.oasis-open.org/ws-sx/ws-trust/200512">';
       tokenEnvelope += '<wsp:AppliesTo xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy">';
       tokenEnvelope += '<a:EndpointReference>';
       tokenEnvelope += "<a:Address>" + kpsServiceTestUrl + "</a:Address>";
       tokenEnvelope += "</a:EndpointReference>";
       tokenEnvelope += "</wsp:AppliesTo>";
       tokenEnvelope += "<trust:KeyType>http://docs.oasis-open.org/ws-sx/ws-trust/200512/Bearer</trust:KeyType>";
       tokenEnvelope += "<trust:RequestType>http://docs.oasis-open.org/ws-sx/ws-trust/200512/Issue</trust:RequestType>";
       tokenEnvelope += "</trust:RequestSecurityToken>";
       tokenEnvelope += "</s:Body>";
       tokenEnvelope += "</s:Envelope>";

       var hdr = {
             'Content-Type': 'application/soap+xml; charset=UTF-8',
       };
       var opt = {
          uri:stsTestUrl,
          method: 'post',
          headers: hdr,
          body:tokenEnvelope,
       };

       responseToken=await request(opt)
       tok=responseToken.split('<trust:RequestedSecurityToken>');
       var token=tok[1].split('</trust:RequestedSecurityToken>')[0];
   

      created=new Date();
      expires=created;
      created=created.toISOString();
      expires.setMinutes(expires.getMinutes()+5);
      expires=expires.toISOString();
 
      var kpsRequestEnvelope="";
      kpsRequestEnvelope += '<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">';
      kpsRequestEnvelope += '<s:Header>';
      kpsRequestEnvelope += '<a:Action s:mustUnderstand="1">https://www.saglik.gov.tr/KPS/01/01/2017/IKpsServices/KimlikNoIleNufusKayitOrnegiSorgula</a:Action>';
      kpsRequestEnvelope += '<a:MessageID>urn:uuid:' + uuidv1() + '</a:MessageID>';
      kpsRequestEnvelope += '<a:ReplyTo>';
      kpsRequestEnvelope += '<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>';
      kpsRequestEnvelope += "</a:ReplyTo>";
      kpsRequestEnvelope += '<a:To s:mustUnderstand="1">' + kpsServiceTestUrl + '</a:To>';
      kpsRequestEnvelope += '<o:Security s:mustUnderstand="1" xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">';
      kpsRequestEnvelope += '<u:Timestamp u:Id="_0">';
      kpsRequestEnvelope += '<u:Created>' + created.toString() + '</u:Created>';
      kpsRequestEnvelope += '<u:Expires>' + expires.toString() + '</u:Expires>';
      kpsRequestEnvelope += '</u:Timestamp>';
 
      kpsRequestEnvelope += token;
 
      kpsRequestEnvelope += '</o:Security>';
      kpsRequestEnvelope += '</s:Header>';
      kpsRequestEnvelope += '<s:Body>';
      kpsRequestEnvelope += '<KimlikNoIleNufusKayitOrnegiSorgula xmlns="https://www.saglik.gov.tr/KPS/01/01/2017">';
      kpsRequestEnvelope += '<kimlikNo>' + sorgulanacakKimlikNo + '</kimlikNo>';
      kpsRequestEnvelope += "</KimlikNoIleNufusKayitOrnegiSorgula>";
      kpsRequestEnvelope += '</s:Body>';
      kpsRequestEnvelope += '</s:Envelope>';
 
      hdr = {
       'content-type': 'application/soap+xml ;charset=UTF-8',
       'Connection':"Keep-Alive",
      };
      opt = {
        uri:kpsServiceTestUrl,
        method: 'post',
        headers: hdr,
        body:kpsRequestEnvelope,  
      };
 
      respondeKPS=await request(opt)

        json=parser.parse(respondeKPS, {});
        json=json['s:Envelope']['s:Body']['KimlikNoIleNufusKayitOrnegiSorgulaResponse']['KimlikNoIleNufusKayitOrnegiSorgulaResult'];
        json=JSON.parse(JSON.stringify(json));
        return json.Sonuc
       
 
 
 
} 
