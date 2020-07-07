const Database = require('better-sqlite3');
const dbSkrs = new Database('skrs.db', { });
const dbMelissa = new Database('melissa.db', { });
var sys=require('../sys/SYS')
var moment=require('moment')


module.exports.index=function(req,res){
    res.render('ayarlar');
}
module.exports.hesapKaydet=function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    if(form.AHUzmanı==undefined)form.AHUzmanı=0
    stmt = dbMelissa.prepare('UPDATE User SET Ad = ? , Soyad=? , Cinsiyet=? , ProfilTipi=? , AH=? , ILKODU=? , ILCEKODU=? , AHUzmani=? , DipTesNo=? , IhtisasNo=? , KpsKullaniciAdi=? , KpsSifre=? , AlisKullaniciAdi=? , AlisSifre=?  , BransKodu=? , SertifikaKodu=?  WHERE Tc = ?'); 
    updates = stmt.run(form.isim,form.soyisim,form.cinsiyet,form.profilType,form.AH,form.Sehir,form.ilce,form.AHUzmanı,form.DipTesNo,form.IhtisasNo,form.KpsKullaniciAdi,form.KpsSifre,form.AlisKullaniciAdi,form.AlisSifre,form.BransKodu,form.SertifikaKodu ,form.tc);
    stmt = dbMelissa.prepare("SELECT * FROM User where Tc='"+form.tc+"'");
    req.session.user=stmt.get();
    res.send(true)
}

module.exports.hesap=function(req,res){
    params={}
    user=req.session.user
    params.user=user
    stmt = dbSkrs.prepare("SELECT * FROM Il");
    params.iller= stmt.all();
    stmt = dbSkrs.prepare("SELECT * FROM Ilce where ILKODU="+ user.ILKODU);
    params.ilceler= stmt.all();
    res.render('hesapAyarları',params);
}
module.exports.backup=async function(req,res){

 var fs = require('fs')
 const userHome = require('user-home');

 newFile = fs.createWriteStream(userHome+'/Desktop/melissa.db');     
 oldFile = fs.createReadStream('melissa.db');
 oldFile.pipe(newFile);
 res.json(true)
}

module.exports.sysIslem=async function(req,res){
    params={}
    params.vp= dbMelissa.prepare("SELECT * from SYS_VeriPaketi").all()
    
    for (let index = 0; index < params.vp.length; index++) {
        console.log(params.vp[index])

        hasta = dbMelissa.prepare("SELECT * FROM Hasta where SysTakipNO='"+params.vp[index].SYSTakipNo+"'").get()
        params.vp[index].hasta=hasta       
    }
    params.hs2=dbMelissa.prepare("SELECT * from Hasta").all()
    res.render('sysIslem',params);
  
}

module.exports.vpSil=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    vpId=form.vpId
    vp= dbMelissa.prepare("SELECT * from SYS_VeriPaketi where Id='"+vpId+"'").get()
    dbMelissa.prepare("delete from SYS_VeriPaketi where Id='"+vpId+"'").run()

    sbForm={}
    sbForm.SYSTakipNo=vp.SYSTakipNo
    sbForm.SILINECEK_VERI_PAKETI=vp.VeriPaketi
    sys.VeriPaketiSilmePaketi(sbForm)

    res.send(true)  
}

module.exports.hs2Sil=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    hs2Id=form.hs2Id
    console.log(hs2Id)
    dbMelissa.prepare("delete from Hasta where SysTakipNO='"+hs2Id+"'").run()

    sbForm={}
    sbForm.SYSTakipNo=hs2Id
    sys.HastaKayıtSilmePaketi(sbForm)

    res.send(true)  
}
module.exports.restore=async function(req,res){
    var fs =require('fs');

   var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        fstream = fs.createWriteStream( './restore.db');// melissa db olarak değiştirilecek adı
        file.pipe(fstream);
        fstream.on('close', function () {
            res.send(true)
        });
    }); 

}

module.exports.malzemeIslemleri=function(req,res){
    res.render('malzemeişlemleri');
}

