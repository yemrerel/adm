
var path=require('path');
var pdf = require('html-pdf');
var ejs = require('ejs');
var fs =require('fs');
const Database = require('better-sqlite3');
const dbSkrs = new Database('skrs.db', { });
const dbMelissa = new Database('melissa.db', { });

module.exports.recetePDFolustur=function(req,res){

    var hasta=req.session.hasta;
    var params=req.query;
  
    receteTurAd='NORMAL'
    var recete={
            tarih:new Date().toISOString().split('T')[0],
            hastaAdSoyad:hasta.Ad+" "+hasta.Soyad,
            hastaTC:hasta.Id,
            dogumTarih:hasta.DogumTarihi,
            sgKurumu:1,//skrsResults[0][0].ADI,
            tanılar:params.tanilar,
            ilaçlar:params.ilaclar,
            receteTur:receteTurAd.ADI
    }
    var appDir = path.dirname(require.main.filename);
    var html = fs.readFileSync(path.join(appDir,'forms/recete.ejs'),'utf8');
    var str = ejs.render(html,recete);

    var options={
        header: {
            height: "20mm"
        },
        footer: {
            height: "15mm"
        },
        script:'/pdf_a4_portrait.js'
    };
    // str => Rendered HTML string
    pdf.create(str, options).toFile('reports/recete.pdf', function(err, res) {
        if (err) return console.log(err);
    });
}






module.exports.Emzirme_Oykusu_Formu=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/Emzirme_Oykusu_Formu.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/Emzirme_Oykusu_Formu.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/Emzirme_Oykusu_Formu.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.Gelisimsel_Kalca_Displazisi_Radyoloji_Sevk_Formu=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/Gelisimsel_Kalca_Displazisi_Radyoloji_Sevk_Formu.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/Gelisimsel_Kalca_Displazisi_Radyoloji_Sevk_Formu.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/Gelisimsel_Kalca_Displazisi_Radyoloji_Sevk_Formu.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.Gebe_Bebek_Cocuk_Psikososyal_Izleme_Formu=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/Gebe_Bebek_Cocuk_Psikososyal_Izleme_Formu.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/Gebe_Bebek_Cocuk_Psikososyal_Izleme_Formu.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/Gebe_Bebek_Cocuk_Psikososyal_Izleme_Formu.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.BebekÇocukIzlemFisi=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/BebekÇocukIzlemFisi.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/BebekÇocukIzlemFisi.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/BebekÇocukIzlemFisi.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.bilgilendirilmisOnayFormu=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/bilgilendirilmisOnayFormu.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/bilgilendirilmisOnayFormu.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/bilgilendirilmisOnayFormu.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.calişabilirKagidi=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/calişabilirKagidi.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/calişabilirKagidi.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/calişabilirKagidi.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.durumBildirirTHSR=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/durumBildirirTHSR.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/durumBildirirTHSR.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/durumBildirirTHSR.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.ekSurucuBelgesi=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/ekSurucuBelgesi.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/ekSurucuBelgesi.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/ekSurucuBelgesi.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.evlilikRaporu=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/evlilikRaporu.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/evlilikRaporu.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/evlilikRaporu.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.HastaIslem=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/HastaIslem.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/HastaIslem.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/HastaIslem.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.IsYeriKazaveMeslek=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/IsYeriKazaveMeslek.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/IsYeriKazaveMeslek.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/IsYeriKazaveMeslek.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.kanGrubu=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/kanGrubu.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/kanGrubu.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/kanGrubu.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}

module.exports.okulSagligiMuayene=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/okulSagligiMuayene.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/okulSagligiMuayene.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/okulSagligiMuayene.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.oralGlikoz=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/oralGlikoz.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/oralGlikoz.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/oralGlikoz.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.poliklinikDefteri=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/poliklinikDefteri.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/poliklinikDefteri.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/poliklinikDefteri.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.rontgenTetkikFisi=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/rontgenTetkikFisi.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/rontgenTetkikFisi.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/rontgenTetkikFisi.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.Genel_Adli_Muayene_Raporu=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/Genel_Adli_Muayene_Raporu.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/Genel_Adli_Muayene_Raporu.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/Genel_Adli_Muayene_Raporu.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.sevkRaporu=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/sevkRaporu.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/sevkRaporu.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/sevkRaporu.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.Gorme_Taramasi_Sevk_Formu=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/Gorme_Taramasi_Sevk_Formu.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/Gorme_Taramasi_Sevk_Formu.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/Gorme_Taramasi_Sevk_Formu.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.Ilac_Kullanim_Raporu=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/Ilac_Kullanim_Raporu.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/Ilac_Kullanim_Raporu.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/Ilac_Kullanim_Raporu.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.Ogrenci_Bilgi_Formu=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/Ogrenci_Bilgi_Formu.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/Ogrenci_Bilgi_Formu.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/Ogrenci_Bilgi_Formu.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}

