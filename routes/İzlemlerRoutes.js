var express=require('express');

var router=express.Router();

var ctrlİzlemler=require('../controller/İzlemlerController');

router.post('/Kadinizlem',ctrlİzlemler.kadınİzlem);
router.post('/Kadinizlem/kaydet',ctrlİzlemler.kadınizlemKaydet);


router.get('/asi',ctrlİzlemler.asi);


router.post('/Bebekcocukizlem',ctrlİzlemler.bebekcocukizlem);
router.get('/Bebekcocukizlem/YeniIzlem',ctrlİzlemler.bebekcocukYeniIzlem);
router.post('/Bebekcocukizlem/kaydet',ctrlİzlemler.bebekcocukKaydet);


router.post('/Gebeizlem',ctrlİzlemler.gebeizlem);
router.post('/Gebeizlem/YeniIzlem',ctrlİzlemler.gebeYeniIzlem);
router.post('/Gebeizlem/digergebelikler',ctrlİzlemler.diğerGebelikler);
router.post('/Gebeizlem/gebelikSonlandirmaSayfasi',ctrlİzlemler.gebelikSonlandırmaSayfası);
router.post('/Gebeizlem/gebelikSonlandir',ctrlİzlemler.gebelikSonlandır);

router.post('/Gebeizlem/kaydet',ctrlİzlemler.gebeizlemKaydet);



router.post('/Lohusaizlem',ctrlİzlemler.lohusaizlem);
router.get('/Lohusaizlem/YeniIzlem',ctrlİzlemler.lohusaYeniIzlem);
router.post('/Lohusaizlem/kaydet',ctrlİzlemler.lohusaizlemKaydet);


router.post('/Yetiskinizlem',ctrlİzlemler.yetiskinizlem);
router.post('/Yetiskinizlem/kaydet',ctrlİzlemler.yetiskinizlemKaydet);



router.post('/Obeziteizlem',ctrlİzlemler.obeziteizlem);
router.post('/Obeziteizlem/kaydet',ctrlİzlemler.obeziteizlemKaydet);


router.post('/Otizmizlem',ctrlİzlemler.otizmizlem);
router.post('/Otizmizlem/kaydet',ctrlİzlemler.otizmKaydet);


router.post('/ozellikli',ctrlİzlemler.ozellikliIzlem);
router.post('/ozellikli/kaydet',ctrlİzlemler.ozelizlemKaydet);



router.get('/EvdeSaglik',ctrlİzlemler.evdeSaglıkizlem);
router.post('/EvdeSaglik/BasvuruListesi',ctrlİzlemler.ESbasvuruListesi);
router.post('/EvdeSaglik/HizmetSonlandirmaListesi',ctrlİzlemler.EShizmetSonlandırmaListesi);

router.post('/EvdeSaglik/ESHizmetiIzlemleri',ctrlİzlemler.ESHizmetiIzlemleri);
router.get('/EvdeSaglik/ESHizmetiHastalar',ctrlİzlemler.ESHizmetiHastalar);



router.post('/EvdeSaglik/ESHastaNakilListesi',ctrlİzlemler.ESHastaNakilListesi);
router.post('/EvdeSaglik/ESilkizlem',ctrlİzlemler.ESİlkİzlem);


router.get('/',ctrlİzlemler.index);




module.exports=router;