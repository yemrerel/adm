var MobileDetect = require('mobile-detect');
const uuidv1 = require('uuid/v1');
const Database = require('better-sqlite3');
const dbSkrs = new Database('skrs.db', { });
const dbMelissa = new Database('melissa.db', { });
var moment=require('moment')
var uss=require('../ussFunctions');
var mernis=require('../Mernis');
var sys=require('../sys/SYS')

var parser = require('fast-xml-parser');
var kds=require('../kds/KDS')




module.exports.ilacRaporlariniGetir=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    tesisKodu=11359904
    doktorTcKimlikNo=45556055678
  
    var request = require('request-promise');

    xml = `<soapenv:Envelope xmlns:ser="http://servisler.ws.eczane.gss.sgk.gov.tr" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header>
       <wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
          <wsse:UsernameToken>
             <wsse:Username>45556055678</wsse:Username>
             <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">16031988</wsse:Password>
          </wsse:UsernameToken>
       </wsse:Security>
    </soapenv:Header>
    <soapenv:Body>
       <ser:eraporListeSorgula>
          <!--Optional:-->
          <arg0>
             <tesisKodu>`+tesisKodu+`</tesisKodu>
             <doktorTcKimlikNo>`+doktorTcKimlikNo+`</doktorTcKimlikNo>
             <hastaTcKimlikNo>39739421558</hastaTcKimlikNo>
          </arg0>
       </ser:eraporListeSorgula>
    </soapenv:Body>
  </soapenv:Envelope> `;
  

    var hdr = {
              'Content-Type': 'text/xml;charset=UTF-8',
              Host: 'medeczane.sgk.gov.tr:443',
              SOAPAction: "eraporListeSorgula"
    };
        var opt = {
           uri:'https://medeczane.sgk.gov.tr:443/medula/eczane/saglikTesisiRaporIslemleriWS',
           method: 'post',
           headers: hdr,
           body:xml,
        };
          var hdr2 = {
              'Content-Type': 'text/xml;charset=UTF-8',
              Host: 'medeczane.sgk.gov.tr:443',
              SOAPAction: "eraporSorgula"
    };
        var opt2 = {
           uri:'https://medeczane.sgk.gov.tr:443/medula/eczane/saglikTesisiRaporIslemleriWS',
           method: 'post',
           headers: hdr2,
           body:xml,
        };

        resKodlar=await request(opt)
        json=parser.parse(resKodlar, {});

        eraporListesi=json['soapenv:Envelope']['soapenv:Body']['ns2:eraporListeSorgulaResponse']['eraporListeSorgulaReturn'].eraporListesi;
        raporKodları=[]
        raporlar=[]
        if(eraporListesi!=undefined){//rapor var
            if(eraporListesi.length==undefined){//array değil tek eleman
                raporKodları[0]=eraporListesi.raporTakipNo
            }
            else{
                for (let index = 0; index < eraporListesi.length; index++) {
                    const e = eraporListesi[index];
                    raporKodları[index]=e.raporTakipNo
                }
            }
            for (let index = 0; index < raporKodları.length; index++) {
                    const e = raporKodları[index];

                    xml2=`<soapenv:Envelope xmlns:ser="http://servisler.ws.eczane.gss.sgk.gov.tr" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
                                    <soapenv:Header>
                                    <wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
                                        <wsse:UsernameToken>
                                            <wsse:Username>45556055678</wsse:Username>
                                            <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">16031988</wsse:Password>
                                        </wsse:UsernameToken>
                                    </wsse:Security>
                                    </soapenv:Header>
                                    <soapenv:Body>
                                    <ser:eraporSorgula>
                                        <!--Optional:-->
                                        <arg0>
                                        <tesisKodu>`+tesisKodu+`</tesisKodu>
                                        <doktorTcKimlikNo>`+doktorTcKimlikNo+`</doktorTcKimlikNo>
                                            <raporTakipNo>`+e+`</raporTakipNo>
                                        </arg0>
                                    </ser:eraporSorgula>
                                    </soapenv:Body>
                                </soapenv:Envelope>`
                                var hdr2 = {
                                    'Content-Type': 'text/xml;charset=UTF-8',
                                    Host: 'medeczane.sgk.gov.tr:443',
                                    SOAPAction: "eraporSorgula"
                                 };
                                var opt2 = {
                                    uri:'https://medeczane.sgk.gov.tr:443/medula/eczane/saglikTesisiRaporIslemleriWS',
                                    method: 'post',
                                    headers: hdr2,
                                    body:xml2,
                                };
                       
                  resRaporlar=await request(opt2)
                  json=parser.parse(resRaporlar, {});
                  json=json['soapenv:Envelope']['soapenv:Body']['ns2:eraporSorgulaResponse'].eraporSorgulaReturn.eraporDVO
                  raporlar[index]=json     

            }

        }        


    res.send(raporlar)
}



module.exports.istek=function(req,res){
    
    res.render('istek')
}


