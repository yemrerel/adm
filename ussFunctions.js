
const Database = require('better-sqlite3');
const dbSkrs = new Database('skrs.db', { });
const dbMelissa = new Database('melissa.db', { });
var request = require('request-promise');
var mernis=require('./Mernis');
var moment = require('moment');


var birimID=''
const KullaniciAdi=999996
const Sifre='Sbsgm2018.'
const UygulamaKodu='C740D0288F1DC45FE0407C0A04162BDD'

module.exports.updateAll= async function(req,res){

   // await GetBirimeAitSonYeniEklenenHastaListesi()
    //await GetHastaIletisimBilgileri('26563360832')
};


async function GetBirimeYeniEklenenHastaListesi(baslangicTarihi) {
    
  bitisTarihi=moment().format("YYYYMMDD")
    var url="https://ussservis.saglik.gov.tr/api/hasta/GetBirimeYeniEklenenHastaListesi?birimId="+birimID+"&baslangicTarihi="+baslangicTarihi+"&bitisTarihi="+bitisTarihi;
   
    var opt = {
     uri:url,
     method: 'get',
     headers: { "KullaniciAdi": KullaniciAdi,"Sifre":Sifre,"UygulamaKodu":UygulamaKodu},
    };

    //response=await request(opt)
    return GetBirimeYeniEklenenHastalar
};
module.exports.GetBirimeYeniEklenenHastaListesi= GetBirimeYeniEklenenHastaListesi



async function GetHastaIletisimBilgileri(tc) {

    var url="https://usskurumsal.saglik.gov.tr/api/hasta/GetHastaIletisimBilgileri?tcKimlikNo="+tc;
    var opt = {
     uri:url,
     method: 'get',
     headers: { "KullaniciAdi": KullaniciAdi,"Sifre":Sifre,"UygulamaKodu":UygulamaKodu},
    };

   // response=await request(opt)
    return HastaIletisimBilgileri
};
module.exports.GetHastaIletisimBilgileri= GetHastaIletisimBilgileri


async function Get1549KadinIzlemListesi(tc) {

  var url="https://ussservis.saglik.gov.tr/api/hasta/Get1549KadinIzlemListesi?tcKimlikNo="+tc;
  var opt = {
   uri:url,
   method: 'get',
   headers: { "KullaniciAdi": KullaniciAdi,"Sifre":Sifre,"UygulamaKodu":UygulamaKodu},
  };

  //response=await request(opt)

  response=kadınIzlem.sonuc


  console.log(response)
};
module.exports.Get1549KadinIzlemListesi= Get1549KadinIzlemListesi



async function GetBirimeAitYenidoganHastaListesi(birimID) {

  var url="https://ussservis.saglik.gov.tr/api/hasta/GetBirimeAitYenidoganHastaListesi?birimId="+birimID;
  var opt = {
   uri:url,
   method: 'get',
   headers: { "KullaniciAdi": KullaniciAdi,"Sifre":Sifre,"UygulamaKodu":UygulamaKodu},
  };

  response=await request(opt)
  
  return YenidoganHastaListesi
};
module.exports.GetBirimeAitYenidoganHastaListesi= GetBirimeAitYenidoganHastaListesi


YenidoganHastaListesi={
  "durum": 1,
  "sonuc": [    
    {
      "ad": null,
      "annetckimliknumarasi": 12312312312,
      "cinsiyetresmi": null,
      "dogumsirasi": 1,
      "dogumtarihi": "2013-02-06T00:00:00",
      "dogumtarihiresmi": null,
      "gezicidurumu": null,
      "hastakimliknumarasi": null,
      "lokasyonkodu": null,
      "olumtarihi": null,
      "soyad": null,
      "uyruk": null,
      "mavikart": null
    },
    {
      "ad": null,
      "annetckimliknumarasi": 43243243212,
      "cinsiyetresmi": null,
      "dogumsirasi": 1,
      "dogumtarihi": "2014-09-12T00:00:00",
      "dogumtarihiresmi": null,
      "gezicidurumu": null,
      "hastakimliknumarasi": null,
      "lokasyonkodu": null,
      "olumtarihi": null,
      "soyad": null,
      "uyruk": null,
      "mavikart": null
    }
  ],
  "mesaj": null
}









