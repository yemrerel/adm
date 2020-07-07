const Database = require('better-sqlite3');
const dbSkrs = new Database('skrs.db', { });
const dbMelissa = new Database('melissa.db', { });
var moment=require('moment')
var sys=require('../sys/SYS')
var uss=require('../ussFunctions');
var mernis=require('../Mernis');

module.exports.index=function(req,res){

    if(req.query.izlemAdı=="kadinizlem"){
        sql="SELECT * FROM hasta WHERE gebe=0 and lohusa=0 and cinsiyet=2 and DogumTarihi <= datetime('now', '-15 years') and dogumtarihi >  datetime('now', '-49 years') ";
        stmt = dbMelissa.prepare(sql);
        data = stmt.all();
			res.render('izlemler',{ 
				izlemAdı:req.query.izlemAdı,
                izleminHastaları:data,
                user:req.session.user
			});
    }
    if(req.query.izlemAdı=="bebekcocukizlem"){
        sql="SELECT * FROM Hasta WHERE dogumtarihi >= datetime('now', '-7 years')";
        stmt = dbMelissa.prepare(sql);
        data = stmt.all();		
            res.render('izlemler',{ 
				izlemAdı:req.query.izlemAdı,
                izleminHastaları:data,
                user:req.session.user
			});
    }
    if(req.query.izlemAdı=="gebeizlem"){
        sql="SELECT * FROM Hasta WHERE Cinsiyet=2 and dogumtarihi <= datetime('now', '-12 years') and gebe=1";
        stmt = dbMelissa.prepare(sql);
        data = stmt.all();		
			res.render('izlemler',{ 
				izlemAdı:req.query.izlemAdı,
                izleminHastaları:data,
                user:req.session.user
			});
    }
    if(req.query.izlemAdı=="lohusaizlem"){
        sql="SELECT * FROM Hasta WHERE Cinsiyet=2 and dogumtarihi <= datetime('now', '-12 years') and lohusa=1";
        stmt = dbMelissa.prepare(sql);
        data = stmt.all();		
    		res.render('izlemler',{ 
				izlemAdı:req.query.izlemAdı,
                izleminHastaları:data,
                user:req.session.user
			});
    }
 

    if(req.query.izlemAdı=="yetiskinizlem"){

        sql="SELECT * FROM Hasta WHERE DogumTarihi <=datetime('now', '-7 years') and DogumTarihi > datetime('now', '-18 years') ";
        data = dbMelissa.prepare(sql).all()
                res.render('izlemler',{ 
                    izlemAdı:req.query.izlemAdı,
                    izleminHastaları:data,
                    user:req.session.user
                });
    }
    if(req.query.izlemAdı=="obeziteizlem"){
        sql="SELECT * FROM Hasta ";
        stmt = dbMelissa.prepare(sql);
        data = stmt.all();		
			res.render('izlemler',{ 
				izlemAdı:req.query.izlemAdı,
                izleminHastaları:data,
                user:req.session.user
			});
    }
    if(req.query.izlemAdı=="ozellikli"){
        sql="SELECT * FROM Hasta ";
        stmt = dbMelissa.prepare(sql);
        data = stmt.all();		
			res.render('izlemler',{ 
				izlemAdı:req.query.izlemAdı,
                izleminHastaları:data,
                user:req.session.user
			});
    }
    if(req.query.izlemAdı=="otizmizlem"){
        sql="SELECT * FROM Hasta WHERE dogumtarihi >=datetime('now', '-4 years')";
        stmt = dbMelissa.prepare(sql);
        data = stmt.all();		
            res.render('izlemler',{ 
                izlemAdı:req.query.izlemAdı,
                izleminHastaları:data,
                user:req.session.user
            });
    }
    if(req.query.izlemAdı=="kanserizlem"){
        var params={ };	
        params.hedefListe = dbMelissa.prepare("SELECT * FROM KanserHadefListe ").all()
        for (let index = 0; index < params.hedefListe.length; index++) {
            const e = params.hedefListe[index];
            params.hedefListe[index].taramalar= dbMelissa.prepare("SELECT * FROM KanserTarama WHERE HastaId="+e.HastaTc).all()
            params.hedefListe[index].kol=dbMelissa.prepare("SELECT * FROM KanserTarama WHERE KanserTuru=1 and HastaId="+e.HastaTc).all().length
            params.hedefListe[index].mm=dbMelissa.prepare("SELECT * FROM KanserTarama WHERE KanserTuru=2 and HastaId="+e.HastaTc).all().length
            params.hedefListe[index].srv=dbMelissa.prepare("SELECT * FROM KanserTarama WHERE KanserTuru=3 and HastaId="+e.HastaTc).all().length
        }
        params.HPVTipleri = dbSkrs.prepare("SELECT * FROM HPVTipleri WHERE AKTIF = 1;").all()
        params.ServikalSitoloji = dbSkrs.prepare("SELECT * FROM ServikalSitoloji WHERE AKTIF = 1;").all()
        params.TaramaTürü = dbSkrs.prepare("SELECT * FROM TaramaTuru WHERE AKTIF = 1;").all()
        params.TaramaTipi = dbSkrs.prepare("SELECT * FROM TaramaTipi WHERE AKTIF = 1;").all()
        params.GaitadaGizliKanTesti = dbSkrs.prepare("SELECT * FROM GaitadaGizliKanTesti WHERE AKTIF = 1;").all()
        params.KendiKendineMemeMuayenesi = dbSkrs.prepare("SELECT * FROM KendiKendineMemeMuayenesi WHERE AKTIF = 1;").all()
        params.KlinikMemeMuayenesi = dbSkrs.prepare("SELECT * FROM KlinikMemeMuayenesi WHERE AKTIF = 1;").all()
        params.PapSmearTesti = dbSkrs.prepare("SELECT * FROM PapSmearTesti WHERE AKTIF = 1;").all()
        params.HPVTaramaTesti = dbSkrs.prepare("SELECT * FROM HPVTaramaTesti WHERE AKTIF = 1;").all()
        params.KolonGoruntulemeYontemi = dbSkrs.prepare("SELECT * FROM KolonGoruntulemeYontemi WHERE AKTIF = 1;").all()
        params.Mamografi = dbSkrs.prepare("SELECT * FROM Mamografi WHERE AKTIF = 1;").all()
        params.MamografiSonucu = dbSkrs.prepare("SELECT * FROM MamografiSonucu WHERE AKTIF = 1;").all()
        params.Cinsiyet = dbSkrs.prepare("SELECT * FROM Cinsiyet WHERE AKTIF = 1;").all()
        params.user=req.session.user
        res.render('kanserizlem',params)
    }
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

async function getBanner(hastaTc,izlemAdı){
    banner={}
    banner.izlemAdı=izlemAdı
    banner.hasta  = dbMelissa.prepare("SELECT * FROM Hasta WHERE Id="+hastaTc+";").get();
    if(izlemAdı=='kadınizlem'){
            banner.izlemler=dbMelissa.prepare("SELECT * FROM KADIN_IZLEM WHERE HastaId="+hastaTc).all()
            for (let index = 0; index < banner.izlemler.length; index++) {
                if(banner.izlemler[index].KonjenitalDogumVarligi!=-1) banner.izlemler[index].KonjenitalDogumVarligi=dbSkrs.prepare("SELECT * FROM KonjenitalAnomali WHERE KODU="+banner.izlemler[index].KonjenitalDogumVarligi+";").get().ADI
                else banner.izlemler[index].KonjenitalDogumVarligi='Belirtilmedi'
                if(banner.izlemler[index].ApKullanmamaNedeni!=-1) banner.izlemler[index].ApKullanmamaNedeni=dbSkrs.prepare("SELECT * FROM APKullanmamaNedeni WHERE KODU="+banner.izlemler[index].ApKullanmamaNedeni+";").get().ADI
                else banner.izlemler[index].ApKullanmamaNedeni='Belirtilmedi'
                
                if(banner.izlemler[index].BirOncekiAPYontemi!=-1)  banner.izlemler[index].BirOncekiAPYontemi=dbSkrs.prepare("SELECT * FROM APOncekiYontem WHERE KODU="+banner.izlemler[index].BirOncekiAPYontemi+";").get().ADI
                else banner.izlemler[index].BirOncekiAPYontemi='Belirtilmedi'

                if(banner.izlemler[index].APYontemi!=-1)  banner.izlemler[index].APYontemi=dbSkrs.prepare("SELECT * FROM APYontemleri WHERE KODU="+banner.izlemler[index].APYontemi+";").get().ADI
                else banner.izlemler[index].APYontemi='Belirtilmedi'
               
                if(banner.izlemler[index].ApLojistigi!=-1)  banner.izlemler[index].ApLojistigi=dbSkrs.prepare("SELECT * FROM APYontemLojistik WHERE KODU="+banner.izlemler[index].ApLojistigi+";").get().ADI
                else banner.izlemler[index].ApLojistigi='Belirtilmedi'

                
                if(banner.izlemler[index].TalasemiTasiyiciligi==0){banner.izlemler[index].TalasemiTasiyiciligi='Yok'}else{banner.izlemler[index].TalasemiTasiyiciligi='Var'}
                if(banner.izlemler[index].HbsTasiyiciligi==0){banner.izlemler[index].HbsTasiyiciligi='Yok'}else{banner.izlemler[index].HbsTasiyiciligi='Var'}
                if(banner.izlemler[index].Disarda==0){banner.izlemler[index].Disarda='Hayır'}else{banner.izlemler[index].Disarda='Evet'}
                banner.izlemler[index].RiskTespitKodu=banner.izlemler[index].RiskTespitKodu.replace('%',',')
                banner.izlemler[index].UremeSaglikDanismalik=banner.izlemler[index].UremeSaglikDanismalik.replace('%',',')
                banner.izlemler[index].CybeBulguSorgulama=banner.izlemler[index].CybeBulguSorgulama.replace('%',',')
        
                if(banner.izlemler[index].RiskFaktorleri!=''){
                    RiskFaktorleri= banner.izlemler[index].RiskFaktorleri.split('%')
                    for (let i = 0; i < RiskFaktorleri.length; i++) {
                        const e = RiskFaktorleri[i];
                        if(i==0)banner.izlemler[index].RiskFaktorleri=dbSkrs.prepare("SELECT * FROM KadinSaglikRiskFaktorleri WHERE KODU="+e+";").get().ADI
                        else banner.izlemler[index].RiskFaktorleri+=','+dbSkrs.prepare("SELECT * FROM KadinSaglikRiskFaktorleri WHERE KODU="+e+";").get().ADI
                    }
                }
                if(banner.izlemler[index].SaglikIslemler!=''){
                    SaglikIslemler= banner.izlemler[index].SaglikIslemler.split('%')
                    for (let i = 0; i < SaglikIslemler.length; i++) {
                        const e = SaglikIslemler[i];
                        if(i==0)banner.izlemler[index].SaglikIslemler=dbSkrs.prepare("SELECT * FROM KadinSaglikIslemleri WHERE KODU="+e+";").get().ADI
                        else banner.izlemler[index].SaglikIslemler+=','+dbSkrs.prepare("SELECT * FROM KadinSaglikIslemleri WHERE KODU="+e+";").get().ADI
                    }      
                }
                if(banner.izlemler[index].KadinaSiddetDegerlendirme!=''){
                        KadinaSiddetDegerlendirme= banner.izlemler[index].KadinaSiddetDegerlendirme.split('%')
                        for (let i = 0; i < KadinaSiddetDegerlendirme.length; i++) {
                            const e = KadinaSiddetDegerlendirme[i];
                            if(i==0)banner.izlemler[index].KadinaSiddetDegerlendirme=dbSkrs.prepare("SELECT * FROM SiddetSonucuYonlendirme WHERE KODU="+e).get().ADI
                            else banner.izlemler[index].KadinaSiddetDegerlendirme+=','+dbSkrs.prepare("SELECT * FROM SiddetSonucuYonlendirme WHERE KODU="+e+";").get().ADI
                        }
                }
                if(banner.izlemler[index].SiddetTuru!=''){
                    SiddetTuru= banner.izlemler[index].SiddetTuru.split('%')
                    for (let i = 0; i < SiddetTuru.length; i++) {
                        const e = SiddetTuru[i];
                        if(i==0)banner.izlemler[index].SiddetTuru=dbSkrs.prepare("SELECT * FROM SiddetTuru WHERE KODU="+e+";").get().ADI
                        else banner.izlemler[index].SiddetTuru+=','+dbSkrs.prepare("SELECT * FROM SiddetTuru WHERE KODU="+e+";").get().ADI
                    }
                }            
            }
            banner.izlemAdı='kadınizlem'
    }
    else if(izlemAdı=='bebekcocukizlem'){
        banner.izlemler=dbMelissa.prepare("SELECT * FROM BebekIzlem WHERE hastaId="+hastaTc).all()
        for (let index = 0; index < banner.izlemler.length; index++) {
            if(banner.izlemler[index].Dvit!=-1) banner.izlemler[index].Dvit=dbSkrs.prepare("SELECT * FROM DVitamini WHERE KODU="+banner.izlemler[index].Dvit+";").get().ADI
            else banner.izlemler[index].Dvit='Belirtilmedi'
            if(banner.izlemler[index].Demir!=-1) banner.izlemler[index].Demir=dbSkrs.prepare("SELECT * FROM DemirDestek WHERE KODU="+banner.izlemler[index].Demir+";").get().ADI
            else banner.izlemler[index].Demir='Belirtilmedi'
            if(banner.izlemler[index].BeslenmeDurumu!=-1) banner.izlemler[index].BeslenmeDurumu=dbSkrs.prepare("SELECT * FROM BebekBeslenmeDurumu WHERE KODU="+banner.izlemler[index].BeslenmeDurumu+";").get().ADI
            else banner.izlemler[index].BeslenmeDurumu='Belirtilmedi'
        }
    }
    else if(izlemAdı=='gebeizlem'){
        banner.izlemler=dbMelissa.prepare("SELECT * FROM GEBE_IZLEM WHERE HastaID="+hastaTc).all()
        for (let index = 0; index < banner.izlemler.length; index++) {
            if(banner.izlemler[index].IdrardaProtein!=-1) banner.izlemler[index].IdrardaProtein=dbSkrs.prepare("SELECT * FROM IdrardaProtein WHERE KODU="+banner.izlemler[index].IdrardaProtein+";").get().ADI
            else banner.izlemler[index].IdrardaProtein='Belirtilmedi'
            if(banner.izlemler[index].Dvit!=-1) banner.izlemler[index].Dvit=dbSkrs.prepare("SELECT * FROM DVitamini WHERE KODU="+banner.izlemler[index].Dvit+";").get().ADI
            else banner.izlemler[index].Dvit='Belirtilmedi'
            if(banner.izlemler[index].Demir!=-1) banner.izlemler[index].Demir=dbSkrs.prepare("SELECT * FROM DemirDestek WHERE KODU="+banner.izlemler[index].Demir+";").get().ADI
            else banner.izlemler[index].Demir='Belirtilmedi'
            if(banner.izlemler[index].GelisBicimi!=-1) banner.izlemler[index].GelisBicimi=dbSkrs.prepare("SELECT * FROM GelisSekli WHERE KODU="+banner.izlemler[index].GelisBicimi+";").get().ADI
            else banner.izlemler[index].GelisBicimi='Belirtilmedi'
            if(banner.izlemler[index].Gestasyonel_Diabet_Taramasi!='[]'){
                Gestasyonel_Diabet_Taramasi=JSON.parse(banner.izlemler[index].Gestasyonel_Diabet_Taramasi)
                for (let i = 0; i < Gestasyonel_Diabet_Taramasi.length; i++) {
                    const e = Gestasyonel_Diabet_Taramasi[i];
                    if(i==0)banner.izlemler[index].Gestasyonel_Diabet_Taramasi=dbSkrs.prepare("SELECT * FROM GestasyonelDiyabetTaramasi WHERE KODU="+e+";").get().ADI
                    else banner.izlemler[index].Gestasyonel_Diabet_Taramasi+=','+dbSkrs.prepare("SELECT * FROM GestasyonelDiyabetTaramasi WHERE KODU="+e+";").get().ADI
                }
            }
        }
    }
    else if(izlemAdı=='lohusaizlem'){
        banner.izlemler=dbMelissa.prepare("SELECT * FROM Gebe_Lohusa_Izlem WHERE HastaID="+hastaTc).all()
        for (let index = 0; index < banner.izlemler.length; index++) {
            if(banner.izlemler[index].DVitamini!=-1) banner.izlemler[index].DVitamini=dbSkrs.prepare("SELECT * FROM DVitamini WHERE KODU="+banner.izlemler[index].DVitamini+";").get().ADI
            else banner.izlemler[index].DVitamini='Belirtilmedi'
            if(banner.izlemler[index].Demir!=-1) banner.izlemler[index].Demir=dbSkrs.prepare("SELECT * FROM DemirDestek WHERE KODU="+banner.izlemler[index].Demir+";").get().ADI
            else banner.izlemler[index].Demir='Belirtilmedi'
            if(banner.izlemler[index].KonjenitalDogumVarligi!=-1) banner.izlemler[index].KonjenitalDogumVarligi=dbSkrs.prepare("SELECT * FROM KonjenitalAnomali WHERE KODU="+banner.izlemler[index].KonjenitalDogumVarligi+";").get().ADI
            else banner.izlemler[index].KonjenitalDogumVarligi='Belirtilmedi'

            if(banner.izlemler[index].KacinciIzlem!=-1) banner.izlemler[index].KacinciIzlem=dbSkrs.prepare("SELECT * FROM KacinciLohusa WHERE KODU="+banner.izlemler[index].KacinciIzlem+";").get().ADI
            else banner.izlemler[index].KacinciIzlem='Belirtilmedi'

            if(banner.izlemler[index].Uterusinvolusyon!=-1) banner.izlemler[index].Uterusinvolusyon=dbSkrs.prepare("SELECT * FROM UterusInvolusyon WHERE KODU="+banner.izlemler[index].Uterusinvolusyon+";").get().ADI
            else banner.izlemler[index].Uterusinvolusyon='Belirtilmedi'

            if(banner.izlemler[index].postPartumDepresyonu!=-1) banner.izlemler[index].postPartumDepresyonu=dbSkrs.prepare("SELECT * FROM PostpartumDepresyon WHERE KODU="+banner.izlemler[index].postPartumDepresyonu+";").get().ADI
            else banner.izlemler[index].postPartumDepresyonu='Belirtilmedi'

          
            
            if(banner.izlemler[index].ApYontemi.length!=0){
                ApYontemi=JSON.parse(JSON.stringify(banner.izlemler[index].ApYontemi))
                for (let i = 0; i < ApYontemi.length; i++) {
                    const e = ApYontemi[i];
                    if(i==0)banner.izlemler[index].ApYontemi=e.isim
                    else banner.izlemler[index].ApYontemi+=','+e.isim
                }      
            }
            else banner.izlemler[index].ApYontemi='-'



            if(banner.izlemler[index].KadinSaglikIslemleri.length!=0){
                KadinSaglikIslemleri=JSON.parse(JSON.stringify(banner.izlemler[index].KadinSaglikIslemleri))
                for (let i = 0; i < KadinSaglikIslemleri.length; i++) {
                    const e = KadinSaglikIslemleri[i];
                    if(i==0)banner.izlemler[index].KadinSaglikIslemleri=e.isim
                    else banner.izlemler[index].KadinSaglikIslemleri+=','+e.isim
                }      
            }
            else banner.izlemler[index].KadinSaglikIslemleri='-'

            


            if(banner.izlemler[index].TehlikeliIsaretler.length!=0){
                TehlikeliIsaretler=JSON.parse(JSON.stringify(banner.izlemler[index].TehlikeliIsaretler))
                for (let i = 0; i < TehlikeliIsaretler.length; i++) {
                    const e = TehlikeliIsaretler[i];
                    if(i==0)banner.izlemler[index].TehlikeliIsaretler=e.isim
                    else banner.izlemler[index].TehlikeliIsaretler+=','+e.isim
                }      
            }
            else banner.izlemler[index].TehlikeliIsaretler='-'

            if(banner.izlemler[index].komplikasyonlar.length!=0){
                console.log(banner.izlemler[index].komplikasyonlar)

                komplikasyonlar=JSON.parse(banner.izlemler[index].komplikasyonlar)

                for (let i = 0; i < komplikasyonlar.length; i++) {
                    const e = komplikasyonlar[i].kod;

                    if(i==0)banner.izlemler[index].komplikasyonlar=dbSkrs.prepare("SELECT * FROM ICD10 WHERE KODU='"+e+"';").get().ADI
                    else banner.izlemler[index].komplikasyonlar+=','+dbSkrs.prepare("SELECT * FROM ICD10 WHERE KODU='"+e+"';").get().ADI
                }      
            }
            else banner.izlemler[index].komplikasyonlar='-'

          
        }
    }
    banner.DF= await getDF(banner.hasta)
    banner.ai=await getAi(hastaTc)
    banner.aileBilgileri = dbMelissa.prepare("SELECT * FROM Hasta_Aile_Bilgileri WHERE hastaId="+hastaTc).all()
    for (let index = 0; index <  banner.aileBilgileri.length; index++) {
        if(banner.aileBilgileri!=undefined){
            const e =  banner.aileBilgileri[index];
            if(e.yakinlik=='Annesi'){
                banner.DF.anneAd=e.yAd+' '+e.ySoyad
            }
            if(e.yakinlik=='Babası'){
                banner.DF.babaAd=e.yAd+' '+e.ySoyad
            }
        }     
    }
    

    banner.hasta.age=getAge(banner.hasta.ResmiDogumTarihi);

    banner.hasta_hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Hasta_Gruplari INNER JOIN Hasta_Gruplari on Hasta_Hasta_Gruplari.grupId=Hasta_Gruplari.grupId WHERE Hasta_Hasta_Gruplari.hastaId="+hastaTc).all()
    banner.hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Gruplari ").all()

    return banner
}

module.exports.kadınİzlem=async function(req,res){
    var hastaTc=req.body.hasta;
    params={}
    params=await getBanner(hastaTc,'kadınizlem')
    req.session.hasta=params.hasta
    
    // stmt = dbMelissa.prepare("SELECT * FROM ASI WHERE id IN (SELECT id FROM ASI WHERE Tarih = (SELECT MAX(Tarih) FROM ASI WHERE HastaId='"+tc+"')) ORDER BY id DESC LIMIT 1");
    // sonAşı = stmt.all();	
    // if(sonAşı.length==0){params.sonAşı={Tarih:new Date()}}
    // else{params.sonAşı=sonAşı;}
    // stmt = dbMelissa.prepare("SELECT * FROM Asilar WHERE KODU="+aşıID+";");
    // skrsSonAşı= stmt.all()[0];
    // if(skrsSonAşı.length==0){params.skrsSonAşı={ADI:"null"}}
    // else{params.skrsSonAşı=skrsSonAşı}
    params.sonAşıAdı=''
    params.sonAşıTar='12.12.12'
    



   
    params.konanomali=dbSkrs.prepare("SELECT * FROM KonjenitalAnomali WHERE AKTIF = 1").all()
    params.APKullanmamaNedeni = dbSkrs.prepare("SELECT * FROM APKullanmamaNedeni WHERE AKTIF = 1").all()

    params.APYöntemleri = dbSkrs.prepare("SELECT * FROM APYontemleri WHERE AKTIF = 1;").all()
    params.KadinSaglikIslemleri = dbSkrs.prepare("SELECT * FROM KadinSaglikIslemleri WHERE AKTIF = 1").all()
    params.KadinSaglikRiskFaktorleri = dbSkrs.prepare("SELECT * FROM KadinSaglikRiskFaktorleri").all()
    params.APYontemLojistik = dbSkrs.prepare("SELECT * FROM APYontemLojistik").all()
    stmt = dbSkrs.prepare("SELECT * FROM APOncekiYontem;");
    params.APOncekiYontem= stmt.all();

    stmt = dbSkrs.prepare("SELECT * FROM SiddetTuru WHERE AKTIF = 1");
    params.SiddetTuru= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM SiddetSonucuYonlendirme WHERE AKTIF = 1");
    params.SiddetSonucuYonlendirme= stmt.all();
    params.asilar = dbSkrs.prepare("SELECT * FROM asilar WHERE AKTIF = 1").all()
    stmt = dbSkrs.prepare("SELECT * FROM asiuygulamasekli WHERE AKTIF = 1");
    params.asiuygulamasekli= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM asikaynak WHERE AKTIF = 1;");
    params.asikaynak= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM asiuygulamayeri WHERE AKTIF = 1;");
    params.asiuygulamayeri= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM asidoz WHERE AKTIF = 1;");
    params.asidoz= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM kangrubu WHERE AKTIF = '1';");
    params.kanGrubu= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM oncekiDogumDurumu WHERE AKTIF = '1';");
    params.oncekiDogumDurumu= stmt.all();

    params.islem=req.session.user
    params.doktorunKurumu = dbSkrs.prepare("SELECT * FROM Kurumlar WHERE KODU="+params.islem.KurumKodu).get();
    params.iller = dbSkrs.prepare("SELECT * FROM Il").all();
    params.ilceler = dbSkrs.prepare("SELECT * FROM Ilce where ILKODU="+ params.doktorunKurumu.ILKODU).all();
    params.islem.islemYer = dbSkrs.prepare("SELECT * FROM Kurumlar where ILKODU="+ params.doktorunKurumu.ILKODU+" AND ILCEKODU="+params.doktorunKurumu.ILCEKODU+" AND KURUMTURKODU="+params.doktorunKurumu.KURUMTURKODU).all();
    params.user=req.session.user
    params.islem.islemYer

    params.asilar = dbSkrs.prepare("SELECT * FROM asilar WHERE AKTIF = 1;").all();
    params.asiuygulamasekli = dbSkrs.prepare("SELECT * FROM asiuygulamasekli WHERE AKTIF = 1;").all();
    params.asikaynak = dbSkrs.prepare("SELECT * FROM asikaynak WHERE AKTIF = 1;").all();
    params.asiuygulamayeri = dbSkrs.prepare("SELECT * FROM asiuygulamayeri WHERE AKTIF = 1;").all();
    params.asidoz = dbSkrs.prepare("SELECT * FROM asidoz WHERE AKTIF = 1;").all();
    params.AsiIslemTuru = dbSkrs.prepare("SELECT * FROM AsiIslemTuru WHERE AKTIF = 1;").all();
    params.ASI_OZEL_DURUM_NEDENI=dbSkrs.prepare("SELECT * FROM ASI_OZEL_DURUM_NEDENI WHERE AKTIF = 1;").all();

    res.render('kadinizlem',params);      
         
}
module.exports.kadınizlemKaydet=async function(req,res){

    const form = JSON.parse(JSON.stringify(req.body))
  //  console.log(form)
     // bilinmeyen parametreler
     hasta=req.session.hasta

     AH=req.session.user.AH
     sysno=hasta.SysTakipNO    
     SentToMsvsTarih=''
     SentToMsvs=0
     SentToServer=0
     PROTOKOLNO='A-'+req.session.user.AH+'-2-001-A-'+moment().format('DDMMYYYYHHmmss');
     if(form.disarda==undefined){form.disarda=0;}
     if(form.talesemi==undefined){form.talesemi=0;}
     if(form.hbs==undefined){form.hbs=0;}
     if(form.hemoglobinDegeri==''){form.hemoglobin=0}else{form.hemoglobin=1}
     if(form.ekgVar==undefined){form.ekgVar=0}
     if(form.varis==undefined){form.varis=0}
     console.log(form)

//sağlık bakanlığı gönder fonksşyonu
    if(form.sbGonder!=undefined) {
        SBform={}
        if(form.konanomali!='-1'){
            SBform.KONJENITAL_ANOMALI_VARLIGI={}
            SBform.KONJENITAL_ANOMALI_VARLIGI.KODU=form.konanomali
            SBform.KONJENITAL_ANOMALI_VARLIGI.ADI=dbSkrs.prepare("SELECT * FROM KonjenitalAnomali WHERE KODU="+form.konanomali).get().ADI
        } 
        else SBform.KONJENITAL_ANOMALI_VARLIGI=-1

        if(form.canliDogumSayisi!='') SBform.CANLI_DOGAN_BEBEK_SAYISI=form.canliDogumSayisi
        else SBform.CANLI_DOGAN_BEBEK_SAYISI=-1

        if(form.hemoglobinDegeri!='') SBform.HEMOGLOBIN=form.hemoglobinDegeri
        else SBform.HEMOGLOBIN=-1
        if(form.oluDogumSayisi!='') SBform.OLU_DOGAN_BEBEK_SAYISI=form.oluDogumSayisi
        else SBform.OLU_DOGAN_BEBEK_SAYISI=-1

        SBform.BIR_ONCEKI_DOGUM_DURUMU={}
        SBform.BIR_ONCEKI_DOGUM_DURUMU.KODU=form.oncekiDogumDurum
        SBform.BIR_ONCEKI_DOGUM_DURUMU.ADI=dbSkrs.prepare("SELECT * FROM oncekiDogumDurumu WHERE KODU="+form.oncekiDogumDurum).get().ADI

        SBform.IZLEMIN_YAPILDIGI_YER={}
        SBform.IZLEMIN_YAPILDIGI_YER.KODU=form.islemYer
        SBform.IZLEMIN_YAPILDIGI_YER.ADI=dbSkrs.prepare("SELECT * FROM Kurumlar WHERE KODU="+form.islemYer).get().ADI
        SBform.SYSTakipNo=hasta.SysTakipNO
        if(form.APYontemi!='-1'){
            SBform.KULLANILAN_AILE_PLANLAMASI_YONTEMI={}
            SBform.KULLANILAN_AILE_PLANLAMASI_YONTEMI.KODU=form.APYontemi
            SBform.KULLANILAN_AILE_PLANLAMASI_YONTEMI.ADI=dbSkrs.prepare("SELECT * FROM APYontemleri WHERE KODU="+form.APYontemi).get().ADI
        }
        else SBform.KULLANILAN_AILE_PLANLAMASI_YONTEMI=-1
 
        if(form.APyontemLojistigi!='-1'){
            SBform.AILE_PLANLAMASI_YONTEMI_LOJISTIGI={}
            SBform.AILE_PLANLAMASI_YONTEMI_LOJISTIGI.KODU=form.APyontemLojistigi
            SBform.AILE_PLANLAMASI_YONTEMI_LOJISTIGI.ADI=dbSkrs.prepare("SELECT * FROM APYontemleri WHERE KODU="+form.APyontemLojistigi).get().ADI
        } 
        else SBform.AILE_PLANLAMASI_YONTEMI_LOJISTIGI=-1

        if(form.APyontemLojistigi!='-1'){
            SBform.AILE_PLANLAMASI_YONTEMI_LOJISTIGI={}
            SBform.AILE_PLANLAMASI_YONTEMI_LOJISTIGI.KODU=form.APyontemLojistigi
            SBform.AILE_PLANLAMASI_YONTEMI_LOJISTIGI.ADI=dbSkrs.prepare("SELECT * FROM APYontemleri WHERE KODU="+form.APyontemLojistigi).get().ADI
        } 
        else SBform.AILE_PLANLAMASI_YONTEMI_LOJISTIGI=-1
        if(form.APkullanmamaNedeni!='-1'){
            SBform.AILE_PLANLAMASI_YONTEMI_KULLANMAMA_NEDENI={}
            SBform.AILE_PLANLAMASI_YONTEMI_KULLANMAMA_NEDENI.KODU=form.APkullanmamaNedeni
            SBform.AILE_PLANLAMASI_YONTEMI_KULLANMAMA_NEDENI.ADI=dbSkrs.prepare("SELECT * FROM APYontemleri WHERE KODU="+form.APkullanmamaNedeni).get().ADI
        } 
        else SBform.AILE_PLANLAMASI_YONTEMI_KULLANMAMA_NEDENI=-1

        if(form.oncekiAPyontem!='-1'){
            SBform.BIR_ONCEKI_KULLANILAN_AILE_PLANLAMASI_YONTEMI={}
            SBform.BIR_ONCEKI_KULLANILAN_AILE_PLANLAMASI_YONTEMI.KODU=form.oncekiAPyontem
            SBform.BIR_ONCEKI_KULLANILAN_AILE_PLANLAMASI_YONTEMI.ADI=dbSkrs.prepare("SELECT * FROM APYontemleri WHERE KODU="+form.oncekiAPyontem).get().ADI
        } 
        else SBform.BIR_ONCEKI_KULLANILAN_AILE_PLANLAMASI_YONTEMI=-1

        

        SBform.PAKETE_AIT_ISLEM_ZAMANI =moment().format('YYYYMMDDHHmm')       
        console.log(SBform.PAKETE_AIT_ISLEM_ZAMANI)
        SBform.ISLEM_YAPAN=form.islemYapanTc
        SBform.BILGI_ALINAN_KISI_ADI_SOYADI=form.baAdSoyad
        SBform.BILGI_ALINAN_KISI_TEL=form.baTel

        kadinSaglikArray=form.kadinSaglikStr.split('%')
        KADIN_SAGLIGI_ISLEMLERI=[]
        console.log(kadinSaglikArray[0])

        if(kadinSaglikArray[0]!=''){
            for (let index = 0; index < kadinSaglikArray.length; index++) {
                const e = kadinSaglikArray[index];
                KADIN_SAGLIGI_ISLEMLERI[index]={}
                KADIN_SAGLIGI_ISLEMLERI[index].KODU=e
                KADIN_SAGLIGI_ISLEMLERI[index].ADI=dbSkrs.prepare("SELECT * FROM KadinSaglikIslemleri WHERE KODU="+e).get().ADI           
            }
            SBform.KADIN_SAGLIGI_ISLEMLERI=KADIN_SAGLIGI_ISLEMLERI
        } 
        else SBform.KADIN_SAGLIGI_ISLEMLERI=-1
         resultSb=sys.KadinIzlemVeriSeti(SBform)
        //console.log(resultSb)
    }

 




    c="','";
    var sql="INSERT INTO kadin_izlem (AH, HastaId, Tarih, EvlenmeYasi, DogumSayisi, CanliDogumSayisi, OluDogumSayisi, KendiligindenDusukSayisi, IsteyerekDusukSayisi, KonjenitalDogumVarligi, ApKullanmamaNedeni, Hemoglobin, SentToMsvsTarih, SentToMsvs, SentToServer, ToplamGebelikSayisi, HemoglobinDegeri, Aciklama, ilkGebelikYasi, IlkAdetYasi, AdettenKesilmeYasi, Dismonore, AdetDuzeniSikligi, TalasemiTasiyiciligi, HbsTasiyiciligi, Oyku, SistemikFizikiMuayene, Tit, TaSistolik, TaDiastolik, EKG, Varis, PapSmear, MemeMuayenesi_Text, PROTOKOLNO, BirOncekiAPYontemi, Disarda, SysTakipNo, IslemYapanTc, BilgiAlinanKisiAdSoyad, IslemYapilanKurumKodu, BilgiAlinanKisiTel,APYontemi, ApLojistigi, KadinaSiddetDegerlendirme, SiddetTuru, RiskTespitKodu, UremeSaglikDanismalik, CybeBulguSorgulama, HCT, RiskFaktorleri, SaglikIslemler, ApIslemler)" 
    sql+="VALUES('";
    sql+=AH+c+form.hastaTC+c+form.izlemTarihi+c+form.evlenmeYasi+c+form.dogumSayisi+c+form.canliDogumSayisi+c+form.oluDogumSayisi+c+form.kendiligindenDS+c+form.isteyerekDS+c;
    sql+=form.konanomali+c+form.APkullanmamaNedeni+c+form.hemoglobin+c+SentToMsvsTarih+c+SentToMsvs+c+SentToServer+c+form.toplamGebelikSayisi+c+form.hemoglobinDegeri+c+form.aciklama+c+form.ilkGebelikYasi+c+form.ilkAdetYasi+c;
    sql+=form.adettenKesilmeYasi+c+form.dismonoreTB+c+form.adetDuzenSikligi+c+form.talesemi+c+form.hbs+c+form.oykuTB+c+form.sistemikTB+c+form.titTB+c+form.stansiyon+c+form.dtansiyon+c+form.ekgVar+c+form.varis+c;
    sql+=form.PAPsmearTB+c+form.memeTB+c+PROTOKOLNO+c+form.oncekiAPyontem+c+form.disarda+c+sysno+c+form.islemYapanTc+c+form.baAdSoyad+c+form.islemYer+c+form.baTel+c+form.APYontemi+c;
    sql+=form.APyontemLojistigi+c+form.degerlendirmelerStr+c+form.siddetlerStr+c+form.risklerStr+c+form.danismanliklarStr+c+form.cybeStr+c+form.hct+c+form.kadinRiskStr+c+form.kadinSaglikStr+c+form.APYontemi;
    sql+="')";
    dbMelissa.prepare(sql).run()
    
 
    var params={};
  
    params.hasta = hasta
    req.session.hasta=params.hasta
    params.hasta.age=getAge(params.hasta.DogumTarihi)
    params.hastanınKronikHastalıkları = dbMelissa.prepare("SELECT * FROM HastaKronikHastaliklar where HastaId="+hasta.Id).all();
  
    HASTA_OZGEÇMİŞ = dbMelissa.prepare("SELECT * FROM hasta_ozgecmis where HastaId="+hasta.Id).all()[0];
        if(HASTA_OZGEÇMİŞ.DuzenliIlacKullanimi!=0){ params.hasta_ilacları=HASTA_OZGEÇMİŞ.DuzenliIlacKullanimi.split('?')}
        else{params.hasta_ilacları=undefined}
        
        if(HASTA_OZGEÇMİŞ.GecirdigiOperasyonlar!=0) params.hasta_ameliyat=HASTA_OZGEÇMİŞ.GecirdigiOperasyonlar.split('?')
        else{params.hasta_ameliyat=undefined}
  
        if(HASTA_OZGEÇMİŞ.Alerjileri!=0) params.hasta_alerji=HASTA_OZGEÇMİŞ.Alerjileri.split('?')
        else{params.hasta_alerji=undefined}
  
    params.asilar = dbSkrs.prepare("SELECT * FROM asilar WHERE AKTIF = 1;").all();
    params.asiuygulamasekli = dbSkrs.prepare("SELECT * FROM asiuygulamasekli WHERE AKTIF = 1;").all();
    params.asikaynak = dbSkrs.prepare("SELECT * FROM asikaynak WHERE AKTIF = 1;").all();
    params.asiuygulamayeri = dbSkrs.prepare("SELECT * FROM asiuygulamayeri WHERE AKTIF = 1;").all();
    params.asidoz = dbSkrs.prepare("SELECT * FROM asidoz WHERE AKTIF = 1;").all();
    params.kronikHastalıklar = dbSkrs.prepare("SELECT * FROM Kronikhastaliklar LIMIT 100;").all();
    params.ilaclar = dbSkrs.prepare("SELECT * FROM Ilac LIMIT 100;").all();
    params.hasta_hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Hasta_Gruplari INNER JOIN Hasta_Gruplari on Hasta_Hasta_Gruplari.grupId=Hasta_Gruplari.grupId WHERE Hasta_Hasta_Gruplari.hastaId="+params.hasta.Id).all()
    params.hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Gruplari ").all()
      req.session.hasta=params.hasta;
    res.send(true)
}




module.exports.bebekcocukizlem=async function(req,res){
    var hastaTc=req.body.hasta;
    params={}
    params=await getBanner(hastaTc,'bebekcocukizlem')
    req.session.hasta=params.hasta

    g= dbMelissa.prepare("SELECT * FROM OtizIzlem WHERE HastaId="+hastaTc).all()

    
    if(params.dogum!=undefined){
        params.dogum = dbMelissa.prepare("SELECT * FROM GEBE_SONUC_DOGUM_BILDIRIM WHERE tcNo="+hastaTc).get();//  AnneTcKimlikNo,DogumSirasi,Agirlik,BasCevresi,Apgar1,Apgar5,boy,uyruk,cinsiyet,isim,soyisim,tcNo,gebelikSonucId"
        GEBELİK_SONUC= dbMelissa.prepare("SELECT * FROM GEBELİK_SONUC WHERE id="+params.dogum.gebelikSonucId).get()
        anne = dbMelissa.prepare("SELECT * FROM Hasta WHERE Id="+params.dogum.AnneTcKimlikNo).get()
        params.anneAdSoyad=anne.Ad+' '+anne.Soyad
        params.anneYasi=calculateAge(anne.DogumTarihi)
        params.DogumYontemi = dbSkrs.prepare("SELECT * FROM DogumYontemi WHERE AKTIF = 1 AND KODU="+GEBELİK_SONUC.DogumYontemi).get().ADI;
    }
    else{
        params.anneAdSoyad=''
        params.anneYasi=''
        params.DogumYontemi =''
        params.dogum=[]
    }
    req.session.hasta=params.hasta
    req.session.hasta=params.hasta
    params.islem=req.session.user
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar WHERE KODU="+params.islem.KurumKodu);
    params.doktorunKurumu=stmt.get();
    stmt = dbSkrs.prepare("SELECT * FROM Il");
    params.iller= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Ilce where ILKODU="+ params.doktorunKurumu.ILKODU);
    params.ilceler= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar where ILKODU="+ params.doktorunKurumu.ILKODU+" AND ILCEKODU="+params.doktorunKurumu.ILCEKODU+" AND KURUMTURKODU="+params.doktorunKurumu.KURUMTURKODU);
    params.islem.islemYer= stmt.all();

    stmt = dbMelissa.prepare("SELECT * FROM Bebek_Beslenme where HastaTc="+hastaTc);
    params.beslenme= stmt.all();
    params.user=req.session.user
    //grafik bilgilerini çek
    izlemler=dbMelissa.prepare("SELECT * FROM BebekIzlem where hastaId="+hastaTc).all()
    params.iz=izlemler
    agirlikGrafik=[]
    boyGrafik=[]
    basGrafik=[]
    for (let index = 0; index < izlemler.length; index++) {
        const e = izlemler[index];
        p1=[],p2=[],p3=[]
        p1[0]=e.izlemSirasi-1
        p1[1]=e.Agirlik
        agirlikGrafik.push(p1)
        p2[0]=e.izlemSirasi-1
        p2[1]=e.Boy
        boyGrafik.push(p2)
        if(e.izlemSirasi<18){
            p3[0]=e.izlemSirasi-1
            p3[1]=e.BasCevresi
            basGrafik.push(p3)
        }
    }
    params.agirlikGrafik=JSON.stringify(agirlikGrafik)      
    params.boyGrafik=JSON.stringify(boyGrafik)      
    params.basGrafik=JSON.stringify(basGrafik)      

    res.render('bebekCocukizlem',params);       
}
function calculateAge(birth)
{
  birth=new Date(birth)  
  todayDate = new Date();
  todayYear = todayDate.getFullYear();
  todayMonth = todayDate.getMonth();
  todayDay = todayDate.getDate();
  age = todayYear - birth.getFullYear();
 
  if (todayMonth < birth.getMonth() - 1)
  {
    age--;
  }
 
  if (birth.getMonth() - 1 == todayMonth && todayDay < birth.getDate())
  {
    age--;
  }
  return age;
}

module.exports.bebekcocukYeniIzlem=async function(req,res){
    params={}
    params=await getBanner(req.session.hasta.Id,'bebekcocukizlem')
    req.session.hasta=params.hasta
    
    stmt = dbSkrs.prepare("SELECT * FROM DVitamini WHERE AKTIF = 1;");
    params.DVitamini= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM DemirDestek WHERE AKTIF = 1;");
    params.DemirDestek= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM BeyinGelisimiRiskler WHERE AKTIF = 1;");
    params.BeyinGelisimiRiskler= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM KacinciIzlem WHERE AKTIF = 1;");
    params.kacinciizlem= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM EbeveynAktivite WHERE AKTIF =1;");
    params.EbeveynAktivite= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM GelisimTablosuBilgilerininSorgulanmasi WHERE AKTIF =1;");
    params.GelisimTablosuBilgilerininSorgulanmasi= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM RisklereYonelikEgtimler WHERE AKTIF =1;");
    params.RisklereYonelikEgtimler= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM BebekRiskFaktorlerineYapilanMudaheleler WHERE AKTIF =1;");
    params.RiskFaktorlerineYapilanMudaheleler= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM BebekRiskTakipi WHERE AKTIF =1;");
    params.RiskTakipi= stmt.all();
    params.islem=req.session.user
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar WHERE KODU="+params.islem.KurumKodu);
    params.doktorunKurumu=stmt.get();
    stmt = dbSkrs.prepare("SELECT * FROM Il");
    params.iller= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM GKDTaramaSonucu where AKTIF=1");
    params.GKDTaramaSonucu= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM GormeTaramaSonucu where AKTIF=1");
    params.GormeTaramaSonucu= stmt.all();

    stmt = dbSkrs.prepare("SELECT * FROM BebekBeslenmeDurumu where AKTIF=1");
    params.BebekBeslenmeDurumu= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM NTPTakipBilgisi where AKTIF=1");
    params.NTPTakipBilgisi= stmt.all();
    params.NTPDurumBilgisi= dbSkrs.prepare("SELECT * FROM NTPDurumBilgisi where AKTIF=1").all()
    params.AsiIslemTuru=dbSkrs.prepare("SELECT * FROM AsiIslemTuru where AKTIF=1").all()

    stmt = dbSkrs.prepare("SELECT * FROM Ilce where ILKODU="+ params.doktorunKurumu.ILKODU);
    params.ilceler= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar where ILKODU="+ params.doktorunKurumu.ILKODU+" AND ILCEKODU="+params.doktorunKurumu.ILCEKODU+" AND KURUMTURKODU="+params.doktorunKurumu.KURUMTURKODU);
    params.islem.islemYer= stmt.all();

    params.islemGrubu=[{ADI:"Beyin Gelişimi için Riskler",KODU:"BeyinGelisimiRiskler"},
                            {ADI:"Ebeveynin Yaptığı Aktiviteler",KODU:"EbeveynAktivite"},
                            {ADI:"Gelişim Tablosu Bilgisinin Sorgulanması",KODU:"GelisimTablosuBilgilerininSorgulanmasi"},
                            {ADI:"Risklere Yönelik Eğitimler",KODU:"RisklereYonelikEgtimler"},
                            {ADI:"Risk Faktörlerine Yapılan Müdahaleler",KODU:"RiskFaktorlerineYapilanMudaheleler"},
                            {ADI:"Risk Altindaki Olgunun Takibi",KODU:"RiskTakipi"}];
    res.render('bebekcocukizlem-YeniIzlem',params);               
}

module.exports.bebekcocukKaydet=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    PROTOKOLNO='A-'+req.session.user.AH+'-2-001-A-'+moment().format('DDMMYYYYHHmmss');
    if(form.konanomali==undefined){
        form.konanomali=0;
    }
    if(form.serviksmear==undefined){
        form.serviksmear=0;
    }
    if(form.talesemi==undefined){
        form.talesemi=0;
    }
    if(form.hbs==undefined){
        form.hbs=0;
    }
    if(form.bdi==undefined){
        form.bdi=0;
    }   
     // bilinmeyen parametreler
     AH=req.session.user.AH;
     sysno=req.session.hasta.SysTakipNO    
     Degerlendirme=''
     SentToMsvsTarih=''
     SentToMsvs=0
     SentToServer=0
     SentENabiz=0
     YurtDisindaYapilanKorum=0
     PROTOKOLNO='A-'+req.session.user.AH+'-2-001-A-'+moment().format('DDMMYYYYHHmmss');
     TopukKani=''
     //-------------------------

     if(form.GELISIM_TABLOSU_BILGILERININ_SORGULANMASI==undefined){form.GELISIM_TABLOSU_BILGILERININ_SORGULANMASI='';}
     if(form.BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER==undefined){form.BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER='';}
     if(form.EBEVEYNIN_PSIKOLOJIK_GELISIMI_DESTEKLEYICI_AKTIVITELERI==undefined){form.EBEVEYNIN_PSIKOLOJIK_GELISIMI_DESTEKLEYICI_AKTIVITELERI='';}
     if(form.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER==undefined){form.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER='';}
     if(form.BEBEGIN_COCUGUN_RISK_FAKTORLERINE_YAPILAN_MUDAHALE==undefined){form.BEBEGIN_COCUGUN_RISK_FAKTORLERINE_YAPILAN_MUDAHALE='';}
     if(form.BEBEK_COCUKTA_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI==undefined){form.BEBEK_COCUKTA_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI='';}
   


    //sağlık bakanlığı gönder fonksşyonu
    if(form.sbGonder!=undefined) {
        SBform={}
        if(form.bascevresi!='') SBform.BAS_CEVRESI=form.bascevresi
        else SBform.BAS_CEVRESI=-1

        x=dbMelissa.prepare("SELECT * FROM GEBE_SONUC_DOGUM_BILDIRIM WHERE tcNo="+form.hastaTC).get()
        if(x!=undefined){
            if(x.Agirlik!=undefined) SBform.DOGUM_AGIRLIGI=x.Agirlik
            else SBform.DOGUM_AGIRLIGI=-1
        }
        else SBform.DOGUM_AGIRLIGI=-1


        if(form.hemotokrit!='') SBform.HEMATOKRIT=form.hemotokrit
        else SBform.HEMATOKRIT=-1

        if(form.hemoglobin!='') SBform.HEMOGLOBIN=form.hemoglobin
        else SBform.HEMOGLOBIN=-1

        if(form.boy!='') SBform.BOY=form.boy
        else SBform.BOY=''

        if(form.kilo!='') SBform.KILO=form.kilo
        else SBform.KILO=''
        
        SBform.D_VITAMINI_LOJISTIGI_VE_DESTEGI={}
        SBform.D_VITAMINI_LOJISTIGI_VE_DESTEGI.KODU=form.DVitamini
        SBform.D_VITAMINI_LOJISTIGI_VE_DESTEGI.ADI=dbSkrs.prepare("SELECT * FROM DVitamini WHERE KODU="+form.DVitamini).get().ADI

        SBform.DEMIR_LOJISTIGI_VE_DESTEGI={}
        SBform.DEMIR_LOJISTIGI_VE_DESTEGI.KODU=form.DemirDestek
        SBform.DEMIR_LOJISTIGI_VE_DESTEGI.ADI=dbSkrs.prepare("SELECT * FROM DemirDestek WHERE KODU="+form.DemirDestek).get().ADI

        SBform.KACINCI_IZLEM={}
        SBform.KACINCI_IZLEM.KODU=form.izlemSirasi
        SBform.KACINCI_IZLEM.ADI=dbSkrs.prepare("SELECT * FROM KacinciIzlem WHERE KODU="+form.izlemSirasi).get().ADI
        
        SBform.IZLEM_ISLEM_TURU={}
        SBform.IZLEM_ISLEM_TURU.KODU=form.izlemIslemTuru
        SBform.IZLEM_ISLEM_TURU.ADI=dbSkrs.prepare("SELECT * FROM AsiIslemTuru WHERE KODU="+form.izlemIslemTuru).get().ADI
        SBform.GKD_TARAMA_SONUCU=-1
        // if(form.gkd!='-1'){
        //     SBform.GKD_TARAMA_SONUCU={}
        //     SBform.GKD_TARAMA_SONUCU.KODU=form.gkd
        //     SBform.GKD_TARAMA_SONUCU.ADI=dbSkrs.prepare("SELECT * FROM GKDTaramaSonucu WHERE KODU="+form.gkd).get().ADI
        // }
        // else  SBform.GKD_TARAMA_SONUCU=-1

        if(form.GormeTaramaSonucu!='-1'){
            SBform.GORME_TARAMA_SONUCU={}
            SBform.GORME_TARAMA_SONUCU.KODU=form.GormeTaramaSonucu
            SBform.GORME_TARAMA_SONUCU.ADI=dbSkrs.prepare("SELECT * FROM GormeTaramaSonucu WHERE KODU="+form.GormeTaramaSonucu).get().ADI
        }
        else  SBform.GORME_TARAMA_SONUCU=-1

        if(form.BebekBeslenmeDurumu!='-1'){
            SBform.BEBEGIN_BESLENME_DURUMU={}
            SBform.BEBEGIN_BESLENME_DURUMU.KODU=form.BebekBeslenmeDurumu
            SBform.BEBEGIN_BESLENME_DURUMU.ADI=dbSkrs.prepare("SELECT * FROM BebekBeslenmeDurumu WHERE KODU="+form.BebekBeslenmeDurumu).get().ADI
        }
        else  SBform.BEBEGIN_BESLENME_DURUMU=-1

        if(form.NTPTakipBilgisi!='-1'){
            SBform.NTP_TAKIP_BILGISI={}
            SBform.NTP_TAKIP_BILGISI.KODU=form.NTPTakipBilgisi
            SBform.NTP_TAKIP_BILGISI.ADI=dbSkrs.prepare("SELECT * FROM NTPTakipBilgisi WHERE KODU="+form.NTPTakipBilgisi).get().ADI
        }
        else  SBform.NTP_TAKIP_BILGISI=-1

        
        SBform.SYSTakipNo=req.session.hasta.SysTakipNO

        resultSb=sys.BebekIzlemVeriSetiPaketi(SBform)
        console.log(resultSb)
    }

    if(form.BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER!==''&form.GELISIM_TABLOSU_BILGILERININ_SORGULANMASI!=''&form.EBEVEYNIN_PSIKOLOJIK_GELISIMI_DESTEKLEYICI_AKTIVITELERI!='' & form.sbGonder==1){
        SBform={}
        BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER=[]
        form.BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER=JSON.parse(form.BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER)
        for (let index = 0; index < form.BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER.length; index++) {
            const e = form.BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER[index];
            BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER[index]={}
            BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER[index].KODU=e
            BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER[index].ADI=dbSkrs.prepare("SELECT * FROM BeyinGelisimiRiskler WHERE KODU="+e).get().ADI           
        }
        SBform.BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER=BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER

        GELISIM_TABLOSU_BILGILERININ_SORGULANMASI=[]
        form.GELISIM_TABLOSU_BILGILERININ_SORGULANMASI=JSON.parse(form.GELISIM_TABLOSU_BILGILERININ_SORGULANMASI)
        for (let index = 0; index < form.GELISIM_TABLOSU_BILGILERININ_SORGULANMASI.length; index++) {
            const e = form.GELISIM_TABLOSU_BILGILERININ_SORGULANMASI[index];
            GELISIM_TABLOSU_BILGILERININ_SORGULANMASI[index]={}
            GELISIM_TABLOSU_BILGILERININ_SORGULANMASI[index].KODU=e
            GELISIM_TABLOSU_BILGILERININ_SORGULANMASI[index].ADI=dbSkrs.prepare("SELECT * FROM GelisimTablosuBilgilerininSorgulanmasi WHERE KODU="+e).get().ADI           
        }
        SBform.GELISIM_TABLOSU_BILGILERININ_SORGULANMASI=GELISIM_TABLOSU_BILGILERININ_SORGULANMASI

        EBEVEYNIN_PSIKOLOJIK_GELISIMI_DESTEKLEYICI_AKTIVITELERI=[]
        form.EBEVEYNIN_PSIKOLOJIK_GELISIMI_DESTEKLEYICI_AKTIVITELERI=JSON.parse(form.EBEVEYNIN_PSIKOLOJIK_GELISIMI_DESTEKLEYICI_AKTIVITELERI)
        for (let index = 0; index < form.EBEVEYNIN_PSIKOLOJIK_GELISIMI_DESTEKLEYICI_AKTIVITELERI.length; index++) {
            const e = form.EBEVEYNIN_PSIKOLOJIK_GELISIMI_DESTEKLEYICI_AKTIVITELERI[index];
            EBEVEYNIN_PSIKOLOJIK_GELISIMI_DESTEKLEYICI_AKTIVITELERI[index]={}
            EBEVEYNIN_PSIKOLOJIK_GELISIMI_DESTEKLEYICI_AKTIVITELERI[index].KODU=e
            EBEVEYNIN_PSIKOLOJIK_GELISIMI_DESTEKLEYICI_AKTIVITELERI[index].ADI=dbSkrs.prepare("SELECT * FROM EbeveynAktivite WHERE KODU="+e).get().ADI           
        }
        SBform.EBEVEYNIN_PSIKOLOJIK_GELISIMI_DESTEKLEYICI_AKTIVITELERI=EBEVEYNIN_PSIKOLOJIK_GELISIMI_DESTEKLEYICI_AKTIVITELERI


        BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER=[]
        if(form.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER!=''){
            form.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER=JSON.parse(form.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER)
            for (let index = 0; index < form.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER.length; index++) {
                const e = form.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER[index];
                BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER[index]={}
                BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER[index].KODU=e
                BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER[index].ADI=dbSkrs.prepare("SELECT * FROM RisklereYonelikEgtimler WHERE KODU="+e).get().ADI           
            }
            SBform.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER=BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER
        } 
        else SBform.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER=-1

        BEBEGIN_COCUGUN_RISK_FAKTORLERINE_YAPILAN_MUDAHALE=[]
        if(form.BEBEGIN_COCUGUN_RISK_FAKTORLERINE_YAPILAN_MUDAHALE!=''){
            form.BEBEGIN_COCUGUN_RISK_FAKTORLERINE_YAPILAN_MUDAHALE=JSON.parse(form.BEBEGIN_COCUGUN_RISK_FAKTORLERINE_YAPILAN_MUDAHALE)
            for (let index = 0; index < form.BEBEGIN_COCUGUN_RISK_FAKTORLERINE_YAPILAN_MUDAHALE.length; index++) {
                const e = form.BEBEGIN_COCUGUN_RISK_FAKTORLERINE_YAPILAN_MUDAHALE[index];
                BEBEGIN_COCUGUN_RISK_FAKTORLERINE_YAPILAN_MUDAHALE[index]={}
                BEBEGIN_COCUGUN_RISK_FAKTORLERINE_YAPILAN_MUDAHALE[index].KODU=e
                BEBEGIN_COCUGUN_RISK_FAKTORLERINE_YAPILAN_MUDAHALE[index].ADI=dbSkrs.prepare("SELECT * FROM BebekRiskFaktorlerineYapilanMudaheleler WHERE KODU="+e).get().ADI           
            }
            SBform.BEBEGIN_COCUGUN_RISK_FAKTORLERINE_YAPILAN_MUDAHALE=BEBEGIN_COCUGUN_RISK_FAKTORLERINE_YAPILAN_MUDAHALE
        } 
        else SBform.BEBEGIN_COCUGUN_RISK_FAKTORLERINE_YAPILAN_MUDAHALE=-1

        BEBEK_COCUKTA_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI=[]
        if(form.BEBEK_COCUKTA_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI!=''){
            form.BEBEK_COCUKTA_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI=JSON.parse(form.BEBEK_COCUKTA_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI)
            for (let index = 0; index < form.BEBEK_COCUKTA_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI.length; index++) {
                const e = form.BEBEK_COCUKTA_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI[index];
                BEBEK_COCUKTA_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI[index]={}
                BEBEK_COCUKTA_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI[index].KODU=e
                BEBEK_COCUKTA_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI[index].ADI=dbSkrs.prepare("SELECT * FROM BebekRiskTakipi WHERE KODU="+e).get().ADI           
            }
            SBform.BEBEK_COCUKTA_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI=BEBEK_COCUKTA_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI
        } 
        else SBform.BEBEK_COCUKTA_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI=-1

         
         SBform.SYSTakipNo=req.session.hasta.SysTakipNO
       
         resultSb=sys.BebekCocukPsikososyalIzlem(SBform)
    }

     c="','";
     var sql="INSERT INTO BebekIzlem (izlemSirasi,Ah, hastaId, Tarih, Agirlik, Boy, BasCevresi, GogusCevresi, KolCevresi, Degerlendirme, SentToMsvs, SentToMsvsTarih, Disarida, Dvit, Demir, AST, Hemoglobin, ProtokolNo, SentENabiz,"
     sql+=" SYSTakipNo, IslemYapanTc, BilgiAlinanKisiAdSoyAd, BilgiAlinanKisiTel, IslemYapilanKurumKodu, YurtDisindaYapilanKorum, Aciklama, BeyinGelisimIcinRiskler, BiyoTinidazEksikligi,GelisimTablosuBilgilerininSorgulanmasi,"
     sql+=" GelisimselKalcaCevresi, GozTaramasi, HiperFenilalAninemi, IsitmeTesti,Fontanel,Hematokrit,EbeveyninYaptigiAktiviteler,RisklereYonelikEgtimler,RiskFaktorlerineYapilanMudahele,RiskTakipi,Fenilketanuri,KonjentenalHipotiroid,TopukKani,KistikMyn,BeslenmeDurumu)";
     sql+="VALUES('";
     sql+=form.izlemSirasi+c+AH+c+form.hastaTC+c+form.izlemTarihi+c+form.kilo+c+form.boy+c+form.bascevresi+c+form.goguscevresi+c+form.kolcevresi+c+Degerlendirme+c+SentToMsvs+c+SentToMsvsTarih+c+form.bdi+c+form.DVitamini+c+form.DemirDestek
     sql+=c+form.sivitakviyesi+c+form.hemoglobin+c+PROTOKOLNO+c+SentENabiz+c+sysno+c+form.islemYapanTc+c+form.baAdSoyad+c+form.baTel+c+form.islemYer+c+YurtDisindaYapilanKorum+c+form.aciklama+c+form.BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER+c
     sql+=form.biyotOpt+c+form.GELISIM_TABLOSU_BILGILERININ_SORGULANMASI+c+form.gkd+c+form.GormeTaramaSonucu+c+form.hiperfenil+c+form.isitmerad+c+form.fontanal+c+form.hemotokrit+c+form.EBEVEYNIN_PSIKOLOJIK_GELISIMI_DESTEKLEYICI_AKTIVITELERI+c+form.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER+c+form.BEBEGIN_COCUGUN_RISK_FAKTORLERINE_YAPILAN_MUDAHALE
     sql+=c+form.BEBEK_COCUKTA_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI+c+form.fenilrad+c+form.konjenrad+c+TopukKani+c+form.kistikrad+c+form.BebekBeslenmeDurumu
     
     sql+="')";
     dbMelissa.prepare(sql).run()

    
     res.send(true);
}