module.exports.stokKartları=function(req,res){
    params={}
    params.TeminTur= dbSkrs.prepare("SELECT * FROM TeminTur ").all()
    stoklar= dbMelissa.prepare("SELECT * FROM STOK ").all()
    stokGirisleri=dbMelissa.prepare("SELECT * FROM STOK_HAREKET where Hareket=1 ").all()


    for (let index = 0; index < stoklar.length; index++) {
        const e = stoklar[index];
        miad=date=moment().add(20, 'years').format("YYYY-MM-DD")
        for (let index2 = 0; index2 < stokGirisleri.length; index2++) {
            const g = stokGirisleri[index2];
            if(e.ID==g.StokID && miad>g.Miad){
                miad=g.Miad
            }          
        }
        console.log(miad)
        sql=`UPDATE STOK  SET EnYakinMiad='${miad}'  WHERE ID='${e.ID}'`
        dbMelissa.prepare(sql).run()
    }

    params.stoklar= dbMelissa.prepare("SELECT * FROM STOK ").all()
    res.render('stokKartları',params);
}
module.exports.filterStoks=function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    flag=0
    stokGrubuSB=''
    if(form.stokGrubuSB!=0){
        stokGrubuSB=" StokGrup='"+form.stokGrubuSB+"'"
        flag=1
    }
    bzs=''
    if(form.bzs!=0){
        if(flag==1)  bzs=" and Zorunlu='"+form.bzs+"'"
        else {
            bzs="Zorunlu='"+form.bzs+"'" 
            flag=1
        }
    }
    minSevad=''
    if(form.minSevad!=0){
        if(flag==1)  minSevad=" and Mevcut<MininumSeviye"
        else {
            minSevad=" Mevcut<MininumSeviye"
            flag=1
        }
        
    }
    kritSevad=''
    if(form.kritSevad!=0){
        if(flag==1)  kritSevad=" and Mevcut<KritikSeviye"
        else {
            kritSevad=" Mevcut<KritikSeviye"
            flag=1
        }       
    }
    miadFilt=''

    if(form.miadFilt!=0){
        date=moment().subtract(1, 'months').format("YYYY-MM-DD")
        STOK_HAREKET= dbMelissa.prepare("SELECT DISTINCT StokID FROM STOK_HAREKET where Miad>'"+date+"'").all()
        strStokIdArray='('
            
            for (let index = 0; index < STOK_HAREKET.length; index++) {
                const e = STOK_HAREKET[index];
                if(index==STOK_HAREKET.length-1) strStokIdArray+=e.StokID
                else strStokIdArray+=e.StokID+','
            }
            strStokIdArray+=')'

            if(STOK_HAREKET.length==0) strStokIdArray='(0)'
            
        if(flag==1){
            
            miadFilt=" and ID in"+strStokIdArray
        }  
        else {
            miadFilt=" ID in"+strStokIdArray
            flag=1
        }       
    }

    stoklar=[]
    if(form.stokGrubuSB==0 && form.bzs==0  && form.minSevad==0 && form.kritSevad==0 && form.miadFilt==0)  stoklar= dbMelissa.prepare("SELECT * FROM STOK  ").all()
    else stoklar= dbMelissa.prepare("SELECT * FROM STOK where "+stokGrubuSB+bzs+minSevad+kritSevad+miadFilt).all()
    res.json(stoklar)
}





module.exports.stokHareketleri=function(req,res){
    params={}
    params.stoklar= dbMelissa.prepare("SELECT * FROM STOK ").all()
    params.stokGirisleri=dbMelissa.prepare("SELECT * FROM STOK_HAREKET where Hareket=1 ").all()
    params.stokCikislari=dbMelissa.prepare("SELECT * FROM STOK_HAREKET where Hareket=2 ").all()
    params.TeminTur= dbSkrs.prepare("SELECT * FROM TeminTur ").all()
    for (let index = 0; index < params.stokCikislari.length; index++) {
        hasta = dbMelissa.prepare("SELECT * FROM Hasta where Id="+params.stokCikislari[index].HastaId).get()
        params.stokCikislari[index].hasta=hasta       
    }
    res.render('stokHareketleri',params);
}

