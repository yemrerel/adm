const uuidv1 = require('uuid/v1');
const ejs = require('ejs');
const fs =require('fs');

const rp = require('request-promise');
KullaniciAdi=45556055678
Parola='Zt55667854'

//var parser = require('xml2json');

//-----------------------------------------------------------------------------------AsiUygulama-------------------------------------******-0
module.exports.AsiUygulama=async function(a){

        const url= 'https://testwsats.saglik.gov.tr/entegrasyonV2/EntegrasyonServisi.svc';
        var xml = fs.readFileSync('./ats/AsiUygulama.xml', 'utf8');
        
 
    
        var xml = ejs.render(xml, a);
    
        opt = {
            uri:url,
            method: 'POST',
            headers : {
                'Content-Type': 'text/xml;charset=UTF-8',
                SOAPAction: "ats.saglik.gov.tr/IEntegrasyonServisi/AsiUygulama",
             },
            body:xml,          
          };
          rp(opt)
          .then(function (body) { 
                console.log(JSON.stringify(body))
          })
          .catch(function (err) {
                     console.log(err)                 
           });
        
    };
    
    
    
    // var ats=require('./ats/atsFunctions');
    //  date=new Date()
    //  AsiUygulama={
    //     KullaniciAdi:45556055678,
    //     Parola:'Zt55667854',
    //     OnlineProtokolNo:'',
    //     SorguNumarasi:'',
    //     UygulamaZamani:''
    // }
    
    // ats.AsiUygulama(AsiUygulama)
    
    
    //-----------------------------------------------------------------------------------AsiUygulama-------------------------------------******-1
    


//-----------------------------------------------------------------------------------AsiKullanilabilirlikSorgusu-------------------------------------******-0
module.exports.AsiKullanilabilirlikSorgusu=async function(a){


//    <sor:AsininSaglandigiKaynak><%=AsininSaglandigiKaynak %></sor:AsininSaglandigiKaynak>

    const url= 'https://testwsats.saglik.gov.tr/entegrasyonV2/EntegrasyonServisi.svc';
    var xml = fs.readFileSync('./ats/AsiKullanilabilirlikSorgusu.xml', 'utf8');
    a.KullaniciAdi=KullaniciAdi
    a.Parola=Parola
    var xml = ejs.render(xml, a);

    opt = {
        uri:url,
        method: 'POST',
        headers : {
            'Content-Type': 'text/xml;charset=UTF-8',
            SOAPAction: "ats.saglik.gov.tr/IEntegrasyonServisi/AsiKullanilabilirlikSorgusu",
         },
        body:xml,          
      };
      rp(opt)
      .then(function (body) { 
            console.log(JSON.stringify(body))
      })
      .catch(function (err) {
                 console.log(err)                 
       });
    
};



// var ats=require('./ats/atsFunctions');
//  date=new Date()
//  AsiKullanilabilirlikSorgusu={
//     KullaniciAdi:45556055678,
//     Parola:'Zt55667854',
//     AsiKodu:1,
//     AsininSaglandigiKaynak:1,
//     DogumTarihi:date.toISOString(),
//     DozBilgisi:1,
//     GeziciHizmetMi:1,
//     HekimKimlikNo:45556055678,
//     KirilimBilgisi:'1',
//     OnlineProtokolNo:'123123123123',
//     SonKullanmaTarihi:date.toISOString(),
//     StokBarkod:1,
//     StokPartiNo:1,
//     StokSeriNo:1,
//     UygulanacakKisiId:45556055678,
//     UygulanacakKisiTipi:'Vatandas'
    
// }

// ats.AsiKullanilabilirlikSorgusu(AsiKullanilabilirlikSorgusu)


//-----------------------------------------------------------------------------------AsiKullanilabilirlikSorgusu-------------------------------------******-1