module.exports.gebeizlem= async function(req,res){
        var hastaTc=req.body.hasta;
        var params={ };	
        params=await getBanner(hastaTc,'gebeizlem')

     
        params.DogumYontemi = dbSkrs.prepare("SELECT * FROM DogumYontemi WHERE AKTIF = 1;").all()
        params.DogumAgirligi = dbSkrs.prepare("SELECT * FROM DogumAgirligi WHERE AKTIF = 1;").all()
        gebeBildirim=dbMelissa.prepare("SELECT * FROM GebeBildirim WHERE hastaId="+hastaTc+' ORDER BY KayitZamani DESC LIMIT 1;').get()
        req.session.hasta=params.hasta
        params.islem=req.session.user
        params.doktorunKurumu = dbSkrs.prepare("SELECT * FROM Kurumlar WHERE KODU="+params.islem.KurumKodu).get()
        stmt = dbSkrs.prepare("SELECT * FROM Il");
        params.iller= stmt.all();
        stmt = dbSkrs.prepare("SELECT * FROM Ilce where ILKODU="+ params.doktorunKurumu.ILKODU);
        params.ilceler= stmt.all();
        stmt = dbSkrs.prepare("SELECT * FROM Kurumlar where ILKODU="+ params.doktorunKurumu.ILKODU+" AND ILCEKODU="+params.doktorunKurumu.ILCEKODU+" AND KURUMTURKODU="+params.doktorunKurumu.KURUMTURKODU);
        params.islem.islemYer= stmt.all();
        params.user=req.session.user

        params.medenihal=''
        if(params.hasta.MedeniHal!=0&&params.hasta.MedeniHal!='') params.medenihal=dbSkrs.prepare("SELECT * FROM MedeniHali WHERE KODU="+params.hasta.MedeniHal).get().ADI
        if(gebeBildirim.konjenitalAnom==-1)params.konjen='Yok'
        else params.konjen=dbSkrs.prepare("SELECT * FROM KonjenitalAnomali WHERE KODU="+gebeBildirim.konjenitalAnom).get().ADI
        params.esKanGrubu='-'
        params.KanGrubu='-'
        if(params.hasta.EsKanGrubu!='-') params.esKanGrubu=params.medenihal=dbSkrs.prepare("SELECT * FROM KanGrubu WHERE KODU="+params.hasta.EsKanGrubu).get().ADI
        if(params.hasta.KanGurubu!='-') params.KanGrubu=params.medenihal=dbSkrs.prepare("SELECT * FROM KanGrubu WHERE KODU="+params.hasta.KanGurubu).get().ADI
        
        izlemler=dbMelissa.prepare("SELECT * FROM GEBE_IZLEM where HastaId="+hastaTc).all()
        params.iz=izlemler
        params.asilar = dbSkrs.prepare("SELECT * FROM asilar WHERE AKTIF = 1;").all();
        params.asiuygulamasekli = dbSkrs.prepare("SELECT * FROM asiuygulamasekli WHERE AKTIF = 1;").all();
        params.asikaynak = dbSkrs.prepare("SELECT * FROM asikaynak WHERE AKTIF = 1;").all();
        params.asiuygulamayeri = dbSkrs.prepare("SELECT * FROM asiuygulamayeri WHERE AKTIF = 1;").all();
        params.asidoz = dbSkrs.prepare("SELECT * FROM asidoz WHERE AKTIF = 1;").all();
        params.AsiIslemTuru = dbSkrs.prepare("SELECT * FROM AsiIslemTuru WHERE AKTIF = 1;").all();
        params.ASI_OZEL_DURUM_NEDENI=dbSkrs.prepare("SELECT * FROM ASI_OZEL_DURUM_NEDENI WHERE AKTIF = 1;").all();

        params.td1=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=9 and ASI_DOZU=1').get()
        params.td2=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=9 and ASI_DOZU=2').get()
        params.td3=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=9 and ASI_DOZU=3').get()
        params.td4=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=9 and ASI_DOZU=4').get()
        params.td5=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=9 and ASI_DOZU=5').get()


        res.render('gebeizlem',params);               
}
module.exports.gebeYeniIzlem=async function(req,res){
    var hastaTc=req.session.hasta.Id;
    var params={ };	
    params=await getBanner(hastaTc,'gebeizlem')

    params.GelisSekli = dbSkrs.prepare("SELECT * FROM GelisSekli WHERE AKTIF = 1;").all()
    stmt = dbSkrs.prepare("SELECT * FROM KonjenitalAnomali WHERE AKTIF = 1;");
    params.KonjenitalAnomali= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM DVitamini WHERE AKTIF = 1;");
    params.DVitamini= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM DemirDestek WHERE AKTIF = 1;");
    params.DemirDestek= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM geberiskfaktor WHERE AKTIF = 1;");
    params.GebeRiskFaktor= stmt.all();

    stmt = dbSkrs.prepare("SELECT * FROM AsiIslemTuru WHERE AKTIF = 1;");
    params.AsiIslemTuru= stmt.all();

    stmt = dbSkrs.prepare("SELECT * FROM GestasyonelDiyabetTaramasi WHERE AKTIF = 1;");
    params.GestasyonelDiyabetTaramasi= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM KacinciGebeIzlem WHERE AKTIF = 1;");
    params.KacinciGebeIzlem= stmt.all();
    params.AsiIslemTuru=dbSkrs.prepare("SELECT * FROM AsiIslemTuru where AKTIF=1").all()

    stmt = dbSkrs.prepare("SELECT * FROM GebeTehlikeIsaret WHERE AKTIF = 1;");
    params.GebeTehlikeIsaret= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM BeyinGelisimiRiskler WHERE AKTIF = 1;");
    params.BeyinGelisimiRiskler= stmt.all();

    stmt = dbSkrs.prepare("SELECT * FROM GebeRiskFaktorlerineYapilanMudaheleler WHERE AKTIF =1;");
    params.RiskFaktorlerineYapilanMudaheleler= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM GebeRiskTakipi WHERE AKTIF =1;");
    params.RiskTakipi= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM idrardaProtein WHERE AKTIF = '1';");
    params.idrardaProtein= stmt.all();
    params.islem=req.session.user
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar WHERE KODU="+params.islem.KurumKodu);
    params.doktorunKurumu=stmt.get();
    stmt = dbSkrs.prepare("SELECT * FROM Il");
    params.iller= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Ilce where ILKODU="+ params.doktorunKurumu.ILKODU);
    params.ilceler= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar where ILKODU="+ params.doktorunKurumu.ILKODU+" AND ILCEKODU="+params.doktorunKurumu.ILCEKODU+" AND KURUMTURKODU="+params.doktorunKurumu.KURUMTURKODU);
    params.islem.islemYer= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM KadinSaglikIslemleri WHERE AKTIF = 1");
    params.KadinSaglikIslemleri= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM RisklereYonelikEgtimler WHERE AKTIF =1;");
    params.RisklereYonelikEgtimler= stmt.all();
    params.user=req.session.user
   

    res.render('gebeizlem-YeniIzlem',params);      
}
module.exports.gebeizlemKaydet=function(req,res){

    const form = JSON.parse(JSON.stringify(req.body))
    console.log(form)
    PROTOKOLNO='A-'+req.session.user.AH+'-2-001-A-'+moment().format('DDMMYYYYHHmmss');
    AH=req.session.user.AH;
    SenttoMsvsTarih=0
    SenttoMsvs=0
    if(form.odem==undefined){form.odem='-';}
    if(form.varis==undefined){form.varis='-';}
    if(form.bdi==undefined){form.bdi=0;}
    //-------------------------
 
    if(form.GEBELIKTE_RISK_FAKTORLERI==undefined){form.GEBELIKTE_RISK_FAKTORLERI='';}
    if(form.GEBELIK_SEYRINDE_TEHLIKE_ISARETI==undefined){form.GEBELIK_SEYRINDE_TEHLIKE_ISARETI='';}
    if(form.BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER==undefined){form.BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER='';}
    if(form.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER==undefined){form.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER='';}
    if(form.GEBEDE_RISK_FAKTORLERINE_YAPILAN_MUDAHALE==undefined){form.GEBEDE_RISK_FAKTORLERINE_YAPILAN_MUDAHALE='';}
    if(form.GEBEDE_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI==undefined){form.GEBEDE_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI='';}


     c="','";
     var sql="INSERT INTO GEBE_IZLEM (KacinciGebeIzlem,Ah, hastaId,Tarih, Agirlik, Nabiz, SKanBAsinci, DKanBAsinci, IdrardaProtein, Hemoglobin, FetusKalpSesi, SenttoMsvsTarih, SenttoMsvs, Odem, Varis, GelisBicimi, SistemicMuayene,"
    sql+="IzlemDisarda, ProtokolNo,Demir,Dvit,Gestasyonel_Diabet_Taramasi,GebelikteRiskDurumu,SysTakipNo,IslemYapanTc,BilgiAlinanKisiAdSoyAd,IslemYapanKurumKodu,BilgiAlinanKisiTel,RiskAciklama,"
    sql+="bebekBeyinGelisimi,TehlikeliIsaretler,riskOlgununTakibi,RiskFaktorleri,KonAnomali,risklereYapilanMudaheleler,psikolojikEgitimler,islemTuru,Aciklama";

     sql+=")";
     sql+="VALUES('";
     sql+=form.KacinciGebeIzlem+c+AH+c+form.hastaTC+c+form.izlemTarihi+c+form.kilo+c+form.Nabiz+c+form.tanS+c+form.tanD+c+form.idrardaProtein+c+form.hemoglobin+c+form.secilenFTSler+c+SenttoMsvsTarih+c+SenttoMsvs+c+form.odem+c+form.varis+c+form.GelisSekli+c
     sql+=form.sistemikMyn+c+form.bdi+c+PROTOKOLNO+c+form.DemirDestek+c+form.DVitamini+c+form.secilenGDTler+c+form.riskDurumu+c+req.session.hasta.SysTakipNO+c+form.islemYapanTc+c+form.baAdSoyad+c+form.islemYer+c
     sql+=form.baTel+c+form.riskAciklama+c+form.BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER+c+form.GEBELIK_SEYRINDE_TEHLIKE_ISARETI+c+form.GEBEDE_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI+c+form.GEBELIKTE_RISK_FAKTORLERI+c+form.KonjenitalAnomali+c+form.GEBEDE_RISK_FAKTORLERINE_YAPILAN_MUDAHALE+c+form.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER+c+form.izlemIslemTuru+c+form.aciklama
     sql+="')";

     var stmt = dbMelissa.prepare(sql);
     stmt.run()
    if(form.sbGonder==1){
        SBform={}
        if(form.KonjenitalAnomali!='-1'){
            SBform.KONJENITAL_ANOMALI_VARLIGI={}
            SBform.KONJENITAL_ANOMALI_VARLIGI.KODU=form.KonjenitalAnomali
            SBform.KONJENITAL_ANOMALI_VARLIGI.ADI=dbSkrs.prepare("SELECT * FROM KonjenitalAnomali WHERE KODU="+form.KonjenitalAnomali).get().ADI
        } 
        else SBform.KONJENITAL_ANOMALI_VARLIGI=-1

        GESTASYONEL_DIYABET_TARAMASI=[]

        if(form.secilenGDTler[0]!=''){
            form.secilenGDTler=JSON.parse(form.secilenGDTler)
            for (let index = 0; index < form.secilenGDTler.length; index++) {
                const e = form.secilenGDTler[index];
                GESTASYONEL_DIYABET_TARAMASI[index]={}
                console.log(e)
                GESTASYONEL_DIYABET_TARAMASI[index].KODU=e
                GESTASYONEL_DIYABET_TARAMASI[index].ADI=dbSkrs.prepare("SELECT * FROM GestasyonelDiyabetTaramasi WHERE KODU="+e).get().ADI           
            }
            SBform.GESTASYONEL_DIYABET_TARAMASI=GESTASYONEL_DIYABET_TARAMASI
        } 
        else SBform.GESTASYONEL_DIYABET_TARAMASI=-1


        if(form.hemoglobinDegeri!='') SBform.HEMOGLOBIN=form.hemoglobinDegeri
        else SBform.HEMOGLOBIN=-1
        
        SBform.IZLEM_ISLEM_TURU={}
        SBform.IZLEM_ISLEM_TURU.KODU=form.izlemIslemTuru
        SBform.IZLEM_ISLEM_TURU.ADI=dbSkrs.prepare("SELECT * FROM AsiIslemTuru WHERE KODU="+form.izlemIslemTuru).get().ADI  
        
        SBform.KACINCI_GEBE_IZLEM={}
        SBform.KACINCI_GEBE_IZLEM.KODU=form.KacinciGebeIzlem
        SBform.KACINCI_GEBE_IZLEM.ADI=dbSkrs.prepare("SELECT * FROM KacinciGebeIzlem WHERE KODU="+form.KacinciGebeIzlem).get().ADI  
       
        if(form.idrardaProtein!='-1'){
            SBform.IDRARDA_PROTEIN={}
            SBform.IDRARDA_PROTEIN.KODU=form.idrardaProtein
            SBform.IDRARDA_PROTEIN.ADI=dbSkrs.prepare("SELECT * FROM idrardaProtein WHERE KODU="+form.idrardaProtein).get().ADI
        } 
        else SBform.IDRARDA_PROTEIN=-1

        SBform.D_VITAMINI_LOJISTIGI_VE_DESTEGI={}
        SBform.D_VITAMINI_LOJISTIGI_VE_DESTEGI.KODU=form.DVitamini
        SBform.D_VITAMINI_LOJISTIGI_VE_DESTEGI.ADI=dbSkrs.prepare("SELECT * FROM DVitamini WHERE KODU="+form.DVitamini).get().ADI

        SBform.DEMIR_LOJISTIGI_VE_DESTEGI={}
        SBform.DEMIR_LOJISTIGI_VE_DESTEGI.KODU=form.DemirDestek
        SBform.DEMIR_LOJISTIGI_VE_DESTEGI.ADI=dbSkrs.prepare("SELECT * FROM DemirDestek WHERE KODU="+form.DemirDestek).get().ADI
        if(form.boy!='') SBform.BOY=form.boy
        else SBform.BOY=-1

        if(form.kilo!='') SBform.KILO=form.kilo
        else SBform.KILO=-1
        
        FETUS_KALP_SESI=[]
        form.secilenFTSler=JSON.parse(form.secilenFTSler)
        if(form.secilenFTSler.length!=0){
            for (let index = 0; index < form.secilenFTSler.length; index++) {
                const e = form.secilenFTSler[index];
                FETUS_KALP_SESI[index]={}
                FETUS_KALP_SESI[index]=e
            }
            SBform.FETUS_KALP_SESI=FETUS_KALP_SESI
        } 
        else SBform.FETUS_KALP_SESI=-1
        console.log(SBform.FETUS_KALP_SESI)

        
        SBform.SYSTakipNo=req.session.hasta.SysTakipNO
       
        resultSb=sys.GebeIzlemVeriSetiPaketi(SBform)
    }
    if(form.BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER!=='' & form.sbGonder==1){
        SBform={}
        BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER=[]
        form.BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER=JSON.parse(form.BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER)
        for (let index = 0; index < form.BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER.length; index++) {
            const e = form.BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER[index];
            BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER[index]={}
            BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER[index].KODU=e
            BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER[index].ADI=dbSkrs.prepare("SELECT * FROM BeyinGelisimiRiskler WHERE KODU="+e).get().ADI           
        }
        SBform.BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER=BEBEGIN_COCUGUN_BEYIN_GELISIMINI_ETKILEYEBILECEK_RISKLER
        BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER=[]
        if(form.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER!=''){
            form.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER=JSON.parse(form.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER)
            for (let index = 0; index < form.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER.length; index++) {
                const e = form.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER[index];
                BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER[index]={}
                BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER[index].KODU=e
                BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER[index].ADI=dbSkrs.prepare("SELECT * FROM RisklereYonelikEgtimler WHERE KODU="+e).get().ADI           
            }
            SBform.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER=BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER
        } 
        else SBform.BEBEGIN_COCUGUN_PSIKOLOJIK_GELISIMINDEKI_RISKLERE_YONELIK_EGITIMLER=-1

        GEBEDE_RISK_FAKTORLERINE_YAPILAN_MUDAHALE=[]
        if(form.GEBEDE_RISK_FAKTORLERINE_YAPILAN_MUDAHALE!=''){
            form.GEBEDE_RISK_FAKTORLERINE_YAPILAN_MUDAHALE=JSON.parse(form.GEBEDE_RISK_FAKTORLERINE_YAPILAN_MUDAHALE)
            for (let index = 0; index < form.GEBEDE_RISK_FAKTORLERINE_YAPILAN_MUDAHALE.length; index++) {
                const e = form.GEBEDE_RISK_FAKTORLERINE_YAPILAN_MUDAHALE[index];
                GEBEDE_RISK_FAKTORLERINE_YAPILAN_MUDAHALE[index]={}
                GEBEDE_RISK_FAKTORLERINE_YAPILAN_MUDAHALE[index].KODU=e
                GEBEDE_RISK_FAKTORLERINE_YAPILAN_MUDAHALE[index].ADI=dbSkrs.prepare("SELECT * FROM GebeRiskFaktorlerineYapilanMudaheleler WHERE KODU="+e).get().ADI           
            }
            SBform.GEBEDE_RISK_FAKTORLERINE_YAPILAN_MUDAHALE=GEBEDE_RISK_FAKTORLERINE_YAPILAN_MUDAHALE
        } 
        else SBform.GEBEDE_RISK_FAKTORLERINE_YAPILAN_MUDAHALE=-1

        GEBEDE_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI=[]
        if(form.GEBEDE_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI!=''){
            form.GEBEDE_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI=JSON.parse(form.GEBEDE_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI)
            for (let index = 0; index < form.GEBEDE_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI.length; index++) {
                const e = form.GEBEDE_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI[index];
                GEBEDE_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI[index]={}
                GEBEDE_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI[index].KODU=e
                GEBEDE_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI[index].ADI=dbSkrs.prepare("SELECT * FROM GebeRiskTakipi WHERE KODU="+e).get().ADI           
            }
            SBform.GEBEDE_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI=GEBEDE_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI
        } 
        else SBform.GEBEDE_SIK_IZLEME_ALINAN_RISK_ALTINDAKI_OLGUNUN_TAKIBI=-1

         


        SBform.SYSTakipNo=req.session.hasta.SysTakipNO
       
        resultSb=sys.GebePsikososyalIzlem(SBform)
    }
    res.send(true);

}


