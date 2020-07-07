
const Database = require('better-sqlite3');
const dbSkrs = new Database('skrs.db', { });
const dbMelissa = new Database('melissa.db', { });
var moment=require('moment')
const uuidv1 = require('uuid/v1');
var sys=require('../sys/SYS')

  
module.exports.index=function(req,res){
  if(req.session.user==undefined){
    res.render('login',{layout: false});
  }
  else  res.render('hasta');
   

}
  
module.exports.islemYerlerFilter=function(req,res){
  console.log(req.body)
  yerler = dbSkrs.prepare("SELECT * FROM Kurumlar where ILKODU="+ params.doktorunKurumu.ILKODU+" AND ILCEKODU="+params.doktorunKurumu.ILCEKODU).all()

   res.json(yerler)

}

module.exports.asiKaydet=function(req,res){
  //AH=req.session.user.AH
  asi=JSON.parse(JSON.stringify(req.body))
  console.log(asi)
  ASI_SORGU_NUMARASI=-1
  if(asi.islemTuru==1){//ats den sorgu no al
      // var ats=require('../ats/atsFunctions')

      // AsiKullanilabilirlikSorgusu={      
      //     AsiKodu:asi.asiAdi,
      //     AsininSaglandigiKaynak:asi.asiKaynak,
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
      ASI_SORGU_NUMARASI=1
  }

  c="','"
  sql="INSERT INTO Hasta_Asi (HastaId,ASI,ASI_YAPILMA_ZAMANI,Karekod,ASININ_UYGULAMA_SEKLI,ASI_DOZU,ASI_ISLEM_TURU,ASI_SORGU_NUMARASI,ISLEM_YAPAN,IZLEMIN_YAPILDIGI_YER,BILGI_ALINAN_KISI_TEL,BILGI_ALINAN_KISI_ADI_SOYADI,ASI_OZEL_DURUM_NEDENI,ASININ_UYGULAMA_YERI,Lot) VALUES  ('"
  sql+=req.session.hasta.Id+c+asi.asiAdi+c+ moment(asi.asiTar).format('DD.MM.YYYY')+c+asi.karekod+c+asi.uygulamaSekli+c+asi.asiDoz+c+asi.islemTuru+c+ASI_SORGU_NUMARASI+c+asi.islemYapan+c+asi.islemYer+c+asi.BATel+c+asi.BAadSoyad+c+asi.ASI_OZEL_DURUM_NEDENI+c+asi.uygulamaYeri+c+asi.lotNo
  sql+="')"
  dbMelissa.prepare(sql).run()


    sbForm={}
    sbForm.ASI_SORGU_NUMARASI=ASI_SORGU_NUMARASI
    IZLEMIN_YAPILDIGI_YER=-1
    ASI_OZEL_DURUM_NEDENI=-1
    ASI_SORGU_NUMARASI=-1

    
    if(asi.asiDoz==9){//
      sbForm.ASI_OZEL_DURUM_NEDENI={}
      sbForm.ASI_OZEL_DURUM_NEDENI.KODU=asi.ASI_OZEL_DURUM_NEDENI
      sbForm.ASI_OZEL_DURUM_NEDENI.ADI=dbSkrs.prepare('select * from ASI_OZEL_DURUM_NEDENI where KODU='+asi.ASI_OZEL_DURUM_NEDENI).get().ADI
    }
    sbForm.ASI={}
    sbForm.ASI.KODU=asi.asiAdi
    sbForm.ASI.ADI=dbSkrs.prepare('select * from Asilar where KODU='+asi.asiAdi).get().ADI

    sbForm.ASI_DOZU={}
    sbForm.ASI_DOZU.KODU=asi.asiDoz
    sbForm.ASI_DOZU.ADI=dbSkrs.prepare('select * from AsiDoz where KODU='+asi.asiDoz).get().ADI

    sbForm.ASININ_UYGULAMA_SEKLI={}
    sbForm.ASININ_UYGULAMA_SEKLI.KODU=asi.uygulamaSekli
    sbForm.ASININ_UYGULAMA_SEKLI.ADI=dbSkrs.prepare('select * from AsiUygulamaSekli where KODU='+asi.uygulamaSekli).get().ADI
    
    sbForm.ASININ_UYGULAMA_YERI={}
    sbForm.ASININ_UYGULAMA_YERI.KODU=asi.uygulamaYeri
    sbForm.ASININ_UYGULAMA_YERI.ADI=dbSkrs.prepare('select * from AsiUygulamaYeri where KODU='+asi.uygulamaYeri).get().ADI
    
    sbForm.ASININ_UYGULAMA_YERI={}
    sbForm.ASININ_UYGULAMA_YERI.KODU=asi.uygulamaYeri
    sbForm.ASININ_UYGULAMA_YERI.ADI=dbSkrs.prepare('select * from AsiUygulamaYeri where KODU='+asi.uygulamaYeri).get().ADI

    sbForm.ASI_ISLEM_TURU={}
    sbForm.ASI_ISLEM_TURU.KODU=asi.islemTuru
    sbForm.ASI_ISLEM_TURU.ADI=dbSkrs.prepare('select * from AsiIslemTuru where KODU='+asi.islemTuru).get().ADI

    if(asi.islemTuru==2){//beyana dayalı
     sbForm.ISLEM_YAPAN=asi.islemYapan
     sbForm.BILGI_ALINAN_KISI_ADI_SOYADI=asi.BAadSoyad
     sbForm.BILGI_ALINAN_KISI_TEL=asi.BATel
      
    }
    else sbForm.ASI_SORGU_NUMARASI=1//ats den çekince buraya al
    sbForm.IZLEMIN_YAPILDIGI_YER={}
      sbForm.IZLEMIN_YAPILDIGI_YER.KODU=asi.islemYer
      sbForm.IZLEMIN_YAPILDIGI_YER.ADI=dbSkrs.prepare('select * from Kurumlar where KODU='+asi.islemYer).get().ADI
    sbForm.ASI_YAPILMA_ZAMANI=moment(asi.asiTar).format('YYYYMMDDHHmm')

    sbForm.SYSTakipNo=req.session.hasta.SysTakipNO
    sys.AsiVeriSeti(sbForm)



  res.json({asi:asi.asiAdi,doz:asi.asiDoz,tarih:moment().format('DD.MM.YYYY')});


}
module.exports.asiErtKaydet=function(req,res){
  AH=req.session.user.AH
  form=JSON.parse(JSON.stringify(req.body))
  console.log(form)
  if(form.ASI_ERTELEME_SURESI==undefined)form.ASI_ERTELEME_SURESI=''
  if(form.ASI_YAPILMA_ZAMANI==undefined)form.ASI_YAPILMA_ZAMANI=''
  if(form.alttaYatanhastalik==undefined)form.alttaYatanhastalik=''
  else{
    form.alttaYatanhastalik=JSON.parse(form.alttaYatanhastalik).kod
  }
  c="','"
  sql="INSERT INTO Hasta_Asi_Erteleme (hastaId,ASI,ASININ_DOZU,ASI_ERTELEME_SURESI,ASI_YAPILMAMA_DURUMU,ASI_YAPILMAMA_NEDENI,aciklama,ASI_YAPILMA_ZAMANI,islemZamani,ALTTA_YATAN_HASTALIK) VALUES ('"
  sql+=req.session.hasta.Id+c+form.asiAdi+c+form.ertAsiDoz+c+form.ASI_ERTELEME_SURESI+c+form.ASI_YAPILMAMA_DURUMU+c+form.ASI_YAPILMAMA_NEDENI+c+form.AsiErtAciklama+c+form.ASI_YAPILMA_ZAMANI+c+moment().format('YYYYMMDDHHmm')+c+form.alttaYatanhastalik 
  sql+="')"
  dbMelissa.prepare(sql).run()

  sbForm={}
  sbForm.PAKETE_AIT_ISLEM_ZAMANI=moment().format('YYYYMMDDHHmm')

  sbForm.ASI={}
  sbForm.ASI.KODU=form.asiAdi
  sbForm.ASI.ADI=dbSkrs.prepare('select * from Asilar where KODU='+form.asiAdi).get().ADI

  sbForm.ASININ_DOZU={}
  sbForm.ASININ_DOZU.KODU=form.ertAsiDoz
  sbForm.ASININ_DOZU.ADI=dbSkrs.prepare('select * from AsiDoz where KODU='+form.ertAsiDoz).get().ADI

  sbForm.ASI_YAPILMAMA_DURUMU={}
  sbForm.ASI_YAPILMAMA_DURUMU.KODU=form.ASI_YAPILMAMA_DURUMU
  sbForm.ASI_YAPILMAMA_DURUMU.ADI=dbSkrs.prepare('select * from ASI_YAPILMAMA_DURUMU where KODU='+form.ASI_YAPILMAMA_DURUMU).get().ADI

  if(form.ASI_YAPILMAMA_DURUMU==1){
     sbForm.ASI_ERTELEME_SURESI=form.ASI_ERTELEME_SURESI
     if(form.ertAsiDoz==9 && form.ASI_YAPILMAMA_NEDENI==11){
      sbForm.ALTTA_YATAN_HASTALIK={}
      sbForm.ALTTA_YATAN_HASTALIK.KODU=alttaYatanhastalik
      sbForm.ALTTA_YATAN_HASTALIK.ADI=dbSkrs.prepare('select * from ICD10 where KODU='+form.ASI_YAPILMAMA_DURUMU).get().ADI

     }
  }
  sbForm.ASI_YAPILMAMA_NEDENI={}
  sbForm.ASI_YAPILMAMA_NEDENI.KODU=form.ASI_YAPILMAMA_NEDENI
  sbForm.ASI_YAPILMAMA_NEDENI.ADI=dbSkrs.prepare('select * from ASI_YAPILMAMA_NEDENI where KODU='+form.ASI_YAPILMAMA_NEDENI).get().ADI
  if(form.ASI_YAPILMAMA_DURUMU==2){
   
    if(form.ASI_YAPILMAMA_NEDENI==12 | form.ASI_YAPILMAMA_NEDENI==13) sbForm.ASI_YAPILMA_ZAMANI= moment(form.ASI_YAPILMA_ZAMANI).format('YYYYMMDDHHmm')
  }


  sbForm.ASI_YAPILMA_ZAMANI=moment(form.ASI_YAPILMA_ZAMANI).format('YYYYMMDDHHmm')

sbForm.SYSTakipNo=req.session.hasta.SysTakipNO
sys.AsiErtelemeVeriSeti(sbForm)

  res.json({asi:form.asiAdi,doz:form.ertAsiDoz,tarih:moment().format('DD.MM.YYYY'),yapilmaDurum:form.ASI_YAPILMAMA_DURUMU});

}