var kadınIzlem={
  "durum": 1,
  "sonuc": [
  {
  "sysTakipNo": "sytkipNo1",
  "hastaTc": "12345678910",
  "konjenitalAnomaliVarligi": "HİÇBİR GEBELİĞİNDE YOK",
  "canliDoganBebekSayisi": "2",
  "hemoglobin": "2,000000",
  "oluDoganBebekSayisi": "0",
  "birOncekiDogumDurumu": "DAHA ÖNCE DOGUM YAPMİS",
  "izleminYapildigiYer": "TEST DEVLET HASTAHANESİ",
  "bilgiAlinanKisiAdiSoyadi": "Test1",
  "bilgiAlinanKisiTel": "BILGI_ALINAN_KISI_TEL",
  "izlemTarihi": "yyyyMMddHHmm",
  "kurumAdi": "TEST DEVLET HASTAHANESİ",
  "kadinIzlemApBilgisi": [
  {
  "ailePlanlamasiYontemiLojistigi": "KIŞI TARAFINDAN TEMIN EDILEN",
  "kullanilanAilePlanlamasiYontemi": "DERİ ALTI İMPLANT"
  }
  ],
  "kadinIzlemApKullanmamaNedeni": [
  {
  "apyKullanmamaNedeni": "GEBE KALMAK İSTİYOR"
  },
  {
  "apyKullanmamaNedeni": "EMZİRİYOR"
  }
  ],
  "kadinIzlemBirOncekiApBilgisi": [
  {
  "birOncekiApYontemi": "DERİ ALTI İMPLANT"
  },
  {
  "birOncekiApYontemi": "RIA"
  }
  ],
  "kadinIzlemKadinSagligi": [
  {
  "kadinSagligiIslemleri": "ÜREME SAĞLIĞI DANIŞMANLIĞI"
  },
  {
  "kadinSagligiIslemleri": "BESLENME DANIŞMANLIĞI"
  }
  ]
  },
  {
  "sysTakipNo": "sytkipNo2",
  "hastaTc": "12345678910",
  "konjenitalAnomaliVarligi": "HİÇBİR GEBELİĞİNDE YOK",
  "canliDoganBebekSayisi": "2",
  "hemoglobin": "2,000000",
  "oluDoganBebekSayisi": "0",
  "birOncekiDogumDurumu": "DAHA ÖNCE DOGUM YAPMİS",
  "izleminYapildigiYer": "TEST DEVLET HASTAHANESİ",
  "bilgiAlinanKisiAdiSoyadi": "Test1",
  "bilgiAlinanKisiTel": "BILGI_ALINAN_KISI_TEL",
  "izlemTarihi": "yyyyMMddHHmm",
  "kurumAdi": "TEST DEVLET HASTAHANESİ",
  "kadinIzlemApBilgisi": [
  {
  "ailePlanlamasiYontemiLojistigi": "KIŞI TARAFINDAN TEMIN EDILEN",
  "kullanilanAilePlanlamasiYontemi": "DERİ ALTI İMPLANT"
  }
  ],
  "kadinIzlemApKullanmamaNedeni": [
  {
  "apyKullanmamaNedeni": "GEBE KALMAK İSTİYOR"
  },
  {
  "apyKullanmamaNedeni": "EMZİRİYOR"
  }
  ],
  "kadinIzlemBirOncekiApBilgisi": [
  {
  "birOncekiApYontemi": "DERİ ALTI İMPLANT"
  },
  {
  "birOncekiApYontemi": "RIA"
  }
  ],
  "kadinIzlemKadinSagligi": [
  {
  "kadinSagligiIslemleri": "ÜREME SAĞLIĞI DANIŞMANLIĞI"
  },
  {
  "kadinSagligiIslemleri": "BESLENME DANIŞMANLIĞI"
  },
  {
  "kadinSagligiIslemleri": "EMZİRME DANIŞMANLIĞI"
  }
  ]
  }
  ],
  "mesaj": null
  }