module.exports.diğerGebelikler=async function(req,res){
    var hastaTc=req.session.hasta.Id;
    var params={ };	
    params=await getBanner(hastaTc,'gebeizlem')

    params.hasta_hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Hasta_Gruplari INNER JOIN Hasta_Gruplari on Hasta_Hasta_Gruplari.grupId=Hasta_Gruplari.grupId WHERE Hasta_Hasta_Gruplari.hastaId="+hastaTc).all()
    params.hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Gruplari ").all()
    var stmt = dbMelissa.prepare("SELECT * FROM Hasta WHERE Id="+hastaTc);
    params.hasta= stmt.get();
    params.hasta.age=getAge(params.hasta.DogumTarihi);
    stmt = dbSkrs.prepare("SELECT * FROM GelisSekli WHERE AKTIF = 1;");
    params.GelisSekli= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM KonjenitalAnomali WHERE AKTIF = 1;");
    params.KonjenitalAnomali= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM DVitamini WHERE AKTIF = 1;");
    params.DVitamini= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM DemirDestek WHERE AKTIF = 1;");
    params.DemirDestek= stmt.all();
    params.islem=req.session.user
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar WHERE KODU="+params.islem.KurumKodu);
    params.doktorunKurumu=stmt.get();
    stmt = dbSkrs.prepare("SELECT * FROM Il");
    params.iller= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Ilce where ILKODU="+ params.doktorunKurumu.ILKODU);
    params.ilceler= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar where ILKODU="+ params.doktorunKurumu.ILKODU+" AND ILCEKODU="+params.doktorunKurumu.ILCEKODU+" AND KURUMTURKODU="+params.doktorunKurumu.KURUMTURKODU);
    params.islem.islemYer= stmt.all();
    params.ai=await getAi(params.hasta.Id)

    var stmt = dbMelissa.prepare("SELECT * FROM GEBELİK_SONUC where HastaId="+hastaTc)
    dogumlar= stmt.all()
    array=[]
    for (let index = 0; index < dogumlar.length; index++) {
        const e = dogumlar[index];
                stmt = dbSkrs.prepare("SELECT * FROM GebelikSonucu WHERE KODU="+e.GebelikSonucu);
                e.GebelikSonucu= stmt.get().ADI;
                stmt = dbSkrs.prepare("SELECT * FROM DogumYontemi WHERE KODU="+e.DogumYontemi);
                e.DogumYontemi= stmt.get().ADI;;
                stmt = dbSkrs.prepare("SELECT * FROM DogumaYardimEden WHERE KODU="+e.DogumaYardimEden);
                e.DogumaYardimEden= stmt.get().ADI;;
                stmt = dbSkrs.prepare("SELECT * FROM DogumGerceklestigiYer where KODU="+e.DogumYer);
                e.DogumYer= stmt.get().ADI;;

        var stmt = dbMelissa.prepare("SELECT * FROM GEBE_SONUC_DOGUM_BILDIRIM where gebelikSonucId="+e.id)
        bebekler= stmt.all()
        array.push({gebelikBilgileri:e,bebekler:bebekler})
    }
    params.gebelikler=array
    params.user=req.session.user
    params.aileBilgileri = dbMelissa.prepare("SELECT * FROM Hasta_Aile_Bilgileri WHERE hastaId="+hastaTc).all()

    res.render('gebeizlem-digerGebelikler',params);               
}
module.exports.gebelikSonlandırmaSayfası=async function(req,res){
    var hastaTc=req.session.hasta.Id;
    var params={ };	
    params=await getBanner(hastaTc,'gebeizlem')

    params.hasta_hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Hasta_Gruplari INNER JOIN Hasta_Gruplari on Hasta_Hasta_Gruplari.grupId=Hasta_Gruplari.grupId WHERE Hasta_Hasta_Gruplari.hastaId="+hastaTc).all()
    params.hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Gruplari ").all()
    params.hasta= dbMelissa.prepare("SELECT * FROM Hasta WHERE Id="+hastaTc).get();


    //***************************İzlemler banner
   // params.izlemler=dbMelissa.prepare("SELECT * FROM KADIN_IZLEM WHERE HastaId="+hastaTc).all()
   // if(==0){params.izlemler.KonjenitalDogumVarligi='Yok'}else{params.izlemler.KonjenitalDogumVarligi='Var'}
    // for (let index = 0; index < params.izlemler.length; index++) {
    //     params.izlemler[index].KonjenitalDogumVarligi=dbSkrs.prepare("SELECT * FROM KonjenitalAnomali WHERE KODU="+params.izlemler[index].KonjenitalDogumVarligi+";").get().ADI
    //     params.izlemler[index].ApKullanmamaNedeni=dbSkrs.prepare("SELECT * FROM APKullanmamaNedeni WHERE KODU="+params.izlemler[index].ApKullanmamaNedeni+";").get().ADI
    //     params.izlemler[index].BirOncekiAPYontemi=dbSkrs.prepare("SELECT * FROM APOncekiYontem WHERE KODU="+params.izlemler[index].BirOncekiAPYontemi+";").get().ADI
    //     params.izlemler[index].APYontemi=dbSkrs.prepare("SELECT * FROM APYontemleri WHERE KODU="+params.izlemler[index].APYontemi+";").get().ADI
    //     params.izlemler[index].ApLojistigi=dbSkrs.prepare("SELECT * FROM APYontemLojistik WHERE KODU="+params.izlemler[index].ApLojistigi+";").get().ADI
    //     if(params.izlemler[index].TalasemiTasiyiciligi==0){params.izlemler[index].TalasemiTasiyiciligi='Yok'}else{params.izlemler[index].TalasemiTasiyiciligi='Var'}
    //     if(params.izlemler[index].HbsTasiyiciligi==0){params.izlemler[index].HbsTasiyiciligi='Yok'}else{params.izlemler[index].HbsTasiyiciligi='Var'}
    //     if(params.izlemler[index].Disarda==0){params.izlemler[index].Disarda='Hayır'}else{params.izlemler[index].Disarda='Evet'}
    //     params.izlemler[index].RiskTespitKodu=params.izlemler[index].RiskTespitKodu.replace('%',',')
    //     params.izlemler[index].UremeSaglikDanismalik=params.izlemler[index].UremeSaglikDanismalik.replace('%',',')
    //     params.izlemler[index].CybeBulguSorgulama=params.izlemler[index].CybeBulguSorgulama.replace('%',',')

    //     if(params.izlemler[index].RiskFaktorleri!=''){
    //         RiskFaktorleri= params.izlemler[index].RiskFaktorleri.split('%')
    //         for (let i = 0; i < RiskFaktorleri.length; i++) {
    //             const e = RiskFaktorleri[i];
    //             if(i==0)params.izlemler[index].RiskFaktorleri=dbSkrs.prepare("SELECT * FROM KadinSaglikRiskFaktorleri WHERE KODU="+e+";").get().ADI
    //             else params.izlemler[index].RiskFaktorleri+=','+dbSkrs.prepare("SELECT * FROM KadinSaglikRiskFaktorleri WHERE KODU="+e+";").get().ADI
    //         }
    //     }
    //     if(params.izlemler[index].SaglikIslemler!=''){
    //         SaglikIslemler= params.izlemler[index].SaglikIslemler.split('%')
    //         for (let i = 0; i < SaglikIslemler.length; i++) {
    //             const e = SaglikIslemler[i];
    //             if(i==0)params.izlemler[index].SaglikIslemler=dbSkrs.prepare("SELECT * FROM KadinSaglikIslemleri WHERE KODU="+e+";").get().ADI
    //             else params.izlemler[index].SaglikIslemler+=','+dbSkrs.prepare("SELECT * FROM KadinSaglikIslemleri WHERE KODU="+e+";").get().ADI
    //         }      
    //     }
    //     if(params.izlemler[index].KadinaSiddetDegerlendirme!=''){
    //             KadinaSiddetDegerlendirme= params.izlemler[index].KadinaSiddetDegerlendirme.split('%')
    //             for (let i = 0; i < KadinaSiddetDegerlendirme.length; i++) {
    //                 const e = KadinaSiddetDegerlendirme[i];
    //                 if(i==0)params.izlemler[index].KadinaSiddetDegerlendirme=dbSkrs.prepare("SELECT * FROM KadinSaglikIslemleri WHERE KODU="+e).get().ADI
    //                 else params.izlemler[index].KadinaSiddetDegerlendirme+=','+dbSkrs.prepare("SELECT * FROM KadinSaglikIslemleri WHERE KODU="+e+";").get().ADI
    //             }
    //     }
    //     if(params.izlemler[index].SiddetTuru!=''){
    //         SiddetTuru= params.izlemler[index].SiddetTuru.split('%')
    //         for (let i = 0; i < SiddetTuru.length; i++) {
    //             const e = SiddetTuru[i];
    //             if(i==0)params.izlemler[index].SiddetTuru=dbSkrs.prepare("SELECT * FROM SiddetTuru WHERE KODU="+e+";").get().ADI
    //             else params.izlemler[index].SiddetTuru+=','+dbSkrs.prepare("SELECT * FROM SiddetTuru WHERE KODU="+e+";").get().ADI
    //         }
    //     }
      
    // }
    //***************************daha fazla banner
   



    params.hasta.age=getAge(params.hasta.DogumTarihi);
    stmt = dbSkrs.prepare("SELECT * FROM GebelikSonucu WHERE AKTIF = 1;");
    params.GebelikSonucu= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM DogumYontemi WHERE AKTIF = 1;");
    params.DogumYontemi= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM DogumaYardimEden WHERE AKTIF = 1;");
    params.DogumaYardimEden= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM DogumGerceklestigiYer WHERE AKTIF = 1;");
    params.DogumGerceklestigiYer= stmt.all();
    params.islem=req.session.user
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar WHERE KODU="+params.islem.KurumKodu);
    params.doktorunKurumu=stmt.get();
    stmt = dbSkrs.prepare("SELECT * FROM Il");
    params.iller= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Ilce where ILKODU="+ params.doktorunKurumu.ILKODU);
    params.ilceler= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar where ILKODU="+ params.doktorunKurumu.ILKODU+" AND ILCEKODU="+params.doktorunKurumu.ILCEKODU+" AND KURUMTURKODU="+params.doktorunKurumu.KURUMTURKODU);
    params.islem.islemYer= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM UlkeKodu WHERE AKTIF = 1;");
    params.UlkeKodu= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM DogumSirasi WHERE AKTIF = 1;");
    params.DogumSirasi= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM SezaryanEndikasyonlar WHERE AKTIF = 1;");
    params.SezaryanEndikasyonlar= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM EndikasyonNedenleri WHERE AKTIF = 1;");
    params.EndikasyonNedenleri= stmt.all();
    sql = "SELECT * FROM ICD10 WHERE AKTIF = 1 LIMIT 50;"
    stmt = dbSkrs.prepare(sql);
    params.ICDLER=stmt.all();
    params.user=req.session.user
    params.aileBilgileri = dbMelissa.prepare("SELECT * FROM Hasta_Aile_Bilgileri WHERE hastaId="+hastaTc).all()

    res.render('gebeizlem-gebelikSonlandır',params);               
}
async function bebekDbEkle(e){

    mernisBilgileri = await mernis.KimlikNoIleNufusKayitOrnegiSorgula(e.tc)

    if(mernisBilgileri.NkoVatandas==undefined){//bebek mernise kayıtlı değil manuel gir db ye bilgileri
        c="','"
        cinsiyet=1
        if(e.cinsiyet=='Kadın') cinsiyet=2
        sql="INSERT OR IGNORE INTO Hasta (Ad,Soyad,AnneTcKimlikNo,Cinsiyet,YeniDoganKayit_DogumSirasi,DogumTarihi,ResmiDogumTarihi,MobilHizmet,Id,MedeniHal) VALUES" 
        sql+="('"+e.isim+c+e.soyisim+c+e.anneTc+c+cinsiyet+c+e.dogumSirasi+c+e.dogumTarihi+c+e.dogumTarihi+c+false+c+e.tc+c+1+"');"
        dbMelissa.prepare(sql).run()  
    }
    else{
       aileBireyleri=mernisBilgileri.NkoVatandas.Kisiler.NkoKisi
       for (let index = 0; index < aileBireyleri.length; index++) {
          const a = aileBireyleri[index];
          if(a.YakinlikKod.Kod==1){//kendisi
             b=a.TemelBilgisi
             d=a.DurumBilgisi
             c="','"
             dogumTarihi=b.DogumTarih.Yil+'-'+b.DogumTarih.Ay+'-'+b.DogumTarih.Gun

             sql="INSERT OR IGNORE INTO Hasta (Ad,Soyad,AnneTcKimlikNo,Cinsiyet,YeniDoganKayit_DogumSirasi,DogumTarihi,ResmiDogumTarihi,MobilHizmet,Id,MedeniHal,DogumYeri) VALUES" 
             sql+="('"+b.Ad+c+b.Soyad+c+e.anneTc+c+b.Cinsiyet.Kod+c+e.dogumSirasi+c+dogumTarihi
             sql+=c+dogumTarihi+c+0+c+e.tc+c+d.Durum.Kod+c+b.DogumYer+"');"
             dbMelissa.prepare(sql).run()           
          }
          else{
             b=a.TemelBilgisi
             d=a.DurumBilgisi
                         if(a.YakinlikKod.Kod==2){//babası
                            sql=`UPDATE Hasta  SET AnneAd='${b.Ad}'  WHERE Id='${e.ID}'`
                            dbMelissa.prepare(sql).run()
                         }
                         if(a.YakinlikKod.Kod==3){//annesi
                            sql=`UPDATE Hasta  SET BabaAd='${b.Ad}'  WHERE Id='${e.ID}'`
                            dbMelissa.prepare(sql).run()
                         }
                         dogumTarihi=b.DogumTarih.Yil+'-'+b.DogumTarih.Ay+'-'+b.DogumTarih.Gun
                         olumTarihi=d.OlumTarih.Yil+'-'+d.OlumTarih.Ay+'-'+d.OlumTarih.Gun
                         sql="INSERT or replace INTO Hasta_Aile_Bilgileri (hastaId,yTc,yakinlik,yAd,ySoyad,yCinsiyet,yDogumTarihi,yMedeniHal,yOlumTarihi,yil,yilce) VALUES" 
                         sql+="('"+e.tc+c+a.TCKimlikNo+c+a.YakinlikKod.Aciklama+c+b.Ad+c+b.Soyad+c+b.Cinsiyet.Aciklama+c
                         sql+=dogumTarihi+c+d.MedeniHal.Aciklama+c+olumTarihi+c+a.KayitYeriBilgisi.Il.Aciklama+c+a.KayitYeriBilgisi.Ilce.Aciklama+"');"
                         dbMelissa.prepare(sql).run()                                      
          }
       }
    }
    //adres bilgilerini annesiyle aynı yapalım
    sql = "SELECT * FROM Hasta_Adres_Iletisim WHERE tc="+e.anneTc
    aa = dbMelissa.prepare(sql).get()
    if(aa!=undefined){
       sql="INSERT or replace INTO Hasta_Adres_Iletisim (tc,evtel,ceptel,istel,il,ilce,mahalle,koy,icKapi,disKapi,acikAdres,mail,adresKodu,ADRES_KODU_SEVIYESI) VALUES('"
       sql+=e.tc+c+aa.evtel+c+aa.ceptel+c+aa.istel+c+aa.il+c+aa.ilce+c+aa.mahalle+c+aa.koy+c+aa.icKapi+c+aa.disKapi+c+aa.acikAdres+c+aa.mail+c+aa.adresKodu+c+aa.ADRES_KODU_SEVIYESI+"');"            
       dbMelissa.prepare(sql).run()
    }
   
    //özgeçmiş olulturalım
    dbMelissa.prepare('INSERT INTO hasta_ozgecmis VALUES (?,?,?,?,?,?,?,?,?,?,?)').run(e.tc,0,0,0,0,0,0,0,0,0,0);
}
module.exports.gebelikSonlandır=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
   
    var stmt = dbMelissa.prepare("SELECT * FROM Hasta WHERE Id="+req.session.hasta.Id);
    hasta= stmt.get();
    
    if(hasta.gebe==1){// gebelik osnlanmamışsa sonlarndır.
        dbMelissa.prepare('UPDATE Hasta SET gebe = ?, lohusa=? where Id=?').run(0,1,form.gebeTc);

        PROTOKOLNO='A-'+req.session.user.AH+'-2-001-A-'+moment().format('DDMMYYYYHHmmss');
        AH=req.session.user.AH;
        SenttoMsvsTarih=0
        SenttoMsvs=0
        if(form.premature==undefined){form.premature=0;}
        if(form.anneOldu==undefined){form.anneOldu=0;}

        c="','";
        sql="INSERT INTO GEBELİK_SONUC (Ah, HastaId,GebelikSonlanmaTarihi,Tarih,GebelikSonucu,DogumYontemi,DogumYer,DogumaYardimEden,CanliDogumSayisi,OluDogumSayisi,ProtokolNo,SezaryanEndikasyon,SentToENabiz,SysTakipNo,Premature,DogumdaAnneOLdu,KomplikasyonTanilari,EndikasyonNedenleri"

        sql+=") VALUES('";
        sql+=AH+c+form.gebeTc+c+form.sonlanmaTarih+c+moment().format("YYYY-MM-DD")+c+form.GebelikSonucu+c+form.dogumYontemi+c+form.dogumGerceklesmeYeri+c+form.dogumayardımEden+c+form.canliBebekSayisi+c+form.oluBebekSayisi+c
        sql+=PROTOKOLNO+c+form.sezeryanEndikasyon+c+SenttoMsvs+c+req.session.hasta.SysTakipNO+c+form.premature+c+form.anneOldu+c+form.secilenTanilar+c+form.secilenEndikasyonlar
        sql+="')";
        dbMelissa.prepare(sql).run()
    }
    var stmt = dbMelissa.prepare("SELECT * FROM GEBELİK_SONUC where HastaId="+form.gebeTc+" ORDER BY GebelikSonlanmaTarihi DESC LIMIT 1;");
    gebelikSonuc= stmt.get();//gebelikSonuc.id
    bebekler=JSON.parse(form.bebekler)
    for (let index = 0; index < bebekler.length; index++) {
        const e = bebekler[index];
        c="','";
        sql="INSERT INTO GEBE_SONUC_DOGUM_BILDIRIM (AnneTcKimlikNo,DogumSirasi,Agirlik,BasCevresi,Apgar1,Apgar5,boy,uyruk,cinsiyet,isim,soyisim,tcNo,gebelikSonucId,dogumTarihi"
    
        sql+=") VALUES('";
        sql+=form.gebeTc+c+e.dogumSirasi+c+e.kilo+c+e.basCevresi+c+e.apgar1+c+e.apgar5+c+e.boy+c+e.uyruk+c+e.cinsiyet+c+e.isim+c+e.soyisim+c+e.tc+c+gebelikSonuc.id+c+form.dogumTarihi
        sql+="')";
        var stmt = dbMelissa.prepare(sql).run()
        await bebekDbEkle(e)

    }


   
    //---------------bebeği hasta tablosuna eklenmemişse ekle---- eklenmiştir doktor uss güncellediğinde
 


    //--------SYS GÖNDER------
    // console.log(form.sonlanmaTarih)
    // SBform={}
    // SBform.SYSTakipNo=req.session.hasta.SysTakipNO
    // SBform.GEBELIK_SONLANMA_TARIHI=new Date(form.sonlanmaTarih).toISOString().replace(/[^0-9]/g, "").slice(0, -5)

    // SBform.GEBELIK_SONUCU={}
    // SBform.GEBELIK_SONUCU.KODU=form.GebelikSonucu
    // SBform.GEBELIK_SONUCU.ADI=dbSkrs.prepare("SELECT * FROM GebelikSonucu WHERE KODU="+form.GebelikSonucu).get().ADI

    // await sys.GebelikSonucuVeriSetiPaketi(SBform)

    res.json({result:true});


    
    
}