module.exports.asiEtkiKaydet=function(req,res){
  form=JSON.parse(JSON.stringify(req.body))
  console.log(form)
  
  c="','"
  sql="INSERT INTO Hasta_Asi_Yan_Etki (hastaId,ASI,ASININ_DOZU,ASIE_ORTAYA_CIKIS_TARIHI,ASI_UYGULAMA_YERI,BILDIRIMI_ZORUNLU_ASI_SONRASI_ISTENMEYEN_ETKI_NEDENI) VALUES ('"
  sql+=req.session.hasta.Id+c+form.asiAdi+c+form.etkiAsiDoz+c+form.etkiTar+c+form.uygulamaYeri+c+form.BILDIRIMI_ZORUNLU_ASI_SONRASI_ISTENMEYEN_ETKI_NEDENI
  sql+="')"
  dbMelissa.prepare(sql).run()



   sbForm={}

   sbForm.ASI={}
   sbForm.ASI.KODU=form.asiAdi
   sbForm.ASI.ADI=dbSkrs.prepare('select * from Asilar where KODU='+form.asiAdi).get().ADI

   sbForm.ASININ_DOZU={}
   sbForm.ASININ_DOZU.KODU=form.etkiAsiDoz
   sbForm.ASININ_DOZU.ADI=dbSkrs.prepare('select * from AsiDoz where KODU='+form.etkiAsiDoz).get().ADI

   sbForm.ASI_UYGULAMA_YERI={}
   sbForm.ASI_UYGULAMA_YERI.KODU=form.uygulamaYeri
   sbForm.ASI_UYGULAMA_YERI.ADI=dbSkrs.prepare('select * from AsiUygulamaYeri where KODU='+form.uygulamaYeri).get().ADI

   sbForm.ASIE_ORTAYA_CIKIS_TARIHI=moment(form.etkiTar).format('YYYYMMDDHHmm')

   sbForm.BILDIRIMI_ZORUNLU_ASI_SONRASI_ISTENMEYEN_ETKI_NEDENI={}
   sbForm.BILDIRIMI_ZORUNLU_ASI_SONRASI_ISTENMEYEN_ETKI_NEDENI.KODU=form.BILDIRIMI_ZORUNLU_ASI_SONRASI_ISTENMEYEN_ETKI_NEDENI
   sbForm.BILDIRIMI_ZORUNLU_ASI_SONRASI_ISTENMEYEN_ETKI_NEDENI.ADI=dbSkrs.prepare('select * from BILDIRIMI_ZORUNLU_ASI_SONRASI_ISTENMEYEN_ETKI_NEDENI where KODU='+form.BILDIRIMI_ZORUNLU_ASI_SONRASI_ISTENMEYEN_ETKI_NEDENI).get().ADI

   sbForm.SYSTakipNo=req.session.hasta.SysTakipNO
   sys.AsiSonrasiIstenmeyenEtkiVeriSeti(sbForm)

   res.json({});

}