module.exports.bulasiciGonder=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    console.log(form)
    SBform={}
    SBform.SYSTakipNo=req.session.hasta.SysTakipNO

    if(form.maruzMeslek!='-1'){
        SBform.MESLEK={}
        SBform.MESLEK.KODU=form.maruzMeslek
        SBform.MESLEK.ADI=dbSkrs.prepare("SELECT * FROM BebekBeslenmeDurumu WHERE KODU="+form.maruzMeslek).get().ADI
    }
    else  SBform.MESLEK=-1

    SBform.MESLEKI_MARUZIYET_DURUMU={}
    SBform.MESLEKI_MARUZIYET_DURUMU.KODU=form.MeslekiMaruziyetDurumu
    SBform.MESLEKI_MARUZIYET_DURUMU.ADI=dbSkrs.prepare("SELECT * FROM MeslekiMaruziyetDurumu WHERE KODU="+form.MeslekiMaruziyetDurumu).get().ADI

    SBform.ICD10={}
    SBform.ICD10.KODU=form.ıcd
    SBform.ICD10.ADI=dbSkrs.prepare("SELECT * FROM ICD10 WHERE KODU='"+form.ıcd+"'").get().ADI

    await sys.MeslekiMaruziyetPaketi(SBform)
    res.send(true)
}
module.exports.taniKontrol=function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    maruziyet=dbSkrs.prepare(`SELECT * FROM ICD_MSVS WHERE MSVSKODU=69 and ICDKODU='${form.kod}'`).get()
    bulasici=dbSkrs.prepare(`SELECT * FROM ICD_MSVS WHERE MSVSKODU=68 and ICDKODU='${form.kod}'`).get()
    result=0
    if(maruziyet!=undefined) result='1'
    else if(bulasici!=undefined) result='2'
    res.json({result:result})
}

module.exports.getStatistic=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.query))
    donem=form.donem.split('/').join('')
   istatistikler=dbMelissa.prepare('SELECT * FROM Istatistikler WHERE ZamanAyKodu='+donem).all()
  
   //-----bebek
   bebekizlemRapor=dbMelissa.prepare('SELECT * FROM PerfBebekIzlemRapor WHERE ZamanAyKodu='+donem).all()
  
   //-----gebe
   gebeizlemRapor=dbMelissa.prepare('SELECT * FROM PerfGebeIzlemRapor WHERE ZamanAyKod='+donem).all()
  //---cocuk
   cocukizlemRapor=dbMelissa.prepare('SELECT * FROM PerfCocukIzlemRapor WHERE YilAy='+donem).all()
    //---aşı
    asiRapor=dbMelissa.prepare('SELECT * FROM PerBebekAsiRapor WHERE YilAy='+donem).all()

    res.json({istatistikler:istatistikler,bebekizlemRapor:bebekizlemRapor,gebeizlemRapor:gebeizlemRapor,cocukizlemRapor:cocukizlemRapor,asiRapor:asiRapor})

}


module.exports.mail=function(req,res){
    var nodemailer = require('nodemailer');
    const form = JSON.parse(JSON.stringify(req.body))

    var transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                     user: 'ephesushealing@hotmail.com',
                     pass: 'Melissa1234'
             }
    });

    var mailOptions = {
            from: 'ephesushealing@hotmail.com',
            to: 'aras.oner@epheal.com',
            subject: form.subject,
            text: form.mail
    };

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
      console.log(error)
    res.send(false)
  } else {
    res.send(true)
  }
});
   
}

module.exports.index=function(req,res){
 var md = new MobileDetect(req.headers['user-agent']);
   
    if(req.session.user==undefined){
        res.render('login',{layout: false});
    }
    else{
        if(!md.mobile()){
            res.render('home',{user:req.session.user});
       }
       else{
             res.render('yönlendirme',{layout: false});
         }
    }
}
module.exports.receteKaydet=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
  var hasta=req.session.hasta
  receteId=uuidv1().toString()

  mynId=uuidv1().toString()
  AH=req.session.user.AH
  //-------------------------
   hastaId=form.hastaId;
   secilenTanilar=JSON.parse(form.tanilar)
   c="','";
   var sql="";
  for (let i = 0; i < secilenTanilar.length; i++) {
      sql="INSERT INTO KisaMynTanilar(AH,HastaId,ICD,isAnaTani,tarih,mynId) ";
      sql+="VALUES('";
      var isAnaTani=0;
      if(secilenTanilar[i].taniTuru=="Ana Tanı"){isAnaTani=1;}
      sql+=AH+c+hasta.Id+c+secilenTanilar[i].kod+c+isAnaTani+c+moment().format('YYYY-MM-DD HH:mm:ss')+c+mynId
      sql+="')";
      stmt=dbMelissa.prepare(sql).run()
  }

  c="','"
  ilaclar=JSON.parse(form.secilenIlaclar)
  for (let index = 0; index < ilaclar.length; index++) {
      const ilac = ilaclar[index];
      sql="INSERT OR IGNORE INTO Hasta_Recete (ReceteId,IlacKodu,KSekli,Birimi,Periyodu,Doz1,Doz2,Kutu,Aciklama,Tarih,HastaId,mynId) VALUES" 
      sql+="('"+receteId+c+ilac.barkod+c+ilac.kullanimsekli+c+ilac.birimi+c+ilac.kullanimperiyodu+c+ilac.doz1+c+ilac.doz2+c+ilac.kutu+c+ilac.aciklama+c+moment().format('YYYY-MM-DD HH:mm:ss')+c+hasta.Id+c+mynId+"');"
      stmt = dbMelissa.prepare(sql).run()
  }

  sbForm={}
  sbForm.SYSTakipNo=hasta.SysTakipNO
  sbForm.HASTA_RECETE_BILGILERI=1
  sbForm.RECETE_TARIHI=moment().format('YYYYMMDDHHmm')    
  sbForm.RECETE_NUMARASI=uuidv1().toString()
  sbForm.RECETE_TURU={}
  sbForm.RECETE_TURU.ADI='Normal'
  sbForm.RECETE_TURU.KODU=1
  

  sbForm.HEKIM_KIMLIK_NUMARASI=req.session.user.Tc
  sbForm.ILAC_BILGISI=[]
  for (let i = 0; i < ilaclar.length; i++) {
    const ilac = ilaclar[i];
    sbForm.ILAC_BILGISI[i]={ILAC_BARKODU:ilac.barkod,ILAC_ADI:dbSkrs.prepare("SELECT * FROM Ilac where BARKODU="+ilac.barkod).get().ADI,KUTU_ADETI:ilac.kutu,
                                ILAC_KULLANIM_SEKLI:{ADI:dbSkrs.prepare("SELECT * FROM KullanimSekli where KODU="+ilac.kullanimsekli).get().ADI,KODU:ilac.kullanimsekli},
                                ILAC_KULLANIM_SAYISI:ilac.doz1,
                                ILAC_KULLANIM_DOZU:ilac.doz2,
                                ILAC_KULLANIM_PERIYODU:ilac.kullanimperiyodu,
                                ILAC_KULLANIM_PERIYODU_BIRIMI:{ADI:dbSkrs.prepare("SELECT * FROM KullanimPeriyoduBirimi where KODU="+ilac.birimi).get().ADI,KODU:ilac.birimi},
                                ILAC_ACIKLAMA:ilac.aciklama
                            }
  }



  sbForm.HASTA_RAPOR_BILGILERI=-1
  sbForm.CHECK_UP_BILGISI=-1
  sbForm.PAKETE_AIT_ISLEM_ZAMANI=moment().format('YYYYMMDDHHmm')
  sbForm.MUAYENE_BASLANGIC_TARIHI=-1
  sbForm.MUAYENE_BITIS_TARIHI=moment().format('YYYYMMDDHHmm')
  sbForm.EPIKRIZ_BILGISI=-1
  sbForm.TANI_BILGISI=[]
  for (let i = 0; i < secilenTanilar.length; i++) {
    sbForm.TANI_BILGISI[i]={ADI:secilenTanilar[i].ad,KODU:secilenTanilar[i].kod}
  }
  sbForm.BOY_KILO_BILGILERI=-1
  sbForm.MUAYENE_BILGILERI=1
  await sys.MuayeneKayit(sbForm)

  res.send(true)
}