module.exports.lohusaizlem= async function(req,res){
    var hastaTc=req.body.hasta;
    var params={ };	
    params=await getBanner(hastaTc,'lohusaizlem')

    params.hasta_hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Hasta_Gruplari INNER JOIN Hasta_Gruplari on Hasta_Hasta_Gruplari.grupId=Hasta_Gruplari.grupId WHERE Hasta_Hasta_Gruplari.hastaId="+hastaTc).all()
    params.hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Gruplari ").all()
    params.hasta = dbMelissa.prepare("SELECT * FROM Hasta WHERE Id="+hastaTc).get()

    params.MedeniHali = dbSkrs.prepare("SELECT * FROM MedeniHali WHERE KODU="+params.hasta.MedeniHal).get().ADI;
    params.KanGrubu=params.hasta.KanGurubu
    if(params.hasta.KanGurubu!='-') params.KanGrubu=dbSkrs.prepare("SELECT * FROM KanGrubu WHERE KODU="+params.hasta.KanGurubu).get().ADI;

   
    params.sonGebelikSonuc = dbMelissa.prepare("SELECT * FROM GEBELİK_SONUC WHERE HastaId="+hastaTc).get()
    params.sonGebeBildirim = dbMelissa.prepare("SELECT * FROM GebeBildirim WHERE HastaId="+hastaTc).get()

    params.konj=params.sonGebeBildirim.konjenitalAnom
    if(params.konj!='-1') params.konj=dbSkrs.prepare("SELECT * FROM KonjenitalAnomali WHERE KODU="+params.konj).get().ADI;

    params.sonGebelikSonuc.GebelikSonucu=dbSkrs.prepare("SELECT * FROM GebelikSonucu WHERE KODU="+params.sonGebelikSonuc.GebelikSonucu).get().ADI;
    params.sonGebelikSonuc.DogumYontemi=dbSkrs.prepare("SELECT * FROM DogumYontemi WHERE KODU="+params.sonGebelikSonuc.DogumYontemi).get().ADI;
    params.sonGebelikSonuc.DogumaYardimEden=dbSkrs.prepare("SELECT * FROM DogumaYardimEden WHERE KODU="+params.sonGebelikSonuc.DogumaYardimEden).get().ADI;
    params.sonGebelikSonuc.DogumYer=dbSkrs.prepare("SELECT * FROM DogumGerceklestigiYer WHERE KODU="+params.sonGebelikSonuc.DogumYer).get().ADI;
    if(params.sonGebelikSonuc.Premature==0) params.sonGebelikSonuc.Premature='Hayır'
    else params.sonGebelikSonuc.Premature='Evet'
    //sonGebeBildirim.konjenitalAnom
    params.hasta.age=getAge(params.hasta.DogumTarihi);
    req.session.hasta= params.hasta   
    stmt = dbSkrs.prepare("SELECT * FROM DogumYontemi WHERE AKTIF = 1;");
    params.DogumYontemi= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM DogumAgirligi WHERE AKTIF = 1;");
    params.DogumAgirligi= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM DVitamini WHERE AKTIF = 1;");
    params.DVitamini= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM DemirDestek WHERE AKTIF = 1;");
    params.DemirDestek= stmt.all();
    params.islem=req.session.user
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar WHERE KODU="+params.islem.KurumKodu);
    params.doktorunKurumu=stmt.get();
    stmt = dbSkrs.prepare("SELECT * FROM Il");
    params.iller= stmt.all();
    
    stmt = dbSkrs.prepare("SELECT * FROM Ilce where ILKODU="+ params.doktorunKurumu.ILKODU);
    params.ilceler= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar where ILKODU="+ params.doktorunKurumu.ILKODU+" AND ILCEKODU="+params.doktorunKurumu.ILCEKODU+" AND KURUMTURKODU="+params.doktorunKurumu.KURUMTURKODU);
    params.islem.islemYer= stmt.all();
    params.user=req.session.user
    params.ai=await getAi(hastaTc)
    params.aileBilgileri = dbMelissa.prepare("SELECT * FROM Hasta_Aile_Bilgileri WHERE hastaId="+hastaTc).all()
    
    izlemler=dbMelissa.prepare("SELECT * FROM Gebe_Lohusa_Izlem where HastaId="+hastaTc).all()
    params.iz=izlemler

    res.render('lohusaizlem',params);               
}