module.exports.hastaEkle=function(req,res){
  var params = {}

  stmt = dbSkrs.prepare('SELECT * FROM IsDurumu WHERE AKTIF = 1;');
  params.IsDurumu = stmt.all();

  stmt = dbSkrs.prepare("SELECT * FROM YabanciHastaTuru WHERE AKTIF = 1;");
  params.YabancıHastaTürü = stmt.all();

  stmt = dbSkrs.prepare("SELECT * FROM KanGrubu WHERE AKTIF = 1;");
  params.KanGrubu = stmt.all();

  stmt = dbSkrs.prepare('SELECT * FROM MedeniHali WHERE AKTIF = 1;');
  params.MedeniHali = stmt.all();

  stmt = dbSkrs.prepare('SELECT * FROM Meslekler WHERE AKTIF = 1;');
  params.Meslekler = stmt.all();

  stmt = dbSkrs.prepare('SELECT * FROM UlkeKodu WHERE AKTIF = 1;');
  params.UlkeKodlari = stmt.all();

  stmt = dbSkrs.prepare('SELECT * FROM OgrenimDurumu WHERE AKTIF = 1;');
  params.OgrenimDurumu = stmt.all();

  stmt = dbSkrs.prepare('SELECT * FROM OzurlulukDurumu WHERE AKTIF = 1;');
  params.OzurlulukDurumu = stmt.all();

  stmt = dbSkrs.prepare('SELECT * FROM SosyalGüvenceDurumu WHERE AKTIF = 1;');
  params.SosyalGüvenceDurumu = stmt.all();

  stmt = dbSkrs.prepare('SELECT * FROM Il WHERE AKTIF = 1;');
  params.İller = stmt.all();

  stmt = dbSkrs.prepare('SELECT * FROM Cinsiyet WHERE AKTIF = 1;');
  params.Cinsiyet = stmt.all();

  stmt = dbSkrs.prepare('SELECT * FROM Cinsiyet WHERE AKTIF = 1;');
  params.Cinsiyet = stmt.all();

  stmt = dbSkrs.prepare('SELECT * FROM HastaTipi WHERE AKTIF = 1;');
  params.HastaTipi = stmt.all();

  res.render('hastaEklemeSayfası',params);

   
}