var GetBirimeYeniEklenenHastalar= {
  "durum": 1,
  "sonuc": [
    {
      "ad": "ERTUĞRUL",
      "annetckimliknumarasi": 44627062132,
      "cinsiyetresmi": 1,
      "dogumsirasi": null,
      "dogumtarihi": "1994-10-01T00:00:00",
      "dogumtarihiresmi": "1994-10-01T00:00:00",
      "gezicidurumu": "True",
      "hastakimliknumarasi": 10774881040,
      "lokasyonkodu": 2167,
      "olumtarihi": null,
      "soyad": "YELBAY",
      "uyruk": 9980,
      "mavikart": 0
    },
    {
      "ad": "YEŞİM",
      "annetckimliknumarasi": 10016004282,
      "cinsiyetresmi": 2,
      "dogumsirasi": null,
      "dogumtarihi": "1994-10-01T00:00:00",
      "dogumtarihiresmi": "1994-10-01T00:00:00",
      "gezicidurumu": "False",
      "hastakimliknumarasi": 26563360832,
      "lokasyonkodu": 2167,
      "olumtarihi": null,
      "soyad": "YELBAY",
      "uyruk": 9980,
      "mavikart": 0
    },
    {
      "ad": "ALİ SELAHADDİN",
      "annetckimliknumarasi": 44627062132,
      "cinsiyetresmi": 1,
      "dogumsirasi": null,
      "dogumtarihi": "2019-10-01T00:00:00",
      "dogumtarihiresmi": "2019-10-01T00:00:00",
      "gezicidurumu": "False",
      "hastakimliknumarasi": 29551255486,
      "lokasyonkodu": 2167,
      "olumtarihi": null,
      "soyad": "BALIK",
      "uyruk": 9980,
      "mavikart": 0
    },
    {
      "ad": "PÜREN",
      "annetckimliknumarasi": 44627062132,
      "cinsiyetresmi": 2,
      "dogumsirasi": null,
      "dogumtarihi": "1998-10-01T00:00:00",
      "dogumtarihiresmi": "1998-10-01T00:00:00",
      "gezicidurumu": "False",
      "hastakimliknumarasi": 30043248374,
      "lokasyonkodu": 2167,
      "olumtarihi": null,
      "soyad": "BALIK",
      "uyruk": 9980,
      "mavikart": 0
    },
   
   
  ],
  "mesaj": null
}


HastaIletisimBilgileri={
  "durum": 1,
  "sonuc": {
      "mhrs": [
          {
              "telefonTipi": 1,
              "telefonNumarasi": "31231204028"
          },
          {
              "telefonTipi": 3,
              "telefonNumarasi": "123123123"
          }
      ],
      "enabiz": [
          {
              "telefonTipi": 3,
              "telefonNumarasi": "123123123"
          }
      ]
  },
  "mesaj": null
}




async function GetKolorektalKanserTaramasiHedefKitleListesi(baslangicTarihi) {
    
  bitisTarihi=moment().format("YYYYMMDD")
    var url="https://ussservis.saglik.gov.tr/api/tarama/GetKolorektalKanserTaramasiHedefKitleListesi?birimId="+birimID
    var opt = {
     uri:url,
     method: 'get',
     headers: { "KullaniciAdi": KullaniciAdi,"Sifre":Sifre,"UygulamaKodu":UygulamaKodu},
    };

   // response=await request(opt)
    return kolorektalHastaHedefListesi
};
module.exports.GetKolorektalKanserTaramasiHedefKitleListesi= GetKolorektalKanserTaramasiHedefKitleListesi

kolorektalHastaHedefListesi={
  "durum": 1,
  "sonuc": [
    {
      "hastaTc": "10009451932",
      "ad": "ZEKİ HALUK",
      "soyad": "EVSİNE",
      "cinsiyet": 1,
      "dogumTarihi": "2001-08-11T00:00:00",
      "uyruk": 9980,
      "birimKodu": 123321,
      "ilKodu": 1,
      "ilceKodu": 1234,
      "kurumAdi": "TEST AİLE HEKİMLİĞİ BİRİMİ",
      "hekimKimlikNumarasi": "99999999999"
  },        
  {
      "hastaTc": "10016004282",
      "ad": "YEŞİM",
      "soyad": "YELBAY",
      "cinsiyet": 2,
      "dogumTarihi": "1969-12-16T00:00:00",
      "uyruk": 9980,
      "birimKodu": 123321,
      "ilKodu": 1,
      "ilceKodu": 1234,
      "kurumAdi": "TEST AİLE HEKİMLİĞİ BİRİMİ",
      "hekimKimlikNumarasi": "99999999999"
  }
  ],
  "mesaj": null
}