module.exports.kaydetDF=function(req,res){
    
const form = JSON.parse(JSON.stringify(req.body))


   
var sql="UPDATE Hasta SET AnneAd='"+form.anneAd+"' , BabaAd='"+form.babaAd+"' , SosyalGuvence='"+form.sosyalGuvence+"' , ResmiDogumTarihi='"+form.dogumTar+"' , DogumTarihi='"
sql+=form.dogumTarBeyan+"' , MedeniHal='"+form.medeniHal +"' , CanliDogum='"+form.canliDogumSayisi +"' , ilkgebelikYasi='"+form.ilkGebelikYasi+"' , cocukSayisi='"+form.cocukSayisi+"' , gebelikSayisi='"+form.gebelikSayisi
sql+="' , dusukSayisi='"+form.dusukSayisi+"' , KanGurubu='"+form.kanGrubu +"' where Id="+form.hastaTc+";";
dbMelissa.prepare(sql).run()


  res.send(true);

}
module.exports.hastaFilter=function(req,res){
    
    var input=req.body.input.toLocaleUpperCase('tr-TR')

  var sql = "SELECT * FROM hasta WHERE Id like '%"+input+"%' or Ad like '%"+input+"%' or Soyad like '%"+input+"%' ;"
  stmt = dbMelissa.prepare(sql);
  results = stmt.all();
  res.json({hastalar:results});

}

module.exports.guncelleHome=async  function(req,res){
    //kds
    const form = JSON.parse(JSON.stringify(req.body))
    donem=form.donem.split('/').join('')
    result={}
    dbMelissa.prepare('delete FROM Istatistikler ').run()
   
    await kds.logon(donem)
    var sql="UPDATE User SET SonGuncellemeTarih="+donem+" where Tc="+req.session.user.Tc+";";
    dbMelissa.prepare(sql).run()
    
    // uss den yeni eklenen hastaları çekip db ye ekle
     GetBirimeYeniEklenenHastaListesi=await uss.GetBirimeYeniEklenenHastaListesi(req.session.user.SonGuncellemeTarih)
     await YeniHastalarıDByeEkle(GetBirimeYeniEklenenHastaListesi.sonuc)
     YeniHastalar = dbMelissa.prepare("SELECT * FROM Hasta WHERE SentToMsvs="+0).all()
        if(YeniHastalar.length!=0){
            result.YeniHastalar=YeniHastalar 
        }
    await YeniHastalarıSYSyeGonder()
  //await labSonuclarınıAl()

  res.send(result)

}
async function YeniHastalarıSYSyeGonder() {

     sql = "SELECT * FROM Hasta WHERE SentToMsvs="+0
     hastalar = dbMelissa.prepare(sql).all()
     for (let index = 0; index < hastalar.length; index++) {
            const h = hastalar[index];

            if(h.Id!=undefined){
                form={}
                form.AD=h.Ad
                form.SOYAD=h.Soyad
                form.DOGUM_TARIHI=new Date(h.ResmiDogumTarihi).toISOString().replace(/[^0-9]/g, "").slice(0, -5) 
                form.CINSIYET_KODU=h.Cinsiyet
                form.CINSIYET_ADI = dbSkrs.prepare("SELECT * FROM Cinsiyet where KODU="+h.Cinsiyet).get().ADI;
                form.UYRUK_KODU=h.Uyruk
                form.UYRUK_ADI=dbSkrs.prepare("SELECT * FROM UlkeKodu where MERNISKODU="+h.Uyruk).get().ADI;
                form.ANNE_KIMLIK_NUMARASI=''
                form.BABA_KIMLIK_NUMARASI=''
                form.GELDIGI_ULKE_KODU='-1'
                form.YABANCI_HASTA_TURU_KODU=-1
                form.YUPASS_NO=-1
                form.HASTANE_REFERANS_NUMARASI = '{{HastaneReferansNo'+uuidv1().toString()+'}}';
                sql = "SELECT * FROM Hasta_Adres_Iletisim WHERE tc="+h.Id
                console.log(h.Id)
                adres = dbMelissa.prepare(sql).get()
                
                form.ADRES_KODU=adres.adresKodu
                form.ACIK_ADRES=adres.acikAdres
                form.TELEFON_NUMARASI=adres.ceptel
                form.EPOSTA_ADRESI=adres.mail
                ilce=''
                if(adres.ilce!=null) ilce = dbSkrs.prepare("SELECT * FROM Ilce WHERE KODU="+adres.ilce).get().ADI
            
                form.ACIK_ADRES_ILCE=ilce
                form.DOGUM_SIRASI=''
                form.BEYAN_DOGUM_TARIHI=''
                form.YABANCI_HASTA_KIMLIK_NUMARASI=''
                form.PASAPORT_NO=''
                form.KIMLIKSIZ_HASTA_BILGISI=''
                form.HASTA_TIPI_KODU=h.KayitTuru
                form.HASTA_TIPI_ADI=dbSkrs.prepare("SELECT * FROM HastaTipi where KODU="+h.KayitTuru).get().ADI;
                if(h.KayitTuru==4){// Yenidoğan Kayıt
                form.DOGUM_SIRASI=h.YeniDoganKayit_DogumSirasi
                form.BEYAN_DOGUM_TARIHI=h.DogumTarihi
                form.ANNE_KIMLIK_NUMARASI=h.AnneTcKimlikNo
                }
                if(h.KayitTuru==2){// Yabancı Kayıt
                form.YABANCI_HASTA_KIMLIK_NUMARASI=h.Id
                form.PASAPORT_NO=h.PasaportNo
                }

                if(h.KayitTuru==6){// kimliksiz Kayıt
                form.KIMLIKSIZ_HASTA_BILGISI=h.Id//çkyskodu_hastakurumrefnuamrası
                }
                if(h.KayitTuru==1){// vatandaş Kayıt
                    form.HASTA_KIMLIK_NUMARASI=22964565920
                }
                sysNo=await sys.HastaKayıt(form)
                sql="UPDATE Hasta SET SentToMsvs=1 , SysTakipNO='"+sysNo+"' where Id="+h.Id+";";
                console.log(sql)
                dbMelissa.prepare(sql).run()
            }
            
     }



}

