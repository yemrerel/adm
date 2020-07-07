var express=require('express');

var router=express.Router();

var ctrlAlis=require('../controller/AlisController');


router.get('/entegKodlari',ctrlAlis.ALISEntegKodlari);
router.get('/ALISKayitSorgula',ctrlAlis.ALISKayitSorgula);
router.get('/ALISKayitSorguTamamlandi',ctrlAlis.ALISKayitSorguTamamlandi);

router.get('/ALISKayitEkleAdv',ctrlAlis.ALISKayitEkleAdv);
router.get('/ALISSonucDurum',ctrlAlis.ALISSonucDurum);
router.get('/ALISHastaTumSonuc',ctrlAlis.ALISHastaTumSonuc);




module.exports=router;