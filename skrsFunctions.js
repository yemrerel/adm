

var UygulamaKodu="C740D0288F1DC45FE0407C0A04162BDD";
var Sifre="Sbsgm2018.";
var KullaniciAdi="999996";
const rp = require('request-promise');

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('skrs.db', (err) => {}); 


module.exports.updateSKRS= async function(req,res){
//    await  createTable('KlinikMemeMuayenesi')
//    await insertData('KlinikMemeMuayenesi',"46ff4cc1-3a97-4cb5-a188-b60ad5ef948c")
//    await createTable('KendiKendineMemeMuayenesi')
//    await insertData('KendiKendineMemeMuayenesi','ca7e0d3b-777c-4637-8094-1e17d4eca5f0')
//    await createTable('GaitadaGizliKanTesti')
//    await insertData('GaitadaGizliKanTesti','a6a592bd-2653-4410-b03e-7b8cd712d3bb')
//    await createTable('PapSmearTesti')
//    await insertData('PapSmearTesti','99db2341-c9e7-42a1-bed9-bb04e0388395')
//    await createTable('HPVTaramaTesti')
//    await insertData('HPVTaramaTesti','a1edee3c-cdb4-4b36-810e-ae461b6faeeb')
//    await createTable('KolonGoruntulemeYontemi')
//    await insertData('KolonGoruntulemeYontemi','72ee89f5-de3d-4b1a-b806-d73ea34acbd0')
//    await createTable('Mamografi')
//    await insertData('Mamografi','6d1c6d74-d446-4d53-a056-5e75b19cad0f')
//    await createTable('MamografiSonucu')
//    await insertData('MamografiSonucu','397e2da4-e9be-4822-bd26-dbc82530c783')

// await createTable('TaramaTuru')
// await insertData('TaramaTuru','52bcc87e-b051-4603-b6d6-43298fb0d443')
// await createTable('KurumTuru')
// await insertData('KurumTuru','c04fe73e-4fbc-c653-e040-7b0a6f1415ca')
// await createTable('DiyetTedavisi')
// await insertData('DiyetTedavisi','8c0e3f06-e381-4415-9446-a6251d655f91')
// await createTable('PsikolojikTedavi')
// await insertData('PsikolojikTedavi',"e6e4e0ab-4f88-4e28-99cd-dd0dadcfbf3f")
// await createTable('YatagaBagimlilik')
// await insertData('YatagaBagimlilik',"7c011fa6-7896-409b-8fc7-9b4f501cc9db")
// await createTable('YabanciHastaTuru')
// await insertData('YabanciHastaTuru',"d8e52cb9-4aa9-512c-e043-14031b0a419d")
//      await createTable('AsiUygulamaSekli')
//      await insertData('AsiUygulamaSekli',"f20210e0-d780-4961-87eb-3323000b7dbb")
//      await createTable('AsiKaynak')
//      await insertData('AsiKaynak',"15068142-6853-4dab-86e1-e45e6e93b150")
//      await createTable('AsiUygulamaYeri')
//      await insertData('AsiUygulamaYeri',"eb66330f-2b96-40a7-931e-fc9aed2b9409")
//      await createTable('AsiDoz')
//      await insertData('AsiDoz',"da92a50e-b1a8-4e6a-be8c-2b6ca2c0a58b")
//      await createTable('KacinciIzlem')
//      await insertData('KacinciIzlem',"402e5a45-f723-4309-9cb8-686358dee75a")
//      await createTable('GelisimTablosuBilgilerininSorgulanmasi')
//      await insertData('GelisimTablosuBilgilerininSorgulanmasi',"b0f8712e-a51b-427a-a554-a21574abb07b")
//      await createTable('RisklereYonelikEgitimler')
//      await insertData('RisklereYonelikEgitimler',"58078833-09f4-4046-883e-81777a548af0")
//      await createTable('BebekRiskFaktorlerineYapilanMudaheleler')
//      await insertData('BebekRiskFaktorlerineYapilanMudaheleler',"27f5f375-1755-4d5b-ba13-0b0f6817bfa5")
//      await createTable('RiskTakipi')
//      await insertData('RiskTakipi',"9d81738b-2e2d-4251-b397-34dfb014dc9b")
//      await createTable('idrardaProtein')
//      await insertData('idrardaProtein',"f3d218b5-1a31-4e67-a5f2-72f2d412a802")
//      await createTable('APyontemleri')
//      await insertData('APyontemleri',"24d08065-6a3f-4ee3-b07b-1fe5d83241c1")
//      await createTable('HastaTipi')
//      await insertData('HastaTipi',"4f4fd85e-6f52-4c38-a302-6d5e3d6dc1c4")
//      await createTable('KanGrubu')
//      await insertData('KanGrubu',"a3d6e943-5d85-4c75-ac72-709115974fb7")
//      await createTable('OncekiDogumDurumu')
//      await insertData('OncekiDogumDurumu',"d7e6d65a-b82a-6717-e040-7c0a021654a2")
     // await createTable('Mahalle')
     // await insertData('Mahalle',"8462635e-5253-4e7b-8010-6020fd1501df")
      
     //   await createTable('ICD10Kronik')
     //   await insertData('ICD10Kronik',"a7de45ea-4792-4dda-8b43-3f26e856f62b")
     //   await createTable('ICD10OBEZ')
     //   await insertData('ICD10OBEZ',"a7de45ea-4792-4dda-8b43-3f26e856f62b")
     // await createTable('ICD10')
     // await insertData('ICD10',"c3eaabad-8c4c-56ee-e043-14031b0a5530")
         //await createKronikTanıları()
        // await createObezTanıları()
     // await createTable('ErgenIzlemTakvimi')
     // await insertData('ErgenIzlemTakvimi',"327b7e7e-c54b-469e-bbd4-40670324e1a6")
     // await createTable('KacinciLohusa')
     // await insertData('KacinciLohusa',"05d2b394-9c2b-4b2a-8a3a-8b5023187502")
     // await createTable('Asilar')
     // await insertData('Asilar',"c3dbbb53-3b59-06e1-e043-14031b0a9fe6")
     // await createTable('UlkeKodu')
     // await insertData('UlkeKodu',"d650777a-3d4d-a259-e040-7c0a01167a83")
     // await createTable('IsDurumu')
     // await insertData('IsDurumu',"c5a44219-28d5-4963-984c-93f56e51cfbd")
     // await createTable('MedeniHali')
     // await insertData('MedeniHali',"600a900d-974b-48a3-bf2a-a8fc4752f57c")
     // await createTable('Meslekler')
     // await insertData('Meslekler',"c3eaf407-b302-5fdd-e043-14031b0a2484")
     // await createTable('OgrenimDurumu')
     // await insertData('OgrenimDurumu',"3cdc2ba0-03de-46f4-8ace-684c94712349")
     // await createTable('SosyalGüvenceDurumu')
     // await insertData('SosyalGüvenceDurumu',"530da738-2be0-4adc-a7c1-aca18c66a3f8")
     // await createTable('Cinsiyet')
     // await insertData('Cinsiyet',"784d0f4f-0603-4425-937f-1a3941fc3a1f")
     // await createTable('YabanciHastaTuru')
     // await insertData('YabanciHastaTuru',"d8e52cb9-4aa9-512c-e043-14031b0a419d")
     // await createTable('OzurlulukDurumu')
     // await insertData('OzurlulukDurumu',"199cf767-f649-4c99-8b14-8c988515093f")
     // await createTable('Il')
     // await insertData('Il',"5bc508fa-782a-4d75-831f-34948e350e72")
     //   await createTable('Ilce')
     //   await insertData('Ilce',"96184a9e-537c-4a70-8b3a-27a7a170355b")
     //   await createTable('Koy')
     //   await insertData('Koy',"186585bf-70b6-4db4-805e-22177714d12e")
     // await createTable('Bucak')
     // await insertData('Bucak',"822af824-4163-46f8-b028-3741259b8471")
   //   await createTable('Ilac')
   //   await insertData('Ilac',"c3eab581-ae56-5807-e043-14031b0acb40")
   // await createTable('ReceteTuru')
   // await insertData('ReceteTuru',"c2fbe9bb-f6b3-4cb5-8670-47890ed7ed4b")
   // await createTable('SevkNedeni')
   // await insertData('SevkNedeni',"8d1f1313-3921-4c01-8403-a2f03ab375f3")
   // await createTable('KullanimSekli')
   // await insertData('KullanimSekli',"32d57611-4928-46da-afac-624aaaa388d8")
   // await createTable('KullanimPeriyoduBirimi')
   // await insertData('KullanimPeriyoduBirimi',"64408499-b82a-4e64-805e-e821aa0c64c9")
   // await createTable('Klinikler')
   // await insertData('Klinikler',"c04bee57-c5d4-443d-e040-7b0a6f146a3d")
   // await createTable('APKullanmamaNedeni')
   // await insertData('APKullanmamaNedeni',"084620ca-5f25-469b-af47-158f760f16b5")
   // await createTable('KadinSaglikIslemleri')
   // await insertData('KadinSaglikIslemleri',"9f10cc39-f47a-4611-b328-78e044a8a2bc")
   // await createTable('KadinSaglikRiskFaktorleri')
   // await insertData('KadinSaglikRiskFaktorleri',"4ccb2194-0ce3-4895-99ec-6712db7d0ad7")
   // await createTable('APYontemLojistik')
   // await insertData('APYontemLojistik',"8335af99-322d-4aa5-bdaa-f888b351a30a")
   // await createTable('APOncekiYontem')
   // await insertData('APOncekiYontem',"636bdc8a-eea8-41cf-bcb8-b244cfa8e250")
   // await createTable('SiddetTuru')
   // await insertData('SiddetTuru',"a1abeb83-cc2a-4556-98be-0d5fa6b0980a")
   // await createTable('SiddetSonucuYonlendirme')
   // await insertData('SiddetSonucuYonlendirme',"baa4ecee-31c8-4fec-bbd6-8982289236c0")
   // await createTable('DogumAgirligi')
   // await insertData('DogumAgirligi',"7eff024d-9edb-4e99-a5ca-c35d72152bcf")
   // await createTable('DogumYontemi')
   // await insertData('DogumYontemi',"c03d71af-54c5-4245-aea4-ad58e876e8bd")
   // await createTable('BeyinGelisimiRiskler')
   // await insertData('BeyinGelisimiRiskler',"c81e3e71-8c22-4363-af86-3b687c91b063")
   // await createTable('EbeveynAktivite')
   // await insertData('EbeveynAktivite',"3e30ff47-ed6f-425c-b099-5a4a8121fa10")

   // await createTable('RisklereYonelikEgtimler')
   // await insertData('RisklereYonelikEgtimler',"58078833-09f4-4046-883e-81777a548af0")


   // await createTable('DVitamini')
   // await insertData('DVitamini',"672986f8-5e0d-43a6-b417-37bdc59cd09b")

   // await createTable('DemirDestek')
   // await insertData('DemirDestek',"83c966d5-1054-451c-87c6-19a0e11b287b")
   // await createTable('GelisSekli')
   // await insertData('GelisSekli',"0048702b-ba63-427f-a1eb-46b8461da429")
   // await createTable('KonjenitalAnomali')
   // await insertData('KonjenitalAnomali',"484b2fc2-d1a2-4675-872e-c2c56e72d921")
   // await createTable('GebeRiskFaktor')
   // await insertData('GebeRiskFaktor',"ad9ae051-f75d-4180-b57f-38f45132a1b0")
   // await createTable('GebeTehlikeIsaret')
   // await insertData('GebeTehlikeIsaret',"86d2237f-1896-41cc-bfd5-7745cd576e2d")
   // await createTable('GebelikSonucu')
   // await insertData('GebelikSonucu',"b5070ebb-a700-46dd-8f50-bee87e4b4596")
   // await createTable('DogumaYardimEden')
   // await insertData('DogumaYardimEden',"a85c1ba7-3ae9-44c5-b0d0-613f92c5281b")
   // await createTable('DogumGerceklestigiYer')
   // await insertData('DogumGerceklestigiYer',"bc2104af-0c2b-4a9d-a450-c0827effe607")
   // await createTable('MorbidObez')
   // await insertData('MorbidObez',"7516d5d8-7ed7-4bbc-88f6-cd26d7925c16")
   // await createTable('Egzersiz')
   // await insertData('Egzersiz',"f61204f8-08d4-4aae-9032-893f58319183")
   // await createTable('ObeziteIlacTedavisi')
   // await insertData('ObeziteIlacTedavisi',"e263f61b-bacb-482e-b048-f6eb89a6b3ba")
   // await createTable('OkulCagiPostur')
   // await insertData('OkulCagiPostur',"1db040f2-9b97-4e25-97ad-cc295b2428ee")
   // await createTable('GormeTaramaSonucu')
   // await insertData('GormeTaramaSonucu',"bb174db7-75ea-4bd4-a3e9-cf2a908511cb")
   // await createTable('PostpartumDepresyon')
   // await insertData('PostpartumDepresyon',"8e9f8b79-e70a-427f-ad8c-add091dd4a7c")
   // await createTable('UterusInvolusyon')
   // await insertData('UterusInvolusyon',"d7df9348-aefb-1248-e040-7c0a02161f00")
   // await createTable('ESSonlandirma')
   // await insertData('ESSonlandirma',"bb0d92ea-397f-4c8d-989c-f00aa9d5d7ff")
      // await createTable('BasvuruTuru')
      // await insertData('BasvuruTuru',"8f04bf30-3501-4080-91df-458e20917be2")
      // await createTable('BakimDestekihtiyaci')
      // await insertData('BakimDestekihtiyaci',"9b5502a4-93a7-4594-88e6-3eeaf0c302c1")
      // await createTable('KisiselBakim')
      // await insertData('KisiselBakim',"922fd54a-443f-4b47-9e82-53f9d7f96a0d")
      // await createTable('KonutTipi')
      // await insertData('KonutTipi',"9462baa3-789f-4d54-9475-8d7cd186b408")
      // await createTable('HelaTipi')
      // await insertData('HelaTipi',"52d09f03-7eff-47aa-898f-f197e7597904")
      // await createTable('HPVTipleri')
      // await insertData('HPVTipleri',"fe6835a3-5ee1-4d18-bb50-1f0cc336136a")
      // await createTable('ServikalSitoloji')
      // await insertData('ServikalSitoloji',"197c1232-2886-47de-9a38-0d5401fe6510")
      // await createTable('Kurumlar')
      // await insertData('Kurumlar',"c3eade04-4f91-5dab-e043-14031b0ac9f9")
      //  await createTable('GKDTaramaSonucu')
      //  await insertData('GKDTaramaSonucu',"03dee8e4-6d54-4009-9b53-84c11d302e14")
      //  await createTable('BebekBeslenmeDurumu')
      //  await insertData('BebekBeslenmeDurumu',"7f29ff54-3810-4875-9dda-01ac0d70fa21")
      //  await createTable('NTPTakipBilgisi')
      //  await insertData('NTPTakipBilgisi',"b409d9c0-fe50-43e0-afab-889cf87a2855")
      //   await createTable('PERSENTIL')
      //   await insertData('PERSENTIL',"c3eb0815-fe11-6223-e043-14031b0aef1e")
      //   await createTable('HastaGrup')
      //   await insertData('HastaGrup',"c1cd773f-43aa-4481-e043-14031b0a83c7")
      // await createTable('TaramaTipi')
      // await insertData('TaramaTipi',"a332c5df-5662-4fe0-bb03-62d5d30567a4")
      // await createTable('DogumSirasi')
      // await insertData('DogumSirasi',"2a66899f-b4f1-43c2-a672-bb2d3d67e0cc")
      // await createTable('GebeRiskFaktorlerineYapilanMudaheleler')
      // await insertData('GebeRiskFaktorlerineYapilanMudaheleler',"d6572124-7f21-4cf2-aad8-e6240ea06e2a")
      // await createTable('GebeRiskTakipi')
      // await insertData('GebeRiskTakipi',"02f4541a-3dcf-4519-9c43-c2251db70590")
      // await createTable('SezaryanEndikasyonlar')
      // await insertData('SezaryanEndikasyonlar',"d7d14450-eaf1-7321-e040-7c0a04164cc0")
      // await createTable('EndikasyonNedenleri')
      // await insertData('EndikasyonNedenleri',"d7d15411-dbc7-f5bd-e040-7c0a041665a6")
      //   await createTable('AsiIslemTuru')
      //   await insertData('AsiIslemTuru',"5fff8778-89a4-4045-b33e-a7ffe0de0179")
      
      //   await createTable('GestasyonelDiyabetTaramasi')
      //   await insertData('GestasyonelDiyabetTaramasi',"eac44682-3583-47f3-8066-7310aac49a21")
      //   await createTable('KacinciGebeIzlem')
      //   await insertData('KacinciGebeIzlem',"a280b762-8804-4049-b587-7c471ff2cbee")
         // await createTable('NTPDurumBilgisi')
         // await insertData('NTPDurumBilgisi',"ece57deb-3c0c-4801-a65f-8123e48f3912")
      //    await createTable('ICD_MSVS')
      //  await insertData('ICD_MSVS',"a7de45ea-4792-4dda-8b43-3f26e856f62b")
      //    await createTable('MeslekiMaruziyetDurumu')
      //  await insertData('MeslekiMaruziyetDurumu',"3a39e318-9673-4dfe-842d-939cf487dc17")
      // await createTable('VakaTipi')
      //  await insertData('VakaTipi',"663db642-20db-4160-bd77-c9be99c7f496")
      //  await createTable('TaniTürü')
      //  await insertData('TaniTürü',"55894edb-1a8c-4f7f-a447-0119e61c14f1")
      //  await createTable('KacinciOzellikliIzlem')
      //  await insertData('KacinciOzellikliIzlem',"2fac0018-57dc-40fd-a285-3c27cacc0f7f")
      //  await createTable('ASI_YAPILMAMA_DURUMU')
      //  await insertData('ASI_YAPILMAMA_DURUMU',"0d70eb6c-1b87-4a23-a744-d4dd68210270")
      //  await createTable('ASI_YAPILMAMA_NEDENI')
      //  await insertData('ASI_YAPILMAMA_NEDENI',"c6651718-aa25-a422-e0407-c0a011657e6")
      // await createTable('ASI_OZEL_DURUM_NEDENI')
      //  await insertData('ASI_OZEL_DURUM_NEDENI',"0a8f681f-4ed0-4830-9dc9-a0295686398b")
       await createTable('BILDIRIMI_ZORUNLU_ASI_SONRASI_ISTENMEYEN_ETKI_NEDENI')
       await insertData('BILDIRIMI_ZORUNLU_ASI_SONRASI_ISTENMEYEN_ETKI_NEDENI',"c6652612-6fcb-6fa8-e040-7c0a011670bd")
       
};
async function createTable(name) {

     db.serialize(() => {
          db.run("DROP TABLE IF EXISTS "+ name+" ;");
          if(name=='Mahalle')                 db.run("CREATE TABLE IF NOT EXISTS "+ name+" (KOYKODU TEXT ,AKTIF TEXT,ADI TEXT ,KODU TEXT ,TANITIMKODU TEXT ,TIPI TEXT)");   
          else if(name=='KacinciLohusa')      db.run("CREATE TABLE IF NOT EXISTS "+ name+" (SONUYGULANMATARIHI TEXT ,AKTIF TEXT,ADI TEXT ,KODU TEXT ,ILKUYGULANMATARIHI TEXT)");
          else if(name=='ICD10Kronik')        db.run("CREATE TABLE IF NOT EXISTS "+ name+" (ICDKODU TEXT)");
          else if(name=='ICD10OBEZ')          db.run("CREATE TABLE IF NOT EXISTS "+ name+" (ICDKODU TEXT)");
          else if(name=='ICD10')              db.run("CREATE TABLE IF NOT EXISTS "+ name+" (ADI TEXT ,KODU TEXT ,USTKODU TEXT ,SEVIYE TEXT,AKTIF TEXT)");
          else if(name=='ErgenIzlemTakvimi')  db.run("CREATE TABLE IF NOT EXISTS "+ name+" (ADI TEXT ,KODU TEXT ,PERFDAHILMI TEXT ,SONUYGULANMATARIHI TEXT,AKTIF TEXT,ILKUYGULANMATARIHI TEXT)");
          else if(name=='Asilar')             db.run("CREATE TABLE IF NOT EXISTS "+ name+" (AKTIF TEXT,ADI TEXT ,KODU TEXT ,HL7KODU TEXT)");
          else if(name=='Ilce')             db.run("CREATE TABLE IF NOT EXISTS "+ name+" (AKTIF TEXT,ADI TEXT ,KODU TEXT ,ILKODU TEXT)");
          else if(name=='Koy')             db.run("CREATE TABLE IF NOT EXISTS "+ name+" (AKTIF TEXT,ADI TEXT ,KODU TEXT ,BUCAKKODU TEXT)");
          else if(name=='Bucak')             db.run("CREATE TABLE IF NOT EXISTS "+ name+" (AKTIF TEXT,ADI TEXT ,KODU TEXT ,ILCEKODU TEXT)");
          else if(name=='Ilac')             db.run("CREATE TABLE IF NOT EXISTS "+ name+" (AKTIF TEXT,ADI TEXT ,BARKODU TEXT ,FIRMAADI TEXT,ATCKODU TEXT,ATCADI TEXT)");
          else if(name=='Kurumlar')             db.run("CREATE TABLE IF NOT EXISTS "+ name+" (AKTIF TEXT,ADI TEXT ,KODU TEXT ,ILKODU TEXT,ILCEKODU TEXT,KURUMTIPI TEXT,KURUMTURKODU TEXT,BASAMAKSEVIYESI TEXT)");
          else if(name=='UlkeKodu')           db.run("CREATE TABLE IF NOT EXISTS "+ name+" (AKTIF TEXT,ADI TEXT ,KODU TEXT ,MERNISKODU TEXT)");
          else if(name=='PERSENTIL')           db.run("CREATE TABLE IF NOT EXISTS "+ name+" (ADI TEXT ,ALTSINIR TEXT,KODU TEXT ,AY TEXT,BIRIM TEXT,SEVIYE TEXT,USTBOLUMKODU TEXT)");
          else if(name=='ICD_MSVS')           db.run("CREATE TABLE IF NOT EXISTS "+ name+" (ICDKODU TEXT ,MSVSKODU TEXT,AKTIF TEXT,MSVSADI Text)");

          else db.run("CREATE TABLE IF NOT EXISTS "+ name+" (AKTIF TEXT,ADI TEXT ,KODU TEXT )");
     });
};