async function YeniHastalarıDByeEkle(list) {//mavikart ve lokasyon kodunu kaydetmiyoruz. 

    for (let index = 0; index < list.length; index++) {
        const e = list[index];
        //uss den hastanın iletişim bilgisiini al
        ceptel='',evtel='',istel=''

        telefonlar=await uss.GetHastaIletisimBilgileri(e.hastakimliknumarasi)

        telefonlar=telefonlar.sonuc.mhrs.concat(telefonlar.sonuc.enabiz)
        telefonlar.forEach(t => {
             if(t.telefonTipi==1){
                ceptel=t.telefonNumarasi
             }
             if(t.telefonTipi==2){
                evtel=t.telefonNumarasi
             }
             if(t.telefonTipi==3){
                istel=t.telefonNumarasi
             }
        });
        c="','"
        sql="INSERT OR IGNORE INTO Hasta (Ad,Soyad,AnneTcKimlikNo,Cinsiyet,YeniDoganKayit_DogumSirasi,DogumTarihi,ResmiDogumTarihi,MobilHizmet,Id,OlumTarihi,Uyruk) VALUES" 
        sql+="('"+e.ad+c+e.soyad+c+e.annetckimliknumarasi+c+e.cinsiyetresmi+c+e.dogumsirasi+c+e.dogumtarihi
        sql+=c+e.dogumtarihiresmi+c+e.gezicidurumu+c+e.hastakimliknumarasi+c+e.olumtarihi+c+e.uyruk+"');"
        stmt = dbMelissa.prepare(sql);
        r=stmt.run();
        var stmt = dbMelissa.prepare('INSERT OR IGNORE INTO hasta_ozgecmis VALUES (?,?,?,?,?,?,?,?,?,?,?)');
        stmt.run(e.hastakimliknumarasi , 0,0,0,0,0,0,0,0,0,0);
        hastaMedeniHalKodu='',hastaDogumYeri='',evlenmeYasi=''

        if(r.changes==1){//hasta veritabanında yokmuş yeni eklendi. O zaman mernise gönderebiliriz.  // eklenen hastaları merniste sorgula adres bilgileriinide al    
            aileBilgileri=await mernis.KimlikNoIleNufusKayitOrnegiSorgula(e.hastakimliknumarasi)

            if(aileBilgileri.NkoMaviKart!=''){ //kişi mavi kartlıysa bu ife gir.


            }
            else{//tc vatandaşı ise buraya
                kişiler=aileBilgileri.NkoVatandas.Kisiler.NkoKisi
                for (let index = 0; index < kişiler.length; index++) {// searching hasta yakınları
                    const k = kişiler[index];
                    if(k.YakinlikKod.Kod!=1){//hastanın kendisi dışındakileri aile bilgileri tablosuna ekleyelim.
                        dogumTarihi=k.TemelBilgisi.DogumTarih.Yil+'-'+k.TemelBilgisi.DogumTarih.Ay+'-'+k.TemelBilgisi.DogumTarih.Gun
                        olumTarihi=k.DurumBilgisi.OlumTarih.Yil+'-'+k.DurumBilgisi.OlumTarih.Ay+'-'+k.DurumBilgisi.OlumTarih.Gun
                        sql="INSERT or replace INTO Hasta_Aile_Bilgileri (hastaId,yTc,yakinlik,yAd,ySoyad,yCinsiyet,yDogumTarihi,yMedeniHal,yOlumTarihi,yil,yilce) VALUES" 
                        sql+="('"+e.hastakimliknumarasi+c+k.TCKimlikNo+c+k.YakinlikKod.Aciklama+c+k.TemelBilgisi.Ad+c+k.TemelBilgisi.Soyad+c+k.TemelBilgisi.Cinsiyet.Aciklama+c
                        sql+=dogumTarihi+c+k.DurumBilgisi.MedeniHal.Aciklama+c+olumTarihi+c+k.KayitYeriBilgisi.Il.Aciklama+c+k.KayitYeriBilgisi.Ilce.Aciklama
                        sql+="');"
                        stmt = dbMelissa.prepare(sql);
                        stmt.run();
                    }
                    else{//hastanın kendisininde durum bilgilerini alalım.
                        hastaMedeniHalKodu=k.DurumBilgisi.MedeniHal.Kod
                        hastaDogumYeri=k.TemelBilgisi.DogumYer
                        evlenmeYasi=getAge(k.KisiOlayTarihBilgisi.EvlenmeTarih.Gun+'-'+k.KisiOlayTarihBilgisi.EvlenmeTarih.Ay+'-'+k.KisiOlayTarihBilgisi.EvlenmeTarih.Yil)
                        
                    }
                    
                }

            }
            //Hasta adres bilgilerini Mernisten çek
            adres=await mernis.BilesikKisiveAdresSorgula(e.hastakimliknumarasi)
            if(adres.AdresBilgisi==''){//adres bilgisi yoksa merniste 
                console.log('Hastanın adres bilgisi yok merniste')
                sql="INSERT or replace INTO Hasta_Adres_Iletisim (tc,evtel,ceptel,istel) VALUES" 
                sql+="('"+e.hastakimliknumarasi+c+evtel+c+ceptel+c+istel
                sql+="');"
                stmt = dbMelissa.prepare(sql);
                stmt.run();     
	
            }
            else{
                AcikAdres=adres.AdresBilgisi.AcikAdres
                ADRES_KODU=adres.AdresBilgisi.AdresNo
                il='',ilce='',koy='',mahalle='',ickapi='',diskapi='',ADRES_KODU_SEVIYESI=0
                if(adres.AdresBilgisi.AdresTip.Kod==1){//il ilçe merkez
                    il=adres.AdresBilgisi.IlIlceMerkezAdresi.IlKodu
                    ilce=adres.AdresBilgisi.IlIlceMerkezAdresi.IlceKodu
                    mahalle=adres.AdresBilgisi.IlIlceMerkezAdresi.MahalleKodu
                    ickapi=adres.AdresBilgisi.IlIlceMerkezAdresi.IcKapiNo
                    diskapi=adres.AdresBilgisi.IlIlceMerkezAdresi.DisKapiNo
                }
                if(adres.AdresBilgisi.AdresTip.Kod==2){//belde
                    il=adres.AdresBilgisi.BeldeAdresi.IlKodu
                    ilce=adres.AdresBilgisi.BeldeAdresi.IlceKodu
                    mahalle=adres.AdresBilgisi.BeldeAdresi.MahalleKodu
                    ickapi=adres.AdresBilgisi.BeldeAdresi.IcKapiNo
                    diskapi=adres.AdresBilgisi.BeldeAdresi.DisKapiNo
                }
                if(adres.AdresBilgisi.AdresTip.Kod==3){//köy adresi
                    il=adres.AdresBilgisi.KoyAdresi.IlKodu
                    ilce=adres.AdresBilgisi.KoyAdresi.IlceKodu
                    mahalle=adres.AdresBilgisi.KoyAdresi.MahalleKodu
                    ickapi=adres.AdresBilgisi.KoyAdresi.IcKapiNo
                    diskapi=adres.AdresBilgisi.KoyAdresi.DisKapiNo
                    koy=adres.AdresBilgisi.KoyAdresi.KoyKodu
                }//yurt dışı adresi 4 oluyor galiba bilmiyorum örnek tc lerde karşıma çıkmadı evlenmeYasi
                if(ickapi!='')ADRES_KODU_SEVIYESI=8
                else if(diskapi!='')ADRES_KODU_SEVIYESI=7
                else if(mahalle!='')ADRES_KODU_SEVIYESI=5
                else if(koy!='')ADRES_KODU_SEVIYESI=4


                sql="INSERT or replace INTO Hasta_Adres_Iletisim (tc,il,ilce,mahalle,koy,icKapi,disKapi,acikAdres,evtel,ceptel,istel,adresKodu,ADRES_KODU_SEVIYESI) VALUES" 
                sql+="('"+e.hastakimliknumarasi+c+il+c+ilce+c+mahalle+c+koy+c+ickapi+c+diskapi+c+AcikAdres+c+evtel+c+ceptel+c+istel+c+ADRES_KODU+c+ADRES_KODU_SEVIYESI
                sql+="');"
                stmt = dbMelissa.prepare(sql);
                stmt.run();           
            }
            sql="UPDATE Hasta SET DogumYeri = '"+hastaDogumYeri+"',MedeniHal = '"+hastaMedeniHalKodu+"',KimlikOnay='"+1+"',evlenmeYasi='"+evlenmeYasi+"'  WHERE Id="+e.hastakimliknumarasi
            dbMelissa.prepare(sql).run()
        }
        if(e.cinsiyetresmi==2){//kadınsa kadın izlemlerini alalım

        }
    }
}