module.exports.stokKartlariniGetir=function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    stokGirisleri=dbMelissa.prepare(`SELECT * FROM STOK_HAREKET where Hareket=1 and Tarih>= '${form.stokBasTar}' and Tarih<='${form.stokBitTar}' and StokID=${form.secilenStok} `).all()
    for (let index = 0; index < stokGirisleri.length; index++) {
        
        stokGirisleri[index].CikisKaynagi=   dbSkrs.prepare("SELECT * FROM TeminTur where KODU="+stokGirisleri[index].CikisKaynagi).get()
    }
    stokCikislari=dbMelissa.prepare(`SELECT * FROM STOK_HAREKET where Hareket=2 and Tarih>= '${form.stokBasTar}' and Tarih<='${form.stokBitTar}' and StokID=${form.secilenStok} `).all()
    for (let index = 0; index < stokCikislari.length; index++) {
        hasta = dbMelissa.prepare("SELECT * FROM Hasta where Id="+stokCikislari[index].HastaId).get()
        stokCikislari[index].hasta=hasta    
        stokCikislari[index].CikisKaynagi=   dbSkrs.prepare("SELECT * FROM TeminTur where KODU="+stokCikislari[index].CikisKaynagi).get()
    }

    res.json({stokGirisleri:stokGirisleri,stokCikislari:stokCikislari})

}

module.exports.stokGirisEkle=function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    hastaId=0
    depo=0
    miadTakipNo=0
    c="','";
    sql="INSERT INTO STOK_HAREKET (StokID,Tarih,Hareket,Miktar,HastaId,CikisKaynagi,Aciklama,Miad,KAREKOD,DEPO,MiadTakipNo"
    sql+=") VALUES('";
    sql+=form.girisStokKarti+c+form.girisTar+c+1+c+form.girisMiktari+c+hastaId+c+form.girisTemin+c+form.girisAciklama+c+form.girisMiad+c+form.girisKarekod+c+depo+c+miadTakipNo
    sql+="')";
    a= dbMelissa.prepare(sql).run()
    tempCount = dbMelissa.prepare("SELECT * FROM STOK where ID='"+form.girisStokKarti+"'").get().Mevcut
    sql=`UPDATE STOK  SET Mevcut=${parseInt(parseInt(form.girisMiktari)+parseInt(tempCount))}  WHERE ID='${form.girisStokKarti}'`
    dbMelissa.prepare(sql).run()   

    res.json({id:a.lastInsertRowid})
}

module.exports.stokGirisSil=function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    s=dbMelissa.prepare("SELECT * FROM STOK_HAREKET where Id="+form.id).get()
    StokID=s.StokID
    Miktar=s.Miktar
    tempCount = dbMelissa.prepare("SELECT * FROM STOK where ID='"+StokID+"'").get().Mevcut
    sql=`UPDATE STOK  SET Mevcut=${parseInt(parseInt(tempCount)-parseInt(Miktar))}  WHERE ID='${StokID}'`
    dbMelissa.prepare(sql).run()
    dbMelissa.prepare("DELETE FROM STOK_HAREKET where Id="+form.id).run()

   res.send(true)
}
module.exports.stokGirisUpdate=function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))

    s=dbMelissa.prepare("SELECT * FROM STOK_HAREKET where Id="+form.secilenStokGiris).get()
    StokID=s.StokID
    Miktar=s.Miktar
    m=parseInt(form.girisMiktari)-parseInt(Miktar)
    tempCount = dbMelissa.prepare("SELECT * FROM STOK where ID='"+StokID+"'").get().Mevcut

    sql=`UPDATE STOK  SET Mevcut=${parseInt(parseInt(tempCount)+parseInt(m))}  WHERE ID='${StokID}'`
    console.log(sql)

    dbMelissa.prepare(sql).run()



    sql=`UPDATE STOK_HAREKET  SET Miad='${form.girisMiad}',Miktar='${form.girisMiktari}', Tarih='${form.girisTar}',CikisKaynagi='${form.duzenleTemin}',Aciklama='${form.girisAciklama}' where  Id=${form.secilenStokGiris} `
    dbMelissa.prepare(sql).run()    

    res.send(true)
}
module.exports.stokCikisEkle=function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    console.log(form)
    hastaId=form.hastaCikis.split(' ')[0]
    depo=0
    miadTakipNo=0
    c="','";
    sql="INSERT INTO STOK_HAREKET (StokID,Tarih,Hareket,Miktar,HastaId,CikisKaynagi,Aciklama,Miad,KAREKOD,DEPO,MiadTakipNo"
    sql+=") VALUES('";
    sql+=form.cikisStokKarti+c+form.cikisTar+c+2+c+form.cikisMiktari+c+hastaId+c+form.cikisTemin+c+form.cikisAciklama+c+form.cikisMiad+c+form.cikisKarekod+c+depo+c+miadTakipNo
    sql+="')";
    a= dbMelissa.prepare(sql).run()
    tempCount = dbMelissa.prepare("SELECT * FROM STOK where ID='"+form.cikisStokKarti+"'").get().Mevcut
    console.log(tempCount)
    sql=`UPDATE STOK  SET Mevcut=${parseInt(parseInt(tempCount)-parseInt(form.cikisMiktari))}  WHERE ID='${form.cikisStokKarti}'`
    dbMelissa.prepare(sql).run()
    res.json({id:a.lastInsertRowid})
}

