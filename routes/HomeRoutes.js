var express=require('express');

var router=express.Router();

var ctrlHome=require('../controller/HomeController');

router.get('/',ctrlHome.index);
router.get('/showPDF',ctrlHome.showPDF);


router.get('/ilceleriGetir',ctrlHome.ilKoduylaİlçeleriGetir);
router.get('/kurumlariGetir',ctrlHome.kurumlariGetir);

router.get('/koyleriGetir',ctrlHome.ilceKoduylaKöyleriGetir);
router.get('/mahalleGetir',ctrlHome.köyKoduylaMahalleGetir);

router.post('/mernisTcSorgula',ctrlHome.mernisTcSorgula);
router.post('/hastaFilter',ctrlHome.hastaFilter);
router.post('/kanserHastaFilter',ctrlHome.hastaFilter);

router.post('/guncelleHome',ctrlHome.guncelleHome);

router.get('/tanFilter',ctrlHome.tanilarıFiltrele);

router.post('/taniKontrol',ctrlHome.taniKontrol);



router.get('/kronikFilter',ctrlHome.kronikleriFiltrele);

router.get('/ilacFilter',ctrlHome.ilaclarıFiltrele);
router.get('/receteSablonEkle',ctrlHome.sablonEkle);
router.get('/receteSablonlariGetir',ctrlHome.sablonlariGetir);



router.get('/imzatest',ctrlHome.imza);
router.get('/test',ctrlHome.test);
router.post('/testpost',ctrlHome.testpost);

router.get('/testnodejsimzaIndex',ctrlHome.testimzaIndex);
router.get('/Home/GetStatus',ctrlHome.downloadSignedFile);
router.post('/renkliRecete',ctrlHome.renkliRecete);


router.post('/istekkutusu',ctrlHome.istek);
router.post('/mail',ctrlHome.mail);

router.post('/receteKaydet',ctrlHome.receteKaydet);


router.post('/kaydetDF',ctrlHome.kaydetDF);

router.get('/hastaGruplari',ctrlHome.hastaGruplari);
router.get('/addgroup',ctrlHome.hastaGrubuEkle);
router.post('/ilacRaporlariniGetir',ctrlHome.ilacRaporlariniGetir);



router.get('/testandroidimza',ctrlHome.testimzaAndroid);

router.get('/getStatistic',ctrlHome.getStatistic);

router.post('/bebekDogrula',ctrlHome.bebekDogrula);


module.exports=router;