module.exports.labSonuclarınıAl=async function(req,res){

  

}	

module.exports.ilKoduylaİlçeleriGetir=function(req,res){

    var ilkodu=req.query.ilkodu;
    var sql = "SELECT * FROM Ilce WHERE ILKODU="+ilkodu+";"
    var ilceler = dbSkrs.prepare(sql).all()
      res.json({ilceler:ilceler});

}
module.exports.kurumlariGetir=function(req,res){
    
    var ilcekodu=req.query.ilcekodu;

    var sql ="SELECT * from kurumlar WHERE AKTIF=1 AND ILCEKODU="+ilcekodu+" AND KURUMTURKODU=98";
    var kurumlar = dbSkrs.prepare(sql).all()

      res.json({kurumlar:kurumlar});

}
module.exports.ilceKoduylaKöyleriGetir=function(req,res){
    
    var ilcekodu=req.query.ilcekodu;

    var sql ="SELECT DISTINCT K.ADI,K.KODU FROM Koy AS K  INNER JOIN Bucak AS B ON K.BUCAKKODU=B.KODU WHERE B.ILCEKODU="+ilcekodu;
    var koyler = dbSkrs.prepare(sql).all()

      res.json({koyler:koyler});

}

module.exports.köyKoduylaMahalleGetir=function(req,res){
    
    var koykodu=req.query.koykodu;
    var sql = "SELECT DISTINCT * FROM Mahalle WHERE KOYKODU="+koykodu+";"
    var mahalleler = dbSkrs.prepare(sql).all()
    
      res.json({mahalleler:mahalleler});   

}
module.exports.bebekDogrula= async function(req,res){
    
    const form = JSON.parse(JSON.stringify(req.body))
    
    mernisBilgileri = await mernis.KimlikNoIleNufusKayitOrnegiSorgula(form.tc)
    result={}
    result.sonuc=0
    if(mernisBilgileri.NkoVatandas!=undefined){//bebek mernise kayıtlı değil manuel gir db ye bilgileri
      
       aileBireyleri=mernisBilgileri.NkoVatandas.Kisiler.NkoKisi
       for (let index = 0; index < aileBireyleri.length; index++) {
          const a = aileBireyleri[index];
          if(a.YakinlikKod.Kod==1){//kendisi
            console.log(a)
             b=a.TemelBilgisi
             d=a.DurumBilgisi
             c="','"
             dogumTarihi=b.DogumTarih.Yil+'-'+b.DogumTarih.Ay+'-'+b.DogumTarih.Gun
             result.sonuc=1
             result.data={
                 isim:b.Ad,
                 soyisim:b.Soyad,
                 dogumTarihi:dogumTarihi,  
                 cinsiyet:b.Cinsiyet.Kod             
             }
             break        
          }
       }
    }
    
    res.json({result:result});   

}