module.exports.stokCikisSil=function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    s=dbMelissa.prepare("SELECT * FROM STOK_HAREKET where Id="+form.id).get()
    StokID=s.StokID
    Miktar=s.Miktar
    tempCount = dbMelissa.prepare("SELECT * FROM STOK where ID='"+StokID+"'").get().Mevcut
    sql=`UPDATE STOK  SET Mevcut=${parseInt(parseInt(tempCount)+parseInt(Miktar))}  WHERE ID='${StokID}'`
    dbMelissa.prepare(sql).run()


    dbMelissa.prepare("DELETE FROM STOK_HAREKET where Id="+form.id).run()
    
   res.send(true)
}
module.exports.stokCikisUpdate=function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    s=dbMelissa.prepare("SELECT * FROM STOK_HAREKET where Id="+form.secilenStokCikis).get()
    StokID=s.StokID
    Miktar=s.Miktar
    m=parseInt(form.cUpMiktari)-parseInt(Miktar)
    tempCount = dbMelissa.prepare("SELECT * FROM STOK where ID='"+StokID+"'").get().Mevcut

    sql=`UPDATE STOK  SET Mevcut=${parseInt(parseInt(tempCount)-parseInt(m))}  WHERE ID='${StokID}'`
    console.log(sql)

    dbMelissa.prepare(sql).run()


    sql=`UPDATE STOK_HAREKET  SET Miad='${form.cUpMiad}',Miktar='${form.cUpMiktari}', Tarih='${form.cUpTar}',CikisKaynagi='${form.cUpTemin}' where  Id=${form.secilenStokCikis} `
    console.log(form.secilenStokCikis)
    dbMelissa.prepare(sql).run()    

    res.send(true)
}



module.exports.kullaniciAnalizi=function(req,res){
    params={}
    params.stoklar= dbMelissa.prepare("SELECT * FROM STOK ").all()
    params.stokGirisleri=dbMelissa.prepare("SELECT * FROM STOK_HAREKET where Hareket=1 ").all()
    params.stokCikislari=dbMelissa.prepare("SELECT * FROM STOK_HAREKET where Hareket=0 ").all()
    res.render('eskiYeniKullanıcıAnalizi',params)
}

module.exports.miad=function(req,res){ß
    res.render('miadAnalizi');
}

module.exports.stokSil=function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    dbMelissa.prepare("DELETE FROM STOK where ID="+form.id).run()
    
   res.send(true)
}

module.exports.stokEkle=function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))

    console.log(form)
    if(form.bulZor==undefined)form.bulZor=0
    c="','";
    sql="INSERT INTO STOK (Ad,MininumSeviye,BARKOD,Zorunlu,KritikSeviye,StokGrup,MaxSeviye"
    sql+=") VALUES('";
    sql+=form.stokAdi+c+form.minSev+c+form.barkod+c+form.bulZor+c+form.kritSev+c+form.stokGrubuSB+c+form.maxSev
    sql+="')";
   a= dbMelissa.prepare(sql).run()

   res.json({id:a.lastInsertRowid})

}


module.exports.stokUpdate=function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    if(form.UbulZor==undefined)form.UbulZor=0

    sql=`UPDATE STOK  SET StokGrup='${form.stokGrubuSB}',Ad='${form.stokAdi}', BARKOD='${form.barkod}',Zorunlu='${form.UbulZor}',MininumSeviye='${form.barkod}',KritikSeviye='${form.kritSev}',MaxSeviye='${form.kritSev}' where ID='${form.secilenStok}'  `
    dbMelissa.prepare(sql).run()


   res.send(true)

}