module.exports.ozellikliIzlem= async function(req,res){
    var hastaTc=req.body.hasta;
    var params={ };	
    params=await getBanner(hastaTc,'ozellikliIzlem')
    params.islem=req.session.user
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar WHERE KODU="+params.islem.KurumKodu);
    params.doktorunKurumu=stmt.get();
    stmt = dbSkrs.prepare("SELECT * FROM Il");
    params.iller= stmt.all();
    
    stmt = dbSkrs.prepare("SELECT * FROM Ilce where ILKODU="+ params.doktorunKurumu.ILKODU);
    params.ilceler= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar where ILKODU="+ params.doktorunKurumu.ILKODU+" AND ILCEKODU="+params.doktorunKurumu.ILCEKODU+" AND KURUMTURKODU="+params.doktorunKurumu.KURUMTURKODU);
    params.islem.islemYer= stmt.all();
    params.user=req.session.user
 
    params.hasta = dbMelissa.prepare("SELECT * FROM Hasta WHERE Id="+hastaTc).get()
    req.session.hasta=params.hasta

    params.kacıncıOzelIzlem=dbSkrs.prepare("SELECT * FROM KacinciOzellikliIzlem WHERE AKTIF = 1;").all()
    params.izlemislemTuru=dbSkrs.prepare("SELECT * FROM AsiIslemTuru WHERE AKTIF = 1;").all()


    res.render('ozellikliIzlem',params);               
}



