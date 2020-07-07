const Database = require('better-sqlite3');
const dbSkrs = new Database('skrs.db', { });
const dbMelissa = new Database('melissa.db', { });
var moment=require('moment')
var sys=require('../sys/SYS')
const uuidv1 = require('uuid/v1');

 
module.exports.sysHastaGonder=async function(req,res){
    result=false
    const tc = JSON.parse(JSON.stringify(req.body)).tc
    sql = "SELECT * FROM Hasta WHERE Id="+tc+" and SentToMsvs="+0
    h = dbMelissa.prepare(sql).get()
            if(h.Id==tc){
                form={}
                form.AD=h.Ad
                form.SOYAD=h.Soyad
                form.DOGUM_TARIHI=new Date(h.ResmiDogumTarihi).toISOString().replace(/[^0-9]/g, "").slice(0, -5) 
                form.CINSIYET_KODU=h.Cinsiyet
                form.CINSIYET_ADI = dbSkrs.prepare("SELECT * FROM Cinsiyet where KODU="+h.Cinsiyet).get().ADI;
                form.UYRUK_KODU=h.Uyruk
                form.UYRUK_ADI=dbSkrs.prepare("SELECT * FROM UlkeKodu where MERNISKODU="+h.Uyruk).get().ADI;
                form.ANNE_KIMLIK_NUMARASI=''
    

                form.HASTANE_REFERANS_NUMARASI=uuidv1().toString()
                form.DOGUM_SIRASI=''
                form.BEYAN_DOGUM_TARIHI=''
                form.YABANCI_HASTA_KIMLIK_NUMARASI=''
                form.PASAPORT_NO=''
                form.KIMLIKSIZ_HASTA_BILGISI=''
                form.BABA_KIMLIK_NUMARASI=''
                form.GELDIGI_ULKE_KODU=undefined
                form.GELDIGI_ULKE_ADI=''
                form.TELEFON_NUMARASI=''
                form.EPOSTA_ADRESI=''
                form.YABANCI_HASTA_TURU_KODU=undefined
                form.YABANCI_HASTA_TURU_ADI=''
                form.YUPASS_NO=''
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
                    form.HASTA_KIMLIK_NUMARASI=tc

                }
                sysNo=await sys.HastaKayıt(form)
                var sql="UPDATE Hasta SET SysTakipNO='"+sysNo+"' , SentToMsvs=1 where Id="+form.HASTA_KIMLIK_NUMARASI+";";

                dbMelissa.prepare(sql).run()
                result=true
            }
    res.send(result)
}