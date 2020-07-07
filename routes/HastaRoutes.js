var express=require('express');

var router=express.Router();

var ctrlHasta=require('../controller/HastaController');
router.post('/hastaEkleme',ctrlHasta.hastaEklePost);
router.post('/hastaProfili',ctrlHasta.hastaProfiliPost);
router.get('/hastaKronik',ctrlHasta.hastaKronik);
router.get('/hastailac',ctrlHasta.hastailac);
router.get('/hastaAmeliyat',ctrlHasta.hastaAmeliyat);
router.get('/hastaAlerji',ctrlHasta.hastaAlerji);




router.get('/hastaEkleme',ctrlHasta.hastaEkle);
router.get('/',ctrlHasta.index);

router.post('/kisaAnamnez',ctrlHasta.kısaAnamnez);
router.post('/kisaAnamnez',ctrlHasta.kısaAnamnez);
router.post('/kisaAnamnez/TaniKaydet',ctrlHasta.kısaAnamnezTanılarıKaydet);



router.post('/kisaAnamnez/recete',ctrlHasta.recete);
router.get('/rapor',ctrlHasta.rapor);
router.get('/istem',ctrlHasta.istem);
router.get('/detayli-muayene-1',ctrlHasta.detaylı);
router.post('/detayli-muayene-2',ctrlHasta.detaylı2);
router.post('/detayli-muayene-3',ctrlHasta.detaylı3);
router.post('/detayli-muayene-4',ctrlHasta.detaylı4);
router.post('/detayli-muayene-5',ctrlHasta.detaylı5);
router.post('/detayli-muayene-6',ctrlHasta.detaylı6);
router.post('/detayli-muayene-7',ctrlHasta.detaylı7);
router.post('/fizikMyn',ctrlHasta.fizikMyn);
router.post('/asiKaydet',ctrlHasta.asiKaydet);
router.post('/asiErtKaydet',ctrlHasta.asiErtKaydet);
router.post('/asiEtkiKaydet',ctrlHasta.asiEtkiKaydet);


router.post('/gebeBildirim',ctrlHasta.gebeBildirim);
router.post('/islemYerlerFilter',ctrlHasta.islemYerlerFilter);



router.post('/sigaraGuncelle',ctrlHasta.sigaraGuncelle);
router.post('/alkolGuncelle',ctrlHasta.alkolGuncelle);
router.post('/maddeGuncelle',ctrlHasta.maddeGuncelle);


module.exports=router;