module.exports.lohusaYeniIzlem=async function(req,res){
    var hastaTc=req.session.hasta.Id;
    var params={ };	
    params=await getBanner(hastaTc,'lohusaizlem')

    params.hasta_hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Hasta_Gruplari INNER JOIN Hasta_Gruplari on Hasta_Hasta_Gruplari.grupId=Hasta_Gruplari.grupId WHERE Hasta_Hasta_Gruplari.hastaId="+hastaTc).all()
    params.hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Gruplari ").all()
    var stmt = dbMelissa.prepare("SELECT * FROM Hasta WHERE Id="+hastaTc);
    params.hasta= stmt.get();
    params.hasta.age=getAge(params.hasta.DogumTarihi);
    req.session.hasta= params.hasta   
    stmt = dbSkrs.prepare("SELECT * FROM GebeTehlikeIsaret WHERE AKTIF = 1;");
    params.GebeTehlikeIsaret= stmt.all();

    stmt = dbSkrs.prepare("SELECT * FROM ICD10 WHERE AKTIF = 1 LIMIT 50;");
    params.komplikasyonlar= stmt.all();

    stmt = dbSkrs.prepare("SELECT * FROM KadinSaglikIslemleri WHERE AKTIF = 1;");
    params.KadinSaglikIslemleri= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM APYontemleri WHERE AKTIF = 1;");
    params.APYöntemleri= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM kacinciLohusa WHERE AKTIF = 1;");
    params.kacinciLohusa= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM PostpartumDepresyon WHERE AKTIF = 1;");
    params.PostpartumDepresyon= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM UterusInvolusyon WHERE AKTIF = 1;");
    params.UterusInvolusyon= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM DVitamini WHERE AKTIF = 1;");
    params.DVitamini= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM DemirDestek WHERE AKTIF = 1;");
    params.DemirDestek= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM KonjenitalAnomali WHERE AKTIF = 1;");
    params.KonjenitalAnomali= stmt.all();
    params.islem=req.session.user
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar WHERE KODU="+params.islem.KurumKodu);
    params.doktorunKurumu=stmt.get();
    stmt = dbSkrs.prepare("SELECT * FROM Il");
    params.iller= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Ilce where ILKODU="+ params.doktorunKurumu.ILKODU);
    params.ilceler= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar where ILKODU="+ params.doktorunKurumu.ILKODU+" AND ILCEKODU="+params.doktorunKurumu.ILCEKODU+" AND KURUMTURKODU="+params.doktorunKurumu.KURUMTURKODU);
    params.islem.islemYer= stmt.all();
    params.user=req.session.user
    params.ai=await getAi(hastaTc)
    params.aileBilgileri = dbMelissa.prepare("SELECT * FROM Hasta_Aile_Bilgileri WHERE hastaId="+hastaTc).all()

    res.render('lohusaizlem-YeniIzlem',params);               
}
module.exports.lohusaizlemKaydet=async function(req,res){

    const form = JSON.parse(JSON.stringify(req.body))
    PROTOKOLNO='A-'+req.session.user.AH+'-2-001-A-'+moment().format('DDMMYYYYHHmmss');
    AH=req.session.user.AH;
    hasta=req.session.hasta
    if(form.secilenTanilar==undefined) form.secilenTanilar=''
    if(form.secilenAP==undefined) form.secilenAP=''
    if(form.secilenDegerKS==undefined) form.secilenDegerKS=''
    if(form.secilenGT==undefined) form.secilenGT=''

    console.log(form)
    if(form.disarda==undefined) form.disarda=0
    c="','";
    sql="INSERT INTO Gebe_Lohusa_Izlem (AH,HastaId,SonAdetTarihi,Tarih,STansiyon,DTansiyon,Nabiz,Ates,Aciklama,IzlemDisarda,ProtokolNo,Uterusinvolusyon,postPartumDepresyonu,KonjenitalDogumVarligi,SysTakipNo,IslemYapanTc"
    sql+=",BilgiAlinanKisiAdSoyAd,ApYontemi,KadinSaglikIslemleri,TehlikeliIsaretler,Hemoglobin,Demir,KacinciIzlem,IslemYapanYer,BilgiAlinanKisiTel,DVitamini,komplikasyonlar"
    sql+=") VALUES('";
    sql+=AH+c+hasta.Id+c+form.gebSonTar+c+form.izlemTarihi+c+form.tanS+c+form.tanD+c+form.Nabiz+c+form.ates+c+form.aciklama+c+form.disarda+c+PROTOKOLNO+c+form.UterusInvolusyon+c+form.PostpartumDepresyon+c+form.KonjenitalAnomali+c
    sql+=hasta.SysTakipNo+c+form.islemYapanTc+c+form.baAdSoyad+c+form.secilenAP+c+form.secilenDegerKS+c+form.secilenGT+c+form.hemoglobin+c+form.DemirDestek+c+form.kacinciLohusa+c
    sql+=form.islemYer+c+form.baTel+c+form.DVitamini+c+form.secilenTanilar
    sql+="')";

    dbMelissa.prepare(sql).run()
    if(form.sbGonder!=undefined) {
        SBform={}

        SBform.IZLEMIN_YAPILDIGI_YER={}
        SBform.IZLEMIN_YAPILDIGI_YER.KODU=form.islemYer
        SBform.IZLEMIN_YAPILDIGI_YER.ADI=dbSkrs.prepare("SELECT * FROM Kurumlar WHERE KODU="+form.islemYer).get().ADI
        SBform.SYSTakipNo=hasta.SysTakipNO

        SBform.KACINCI_LOHUSA_IZLEM={}
        SBform.KACINCI_LOHUSA_IZLEM.KODU=form.kacinciLohusa
        SBform.KACINCI_LOHUSA_IZLEM.ADI=dbSkrs.prepare("SELECT * FROM kacinciLohusa WHERE KODU="+form.kacinciLohusa).get().ADI

        SBform.DEMIR_LOJISTIGI_VE_DESTEGI={}
        SBform.DEMIR_LOJISTIGI_VE_DESTEGI.KODU=form.DemirDestek
        SBform.DEMIR_LOJISTIGI_VE_DESTEGI.ADI=dbSkrs.prepare("SELECT * FROM DemirDestek WHERE KODU="+form.DemirDestek).get().ADI

        SBform.D_VITAMINI_LOJISTIGI_VE_DESTEGI={}
        SBform.D_VITAMINI_LOJISTIGI_VE_DESTEGI.KODU=form.DVitamini
        SBform.D_VITAMINI_LOJISTIGI_VE_DESTEGI.ADI=dbSkrs.prepare("SELECT * FROM DVitamini WHERE KODU="+form.DVitamini).get().ADI

        SBform.GEBELIK_SONLANMA_TARIHI=new Date(form.gebSonTar).toISOString().replace(/[^0-9]/g, "").slice(0, -5)    
        SBform.PAKETE_AIT_ISLEM_ZAMANI=new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)    

        SBform.ISLEM_YAPAN=form.islemYapanTc
        SBform.BILGI_ALINAN_KISI_ADI_SOYADI=form.baAdSoyad
        SBform.BILGI_ALINAN_KISI_TEL=form.baTel

        SBform.POSTPARTUM_DEPRESYON={}
        SBform.POSTPARTUM_DEPRESYON.KODU=form.UterusInvolusyon
        SBform.POSTPARTUM_DEPRESYON.ADI=dbSkrs.prepare("SELECT * FROM PostpartumDepresyon WHERE KODU="+form.UterusInvolusyon).get().ADI

        SBform.UTERUS_INVOLUSYON={}
        SBform.UTERUS_INVOLUSYON.KODU=form.PostpartumDepresyon
        SBform.UTERUS_INVOLUSYON.ADI=dbSkrs.prepare("SELECT * FROM UterusInvolusyon WHERE KODU="+form.PostpartumDepresyon).get().ADI

        if(form.KonjenitalAnomali!='-1'){
            SBform.KONJENITAL_ANOMALI_VARLIGI={}
            SBform.KONJENITAL_ANOMALI_VARLIGI.KODU=form.KonjenitalAnomali
            SBform.KONJENITAL_ANOMALI_VARLIGI.ADI=dbSkrs.prepare("SELECT * FROM KonjenitalAnomali WHERE KODU="+form.KonjenitalAnomali).get().ADI
        } 
        else SBform.KONJENITAL_ANOMALI_VARLIGI=-1

        if(form.hemoglobin!='') SBform.HEMOGLOBIN=form.hemoglobin
        else SBform.HEMOGLOBIN=-1
   
        
        KADIN_SAGLIGI_ISLEMLERI=[]
        kadinSaglikArray=form.secilenDegerKS

        if(kadinSaglikArray[0]!=''){
            for (let index = 0; index < kadinSaglikArray.length; index++) {
                const e = kadinSaglikArray[index];
                KADIN_SAGLIGI_ISLEMLERI[index]={}
                KADIN_SAGLIGI_ISLEMLERI[index].KODU=e.kod
                KADIN_SAGLIGI_ISLEMLERI[index].ADI=e.isim       
            }
            SBform.KADIN_SAGLIGI_ISLEMLERI=KADIN_SAGLIGI_ISLEMLERI
        } 
        else SBform.KADIN_SAGLIGI_ISLEMLERI=-1

        KOMPLIKASYON_TANISI=[]
        console.log(1)

        if(form.secilenTanilar!=''){
            komplikasyonArray=JSON.parse( form.secilenTanilar)

            for (let index = 0; index < komplikasyonArray.length; index++) {
                const e = komplikasyonArray[index];
                KOMPLIKASYON_TANISI[index]={}
                KOMPLIKASYON_TANISI[index].KODU=e.kod

                KOMPLIKASYON_TANISI[index].ADI=dbSkrs.prepare("SELECT * FROM ICD10 WHERE KODU="+e.kod).get().ADI       
            }
            SBform.KOMPLIKASYON_TANISI=KOMPLIKASYON_TANISI
        } 
        else SBform.KOMPLIKASYON_TANISI=-1

        GEBELIK_LOHUSALIK_SEYRINDE_TEHLIKE_ISARETI=[]

        gtArray=form.secilenGT
        if(gtArray[0]!=''){

            for (let index = 0; index < gtArray.length; index++) {
                const e = gtArray[index];
                GEBELIK_LOHUSALIK_SEYRINDE_TEHLIKE_ISARETI[index]={}
                GEBELIK_LOHUSALIK_SEYRINDE_TEHLIKE_ISARETI[index].KODU=e
                GEBELIK_LOHUSALIK_SEYRINDE_TEHLIKE_ISARETI[index].ADI=dbSkrs.prepare("SELECT * FROM ICD10 WHERE KODU="+e).get().ADI       
            }
            SBform.KOMPLIKASYON_TANISI=GEBELIK_LOHUSALIK_SEYRINDE_TEHLIKE_ISARETI
        } 
        else SBform.GEBELIK_LOHUSALIK_SEYRINDE_TEHLIKE_ISARETI=-1
        resultSb=await sys.LohusaIzlemVeriSetiPaketi(SBform)
    }

    res.send(true);

}

