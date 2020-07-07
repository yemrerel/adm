var express=require('express');

var router=express.Router();

var ctrlPDF=require('../controller/PDFController');
router.get('/recetePDF',ctrlPDF.recetePDFolustur);
router.post('/BabaPsikolojisi',ctrlPDF.BabaPsikolojisi);
router.post('/AnnePsikolojisi',ctrlPDF.AnnePsikolojisi);
router.post('/AsiBildirimTutanagi',ctrlPDF.AsiBildirimTutanagi);
router.post('/AsiKarti',ctrlPDF.AsiKarti);
router.post('/YasCocuklukGorusmeleri',ctrlPDF.YasCocuklukGorusmeleri);
router.post('/BebekCocukHastalik',ctrlPDF.BebekCocukHastalik);
router.post('/Yas_Kadin_fisi_Onyuz',ctrlPDF.Yas_Kadin_fisi_Onyuz);
router.post('/Biyotinidaz_Eksikligi_Sevk_Formu',ctrlPDF.Biyotinidaz_Eksikligi_Sevk_Formu);
router.post('/Bulasici_Hastalik_On_Filyasyon_Formu',ctrlPDF.Bulasici_Hastalik_On_Filyasyon_Formu);
router.post('/Emzirme_Gozlem_Formu',ctrlPDF.Emzirme_Gozlem_Formu);

router.post('/Emzirme_Oykusu_Formu',ctrlPDF.Emzirme_Oykusu_Formu);
router.post('/Gelisimsel_Kalca_Displazisi_Radyoloji_Sevk_Formu',ctrlPDF.Gelisimsel_Kalca_Displazisi_Radyoloji_Sevk_Formu);
router.post('/Gebe_Bebek_Cocuk_Psikososyal_Izleme_Formu',ctrlPDF.Gebe_Bebek_Cocuk_Psikososyal_Izleme_Formu);
router.post('/BebekÇocukIzlemFisi',ctrlPDF.BebekÇocukIzlemFisi);
router.post('/bilgilendirilmisOnayFormu',ctrlPDF.bilgilendirilmisOnayFormu);
router.post('/calişabilirKagidi',ctrlPDF.calişabilirKagidi);
router.post('/durumBildirirTHSR',ctrlPDF.durumBildirirTHSR);
router.post('/ekSurucuBelgesi',ctrlPDF.ekSurucuBelgesi);
router.post('/evlilikRaporu',ctrlPDF.evlilikRaporu);
router.post('/HastaIslem',ctrlPDF.HastaIslem);
router.post('/IsYeriKazaveMeslek',ctrlPDF.IsYeriKazaveMeslek);
router.post('/kanGrubu',ctrlPDF.kanGrubu);
router.post('/okulSagligiMuayene',ctrlPDF.okulSagligiMuayene);
router.post('/oralGlikoz',ctrlPDF.oralGlikoz);
router.post('/poliklinikDefteri',ctrlPDF.poliklinikDefteri);
router.post('/rontgenTetkikFisi',ctrlPDF.rontgenTetkikFisi);
router.post('/sevkRaporu',ctrlPDF.sevkRaporu);
router.post('/Genel_Adli_Muayene_Raporu',ctrlPDF.Genel_Adli_Muayene_Raporu);
router.post('/Gorme_Taramasi_Sevk_Formu',ctrlPDF.Gorme_Taramasi_Sevk_Formu);
router.post('/Ilac_Kullanim_Raporu',ctrlPDF.Ilac_Kullanim_Raporu);
router.post('/Ogrenci_Bilgi_Formu',ctrlPDF.Ogrenci_Bilgi_Formu);
router.post('/Ogrenci_Muayene_Izlem_Bildirim_Formu',ctrlPDF.Ogrenci_Muayene_Izlem_Bildirim_Formu);
router.post('/Pedometri_Adimsayar_TeslimTutanagi',ctrlPDF.Pedometri_Adimsayar_TeslimTutanagi);
router.post('/isGormezlikBelgesi',ctrlPDF.isGormezlikBelgesi);
router.post('/RS30Raporu',ctrlPDF.RS30Raporu);



module.exports=router;