module.exports.mernisTcSorgula=function(req,res){
    
    var tc=req.body.tc;
       const stsTestUrl = "https://kpsv2test.saglik.gov.tr/STS/STSService.svc";
   const kpsServiceTestUrl = "https://kpsv2test.saglik.gov.tr/Router/RoutingService.svc";
   const username = "test_user";
   const password = "f6)@6U:l";
   var sorgulanacakKimlikNo = tc;
   var tokenEnvelope = "";
   var kurumKodu = "123456";
   var uygulamaKodu = "8353df93-453c-4e23-8be8-2f913dd35313";
        var created=new Date();
        var expires=created;
        created=created.toISOString();
        expires.setMinutes(expires.getMinutes()+5);
        expires=expires.toISOString();

        const uuidv1 = require('uuid/v1');
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

  var request = require('request');
 
  var hdr = {
    'Content-Type': 'application/soap+xml; charset=UTF-8',
    'Connection':"Keep-Alive",

  };
  var opt = {
      method: 'post',
      headers: hdr,
      body:tokenEnvelope,
  };

  function getToken(hdr,opt, callback) {
      
    request(stsTestUrl,opt, function (error, response, body) {

      tok=body.split('<trust:RequestedSecurityToken>');

      var token=tok[1].split('</trust:RequestedSecurityToken>')[0];
      callback(token); 
   });
    
  } 
 
  getToken(hdr,opt, function(token) {

  var created=new Date();
     var expires=created;
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

     var hdr = {
      'content-type': 'application/soap+xml ;charset=UTF-8',
      'Connection':"Keep-Alive",
   };
   var opt = {
       method: 'post',
       headers: hdr,
       body:kpsRequestEnvelope,

   };
   var parser = require('fast-xml-parser');

    request(kpsServiceTestUrl,opt, function (error, response, body) {

       
       var parsingOptions = {
      
       };
       json=parser.parse(body, parsingOptions);
       json=json['s:Envelope']['s:Body']['BilesikKisiveAdresSorgulaResponse']['BilesikKisiveAdresSorgulaResult'];
       json=JSON.parse(JSON.stringify(json));
       MaviKartliKisiKutukleri=json.Sonuc.MaviKartliKisiKutukleri;
       YabanciKisiKutukleri=json.Sonuc.YabanciKisiKutukleri;
       TCVatandasiKisiKutukleri=json.Sonuc.TCVatandasiKisiKutukleri;
       var arr={AdresBilgisi:0,temelBilgiler:0};
       arr.AdresBilgisi=json.Sonuc.AdresBilgisi;;
       if(MaviKartliKisiKutukleri!=''){
        arr.temelBilgiler=MaviKartliKisiKutukleri;
        arr.hastaTipi=2
       }
       if(YabanciKisiKutukleri!=''){
        arr.temelBilgiler=YabanciKisiKutukleri;
        arr.hastaTipi=2

       }
       if(TCVatandasiKisiKutukleri!=''){
        arr.temelBilgiler=TCVatandasiKisiKutukleri;
        arr.hastaTipi=1
       }

        res.send(arr);
        
    });
   
 });

}

module.exports.kronikleriFiltrele=function(req,res){
    
    var value=req.query.value;   
  var sql = "SELECT ADI,KODU FROM kronikhastaliklar WHERE AKTIF=1 AND ADI LIKE '%"+value+"%' LIMIT 100 ;";
  stmt = dbSkrs.prepare(sql);
  results = stmt.all();
    res.send(results);
    
}
module.exports.tanilarıFiltrele=function(req,res){
    
    var value=req.query.value;

   
  var sql = "SELECT ADI,KODU FROM ICD10 WHERE AKTIF=1 AND ADI LIKE '%"+value+"%' LIMIT 100 ;";
  stmt = dbSkrs.prepare(sql);
  results = stmt.all();

        res.send(results);
}