module.exports.yetiskinizlem=async function(req,res){
    var hastaTc=req.body.hasta;
    var params={ };	
    params=await getBanner(hastaTc,'lohusaizlem')

    params.hasta_hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Hasta_Gruplari INNER JOIN Hasta_Gruplari on Hasta_Hasta_Gruplari.grupId=Hasta_Gruplari.grupId WHERE Hasta_Hasta_Gruplari.hastaId="+hastaTc).all()
    params.hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Gruplari ").all()
    var stmt = dbMelissa.prepare("SELECT * FROM Hasta WHERE Id="+hastaTc);
    params.hasta= stmt.get();
    params.hasta.age=getAge(params.hasta.DogumTarihi);
    req.session.hasta= params.hasta   
    stmt = dbSkrs.prepare("SELECT * FROM OkulCagiPostur WHERE AKTIF = 1;");
    params.OkulCagiPostur= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM GormeTaramaSonucu WHERE AKTIF = 1;");
    params.GormeTaramaSonucu= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM ergenIzlemTakvimi WHERE AKTIF = 1;");
    params.ergenIzlemTakvimi= stmt.all();

    nowDate=new Date()
    var date1 =new Date(params.hasta.DogumTarihi);
    var date2 = new Date(); 
    var Difference_In_Time = date2.getTime() - date1.getTime(); 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
    params.totalDay = Math.round(Difference_In_Days);
    params.islem=req.session.user
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar WHERE KODU="+params.islem.KurumKodu);
    params.doktorunKurumu=stmt.get();
    stmt = dbSkrs.prepare("SELECT * FROM Il");
    params.iller= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Ilce where ILKODU="+ params.doktorunKurumu.ILKODU);
    params.ilceler= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar where ILKODU="+ params.doktorunKurumu.ILKODU+" AND ILCEKODU="+params.doktorunKurumu.ILCEKODU+" AND KURUMTURKODU="+params.doktorunKurumu.KURUMTURKODU);
    params.islem.islemYer= stmt.all();
    params.user=req.session.user
    params.aileBilgileri = dbMelissa.prepare("SELECT * FROM Hasta_Aile_Bilgileri WHERE hastaId="+hastaTc).all()

    res.render('yetiskinizlem',params);               
}
module.exports.yetiskinizlemKaydet=function(req,res){

    const form = JSON.parse(JSON.stringify(req.body))
    AH=req.session.user.AH;
    sysno=req.session.hasta.SysTakipNO    
    if(form.sdd==undefined){
        form.sdd=0;
    }
    if(form.heeadsss==undefined){
        form.heeadsss=0;
    }
    if(form.gelisimseld==undefined){
        form.gelisimseld=0;
    }
    if(form.hiperd==undefined){
        form.hiperd=0;
    }
    if(form.dissagligi==undefined){
        form.dissagligi=0;
    }
    if(form.isitmet==undefined){
        form.isitmet=0;
    }
    if(form.gormet==undefined){
        form.gormet=0;
    }
    if(form.bagisildama==undefined){
        form.bagisildama=0;
    }
    if(form.danismanlik==undefined){
        form.danismanlik=0;
    }
    if(form.fizikmyn==undefined){
        form.fizikmyn=0;
    }
    PROTOKOLNO='A-'+req.session.user.AH+'-2-001-A-'+moment().format('DDMMYYYYHHmmss');
    SenttoENabiz=0
    c="','";

    var sql="INSERT INTO ErgenIzlem(AH, HASTAID, IZLEM_TARIHI, SISTOLIK, DIASTOLIK, ISITME_NOTU, GORME_NOTU, SOSYALDAVRANIS, HEADSSS, FIZIKMUAYENE_NOTU, BAGISIKLAMA_NOTU, HIPERLIPIDEMIRISK_NOTU, DISSAGLIGI_NOTU, DANISMANLIK_NOTU, GORMETARAMASONUCU, POSTURMUAYENE, OGRENCIMUAYENEIZLEM, SenttoENabiz, SysTakipNo, ACIKLAMA, HBolcumu, HctOlcumu, Ates, Boy, Agrlik, Nabiz)";
    sql+="VALUES('";
    sql+=AH+c+form.hastaTC+c+form.izlemTarihi+c+form.tansiyonS+c+form.tansiyonD+c+form.isitmet+c+form.gormet+c+form.sdd+c+form.heeadsss+c+form.fizikmyn+c+form.bagisildama+c+form.hiperd+c+form.dissagligi+c+form.danismanlik+c+form.gormetarama+c+form.okulcagimyn+c+form.izlemTakvim+c+SenttoENabiz+c+sysno+c+form.aciklama+c+form.hb+c+form.hct+c+form.ates+c+form.boy+c+form.kilo+c+form.nabiz;
    sql+="')";
    var stmt = dbMelissa.prepare(sql);
    stmt.run()
 
    res.redirect("/");

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

module.exports.obeziteizlem=async function(req,res){
    var hastaTc=req.body.hasta;
    var params={ };	
    params=await getBanner(hastaTc,'obeziteizlem')

    params.hasta_hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Hasta_Gruplari INNER JOIN Hasta_Gruplari on Hasta_Hasta_Gruplari.grupId=Hasta_Gruplari.grupId WHERE Hasta_Hasta_Gruplari.hastaId="+hastaTc).all()
    params.hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Gruplari ").all()
    params.hasta= dbMelissa.prepare("SELECT * FROM Hasta WHERE Id="+hastaTc).get()
    req.session.hasta=params.hasta
    params.hasta.age=getAge(params.hasta.DogumTarihi);

    params.sonIzlem = dbMelissa.prepare("SELECT * FROM obeziteizlem WHERE HastaId="+hastaTc).get()

    params.aileBilgileri = dbMelissa.prepare("SELECT * FROM Hasta_Aile_Bilgileri WHERE hastaId="+hastaTc).all()

    params.ai=await getAi(hastaTc)

    params.MorbidObez = dbSkrs.prepare("SELECT * FROM MorbidObez WHERE AKTIF = 1;").all()
    params.Egzersiz = dbSkrs.prepare("SELECT * FROM Egzersiz WHERE AKTIF = 1;").all()
    params.DiyetTedavisi = dbSkrs.prepare("SELECT * FROM DiyetTedavisi WHERE AKTIF = 1;").all()
    stmt = dbSkrs.prepare("SELECT * FROM ObeziteIlacTedavisi WHERE AKTIF = 1;");
    params.ObeziteIlacTedavisi= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM PsikolojikTedavi WHERE AKTIF = 1;");
    params.PsikolojikTedavi= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM YatagaBagimlilik WHERE AKTIF = 1;");
    params.YatagaBagimlilik= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM ObezEktanilar WHERE AKTIF =1;");
    params.EkTanilar= stmt.all();
    params.islem=req.session.user
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar WHERE KODU="+params.islem.KurumKodu);
    params.doktorunKurumu=stmt.get();
    stmt = dbSkrs.prepare("SELECT * FROM Il");
    params.iller= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Ilce where ILKODU="+ params.doktorunKurumu.ILKODU);
    params.ilceler= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar where ILKODU="+ params.doktorunKurumu.ILKODU+" AND ILCEKODU="+params.doktorunKurumu.ILCEKODU+" AND KURUMTURKODU="+params.doktorunKurumu.KURUMTURKODU);
    params.islem.islemYer= stmt.all();
    params.user=req.session.user
    params.aileBilgileri = dbMelissa.prepare("SELECT * FROM Hasta_Aile_Bilgileri WHERE hastaId="+hastaTc).all()

    res.render('obeziteizlem',params);               
}
module.exports.obeziteizlemKaydet=function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    if(form.adimsayar==undefined){
        form.adimsayar=0;
    }
    if(form.geziciHizmet==undefined){
        form.geziciHizmet=0;
    }    
    AH=req.session.user.AH;
    sysno=req.session.hasta.SysTakipNO
    SenttoMsvs=0;
    PROTOKOLNO='A-'+req.session.user.AH+'-2-001-A-'+moment().format('DDMMYYYYHHmmss');
    
    ilkTaniTarihi=form.ilkizlemTarihi;
    ekTanılar=form.ekTanilar;
    //-------------------------
    c="','";
    var sql="INSERT INTO OBEZITEIzlem(HastaId, Tarih, Boy, Kilo, Bel, Kalca, SenttoMsvs, PROTOKOLNO, ilkTaniTarihi, Egzersiz, DiyetTedavisi, ilacTedavisi, PsikokojikTedavi, LenfatikOdem, YatagaBagimli, SysTakipNo, GeziciHizmet, EkTanilar, Aciklama, AdimSayarKullanimi)"
    sql+="VALUES('";
    sql+=form.hastaTC+c+form.izlemTarihi+c+form.boy+c+form.kilo+c+form.belCevresi+c+form.kalcaCevresi+c+SenttoMsvs+c;
    sql+=PROTOKOLNO+c+ilkTaniTarihi+c+form.egzersiz+c+form.diyetTed+c+form.obezIlacTed+c+form.psikoTed+c+form.morbidLenfatik+c+form.yatagaBagimlilik+c+sysno+c+form.geziciHizmet+c+ekTanılar+c+form.aciklama+c+form.adimsayar;
    sql+="')";
    var stmt = dbMelissa.prepare(sql);
    stmt.run()
    
    res.redirect("/");
}
module.exports.otizmizlem=async function(req,res){
    var hastaTc=req.body.hasta;
    var params={ };	
    params=await getBanner(hastaTc,'otizmizlem')
    params.hasta_hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Hasta_Gruplari INNER JOIN Hasta_Gruplari on Hasta_Hasta_Gruplari.grupId=Hasta_Gruplari.grupId WHERE Hasta_Hasta_Gruplari.hastaId="+hastaTc).all()
    params.hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Gruplari ").all()
    var stmt = dbMelissa.prepare("SELECT * FROM Hasta WHERE Id="+hastaTc);
    params.hasta= stmt.get();
    req.session.hasta=params.hasta

    params.hasta.age=getAge(params.hasta.DogumTarihi);
    stmt = dbSkrs.prepare("SELECT * FROM MorbidObez WHERE AKTIF = 1;");
    params.MorbidObez= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Egzersiz WHERE AKTIF = 1;");
    params.Egzersiz= stmt.all();
    params.islem=req.session.user
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar WHERE KODU="+params.islem.KurumKodu);
    params.doktorunKurumu=stmt.get();
    stmt = dbSkrs.prepare("SELECT * FROM Il");
    params.iller= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Ilce where ILKODU="+ params.doktorunKurumu.ILKODU);
    params.ilceler= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar where ILKODU="+ params.doktorunKurumu.ILKODU+" AND ILCEKODU="+params.doktorunKurumu.ILCEKODU+" AND KURUMTURKODU="+params.doktorunKurumu.KURUMTURKODU);
    params.islem.islemYer= stmt.all();
    params.user=req.session.user
    params.aileBilgileri = dbMelissa.prepare("SELECT * FROM Hasta_Aile_Bilgileri WHERE hastaId="+hastaTc).all()

    res.render('otizmizlem',params);      
}
module.exports.otizmKaydet=function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    PROTOKOLNO='A-'+req.session.user.AH+'-2-001-A-'+moment().format('DDMMYYYYHHmmss');
  // bilinmeyen parametreler
  AH=req.session.user.AH;
  sysno=req.session.hasta.SysTakipNo

  SenttoMsvs=0;
  ilkTaniTarihi=form.ilkTaniTarihi;
  ekTanılar=form.ekTanilar;
  //-------------------------
  c="','";
  var sql="INSERT INTO `OtizIzlem`(`HastaId`, `IzlemTarihi`, `IsımSoylendigindebakmak`, `GozTemasi`, `Nesneyebakmak`, `TekrarlayiciDavranis`, `KunusmadaGecikme`, `Aciklama`)"
  sql+="VALUES('";
  sql+=form.hastaTC+c+form.izlemTarihi+c+form.ismiSoyledigindeBakiyor+c+form.gozTemasi+c+form.nesneyebakiyor+c+form.tekrarlayiciDavranislar+c+form.konusmasindaGecikmeVar+c+form.aciklama;
  sql+="')";
   
  dbMelissa.prepare(sql).run()
    
    res.redirect("/");

}




module.exports.evdeSaglıkizlem=function(req,res){

   res.render("evdesaglık");
        

}
module.exports.ESbasvuruListesi=function(req,res){
    
        res.render('ES-BasvuruListesi');    

}
module.exports.EShizmetSonlandırmaListesi=function(req,res){

         res.render('ES-HizmetSonlandırmaListesi');    
    
}
module.exports.ESHizmetiHastalar=function(req,res){
    sql="SELECT * FROM Hasta WHERE MobilHizmet='True'";
    data = dbMelissa.prepare(sql).all()
    res.render('ES-ESHizmetiHastalar',{ 
        izleminHastaları:data,
        user:req.session.user
    });
}

module.exports.ESHizmetiIzlemleri=function(req,res){

    var hastaTc=req.body.hasta;
    var params={ };	
    params.hasta_hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Hasta_Gruplari INNER JOIN Hasta_Gruplari on Hasta_Hasta_Gruplari.grupId=Hasta_Gruplari.grupId WHERE Hasta_Hasta_Gruplari.hastaId="+hastaTc).all()
    params.hastaGrupları = dbMelissa.prepare("SELECT * FROM Hasta_Gruplari ").all()
    params.hasta = dbMelissa.prepare("SELECT * FROM Hasta WHERE Id="+hastaTc).get()
    console.log(params.hasta)
    params.hasta.age=getAge(params.hasta.DogumTarihi);
    stmt = dbSkrs.prepare("SELECT * FROM Il");
    params.iller= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM ESSonlandirma WHERE AKTIF = 1;");
    params.ESSonlandirma= stmt.all();
    params.islem=req.session.user
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar WHERE KODU="+params.islem.KurumKodu);
    params.doktorunKurumu=stmt.get();
    stmt = dbSkrs.prepare("SELECT * FROM Il");
    params.iller= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Ilce where ILKODU="+ params.doktorunKurumu.ILKODU);
    params.ilceler= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar where ILKODU="+ params.doktorunKurumu.ILKODU+" AND ILCEKODU="+params.doktorunKurumu.ILCEKODU+" AND KURUMTURKODU="+params.doktorunKurumu.KURUMTURKODU);
    params.islem.islemYer= stmt.all();
    res.render('ES-Hizmetİzlemleri',params);               
}
module.exports.ESHastaNakilListesi=function(req,res){

    
         res.render('ES-HastaNakilListesi');    
    
}
module.exports.ESİlkİzlem=function(req,res){
    var hastaTc=10009451932;
    var params={ };	
    var stmt = dbMelissa.prepare("SELECT * FROM Hasta WHERE Id="+hastaTc);
    params.hasta= stmt.get();
    params.hasta.age=getAge(params.hasta.DogumTarihi);
    stmt = dbSkrs.prepare("SELECT * FROM BasvuruTuru WHERE AKTIF = 1;");
    params.BasvuruTuru= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM BakimDestekihtiyaci WHERE AKTIF = 1;");
    params.BakimDestekihtiyaci= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM KisiselBakim WHERE AKTIF = 1;");
    params.KisiselBakim= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM KonutTipi WHERE AKTIF = 1;");
    params.KonutTipi= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM HelaTipi WHERE AKTIF = 1;");
    params.HelaTipi= stmt.all();
    params.islem=req.session.user
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar WHERE KODU="+params.islem.KurumKodu);
    params.doktorunKurumu=stmt.get();
    stmt = dbSkrs.prepare("SELECT * FROM Il");
    params.iller= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Ilce where ILKODU="+ params.doktorunKurumu.ILKODU);
    params.ilceler= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar where ILKODU="+ params.doktorunKurumu.ILKODU+" AND ILCEKODU="+params.doktorunKurumu.ILCEKODU+" AND KURUMTURKODU="+params.doktorunKurumu.KURUMTURKODU);
    params.islem.islemYer= stmt.all();
    res.render('ES-İlkİzlem',params);               

    
}