module.exports.hastaEklePost=async function(req,res){
 
  var form=req.body;
  
        if(form.uyruk==undefined){form.uyruk=9980}//default türk 
        if(form.geldigiUlke==undefined){form.geldigiUlke='9980'}//default türk 
        if(form.evtel==undefined){form.evtel=0}
        if(form.istel==undefined){form.istel=0}
        if(form.ceptel==undefined){form.ceptel=0}
        if(form.dogumSirasi==undefined){form.dogumSirasi=0}

        var ölümTarihi="12.12.12";

        var ölümü=0;
        var özelDurum=0;
        //------------------------------------------
        if(form.calisiyor==undefined){
            form.meslek=-1;//çalışmıyo
            form.isDurumu=1;//çalışmıyor(işsiz) kodu
            form.gelirDurumu=-1;
        }
        //------------------------------------------
        if(form.passNo==undefined){form.passNo=0}
        if(form.yupass==undefined){form.yupass=0}
        if(form.yabanciHastaTuru==undefined){form.yabanciHastaTuru=0}
       //------------------------------------------
       if(form.misafir==undefined){form.misafir=0; }      
       //------------------------------------------
       if(form.diyabet==undefined){form.diyabet=0}
       //------------------------------------------
       if(form.obezite==undefined){form.obezite=0}
       //------------------------------------------
       if(form.kanser==undefined){form.kanser=0}      
       //------------------------------------------
       if(form.ozurlulukDurumu==undefined){form.ozurlulukDurumu=97}// yok   
       if(form.ahKaytar==''){form.ahKaytar='12.12.18'}      
   
       
       if(form.gebLoh==undefined){
        form.gebe=0;
        form.lohusa=0;
       }
       if(form.gebLoh=="gebe"){
        form.gebe=1;
        form.lohusa=0;
       }
       if(form.gebLoh=="lohusa"){
        form.gebe=0;
        form.lohusa=1;
       }
       


       //------------------------------------------
       if(form.hastaKabuldeOncelikliKisi==undefined){form.hastaKabuldeOncelikliKisi=0;}
       if(form.geziciSaglikHizmetiAliyor==undefined){form.geziciSaglikHizmetiAliyor=false;}
       else form.geziciSaglikHizmetiAliyor=true
       //------------------------------------------
       if(form.ozurlulukDurumu==undefined){form.ozurlulukDurumu=1;}//özürlülük yok kodu
  var m=require('../Mernis.js');
   mernis=await m.BilesikKisiveAdresSorgula(form.tc)
   KimlikOnay=0
   Olu=0
   OlumTarihi=''
   SentToMsvs=0
   OzelDurum=0
   image=''
   var anneTc=''//mernis.Sonuc.TCVatandasiKisiKutukleri.KisiBilgisi.AnneTCKimlikNo;
   var babaTc=''//mernis.Sonuc.TCVatandasiKisiKutukleri.KisiBilgisi.BabaTCKimlikNo;
   PasaportNo=''
   SysTakipNO=''
      if(mernis.TCVatandasiKisiKutukleri!=0) {
        KimlikOnay=1
      }
     
    var esTc="0"
   // esTc alamıyoz
      console.log(form)
  
       sql=`INSERT INTO Hasta(Id,Ad,Soyad,Cinsiyet,DogumTarihi,Uyruk,DogumYeri,MedeniHal,KanGurubu,SosyalGuvence,OgrenimDurum,Meslek,IsDurumu,Ozurluluk,MobilHizmet,EPosta,KimlikOnay,AileHekimi,Olu,KayitTarihi,
       SentToMsvs,KayitTuru,YeniDoganKayit_DogumSirasi,AnneTcKimlikNo,PasaportNo,AileHekimi_AdSoyad,AileHekimi_Lokasyon,AileHekimi_Birimi,ResmiDogumTarihi,YUPASS,YabanciHastaGelisTuru,
        GeldigiUlke,SysTakipNO,Image,misafir,lohusa,gebe,kanser,obezite,diyabet,gelirDurumu,AnneAd,BabaAd) values('${form.tc}','${form.isim}','${form.soyisim}','${form.cinsiyet}',
        '${form.bdt}','${form.uyruk}','${form.dogumYeri}','${form.medeniHali}','${form.kanGrubu}','${form.sosyalGuvence}','${form.ogrenimDurumu}','${form.meslek}','${form.isDurumu}','${form.ozurlulukDurumu}',
        '${form.geziciSaglikHizmetiAliyor}','${form.mail}','${KimlikOnay}','${form.ahBirimi}','${Olu}','${form.ahKaytar}','${SentToMsvs}','${form.HastaTipi}','${form.dogumSirasi}','${anneTc}','${form.passNo}',
        '${form.ahAdSoyad}','${form.ahLokasyon}','${form.ahBirimi}','${form.dogumTarihi}','${form.yupass}','${form.yabanciHastaTuru}','${form.geldigiUlke}','${SysTakipNO}','${image}',
        '${form.misafir}','${form.lohusa}','${form.gebe}','${form.kanser}','${form.obezite}','${form.diyabet}','${form.gelirDurumu}','${form.anneAd}','${form.babaAd}')`
       
        console.log(sql)

       dbMelissa.prepare(sql).run()
      

       var stmt = dbMelissa.prepare('INSERT INTO hasta_ozgecmis VALUES (?,?,?,?,?,?,?,?,?,?,?)');
       stmt.run(form.tc,0,0,0,0,0,0,0,0,0,0);
       adresKodu=''
       ADRES_KODU_SEVIYESI=4
       var stmt = dbMelissa.prepare('INSERT INTO Hasta_Adres_Iletisim VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
       stmt.run(form.tc,form.il,form.ilce,form.mahalle,form.koy,form.ickapi,form.diskapi,form.acikAdres,form.mail,form.evtel,form.ceptel,form.istel,adresKodu,ADRES_KODU_SEVIYESI);

    
     
 


  res.redirect("/");
  
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
  return age;

}
async function getDF(hasta){
  DF={}

  DF.kanGrubu=''
  DF.MedeniHal=''
  DF.kanGrubu='-'
  DF.SosyalGuvence='Belirtilmedi'
  if(hasta.ilkgebelikYasi=='-') DF.ilkgebelikYasi=''
  if(hasta.misafir==1){DF.kayıtTürü='Misafir'}else{DF.kayıtTürü='Kesin Kayıtlı'}
  DF.dogumTar=moment(hasta.ResmiDogumTarihi).format('YYYY-MM-DD').toString()
  DF.beyanDogumTar=moment(hasta.DogumTarihi).format('YYYY-MM-DD').toString()

  if(hasta.MedeniHal!=0&&hasta.MedeniHal!='') DF.medenihal=dbSkrs.prepare("SELECT * FROM MedeniHali WHERE KODU="+hasta.MedeniHal).get().ADI
  DF.evlenmeYasi=hasta.evlenmeYasi
  if(hasta.KanGurubu!='-') DF.kanGrubu=dbSkrs.prepare("SELECT * FROM KanGrubu WHERE KODU="+hasta.KanGurubu).get().ADI
  DF.skrsMedenihal=dbSkrs.prepare("SELECT * FROM MedeniHali WHERE AKTIF=1").all()
  DF.skrsKanGrubu=dbSkrs.prepare("SELECT * FROM KanGrubu WHERE AKTIF=1").all()
  DF.skrsSosyalGuvence=dbSkrs.prepare("SELECT * FROM SosyalGüvenceDurumu WHERE AKTIF=1").all()

  if(hasta.SosyalGuvence!=99) DF.sosyalGuvence=dbSkrs.prepare("SELECT * FROM SosyalGüvenceDurumu WHERE KODU ="+hasta.SosyalGuvence).get().ADI

  return DF

}
async function getAi(tc){
  ai={}
  hai = dbMelissa.prepare("SELECT * FROM Hasta_Adres_Iletisim WHERE tc="+tc).get();
  if(hai!=undefined){
      if(hai.il!=undefined&& hai.il!=''){
          stmt = dbSkrs.prepare("SELECT * FROM Il where KODU="+ hai.il);
          ai.il= stmt.get().ADI;
      }
      if(hai.ilce!=undefined&& hai.ilce!=''){
          stmt = dbSkrs.prepare("SELECT * FROM Ilce where KODU="+ hai.ilce);
          ai.ilce= stmt.get().ADI;
      }
      if(hai.mahalle!=undefined&& hai.mahalle!=''){
          stmt = dbSkrs.prepare("SELECT * FROM Mahalle where KODU="+ hai.mahalle);
          ai.mahalle= stmt.get().ADI;
      }
      if(hai.koy!=undefined&& hai.koy!=''){
          stmt = dbSkrs.prepare("SELECT * FROM Koy where KODU="+ hai.koy);
          ai.koy= stmt.get().ADI;
      }
      if(hai.icKapi!=undefined) ai.icKapi= hai.icKapi
      if(hai.disKapi!=undefined) ai.disKapi= hai.disKapi
      if(hai.acikAdres!=undefined) ai.acikAdres= hai.acikAdres
      if(hai.evtel!=undefined) ai.evtel= hai.evtel
      if(hai.ceptel!=undefined) ai.ceptel= hai.ceptel
      if(hai.istel!=undefined) ai.istel= hai.istel
      if(hai.mail!=undefined) ai.mail= hai.mail
  }
      
  return ai;

}
module.exports.hastaProfiliPost=async function(req,res){

  

  var hasta=req.body.isim;
  var tc=hasta.split(" ")[0];
  var params={};
  a = dbMelissa.prepare("SELECT * FROM Hasta_Asi where HastaId="+tc).all();


//   a=dbMelissa.prepare("SELECT * FROM KisaMynTanilar where HastaId="+tc).all();
// console.log(JSON.stringify(a))


  params.hasta = dbMelissa.prepare("SELECT * FROM Hasta where Id="+tc).get();
  req.session.hasta=params.hasta
  params.hasta.age=getAge(params.hasta.DogumTarihi)
  params.hastanınKronikHastalıkları = dbMelissa.prepare("SELECT * FROM HastaKronikHastaliklar where HastaId="+tc).all();

  HASTA_OZGEÇMİŞ = dbMelissa.prepare("SELECT * FROM hasta_ozgecmis where HastaId="+tc).all()[0];
      if(HASTA_OZGEÇMİŞ.DuzenliIlacKullanimi!=0){ params.hasta_ilacları=HASTA_OZGEÇMİŞ.DuzenliIlacKullanimi.split('?')}
      else{params.hasta_ilacları=undefined}
      
      if(HASTA_OZGEÇMİŞ.GecirdigiOperasyonlar!=0) params.hasta_ameliyat=HASTA_OZGEÇMİŞ.GecirdigiOperasyonlar.split('?')
      else{params.hasta_ameliyat=undefined}

      if(HASTA_OZGEÇMİŞ.Alerjileri!=0) params.hasta_alerji=HASTA_OZGEÇMİŞ.Alerjileri.split('?')
      else{params.hasta_alerji=undefined}

  params.asilar = dbSkrs.prepare("SELECT * FROM asilar WHERE AKTIF = 'true';").all();
  params.asiuygulamasekli = dbSkrs.prepare("SELECT * FROM asiuygulamasekli WHERE AKTIF = 'true';").all();
  params.asikaynak = dbSkrs.prepare("SELECT * FROM asikaynak WHERE AKTIF = 'true';").all();
  params.asiuygulamayeri = dbSkrs.prepare("SELECT * FROM asiuygulamayeri WHERE AKTIF = 'true';").all();
  params.asidoz = dbSkrs.prepare("SELECT * FROM asidoz WHERE AKTIF = 'true';").all();
  params.kronikHastalıklar = dbSkrs.prepare("SELECT * FROM Kronikhastaliklar LIMIT 100;").all();
  params.ilaclar = dbSkrs.prepare("SELECT * FROM Ilac LIMIT 100;").all();
    req.session.hasta=params.hasta;

    params.DF= await getDF(params.hasta)
    params.ai=await getAi(params.hasta.Id)
    params.aileBilgileri = dbMelissa.prepare("SELECT * FROM Hasta_Aile_Bilgileri WHERE hastaId="+params.hasta.Id).all()
    for (let index = 0; index <  params.aileBilgileri.length; index++) {
        if(params.aileBilgileri!=undefined){
            const e =  params.aileBilgileri[index];
            if(e.yakinlik=='Annesi'){
              params.DF.anneAd=e.yAd+' '+e.ySoyad
            }
            if(e.yakinlik=='Babası'){
              params.DF.babaAd=e.yAd+' '+e.ySoyad
            }
        }     
    }

    params.hasta_hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Hasta_Gruplari INNER JOIN Hasta_Gruplari on Hasta_Hasta_Gruplari.grupId=Hasta_Gruplari.grupId WHERE Hasta_Hasta_Gruplari.hastaId="+params.hasta.Id).all()
    params.hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Gruplari ").all()
    res.render('hastaProfili',params);
    

}

module.exports.hastaKronik=function(req,res){

        var secilenKronikler=req.query.secilenKronikler;
        var hastaId=req.session.hasta.Id;
     
        stmt = dbMelissa.prepare("DELETE FROM HastaKronikHastaliklar where HastaId="+hastaId);
        stmt.run();
     
        if (secilenKronikler!=undefined) {
              secilenKronikler.forEach(e => {
                   stmt=dbMelissa.prepare("INSERT INTO HastaKronikHastaliklar (HastaId,ICD,Tani_Adi,BasTarih) VALUES ('"+hastaId+"','"+e.KODU+"','"+e.ADI+"','"+Date()+"');");
                   stmt.run()
              });
        } 
}
module.exports.hastailac=function(req,res){

     var secilenilaclar=req.query.secilenilaclar;
     var hastaId=req.session.hasta.Id;
     var strilaclar='';
    if (secilenilaclar!=undefined) {
        secilenilaclar.forEach(e => {
            strilaclar+='?'+e.ADI;
        });
        strilaclar = strilaclar.substring(1);
    } 
    var sql="UPDATE hasta_ozgecmis SET DuzenliIlacKullanimi='"+strilaclar+"' where HastaId="+hastaId+";";
    stmt=dbMelissa.prepare(sql);
    stmt.run()
}
module.exports.hastaAmeliyat=function(req,res){

    var secilenameller=req.query.secilenameller;
    var hastaId=req.session.hasta.Id;
    var stramel='';
    if (secilenameller!=undefined) {
        secilenameller.forEach(e => {
             stramel+='?'+e.ADI;
        });
        stramel = stramel.slice(1);
    } 
    var sql="UPDATE hasta_ozgecmis SET GecirdigiOperasyonlar='"+stramel+"' where HastaId="+hastaId+";";
    stmt=dbMelissa.prepare(sql);
    stmt.run()

}
module.exports.hastaAlerji=function(req,res){
 
  var secilenler=req.query.secilenalerjiler;
  var hastaId=req.session.hasta.Id;
  var stralerjiler='';
  if (secilenler!=undefined) {
      secilenler.forEach(e => {
          stralerjiler+='?'+e.ADI;
      });
      stralerjiler = stralerjiler.substring(1);
  } 
  var sql="UPDATE hasta_ozgecmis SET Alerjileri='"+stralerjiler+"' where HastaId="+hastaId+";";
  stmt=dbMelissa.prepare(sql);
  stmt.run()
}

module.exports.kısaAnamnez=function(req,res){
  var fs = require('fs');
 
  fs.exists('reports/recete.pdf', function(exists) {
    if(exists) {
      fs.unlink('reports/recete.pdf', (error) => { /* handle error */ });
    } 
  });
  var hasta=req.session.hasta;
  var params={};
  params.hasta=hasta    

  sql = "SELECT * FROM ICD10 WHERE AKTIF = 1 LIMIT 50;"
  stmt = dbSkrs.prepare(sql);
  params.ICDLER=stmt.all();

  sql = "SELECT * FROM ReceteTuru WHERE AKTIF = 1;"
  stmt = dbSkrs.prepare(sql);
  params.receturu=stmt.all();

  sql = "SELECT * FROM SevkNedeni WHERE AKTIF = 1;"
  stmt = dbSkrs.prepare(sql);
  params.sevkNedeni=stmt.all();

  sql = "SELECT * FROM Il;"
  stmt = dbSkrs.prepare(sql);
  params.iller=stmt.all();

  sql = "SELECT * FROM klinikler;"
  stmt = dbSkrs.prepare(sql);
  params.klinikler=stmt.all();

  sql = "SELECT * FROM Meslekler;"
  stmt = dbSkrs.prepare(sql);
  params.Meslekler=stmt.all();

  sql = "SELECT * FROM MeslekiMaruziyetDurumu;"
  params.MeslekiMaruziyetDurumu=dbSkrs.prepare(sql).all();

  sql = "SELECT * FROM VakaTipi;"
  params.VakaTipi=dbSkrs.prepare(sql).all();

  sql = "SELECT * FROM TaniTürü;"
  params.TaniTuru=dbSkrs.prepare(sql).all();

      res.render('kısaAnamnez',params);   
  
}

module.exports.recete=function(req,res){
    var hasta=req.session.hasta;
    const form = JSON.parse(JSON.stringify(req.body))

    var tanılar=form.tanilar;


    if(tanılar==undefined){
        tanılar=req.session.tanilar;
    }
    var params={};
    params.hasta=hasta    

    sql = "SELECT * FROM ReceteTuru WHERE AKTIF = 1;"
    stmt = dbSkrs.prepare(sql);
    params.receteTuru=stmt.all();
  
    sql = "SELECT * FROM ilac WHERE AKTIF = 1 LIMIT 50;"
    stmt = dbSkrs.prepare(sql);
    params.ilaclar=stmt.all();
  
    sql = "SELECT * FROM KullanimSekli WHERE AKTIF = 1;"
    stmt = dbSkrs.prepare(sql);
    params.kullanımSekli=stmt.all();
  
    sql = "SELECT * FROM KullanimPeriyoduBirimi WHERE AKTIF = 1;"
    stmt = dbSkrs.prepare(sql);
    params.KullanimPeriyoduBirimi=stmt.all();
    params.SecilenTanılar=tanılar

    res.render('kısaAnamnez-recete',params);

}

module.exports.kısaAnamnezBitir=function(req,res){
  
  res.render('hastaprofili');

}
module.exports.kısaAnamnezTanılarıKaydet=async function(req,res){
  
  var form = JSON.parse(JSON.stringify(req.body))
  console.log(form)
  hasta  = dbMelissa.prepare("SELECT * FROM Hasta WHERE Id="+form.hastaId+";").get();
  mynId=uuidv1().toString()
  // bilinmeyen parametreler
  AH=req.session.user.AH
  sysno=hasta.SysTakipNO;
  //-------------------------
   hastaId=form.hastaId;
   secilenTanilar=JSON.parse(form.secilenTanilar)
   c="','";
   var sql="";
  for (let i = 0; i < secilenTanilar.length; i++) {
      sql="INSERT INTO KisaMynTanilar(AH,HastaId,ICD,isAnaTani,tarih,mynId) ";
      sql+="VALUES('";
      var isAnaTani=0;
      if(secilenTanilar[i].taniTuru=="Ana Tanı"){isAnaTani=1;}
      sql+=AH+c+hastaId+c+secilenTanilar[i].kod+c+isAnaTani+c+moment().format('YYYY-MM-DD HH:mm:ss')+c+mynId
      sql+="')";
      stmt=dbMelissa.prepare(sql).run()
    
  }
 
  sbForm={}
  sbForm.SYSTakipNo=hasta.SysTakipNO
  sbForm.HASTA_RECETE_BILGILERI=-1
  sbForm.HASTA_RAPOR_BILGILERI=-1
  sbForm.CHECK_UP_BILGISI=-1
  sbForm.PAKETE_AIT_ISLEM_ZAMANI=moment().format('YYYYMMDDHHmm') 
  sbForm.MUAYENE_BASLANGIC_TARIHI=-1
  sbForm.MUAYENE_BITIS_TARIHI=moment().format('YYYYMMDDHHmm')
  sbForm.EPIKRIZ_BILGISI=-1
  sbForm.TANI_BILGISI=[]
  for (let i = 0; i < secilenTanilar.length; i++) {
    sbForm.TANI_BILGISI[i]={ADI:secilenTanilar[i].isim,KODU:secilenTanilar[i].kod}
    sql+=AH+c+hastaId+c+secilenTanilar[i].kod+c+isAnaTani+c+moment().format('YYYY-MM-DD HH:mm:ss')+c+mynId
  }
  sbForm.BOY_KILO_BILGILERI=-1
  sbForm.MUAYENE_BILGILERI=1
  await sys.MuayeneKayit(sbForm)



  formMaruziyet=JSON.parse(form.MESLEKI_MARUZIYET)
  
  if(formMaruziyet.length!=0){
      SBform={}
      SBform.SYSTakipNo=req.session.hasta.SysTakipNO

      if(formMaruziyet[0].maruzMeslek!='-1'){
          SBform.MESLEK={}
          SBform.MESLEK.KODU=formMaruziyet[0].maruzMeslek
          SBform.MESLEK.ADI=dbSkrs.prepare("SELECT * FROM Meslekler WHERE KODU="+formMaruziyet[0].maruzMeslek).get().ADI
      }
      else  SBform.MESLEK=-1

      MESLEKI_MARUZIYET_DURUMU=[]
      for (let index = 0; index < formMaruziyet.length; index++) {
          const e = formMaruziyet[index].MeslekiMaruziyetDurumu;
          const k = formMaruziyet[index].maruziyetKod;

          MESLEKI_MARUZIYET_DURUMU[index]={}
          MESLEKI_MARUZIYET_DURUMU[index].KODU=e
          MESLEKI_MARUZIYET_DURUMU[index].ADI=dbSkrs.prepare("SELECT * FROM MeslekiMaruziyetDurumu WHERE KODU="+e).get().ADI           

          MESLEKI_MARUZIYET_DURUMU[index].ICDKODU=k
          MESLEKI_MARUZIYET_DURUMU[index].ICDADI=dbSkrs.prepare("SELECT * FROM ICD10 WHERE KODU='"+k+"'").get().ADI   
               
      }
      SBform.MESLEKI_MARUZIYET_DURUMU=MESLEKI_MARUZIYET_DURUMU

      await sys.MeslekiMaruziyetPaketi(SBform)
  }

//bulaşıcı hastalık
BULASICI_HASTALIK_BILDIRIM=JSON.parse(form.BULASICI_HASTALIK_BILDIRIM)
klnikTarih=BULASICI_HASTALIK_BILDIRIM.klnikTarih
if(BULASICI_HASTALIK_BILDIRIM.taniTur!=undefined){
    SBform={}
    SBform.SYSTakipNo=req.session.hasta.SysTakipNO
    SBform.KLINIK_BELIRTILERIN_BASLADIGI_TARIH=new Date(BULASICI_HASTALIK_BILDIRIM.klnikTarih).toISOString().replace(/[^0-9]/g, "").slice(0, -5)

    SBform.VAKA_TIPI={}
    SBform.VAKA_TIPI.KODU=BULASICI_HASTALIK_BILDIRIM.vakaTipi
    SBform.VAKA_TIPI.ADI=dbSkrs.prepare("SELECT * FROM VakaTipi WHERE KODU="+BULASICI_HASTALIK_BILDIRIM.vakaTipi).get().ADI

    SBform.TANI_TURU={}
    SBform.TANI_TURU.KODU=BULASICI_HASTALIK_BILDIRIM.taniTur
    SBform.TANI_TURU.ADI=dbSkrs.prepare("SELECT * FROM TaniTürü WHERE KODU="+BULASICI_HASTALIK_BILDIRIM.taniTur).get().ADI

    SBform.ICD10={}
    SBform.ICD10.KODU=BULASICI_HASTALIK_BILDIRIM.bulacisiKod
    SBform.ICD10.ADI=dbSkrs.prepare("SELECT * FROM ICD10 WHERE KODU='"+BULASICI_HASTALIK_BILDIRIM.bulacisiKod+"'").get().ADI

    await sys.BulasiciHastalikBildirimVeriSetiPaketi(SBform)
}

  res.send(mynId);

}

module.exports.rapor=function(req,res){

    var params={};
    params.hasta=req.session.hasta;
    var sql = "SELECT * FROM ICD10 WHERE AKTIF = 1 LIMIT 50;"
    stmt = dbSkrs.prepare(sql);
    params.ICDLER=stmt.all();
    res.render('hasta-Rapor',params);
}
module.exports.istem=function(req,res){

  var hasta=req.session.hasta;
  var params={};
  params.hasta=hasta

  stmt = dbSkrs.prepare('SELECT * FROM ICD10 WHERE AKTIF = 1 LIMIT 100;');
  params.ICDLER=stmt.all();

  stmt = dbSkrs.prepare('SELECT * FROM ReceteTuru WHERE AKTIF = 1;');
  params.receturu=stmt.all();

  stmt = dbSkrs.prepare('SELECT * FROM SevkNedeni WHERE AKTIF = 1;');
  params.sevkNedeni=stmt.all();

  stmt = dbSkrs.prepare('SELECT * FROM Il;');
  params.Sehirler=stmt.all();

  sql = "SELECT * FROM klinikler;"
  stmt = dbSkrs.prepare(sql);
  params.klinikler=stmt.all();

  res.render('istem_sonuc',params);

   

}
module.exports.detaylı=function(req,res){
  var hasta=req.session.hasta;
  var params={
    hasta:hasta
  };


  res.render('hasta-detaylı',params);
  
}

module.exports.detaylı2=function(req,res){

  var hasta=req.session.hasta;

  req.session.detaylıAnamnez1=req.body;
  var params={
    hasta:hasta,
  };

  res.render('hasta-detaylı2',params);

}

module.exports.detaylı3=function(req,res){

    var hasta=req.session.hasta;

    req.session.detaylıAnamnez2=req.body;

    var params={};
    params.detaylıAnamnez1=req.body

    params.hasta=hasta
    params.hasta.age=getAge(hasta.DogumTarihi);
    stmt = dbMelissa.prepare("SELECT * FROM HastaKronikHastaliklar where HastaId="+ params.hasta.Id);
    params.hastanınKronikHastalıkları=stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Kronikhastaliklar LIMIT 100;");
    params.kronikHastalıklar=stmt.all();
    req.session.hasta=hasta;
   params.detayli2=req.body

    res.render('hasta-detaylı3',params);
    

 

}
module.exports.detaylı4=function(req,res){

  var hasta=req.session.hasta;

  req.session.detaylıAnamnez1=req.body;
  var params={
    hasta:hasta
  };



  res.render('hasta-detaylı4',params);

}

module.exports.detaylı5=function(req,res){

  var hasta=req.session.hasta;

  req.session.detaylıAnamnez1=req.body;
  var params={
    hasta:hasta
  };

  

  res.render('hasta-detaylı5',params);

}
module.exports.detaylı6=function(req,res){
  var params={};

  var hasta=req.session.hasta;
  params.hasta=hasta
  req.session.detaylıAnamnez1=req.body;


   
  var sql = "SELECT * FROM ICD10 WHERE AKTIF = 1 LIMIT 100;"
  stmt = dbSkrs.prepare(sql);
  params.ICDLER=stmt.all();

  console.log(JSON.stringify(req.body))
  console.log()

  console.log(JSON.stringify(params))
      res.render('hasta-detaylı6',params);



}

module.exports.detaylı7=function(req,res){

  var hasta=req.session.hasta;
  var tanılar=req.body.tanilar;
  req.session.tanilar=tanılar;
//  req.session.detaylıAnamnez1=req.body;
  var params={};
  params.hasta=hasta

  stmt = dbSkrs.prepare('SELECT * FROM ICD10 WHERE AKTIF = 1 LIMIT 100;');
  params.ICDLER=stmt.all();

  stmt = dbSkrs.prepare('SELECT * FROM SevkNedeni WHERE AKTIF = 1;');
  params.SevkNedeni=stmt.all();

  stmt = dbSkrs.prepare('SELECT * FROM Il;');
  params.Sehirler=stmt.all();

  sql = "SELECT * FROM klinikler;"
  stmt = dbSkrs.prepare(sql);
  params.klinikler=stmt.all();

  res.render('hasta-detaylı7',params);

}

module.exports.fizikMyn=function(req,res){

  var hasta=req.session.hasta;



      var params={
          hasta:hasta,
        
      };


      res.render('fizikMyn',params);


}
module.exports.gebeBildirim=function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    if(form.akrabaEvliligi==undefined){form.akrabaEvliligi=0;}
    kayıtzamanı=moment().format('YYYY-MM-DD HH:mm:ss')
    sysGondermeTarih=' '
    PROTOKOLNO='A-'+req.session.user.AH+'-2-001-A-'+moment().format('DDMMYYYYHHmmss');
    sentSys=0
    c="','";
    var sql="INSERT INTO GebeBildirim(HastaId,KayitZamani,TespitTarihi,SonAdetTarihi,AkrabaEvliligi,AkrabaEvliligiDerecesi,AnneninKanGurubu,BabaninKanGurubu,KacinciGebelik,Aciklama,KaydedenTcNo,SysGondermeTarihi,SysTakipNo,PorotokolNo,sentSys,DusukSayisi,oncekiDogumDurumu,konjenitalAnom)"
    sql+="VALUES('";
    sql+=form.hastaTC+c+kayıtzamanı+c+form.tespitTar+c+moment(form.sonAdetTar).format('YYYYMMDDHHmm') +c+form.akrabaEvliligi+c+form.akrabaEvliligiDerecesi+c+form.kanGrubu+c+form.eskanGrubu+c+form.kacinciGebelik+c+form.gebeBildirimAciklama
    sql+=c+req.session.user.Tc+c+sysGondermeTarih+c+req.session.hasta.SysTakipNO+c+PROTOKOLNO+c+sentSys+c+form.DusukSayisi+c+form.oncekiDogumDurumu+c+form.konanomali
    sql+="')";
    var stmt = dbMelissa.prepare(sql);
    stmt.run()
    dbMelissa.prepare("UPDATE Hasta SET gebe ='1' where Id="+form.hastaTC).run()


console.log(moment(form.sonAdetTar).format('YYYYMMDDHHmm') )


    var sys=require('../sys/SYS')
    SBform={}
    SBform.BIR_ONCEKI_DOGUM_DURUMU={}
    SBform.BIR_ONCEKI_DOGUM_DURUMU.KODU=form.oncekiDogumDurumu
    SBform.BIR_ONCEKI_DOGUM_DURUMU.ADI=dbSkrs.prepare("SELECT * FROM OncekiDogumDurumu where KODU="+form.oncekiDogumDurumu).get().ADI

    SBform.SON_ADET_TARIHI=moment(form.sonAdetTar).format('YYYYMMDDHHmm') 
    SBform.SYSTakipNo=req.session.hasta.SysTakipNO
    sysno=sys.GebeBildirimVeriSeti(SBform)
    if(sysno!=null)  res.send(true)
    else  res.send(false)
  
  }
   
  module.exports.sigaraGuncelle=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var hasta=req.session.hasta;
  
    console.log(form)
    var sql="UPDATE hasta_ozgecmis SET SigaraKullanimi='"+form.sigDurum+"',SigaraAdedi='"+form.sigAdet+"' where HastaId="+hasta.Id+";";
    stmt=dbMelissa.prepare(sql).run()


    if(form.sbGonder==1 & form.sigDurum==1){
       sbForm={}
       HASTA_OZGEÇMİŞ = dbMelissa.prepare("SELECT * FROM hasta_ozgecmis where HastaId="+hasta.Id).get()
       SIGARA_ADEDI=-1
       BAGIMLI_OLDUGU_URUN=[]
       if(HASTA_OZGEÇMİŞ.SigaraKullanimi==1){
          SIGARA_ADEDI=HASTA_OZGEÇMİŞ.SigaraAdedi
       }
       BAGIMLI_OLDUGU_URUN[0]={ADI:'SİGARA',KODU:2}

       sbForm.SIGARA_ADEDI=SIGARA_ADEDI
       sbForm.BAGIMLI_OLDUGU_URUN=BAGIMLI_OLDUGU_URUN
       sbForm.SYSTakipNo=hasta.SysTakipNO
       sys.TütünKullanimiVeriSeti(sbForm)
    }
        res.send(true)
  }

  module.exports.alkolGuncelle=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var hasta=req.session.hasta;
  
    console.log(form)
    var sql="UPDATE hasta_ozgecmis SET AlkolKullanimi='"+form.sigDurum+"' where HastaId="+hasta.Id+";";
    stmt=dbMelissa.prepare(sql).run()  
        res.send(true)
  }

  module.exports.maddeGuncelle=function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var hasta=req.session.hasta;
  
    console.log(form)
    var sql="UPDATE hasta_ozgecmis SET MaddeKullanimi='"+form.sigDurum+"' where HastaId="+hasta.Id+";";
    stmt=dbMelissa.prepare(sql).run()
        res.send(true)
  }
  