module.exports.ilaclarıFiltrele=function(req,res){
    
    var value=req.query.value;
   
   var sql = "SELECT * FROM ilac WHERE AKTIF=1 AND ADI LIKE '%"+value+"%' LIMIT 100;";
   ilaclar = dbSkrs.prepare(sql).all()
   res.json({ilaclar:ilaclar});

}
module.exports.sablonlariGetir=function(req,res){
       
   var sql = "SELECT * FROM ReceteSablon";
   stmt = dbMelissa.prepare(sql);
   sablonlar = stmt.all();
   res.json({sablonlar:sablonlar});

}
module.exports.sablonEkle=function(req,res){
    
    var recete=req.query.secilenIlaclar;
    var sablonAdi=req.query.sablonAdi;

    var sql = "SELECT * FROM ReceteSablon where Ad='"+sablonAdi+"'";
    stmt = dbMelissa.prepare(sql);
    sablon = stmt.get();
    if(sablon!=undefined){
        res.json({result:false});
    }
    else{
        var str=''
        for (let index = 0; index < recete.length; index++) {
             e = recete[index];
             if(e.aciklama==''){
                e.aciklama=' '
             }
             str+=e.ad+'?'+e.barkod+'?'+e.kullanimperiyodu+'?'+e.doz1+'?'+e.doz2+'?'+e.kutu+'?'+e.kullanimsekli+'?'+e.aciklama+'?'+e.birimi
             if(recete.length-1!=index){
                 str+='%'
             }
        }
        c="','";
        var sql="INSERT INTO ReceteSablon (Ad,ilaclar)" 
        sql+="VALUES('";
        sql+=sablonAdi+c+str
        sql+="')";
        var stmt = dbMelissa.prepare(sql);
        stmt.run()
        res.json({result:true});
    }
   

}

module.exports.imza=function(req,res){
    

    res.render('imza');




}



module.exports.showPDF=function(req,res){
    var path=require('path');

    var fs =require('fs');

    var data =fs.readFileSync('reports/recete.pdf');
   
res.contentType("application/pdf");
res.send(data);

}



module.exports.test=function(req,res){
   
 res.render('test',{layout: true})

}

module.exports.testpost=function(req,res){

   
    

    

}


module.exports.testimzaIndex= function(req,res){

    var filepath="./output.pdf";
    var appID="21bb5a1b-c835-4cd0-92bf-8929fb9d755c";
    var pass="PhLe32Tr567*-";
    var serviceAddress="https://imzala.saglik.gov.tr";

    var callbackUrl = "http://81.215.230.183/Home/GetStatus";
    var cancelUrl = "81.215.230.183";

    const uuidv4 = require('uuid/v4');
    var customKey=uuidv4();

    var url = serviceAddress + "/uploader?action=file-upload";

    var currentTime = new Date().getTime();

    // 10,000 ticks in 1 millisecond
    // jsTicks is number of ticks from midnight Jan 1, 1970
    var jsTicks = currentTime * 10000;
   
    // add 621355968000000000 to jsTicks
    // netTicks is number of ticks from midnight Jan 1, 01 CE
    var netTicks = jsTicks + 621355968000000000;

    var fs =require('fs');

    var http = require('http');
    //-------------memstream--------------------------------------------------------------
    var wstream = fs.createWriteStream('myBinaryFile');

    //-------------memstream--------------------------------------------------------------

    const pdf2base64 = require('pdf-to-base64');
    pdf2base64(filepath)
        .then(
            (re) => {
                
                 var formdataParams = {
                  // Pass a simple key-value pair
                  "appId":appID,
                  "pass":pass,
                  "callbackUrl":callbackUrl,
                  "cancelUrl": cancelUrl,
                  "identityNo":"51286552554"
              };
                 var headerParams = {
                    "FileName":"output.pdf",
                    "Sign": "CAdES",
                    "SignTur":"Serial",
                    "SignType": "BES",
                    "SignUsage":false,
                    "base64FileData":re,
                    "customKey":customKey                
                  };
                  var request = require('request');
   

var boundary = "xxxxxxxxxx";
var data = "";
for(var i in formdataParams) {
  if ({}.hasOwnProperty.call(formdataParams, i)) {
      data += "--" + boundary + "\r\n";
      data += "Content-Disposition: form-data; name=\"" + i + "\"; \r\n\r\n" + formdataParams[i] + "\r\n";
  }
};
data += "--" + boundary + "\r\n";
data += "Content-Disposition: form-data; name=\"file\"; filename=\"" + "output.pdf" + "\"\r\n";
data += "Content-Type:application/octet-stream\r\n\r\n";

//-------------------------------------------------------------------------------------------------

  
    
   

      

//-------------------------------------------------------------------------------------------------


var payload = Buffer.concat([
      Buffer.from(data, "utf8"),
      Buffer.from(serialize.serialize(headerParams)),
      Buffer.from("\r\n--" + boundary + "--", "utf8"),
]);
var options = {
  method: 'post',
  url: url,
  headers: {"Content-Type": "multipart/form-data; boundary=" + boundary,"Content-Length":payload.length},
  body: payload,
};
request(options, function(error, response, body) {
  body=  JSON.parse(body);
  var responseUrl=serviceAddress+"/"+body.url+".aspx";
  res.render("testImza",{docID:body.transactionUUID,appID:appID,pass:pass,responseUrl:responseUrl});

});


            }
        )
        .catch(
            (error) => {
                console.log(error); //Exepection error....
            }
    )



    

}