module.exports.asi=async function(req,res){
    var params={ };	
    params=await getBanner(req.session.hasta.Id,'asi')

    var stmt = dbMelissa.prepare("SELECT * FROM Hasta WHERE Id="+req.session.hasta.Id);
    params.hasta= stmt.get();
    params.hasta.age=getAge(req.session.hasta.DogumTarihi);
   
    params.islem=req.session.user
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar WHERE KODU="+params.islem.KurumKodu);
    params.doktorunKurumu=stmt.get();
    stmt = dbSkrs.prepare("SELECT * FROM Il");
    params.iller= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Ilce where ILKODU="+ params.doktorunKurumu.ILKODU);
    params.ilceler= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Kurumlar where ILKODU="+ params.doktorunKurumu.ILKODU+" AND ILCEKODU="+params.doktorunKurumu.ILCEKODU);
    params.islem.islemYer= stmt.all();
    params.AsiIslemTuru = dbSkrs.prepare("SELECT * FROM AsiIslemTuru WHERE AKTIF = 1;").all();
    params.ASI_OZEL_DURUM_NEDENI=dbSkrs.prepare("SELECT * FROM ASI_OZEL_DURUM_NEDENI WHERE AKTIF = 1;").all();

    params.asilar = dbSkrs.prepare("SELECT * FROM asilar WHERE AKTIF = 1;").all();
    params.asiuygulamasekli = dbSkrs.prepare("SELECT * FROM asiuygulamasekli WHERE AKTIF = 1;").all();
    params.asikaynak = dbSkrs.prepare("SELECT * FROM asikaynak WHERE AKTIF = 1;").all();
    params.asiuygulamayeri = dbSkrs.prepare("SELECT * FROM asiuygulamayeri WHERE AKTIF = 1;").all();
    params.asidoz = dbSkrs.prepare("SELECT * FROM asidoz WHERE AKTIF = 1;").all();
    params.ASI_YAPILMAMA_DURUMU = dbSkrs.prepare("SELECT * FROM ASI_YAPILMAMA_DURUMU WHERE AKTIF = 1;").all();
    params.ASI_YAPILMAMA_NEDENI = dbSkrs.prepare("SELECT * FROM ASI_YAPILMAMA_NEDENI WHERE AKTIF = 1;").all();
    params.BILDIRIMI_ZORUNLU_ASI_SONRASI_ISTENMEYEN_ETKI_NEDENI = dbSkrs.prepare("SELECT * FROM BILDIRIMI_ZORUNLU_ASI_SONRASI_ISTENMEYEN_ETKI_NEDENI WHERE AKTIF = 1;").all();


    sql = "SELECT * FROM ICD10 WHERE AKTIF = 1 LIMIT 50;"
    stmt = dbSkrs.prepare(sql);
    params.ICD10=stmt.all();

    defColor='white'
    color='green'
    ertColor='yellow'
    iptalColor='red'
    hepB1={renk:defColor,tarih:''}
    hepB=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=8 and ASI_DOZU=1').get()
    if(hepB!=undefined) hepB1={renk:color,tarih:hepB.Tarih}
    else{
        EhepB=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=8 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=1').get()
        if(EhepB!=undefined) hepB1={renk:ertColor,tarih:EhepB.islemZamani}
        ihepB=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=8 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=1').get()
        if(ihepB!=undefined) hepB1={renk:iptalColor,tarih:ihepB.islemZamani}
    }
    params.hepB1=hepB1

    hepB2={renk:defColor,tarih:''}
    hepB=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=8 and ASI_DOZU=2').get()
    if(hepB!=undefined) hepB2={renk:color,tarih:hepB.Tarih}
    else{
        EhepB=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=8 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=2').get()
        if(EhepB!=undefined) hepB2={renk:ertColor,tarih:EhepB.islemZamani}
        ihepB=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=8 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=2').get()
        if(ihepB!=undefined) hepB2={renk:iptalColor,tarih:ihepB.islemZamani}
    }
    params.hepB2=hepB2

    hepB3={renk:defColor,tarih:''}
    hepB=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=8 and ASI_DOZU=3').get()
    if(hepB!=undefined) hepB3={renk:color,tarih:hepB.Tarih}
    else{
        EhepB=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=8 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=3').get()
        if(EhepB!=undefined) hepB3={renk:ertColor,tarih:EhepB.islemZamani}
        ihepB=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=8 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=3').get()
        if(ihepB!=undefined) hepB3={renk:iptalColor,tarih:ihepB.islemZamani}
    }
    params.hepB3=hepB3

    bcg1={renk:defColor,tarih:''}
    bcg=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=16 and ASI_DOZU=1').get()
    if(bcg!=undefined) bcg1={renk:color,tarih:bcg.Tarih}
    else{
        Ebcg=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=16 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=1').get()
        if(Ebcg!=undefined) bcg1={renk:ertColor,tarih:Ebcg.islemZamani}
        ibcg=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=16 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=1').get()
        if(ibcg!=undefined) bcg1={renk:iptalColor,tarih:ibcg.islemZamani}
    }
    params.bcg1=bcg1

    daptIpaHib1={renk:defColor,tarih:''}
    daptIpaHib=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=120 and ASI_DOZU=1').get()
    if(daptIpaHib!=undefined) daptIpaHib1={renk:color,tarih:daptIpaHib.Tarih}
    else{
        EdaptIpaHib=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=120 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=1').get()
        if(EdaptIpaHib!=undefined) daptIpaHib1={renk:ertColor,tarih:EdaptIpaHib.islemZamani}
        idaptIpaHib=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=120 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=1').get()
        if(idaptIpaHib!=undefined) daptIpaHib1={renk:iptalColor,tarih:idaptIpaHib.islemZamani}
    }
    params.daptIpaHib1=daptIpaHib1

    daptIpaHib2={renk:defColor,tarih:''}
    daptIpaHib=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=120 and ASI_DOZU=2').get()
    if(daptIpaHib!=undefined) daptIpaHib2={renk:color,tarih:daptIpaHib.Tarih}
    else{
        EdaptIpaHib=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=120 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=2').get()
        if(EdaptIpaHib!=undefined) daptIpaHib2={renk:ertColor,tarih:EdaptIpaHib.islemZamani}
        idaptIpaHib=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=120 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=2').get()
        if(idaptIpaHib!=undefined) daptIpaHib2={renk:iptalColor,tarih:idaptIpaHib.islemZamani}
    }
    params.daptIpaHib2=daptIpaHib2

    daptIpaHib3={renk:defColor,tarih:''}
    daptIpaHib=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=120 and ASI_DOZU=3').get()
    if(daptIpaHib!=undefined) daptIpaHib3={renk:color,tarih:daptIpaHib.Tarih}
    else{
        EdaptIpaHib=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=120 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=3').get()
        if(EdaptIpaHib!=undefined) daptIpaHib3={renk:ertColor,tarih:EdaptIpaHib.islemZamani}
        idaptIpaHib=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=120 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=3').get()
        if(idaptIpaHib!=undefined) daptIpaHib3={renk:iptalColor,tarih:idaptIpaHib.islemZamani}
    }
    params.daptIpaHib3=daptIpaHib3

    daptIpaHibR={renk:defColor,tarih:''}
    daptIpaHib=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=120 and ASI_DOZU=6').get()
    if(daptIpaHib!=undefined) daptIpaHibR={renk:color,tarih:daptIpaHib.Tarih}
    else{
        EdaptIpaHib=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=120 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=6').get()
        if(EdaptIpaHib!=undefined) daptIpaHibR={renk:ertColor,tarih:EdaptIpaHib.islemZamani}
        idaptIpaHib=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=120 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=6').get()
        if(idaptIpaHib!=undefined) daptIpaHibR={renk:iptalColor,tarih:idaptIpaHib.islemZamani}
    }
    params.daptIpaHibR=daptIpaHibR

    daptIpaR={renk:defColor,tarih:''}
    daptIpa=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=130 and ASI_DOZU=6').get()
    if(daptIpa!=undefined) daptIpaR={renk:color,tarih:daptIpa.Tarih}
    else{
        EdaptIpa=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=320 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=6').get()
        if(EdaptIpa!=undefined) daptIpaR={renk:ertColor,tarih:EdaptIpa.islemZamani}
        idaptIpa=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=130 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=6').get()
        if(idaptIpa!=undefined) daptIpaR={renk:iptalColor,tarih:idaptIpa.islemZamani}
    }
    params.daptIpaR=daptIpaR


    kpa1={renk:defColor,tarih:''}
    kpa=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=17 and ASI_DOZU=1').get()
    if(kpa!=undefined) kpa1={renk:color,tarih:kpa.Tarih}
    else{
        kpa=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=17 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=1').get()
        if(kpa!=undefined) kpa1={renk:ertColor,tarih:kpa.islemZamani}
        kpa=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=17 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=1').get()
        if(kpa!=undefined) kpa1={renk:iptalColor,tarih:idaptIpa.islemZamani}
    }
    params.kpa1=kpa1

    kpa2={renk:defColor,tarih:''}
    kpa=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=17 and ASI_DOZU=2').get()
    if(kpa!=undefined) kpa2={renk:color,tarih:kpa.Tarih}
    else{
        kpa=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=17 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=2').get()
        if(kpa!=undefined) kpa2={renk:ertColor,tarih:kpa.islemZamani}
        kpa=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=17 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=2').get()
        if(kpa!=undefined) kpa2={renk:iptalColor,tarih:idaptIpa.islemZamani}
    }
    params.kpa2=kpa2

    kpaR={renk:defColor,tarih:''}
    kpa=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=17 and ASI_DOZU=6').get()
    if(kpa!=undefined) kpaR={renk:color,tarih:kpa.Tarih}
    else{
        kpa=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=17 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=6').get()
        if(kpa!=undefined) kpaR={renk:ertColor,tarih:kpa.islemZamani}
        kpa=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=17 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=6').get()
        if(kpa!=undefined) kpaR={renk:iptalColor,tarih:idaptIpa.islemZamani}
    }
    params.kpaR=kpaR
   
    kkk1={renk:defColor,tarih:''}
    kkk=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=3 and ASI_DOZU=1').get()
    if(kkk!=undefined) kkk1={renk:color,tarih:kkk.Tarih}
    else{
        kkk=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=3 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=1').get()
        if(kkk!=undefined) kkk1={renk:ertColor,tarih:kkk.islemZamani}
        kkk=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=3 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=1').get()
        if(kkk!=undefined) kkk1={renk:iptalColor,tarih:kkk.islemZamani}
    }
    params.kkk1=kkk1

    kkk2={renk:defColor,tarih:''}
    kkk=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=3 and ASI_DOZU=2').get()
    if(kkk!=undefined) kkk2={renk:color,tarih:kkk.Tarih}
    else{
        kkk=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=3 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=2').get()
        if(kkk!=undefined) kkk2={renk:ertColor,tarih:kkk.islemZamani}
        kkk=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=3 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=2').get()
        if(kkk!=undefined) kkk2={renk:iptalColor,tarih:kkk.islemZamani}
    }
    params.kkk2=kkk2

    opa1={renk:defColor,tarih:''}
    opa=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=1 and ASI_DOZU=1').get()
    if(opa!=undefined) opa1={renk:color,tarih:opa.Tarih}
    else{
        opa=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=1 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=1').get()
        if(opa!=undefined) opa1={renk:ertColor,tarih:opa.islemZamani}
        opa=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=1 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=1').get()
        if(opa!=undefined) opa1={renk:iptalColor,tarih:opa.islemZamani}
    }
    params.opa1=opa1

    opa2={renk:defColor,tarih:''}
    opa=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=1 and ASI_DOZU=2').get()
    if(opa!=undefined) opa2={renk:color,tarih:opa.Tarih}
    else{
        opa=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=1 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=2').get()
        if(opa!=undefined) opa2={renk:ertColor,tarih:opa.islemZamani}
        opa=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=1 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=2').get()
        if(opa!=undefined) opa2={renk:iptalColor,tarih:opa.islemZamani}
    }
    params.opa2=opa2

    tdR={renk:defColor,tarih:''}
    td=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=134 and ASI_DOZU=6').get()
    if(td!=undefined) tdR={renk:color,tarih:td.Tarih}
    else{
        td=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=134 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=6').get()
        if(td!=undefined) tdR={renk:ertColor,tarih:td.islemZamani}
        td=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=134 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=6').get()
        if(td!=undefined) tdR={renk:iptalColor,tarih:td.islemZamani}
    }
    params.tdR=tdR

    hepA1={renk:defColor,tarih:''}
    hepA=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=83 and ASI_DOZU=1').get()
    if(hepA!=undefined) hepA1={renk:color,tarih:hepA.Tarih}
    else{
        hepA=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=83 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=1').get()
        if(hepA!=undefined) hepA1={renk:ertColor,tarih:hepA.islemZamani}
        hepA=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=83 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=1').get()
        if(hepA!=undefined) hepA1={renk:iptalColor,tarih:hepA.islemZamani}
    }
    params.hepA1=hepA1

    hepA2={renk:defColor,tarih:''}
    hepA=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=83 and ASI_DOZU=2').get()
    if(hepA!=undefined) hepA2={renk:color,tarih:hepA.Tarih}
    else{
        hepA=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=83 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=2').get()
        if(hepA!=undefined) hepA2={renk:ertColor,tarih:hepA.islemZamani}
        hepA=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=83 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=2').get()
        if(hepA!=undefined) hepA2={renk:iptalColor,tarih:hepA.islemZamani}
    }
    params.hepA2=hepA2

    su1={renk:defColor,tarih:''}
    su=dbMelissa.prepare("SELECT * FROM Hasta_Asi WHERE HastaId="+req.session.hasta.Id+' and ASI=21 and ASI_DOZU=1').get()
    if(su!=undefined) su1={renk:color,tarih:su.Tarih}
    else{
        su=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=21 and ASI_YAPILMAMA_DURUMU=1 and ASININ_DOZU=1').get()
        if(su!=undefined) su1={renk:ertColor,tarih:su.islemZamani}
        su=dbMelissa.prepare("SELECT * FROM Hasta_Asi_Erteleme WHERE hastaId="+req.session.hasta.Id+' and ASI=21 and ASI_YAPILMAMA_DURUMU=2 and ASININ_DOZU=1').get()
        if(su!=undefined) su1={renk:iptalColor,tarih:su.islemZamani}
    }
    params.su1=su1



    res.render('asi',params);               

    
}

module.exports.ozelizlemKaydet=async function(req,res){

    const form = JSON.parse(JSON.stringify(req.body))
    hasta=req.session.hasta

    if(form.oksuruk==undefined) form.oksuruk=0
    if(form.ates==undefined) form.ates=0
    if(form.nefesDarligi==undefined) form.nefesDarligi=0
    if(form.sbGonder==undefined) form.sbGonder=0

    TELEFON_NUMARASI=dbMelissa.prepare('select * from Hasta_Adres_Iletisim where tc='+hasta.Id).get().ceptel
    LISTEYE_DAHIL_MI=0
    //LISTEYE_DAHIL_MI bulunacak
    c="','";
    sql="INSERT INTO OzellikliIzlem (IZLEM_TARIHI,IZLEM_YAPILMAMA_NEDENI,IZLEM_NOTU,SEMPTOM_GELISME_DURUMU,IZLEM_ISLEM_TURU,TELEFON_NUMARASI,ATES_38_6_USTU,OKSURUK_VAR_MI,NEFES_DARLIGI_VAR_MI,NUMUNE_ALINDI_MI"
    sql+=",IZLEM_YAPILMAMA_NEDENI_ACIKLAMA,HASTA_KIMLIK_NUMARASI,IZLEM_YAPILMA_DURUMU,LISTEYE_DAHIL_MI,KACINCI_OZELLIKLI_IZLEM,VUCUT_ISISI,NUMUNE_ALINMAMA_NEDENI,SYS_GONDERILDI_MI"
    sql+=") VALUES('";
    sql+=form.izlemTarihi+c+form.izlemYapilmamaNedeni+c+form.aciklama+c+form.semptomDurum+c+form.izlemIslemTuru+c+TELEFON_NUMARASI+c+form.ates+c+form.oksuruk+c+form.nefesDarligi+c+form.numuneDurum+c+form.izlemYapilmamaNedeni
    sql+=c+hasta.Id+c+form.izlemDurum+c+LISTEYE_DAHIL_MI+c+form.kacinciOzelIzlem+c+form.vucutIsisi+c+form.numuneAciklama+c+form.sbGonder
    sql+="')";

    dbMelissa.prepare(sql).run()

    if(form.sbGonder!=undefined) {
        SBform={}

    
        SBform.KACINCI_OZELLIKLI_IZLEM={}
        SBform.KACINCI_OZELLIKLI_IZLEM.KODU=form.kacinciOzelIzlem
        SBform.KACINCI_OZELLIKLI_IZLEM.ADI=dbSkrs.prepare("SELECT * FROM KacinciOzellikliIzlem WHERE KODU="+form.kacinciOzelIzlem).get().ADI

        SBform.LISTEYE_DAHIL_MI={}
        if(LISTEYE_DAHIL_MI==0){
            SBform.LISTEYE_DAHIL_MI.KODU=2
            SBform.LISTEYE_DAHIL_MI.ADI='HAYIR'
        }
        else{
            SBform.LISTEYE_DAHIL_MI.KODU=1
            SBform.LISTEYE_DAHIL_MI.ADI='EVET'
        }

        SBform.HASTA_KIMLIK_NUMARASI=hasta.Id
        SBform.IZLEM_TARIHI=moment( form.izlemTarihi ).format('YYYYMMDDHHmm')

        SBform.IZLEM_YAPILMA_DURUMU={}
        if(form.izlemDurum==2){
            SBform.IZLEM_YAPILMA_DURUMU.KODU=2
            SBform.IZLEM_YAPILMA_DURUMU.ADI='HAYIR'
        }
        else{
            SBform.IZLEM_YAPILMA_DURUMU.KODU=1
            SBform.IZLEM_YAPILMA_DURUMU.ADI='EVET'
        }    
        
        SBform.IZLEM_YAPILMAMA_NEDENI={}
        if(form.izlemDurum==2){
            SBform.IZLEM_YAPILMAMA_NEDENI=1
            SBform.IZLEM_YAPILMAMA_NEDENI_ACIKLAMA=form.izlemYapilmamaNedeni
        }
        else{
            SBform.IZLEM_YAPILMAMA_NEDENI=-1
            SBform.IZLEM_YAPILMAMA_NEDENI_ACIKLAMA=-1
        }
        
        SBform.IZLEM_NOTU=form.aciklama
        SBform.TELEFON_NUMARASI=TELEFON_NUMARASI


        SBform.SEMPTOM_GELISME_DURUMU={}
        if(form.semptomDurum==1){
            SBform.SEMPTOM_GELISME_DURUMU.ADI='EVET'
            SBform.SEMPTOM_GELISME_DURUMU.KODU=1
        }
        else{
            SBform.SEMPTOM_GELISME_DURUMU.ADI='HAYIR'
            SBform.SEMPTOM_GELISME_DURUMU.KODU=2
        }

        SBform.IZLEM_ISLEM_TURU={}
        SBform.IZLEM_ISLEM_TURU.KODU=form.izlemIslemTuru
        SBform.IZLEM_ISLEM_TURU.ADI=dbSkrs.prepare("SELECT * FROM AsiIslemTuru WHERE KODU="+form.izlemIslemTuru).get().ADI

        SBform.ATES_38_6_USTU={}
        if(form.ates==1){
            SBform.ATES_38_6_USTU.ADI='EVET'
            SBform.ATES_38_6_USTU.KODU=1
        }
        else{
            SBform.ATES_38_6_USTU.ADI='HAYIR'
            SBform.ATES_38_6_USTU.KODU=2
        }

        SBform.ATES_38_6_USTU={}
        if(form.ates==1){
            SBform.ATES_38_6_USTU.ADI='EVET'
            SBform.ATES_38_6_USTU.KODU=1
        }
        else{
            SBform.ATES_38_6_USTU.ADI='HAYIR'
            SBform.ATES_38_6_USTU.KODU=2
        }

        SBform.OKSURUK_VAR_MI={}
        if(form.oksuruk==1){
            SBform.OKSURUK_VAR_MI.ADI='EVET'
            SBform.OKSURUK_VAR_MI.KODU=1
        }
        else{
            SBform.OKSURUK_VAR_MI.ADI='HAYIR'
            SBform.OKSURUK_VAR_MI.KODU=2
        }
        
        SBform.NEFES_DARLIGI_VAR_MI={}
        if(form.nefesDarligi==1){
            SBform.NEFES_DARLIGI_VAR_MI.ADI='EVET'
            SBform.NEFES_DARLIGI_VAR_MI.KODU=1
        }
        else{
            SBform.NEFES_DARLIGI_VAR_MI.ADI='HAYIR'
            SBform.NEFES_DARLIGI_VAR_MI.KODU=2
        }
        
        SBform.NUMUNE_ALINDI_MI={}
        if(form.numuneDurum==1){
            SBform.NUMUNE_ALINDI_MI.ADI='EVET'
            SBform.NUMUNE_ALINDI_MI.KODU=1
            SBform.NUMUNE_ALINMAMA_NEDENI=-1
        }
        else{
            SBform.NUMUNE_ALINDI_MI.ADI='HAYIR'
            SBform.NUMUNE_ALINDI_MI.KODU=2
            SBform.NUMUNE_ALINMAMA_NEDENI=form.numuneAciklama
        }

        SBform.VUCUT_ISISI=form.vucutIsisi
        
        resultSb=await sys.ÖZELLİKLİİZLEMVERİSETİ(SBform)
    }

    res.send(true);

}