module.exports.Pedometri_Adimsayar_TeslimTutanagi=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/Pedometri_Adimsayar_TeslimTutanagi.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/Pedometri_Adimsayar_TeslimTutanagi.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/Pedometri_Adimsayar_TeslimTutanagi.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.isGormezlikBelgesi=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/isGormezlikBelgesi.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/isGormezlikBelgesi.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/isGormezlikBelgesi.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.RS30Raporu=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/RS30Raporu.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/RS30Raporu.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/RS30Raporu.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.Ogrenci_Muayene_Izlem_Bildirim_Formu=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/Ogrenci_Muayene_Izlem_Bildirim_Formu.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/Ogrenci_Muayene_Izlem_Bildirim_Formu.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/Ogrenci_Muayene_Izlem_Bildirim_Formu.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}

//----------------------
module.exports.Emzirme_Gozlem_Formu=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/Emzirme_Gozlem_Formu.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/Emzirme_Gozlem_Formu.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/Emzirme_Gozlem_Formu.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}

module.exports.Bulasici_Hastalik_On_Filyasyon_Formu=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/Bulasici_Hastalik_On_Filyasyon_Formu.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/Bulasici_Hastalik_On_Filyasyon_Formu.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/Bulasici_Hastalik_On_Filyasyon_Formu.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.Biyotinidaz_Eksikligi_Sevk_Formu=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/Biyotinidaz_Eksikligi_Sevk_Formu.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/Biyotinidaz_Eksikligi_Sevk_Formu.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/Biyotinidaz_Eksikligi_Sevk_Formu.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.Yas_Kadin_fisi_Onyuz=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/Yas_Kadin_fisi_Onyuz.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/Yas_Kadin_fisi_Onyuz.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/Yas_Kadin_fisi_Onyuz.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.BebekCocukHastalik=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/BebekCocukHastalik.ejs', 'utf8');
    hastaTc=req.session.hasta.Id;
    user=req.session.user;
    hasta=dbMelissa.prepare('select * from Hasta where Id='+hastaTc).get()
    params={}
        params.hasta=hasta
        if(params.hasta.KanGurubu!='-') params.hasta.KanGurubu=dbSkrs.prepare(`select * from KanGrubu where KODU=${hasta.KanGurubu}`).get().ADI
        params.hasta.Cinsiyet=dbSkrs.prepare(`select * from Cinsiyet where KODU=`+params.hasta.Cinsiyet).get().ADI
        params.hasta.SosyalGuvence=dbSkrs.prepare(`select * from SosyalGüvenceDurumu where KODU=`+hasta.SosyalGuvence).get().ADI    
        Hasta_Adres_Iletisim=dbMelissa.prepare('select * from Hasta_Adres_Iletisim where tc='+hasta.Id).get()
        params.hasta.adres=Hasta_Adres_Iletisim.acikAdres
        params.hasta.ceptel=Hasta_Adres_Iletisim.ceptel
        
        params.doktor=dbMelissa.prepare(`select * from User where ProfilTipi='Doktor' `).get()
    



    var str = ejs.render(html,params); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(str, options).toFile('reports/BebekCocukHastalik.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/BebekCocukHastalik.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.YasCocuklukGorusmeleri=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/YasCocuklukGorusmeleri.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/YasCocuklukGorusmeleri.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/YasCocuklukGorusmeleri.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}

module.exports.YasCocuklukGorusmeleri=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/YasCocuklukGorusmeleri.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/YasCocuklukGorusmeleri.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/YasCocuklukGorusmeleri.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}

module.exports.AsiKarti=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/AsiKarti.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    //var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/AsiKarti.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/AsiKarti.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}

module.exports.AsiBildirimTutanagi=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var appDir = path.dirname(require.main.filename);
    var html = fs.readFileSync(path.join(appDir,'forms/AsiBildirimTutanagi.ejs'),'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    var str = ejs.render(html,form); 
    var options={
        header: {
            height: "20mm"
        },
        footer: {
            height: "15mm"
        },
        script:'/pdf_a4_portrait.js'
    }; 
    await pdf.create(html, options).toFile('reports/AsiBildirimTutanagi.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/AsiBildirimTutanagi.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
}
module.exports.AnnePsikolojisi=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/AnnePsikolojisi.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;


  
    var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    console.log(str)
    await pdf.create(str, options).toFile('reports/AnnePsikolojisi.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/AnnePsikolojisi.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
  
    
}

module.exports.BabaPsikolojisi=async function(req,res){
    const form = JSON.parse(JSON.stringify(req.body))
    var html = fs.readFileSync('forms/BabaPsikolojisi.ejs', 'utf8');
    hasta=req.session.hasta;
    user=req.session.user;

    form.ASB=''
    form.elemanAdSoyad=user.Ad+' '+user.Soyad
    form.babaAdSoyad=hasta.Ad+' '+hasta.Soyad
    form.babaTC=hasta.Id
    form.anneAdSoyad=''
    form.çocukAdSoyad=''
    form.adres=''
    console.log(form)
  
    var str = ejs.render(html,form); 
    var options={
        script:'/pdf_a4_portrait.js'
    };   
    await pdf.create(html, options).toFile('reports/BabaPsikolojisi.pdf', function(err, res2) {
         if (err) return console.log(err);
         var data =fs.readFileSync('reports/BabaPsikolojisi.pdf');
         res.contentType("application/pdf");
         res.send(data);
    })
  
    
}