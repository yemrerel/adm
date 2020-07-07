var express=require('express');

var router=express.Router();

var USS=require('../controller/USSController');

router.post('/GetHastaHekimBirimBilgisi',USS.GetHastaHekimBirimBilgisi);

router.post('/GetHastaIletisimBilgileri',USS.GetHastaIletisimBilgileri);

module.exports=router;