async function insertData(name,guid,page) {
     if(page==undefined){
          page=1
     }
     options = {
            method: 'get',
            uri: "http://skrs.saglik.gov.tr/api/SkrsService/GetSkrsObject?skrsCodeSystemGuid="+guid+"&page="+page,    
            headers: {
                 Accept:'application/json',
                'content-type': ' application/xml',
                "UygulamaKodu": UygulamaKodu, "Sifre": Sifre, "KullaniciAdi": KullaniciAdi
            },
            json: true
     };
     db.serialize(() => {
         
          rp(options)
          .then(function (body) { 
                     array = body.sonuc.kayit;
                     for (let i = 0; i < array.length; i++) {
                           e = array[i];
                           if(name=='Mahalle')
                           {
                              var stmt = db.prepare('REPLACE into '+ name+'  values(?, ?, ?, ?, ?, ?);');
                              stmt.run(e.KOYKODU,e.AKTIF,e.ADI,e.KODU,e.TANITIMKODU,e.TIPI)
                           }
                           else if(name=='Asilar'){
                              var stmt = db.prepare('REPLACE into '+ name+'  values(?, ?, ?,?);');
                              stmt.run(e.AKTIF,e.ADI,e.KODU,e.HL7KODU)
                           }
                           else if(name=='Bucak'){
                              var stmt = db.prepare('REPLACE into '+ name+'  values(?, ?, ?,?);');
                              stmt.run(e.AKTIF,e.ADI,e.KODU,e.ILCEKODU)
                           }    
                           else if(name=='Koy'){
                              var stmt = db.prepare('REPLACE into '+ name+'  values(?, ?, ?,?);');
                              stmt.run(e.AKTIF,e.ADI,e.KODU,e.BUCAKKODU)
                           }     
                           else if(name=='Ilce'){
                              var stmt = db.prepare('REPLACE into '+ name+'  values(?, ?, ?,?);');
                              stmt.run(e.AKTIF,e.ADI,e.KODU,e.ILKODU)
                           }                     
                           else if(name=='UlkeKodu'){
                              var stmt = db.prepare('REPLACE into '+ name+'  values(?, ?, ?,?);');
                              stmt.run(e.AKTIF,e.ADI,e.KODU,e.MERNISKODU)
                           }
                           else if(name=='KacinciLohusa')
                           {
                              var stmt = db.prepare('REPLACE into '+ name+'  values(?, ?, ?, ?, ?);');
                              stmt.run(e.SONUYGULANMATARIHI,e.AKTIF,e.ADI,e.KODU,e.ILKUYGULANMATARIHI)
                           }
                           else if(name=='ICD10Kronik')
                           {
                              if( e.MSVSADI=='KRONIK HASTALIKLAR')
                              {
                                   var stmt = db.prepare('REPLACE into '+ name+'  values(?);');
                                   stmt.run(e.ICDKODU)
                              }                           
                           }
                           else if(name=='ICD10OBEZ')
                           {
                              if( e.MSVSKODU==43)
                              {
                                   var stmt = db.prepare('REPLACE into '+ name+'  values(?);');
                                   stmt.run(e.ICDKODU)
                              }                           
                           }
                           else if(name=='ICD10')
                           {
                              var stmt = db.prepare('REPLACE into '+ name+'  values(?, ?, ?, ?, ?);');
                              stmt.run(e.ADI,e.KODU,e.USTKODU,e.SEVIYE,e.AKTIF)
                           }
                           else if(name=='Ilac')
                           {
                              var stmt = db.prepare('REPLACE into '+ name+'  values(?, ?, ?, ?, ?, ?);');
                              stmt.run(e.AKTIF,e.ADI,e.BARKODU,e.FIRMAADI,e.ATCKODU,e.ATCADI)
                           }
                            else if(name=='ErgenIzlemTakvimi')     
                           {
                              var stmt = db.prepare('REPLACE into '+ name+'  values(?, ?, ?, ?, ?, ?);');
                              stmt.run(e.ADI,e.KODU,e.PERFDAHILMI,e.SONUYGULANMATARIHI,e.AKTIF,e.ILKUYGULANMATARIHI)
                           }
                           else if(name=='Kurumlar')     
                           {
                              var stmt = db.prepare('REPLACE into '+ name+'  values(?, ?, ?, ?, ?, ?,?,?);');
                              stmt.run(e.AKTIF,e.ADI,e.KODU,e.ILKODU,e.ILCEKODU,e.KURUMTIPI,e.KURUMTURKODU,e.BASAMAKSEVIYESI)
                           }
                           else if(name=='PERSENTIL')     
                           {
                              var stmt = db.prepare('REPLACE into '+ name+'  values(?, ?, ?, ?, ?, ?,?);');
                              stmt.run(e.ADI,e.ALTSINIR,e.KODU,e.AY,e.BIRIM,e.SEVIYE,e.USTBOLUMKODU)
                           }
                           else if(name=='ICD_MSVS')     
                           {
                              var stmt = db.prepare('REPLACE into '+ name+'  values(?, ?, ?, ?);');
                              stmt.run(e.ICDKODU,e.MSVSKODU,e.AKTIF,e.MSVSADI)
                           } 
                           else if(name=='KacinciOzellikliIzlem')     
                           {
                              var stmt = db.prepare('REPLACE into '+ name+'  values(?, ?, ?);');
                              stmt.run(e.aktif,e.adi,e.kodu)
                           } 
                           else{
                              var stmt = db.prepare('REPLACE into '+ name+'  values(?, ?, ?);');
                              stmt.run(e.AKTIF,e.ADI,e.KODU)
                           }
                     }
                     if(body.sonuc.sonrakiSayfa!=1){
                         insertData(name,guid,body.sonuc.sonrakiSayfa)
                     }
          })
          .catch(function (err) {
                     console.log(err)                 
                     insertData(name,guid, page)                                    
           });
     });
};