async function GetMemeKanseriTaramasiHedefKitleListesi(baslangicTarihi) {
    
  bitisTarihi=moment().format("YYYYMMDD")
    var url="https://ussservis.saglik.gov.tr/api/tarama/GetMemeKanseriTaramasiHedefKitleListesi?birimId="+birimID
    var opt = {
     uri:url,
     method: 'get',
     headers: { "KullaniciAdi": KullaniciAdi,"Sifre":Sifre,"UygulamaKodu":UygulamaKodu},
    };

   // response=await request(opt)
    return memeHastaHedefListesi
};
module.exports.GetMemeKanseriTaramasiHedefKitleListesi= GetMemeKanseriTaramasiHedefKitleListesi

memeHastaHedefListesi={
  "durum": 1,
  "sonuc": [
    {
      "hastaTc": "10009451932",
      "ad": "ZEKİ HALUK",
      "soyad": "EVSİNE",
      "cinsiyet": 1,
      "dogumTarihi": "2001-08-11T00:00:00",
      "uyruk": 9980,
      "birimKodu": 123321,
      "ilKodu": 1,
      "ilceKodu": 1234,
      "kurumAdi": "TEST AİLE HEKİMLİĞİ BİRİMİ",
      "hekimKimlikNumarasi": "99999999999"
  },        
  {
      "hastaTc": "10016004282",
      "ad": "YEŞİM",
      "soyad": "YELBAY",
      "cinsiyet": 2,
      "dogumTarihi": "1969-12-16T00:00:00",
      "uyruk": 9980,
      "birimKodu": 123321,
      "ilKodu": 1,
      "ilceKodu": 1234,
      "kurumAdi": "TEST AİLE HEKİMLİĞİ BİRİMİ",
      "hekimKimlikNumarasi": "99999999999"
  }
  ],
  "mesaj": null
}




async function GetServiksKanseriTaramasiHedefKitleListesi(baslangicTarihi) {
    
  bitisTarihi=moment().format("YYYYMMDD")
    var url="https://ussservis.saglik.gov.tr/api/tarama/GetServiksKanseriTaramasiHedefKitleListesi?birimId="+birimID
    var opt = {
     uri:url,
     method: 'get',
     headers: { "KullaniciAdi": KullaniciAdi,"Sifre":Sifre,"UygulamaKodu":UygulamaKodu},
    };

   // response=await request(opt)
    return serviksHastaHedefListesi
};
module.exports.GetServiksKanseriTaramasiHedefKitleListesi= GetServiksKanseriTaramasiHedefKitleListesi

serviksHastaHedefListesi={
  "durum": 1,
  "sonuc": [
      {
          "hastaTc": "10009451932",
          "ad": "ZEKİ HALUK",
          "soyad": "EVSİNE",
          "cinsiyet": 1,
          "dogumTarihi": "2001-08-11T00:00:00",
          "uyruk": 9980,
          "birimKodu": 123321,
          "ilKodu": 1,
          "ilceKodu": 1234,
          "kurumAdi": "TEST AİLE HEKİMLİĞİ BİRİMİ",
          "hekimKimlikNumarasi": "99999999999"
      },        
      {
          "hastaTc": "10016004282",
          "ad": "YEŞİM",
          "soyad": "YELBAY",
          "cinsiyet": 2,
          "dogumTarihi": "1969-12-16T00:00:00",
          "uyruk": 9980,
          "birimKodu": 123321,
          "ilKodu": 1,
          "ilceKodu": 1234,
          "kurumAdi": "TEST AİLE HEKİMLİĞİ BİRİMİ",
          "hekimKimlikNumarasi": "99999999999"
      }
  ],
  "mesaj": null
}