//-----------------------------------------------------------------------------------TuketimSorgusu-------------------------------------******-0
module.exports.TuketimSorgusu=async function(a){

    const url= 'https://testwsats.saglik.gov.tr/entegrasyonV2/EntegrasyonServisi.svc';
    var xml = fs.readFileSync('./ats/TuketimSorgusu.xml', 'utf8');
    


    var xml = ejs.render(xml, a);

    opt = {
        uri:url,
        method: 'POST',
        headers : {
            'Content-Type': 'text/xml;charset=UTF-8',
            SOAPAction: "ats.saglik.gov.tr/IEntegrasyonServisi/TuketimSorgusu",
         },
        body:xml,          
      };
      rp(opt)
      .then(function (body) { 
            console.log(JSON.stringify(body))
      })
      .catch(function (err) {
                 console.log(err)                 
       });
    
};



// var ats=require('./ats/atsFunctions');
//  date=new Date()
//  TuketimSorgusu={
//     KullaniciAdi:45556055678,
//     Parola:'Zt55667854',
//     Barkod:'',
//     SeriNo:'',
//     PartiNo:'',
//     TCKN:''
// }

// ats.TuketimSorgusu(TuketimSorgusu)


//-----------------------------------------------------------------------------------TuketimSorgusu-------------------------------------******-1



//-----------------------------------------------------------------------------------UygulamaSorgusu-------------------------------------******-0
module.exports.UygulamaSorgusu=async function(a){

    const url= 'https://testwsats.saglik.gov.tr/entegrasyonV2/EntegrasyonServisi.svc';
    var xml = fs.readFileSync('./ats/UygulamaSorgusu.xml', 'utf8');
    


    var xml = ejs.render(xml, a);

    opt = {
        uri:url,
        method: 'POST',
        headers : {
            'Content-Type': 'text/xml;charset=UTF-8',
            SOAPAction: "ats.saglik.gov.tr/IEntegrasyonServisi/UygulamaSorgusu",
         },
        body:xml,          
      };
      rp(opt)
      .then(function (body) { 
            console.log(JSON.stringify(body))
      })
      .catch(function (err) {
                 console.log(err)                 
       });
    
};


// var ats=require('./ats/atsFunctions');
//  date=new Date()
//  UygulamaSorgusu={
//     tckn:45556055678,
//     SorguNo:'Zt55667854',
// }

// ats.UygulamaSorgusu(UygulamaSorgusu)


//-----------------------------------------------------------------------------------UygulamaSorgusu-------------------------------------******-1


//-----------------------------------------------------------------------------------UygulamaSorgusuV2-------------------------------------******-0
module.exports.UygulamaSorgusuV2=async function(a){

    const url= 'https://testwsats.saglik.gov.tr/entegrasyonV2/EntegrasyonServisi.svc';
    var xml = fs.readFileSync('./ats/UygulamaSorgusu.xml', 'utf8');
    


    var xml = ejs.render(xml, a);

    opt = {
        uri:url,
        method: 'POST',
        headers : {
            'Content-Type': 'text/xml;charset=UTF-8',
            SOAPAction: "ats.saglik.gov.tr/IEntegrasyonServisi/UygulamaSorgusuV2",
         },
        body:xml,          
      };
      rp(opt)
      .then(function (body) { 
            console.log(JSON.stringify(body))
      })
      .catch(function (err) {
                 console.log(err)                 
       });
    
};


// var ats=require('./ats/atsFunctions');
//  date=new Date()
//  UygulamaSorgusuV2={
//     KullaniciAdi:45556055678,
//     Parola:'Zt55667854',
//     AsiKodu:'',
//     DozBilgisi:'',
//     HekimKimlikNo:'',
//     SorguNumarasi:'',
//     UygulamaZamani:'',
//     UygulananKisiId:'',
//     UygulananKisiTipi:''
// }

// ats.UygulamaSorgusuV2(UygulamaSorgusuV2)


//-----------------------------------------------------------------------------------UygulamaSorgusuV2-------------------------------------******-1