async function createKronikTanıları() {
   db.serialize(() => {
      db.run("DROP TABLE IF EXISTS KronikHastaliklar ;");
      db.run("CREATE TABLE IF NOT EXISTS KronikHastaliklar (ADI TEXT ,KODU TEXT ,USTKODU TEXT ,SEVIYE TEXT,AKTIF TEXT)");
      db.each('select * from ICD10 INNER JOIN ICD10Kronik ON ICD10.KODU = ICD10Kronik.ICDKODU;',[],(err, row ) => {
          var stmt = db.prepare('REPLACE into KronikHastaliklar  values(?, ?, ?, ?, ?);');
          stmt.run(row.ADI,row.KODU,row.USTKODU,row.SEVIYE,row.AKTIF)
      });
   });
};
async function createObezTanıları() {
   db.serialize(() => {
      db.run("DROP TABLE IF EXISTS ObezEktanilar ;");
      db.run("CREATE TABLE IF NOT EXISTS ObezEktanilar (ADI TEXT ,KODU TEXT ,USTKODU TEXT ,SEVIYE TEXT,AKTIF TEXT)");
      db.each('select * from ICD10 INNER JOIN ICD10OBEZ ON ICD10.KODU = ICD10OBEZ.ICDKODU;',[],(err, row ) => {
          var stmt = db.prepare('REPLACE into ObezEktanilar  values(?, ?, ?, ?, ?);');
          stmt.run(row.ADI,row.KODU,row.USTKODU,row.SEVIYE,row.AKTIF)
      });
   });
};