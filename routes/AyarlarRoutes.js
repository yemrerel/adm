var express=require('express');

var router=express.Router();

var ctrlAyarlar=require('../controller/AyarlarController');

router.get('/',ctrlAyarlar.index);
router.post('/hesap',ctrlAyarlar.hesap);
router.post('/hesapKaydet',ctrlAyarlar.hesapKaydet);

router.post('/backup',ctrlAyarlar.backup);
router.post('/restore',ctrlAyarlar.restore);

router.post('/stokSil',ctrlAyarlar.stokSil);
router.post('/stokEkle',ctrlAyarlar.stokEkle);
router.post('/stokUpdate',ctrlAyarlar.stokUpdate);
router.post('/filterStoks',ctrlAyarlar.filterStoks);


router.post('/stokKartlariniGetir',ctrlAyarlar.stokKartlariniGetir);
router.post('/stokGirisEkle',ctrlAyarlar.stokGirisEkle);
router.post('/stokGirisSil',ctrlAyarlar.stokGirisSil);
router.post('/stokGirisUpdate',ctrlAyarlar.stokGirisUpdate);

router.post('/stokCikisEkle',ctrlAyarlar.stokCikisEkle);
router.post('/stokCikisSil',ctrlAyarlar.stokCikisSil);
router.post('/stokCikisUpdate',ctrlAyarlar.stokCikisUpdate);

router.get('/malzemeIslemleri',ctrlAyarlar.malzemeIslemleri);

router.get('/sysIslem',ctrlAyarlar.sysIslem);
router.post('/vpSil',ctrlAyarlar.vpSil);
router.post('/hs2Sil',ctrlAyarlar.hs2Sil);




router.get('/malzemeIslemleri/stokKartlari',ctrlAyarlar.stokKartları);
router.get('/malzemeIslemleri/stokHareketleri',ctrlAyarlar.stokHareketleri);
router.get('/malzemeIslemleri/eskiYeniKullaniciAnalizi',ctrlAyarlar.kullaniciAnalizi);

router.get('/malzemeIslemleri/miadAnalizi',ctrlAyarlar.miad);


module.exports=router;