module.exports.downloadSignedFile=function(req,res){
    var request = require('request');
    const base64 = require('base64topdf');

    res.render("downloadSignedFile");
    var words = req._parsedOriginalUrl.query.split('&');
    var success=words[0].split("=")[1];
    var documentUUID=words[1].split("=")[1];
    var downloadUrl=words[2].split("=")[1];
    var downloadAction=words[3].split("=")[1];
    var downloadParameter=words[4].split("=")[1];

    var url="https://imzala.saglik.gov.tr/"+downloadUrl+"?action=" + downloadAction;
    var myParameters = "documentUUID=" + documentUUID + "";
    var options = {
        method: 'get',
        url: url,
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: myParameters,
      };
      request(options, function(error, response, body) {

       var file= JSON.parse( body);
       var signedFile=file[0].base64FileData;
        let decodedBase64 = base64.base64Decode(signedFile, 'signedFile.pdf');
      });
}


module.exports.testimzaAndroid=function(req,res){

   

    res.render('testImzaAndroid',{layout: false});

}
module.exports.hastaGrubuEkle=function(req,res){
    
    if(req.query.yeniAd!=undefined){
            sql="INSERT into Hasta_Gruplari (ADI) VALUES ('"+req.query.yeniAd+"');"
            stmt=dbMelissa.prepare(sql).run()
            res.send({Id:stmt.lastInsertRowid,result:true})
    }
    else  res.send({result:false})
}

module.exports.hastaGruplari=function(req,res){
    
    if(req.query.secilenHgler!=undefined){
        stmt = dbMelissa.prepare("delete from Hasta_Hasta_Gruplari where hastaId="+req.query.tc).run()

        for (let index = 0; index < req.query.secilenHgler.length; index++) {
            const e = req.query.secilenHgler[index];           
            stmt = dbMelissa.prepare("INSERT into Hasta_Hasta_Gruplari (grupId,hastaId) VALUES ('"+e.grupId+"','"+req.query.tc+"');" ).run()
        }
    }
    res.send(true)

}


module.exports.renkliRecete=function(req,res){

        var crypto = require('crypto');
    doktor=req.session.user
    hasta=req.session.hasta
    if(hasta.Cinsiyet==1)hastaCinsiyeti='E'
    else hastaCinsiyeti='K'
    var json={
        kullaniciKodu:"11900012016",
        parola:"123456",
        doktorBransKodu:1400,
        doktorMedulaPassword:"0",
        hastaGsm:5005434343,
        doktorSertifikaKodu:109,
        doktorTc:11111111111,
        hastaTc:11111111111,
        protokolNo:107713,
        provizyonTip:1,
        receteAltTuru:1,
        takipNo:0,
        tesisKodu:11000001,
        yuPass:0,
        sysTakipNo:0,
        hastaneReferansNumarasi:0,
        receteAciklama:"Test reçetesidir.",
        taniListesi:JSON.parse(req.body.taniListesi),
        ilacListesi:JSON.parse(req.body.ilacListesi),
        hastaAdi:hasta.Ad,
        hastaSoyadi:hasta.Soyad,
        hastaDogumTarihi:hasta.ResmiDogumTarihi,
        hastaCinsiyeti:hastaCinsiyeti
    }
    json=JSON.stringify(json);
    var path=require('path');
    var fs = require('fs');

    var password = "ZJ=ENY'2H+0bm'oyIe6J";

    var appDir = path.dirname(require.main.filename);
    const SALT_DAT = path.join(appDir, 'salt.dat');
    const Saltcontents = fs.readFileSync(SALT_DAT);


    var saltBytes;


    saltBytes = new Buffer(Saltcontents);

 

    crypto.pbkdf2(password, saltBytes, 20000, 32, 'sha1', function (err, bytes) {
         var aeskey=bytes;
         let iv = crypto.randomBytes(16);
         var encryptedJson="";

     
          
         const cipher = crypto.createCipheriv('aes-256-cbc', aeskey, iv);
          encryptedJson = cipher.update(json, 'utf8', 'hex');
         encryptedJson += cipher.final('hex')
         var hexIV=Buffer(iv,"utf8").toString("hex");

         encryptedJson=hexIV+encryptedJson;
        

         var pem = fs.readFileSync(path.join(appDir, 'RenkliRsaPublicKey.pem'));


         // const QuickEncrypt = require('quick-encrypt')
         //      // --- Encrypt using public key ---
         // let encryptedAes = QuickEncrypt.encrypt( aeskey.toString("hex"), Buffer(publicKey,"utf8").toString("hex"))
         var encryptedAes = crypto.publicEncrypt( {key:pem,padding:crypto.constants.RSA_PKCS1_PADDING},aeskey);
         encryptedAes=encryptedAes.toString("hex");
        


         var result={
                     "encryptedJson":encryptedJson,
                     "encryptedAes":encryptedAes,
                     "platform":"1"
         }
         
         var request = require('request');


         url= "https://recetem.enabiz.gov.tr/Api/GetToken/v3.1/";


         var opt = {
             method: 'post',
             body:JSON.stringify(result),
         };

         request(url,opt, function (error, response, body) {

                var token=body;
                var url="https://recetem.enabiz.gov.tr/Api/CheckPrescription/v3.1/?token="+token;

                res.redirect(url);
         });
    });
}




function getAge(DogumTarihi){

    var birthdate =new Date(DogumTarihi);
		var now = new Date();
		var dayDif=now.getDate()-birthdate.getDate();
		var yearDif=now.getFullYear()-birthdate.getFullYear();
		var monthDif=now.getMonth()-birthdate.getMonth();

		if(dayDif<0){monthDif--;dayDif+=30;if(monthDif<0){yearDif--;monthDif+=12;}}
		else{if(monthDif<0){yearDif--;monthDif+=12;}}
		var age="";
		if(yearDif>0){age+=yearDif+" Yıl ";}
		if(monthDif>0){age+=monthDif+" Ay ";}
		if(dayDif>0){age+=dayDif+" Gün ";}
        return yearDif;

}