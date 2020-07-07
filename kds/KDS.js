var request = require('request-promise');
const uuidv1 = require('uuid/v1');
var parser = require('fast-xml-parser');
const Database = require('better-sqlite3');
const dbSkrs = new Database('skrs.db', { });
const dbMelissa = new Database('melissa.db', { });
var fs =require('fs');
const ejs = require('ejs');
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

birim=194887
name=45556055678
password='Zt55667854'


module.exports.logon= async function(donem){
    

    //------SESSİONID ALMA
    var opt={}
    opt.method='post'
    opt.uri='https://kds.sagliknet.saglik.gov.tr/analytics/saw.dll?SoapImpl=nQSessionService'
    opt.headers= { 
                        'content-type': 'text/xml;charset=UTF-8',
                        'Connection':"Keep-Alive",
                         Host:'kds.sagliknet.saglik.gov.tr',
                         SOAPAction:"#logon",
                         Connection:'Keep-Alive'
                 },
    opt.body='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v6="urn://oracle.bi.webservices/v6"><soapenv:Header/> <soapenv:Body><v6:logon>'
    opt.body+='<v6:name>'+name+'</v6:name> <v6:password>'+password+'</v6:password></v6:logon></soapenv:Body></soapenv:Envelope>'
    response=await request(opt)
    json=parser.parse(response, {});
    sessionId=json['soap:Envelope']['soap:Body']['sawsoap:logonResult']['sawsoap:sessionID'];
       
    //------------GENEL
  
    var xml = fs.readFileSync('./kds/genel.ejs', 'utf8');
    ejsParams={}
    ejsParams.performansGenel1='Performans Genel Raporu'
    ejsParams.performansGenel2='Perf Genel Rapor'
    ejsParams.donem=donem
    ejsParams.name=name
    ejsParams.birim=birim
    ejsParams.sessionId=sessionId
    ejsParams.str='Hekim Tc'

    var xml = ejs.render(xml, ejsParams);
    var opt={}
    opt.method='post'
    opt.uri='https://kds.sagliknet.saglik.gov.tr/analytics/saw.dll?SoapImpl=xmlViewService'
    opt.headers= { 
                        'content-type': 'text/xml;charset=UTF-8',
                        'Connection':"Keep-Alive",
                         Host:'kds.sagliknet.saglik.gov.tr',
                         SOAPAction:"#executeXMLQuery",
                         Connection:'Keep-Alive',
                         'Accept-Encoding': 'gzip,deflate'
                 },
    opt.body=xml
    response=await request(opt)
    response=entities.decode(response)
    json=parser.parse(response, {});
    genelJson=json['soap:Envelope']['soap:Body']['sawsoap:executeXMLQueryResult']['sawsoap:return']['sawsoap:rowset'].rowset.Row
    
    //vaccine

    var xml = fs.readFileSync('./kds/genel.ejs', 'utf8');
    ejsParams={}
    ejsParams.performansGenel1="Performans Bebek Aşı Raporu"
    ejsParams.performansGenel2='Perf Bebek Aşı Rapor'
    ejsParams.donem=donem
    ejsParams.name=name
    ejsParams.birim=birim
    ejsParams.sessionId=sessionId
    ejsParams.str='Hekim Kimlik Numarası'
    
    var xml = ejs.render(xml, ejsParams);
    var opt={}
    opt.method='post'
    opt.uri='https://kds.sagliknet.saglik.gov.tr/analytics/saw.dll?SoapImpl=xmlViewService'
    opt.headers= { 
                        'content-type': 'text/xml;charset=UTF-8',
                        'Connection':"Keep-Alive",
                         Host:'kds.sagliknet.saglik.gov.tr',
                         SOAPAction:"#executeXMLQuery",
                         Connection:'Keep-Alive',
                         'Accept-Encoding': 'gzip,deflate'
                 },
    opt.body=xml
    response=await request(opt)

    response=entities.decode(response)
    json=parser.parse(response, {});
    VaccineJson=json['soap:Envelope']['soap:Body']['sawsoap:executeXMLQueryResult']['sawsoap:return']['sawsoap:rowset'].rowset.Row

  //baby
  var xml = fs.readFileSync('./kds/genel.ejs', 'utf8');
  ejsParams={}
  ejsParams.performansGenel1="Performans Bebek İzlem Rapor"
  ejsParams.performansGenel2='Perf Bebek İzlem Rapor'
  ejsParams.donem=donem
  ejsParams.name=name
  ejsParams.birim=birim
  ejsParams.sessionId=sessionId
  ejsParams.str='Hekim Kimlik Numarası'
  
  var xml = ejs.render(xml, ejsParams);
  var opt={}
  opt.method='post'
  opt.uri='https://kds.sagliknet.saglik.gov.tr/analytics/saw.dll?SoapImpl=xmlViewService'
  opt.headers= { 
                      'content-type': 'text/xml;charset=UTF-8',
                      'Connection':"Keep-Alive",
                       Host:'kds.sagliknet.saglik.gov.tr',
                       SOAPAction:"#executeXMLQuery",
                       Connection:'Keep-Alive',
                       'Accept-Encoding': 'gzip,deflate'
               },
  opt.body=xml
  response=await request(opt)

  response=entities.decode(response)
  json=parser.parse(response, {});
  babyJson=json['soap:Envelope']['soap:Body']['sawsoap:executeXMLQueryResult']['sawsoap:return']['sawsoap:rowset'].rowset.Row

  //child
  var xml = fs.readFileSync('./kds/genel.ejs', 'utf8');
  ejsParams={}
  ejsParams.performansGenel1= "Performans Çocuk İzlem Raporu";
  ejsParams.performansGenel2='Perf Çocuk İzlem Rapor'
  ejsParams.donem=donem
  ejsParams.name=name
  ejsParams.birim=birim
  ejsParams.sessionId=sessionId
  ejsParams.str='Hekim Kimlik Numarası'
  
  var xml = ejs.render(xml, ejsParams);
  var opt={}
  opt.method='post'
  opt.uri='https://kds.sagliknet.saglik.gov.tr/analytics/saw.dll?SoapImpl=xmlViewService'
  opt.headers= { 
                      'content-type': 'text/xml;charset=UTF-8',
                      'Connection':"Keep-Alive",
                       Host:'kds.sagliknet.saglik.gov.tr',
                       SOAPAction:"#executeXMLQuery",
                       Connection:'Keep-Alive',
                       'Accept-Encoding': 'gzip,deflate'
               },
  opt.body=xml
  response=await request(opt)

  response=entities.decode(response)
  json=parser.parse(response, {});
  childJson=json['soap:Envelope']['soap:Body']['sawsoap:executeXMLQueryResult']['sawsoap:return']['sawsoap:rowset'].rowset.Row
  //pregnant
  var xml = fs.readFileSync('./kds/genel.ejs', 'utf8');
  ejsParams={}
  ejsParams.performansGenel1= "Performans Gebe İzlem Raporu";
  ejsParams.performansGenel2='Perf Gebe İzlem Rapor'
  ejsParams.donem=donem
  ejsParams.name=name
  ejsParams.birim=birim
  ejsParams.sessionId=sessionId
  ejsParams.str='Hekim Kimlik Numarası'
  
  var xml = ejs.render(xml, ejsParams);
  var opt={}
  opt.method='post'
  opt.uri='https://kds.sagliknet.saglik.gov.tr/analytics/saw.dll?SoapImpl=xmlViewService'
  opt.headers= { 
                      'content-type': 'text/xml;charset=UTF-8',
                      'Connection':"Keep-Alive",
                       Host:'kds.sagliknet.saglik.gov.tr',
                       SOAPAction:"#executeXMLQuery",
                       Connection:'Keep-Alive',
                       'Accept-Encoding': 'gzip,deflate'
               },
  opt.body=xml
  response=await request(opt)
               
  response=entities.decode(response)
  json=parser.parse(response, {});
  pregnantJson=json['soap:Envelope']['soap:Body']['sawsoap:executeXMLQueryResult']['sawsoap:return']['sawsoap:rowset'].rowset.Row

  //kds den tüm veriler çekildi veritabanına yüklensin önce veritabanını temizle

  dbMelissa.prepare('DELETE FROM Istatistikler').run()

  for (let index = 0; index < genelJson.length; index++) {
      const g = genelJson[index];

      c="','";
      var sql="INSERT INTO Istatistikler(KKKisiSayisi,GhKisiSayisi,GebeSayisi,GebeIzlemGereken,GebeIzlemYapilan,BebekSayisi,BebekIzlemGereken,BebekIzlemYapilan,CocukSayisi,CocukIzlemGereken,CocukIzlemYapilan,BcgGereken,"
      sql+="BcgYapilan,SuCiccekGereken,SuCicekYapilan,OpaGereken,OpaYapilan,KpaGereken,KpaYApilan,KKKGereken,KKKYapilan,HebGereken,HebYapilan,HeaGereken,HeaYapilan,DihGereken,DihYapilan,BitimKodu,HekimTC,ZamanAyKodu)"
      sql+="VALUES('";
      for (let index2 = 0; index2 < 30; index2++) {        
          if(index2!=29) sql+=g['Column'+index2]+c
          else  sql+=g['Column'+index2]
      }  
      sql+="')";
      dbMelissa.prepare(sql).run()
      
   }
   
   dbMelissa.prepare('DELETE FROM PerBebekAsiRapor').run()
   for (let index = 0; index < VaccineJson.length; index++) {
        const g = VaccineJson[index];
  
        c="','";
        var sql="INSERT INTO PerBebekAsiRapor(AsiDozu,HekimTC,HastaTC,BirimKodu,HastaAdSoyad,YilAy,AsiAdi,AsiIlkTarih,AsiYapilanTarih,AsiSonTarih)"
        
        sql+="VALUES('";
        for (let index2 = 0; index2 < 10; index2++) {        
            if(index2!=9) sql+=g['Column'+index2]+c
            else  sql+=g['Column'+index2]
        }  
        sql+="')";
        dbMelissa.prepare(sql).run()
        
     }

     dbMelissa.prepare('DELETE FROM PerfBebekIzlemRapor').run()
     for (let index = 0; index < babyJson.length; index++) {
          const g = babyJson[index];
          c="','";
          var sql="INSERT INTO PerfBebekIzlemRapor(BebekKimlikNo,BebekAdSoyad,IzlemIlkTarih,IzlemYapilanTarih,IzlemSonTarih,HekimKimlikNo,ZamanAyKodu,BirimKodu)"
          
          sql+="VALUES('";
          for (let index2 = 0; index2 <8; index2++) {        
              if(index2!=7) sql+=g['Column'+index2]+c
              else  sql+=g['Column'+index2]
          }  
          sql+="')";
          dbMelissa.prepare(sql).run()
          
       }
       dbMelissa.prepare('DELETE FROM PerfCocukIzlemRapor').run()
       for (let index = 0; index < childJson.length; index++) {
          const g = childJson[index];
    
          c="','";
          var sql="INSERT INTO PerfCocukIzlemRapor(HastaTc,HastaAdSoyad,IzlemIlkTarih,IzlemYapilanTarih,IzlemSonTarih,BirimKodu,YilAy,HekimTc)"      
          sql+="VALUES('";
          for (let index2 = 0; index2 <8; index2++) {        
              if(index2!=7) sql+=g['Column'+index2]+c
              else  sql+=g['Column'+index2]
          }  
          sql+="')";
          dbMelissa.prepare(sql).run()
          
       }
       dbMelissa.prepare('DELETE FROM PerfGebeIzlemRapor').run()
       for (let index = 0; index < pregnantJson.length; index++) {
          const g = pregnantJson[index];
    
          c="','";
          var sql="INSERT INTO PerfGebeIzlemRapor(GebeSonAdetTarihi,GebeKimlikNo,GebeAdSoyad,GebelikSonlanmaTarihi,IzlemIlkTarih,IzlemYapilanTarih,IzlemSonTarih,BirimKodu,HekimKimlikNo,ZamanAyKod)"      
          sql+="VALUES('";
          for (let index2 = 0; index2 <10; index2++) {        
              if(index2!=9) sql+=g['Column'+index2]+c
              else  sql+=g['Column'+index2]
          }  
          sql+="')";
          dbMelissa.prepare(sql).run()
          
       }
};

	