const Database = require('better-sqlite3');
const dbSkrs = new Database('skrs.db', { });
const dbMelissa = new Database('melissa.db', { });
var moment=require('moment')
var uss=require('../ussFunctions');
var request = require('request-promise');



module.exports.t4Kaydet=async function(req,res){




}


module.exports.t1Kaydet=async function(req,res){




}
module.exports.t2Kaydet=async function(req,res){




}
module.exports.t3Kaydet=async function(req,res){




}

module.exports.krs=async function(req,res){
   if(req.query.aileOyku==false) aileOyku=0
   else aileOyku=1
var options = { method: 'POST',
  url: 'https://hsysapitest.saglik.gov.tr/Common/api/Token/CreateToken',
  headers:
   { 'Postman-Token': '888f3728-2668-4cdc-b03d-d35563677b62',
     'cache-control': 'no-cache',
     Hash: '',
     UygulamaKodu: 'C740D0288F1DC45FE0407C0A04162BDD',
     IslemTipi: 'f8157b24-6d75-4d12-8ddb-3df4dc2062a1',
     DogrulamaTipi: 'UssHekim',
     Sifre: 'Sbsgm2018.',
     KullaniciAdi: '999996' } };
result=await request(options)
result=JSON.parse(result)
hastaTelefon=req.query.hastaTel
hastaTc='24514130718'
isAileOykusuVar=1
url="https://hsysv2test.saglik.gov.tr/KanserRandevu/HastaRandevuBildirim?token="+result.data+"&hastaTelefonu="+hastaTelefon+"&hastaTc="+hastaTc+"&aileOykusuVar="+isAileOykusuVar

res.json({url:url})

}


module.exports.hedefListeAl=async function(req,res){
    stmt = dbMelissa.prepare("DELETE FROM KanserHadefListe").run()
    kolorektalHL=await uss.GetKolorektalKanserTaramasiHedefKitleListesi()
    for (let index = 0; index < kolorektalHL.sonuc.length; index++) {
        const e = kolorektalHL.sonuc[index];
        c="','";
        sql="INSERT INTO KanserHadefListe (Tur,HastaTc,Ad,SOYAD,Cinsiyet,Yas,Uyruk,Birimkodu,Ilkodu,Ilcekodu,Kurumadi,HekimKimlikNo,SorgulamaTarihi,SorgulayanTc"
        sql+=") VALUES('";
        sql+='Kolorektal'+c+e.hastaTc+c+e.ad+c+e.soyad+c+e.cinsiyet+c+getAge(e.dogumTarihi)+c+e.uyruk+c+e.birimKodu+c+e.ilKodu+c+e.ilceKodu+c+e.kurumAdi+c+e.hekimKimlikNumarasi+c+moment().format('MM/DD/YYYY')+c+req.session.user.Tc
        sql+="')";
        dbMelissa.prepare(sql).run()
    }
    
    memeHL=await uss.GetMemeKanseriTaramasiHedefKitleListesi()
    for (let index = 0; index < memeHL.sonuc.length; index++) {
        const e = memeHL.sonuc[index];
        c="','";
        sql="INSERT  INTO KanserHadefListe (Tur,HastaTc,Ad,SOYAD,Cinsiyet,Yas,Uyruk,Birimkodu,Ilkodu,Ilcekodu,Kurumadi,HekimKimlikNo,SorgulamaTarihi,SorgulayanTc"
        sql+=") VALUES('";
        sql+='Meme'+c+e.hastaTc+c+e.ad+c+e.soyad+c+e.cinsiyet+c+getAge(e.dogumTarihi)+c+e.uyruk+c+e.birimKodu+c+e.ilKodu+c+e.ilceKodu+c+e.kurumAdi+c+e.hekimKimlikNumarasi+c+moment().format('MM/DD/YYYY')+c+req.session.user.Tc
        sql+="')";
        dbMelissa.prepare(sql).run()
    }
    
    serviksHL=await uss.GetServiksKanseriTaramasiHedefKitleListesi()
    for (let index = 0; index < serviksHL.sonuc.length; index++) {
        const e = serviksHL.sonuc[index];
        c="','";
        sql="INSERT INTO KanserHadefListe (Tur,HastaTc,Ad,SOYAD,Cinsiyet,Yas,Uyruk,Birimkodu,Ilkodu,Ilcekodu,Kurumadi,HekimKimlikNo,SorgulamaTarihi,SorgulayanTc"
        sql+=") VALUES('";
        sql+='serviks'+c+e.hastaTc+c+e.ad+c+e.soyad+c+e.cinsiyet+c+getAge(e.dogumTarihi)+c+e.uyruk+c+e.birimKodu+c+e.ilKodu+c+e.ilceKodu+c+e.kurumAdi+c+e.hekimKimlikNumarasi+c+moment().format('MM/DD/YYYY')+c+req.session.user.Tc
        sql+="')";
        dbMelissa.prepare(sql).run()
    }


        res.send({kolorektalHL:kolorektalHL.sonuc,memeHL:memeHL.sonuc,serviksHL:serviksHL.sonuc})

}

function getAge(DogumTarihi){

    var birthdate =new Date(DogumTarihi);
		var now = new Date();
		var dayDif=now.getDate()-birthdate.getDate();
		var yearDif=now.getFullYear()-birthdate.getFullYear();
		var monthDif=now.getMonth()-birthdate.getMonth();

	return yearDif

}